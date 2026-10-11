import torch
import torch.nn as nn
import torch.nn.functional as F

class ResNetBlock(nn.Module):
    def __init__(self, channels):
        super(ResNetBlock, self).__init__()
        self.conv1 = nn.Conv2d(channels, channels, kernel_size=3, padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(channels)
        self.conv2 = nn.Conv2d(channels, channels, kernel_size=3, padding=1, bias=False)
        self.bn2 = nn.BatchNorm2d(channels)

    def forward(self, x):
        residual = x
        out = F.relu(self.bn1(self.conv1(x)))
        out = self.bn2(self.conv2(out))
        out += residual
        return F.relu(out)

class DualCNN(nn.Module):
    """
    Mạng nơ-ron tích chập (CNN) kết hợp Policy Network và Value Network.
    Phiên bản nâng cấp: Sử dụng kiến trúc ResNet (AlphaZero style) để AI có tư duy sâu hơn.
    """
    def __init__(self, board_size=19, in_channels=3, channels=128, num_res_blocks=5):
        super(DualCNN, self).__init__()
        self.board_size = board_size
        self.channels = channels
        
        # Lớp Convolution đầu vào
        self.conv_in = nn.Conv2d(in_channels, channels, kernel_size=3, padding=1, bias=False)
        self.bn_in = nn.BatchNorm2d(channels)
        
        # Thân mạng: Khối ResNet (num_res_blocks càng nhiều, AI càng thông minh nhưng chạy càng nặng)
        self.res_blocks = nn.Sequential(*[ResNetBlock(channels) for _ in range(num_res_blocks)])

        # Nhánh Policy (Gợi ý nước đi)
        self.policy_conv = nn.Conv2d(channels, 2, kernel_size=1, bias=False)
        self.policy_bn = nn.BatchNorm2d(2)
        self.policy_fc = nn.Linear(2 * board_size * board_size, board_size * board_size)

        # Nhánh Value (Đánh giá tỉ lệ thắng)
        self.value_conv = nn.Conv2d(channels, 1, kernel_size=1, bias=False)
        self.value_bn = nn.BatchNorm2d(1)
        self.value_fc1 = nn.Linear(1 * board_size * board_size, 256)
        self.value_fc2 = nn.Linear(256, 1)
        
    def forward(self, x):
        # Đầu vào
        x = F.relu(self.bn_in(self.conv_in(x)))
        
        # Đi qua các khối ResNet (Suy nghĩ sâu)
        x = self.res_blocks(x)
        
        # Xử lý nhánh Policy
        p = F.relu(self.policy_bn(self.policy_conv(x)))
        p = p.view(p.size(0), -1) # Flatten
        policy_out = F.softmax(self.policy_fc(p), dim=1)
        
        # Xử lý nhánh Value
        v = F.relu(self.value_bn(self.value_conv(x)))
        v = v.view(v.size(0), -1) # Flatten
        v = F.relu(self.value_fc1(v))
        value_out = torch.tanh(self.value_fc2(v))
        
        return policy_out, value_out