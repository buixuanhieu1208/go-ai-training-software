import sgf
import numpy as np

class SGFProcessor:
    """
    Công cụ đọc file kỳ phổ .SGF và trích xuất dữ liệu ván đấu.
    """
    def __init__(self):
        pass

    def _sgf_to_rc(self, sgf_coord: str, board_size: int):
        """Chuyển tọa độ SGF thành (row, col) và lọc các nước ngoài bàn cờ."""
        if not sgf_coord or len(sgf_coord) != 2:
            return None # Pass
        
        c = ord(sgf_coord[0]) - ord('a')
        r = ord(sgf_coord[1]) - ord('a')
        
        # Nếu tọa độ nằm ngoài kích thước bàn cờ thì báo lỗi (tránh crash)
        if r < 0 or r >= board_size or c < 0 or c >= board_size:
            return None
            
        return (r, c)

    def parse_sgf_file(self, file_path: str, board_size: int = 19):
        """Đọc file SGF và trích xuất danh sách các nước đi."""
        moves = []
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            import re
            # Biểu thức chính quy tìm các nước đi B[...] hoặc W[...]
            raw_moves = re.findall(r';[BW]\[([a-z]{0,2})\]', content)
            
            for coord in raw_moves:
                # SỬA Ở ĐÂY: Truyền board_size vào hàm _sgf_to_rc
                rc = self._sgf_to_rc(coord, board_size)
                if rc is not None:
                    moves.append(rc)
                    
        except Exception as e:
            print(f"Lỗi khi đọc file {file_path}: {e}")
            
        return moves

    def convert_to_tensor_data(self, moves: list):
        pass

if __name__ == "__main__":
    print("SGF Processor đã sẵn sàng!")