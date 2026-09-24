import os
import torch
from models.dual_network import DualCNN
from mcts.search_tree import MCTSEngine
from utils.game_logic import GoState

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_WEIGHTS_19 = os.path.join(BASE_DIR, "models", "dualcnn_go_model_2095.pth")


def _infer_channels(state_dict: dict, default: int = 64) -> int:
    """Dò số kênh ẩn thực tế của checkpoint qua shape của conv2.weight,
    thay vì hard-code — tránh lặp lại lỗi lệch kiến trúc như hiện tại."""
    weight = state_dict.get("conv2.weight")
    if weight is None:
        return default
    return int(weight.shape[0])


class GoAIEngine:
    def __init__(self, simulations: int = 100, weights_path: str = DEFAULT_WEIGHTS_19):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.simulations = simulations
        self.weights_path = weights_path
        self.models = {}
        print(f"Khởi tạo AI Engine trên thiết bị: {self.device}")

    def _get_model(self, size: int):
        if size not in self.models:
            print(f"Đang thiết lập não bộ cho bàn cờ {size}x{size}...")

            state_dict = None
            if size == 19:
                if os.path.exists(self.weights_path):
                    try:
                        # map_location='cpu': load được dù checkpoint lưu từ
                        # máy GPU (Colab) trong khi server chạy CPU.
                        state_dict = torch.load(self.weights_path, map_location="cpu")
                        print(f"Đã đọc trọng số: {self.weights_path}")
                    except Exception as e:
                        print(f"LỖI khi đọc file trọng số '{self.weights_path}': {e}")
                else:
                    print(f"Cảnh báo: Không tìm thấy file trọng số tại '{self.weights_path}'.")

            channels = _infer_channels(state_dict, default=64) if state_dict else 64
            model = DualCNN(board_size=size, channels=channels).to(self.device)

            if state_dict is not None:
                try:
                    model.load_state_dict(state_dict)
                    print(f"Thành công: Đã load kinh nghiệm cho bàn {size}x{size} (channels={channels}).")
                except Exception as e:
                    print(f"LỖI khi nạp trọng số vào kiến trúc DualCNN: {e}")
                    print("AI sẽ chạy với trọng số khởi tạo ngẫu nhiên (chưa học).")
            else:
                print(f"Cảnh báo: Chưa có dữ liệu huấn luyện cho bàn {size}x{size}. AI sẽ đánh theo bản năng.")

            model.eval()
            self.models[size] = model

        return self.models[size]

    def get_best_move(self, current_state: GoState):
        model = self._get_model(current_state.size)
        mcts = MCTSEngine(model=model, device=self.device, num_simulations=self.simulations)
        return mcts.search(current_state)