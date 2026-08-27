from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sys
import os

# Thêm đường dẫn thư mục gốc của backend_ai vào sys.path để import các module khác
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ai_engine import GoAIEngine
from utils.game_logic import GoState

# Khởi tạo API App
app = FastAPI(title="Go AI Training Server")

# Cấu hình CORS để Frontend (Web/App) có thể gọi API mà không bị chặn
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Trong thực tế nên giới hạn domain frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Khởi tạo AI Engine sẵn một lần (để sẵn sàng trả lời ngay khi có request)
print("Đang khởi động AI Engine cho Server...")
ai_engine = GoAIEngine(simulations=100) # Có thể tăng simulations lên để đánh hay hơn

# Định dạng dữ liệu mà Frontend sẽ gửi lên
class GameStateRequest(BaseModel):
    board: List[List[int]]
    current_player: int
    consecutive_passes: int

@app.post("/api/v1/get_move")
def get_move(req: GameStateRequest):
    """
    Nhận trạng thái bàn cờ từ Frontend, trả về nước đi của AI.
    """
    # 1. Tái tạo lại GoState từ dữ liệu Frontend gửi lên
    size = len(req.board)
    state = GoState(size=size)
    state.board = req.board
    state.current_player = req.current_player
    state.consecutive_passes = req.consecutive_passes
    
    # 2. Yêu cầu AI tính toán
    move = ai_engine.get_best_move(state)
    
    # 3. Trả kết quả về cho Frontend
    if move is not None:
        r, c = move
        return {"action": "move", "row": r, "col": c}
    else:
        return {"action": "pass"}

if __name__ == "__main__":
    import uvicorn
    # Chạy server ở port 8000
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)