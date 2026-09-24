# backend_ai/utils/referee.py
"""
Module "Trong tai" (Referee): xac thuc tinh hop le cua nuoc di (suicide, ko)
va gan nhan loi co ban (MistakeTag) bang heuristic rule-based - KHONG dung
mang no-ron (Policy/Value Network). Day la ban port sang so nguyen (1/-1/0)
tu core/referee.py cua go-ai-training-software.

Day la phan "heuristic" doc lap, du de:
    - Ngan chan nuoc di pham luat (suicide / ko) khi phuc vu che do PvP/luyen tap.
    - Cho hoc vien mot goi y so bo ve chat luong nuoc di (khong thay the AI
      MCTS+DualCNN dang dung cho /api/v1/get_move - hai muc dich khac nhau).

MistakeTag (khop voi frontend_ui/src/types/go.ts):
    "atari" | "dame" | "blunder" | "slow_move" | "overplay"

Quy uoc mau: BLACK=1, WHITE=-1, EMPTY=0 (dong bo voi utils/game_logic.py va
utils/go_rules_core.py). LUU Y: du lieu move_history nhan tu Frontend (kieu
Move trong types/go.ts) dang dung color la STRING ("black"/"white") - viec
chuyen doi string -> int se do tang API o Buoc 2 dam nhiem, file nay CHI
lam viec voi so nguyen de giu dung yeu cau "pure function".
"""

from __future__ import annotations

from typing import Dict, List, Optional, Tuple

from utils.game_logic import BLACK, WHITE, EMPTY
from utils.go_rules_core import (
    Board,
    Position,
    apply_captures,
    board_signature,
    calculate_territory,
    clone_board,
    create_empty_board,
    find_group_and_liberties,
    in_bounds,
    opponent_of,
)

DIRECTIONS: Tuple[Tuple[int, int], ...] = ((0, -1), (0, 1), (-1, 0), (1, 0))


class IllegalMoveError(Exception):
    """Nem ra khi nuoc di vi pham luat co ban (occupied / suicide / ko)."""

    def __init__(self, reason: str, code: str):
        super().__init__(reason)
        self.reason = reason
        self.code = code  # "occupied" | "suicide" | "ko" | "out_of_bounds"


def validate_move(
    board: Board,
    position: Position,
    color: int,
    previous_board_signature: Optional[str] = None,
) -> Dict:
    """
    Kiem tra 1 nuoc di co hop le khong, MA KHONG lam thay doi `board` goc.

    Luat kiem tra:
        1) Trong pham vi ban co.
        2) O do phai dang trong (EMPTY).
        3) Khong duoc la nuoc "tu sat" (suicide): sau khi dat quan va bat
           quan doi phuong (neu co), nhom quan vua dat phai con it nhat 1 khi.
        4) Luat Ko (rut gon - positional superko 1 buoc): neu sau nuoc di,
           trang thai ban co giong het trang thai TRUOC nuoc di truoc do
           (previous_board_signature do client/BE luu lai), nuoc di bi cam.

    Tra ve dict:
        {
          "legal": bool,
          "reasonCode": str | None,   # "occupied" | "suicide" | "ko" | "out_of_bounds" | None
          "reason": str | None,       # mo ta tieng Viet
          "capturedCount": int,
          "capturedPositions": [Position],
          "resultingBoard": Board | None,   # chi tra ve khi hop le
          "resultingSignature": str | None,
        }
    """
    x, y = position["x"], position["y"]

    if not in_bounds(board, x, y):
        return _illegal("out_of_bounds", "Vi tri ngoai pham vi ban co.")

    if board[y][x] != EMPTY:
        return _illegal("occupied", "Diem nay da co quan co.")

    board_with_move = clone_board(board)
    board_with_move[y][x] = color

    board_after_capture, captured_count, captured_positions = apply_captures(
        board_with_move, position, color
    )

    # Kiem tra suicide: nhom cua quan vua dat con khi khong?
    _group, liberties = find_group_and_liberties(board_after_capture, position)
    if len(liberties) == 0:
        return _illegal("suicide", "Nuoc di tu sat (nhom quan het khi sau khi dat).")

    resulting_signature = board_signature(board_after_capture)
    if previous_board_signature is not None and resulting_signature == previous_board_signature:
        return _illegal("ko", "Vi pham luat Ko: khong duoc lap lai trang thai ban co truoc do.")

    return {
        "legal": True,
        "reasonCode": None,
        "reason": None,
        "capturedCount": captured_count,
        "capturedPositions": captured_positions,
        "resultingBoard": board_after_capture,
        "resultingSignature": resulting_signature,
    }


