"""
Minimax + Alpha-Beta + Heuristic — dùng cho mức Easy trên bàn 9x9 và 13x13.

Vì bàn 9x9 vẫn có tới 81 điểm và 13x13 có 169 điểm, Minimax vét cạn true
depth 3 là không khả thi thời gian thực (81^3 ~ 530.000 node). Để giữ đúng
tinh thần "depth 2-3" mà vẫn chạy nhanh, engine này:
    1) Sắp xếp các nước theo điểm heuristic nhanh (move ordering) để
       Alpha-Beta cắt tỉa hiệu quả hơn.
    2) Chỉ xét TOP-K nước tốt nhất theo heuristic tại mỗi nút (candidate
       pruning) thay vì toàn bộ nước hợp lệ — đánh đổi độ chính xác lấy tốc
       độ, phù hợp với mục tiêu "AI Dễ" (không cần chơi tối ưu).
"""

from typing import List, Optional, Tuple

from utils.game_logic import GoState
from utils.heuristic import evaluate_heuristic

DEFAULT_TOP_K = 10  # số nước ứng viên xét ở mỗi nút (trừ gốc, gốc xét nhiều hơn)


class MinimaxEngine:
    def __init__(self, depth: int = 2, top_k: int = DEFAULT_TOP_K):
        self.depth = depth
        self.top_k = top_k

    def _candidate_moves(self, state: GoState, limit: int) -> List[Optional[Tuple[int, int]]]:
        """Lấy tối đa `limit` nước hứa hẹn nhất, xếp theo heuristic 1-nước-nhìn-trước."""
        legal = [m for m in state.get_legal_moves() if m is not None]
        if len(legal) <= limit:
            return legal + [None]  # luôn cho phép Pass là 1 lựa chọn

        scored = []
        mover = state.current_player
        for move in legal:
            trial = state.copy()
            trial.apply_move(move)
            score = evaluate_heuristic(trial.board, current_player=mover)
            scored.append((score, move))
        scored.sort(key=lambda x: x[0], reverse=True)
        return [m for _, m in scored[:limit]] + [None]

    def _minimax(self, state: GoState, depth: int, alpha: float, beta: float, maximizing_player: int) -> float:
        if depth == 0 or state.is_terminal():
            return evaluate_heuristic(state.board, current_player=maximizing_player)

        limit = self.top_k if depth < self.depth else max(self.top_k, 16)  # gốc xét rộng hơn 1 chút
        moves = self._candidate_moves(state, limit)

        is_maximizing = state.current_player == maximizing_player

        if is_maximizing:
            value = -float("inf")
            for move in moves:
                child = state.copy()
                child.apply_move(move)
                value = max(value, self._minimax(child, depth - 1, alpha, beta, maximizing_player))
                alpha = max(alpha, value)
                if alpha >= beta:
                    break
            return value
        else:
            value = float("inf")
            for move in moves:
                child = state.copy()
                child.apply_move(move)
                value = min(value, self._minimax(child, depth - 1, alpha, beta, maximizing_player))
                beta = min(beta, value)
                if alpha >= beta:
                    break
            return value

    def search(self, initial_state: GoState) -> Optional[Tuple[int, int]]:
        mover = initial_state.current_player
        moves = self._candidate_moves(initial_state, limit=max(self.top_k, 16))

        best_move, best_value = None, -float("inf")
        for move in moves:
            child = initial_state.copy()
            child.apply_move(move)
            value = self._minimax(child, self.depth - 1, -float("inf"), float("inf"), mover)
            if value > best_value:
                best_value, best_move = value, move

        return best_move