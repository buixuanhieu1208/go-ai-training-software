# main.py
# Entry point FastAPI cho Backend AI Cờ vây.
# Chạy: uvicorn main:app --reload --port 8000   (hoặc: python main.py)

import os
import sys
import logging

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
from typing import List

from ai_engine import GoAIEngine
from utils.game_logic import GoState, BLACK, WHITE

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("go-ai-backend")

app = FastAPI(title="Go AI Backend", version="1.0.0")

# ============================================================================
# CORS — cho phép Frontend React (Vite mặc định :5173, CRA mặc định :3000)
# gọi API mà không bị trình duyệt chặn. Liệt kê origin cụ thể thay vì "*" vì
# allow_credentials=True + allow_origins=["*"] bị trình duyệt hiện đại từ
# chối (CORS spec không cho phép kết hợp 2 cái này).
# ============================================================================
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# Khởi tạo AI Engine MỘT LẦN DUY NHẤT khi server start — tránh việc mỗi
# request phải load lại file .pth (rất tốn thời gian).
#
# AI_MCTS_SIMULATIONS: chỉnh số lượt mô phỏng MCTS qua biến môi trường mà
# không cần sửa code — số càng cao AI càng mạnh nhưng phản hồi càng chậm.
# 100 là mức cân bằng cho CPU; nếu server yếu, nên hạ xuống 30-50.
# ============================================================================
try:
    MCTS_SIMULATIONS = int(os.environ.get("AI_MCTS_SIMULATIONS", "100"))
except ValueError:
    MCTS_SIMULATIONS = 100

logger.info("Đang khởi động AI Engine cho Server...")
ai_engine = GoAIEngine(simulations=MCTS_SIMULATIONS)


# ============================================================================
# Data contract — PHẢI khớp chính xác với payload Frontend gửi lên.
# ============================================================================
class GameStateRequest(BaseModel):
    board: List[List[int]]
    current_player: int
    consecutive_passes: int = 0
    room_id: str | None = None
    difficulty: str = "hard"
    # Điểm đang bị cấm do luật KO (Điều 9) đối với bên đến lượt: [hàng, cột] (0-indexed).
    # Backend không giữ lịch sử giữa các request nên Frontend phải gửi kèm để AI không đi nước bị cấm.
    ko_point: List[int] | None = None

    @field_validator("ko_point")
    @classmethod
    def validate_ko_point(cls, v: List[int] | None) -> List[int] | None:
        if v is not None and len(v) != 2:
            raise ValueError("ko_point phải có dạng [hàng, cột]")
        return v

    @field_validator("current_player")
    @classmethod
    def validate_player(cls, v: int) -> int:
        if v not in (BLACK, WHITE):
            raise ValueError("current_player phải là 1 (Đen) hoặc -1 (Trắng)")
        return v

    @field_validator("difficulty")
    @classmethod
    def validate_difficulty(cls, v: str) -> str:
        v = (v or "hard").lower()
        if v not in ("easy", "medium", "hard"):
            raise ValueError("difficulty phải là 'easy', 'medium' hoặc 'hard'")
        return v

    @field_validator("board")
    @classmethod
    def validate_board(cls, v: List[List[int]]) -> List[List[int]]:
        if not v:
            raise ValueError("board không được rỗng")
        size = len(v)
        for row in v:
            if len(row) != size:
                raise ValueError("board phải là ma trận vuông NxN")
            for cell in row:
                if cell not in (BLACK, WHITE, 0):
                    raise ValueError("Mỗi ô trên board chỉ được là 1, -1 hoặc 0")
        return v


class MoveResponse(BaseModel):
    action: str          # "move" | "pass" | "end"
    row: int | None = None
    col: int | None = None
    black_score: float | None = None
    white_score: float | None = None
    winner: str | None = None


@app.get("/")
def root():
    return {"status": "ok", "service": "Go AI Backend", "device": ai_engine.device}


@app.get("/health")
def health():
    """Dùng để Frontend/monitor kiểm tra server còn sống trước khi gọi get_move."""
    return {"status": "healthy", "device": ai_engine.device, "simulations": ai_engine.simulations}