def _illegal(code: str, reason: str) -> Dict:
    return {
        "legal": False,
        "reasonCode": code,
        "reason": reason,
        "capturedCount": 0,
        "capturedPositions": [],
        "resultingBoard": None,
        "resultingSignature": None,
    }


def _min_liberties_of_adjacent_groups(board: Board, position: Position, color: int) -> Optional[int]:
    """So khi thap nhat trong cac nhom mau `color` ke voi `position` (khong tinh EMPTY)."""
    best: Optional[int] = None
    visited = set()
    for dx, dy in DIRECTIONS:
        nx, ny = position["x"] + dx, position["y"] + dy
        if not in_bounds(board, nx, ny):
            continue
        if board[ny][nx] != color:
            continue
        key = (nx, ny)
        if key in visited:
            continue
        group, liberties = find_group_and_liberties(board, {"x": nx, "y": ny})
        for p in group:
            visited.add((p["x"], p["y"]))
        n = len(liberties)
        if best is None or n < best:
            best = n
    return best


def tag_move(
    board_before: Board,
    board_after_capture: Board,
    position: Position,
    color: int,
    captured_count: int,
    territory_before: Optional[Dict] = None,
) -> Optional[str]:
    """
    Gan 1 nhan MistakeTag (hoac None neu nuoc di binh thuong) cho 1 nuoc di,
    dua tren cac heuristic don gian - KHONG phai suy luan tu mang no-ron.

    Heuristic ap dung theo thu tu uu tien (nuoc di chi nhan 1 nhan quan trong nhat):

    1) "blunder" - tu-atari (self-atari) 1 nhom LON (>= 3 quan): dat quan
       khien chinh nhom cua minh chi con dung 1 khi, va nhom do >= 3 quan.
       Day thuong la sai lam nghiem trong vi doi phuong an ca nhom lon.

    2) "atari"   - tu-atari 1 nhom NHO (1-2 quan), HOAC nuoc di dat doi
       phuong vao the atari (nhom doi phuong con dung 1 khi sau nuoc di).

    3) "dame"    - nuoc di lap vao 1 diem von la vung trung lap (neutral)
       theo phep dem lanh tho TRUOC khi di (tuc la diem khong sinh them
       lanh tho cho ai) VA khong an duoc quan nao. Can truyen `territory_before`
       (ket qua tu calculate_territory(board_before)) de xac dinh dieu nay.

    4) "overplay"- nuoc di "lan sau" vao vung doi phuong: tiep giap >= 3 quan
       doi phuong va sau khi di, nhom cua minh co <= 2 khi (rui ro cao,
       ganh mao hiem chua chac song duoc) nhung KHONG bat duoc quan nao.

    5) "slow_move" - nuoc di khong an quan, khong lien quan toi bat ky nhom
       nao dang it khi (khong tao ap luc), va tat ca 4 o lan can deu la
       quan CUNG mau minh (dang cung co vung dat da chac chan an toan)
       -> nuoc di an toan nhung it hieu qua ve mat toc do (endgame nho).
    """
    x, y = position["x"], position["y"]
    opponent = opponent_of(color)

    own_group, own_liberties = find_group_and_liberties(board_after_capture, position)

    # --- (1)+(2) tu-atari ---
    if len(own_liberties) == 1 and captured_count == 0:
        return "blunder" if len(own_group) >= 3 else "atari"

    # --- (2b) dat doi phuong vao atari ---
    opp_min_liberties = _min_liberties_of_adjacent_groups(board_after_capture, position, opponent)
    if opp_min_liberties == 1:
        return "atari"

    # --- (3) dame: diem von trung lap truoc khi di, khong an duoc gi ---
    if captured_count == 0 and territory_before is not None:
        if territory_before["territoryMap"][y][x] == "neutral":
            # chi tinh la "dame" neu diem do that su nam giua/canh vung giao tranh
            # (co it nhat 1 quan lan can, tranh nham voi nuoc mo dau tren ban trong)
            has_neighbor_stone = any(
                in_bounds(board_before, x + dx, y + dy) and board_before[y + dy][x + dx] != EMPTY
                for dx, dy in DIRECTIONS
            )
            if has_neighbor_stone:
                return "dame"

    # --- (4) overplay: lan vao vung dich, tu dat minh vao the nguy hiem ---
    opponent_neighbor_count = sum(
        1
        for dx, dy in DIRECTIONS
        if in_bounds(board_before, x + dx, y + dy) and board_before[y + dy][x + dx] == opponent
    )
    if captured_count == 0 and opponent_neighbor_count >= 3 and len(own_liberties) <= 2:
        return "overplay"

    # --- (5) slow_move: cung co vung dat da an toan ---
    if captured_count == 0:
        neighbors = [
            (x + dx, y + dy) for dx, dy in DIRECTIONS if in_bounds(board_before, x + dx, y + dy)
        ]
        if neighbors and all(board_before[ny][nx] == color for nx, ny in neighbors):
            return "slow_move"

    return None


