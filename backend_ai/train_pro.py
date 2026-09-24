"""Professional Supervised Training Pipeline for 9x9, 13x13, and 19x19."""
import os
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from torch.optim import Adam

from models.dual_network import DualCNN
from models.encoder import BoardEncoder
from utils.sgf_processor import SGFProcessor
from utils.game_logic import GoState, BLACK

WEIGHTS_DIR = "weights"
DATA_DIRS = {
    9: "data/sgf_9x9",
    13: "data/sgf_13x13",
    19: "data/sgf_19x19"
}

class ProfessionalSGFDataset(Dataset):
    def __init__(self, sgf_paths, board_size):
        self.samples = [] 
        self.encoder = BoardEncoder()
        self.board_size = board_size
        self.processor = SGFProcessor()
        self._build(sgf_paths)

    def _move_to_index(self, move) -> int:
        if move is None:
            return self.board_size * self.board_size  # Nước pass
        r, c = move
        return r * self.board_size + c

    def _build(self, sgf_paths):
        print(f"Tiến hành trích xuất dữ liệu từ {len(sgf_paths)} ván đấu {self.board_size}x{self.board_size}...")
        for path in sgf_paths:
            try:
                # Ở đây cần sửa hàm parse_sgf_file để nhận board_size nếu bạn đã update Bước 2
                moves = self.processor.parse_sgf_file(path, self.board_size)
            except Exception:
                continue
                
            state = GoState(size=self.board_size)
            winner = BLACK  # Tạm gán Đen thắng. (Nâng cao: Lấy result từ SGF)
            
            for move in moves:
                encoded_board = self.encoder.encode(state)
                policy_idx = self._move_to_index(move)
                value_target = 1.0 if state.current_player == winner else -1.0
                
                self.samples.append((encoded_board, policy_idx, value_target))
                
                if not state.apply_move(move):
                    break

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        board, policy_idx, value = self.samples[idx]
        return (
            torch.tensor(board, dtype=torch.float32),
            torch.tensor(policy_idx, dtype=torch.long),
            torch.tensor([value], dtype=torch.float32)
        )

def train_for_size(board_size: int, epochs=15, batch_size=64, lr=1e-3):
    """Quy trình huấn luyện chuyên biệt cho một kích thước bàn cờ."""
    sgf_dir = DATA_DIRS[board_size]
    if not os.path.isdir(sgf_dir):
        print(f"[*] Bỏ qua bàn {board_size}x{board_size}: Không tìm thấy thư mục {sgf_dir}")
        return

    sgf_paths = [os.path.join(sgf_dir, f) for f in os.listdir(sgf_dir) if f.endswith(".sgf")]
    if not sgf_paths:
        print(f"[*] Bỏ qua bàn {board_size}x{board_size}: Thư mục trống.")
        return

    print(f"\n==============================================")
    print(f"BẮT ĐẦU TRAINING CHO BÀN CỜ {board_size}x{board_size}")
    print(f"==============================================")
    
    device = "cuda" if torch.cuda.is_available() else "cpu"
    dataset = ProfessionalSGFDataset(sgf_paths, board_size)
    loader = DataLoader(dataset, batch_size=batch_size, shuffle=True, drop_last=True)
    
    # Khởi tạo linh hoạt kiến trúc model theo size
    model = DualCNN(board_size=board_size).to(device)
    optimizer = Adam(model.parameters(), lr=lr)
    policy_loss_fn = nn.CrossEntropyLoss()
    value_loss_fn = nn.MSELoss()
    
    model.train()
    for epoch in range(1, epochs + 1):
        total_loss = 0.0
        for board_batch, policy_target, value_target in loader:
            board_batch, policy_target, value_target = board_batch.to(device), policy_target.to(device), value_target.to(device)
            
            optimizer.zero_grad()
            policy_pred, value_pred = model(board_batch)
            
            p_loss = policy_loss_fn(policy_pred, policy_target)
            v_loss = value_loss_fn(value_pred, value_target)
            loss = p_loss + v_loss
            
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
            
        avg_loss = total_loss / max(len(loader), 1)
        print(f"Epoch [{epoch}/{epochs}] - Loss: {avg_loss:.4f}")

    os.makedirs(WEIGHTS_DIR, exist_ok=True)
    final_path = os.path.join(WEIGHTS_DIR, f"dualcnn_{board_size}x{board_size}_final.pth")
    torch.save(model.state_dict(), final_path)
    print(f"Đã lưu 'não bộ' {board_size}x{board_size} tại: {final_path}")

if __name__ == "__main__":
    # Chạy lần lượt cả 3 kích thước
    for size in [9, 13, 19]:
        train_for_size(size)
    print("\nHOÀN TẤT TOÀN BỘ QUY TRÌNH HUẤN LUYỆN!")