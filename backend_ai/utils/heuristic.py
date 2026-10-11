# backend_ai/utils/heuristic.py
"""
Ham Heuristic truyen thong nang cap - dong vai tro BO TRO / FALLBACK cho
Value Network (DualCNN), KHONG thay the no o ban 19x19 da train.

Dung khi:
  - board_size != 19 (chua co trong so train rieng - xem ai_engine.py,
    hien tai model khoi tao ngau nhien cho 9x9/13x13).
  - Muon blend voi Value Network de on dinh gia tri o giai doan dau khi
    model chua du tin cay (xem tham so heuristic_weight trong search_tree.py).

QUY UOC DAU RA (BAT BUOC tuan thu de khop voi Value Network va tranh lap
lai loi dao dau da phat hien trong search_tree.py):
    evaluate_heuristic(board, current_player) tra ve gia tri trong [-1, 1]
    THEO GOC NHIN CUA `current_player` (giong het quy uoc cua DualCNN.value
    head) - KHONG PHAI luon theo goc nhin Den.
"""

from __future__ import annotations

import math
from typing import List

from utils.game_logic import BLACK, WHITE, EMPTY
from utils.go_rules_core import (
    Board,
    calculate_territory,
    find_group_and_liberties,
    in_bounds,
)

# # Trọng số các thành phần — có thể tinh chỉnh qua thực nghiệm (self-play).
W_TERRITORY = 1.0
W_LIBERTY = 0.6
W_INFLUENCE = 0.5
W_EDGE = 0.8       # Khai cuộc quan trọng (Góc/Biên/Trung tâm)
W_SHAPE = 1.0      # Điểm phối hợp quân cờ (Tam giác trống, Ponnuki, Mắt tre)
W_ATARI = 1.5      # Điểm nguy hiểm phạt nặng (Atari / Cắt)

_INFLUENCE_RADIUS = 4
_edge_bonus_cache: dict = {}


def _chebyshev(x1, y1, x2, y2) -> int:
    return max(abs(x1 - x2), abs(y1 - y2))


def _compute_liberty_safety(board: Board) -> float:
    """Σ sign(color) * (1 - e^-(libs/2)) * |group|.
    Điểm nguy hiểm: Phạt nặng nếu nhóm quân lớn mà ít Khí.
    """
    size = len(board)
    visited = set()
    score = 0.0
    for y in range(size):
        for x in range(size):
            color = board[y][x]
            if color == EMPTY or (x, y) in visited:
                continue
            group, liberties = find_group_and_liberties(board, {"x": x, "y": y})
            for p in group:
                visited.add((p["x"], p["y"]))
            
            num_libs = len(liberties)
            if num_libs <= 1:
                safety = -2.0  # Phạt cực nặng nếu bị Atari (1 khí)
            elif num_libs == 2:
                safety = -0.5  # Báo động đỏ (2 khí)
            else:
                safety = 1.0 - math.exp(-num_libs / 2.0)
                
            score += (1 if color == BLACK else -1) * safety * len(group)
    return score


def _compute_influence(board: Board) -> float:
    """Điểm thưởng chiến lược (Moyo / Thế lực). Khuếch tán ảnh hưởng 2^-d từ mỗi quân."""
    size = len(board)
    influence = [[0.0] * size for _ in range(size)]
    for y in range(size):
        for x in range(size):
            color = board[y][x]
            if color == EMPTY:
                continue
            sign = 1 if color == BLACK else -1
            y0, y1 = max(0, y - _INFLUENCE_RADIUS), min(size, y + _INFLUENCE_RADIUS + 1)
            x0, x1 = max(0, x - _INFLUENCE_RADIUS), min(size, x + _INFLUENCE_RADIUS + 1)
            for ny in range(y0, y1):
                for nx in range(x0, x1):
                    d = _chebyshev(x, y, nx, ny)
                    if d == 0:
                        continue
                    influence[ny][nx] += sign * (2.0 ** (-d))
    total = sum(sum(row) for row in influence)
    return total / (size * size)


