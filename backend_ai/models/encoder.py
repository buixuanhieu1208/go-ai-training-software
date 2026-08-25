import numpy as np

class BoardEncoder:
    """
    Bộ mã hóa chuyển đổi trạng thái bàn cờ (GoState) thành Tensor 3D cho mạng CNN.
    Kích thước đầu ra: (3, board_size, board_size) - chuẩn Channel-First của PyTorch.
    """
    def __init__(self, board_size: int = 19):
        self.board_size = board_size
        self.num_planes = 3

    def encode(self, state) -> np.ndarray:
        """
        Mã hóa bàn cờ thành 3 layer:
        - Layer 0: Vị trí quân Đen (1.0 nếu có, 0.0 nếu không)
        - Layer 1: Vị trí quân Trắng (1.0 nếu có, 0.0 nếu không)
        - Layer 2: Các ô trống hợp lệ (1.0 nếu trống, 0.0 nếu có quân)
        """
        tensor = np.zeros((self.num_planes, self.board_size, self.board_size), dtype=np.float32)
        
        for y in range(self.board_size):
            for x in range(self.board_size):
                piece = state.board[y][x]
                
                if piece == 1:
                    tensor[0][y][x] = 1.0
                elif piece == -1:
                    tensor[1][y][x] = 1.0
                elif piece == 0:
                    tensor[2][y][x] = 1.0
                    
        return tensor

    def decode_policy(self, model_output: np.ndarray, state) -> list:
        """
        (Dành cho sau này) Chuyển đổi mảng xác suất từ CNN trả về thành danh sách các nước đi hợp lệ.
        """
        pass