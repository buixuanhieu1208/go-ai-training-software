import numpy as np
from utils.game_logic import BLACK, WHITE

class BoardEncoder:
    """
    Bộ mã hóa chuyển đổi trạng thái bàn cờ (GoState) thành Tensor 3D cho mạng CNN.
    Kích thước đầu ra: (3, board_size, board_size) - chuẩn Channel-First của PyTorch.

    QUY ƯỚC ENCODE (khớp với cách model được train):
    - Layer 0: Quân của CURRENT PLAYER (người đến lượt đi)
    - Layer 1: Quân của OPPONENT (đối thủ)
    - Layer 2: Các ô trống

    Quy ước này đảm bảo model luôn "nhìn thấy" bàn cờ từ góc nhìn của người đến
    lượt, bất kể là Đen hay Trắng. Nếu encode theo màu tuyệt đối (Đen=layer0,
    Trắng=layer1), khi đến lượt Trắng model sẽ thấy bàn cờ bị "lật" so với lúc
    train → value output dao động cực trị (±1) mỗi lần đổi lượt.
    """

    def __init__(self):
        self.num_planes = 3

    def encode(self, state) -> np.ndarray:
        """
        Mã hóa bàn cờ thành 3 layer theo góc nhìn của current_player.
        """
        size = state.size
        current = state.current_player  # BLACK (1) hoặc WHITE (-1)
        opponent = WHITE if current == BLACK else BLACK

        tensor = np.zeros((self.num_planes, size, size), dtype=np.float32)

        for y in range(size):
            for x in range(size):
                piece = state.board[y][x]
                if piece == current:
                    tensor[0][y][x] = 1.0   # quân của current player
                elif piece == opponent:
                    tensor[1][y][x] = 1.0   # quân của đối thủ
                else:
                    tensor[2][y][x] = 1.0   # ô trống

        return tensor

    def decode_policy(self, model_output: np.ndarray, state) -> list:
        """
        (Dành cho sau này) Chuyển đổi mảng xác suất từ CNN trả về thành danh sách các nước đi hợp lệ.
        """
        pass