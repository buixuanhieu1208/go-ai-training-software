"""
MCTS thuần (không dùng mạng nơ-ron) — Random Rollout — dùng cho mức Easy
trên bàn 19x19, nơi Minimax quá tải (xem ai_engine.py).

Khác MCTSEngine (search_tree.py):
    - KHÔNG có Policy Network định hướng mở rộng -> mở rộng và chọn nước
      ngẫu nhiên trong các nước hợp lệ (UCT thuần, không phải PUCT).
    - KHÔNG có Value Network đánh giá lá -> đánh giá bằng cách chơi ngẫu
      nhiên tiếp (rollout) tới khi kết thúc hoặc chạm giới hạn số nước, rồi
      chấm điểm bằng utils/heuristic.py (nhanh hơn nhiều so với chơi tới hết
      ván thật trên 19x19, đủ dùng vì đây chỉ là mức Easy).
"""

import math
import random
from typing import Dict, List, Optional, Tuple

from utils.game_logic import GoState
from utils.heuristic import evaluate_heuristic

ROLLOUT_DEPTH_CAP = 40  # giới hạn số nước rollout ngẫu nhiên trước khi chấm điểm bằng heuristic


class _RandomRolloutNode:
    def __init__(self, move: Optional[Tuple[int, int]], parent: Optional["_RandomRolloutNode"]):
        self.move = move
        self.parent = parent
        self.children: Dict[Optional[Tuple[int, int]], "_RandomRolloutNode"] = {}
        self.untried_moves: Optional[List] = None  # lười: chỉ liệt kê khi cần
        self.visit_count = 0
        self.value_sum = 0.0

    def q_value(self) -> float:
        return 0.0 if self.visit_count == 0 else self.value_sum / self.visit_count

    def is_fully_expanded(self) -> bool:
        return self.untried_moves is not None and len(self.untried_moves) == 0


class RandomRolloutMCTS:
    """MCTS-UCT thuần cho mức Easy trên bàn lớn (19x19)."""

    def __init__(self, num_simulations: int = 50, c_uct: float = 1.41):
        self.num_simulations = num_simulations
        self.c_uct = c_uct

    def _select_uct(self, node: _RandomRolloutNode) -> _RandomRolloutNode:
        best_score, best_child = -float("inf"), None
        for child in node.children.values():
            if child.visit_count == 0:
                return child
            exploit = -child.q_value()  # đảo dấu: góc nhìn cha, cùng lý do như MCTSEngine chính
            explore = self.c_uct * math.sqrt(math.log(node.visit_count) / child.visit_count)
            score = exploit + explore
            if score > best_score:
                best_score, best_child = score, child
        return best_child

    def _rollout(self, state: GoState) -> float:
        """Chơi ngẫu nhiên tối đa ROLLOUT_DEPTH_CAP nước, rồi chấm điểm bằng heuristic
        theo góc nhìn của bên đang chơi TẠI THỜI ĐIỂM rollout bắt đầu."""
        rollout_state = state.copy()
        mover_at_start = rollout_state.current_player

        for _ in range(ROLLOUT_DEPTH_CAP):
            if rollout_state.is_terminal():
                break
            legal = rollout_state.get_legal_moves()
            move = random.choice(legal)  # bao gồm cả khả năng Pass (None)
            rollout_state.apply_move(move)

        val_black_pov = evaluate_heuristic(rollout_state.board, current_player=1)
        return val_black_pov if mover_at_start == 1 else -val_black_pov

    def search(self, initial_state: GoState) -> Optional[Tuple[int, int]]:
        root = _RandomRolloutNode(move=None, parent=None)
        root_state = initial_state.copy()

        for _ in range(self.num_simulations):
            node, state = root, root_state.copy()

            # 1) Selection
            while node.untried_moves is not None and len(node.untried_moves) == 0 and node.children:
                node = self._select_uct(node)
                state.apply_move(node.move)

            # 2) Expansion (1 node ngẫu nhiên mỗi lần, thay vì mở hết như MCTSEngine chính
            #    — vì không có Policy Network để định giá trước cho toàn bộ 200-300 nhánh)
            if node.untried_moves is None:
                node.untried_moves = state.get_legal_moves()

            if node.untried_moves:
                move = node.untried_moves.pop(random.randrange(len(node.untried_moves)))
                state.apply_move(move)
                child = _RandomRolloutNode(move=move, parent=node)
                node.children[move] = child
                node = child

            # 3) Simulation (rollout ngẫu nhiên + chấm điểm heuristic)
            val = self._rollout(state) if not state.is_terminal() else 0.0

            # 4) Backpropagation
            curr = node
            while curr is not None:
                curr.visit_count += 1
                curr.value_sum += val
                val = -val
                curr = curr.parent

        if not root.children:
            return None
        return max(root.children.items(), key=lambda kv: kv[1].visit_count)[0]