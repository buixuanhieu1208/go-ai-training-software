import json
import subprocess
import threading
import time
import logging
import queue
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
        self.stdout_queue: queue.Queue = queue.Queue()
        self.reader_thread: Optional[threading.Thread] = None
        self.lock = threading.Lock()
        self.query_counter = 0

    def _stdout_reader(self, proc: subprocess.Popen):
        """Đọc liên tục từ stdout của KataGo và đưa vào queue để tránh block vô tận."""
        while True:
            try:
                line = proc.stdout.readline()
                if not line:
                    break
                self.stdout_queue.put(line)
            except Exception:
                break

    def _read_line(self, timeout: float = 3.0) -> Optional[str]:
        """Đọc 1 dòng từ queue với cơ chế timeout an toàn."""
        try:
            return self.stdout_queue.get(timeout=timeout)
        except queue.Empty:
            return None

    def start(self):
        cmd = [self.katago_path, "analysis", "-model", self.model_path]
        if self.config_path:
            cmd.extend(["-config", self.config_path])
        
        try:
            # QUAN TRỌNG: Dùng stderr=subprocess.DEVNULL để tránh tràn buffer OS pipe (4KB)
            # gây deadlock đóng băng hoàn toàn subprocess KataGo trên Windows.
            self.process = subprocess.Popen(
                cmd,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.DEVNULL,
                text=True,
                bufsize=1,
                close_fds=True
            )
            self.stdout_queue = queue.Queue()
            self.reader_thread = threading.Thread(target=self._stdout_reader, args=(self.process,), daemon=True)
            self.reader_thread.start()
            logger.info("KataGo Analysis Engine started successfully (stderr=DEVNULL, async stdout queue).")
        except Exception as e:
            logger.error(f"Failed to start KataGo: {e}")
            self.process = None

    def stop(self):
        if self.process:
            try:
                self.process.terminate()
                self.process.wait(timeout=2.0)
            except Exception:
                try:
                    self.process.kill()
                except Exception:
                    pass
            self.process = None
            logger.info("KataGo Analysis Engine stopped.")

    def analyze(self, board: List[List[int]], current_player: int, max_visits: int = 60, consecutive_passes: int = 0) -> Dict[str, Any]:
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

        # Thiết lập đúng lượt đi và lịch sử nước pass liền kề
        moves = []
        if current_player == 1:
            if consecutive_passes > 0:
                initial_player = "W"
                moves = [["W", "pass"]]
            else:
                initial_player = "B"
        else: # current_player == -1 (White)
            if consecutive_passes > 0:
                initial_player = "B"
                moves = [["B", "pass"]]
            else:
                initial_player = "W"

        query = {
            "id": query_id,
            "rules": "chinese",
            "komi": 7.5,
            "boardXSize": board_size,
            "boardYSize": board_size,
            "initialPlayer": initial_player,
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

            # Timeout tối đa 8 giây cho 1 nước đi đơn lẻ
            start_wait = time.time()
            max_wait = 8.0
            while time.time() - start_wait < max_wait:
                remaining = max(0.1, max_wait - (time.time() - start_wait))
                line = self._read_line(timeout=remaining)
                if not line:
                    break
                try:
                    resp = json.loads(line)
                    if resp.get("id") == query_id:
                        if "error" in resp:
                            logger.error(f"KataGo error response: {resp.get('error')}")
                            return {}
                        if "moveInfos" in resp or "rootInfo" in resp:
                            return self._parse_response(resp, board_size)
                except json.JSONDecodeError:
                    continue

            logger.warning(f"KataGo query {query_id} timed out or no move returned.")
            return {}

    def _parse_response(self, resp: Dict[str, Any], board_size: int) -> Dict[str, Any]:
        root_info = resp.get("rootInfo", {})
        move_infos = resp.get("moveInfos", [])
        total_visits = float(root_info.get("visits", 1))

        # KataGo được chỉ định reportAnalysisWinratesAs = BLACK,
        # nên winrate và scoreLead trong rootInfo luôn luôn là của Quân Đen (không phụ thuộc currentPlayer).
        black_winrate = float(root_info.get("winrate", 0.5))
        black_score_lead = float(root_info.get("scoreLead", 0.0))

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
                    visits = float(info.get("visits", 0))
                    # Độ tin cậy tính chuẩn theo tỷ lệ MCTS visit tree search; nếu chưa có thì dùng prior
                    confidence = visits / total_visits if total_visits > 0 else float(info.get("prior", 0))
                    hints.append({
                        "rank": i + 1,
                        "position": {"x": x, "y": y},
                        "confidence": round(confidence, 4),
                        "winrate": round(float(info.get("winrate", 0.5)), 4),
                        "scoreLead": round(float(info.get("scoreLead", 0.0)), 2),
                        "visits": int(visits),
                        "pv": info.get("pv", [])
                    })
                except Exception:
                    pass

        best_move = move_infos[0].get("move", "") if move_infos else ""

        return {
            "bestMove": best_move,
            "allMoves": move_infos,
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
            start_wait = time.time()
            max_wait = 10.0  # Tối đa 10 giây cho toàn bộ ván cờ
            while turns_received < len(analyze_turns) and (time.time() - start_wait < max_wait):
                remaining = max(0.1, max_wait - (time.time() - start_wait))
                line = self._read_line(timeout=min(2.0, remaining))
                if not line:
                    break
                try:
                    resp = json.loads(line)
                    if resp.get("id") == query_id:
                        if "error" in resp:
                            logger.error(f"KataGo full game error: {resp.get('error')}")
                            break
                        if "moveInfos" in resp or "rootInfo" in resp:
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
