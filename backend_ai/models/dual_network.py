import torch
import torch.nn as nn
import torch.nn.functional as F

class DualCNN(nn.Module):
    """
    Mạng nơ-ron tích chập (CNN) kết hợp Policy Network và Value Network.
    Lấy cảm hứng từ kiến trúc AlphaGo Zero.
    """
    def __init__(self, board_size=19, in_channels=3):
        super(DualCNN, self).__init__()
        self.board_size = board_size
        
        # 1. Các lớp Convolution dùng chung (Shared Layers) trích xuất đặc trưng
        self.conv1 = nn.Conv2d(in_channels, 64, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(64, 64, kernel_size=3, padding=1)
        self.conv3 = nn.Conv2d(64, 64, kernel_size=3, padding=1)
        
        # 2. Nhánh 1: Policy Head (Mạng chính sách)
        # Đầu ra: Xác suất của các nước đi trên bàn cờ
        self.policy_conv = nn.Conv2d(64, 2, kernel_size=1)
        self.policy_fc = nn.Linear(2 * board_size * board_size, board_size * board_size)
        
        # 3. Nhánh 2: Value Head (Mạng giá trị)
        # Đầu ra: Điểm số từ -1.0 (Thua) đến 1.0 (Thắng)
        self.value_conv = nn.Conv2d(64, 1, kernel_size=1)
        self.value_fc1 = nn.Linear(1 * board_size * board_size, 256)
        self.value_fc2 = nn.Linear(256, 1)
        
    def forward(self, x):
        # Đẩy dữ liệu qua các lớp dùng chung
        x = F.relu(self.conv1(x))
        x = F.relu(self.conv2(x))
        x = F.relu(self.conv3(x))
        
        # Xử lý nhánh Policy
        p = F.relu(self.policy_conv(x))
        p = p.view(p.size(0), -1) # Làm phẳng ma trận (Flatten)
        policy_out = F.softmax(self.policy_fc(p), dim=1) # Chuyển thành phân bố xác suất
        
        # Xử lý nhánh Value
        v = F.relu(self.value_conv(x))
        v = v.view(v.size(0), -1) # Làm phẳng ma trận (Flatten)
        v = F.relu(self.value_fc1(v))
        value_out = torch.tanh(self.value_fc2(v)) # Đưa về khoảng [-1, 1]
        
        return policy_out, value_out

# Test thử xem mô hình có chạy đúng luồng không
if __name__ == "__main__":
    model = DualCNN(board_size=19, in_channels=3)
    # Giả lập 1 batch dữ liệu đầu vào chứa 1 ván cờ (1, 3, 19, 19)
    mock_input = torch.randn(1, 3, 19, 19)
    policy, value = model(mock_input)
    
    print(f"Kích thước Policy Output: {policy.shape} (Dự kiến: 1 x 361)")
    print(f"Kích thước Value Output: {value.shape} (Dự kiến: 1 x 1)")
    print(f"Value mẫu: {value.item():.4f}")