@app.post("/api/v1/get_move", response_model=MoveResponse)
def get_move(req: GameStateRequest):
    if req.room_id:
        logger.info(f"Nhận yêu cầu tính nước đi cho match: {req.room_id}")
    """
    Nhận trạng thái bàn cờ từ Frontend, chạy MCTS (định hướng bởi Policy
    Network, đánh giá lá bởi Value Network) trên DualCNN đã nạp trọng số,
    trả về nước đi tốt nhất theo đúng format Frontend đang chờ.
    """
    size = len(req.board)

    # Thế cờ phải hợp lệ theo Điều 5/6: không được có đám quân nào hết khí. Trước đây thế cờ xấu bị
    # âm thầm "dọn" rồi AI đi trên một bàn cờ KHÁC bàn cờ của Frontend (nước trả về có thể rơi vào ô
    # Frontend đang thấy có quân). Giờ báo lỗi rõ ràng để Frontend xử lý, thay vì trả nước đi sai.
    state = GoState(size=size)
    try:
        state.load_board(req.board, sanitize=False)
        state.set_ko_point(tuple(req.ko_point) if req.ko_point is not None else None)
    except ValueError as e:
        logger.warning(f"Từ chối thế cờ bất hợp lệ (room={req.room_id}): {e}")
        raise HTTPException(status_code=422, detail=f"Thế cờ bất hợp lệ: {e}")

    try:
        state.current_player = req.current_player
        state.consecutive_passes = req.consecutive_passes

        # Nếu đã 2 lượt pass liên tiếp -> ván kết thúc, trả pass ngay,
        # tránh chạy MCTS vô ích khiến Frontend chờ lâu không cần thiết.
        if state.is_terminal():
            # Tính điểm khi ván đấu kết thúc
            b_score, w_score, winner = calculate_chinese_score(state.board)
            return MoveResponse(
                action="end",
                black_score=b_score,
                white_score=w_score,
                winner=winner
            )

        move = ai_engine.get_best_move(state, difficulty=req.difficulty)

    except Exception as e:
        logger.exception("Lỗi khi xử lý get_move")
        raise HTTPException(status_code=500, detail=f"Lỗi nội bộ AI Engine: {e}")

    if move is not None:
        r, c = move
        return MoveResponse(action="move", row=r, col=c)
    return MoveResponse(action="pass")

import time

class AnalysisResponse(BaseModel):
    policyHints: List[dict]
    valueEstimate: dict
    thinkingTimeMs: int

@app.post("/api/v1/analyze", response_model=AnalysisResponse)
def analyze(req: GameStateRequest):
    """
    Trả về đánh giá (value) và gợi ý (policy) của mạng nơ-ron (DualCNN) cho trạng thái hiện tại.
    """
    start_time = time.time()
    size = len(req.board)
    
    state = GoState(size=size)
    try:
        state.load_board(req.board, sanitize=False)
        state.set_ko_point(tuple(req.ko_point) if req.ko_point is not None else None)
        state.current_player = req.current_player
        state.consecutive_passes = req.consecutive_passes
    except ValueError as e:
        raise HTTPException(status_code=422, detail=f"Thế cờ bất hợp lệ: {e}")

    if state.is_terminal():
        return {
            "policyHints": [],
            "valueEstimate": {"blackWinRate": 0.5},
            "thinkingTimeMs": int((time.time() - start_time) * 1000)
        }

    # Lấy model của size tương ứng
    model = ai_engine._get_model(size)
    
    from models.encoder import BoardEncoder
    encoder = BoardEncoder()
    board_tensor = encoder.encode(state)
    import torch
    board_tensor = torch.tensor(board_tensor, dtype=torch.float32).unsqueeze(0).to(ai_engine.device)

    with torch.no_grad():
        policy, value = model(board_tensor)
        policy = torch.softmax(policy, dim=1)
        
    policy_np = policy.cpu().numpy()[0]
    val = value.item() # [-1, 1] cho current_player
    
    # Tính blackWinRate
    # val = 1 tức là current_player thắng 100%. val = -1 tức là thua 100%.
    current_win_rate = (val + 1.0) / 2.0
    if state.current_player == BLACK:
        black_win_rate = current_win_rate
    else:
        black_win_rate = 1.0 - current_win_rate

    # Lấy top các nước đi hợp lệ
    legal_moves = state.get_legal_moves()
    hints = []
    for move in legal_moves:
        if move is None:
            continue
        r, c = move
        idx = r * size + c
        if idx < len(policy_np):
            hints.append({
                "position": {"x": c, "y": r},
                "confidence": float(policy_np[idx])
            })
            
    # Sắp xếp theo confidence giảm dần, lấy top 5
    hints.sort(key=lambda x: x["confidence"], reverse=True)
    top_hints = hints[:5]
    for i, hint in enumerate(top_hints):
        hint["rank"] = i + 1

    return {
        "policyHints": top_hints,
        "valueEstimate": {"blackWinRate": black_win_rate},
        "thinkingTimeMs": int((time.time() - start_time) * 1000)
    }


