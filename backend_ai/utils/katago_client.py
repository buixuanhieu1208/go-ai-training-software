import json
import subprocess
import threading
import time
import logging
from typing import List, Dict, Any, Optional

logger = logging.getLogger("katago_client")

class KataGoClient:
    def __init__(self, katago_path: str, model_path: str, config_path: str = None):
        """
        Khởi tạo kết nối với KataGo Analysis Engine thông qua subprocess.
        """
        self.katago_path = katago_path
        self.model_path = model_path
        self.config_path = config_path
        self.process: Optional[subprocess.Popen] = None
        self.lock = threading.Lock()
        self.query_counter = 0

    def start(self):
        cmd = [self.katago_path, "analysis", "-model", self.model_path]
        if self.config_path:
            cmd.extend(["-config", self.config_path])
        
        try:
            self.process = subprocess.Popen(
                cmd,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                bufsize=1
            )
            logger.info("KataGo Analysis Engine started successfully.")
        except Exception as e:
            logger.error(f"Failed to start KataGo: {e}")
            self.process = None

    def stop(self):
        if self.process:
            self.process.terminate()
            self.process = None
            logger.info("KataGo Analysis Engine stopped.")

    def analyze(self, board: List[List[int]], current_player: int, max_visits: int = 60) -> Dict[str, Any]:
        """
        Gửi yêu cầu phân tích thế cờ cho KataGo.
        `board`: Ma trận bàn cờ 2D (1: Đen, -1: Trắng, 0: Trống)
        """
        if not self.process or self.process.poll() is not None:
            self.start()
            if not self.process:
                return {}

        self.query_counter += 1
        query_id = f"q{self.query_counter}"
        board_size = len(board)

        initial_stones = []
        col_chars = "ABCDEFGHJKLMNOPQRST"
        for y in range(board_size):
            for x in range(board_size):
                if board[y][x] != 0:
                    color_str = "B" if board[y][x] == 1 else "W"
                    col_str = col_chars[x]
                    row_str = str(board_size - y)
                    initial_stones.append([color_str, f"{col_str}{row_str}"])

        # Nếu current_player là Trắng, ta phải thêm 1 nước 'pass' của Đen vào moves
        # để báo cho KataGo biết tới lượt Trắng đi. (Vì initialStones mặc định xong là tới lượt Đen).
        moves = []
        if current_player == -1:
            moves.append(["B", "pass"])

        query = {
            "id": query_id,
            "rules": "chinese",
            "komi": 7.5,
            "boardXSize": board_size,
            "boardYSize": board_size,
            "initialStones": initial_stones,
            "moves": moves,
            "analyzeTurns": [len(moves)],
            "maxVisits": max_visits
        }

        with self.lock:
            try:
                self.process.stdin.write(json.dumps(query) + "\n")
                self.process.stdin.flush()
            except Exception as e:
                logger.error(f"Error sending query to KataGo: {e}")
                return {}

            while True:
                line = self.process.stdout.readline()
                if not line:
                    return {}
                try:
                    resp = json.loads(line)
                    if resp.get("id") == query_id and ("moveInfos" in resp or "rootInfo" in resp):
                        return self._parse_response(resp, board_size)
                except json.JSONDecodeError:
                    continue

    def _parse_response(self, resp: Dict[str, Any], board_size: int) -> Dict[str, Any]:
        root_info = resp.get("rootInfo", {})
        move_infos = resp.get("moveInfos", [])

        current_player = root_info.get("currentPlayer", "B")
        winrate = root_info.get("winrate", 0.5)
        score_lead = root_info.get("scoreLead", 0.0)

        black_winrate = winrate if current_player == "B" else 1.0 - winrate
        black_score_lead = score_lead if current_player == "B" else -score_lead

        col_chars = "ABCDEFGHJKLMNOPQRST"
        hints = []
        
        for i, info in enumerate(move_infos):
            move_str = info.get("move", "")
            if move_str.lower() != "pass":
                col_char = move_str[0].upper()
                row_str = move_str[1:]
                try:
                    x = col_chars.index(col_char)
                    y = board_size - int(row_str)
                    hints.append({
                        "rank": i + 1,
                        "position": {"x": x, "y": y},
                        "confidence": info.get("prior", 0),
                        "winrate": info.get("winrate", 0),
                        "scoreLead": info.get("scoreLead", 0),
                        "pv": info.get("pv", [])
                    })
                except Exception:
                    pass

        return {
            "valueEstimate": {
                "blackWinRate": black_winrate,
                "scoreLead": black_score_lead
            },
            "policyHints": hints[:5]
        }

    def analyze_full_game(self, board_size: int, moves: List[Dict], max_visits: int = 30) -> List[Dict]:
        """
        Phân tích toàn bộ lịch sử ván cờ (để vẽ Winrate Graph và Variations).
        Trả về danh sách dữ liệu phân tích tương ứng cho TỪNG nước đi.
        """
        if not self.process or self.process.poll() is not None:
            self.start()
            if not self.process:
                return []

        self.query_counter += 1
        query_id = f"q{self.query_counter}"

        katago_moves = []
        col_chars = "ABCDEFGHJKLMNOPQRST"
        for m in moves:
            color_str = "B" if m["color"] == 1 or str(m["color"]).lower() == "black" else "W"
            if m.get("position"):
                x = m["position"]["x"]
                y = m["position"]["y"]
                col_str = col_chars[x]
                row_str = str(board_size - y)
                katago_moves.append([color_str, f"{col_str}{row_str}"])
            else:
                katago_moves.append([color_str, "pass"])

        analyze_turns = list(range(len(katago_moves) + 1))
        
        query = {
            "id": query_id,
            "rules": "chinese",
            "komi": 7.5,
            "boardXSize": board_size,
            "boardYSize": board_size,
            "moves": katago_moves,
            "analyzeTurns": analyze_turns,
            "maxVisits": max_visits
        }

        results_by_turn = {}
        with self.lock:
            try:
                self.process.stdin.write(json.dumps(query) + "\n")
                self.process.stdin.flush()
            except Exception as e:
                logger.error(f"Error sending full game query to KataGo: {e}")
                return []

            turns_received = 0
            while turns_received < len(analyze_turns):
                line = self.process.stdout.readline()
                if not line:
                    break
                try:
                    resp = json.loads(line)
                    if resp.get("id") == query_id and ("moveInfos" in resp or "rootInfo" in resp):
                        turn = resp.get("turnNumber", 0)
                        results_by_turn[turn] = self._parse_response(resp, board_size)
                        turns_received += 1
                except json.JSONDecodeError:
                    continue

        # Sort and return in order
        ordered_results = []
        for i in range(len(analyze_turns)):
            if i in results_by_turn:
                ordered_results.append(results_by_turn[i])
            else:
                ordered_results.append({"valueEstimate": {"blackWinRate": 0.5, "scoreLead": 0}, "policyHints": []})
        
        return ordered_results
