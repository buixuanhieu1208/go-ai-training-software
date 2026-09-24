from __future__ import annotations

from typing import Dict, List, Optional, Set, Tuple, TypedDict

from utils.game_logic import BLACK, WHITE, EMPTY

Stone = int  # BLACK(1) | WHITE(-1) | EMPTY(0)
Board = List[List[Stone]]

DIRECTIONS: Tuple[Tuple[int, int], ...] = ((0, -1), (0, 1), (-1, 0), (1, 0))


class Position(TypedDict):
    x: int
    y: int


def opponent_of(color: Stone) -> Stone:
    """Tra ve mau doi phuong. Chi hop le voi BLACK(1)/WHITE(-1)."""
    return WHITE if color == BLACK else BLACK


def in_bounds(board: Board, x: int, y: int) -> bool:
    if y < 0 or y >= len(board):
        return False
    if x < 0 or x >= len(board[0]):
        return False
    return True


def clone_board(board: Board) -> Board:
    return [row[:] for row in board]


def create_empty_board(size: int) -> Board:
    return [[EMPTY for _ in range(size)] for _ in range(size)]


def find_group_and_liberties(board: Board, start: Position) -> Tuple[List[Position], List[Position]]:
    """
    Loang (DFS/stack) tu 1 diem de tim toan bo nhom quan cung mau lien ket
    (connected group, 4-huong) va tap hop cac diem khi (liberties) xung quanh.

    Yeu cau: board[start.y][start.x] phai la BLACK hoac WHITE (khac EMPTY).
    Neu diem xuat phat dang trong -> tra ve ([], []) (khong crash).
    """
    color = board[start["y"]][start["x"]]
    if color == EMPTY:
        return [], []

    visited: Set[Tuple[int, int]] = set()
    group: List[Position] = []
    liberty_set: Set[Tuple[int, int]] = set()
    stack: List[Position] = [start]

    while stack:
        current = stack.pop()
        key = (current["x"], current["y"])
        if key in visited:
            continue
        visited.add(key)
        group.append(current)

        for dx, dy in DIRECTIONS:
            nx, ny = current["x"] + dx, current["y"] + dy
            if not in_bounds(board, nx, ny):
                continue
            neighbor_color = board[ny][nx]
            if neighbor_color == EMPTY:
                liberty_set.add((nx, ny))
            elif neighbor_color == color:
                n_key = (nx, ny)
                if n_key not in visited:
                    stack.append({"x": nx, "y": ny})

    liberties = [{"x": x, "y": y} for (x, y) in liberty_set]
    return group, liberties


def apply_captures(board: Board, move: Position, moved_color: Stone) -> Tuple[Board, int, List[Position]]:
    """
    Sau khi dat 1 quan `moved_color` tai `move`, kiem tra cac nhom doi phuong
    lien ke. Nhom nao het khi (0 liberties) se bi bat (xoa khoi ban co, gan
    ve EMPTY).

    Tra ve: (ban co moi, tong so quan bi bat, danh sach vi tri quan bi bat)
    KHONG lam thay doi `board` dau vao (tra ve ban co MOI, da clone).
    """
    opponent = opponent_of(moved_color)
    new_board = clone_board(board)
    captured_count = 0
    captured_positions: List[Position] = []
    visited: Set[Tuple[int, int]] = set()

    for dx, dy in DIRECTIONS:
        nx, ny = move["x"] + dx, move["y"] + dy
        if not in_bounds(new_board, nx, ny):
            continue
        if new_board[ny][nx] != opponent:
            continue
        if (nx, ny) in visited:
            continue

        group, liberties = find_group_and_liberties(new_board, {"x": nx, "y": ny})
        for p in group:
            visited.add((p["x"], p["y"]))

        if len(liberties) == 0:
            for p in group:
                new_board[p["y"]][p["x"]] = EMPTY
                captured_count += 1
                captured_positions.append(p)

    return new_board, captured_count, captured_positions


def calculate_territory(board: Board) -> Dict:
    """
    Dem diem bang Flood Fill: loang tren cac vung trong lien tuc, xac dinh
    vung do tiep giap voi mau nao -> thuoc lanh tho mau do (neu chi tiep giap
    1 mau duy nhat), nguoc lai la vung trung lap (dame / seki-like neutral).

    territoryMap tra ve kieu STRING ("black"/"white"/"neutral") de KHOP THANG
    voi type ScoreResult ben frontend_ui/src/types/go.ts (khong doi FE phai
    tu chuyen doi) - day la lua chon co chu dich, khac voi Board (int).

    Tra ve:
        {
          "blackTerritory": int, "whiteTerritory": int,
          "blackStones": int,    "whiteStones": int,
          "blackScore": int,     "whiteScore": int,   # = territory + stones, CHUA cong komi
          "territoryMap": [["black"|"white"|"neutral", ...], ...],
        }
    """
    size = len(board)
    territory_map: List[List[str]] = [["neutral"] * size for _ in range(size)]
    visited: Set[Tuple[int, int]] = set()
    black_territory = 0
    white_territory = 0
    black_stones = 0
    white_stones = 0

    for y in range(size):
        for x in range(size):
            stone = board[y][x]
            if stone == BLACK:
                black_stones += 1
            elif stone == WHITE:
                white_stones += 1

            key = (x, y)
            if stone != EMPTY or key in visited:
                continue

            region: List[Position] = []
            bordering: Set[Stone] = set()
            stack: List[Position] = [{"x": x, "y": y}]
            local_visited: Set[Tuple[int, int]] = {key}

            while stack:
                cur = stack.pop()
                region.append(cur)
                for dx, dy in DIRECTIONS:
                    nx, ny = cur["x"] + dx, cur["y"] + dy
                    if not in_bounds(board, nx, ny):
                        continue
                    n_color = board[ny][nx]
                    n_key = (nx, ny)
                    if n_color == EMPTY:
                        if n_key not in local_visited:
                            local_visited.add(n_key)
                            stack.append({"x": nx, "y": ny})
                    else:
                        bordering.add(n_color)

            for p in region:
                visited.add((p["x"], p["y"]))

            owner = "neutral"
            if len(bordering) == 1:
                owner = "black" if BLACK in bordering else "white"

            if owner == "black":
                black_territory += len(region)
            elif owner == "white":
                white_territory += len(region)

            for p in region:
                territory_map[p["y"]][p["x"]] = owner

    return {
        "blackTerritory": black_territory,
        "whiteTerritory": white_territory,
        "blackStones": black_stones,
        "whiteStones": white_stones,
        "blackScore": black_territory + black_stones,
        "whiteScore": white_territory + white_stones,
        "territoryMap": territory_map,
    }


def board_signature(board: Board) -> str:
    """Chuoi bam nhanh cua ban co, dung de so sanh trang thai (luat Ko)."""
    return "|".join("".join(str(cell) for cell in row) for row in board)