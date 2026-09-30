# backend_ai/mcts/search_tree.py
import math
import random
import torch
from typing import Optional, Tuple, Dict
from models.dual_network import DualCNN
from models.encoder import BoardEncoder
from utils.game_logic import GoState, BLACK, WHITE
from utils.heuristic import evaluate_heuristic


class MCTSNode:
    def __init__(self, move: Optional[Tuple[int, int]], parent: Optional["MCTSNode"], prior: float = 0.0):
        self.move = move
        self.parent = parent
        self.state: Optional[GoState] = None
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
        if self.state is None:
            self.state = self.parent.state.copy()
            self.state.apply_move(self.move)
        return self.state

    def select_child(self, c_puct: float = 1.41) -> Tuple[Tuple[int, int], "MCTSNode"]:
        best_score = -float("inf")
        best_move = None
        best_child = None
        for move, child in self.children.items():
            q_from_parent_pov = -child.q_value()
            u = c_puct * child.prior * math.sqrt(self.visit_count) / (1 + child.visit_count)
            score = q_from_parent_pov + u
            if score > best_score:
                best_score = score
                best_move = move
                best_child = child
        return best_move, best_child


class MCTSEngine:
    def __init__(
        self,
        model: DualCNN,
        device: str = "cpu",
        num_simulations: int = 100,
        c_puct: float = 1.41,
        heuristic_weight: float = 0.0,
        add_root_noise: bool = False,
        dirichlet_alpha: float = 0.3,
        dirichlet_epsilon: float = 0.25,
    ):
        self.model = model
        self.device = device
        self.num_simulations = num_simulations
        self.c_puct = c_puct
        self.heuristic_weight = heuristic_weight
        self.add_root_noise = add_root_noise
        self.dirichlet_alpha = dirichlet_alpha
        self.dirichlet_epsilon = dirichlet_epsilon
        self.encoder = BoardEncoder()
        self.model.eval()

    def _evaluate_leaf(self, state: GoState):
        board_tensor = self.encoder.encode(state)
        board_tensor = torch.tensor(board_tensor, dtype=torch.float32).unsqueeze(0).to(self.device)

        with torch.no_grad():
            policy, value = self.model(board_tensor)
            policy = torch.softmax(policy, dim=1)  # chuẩn hoá logits thô thành xác suất

        policy_np = policy.cpu().numpy()[0]
        val_net = value.item()

        if self.heuristic_weight > 0.0:
            val_heur = evaluate_heuristic(state.board, state.current_player)
            val = (1 - self.heuristic_weight) * val_net + self.heuristic_weight * val_heur
        else:
            val = val_net

        return policy_np, val

    def _priors_for_moves(self, policy_np, state: GoState) -> Dict:
        legal_moves = state.get_legal_moves()
        priors = {}
        for move in legal_moves:
            if move is None:
                continue
            r, c = move
            idx = r * state.size + c
            priors[move] = float(policy_np[idx]) if idx < len(policy_np) else 0.0

        # Không còn nước đặt quân hợp lệ (bàn kín / chỉ còn điểm hết khí hoặc KO): nước duy nhất là Pass.
        # Phải tạo nhánh None, nếu không nút này không có con, cây MCTS "đứng" tại đó và mạng bị gọi lặp lại vô ích.
        if not priors:
            priors[None] = 1.0
        return priors

    def search(self, initial_state: GoState) -> Optional[Tuple[int, int]]:
        root = MCTSNode(move=None, parent=None)
        root.state = initial_state.copy()

        # Chốt chặn: ván đã kết thúc, hoặc chỉ còn Pass (không có lựa chọn nào để so sánh)
        # -> trả về None ngay, KHÔNG chạy num_simulations lần gọi mạng vô ích.
        if root.state.is_terminal() or all(m is None for m in root.state.get_legal_moves()):
            return None

        if not root.state.is_terminal():
            policy, _root_val = self._evaluate_leaf(root.state)
            priors = self._priors_for_moves(policy, root.state)

            if self.add_root_noise and priors:
                moves_list = list(priors.keys())
                noise = [random.gammavariate(self.dirichlet_alpha, 1.0) for _ in moves_list]
                noise_sum = sum(noise) or 1.0
                noise = [n / noise_sum for n in noise]
                for m, n in zip(moves_list, noise):
                    priors[m] = (1 - self.dirichlet_epsilon) * priors[m] + self.dirichlet_epsilon * n

            for move, p in priors.items():
                root.children[move] = MCTSNode(move=move, parent=root, prior=p)

        for _ in range(self.num_simulations):
            node = root
            while not node.is_leaf():
                _move, node = node.select_child(c_puct=self.c_puct)
                node.ensure_state()

            state = node.ensure_state() if node.state is None else node.state

            if not state.is_terminal():
                policy, val = self._evaluate_leaf(state)
                priors = self._priors_for_moves(policy, state)
                for move, p in priors.items():
                    node.children[move] = MCTSNode(move=move, parent=node, prior=p)
            else:
                val = 0.0

            curr = node
            while curr is not None:
                curr.visit_count += 1
                curr.value_sum += val
                val = -val
                curr = curr.parent

        if not root.children:
            return None
        return max(root.children.items(), key=lambda item: item[1].visit_count)[0]