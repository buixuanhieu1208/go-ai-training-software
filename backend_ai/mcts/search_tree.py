import math
import torch
import numpy as np
from typing import Optional, Tuple
from models.dual_network import DualCNN
from models.encoder import BoardEncoder
from utils.game_logic import GoState, BLACK, WHITE, EMPTY

class MCTSNode:
    """Node trong cây tìm kiếm MCTS cho Cờ Vây."""
    def __init__(self, state: GoState, parent: Optional["MCTSNode"] = None, prior: float = 0.0):
        self.state = state
        self.parent = parent
        self.children: dict = {}  # Map từ move -> MCTSNode
        self.visit_count = 0
        self.value_sum = 0.0
        self.prior = prior  # Xác suất ưu tiên từ Policy Network

    def q_value(self) -> float:
        if self.visit_count == 0:
            return 0.0
        return self.value_sum / self.visit_count

    def is_leaf(self) -> bool:
        return len(self.children) == 0

    def select_child(self, c_puct: float = 1.41) -> Tuple[Optional[Tuple[int, int]], "MCTSNode"]:
        """Chọn nhánh con tốt nhất dựa trên công thức UCB (PUCT)."""
        best_score = -float("inf")
        best_move = None
        best_child = None

        for move, child in self.children.items():
            # Công thức PUCT (AlphaGo style)
            u = c_puct * child.prior * math.sqrt(self.visit_count) / (1 + child.visit_count)
            score = child.q_value() + u
            
            if score > best_score:
                best_score = score
                best_move = move
                best_child = child

        return best_move, best_child


class MCTSEngine:
    """Bộ máy tìm kiếm MCTS kết hợp DualCNN."""
    def __init__(self, model: DualCNN, device: str = "cpu", num_simulations: int = 100):
        self.model = model
        self.device = device
        self.num_simulations = num_simulations
        self.encoder = BoardEncoder()
        self.model.eval()

    def search(self, initial_state: GoState) -> Optional[Tuple[int, int]]:
        root = MCTSNode(state=initial_state.copy())

        # Chạy vòng lặp mô phỏng MCTS
        for _ in range(self.num_simulations):
            node = root
            state = initial_state.copy()

            # 1. Selection (Chọn node đi xuống)
            while not node.is_leaf() and not state.is_terminal():
                move, node = node.select_child()
                state.apply_move(move)

            # 2. Expansion & Evaluation (Mở rộng và Đánh giá bằng CNN)
            if not state.is_terminal():
                board_tensor = self.encoder.encode(state)
                board_tensor = torch.tensor(board_tensor, dtype=torch.float32).unsqueeze(0).to(self.device)

                with torch.no_grad():
                    policy, value = self.model(board_tensor)
                
                policy = policy.cpu().numpy()[0]
                val = value.item()

                # Tạo các node con dựa trên các nước đi hợp lệ và policy
                legal_moves = state.get_legal_moves()
                for move in legal_moves:
                    if move is None:
                        continue
                    r, c = move
                    idx = r * state.size + c
                    prior_prob = float(policy[idx]) if idx < len(policy) else 0.0
                    
                    next_state = state.copy()
                    next_state.apply_move(move)
                    node.children[move] = MCTSNode(state=next_state, parent=node, prior=prior_prob)
            else:
                val = 0.0  # Game over value

            # 3. Backpropagation (Lan truyền ngược giá trị lên root)
            curr = node
            while curr is not None:
                curr.visit_count += 1
                curr.value_sum += val
                val = -val  # Đổi dấu cho người chơi đối diện
                curr = curr.agent if hasattr(curr, 'agent') else curr.parent # Safe pointer update

        # Chọn nước đi có số lần ghé thăm (visit_count) cao nhất
        if not root.children:
            return None

        best_move = max(root.children.items(), key=lambda item: item[1].visit_count)[0]
        return best_move