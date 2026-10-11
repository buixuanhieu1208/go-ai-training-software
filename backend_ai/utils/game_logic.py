"""
Bộ máy luật Cờ vây (Go / Weiqi / Baduk) — theo Luật cờ vây của Liên đoàn Cờ Việt Nam (VCF, 07/2014).

Ánh xạ Điều luật -> mã nguồn
-----------------------------
* Điều 4  (Khí)            : mỗi đám quân giữ sẵn TẬP KHÍ (`_libs`), cập nhật tăng dần (incremental).
* Điều 5  (Ăn quân)        : `_place()` -> đám quân đối phương hết khí bị nhấc toàn bộ khỏi bàn (`_remove_group`).
* Điều 6  (Điểm hết khí)   : `_legal_at()` — cấm tự sát; chỉ được đi vào điểm hết khí nếu nước đó ăn được quân.
* Điều 9  (KO / Cướp)      : `_ko` — điểm bị cấm ăn lại ngay; tự xóa sau đúng một nước đi (kể cả Pass).

Thiết kế hiệu năng (phục vụ hàng vạn rollout MCTS mỗi giây)
-----------------------------------------------------------
1. Bàn cờ là mảng PHẲNG 1 chiều có VIỀN đệm (sentinel) -> duyệt 4 hướng chỉ bằng `p±1`, `p±W`,
   không cần kiểm tra biên bằng `if`.
2. Quản lý đám quân theo kiểu Disjoint-Set / Union-Find (gộp nhỏ vào lớn – union by size, nhãn `_gid`
   trỏ thẳng về gốc nên `find` = O(1)). Mỗi gốc giữ: danh sách quân + tập khí.
   Đám quân chỉ bao giờ GỘP (khi nối) hoặc bị XÓA TRỌN (khi bị ăn) — đúng loại thao tác mà
   Union-Find xử lý tốt, không bao giờ cần "tách" đám.
3. KHÔNG có flood fill toàn bàn trong lúc chơi: số khí lấy thẳng từ `len(_libs[gốc])`.
   Kiểm tra một nước có hợp lệ hay không là O(1) (chỉ nhìn 4 ô lân cận).
   Flood fill chỉ chạy MỘT LẦN khi nạp bàn cờ từ bên ngoài (`board = ...` / `load_board`).
4. KO xử lý bằng "điểm cấm" O(1) thay vì so sánh cả bàn cờ; hash Zobrist được cập nhật tăng dần
   nên `prev_board_hash` vẫn có sẵn, tương thích code cũ.
5. `copy()` viết tay (không dùng deepcopy) và `copy.deepcopy(state)` cũng được chuyển hướng sang nó.

Tương thích ngược với bản cũ
----------------------------
Giữ nguyên: BOARD_SIZE, BLACK, WHITE, EMPTY, Move, GoState(size), .size, .board (list[list[int]],
đọc được bằng board[r][c], gán được bằng `state.board = matrix` như main.py đang làm),
.current_player, .consecutive_passes, .prev_board_hash, .history_hashes,
get_legal_moves(), apply_move(), is_terminal(), copy().
Thêm mới: is_valid_move(), load_board(), ko_point, set_ko_point(), liberties_at(), validate_invariants().

LƯU Ý: `state.board` là bản chụp chỉ-đọc (được cache). Muốn đi quân hãy dùng `apply_move()`.
"""
from __future__ import annotations

import random
from typing import Dict, List, Optional, Set, Tuple

Move = Optional[Tuple[int, int]]  # None = pass
BOARD_SIZE = 19
BLACK, WHITE, EMPTY = 1, -1, 0
_BORDER = 2  # ô viền đệm, không phải trống, không phải quân


# ---------------------------------------------------------------------------
# Bảng tra cứu tính sẵn theo kích thước bàn cờ (dùng chung cho mọi GoState cùng size)
# ---------------------------------------------------------------------------
class _Tables:
    __slots__ = ("size", "width", "dirs", "points", "coord", "zobrist", "template")

    def __init__(self, size: int):
        w = size + 2
        self.size = size
        self.width = w
        self.dirs = (-w, w, -1, 1)  # lên, xuống, trái, phải
        template = [_BORDER] * (w * w)
        coord: List[Optional[Tuple[int, int]]] = [None] * (w * w)
        points: List[int] = []
        for r in range(size):
            for c in range(size):
                p = (r + 1) * w + (c + 1)
                template[p] = EMPTY
                coord[p] = (r, c)
                points.append(p)  # thứ tự row-major, giống bản cũ
        self.template = template
        self.coord = coord
        self.points = points
        rng = random.Random(0x60_60_60)  # cố định seed -> hash ổn định giữa các lần chạy
        self.zobrist = {
            BLACK: [rng.getrandbits(64) for _ in range(w * w)],
            WHITE: [rng.getrandbits(64) for _ in range(w * w)],
        }


