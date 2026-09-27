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

# Trọng số các thành phần — có thể tinh chỉnh qua thực nghiệm (self-play).
W_TERRITORY = 1.0
W_LIBERTY = 0.6
W_INFLUENCE = 0.5
W_EDGE = 0.4
W_ATARI = 1.2

_INFLUENCE_RADIUS = 4  # bán kính lan toả ảnh hưởng (ô), giới hạn để tránh O(size^4)
_edge_bonus_cache: dict = {}  # cache lưới trọng số góc/biên theo từng board_size


def _chebyshev(x1, y1, x2, y2) -> int:
    return max(abs(x1 - x2), abs(y1 - y2))


def _compute_liberty_safety(board: Board) -> float:
    """Σ sign(color) * (1 - e^-(libs/2)) * |group|, duyệt mỗi nhóm đúng 1 lần."""
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
            safety = 1.0 - math.exp(-len(liberties) / 2.0)
            score += (1 if color == BLACK else -1) * safety * len(group)
    return score


def _compute_influence(board: Board) -> float:
    """Khuếch tán ảnh hưởng 2^-d từ mỗi quân, giới hạn bán kính _INFLUENCE_RADIUS."""
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
    return total / (size * size)  # chuẩn hoá theo diện tích


def _edge_corner_grid(size: int) -> List[List[float]]:
    """Lưới tĩnh: góc > biên > trung tâm > tuyến 1/2 sát biên bị trừ. Cache theo size."""
    if size in _edge_bonus_cache:
        return _edge_bonus_cache[size]

    grid = [[0.0] * size for _ in range(size)]
    for y in range(size):
        for x in range(size):
            dist_edge = min(x, y, size - 1 - x, size - 1 - y)  # 0 = biên ngoài cùng
            if dist_edge == 0:
                grid[y][x] = -0.5  # tuyến 1: quá sát biên, bị ép dẹt
            elif dist_edge == 1:
                grid[y][x] = 1.0  # tuyến 2-3: vùng lãnh thổ vàng
            elif dist_edge == 2:
                grid[y][x] = 0.6  # tuyến 4: thế lực
            else:
                grid[y][x] = 0.2  # trung tâm: ít điểm sớm, chủ yếu ảnh hưởng (đã tính ở Influence)

            # Bonus góc thật (2 cạnh cùng gần biên)
            corner_dist = min(x, size - 1 - x) + min(y, size - 1 - y)
            if corner_dist <= 2:
                grid[y][x] += 1.2

    _edge_bonus_cache[size] = grid
    return grid


def _compute_edge_bonus(board: Board) -> float:
    size = len(board)
    grid = _edge_corner_grid(size)
    empty_count = sum(row.count(EMPTY) for row in board)
    decay = empty_count / (size * size)  # 1.0 lúc khai cuộc -> ~0 lúc tàn cuộc

    score = 0.0
    for y in range(size):
        for x in range(size):
            color = board[y][x]
            if color == EMPTY:
                continue
            sign = 1 if color == BLACK else -1
            score += sign * grid[y][x]
    return (score / (size * size)) * decay


def _compute_atari_penalty(board: Board) -> float:
    size = len(board)
    visited = set()
    penalty = 0.0
    for y in range(size):
        for x in range(size):
            color = board[y][x]
            if color == EMPTY or (x, y) in visited:
                continue
            group, liberties = find_group_and_liberties(board, {"x": x, "y": y})
            for p in group:
                visited.add((p["x"], p["y"]))
            if len(liberties) == 1:  # Atari
                sign = 1 if color == BLACK else -1
                penalty += sign * (len(group) ** 2)
    # penalty > 0 nghĩa là NHÓM ĐEN đang bị atari nhiều hơn -> bất lợi cho Đen
    return -penalty  # đổi dấu để "Đen bị atari nhiều" kéo điểm Đen xuống


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
        + W_ATARI * _compute_atari_penalty(board) / (len(board) ** 2)
    )

    value_black_pov = math.tanh(raw)
    return value_black_pov if current_player == BLACK else -value_black_pov