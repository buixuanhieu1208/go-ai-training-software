// src/types/review.ts
// Kiểu dữ liệu cho Phân hệ Phân tích & Review Kỳ phổ (SGF Analysis & Game Review).
// Hỗ trợ: Biểu đồ Winrate, Đánh giá chất lượng nước đi, Gợi ý biến đổi (Variations),
// và Trích xuất bài tập Tsumego từ sai lầm.

import type { BoardSize, Move, Position } from "./go";

export type MoveQuality = "best" | "good" | "inaccuracy" | "blunder";

export interface VariationStep {
  position: Position;
  stepNumber: number;
  color: "black" | "white";
  coordText: string;
}

export interface VariationLine {
  rank: number;
  label: string; // e.g. "Gợi ý AI #1 (Tối ưu)"
  moves: Position[];
  moveTexts: string[]; // e.g. ["D4", "C10", "Q10"]
  winrate: number; // 0..1 (cho bên đến lượt đi)
  scoreLead: number; // Điểm chênh lệch mục
  confidence?: number;
  comment?: string;
}

export interface TurnEvaluation {
  turnIndex: number; // 0: ban đầu, 1..N: tương ứng nước đi 1..N
  move: Move | null; // null nếu là thế cờ ban đầu (turn 0)
  blackWinRate: number; // 0..1
  whiteWinRate: number; // 0..1
  scoreLead: number; // Dương = Đen dẫn điểm, Âm = Trắng dẫn điểm
  deltaWinRate?: number; // Thay đổi tỷ lệ thắng so với nước trước của bên vừa đi
  deltaScoreLead?: number;
  quality?: MoveQuality; // "best" | "good" | "inaccuracy" | "blunder"
  qualityLabel?: string;
  variations: VariationLine[];
  explanation?: string;
}

export interface PlayerReviewSummary {
  best: number;
  good: number;
  inaccuracy: number;
  blunder: number;
  accuracyPercent: number;
}

export interface GameReviewReport {
  boardSize: BoardSize;
  totalMoves: number;
  evaluations: TurnEvaluation[]; // độ dài = totalMoves + 1
  summary: {
    black: PlayerReviewSummary;
    white: PlayerReviewSummary;
  };
}