# ============================================================================
# BƯỚC 2 — Import bổ sung cho nhóm API Trọng tài (Referee) & Tính điểm (Scoring)
# Thêm các dòng import này lên cùng khu vực import ở đầu file (dưới dòng
# `from utils.game_logic import GoState, BLACK, WHITE`), HOẶC để nguyên tại
# đây cũng chạy đúng vì Python vẫn nạp theo thứ tự dòng lệnh trong file.
# ============================================================================
from typing import Optional, Any

from utils.referee import validate_move, replay_and_annotate
from utils.scoring import calculate_chinese_score, calculate_territory_detailed
from utils.combo_score import compute_combo_score


# ============================================================================
# Helper chuyển đổi màu quân: Frontend dùng string "black"/"white", các file
# trong utils/ (Bước 1) dùng số 1/-1 (BLACK/WHITE). Toàn bộ việc quy đổi 2
# chiều được gom về đúng 2 hàm này để tránh rải rác logic đổi màu khắp nơi.
# ============================================================================
def _color_to_int(v: Any) -> int:
    if isinstance(v, str):
        key = v.strip().lower()
        mapping = {"black": BLACK, "white": WHITE}
        if key not in mapping:
            raise ValueError("color phải là 'black' hoặc 'white'")
        return mapping[key]
    if v in (BLACK, WHITE):
        return v
    raise ValueError("color phải là 'black'/'white' (string) hoặc 1/-1 (int)")


def _color_to_str(v: int) -> str:
    return "black" if v == BLACK else "white"


# ============================================================================
# Schemas — Position dùng chung
# ============================================================================
class PositionSchema(BaseModel):
    x: int
    y: int


# ============================================================================
# Schema cho 1 nước đi trong lịch sử — dùng cho cả /api/referee/analyze và
# /api/score/combo. field `color` khai báo kiểu int nhưng field_validator
# (mode="before") cho phép nhận string "black"/"white" từ Frontend rồi TỰ
# ĐỘNG quy đổi sang 1/-1 trước khi Pydantic gán giá trị vào model.
# ============================================================================
class MoveSchema(BaseModel):
    index: int
    color: int
    position: Optional[PositionSchema] = None
    capturedCount: Optional[int] = 0
    isCapture: Optional[bool] = False
    mistakeTag: Optional[str] = None

    @field_validator("color", mode="before")
    @classmethod
    def _validate_color(cls, v: Any) -> int:
        return _color_to_int(v)


def _validate_square_board(board: List[List[int]]) -> List[List[int]]:
    """Kiểm tra board vuông NxN, mỗi ô chỉ chứa 1/-1/0 — dùng chung cho các schema bên dưới."""
    if not board:
        raise ValueError("board không được rỗng")
    size = len(board)
    for row in board:
        if len(row) != size:
            raise ValueError("board phải là ma trận vuông NxN")
        for cell in row:
            if cell not in (BLACK, WHITE, 0):
                raise ValueError("Mỗi ô trên board chỉ được là 1, -1 hoặc 0")
    return board


# ============================================================================
# 1) POST /api/referee/analyze
# ============================================================================
class AnalyzeGameRequest(BaseModel):
    boardSize: int = 19
    moveHistory: List[MoveSchema]

    @field_validator("boardSize")
    @classmethod
    def _validate_board_size(cls, v: int) -> int:
        if v <= 0:
            raise ValueError("boardSize phải > 0")
        return v