def _edge_corner_grid(size: int) -> List[List[float]]:
    """
    Điểm Vị trí (Position): Góc vàng, Biên bạc, Giữa cỏ khô.
    Đánh giá theo Tuyến đặt quân:
    - Tuyến 1, 2: Trừ điểm (Bị ép dẹt)
    - Tuyến 3: Lãnh thổ an toàn (+)
    - Tuyến 4: Phát triển thế lực (+)
    - Góc: Cộng cực lớn
    """
    if size in _edge_bonus_cache:
        return _edge_bonus_cache[size]

    grid = [[0.0] * size for _ in range(size)]
    for y in range(size):
        for x in range(size):
            dist_x = min(x, size - 1 - x)
            dist_y = min(y, size - 1 - y)
            dist_edge = min(dist_x, dist_y)  # 0 = biên ngoài cùng (Tuyến 1)
            
            val = 0.0
            if dist_edge == 0:
                val = -2.0    # Tuyến 1: quá thấp
            elif dist_edge == 1:
                val = -1.0    # Tuyến 2: thường bị đè
            elif dist_edge == 2:
                val = 4.0     # Tuyến 3: Vàng (Lấy đất)
            elif dist_edge == 3:
                val = 3.0     # Tuyến 4: Bạc (Lấy thế)
            else:
                val = 0.5     # Trung tâm (Cỏ khô)

            # Bonus Góc (3x3, 3x4, 4x4)
            if (dist_x == 2 and dist_y == 2):
                val += 15.0   # Điểm 3-3 (San-san)
            elif (dist_x == 2 and dist_y == 3) or (dist_x == 3 and dist_y == 2):
                val += 12.0   # Điểm 3-4 (Komoku)
            elif (dist_x == 3 and dist_y == 3):
                val += 10.0   # Điểm 4-4 (Hoshi)
                
            grid[y][x] = val

    _edge_bonus_cache[size] = grid
    return grid


def _compute_edge_bonus(board: Board) -> float:
    size = len(board)
    grid = _edge_corner_grid(size)
    empty_count = sum(row.count(EMPTY) for row in board)
    decay = empty_count / (size * size)  # Cực kỳ quan trọng ở Khai cuộc, giảm về 0 ở Tàn cuộc

    score = 0.0
    for y in range(size):
        for x in range(size):
            color = board[y][x]
            if color == EMPTY:
                continue
            sign = 1 if color == BLACK else -1
            score += sign * grid[y][x]
    return (score / (size * size)) * decay


def _compute_shape_bonus(board: Board) -> float:
    """
    T3: Điểm phối hợp quân cờ (Shape & Synergy).
    - Tam giác trống (Empty Triangle): Phạt
    - Mắt tre (Bamboo Joint): Thưởng
    - Ponnuki (Hoa 4 cánh): Thưởng lớn
    """
    size = len(board)
    score = 0.0

    # 1. Tam giác trống (Empty Triangle) - Hình cờ xấu (-5 điểm)
    # Khối 2x2 chứa đúng 3 quân cùng màu và 1 ô trống.
    for y in range(size - 1):
        for x in range(size - 1):
            colors = [board[y][x], board[y][x+1], board[y+1][x], board[y+1][x+1]]
            blacks = colors.count(BLACK)
            whites = colors.count(WHITE)
            empties = colors.count(EMPTY)
            
            if empties == 1:
                if blacks == 3: score -= 5.0   # Đen đi lỗi -> Điểm Đen giảm
                elif whites == 3: score += 5.0 # Trắng đi lỗi -> Điểm Đen tăng

    # 2. Mắt tre ngang (Bamboo Joint) (+10 điểm)
    for y in range(size - 1):
        for x in range(size - 2):
            c1, c2, c3 = board[y][x], board[y][x+1], board[y][x+2]
            c4, c5, c6 = board[y+1][x], board[y+1][x+1], board[y+1][x+2]
            if c1 == c3 == c4 == c6 != EMPTY and c2 == EMPTY and c5 == EMPTY:
                score += 10.0 if c1 == BLACK else -10.0

    # 3. Mắt tre dọc
    for y in range(size - 2):
        for x in range(size - 1):
            c1, c2 = board[y][x], board[y][x+1]
            c3, c4 = board[y+1][x], board[y+1][x+1]
            c5, c6 = board[y+2][x], board[y+2][x+1]
            if c1 == c2 == c5 == c6 != EMPTY and c3 == EMPTY and c4 == EMPTY:
                score += 10.0 if c1 == BLACK else -10.0

    # 4. Ponnuki (Hoa 4 cánh bao quanh 1 ô trống) (+30 điểm)
    for y in range(1, size - 1):
        for x in range(1, size - 1):
            if board[y][x] == EMPTY:
                up, dn, lf, rt = board[y-1][x], board[y+1][x], board[y][x-1], board[y][x+1]
                if up == dn == lf == rt != EMPTY:
                    score += 30.0 if up == BLACK else -30.0

    return score / (size * size)


def evaluate_heuristic(board: Board, current_player: int, komi: float = 7.5) -> float:
    """
    Trả về giá trị trong [-1, 1] THEO GÓC NHÌN của `current_player`
    (đúng quy ước DualCNN.value: >0 = current_player đang thắng).
    """
    territory = calculate_territory(board)
    territory_diff = (
        (territory["blackScore"] - (territory["whiteScore"] + komi))
    ) / (len(board) ** 2)

    raw = (
        W_TERRITORY * territory_diff
        + W_LIBERTY * _compute_liberty_safety(board) / (len(board) ** 2)
        + W_INFLUENCE * _compute_influence(board)
        + W_EDGE * _compute_edge_bonus(board)
        + W_SHAPE * _compute_shape_bonus(board)
    )

    value_black_pov = math.tanh(raw)
    return value_black_pov if current_player == BLACK else -value_black_pov