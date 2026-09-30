import os
import torch
from typing import Optional, Tuple

from models.dual_network import DualCNN
from mcts.search_tree import MCTSEngine
from mcts.minimax_engine import MinimaxEngine
from mcts.random_rollout_mcts import RandomRolloutMCTS
from utils.game_logic import GoState

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


WEIGHTS_BY_SIZE = {
    9: os.path.join(BASE_DIR, "models", "dualcnn_9x9_final.pth"),
    13: os.path.join(BASE_DIR, "models", "dualcnn_13x13_final.pth"),
    19: os.path.join(BASE_DIR, "models", "dualcnn_19x19_final.pth"),
}

DIFFICULTY_MCTS_CONFIG = {
    "medium": {"simulations": 300, "c_puct": 1.41, "add_root_noise": True},
    "hard": {"simulations": 1600, "c_puct": 1.25, "add_root_noise": False},
}
EASY_ROLLOUTS_19 = 50
EASY_MINIMAX_DEPTH = 2  # bàn 9x9/13x13


def _infer_channels(state_dict: dict, default: int = 64) -> int:
    """Dò số kênh ẩn thực tế của checkpoint qua shape của conv2.weight,
    thay vì hard-code — phòng trường hợp 3 checkpoint không cùng channels."""
    weight = state_dict.get("conv2.weight")
    if weight is None:
        return default
    return int(weight.shape[0])


class GoAIEngine:
    def __init__(self, simulations: int = 100, weights_by_size: Optional[dict] = None):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.simulations = simulations
        # Cho phép override từ ngoài (ví dụ khi test), mặc định dùng WEIGHTS_BY_SIZE.
        self.weights_by_size = weights_by_size if weights_by_size is not None else WEIGHTS_BY_SIZE
        self.models = {}
        self.trained_sizes: set = set()
        print(f"Khởi tạo AI Engine trên thiết bị: {self.device}")

    def _get_model(self, size: int):
        """
        THAY ĐỔI: trước đây chỉ nạp trọng số khi size == 19 (hard-code).
        Giờ tra cứu đường dẫn tương ứng trong WEIGHTS_BY_SIZE cho MỌI size
        (9, 13, 19). Không tìm thấy file hoặc load lỗi -> model khởi tạo
        ngẫu nhiên, ai_engine tự bật heuristic_weight fallback (đã có sẵn ở
        get_best_move) để AI không hoàn toàn "đánh theo bản năng" một mình.
        """
        if size not in self.models:
            print(f"Đang thiết lập não bộ cho bàn cờ {size}x{size}...")

            weights_path = self.weights_by_size.get(size)
            state_dict = None

            if weights_path:
                if os.path.exists(weights_path):
                    try:
                        # map_location='cpu': load được dù checkpoint lưu từ
                        # máy GPU (Colab) trong khi server chạy CPU.
                        state_dict = torch.load(weights_path, map_location="cpu")
                        print(f"Đã đọc trọng số cho {size}x{size}: {weights_path}")
                    except Exception as e:
                        print(f"LỖI khi đọc file trọng số '{weights_path}': {e}")
                else:
                    print(f"Cảnh báo: Không tìm thấy file trọng số tại '{weights_path}' cho bàn {size}x{size}.")
            else:
                print(f"Cảnh báo: Chưa cấu hình đường dẫn trọng số cho bàn {size}x{size}.")

            channels = _infer_channels(state_dict, default=64) if state_dict else 64
            model = DualCNN(board_size=size, channels=channels).to(self.device)

            if state_dict is not None:
                try:
                    model.load_state_dict(state_dict)
                    print(f"Thành công: Đã load kinh nghiệm cho bàn {size}x{size} (channels={channels}).")
                    self.trained_sizes.add(size)
                except Exception as e:
                    print(f"LỖI khi nạp trọng số vào kiến trúc DualCNN cho {size}x{size}: {e}")
                    print("AI sẽ chạy với trọng số khởi tạo ngẫu nhiên (chưa học), tự động bật heuristic fallback.")
            else:
                print(
                    f"Cảnh báo: Chưa có dữ liệu huấn luyện hợp lệ cho bàn {size}x{size}. "
                    f"AI sẽ dùng Heuristic truyền thống hỗ trợ."
                )

            model.eval()
            self.models[size] = model

        return self.models[size]

    def get_best_move(self, current_state: GoState, difficulty: str = "hard") -> Optional[Tuple[int, int]]:
        """
        Định tuyến thuật toán theo difficulty ("easy" | "medium" | "hard") —
        GIỮ NGUYÊN logic định tuyến đã thiết kế ở lượt trước, không đổi gì
        ở phần này. Thay đổi duy nhất trong file này nằm ở _get_model()
        phía trên (nạp đúng 1-trong-3 checkpoint theo size).
        """
        difficulty = (difficulty or "hard").lower()
        size = current_state.size

        # Chốt chặn dùng chung cho MỌI mức độ (Easy/Medium/Hard): nếu ván đã kết thúc hoặc không còn
        # nước đặt quân hợp lệ nào (bàn kín, chỉ còn điểm tự sát / KO) thì chỉ có thể Pass.
        # Trả về None ngay, không nạp model, không chạy Minimax/MCTS.
        if current_state.is_terminal() or all(m is None for m in current_state.get_legal_moves()):
            return None

        # ---- MỨC EASY: không dùng DualCNN, định tuyến khác theo kích thước ----
        if difficulty == "easy":
            if size == 19:
                engine = RandomRolloutMCTS(num_simulations=EASY_ROLLOUTS_19)
            else:
                engine = MinimaxEngine(depth=EASY_MINIMAX_DEPTH)
            return engine.search(current_state)

        # ---- MỨC MEDIUM / HARD: MCTS + DualCNN ----
        cfg = DIFFICULTY_MCTS_CONFIG.get(difficulty, DIFFICULTY_MCTS_CONFIG["hard"])
        model = self._get_model(size)

        # Board chưa có trọng số hợp lệ (load lỗi hoặc thiếu file) -> bật
        # heuristic fallback thay vì để AI hoàn toàn ngẫu nhiên.
        heuristic_weight = 0.0 if size in self.trained_sizes else 0.35

        mcts = MCTSEngine(
            model=model,
            device=self.device,
            num_simulations=cfg["simulations"],
            c_puct=cfg["c_puct"],
            heuristic_weight=heuristic_weight,
            add_root_noise=cfg["add_root_noise"],
        )
        return mcts.search(current_state)