@app.post("/api/referee/analyze")
def referee_analyze(req: AnalyzeGameRequest):
    """
    Chơi lại (replay) toàn bộ moveHistory, gán mistakeTag heuristic cho từng
    nước đi (utils/referee.py::replay_and_annotate), trả về báo cáo trọng tài.
    """
    try:
        move_history_dicts = [m.model_dump() for m in req.moveHistory]
        result = replay_and_annotate(req.boardSize, move_history_dicts)

        # Quy đổi lại color: int (nội bộ) -> string (đúng format Move của FE)
        annotated_out = []
        for mv in result["annotatedMoves"]:
            mv_out = dict(mv)
            if mv_out.get("color") in (BLACK, WHITE):
                mv_out["color"] = _color_to_str(mv_out["color"])
            annotated_out.append(mv_out)

        return {
            "finalBoard": result["finalBoard"],
            "annotatedMoves": annotated_out,
            "capturedBlack": result["capturedBlack"],
            "capturedWhite": result["capturedWhite"],
        }
    except Exception as e:
        logger.exception("Lỗi khi phân tích ván đấu (referee/analyze)")
        raise HTTPException(status_code=500, detail=f"Lỗi nội bộ Referee Engine: {e}")


# ============================================================================
# 2) POST /api/referee/validate-move
# ============================================================================
class ValidateMoveRequest(BaseModel):
    board: List[List[int]]
    position: PositionSchema
    color: int
    previousBoardSignature: Optional[str] = None

    @field_validator("color", mode="before")
    @classmethod
    def _validate_color(cls, v: Any) -> int:
        return _color_to_int(v)

    @field_validator("board")
    @classmethod
    def _validate_board(cls, v: List[List[int]]) -> List[List[int]]:
        return _validate_square_board(v)


@app.post("/api/referee/validate-move")
def referee_validate_move(req: ValidateMoveRequest):
    """
    Kiểm tra 1 nước đi có hợp lệ không (occupied / suicide / ko), KHÔNG làm
    thay đổi trạng thái bàn cờ thật — dùng để FE hỏi trước khi thực sự đặt quân.
    """
    try:
        result = validate_move(
            board=req.board,
            position={"x": req.position.x, "y": req.position.y},
            color=req.color,
            previous_board_signature=req.previousBoardSignature,
        )
        return result
    except Exception as e:
        logger.exception("Lỗi khi kiểm tra nước đi (referee/validate-move)")
        raise HTTPException(status_code=500, detail=f"Lỗi nội bộ Referee Engine: {e}")


# ============================================================================
# 3) POST /api/score/territory
# ============================================================================
class TerritoryRequest(BaseModel):
    board: List[List[int]]
    komi: float = 7.5

    @field_validator("board")
    @classmethod
    def _validate_board(cls, v: List[List[int]]) -> List[List[int]]:
        return _validate_square_board(v)


@app.post("/api/score/territory")
def score_territory(req: TerritoryRequest):
    """
    Tính điểm lãnh thổ chi tiết (blackTerritory/whiteTerritory/territoryMap)
    bằng utils/scoring.py::calculate_territory_detailed — KHÔNG đụng tới
    calculate_chinese_score() đang dùng cho /api/v1/get_move.
    """
    try:
        result = calculate_territory_detailed(req.board, komi=req.komi)
        return result
    except Exception as e:
        logger.exception("Lỗi khi tính điểm lãnh thổ (score/territory)")
        raise HTTPException(status_code=500, detail=f"Lỗi nội bộ Scoring Engine: {e}")


# ============================================================================
# 4) POST /api/score/combo
# ============================================================================
class ComboRequest(BaseModel):
    moveHistory: List[MoveSchema]


@app.post("/api/score/combo")
def score_combo(req: ComboRequest):
    """
    Tính điểm thưởng combo bắt quân liên tiếp (utils/combo_score.py) —
    KHÔNG liên quan tới hiệu ứng ComboToast hiển thị ở Frontend.
    """
    try:
        move_history_dicts = [m.model_dump() for m in req.moveHistory]
        result = compute_combo_score(move_history_dicts)

        def _convert_events(events):
            return [{**e, "color": _color_to_str(e["color"])} for e in events]

        return {
            "black": {**result["black"], "events": _convert_events(result["black"]["events"])},
            "white": {**result["white"], "events": _convert_events(result["white"]["events"])},
            "events": _convert_events(result["events"]),
        }
    except Exception as e:
        logger.exception("Lỗi khi tính điểm combo (score/combo)")
        raise HTTPException(status_code=500, detail=f"Lỗi nội bộ Combo Engine: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)