// src/types/go.ts
// Toàn bộ kiểu dữ liệu lõi liên quan tới bàn cờ, quân cờ, và trạng thái ván đấu.
// Tách riêng khỏi types cho AI (ai.ts) và types cho luyện tập (training.ts)
// để khi ghép API BE, ta chỉ cần map response -> các type này mà không đổi UI.

/** Quân cờ trên 1 điểm giao cắt */
export type Stone = "black" | "white" | "empty";

/** Kích thước bàn cờ hỗ trợ */
export type BoardSize = 9 | 13 | 19;

/** Toạ độ trên bàn cờ, 0-indexed, (0,0) là góc trên-trái */
export interface Position {
  x: number;
  y: number;
}

/** Ma trận trạng thái bàn cờ — khớp với định dạng tiền xử lý từ file .SGF ở BE */
export type BoardMatrix = Stone[][];

/** 1 nước đi trong lịch sử ván đấu (dùng cho Move History + Undo) */
export interface Move {
  index: number; // thứ tự nước đi, bắt đầu từ 1
  color: Exclude<Stone, "empty">;
  position: Position | null; // null = Pass
  isCapture?: boolean;
  capturedCount?: number;
  // Đánh dấu lỗi để phục vụ thống kê "đánh giá phong độ"
  mistakeTag?: MistakeTag | null;
}

/** Các loại lỗi cơ bản mà Value/Policy Network + rule-engine có thể gắn nhãn */
export type MistakeTag = "atari" | "dame" | "blunder" | "slow_move" | "overplay";

/** Trạng thái ván đấu hiện tại, dùng chung cho chế độ luyện tập & tự do */
export interface GameState {
  boardSize: BoardSize;
  board: BoardMatrix;
  currentPlayer: Exclude<Stone, "empty">;
  moveHistory: Move[];
  capturedBlack: number; // số quân trắng đã bị đen bắt
  capturedWhite: number; // số quân đen đã bị trắng bắt
  isFinished: boolean;
}

/** Kết quả đếm điểm bằng thuật toán Flood Fill (Territory Scoring) */
export interface ScoreResult {
  blackTerritory: number;
  whiteTerritory: number;
  blackScore: number;
  whiteScore: number;
  /** Các điểm thuộc vùng đất của ai, dùng để tô màu overlay trên bàn cờ */
  territoryMap: ("black" | "white" | "neutral")[][];
}
