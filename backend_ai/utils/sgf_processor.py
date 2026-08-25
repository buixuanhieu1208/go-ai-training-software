import sgf
import numpy as np

class SGFProcessor:
    """
    Công cụ đọc file kỳ phổ .SGF và trích xuất dữ liệu ván đấu.
    """
    def __init__(self):
        pass

    def parse_sgf_file(self, file_path: str) -> list:
        """
        Đọc một file SGF và trả về danh sách tuần tự các nước đi.
        Ví dụ: [('B', 'pd'), ('W', 'dp'), ...]
        """
        moves = []
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                sgf_content = f.read()
                
            collection = sgf.parse(sgf_content)
            game_tree = collection[0]
            
            # Lặp qua từng node (từng nước đi) trong ván đấu
            for node in game_tree.rest:
                if node.properties:
                    # Lấy nước đi của quân Đen (B) hoặc quân Trắng (W)
                    if 'B' in node.properties:
                        move_coords = node.properties['B'][0]
                        moves.append(('B', move_coords))
                    elif 'W' in node.properties:
                        move_coords = node.properties['W'][0]
                        moves.append(('W', move_coords))
                        
            return moves
            
        except Exception as e:
            print(f"Lỗi khi đọc file {file_path}: {e}")
            return []

    def convert_to_tensor_data(self, moves: list):
        """
        (Dành cho sau này) Tái tạo lại ván cờ từ danh sách moves.
        Tại mỗi bước, gọi BoardEncoder để lấy Tensor X (input) 
        và nước đi tiếp theo làm Label Y (output) để nạp vào CNN.
        """
        pass

# Test thử kịch bản chạy
if __name__ == "__main__":
    print("SGF Processor đã sẵn sàng!")