import math
import torch
from typing import Optional, Tuple, Dict
from models.dual_network import DualCNN
from models.encoder import BoardEncoder
from utils.game_logic import GoState, BLACK, WHITE
from utils.heuristic import evaluate_heuristic


class MCTSNode:
    """Node trong cây MCTS. State được tạo LƯỜI (lazy) — chỉ copy() khi thực
    sự bị chọn đi qua ở Selection, không phải lúc Expansion. Đây là fix chính
    cho bottleneck deepcopy (xem Phần 2.2)."""

    def __init__(self, move: Optional[Tuple[int, int]], parent: Optional["MCTSNode"], prior: float = 0.0):
        self.move = move  # nước đi dẫn từ parent.state tới node này
        self.parent = parent
        self.state: Optional[GoState] = None  # LƯỜI - chỉ set khi visit lần đầu
        self.children: Dict = {}
        self.visit_count = 0
        self.value_sum = 0.0
        self.prior = prior

    def q_value(self) -> float:
        if self.visit_count == 0:
            return 0.0
        return self.value_sum / self.visit_count

    def is_leaf(self) -> bool:
        return len(self.children) == 0

    def ensure_state(self) -> GoState:
        """Materialize state đúng 1 lần duy nhất (copy 1 lần, cache lại)."""
        if self.state is None:
            self.state = self.parent.state.copy()
            self.state.apply_move(self.move)
        return self.state

    def select_child(self, c_puct: float = 1.41) -> Tuple[Tuple[int, int], "MCTSNode"]:
        """Chọn con tối đa hoá PUCT THEO GÓC NHÌN CỦA NODE CHA (self).

        FIX QUAN TRỌNG: child.q_value() được lưu theo góc nhìn của bên sắp đi
        TẠI CHILD (đối thủ của bên đang chọn ở node cha) — vì lượt đã đổi sau
        move. Phải ĐẢO DẤU (-child.q_value()) khi so sánh từ phía cha, nếu
        không MCTS sẽ hệ thống hoá việc chọn nước có lợi cho ĐỐI PHƯƠNG.
        """
        best_score = -float("inf")
        best_move = None
        best_child = None

        for move, child in self.children.items():
            q_from_parent_pov = -child.q_value()  # <-- FIX: đảo dấu
            u = c_puct * child.prior * math.sqrt(self.visit_count) / (1 + child.visit_count)
            score = q_from_parent_pov + u

            if score > best_score:
                best_score = score
                best_move = move
                best_child = child

        return best_move, best_child


class MCTSEngine:
    """MCTS kết hợp DualCNN (Policy định hướng, Value đánh giá lá), có thể
    blend thêm heuristic truyền thống (utils/heuristic.py) qua heuristic_weight
    — hữu ích cho các board_size chưa có trọng số train (xem ai_engine.py)."""

    def __init__(
        self,
        model: DualCNN,
        device: str = "cpu",
        num_simulations: int = 100,
        c_puct: float = 1.41,
        heuristic_weight: float = 0.0,  # 0.0 = chỉ dùng Value Network (mặc định, khớp hành vi cũ)
    ):
        self.model = model
        self.device = device
        self.num_simulations = num_simulations
        self.c_puct = c_puct
        self.heuristic_weight = heuristic_weight
        self.encoder = BoardEncoder()
        self.model.eval()

    def _evaluate_leaf(self, state: GoState) -> float:
        """Trả về value theo góc nhìn của state.current_player, có thể blend
        Value Network với Heuristic truyền thống."""
        board_tensor = self.encoder.encode(state)
        board_tensor = torch.tensor(board_tensor, dtype=torch.float32).unsqueeze(0).to(self.device)

        with torch.no_grad():
            policy, value = self.model(board_tensor)

        policy_np = policy.cpu().numpy()[0]
        val_net = value.item()

        if self.heuristic_weight > 0.0:
            val_heur = evaluate_heuristic(state.board, state.current_player)
            val = (1 - self.heuristic_weight) * val_net + self.heuristic_weight * val_heur
        else:
            val = val_net

        return policy_np, val

    def search(self, initial_state: GoState) -> Optional[Tuple[int, int]]:
        root = MCTSNode(move=None, parent=None)
        root.state = initial_state.copy()  # root là state duy nhất copy trước vòng lặp

        for _ in range(self.num_simulations):
            node = root

            # 1. Selection — chỉ duyệt qua node đã tồn tại, materialize state
            # lười ngay khi bước vào (ensure_state) thay vì copy trước hết loạt.
            while not node.is_leaf():
                _move, node = node.select_child(c_puct=self.c_puct)
                node.ensure_state()

            state = node.ensure_state() if node.state is None else node.state

            # 2. Expansion & Evaluation
            if not state.is_terminal():
                policy, val = self._evaluate_leaf(state)

                legal_moves = state.get_legal_moves()
                for move in legal_moves:
                    if move is None:
                        continue
                    r, c = move
                    idx = r * state.size + c
                    prior_prob = float(policy[idx]) if idx < len(policy) else 0.0
                    # KHÔNG copy() state ở đây nữa — chỉ tạo node rỗng với move+prior.
                    node.children[move] = MCTSNode(move=move, parent=node, prior=prior_prob)
            else:
                val = 0.0

            # 3. Backpropagation — mỗi node lưu value theo góc nhìn của
            # CHÍNH NÓ (bên sắp đi tại node đó); đảo dấu mỗi khi lên 1 cấp,
            # đúng bản chất zero-sum. select_child() đã tự đảo dấu khi đọc,
            # nên KHÔNG sửa gì thêm ở đây.
            curr = node
            while curr is not None:
                curr.visit_count += 1
                curr.value_sum += val
                val = -val
                curr = curr.parent

        if not root.children:
            return None

        best_move = max(root.children.items(), key=lambda item: item[1].visit_count)[0]
        return best_move