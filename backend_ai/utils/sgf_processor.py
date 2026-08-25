import sgf
import numpy as np

class SGFProcessor:
    """
    Công cụ đọc file kỳ phổ .SGF và trích xuất dữ liệu ván đấu.
    """
    def __init__(self):
        pass

    def _sgf_to_rc(self, sgf_coord: str):
        """Chuyển tọa độ SGF (ví dụ 'pd') thành (row, col) (ví dụ (3, 15))."""
        if not sgf_coord or len(sgf_coord) != 2:
            return None # Pass (Bỏ lượt)
        
        # 'a' mã ascii là 97. Trừ đi để lấy index từ 0 -> 18
        c = ord(sgf_coord[0]) - ord('a')
        r = ord(sgf_coord[1]) - ord('a')
        return (r, c)

    def parse_sgf_file(self, file_path: str) -> list:
        """
        Đọc một file SGF và trả về danh sách tuần tự các nước đi dạng (row, col).
        """
        moves = []
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                sgf_content = f.read()
                
            collection = sgf.parse(sgf_content)
            game_tree = collection[0]
            
            # Lặp qua từng node trong ván đấu
            for node in game_tree.rest:
                if node.properties:
                    # Lấy nước đi của quân Đen (B) hoặc quân Trắng (W)
                    if 'B' in node.properties:
                        sgf_coord = node.properties['B'][0]
                        moves.append(self._sgf_to_rc(sgf_coord))
                    elif 'W' in node.properties:
                        sgf_coord = node.properties['W'][0]
                        moves.append(self._sgf_to_rc(sgf_coord))
                        
            return moves
            
        except Exception as e:
            print(f"Lỗi khi đọc file {file_path}: {e}")
            return []

    def convert_to_tensor_data(self, moves: list):
        pass

if __name__ == "__main__":
    print("SGF Processor đã sẵn sàng!")