_TABLES: Dict[int, _Tables] = {}


def _get_tables(size: int) -> _Tables:
    t = _TABLES.get(size)
    if t is None:
        t = _TABLES[size] = _Tables(size)
    return t


class GoState:
    """Trạng thái ván cờ vây NxN, thực thi đầy đủ luật khí / ăn quân / cấm tự sát / KO."""

    def __init__(self, size: int = BOARD_SIZE):
        self._reset(size)
        self.current_player: int = BLACK
        self.consecutive_passes: int = 0  # số lượt Pass liên tiếp
        self.prev_board_hash: Optional[int] = None  # hash bàn cờ TRƯỚC nước đi gần nhất
        self.history_hashes: List[int] = []
        self.invalid_groups_removed: int = 0  # >0 nếu bàn cờ nạp vào có đám quân 0 khí (bất hợp lệ)

    # ------------------------------------------------------------------ khởi tạo
    def _reset(self, size: int) -> None:
        if not isinstance(size, int) or size < 1:
            raise ValueError("size phải là số nguyên dương")
        t = _get_tables(size)
        self.size = size
        self._t = t
        self._b: List[int] = t.template[:]          # bàn cờ phẳng có viền
        self._gid: List[int] = [0] * len(t.template)  # điểm -> gốc đám quân (0 = không có quân)
        self._stones: Dict[int, List[int]] = {}      # gốc -> danh sách quân của đám
        self._libs: Dict[int, Set[int]] = {}         # gốc -> tập khí của đám
        self._empty: Set[int] = set(t.points)        # các điểm trống
        self._hash: int = 0                          # Zobrist hash của bàn cờ hiện tại
        self._ko: int = -1                           # điểm đang bị cấm do KO (-1 = không có)
        self._grid: Optional[List[List[int]]] = None  # cache dạng ma trận cho code bên ngoài

    # ------------------------------------------------------------------ giao diện `board`
    @property
    def board(self) -> List[List[int]]:
        """Ma trận size x size (1 = Đen, -1 = Trắng, 0 = trống). CHỈ ĐỌC."""
        g = self._grid
        if g is None:
            n, w, b = self.size, self._t.width, self._b
            g = [b[(r + 1) * w + 1:(r + 1) * w + 1 + n] for r in range(n)]
            self._grid = g
        return g

    @board.setter
    def board(self, matrix: List[List[int]]) -> None:
        self.load_board(matrix)

    def load_board(
        self,
        matrix: List[List[int]],
        prev_board: Optional[List[List[int]]] = None,
        sanitize: bool = True,
    ) -> None:
        """
        Nạp một thế cờ từ bên ngoài (vd: Frontend gửi lên). Flood fill đúng MỘT LẦN ở đây.

        prev_board : (tuỳ chọn) thế cờ ngay TRƯỚC nước đi gần nhất của đối phương. Nếu truyền vào,
                     Backend suy ra được điểm KO đang bị cấm (Điều 9) dù chỉ nhận state qua HTTP.
        sanitize   : True  -> đám quân 0 khí (bất hợp lệ theo Điều 5/6) bị nhấc khỏi bàn như bị ăn,
                              số lượng ghi vào `invalid_groups_removed`.
                     False -> ném ValueError.
        """
        n = len(matrix)
        if n < 1 or any(len(row) != n for row in matrix):
            raise ValueError("board phải là ma trận vuông NxN")
        self._reset(n)
        w, b = self._t.width, self._b
        for r in range(n):
            row = matrix[r]
            for c in range(n):
                v = row[c]
                if v == EMPTY:
                    continue
                if v != BLACK and v != WHITE:
                    raise ValueError("Mỗi ô của board chỉ được là 1, -1 hoặc 0")
                b[(r + 1) * w + c + 1] = v

        dead = self._rebuild_groups()
        self.invalid_groups_removed = 0
        if dead:
            if not sanitize:
                raise ValueError("Bàn cờ có đám quân không còn khí (bất hợp lệ)")
            for group in dead:
                for s in group:
                    b[s] = EMPTY
            self.invalid_groups_removed = len(dead)
            self._rebuild_groups()

        z = self._t.zobrist
        h = 0
        for p in self._t.points:
            if b[p]:
                h ^= z[b[p]][p]
        self._hash = h
        self._empty = {p for p in self._t.points if b[p] == EMPTY}
        self._ko = -1
        self.prev_board_hash = None
        self._grid = None

        if prev_board is not None:
            self._derive_ko_from_prev(prev_board)

    def _rebuild_groups(self) -> List[List[int]]:
        """Flood fill toàn bàn (chỉ dùng khi nạp bàn cờ). Trả về các đám 0 khí tìm thấy."""
        b, gid, dirs = self._b, self._gid, self._t.dirs
        for i in range(len(gid)):
            gid[i] = 0
        self._stones, self._libs = {}, {}
        dead: List[List[int]] = []
        for p in self._t.points:
            color = b[p]
            if color == EMPTY or gid[p]:
                continue
            stack, members, libs = [p], [p], set()
            gid[p] = p
            while stack:
                s = stack.pop()
                for d in dirs:
                    q = s + d
                    v = b[q]
                    if v == EMPTY:
                        libs.add(q)
                    elif v == color and not gid[q]:
                        gid[q] = p
                        stack.append(q)
                        members.append(q)
            self._stones[p], self._libs[p] = members, libs
            if not libs:
                dead.append(members)
        return dead

    def _derive_ko_from_prev(self, prev: List[List[int]]) -> None:
        """Suy điểm KO từ (thế cờ trước, thế cờ hiện tại). Chỉ nhận dạng đúng thế KO kinh điển (Điều 9)."""
        n, w, b = self.size, self._t.width, self._b
        if len(prev) != n or any(len(row) != n for row in prev):
            return
        mover = -self.current_player  # bên vừa đi nước cuối
        added: List[int] = []
        removed: List[int] = []
        prev_hash = 0
        z = self._t.zobrist
        for r in range(n):
            for c in range(n):
                p = (r + 1) * w + c + 1
                a, cur = prev[r][c], b[p]
                if a in (BLACK, WHITE):
                    prev_hash ^= z[a][p]
                if a == cur:
                    continue
                if a == EMPTY:
                    added.append(p)
                elif cur == EMPTY:
                    removed.append(p)
                else:
                    return  # quân đổi màu -> không phải chuỗi nước đi hợp lệ
        self.prev_board_hash = prev_hash
        if len(added) == 1 and len(removed) == 1:
            x, y = added[0], removed[0]
            g = self._gid[x]
            if (b[x] == mover and prev[(y // w) - 1][(y % w) - 1] == self.current_player
                    and len(self._stones[g]) == 1 and self._libs[g] == {y}):
                self._ko = y

    # ------------------------------------------------------------------ truy vấn
    @property
    def ko_point(self) -> Optional[Tuple[int, int]]:
        """Điểm đang bị cấm do luật KO (toạ độ (hàng, cột)) hoặc None."""
        return self._t.coord[self._ko] if self._ko >= 0 else None

    def set_ko_point(self, point: Optional[Tuple[int, int]]) -> None:
        """
        Đặt điểm KO đang bị cấm đối với `current_player` (vd: Frontend gửi lên vì Backend không giữ
        lịch sử giữa các request HTTP). None = không có KO. Ném ValueError nếu điểm không hợp lệ.
        """
        if point is None:
            self._ko = -1
            return
        r, c = point
        if not (0 <= r < self.size and 0 <= c < self.size):
            raise ValueError("Điểm KO nằm ngoài bàn cờ")
        p = (r + 1) * self._t.width + c + 1
        if self._b[p] != EMPTY:
            raise ValueError("Điểm KO phải là ô trống")
        self._ko = p

    def liberties_at(self, r: int, c: int) -> int:
        """Số khí của đám quân tại (r, c) — O(1). Trả về 0 nếu ô trống / ngoài bàn."""
        if not (0 <= r < self.size and 0 <= c < self.size):
            return 0
        p = (r + 1) * self._t.width + c + 1
        g = self._gid[p]
        return len(self._libs[g]) if g else 0

    def _legal_at(self, p: int, color: int) -> bool:
        """
        Điểm p (đã biết là TRỐNG) có phải nước đi hợp lệ cho `color`? — O(1), không flood fill.

        Điều 9 : p là điểm KO đang bị cấm                     -> không hợp lệ.
        Điều 6 : có ô trống kề bên (điểm còn khí)             -> hợp lệ.
                 hết khí nhưng nối vào đám nhà còn >= 2 khí    -> hợp lệ (đám nhà vẫn còn khí sau khi lấp p).
                 hết khí nhưng ăn được đám địch chỉ còn 1 khí  -> hợp lệ (ăn xong sinh khí mới).
                 còn lại (tự sát)                              -> không hợp lệ.
        """
        if p == self._ko:
            return False
        b = self._b
        w = self._t.width
        if b[p - w] == 0 or b[p + w] == 0 or b[p - 1] == 0 or b[p + 1] == 0:
            return True
        gid, libs = self._gid, self._libs
        for q in (p - w, p + w, p - 1, p + 1):
            v = b[q]
            if v == color:
                if len(libs[gid[q]]) > 1:
                    return True
            elif v == -color:  # (viền = 2 không rơi vào nhánh này)
                if len(libs[gid[q]]) == 1:  # khí duy nhất của nó chính là p
                    return True
        return False

    def is_valid_move(self, move: Move) -> bool:
        """Nước đi có hợp lệ cho `current_player` không? (Pass luôn hợp lệ.) Không thay đổi trạng thái."""
        if move is None:
            return True
        try:
            r, c = move
        except (TypeError, ValueError):
            return False
        n = self.size
        if not (0 <= r < n and 0 <= c < n):
            return False
        p = (r + 1) * self._t.width + c + 1
        return self._b[p] == EMPTY and self._legal_at(p, self.current_player)

    def get_legal_moves(self) -> List[Move]:
        """Danh sách nước hợp lệ: [None (Pass), (r, c), ...] theo thứ tự hàng-cột như bản cũ."""
        color = self.current_player
        b, gid, libs = self._b, self._gid, self._libs
        w = self._t.width
        coord = self._t.coord
        ko = self._ko
        legal: List[Move] = [None]
        add = legal.append
        for p in sorted(self._empty):  # chỉ duyệt các điểm TRỐNG
            if p == ko:
                continue
            up, dn, lf, rt = b[p - w], b[p + w], b[p - 1], b[p + 1]
            if up == 0 or dn == 0 or lf == 0 or rt == 0:
                add(coord[p])
                continue
            # Điểm hết khí (Điều 6): chỉ hợp lệ nếu nối được vào đám còn >= 2 khí hoặc ăn được quân.
            for q, v in ((p - w, up), (p + w, dn), (p - 1, lf), (p + 1, rt)):
                if v == color:
                    if len(libs[gid[q]]) > 1:
                        add(coord[p])
                        break
                elif v == -color:
                    if len(libs[gid[q]]) == 1:
                        add(coord[p])
                        break
        return legal

    # ------------------------------------------------------------------ đi quân
    def apply_move(self, move: Move) -> bool:
        """
        Thực hiện nước đi cho `current_player`. Trả về False (và KHÔNG đổi trạng thái) nếu:
        ngoài bàn / ô đã có quân / tự sát (Điều 6) / ăn lại KO ngay lập tức (Điều 9).
        """
        color = self.current_player
        if move is None:
            self.prev_board_hash = self._hash
            self._ko = -1  # KO chỉ cấm đúng một nước kế tiếp
            self.current_player = -color
            self.consecutive_passes += 1
            return True

        try:
            r, c = move
        except (TypeError, ValueError):
            return False
        n = self.size
        if not (0 <= r < n and 0 <= c < n):
            return False
        p = (r + 1) * self._t.width + c + 1
        if self._b[p] != EMPTY or not self._legal_at(p, color):
            return False

        pre_hash = self._hash
        self._place(p, color)
        self.history_hashes.append(pre_hash)
        self.prev_board_hash = pre_hash
        self.current_player = -color
        self.consecutive_passes = 0
        self._grid = None
        return True

    def _place(self, p: int, color: int) -> None:
        """Đặt quân tại điểm p (đã được xác nhận hợp lệ): ăn quân (Điều 5), gộp đám, cập nhật khí, KO."""
        b, gid, stones, libs = self._b, self._gid, self._stones, self._libs
        dirs = self._t.dirs
        opp = -color

        b[p] = color
        self._empty.discard(p)
        self._hash ^= self._t.zobrist[color][p]
        gid[p] = p
        stones[p] = [p]
        libs[p] = set()

        # (1) Đám ĐỊCH kề bên mất khí p; hết khí -> nhấc cả đám ra khỏi bàn (Điều 5).
        captured = 0
        cap_point = -1
        for d in dirs:
            q = p + d
            if b[q] == opp:
                g = gid[q]
                gl = libs[g]
                gl.discard(p)
                if not gl:
                    removed = self._remove_group(g, opp, color)
                    captured += len(removed)
                    cap_point = removed[0]

        # (2) Gộp các đám NHÀ kề bên (Union-Find, gộp nhỏ vào lớn) và thu khí từ ô trống kề bên.
        root = p
        for d in dirs:
            q = p + d
            v = b[q]
            if v == color:
                g = gid[q]
                if g != root:
                    root = self._union(root, g)
            elif v == EMPTY:
                libs[root].add(q)
        libs[root].discard(p)  # p giờ là quân, không còn là khí của đám vừa gộp

        # (3) KO (Điều 9): ăn đúng 1 quân, quân vừa đặt đứng một mình và chỉ còn 1 khí (chính điểm vừa bị ăn).
        self._ko = -1
        if captured == 1 and len(stones[root]) == 1 and len(libs[root]) == 1:
            self._ko = cap_point

    def _union(self, a: int, g: int) -> int:
        """Gộp hai đám (union by size). Trả về gốc của đám sau khi gộp."""
        stones, libs, gid = self._stones, self._libs, self._gid
        sa, sg = stones[a], stones[g]
        if len(sa) < len(sg):
            a, g, sa, sg = g, a, sg, sa
        for s in sg:
            gid[s] = a
        sa.extend(sg)
        libs[a] |= libs[g]
        del stones[g], libs[g]
        return a

    def _remove_group(self, g: int, victim: int, capturer: int) -> List[int]:
        """Nhấc nguyên đám `g` khỏi bàn; trả khí cho các đám của bên ăn quân đang kề bên."""
        b, gid, libs = self._b, self._gid, self._libs
        dirs = self._t.dirs
        removed = self._stones.pop(g)
        del libs[g]
        zv = self._t.zobrist[victim]
        empty = self._empty
        h = self._hash
        for s in removed:
            b[s] = EMPTY
            gid[s] = 0
            empty.add(s)
            h ^= zv[s]
        self._hash = h
        for s in removed:
            for d in dirs:
                t = s + d
                if b[t] == capturer:
                    libs[gid[t]].add(s)
        return removed

    # ------------------------------------------------------------------ trạng thái ván
    def is_terminal(self) -> bool:
        """Ván kết thúc khi cả hai bên cùng Pass liên tiếp (Điều 13.2)."""
        return self.consecutive_passes >= 2

    def copy(self) -> "GoState":
        new = GoState.__new__(GoState)
        new.size = self.size
        new._t = self._t
        new._b = self._b[:]
        new._gid = self._gid[:]
        new._stones = {g: s[:] for g, s in self._stones.items()}
        new._libs = {g: s.copy() for g, s in self._libs.items()}
        new._empty = self._empty.copy()
        new._hash = self._hash
        new._ko = self._ko
        new._grid = None
        new.current_player = self.current_player
        new.consecutive_passes = self.consecutive_passes
        new.prev_board_hash = self.prev_board_hash
        new.history_hashes = self.history_hashes[:]
        new.invalid_groups_removed = self.invalid_groups_removed
        return new

    __copy__ = copy

    def __deepcopy__(self, memo) -> "GoState":  # copy.deepcopy(state) cũng đi đường nhanh
        return self.copy()

    # ------------------------------------------------------------------ gỡ lỗi
    def validate_invariants(self) -> None:
        """
        (Dùng khi test/debug) Tính lại TOÀN BỘ đám quân, khí, hash từ bàn cờ bằng flood fill độc lập
        rồi so với dữ liệu tăng dần đang giữ. Ném AssertionError nếu có lệch.
        """
        b, dirs, t = self._b, self._t.dirs, self._t
        seen: Set[int] = set()
        n_groups = 0
        h = 0
        for p in t.points:
            color = b[p]
            if color == EMPTY:
                assert p in self._empty and self._gid[p] == 0, f"ô trống {p} lệch dữ liệu"
                continue
            h ^= t.zobrist[color][p]
            if p in seen:
                continue
            members, libs, stack = {p}, set(), [p]
            while stack:
                s = stack.pop()
                for d in dirs:
                    q = s + d
                    if b[q] == EMPTY:
                        libs.add(q)
                    elif b[q] == color and q not in members:
                        members.add(q)
                        stack.append(q)
            seen |= members
            n_groups += 1
            g = self._gid[p]
            assert g and set(self._stones[g]) == members, "sai danh sách quân của đám"
            assert len(self._stones[g]) == len(members), "trùng quân trong đám"
            assert self._libs[g] == libs, f"sai tập khí: {self._libs[g]} != {libs}"
            assert libs, "tồn tại đám quân 0 khí trên bàn cờ"
            assert all(self._gid[s] == g for s in members), "nhãn gid không nhất quán"
        assert n_groups == len(self._stones) == len(self._libs), "thừa/thiếu đám quân trong từ điển"
        assert h == self._hash, "Zobrist hash lệch"
        assert self._empty == {p for p in t.points if b[p] == EMPTY}, "tập ô trống lệch"