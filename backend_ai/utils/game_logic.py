"""Go (Weiqi/Baduk) game rules engine: legality, capture, suicide, simple ko."""
from __future__ import annotations
from typing import List, Tuple, Optional, Set
import copy

Move = Optional[Tuple[int, int]]  # None = pass
BOARD_SIZE = 19
BLACK, WHITE, EMPTY = 1, -1, 0

class GoState:
    """Represents a 19x19 Go board state with rule enforcement."""
    def __init__(self, size: int = BOARD_SIZE):
        self.size = size
        self.board: List[List[int]] = [[EMPTY] * size for _ in range(size)]
        self.current_player: int = BLACK
        self.prev_board_hash: Optional[int] = None
        self.history_hashes: List[int] = []
        self.consecutive_passes: int = 0  # Theo dõi số lượt pass liên tiếp

    def _in_bounds(self, r: int, c: int) -> bool:
        return 0 <= r < self.size and 0 <= c < self.size

    def _neighbors(self, r: int, c: int) -> List[Tuple[int, int]]:
        pts = [(r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)]
        return [(nr, nc) for nr, nc in pts if self._in_bounds(nr, nc)]

    def _hash_board(self, board: List[List[int]]) -> int:
        return hash(tuple(tuple(row) for row in board))

    def _get_group(self, board: List[List[int]], r: int, c: int) -> Tuple[Set[Tuple[int, int]], Set[Tuple[int, int]]]:
        color = board[r][c]
        stack = [(r, c)]
        visited: Set[Tuple[int, int]] = set()
        liberties: Set[Tuple[int, int]] = set()
        while stack:
            cr, cc = stack.pop()
            if (cr, cc) in visited:
                continue
            visited.add((cr, cc))
            for nr, nc in self._neighbors(cr, cc):
                val = board[nr][nc]
                if val == EMPTY:
                    liberties.add((nr, nc))
                elif val == color and (nr, nc) not in visited:
                    stack.append((nr, nc))
        return visited, liberties

    def _remove_group(self, board: List[List[int]], group: Set[Tuple[int, int]]) -> None:
        for r, c in group:
            board[r][c] = EMPTY

    def _simulate_move(self, board: List[List[int]], move: Tuple[int, int], color: int) -> Optional[List[List[int]]]:
        r, c = move
        if board[r][c] != EMPTY:
            return None
        new_board = copy.deepcopy(board)
        new_board[r][c] = color
        opponent = -color
        captured_any = False
        
        # Bắt quân đối phương không còn khí
        for nr, nc in self._neighbors(r, c):
            if new_board[nr][nc] == opponent:
                group, libs = self._get_group(new_board, nr, nc)
                if len(libs) == 0:
                    self._remove_group(new_board, group)
                    captured_any = True
                    
        # Kiểm tra tự sát
        own_group, own_libs = self._get_group(new_board, r, c)
        if len(own_libs) == 0 and not captured_any:
            return None
        if len(own_libs) == 0 and captured_any:
            return None
            
        return new_board

    def get_legal_moves(self) -> List[Move]:
        legal: List[Move] = [None]
        color = self.current_player
        for r in range(self.size):
            for c in range(self.size):
                if self.board[r][c] != EMPTY:
                    continue
                result = self._simulate_move(self.board, (r, c), color)
                if result is None:
                    continue
                if self.prev_board_hash is not None and self._hash_board(result) == self.prev_board_hash:
                    continue
                legal.append((r, c))
        return legal

    def apply_move(self, move: Move) -> bool:
        color = self.current_player
        if move is None:
            self.prev_board_hash = self._hash_board(self.board)
            self.current_player = -color
            self.consecutive_passes += 1  # Tăng biến đếm Pass
            return True
            
        r, c = move
        if not self._in_bounds(r, c) or self.board[r][c] != EMPTY:
            return False
            
        result = self._simulate_move(self.board, (r, c), color)
        if result is None:
            return False
            
        if self.prev_board_hash is not None and self._hash_board(result) == self.prev_board_hash:
            return False
            
        pre_move_hash = self._hash_board(self.board)
        self.board = result
        self.history_hashes.append(pre_move_hash)
        self.prev_board_hash = pre_move_hash
        self.current_player = -color
        self.consecutive_passes = 0  # Reset biến đếm Pass khi có nước đi hợp lệ
        return True

    def is_terminal(self) -> bool:
        """Trò chơi kết thúc khi cả 2 người chơi cùng Pass (Bỏ lượt)."""
        return self.consecutive_passes >= 2

    def copy(self) -> "GoState":
        return copy.deepcopy(self)