def replay_and_annotate(board_size: int, move_history: List[Dict]) -> Dict:
    """
    Choi lai (replay) toan bo `move_history` tu ban co trong kich thuoc
    `board_size`, o moi nuoc di:
        - Ap dung capture (apply_captures)
        - Gan mistakeTag bang heuristic (tag_move)
        - Cong don so quan bi bat cho tung ben

    Day la ham trung tam se duoc endpoint POST /api/referee/analyze goi
    (Buoc 2), dong vai tro "trong tai" tai hien lai toan bo van dau tu dau
    de dua ra bao cao.

    LUU Y VE DINH DANG DAU VAO: moi phan tu trong `move_history` PHAI da
    duoc chuan hoa ve so nguyen truoc khi goi ham nay:
        {
          "index": int,
          "color": 1 | -1,                       # KHONG phai "black"/"white"
          "position": {"x": int, "y": int} | None,  # None = Pass
          ... (cac field khac giu nguyen, se duoc copy lai vao output)
        }
    Viec chuyen doi color string ("black"/"white") tu Frontend sang int se
    do lop Pydantic schema o Buoc 2 dam nhiem (dung Enum/validator), KHONG
    thuc hien ngam trong ham nay, de giu file thuan Python doc lap FastAPI.

    Tra ve:
        {
          "finalBoard": Board,
          "annotatedMoves": [Move-like dict co them 'mistakeTag'],
          "capturedBlack": int,   # so quan TRANG bi DEN an
          "capturedWhite": int,   # so quan DEN bi TRANG an
        }
    """
    board: Board = create_empty_board(board_size)
    annotated: List[Dict] = []
    captured_black = 0  # quan trang bi den an
    captured_white = 0  # quan den bi trang an

    for move in move_history:
        color = move.get("color")
        position = move.get("position")
        out_move = dict(move)

        if position is None or color not in (BLACK, WHITE):
            # nuoc Pass hoac du lieu khong hop le -> giu nguyen, khong gan nhan
            out_move["mistakeTag"] = None
            annotated.append(out_move)
            continue

        x, y = position["x"], position["y"]
        if not in_bounds(board, x, y) or board[y][x] != EMPTY:
            # nuoc di khong hop le trong du lieu lich su (khong nen xay ra voi
            # du lieu tu FE hop le) -> bo qua, khong lam sap he thong
            out_move["mistakeTag"] = None
            annotated.append(out_move)
            continue

        board_before = clone_board(board)
        territory_before = calculate_territory(board_before)

        board_with_move = clone_board(board)
        board_with_move[y][x] = color
        board_after_capture, captured_count, _positions = apply_captures(
            board_with_move, {"x": x, "y": y}, color
        )

        tag = tag_move(
            board_before=board_before,
            board_after_capture=board_after_capture,
            position={"x": x, "y": y},
            color=color,
            captured_count=captured_count,
            territory_before=territory_before,
        )

        if color == BLACK:
            captured_black += captured_count
        else:
            captured_white += captured_count

        out_move["capturedCount"] = captured_count
        out_move["isCapture"] = captured_count > 0
        out_move["mistakeTag"] = tag
        annotated.append(out_move)

        board = board_after_capture

    return {
        "finalBoard": board,
        "annotatedMoves": annotated,
        "capturedBlack": captured_black,
        "capturedWhite": captured_white,
    }