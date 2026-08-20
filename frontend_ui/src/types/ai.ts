// src/types/ai.ts
// Kiểu dữ liệu cho phần "AI Engine": Policy Network, Value Network, MCTS.
// Đây là "hợp đồng" (contract) giữa FE và BE — khi BE trả JSON, chỉ cần
// đảm bảo đúng shape này là toàn bộ UI (Board, WinRateBar) chạy được ngay.

import type { Position } from "./go";

/**
 * 1 gợi ý nước đi từ Policy Network, hiển thị dưới dạng chấm màu trên bàn cờ.
 * confidence trong khoảng [0, 1] — dùng để quyết định độ đậm/kích thước chấm.
 */
export interface PolicyHint {
  position: Position;
  confidence: number; // 0..1, xác suất Policy Network gán cho nước đi này
  rank?: number; // thứ hạng gợi ý (1 = tốt nhất), optional, phục vụ hiển thị số thứ tự
}

/** Kết quả suy luận từ Value Network tại 1 thời điểm của ván đấu */
export interface ValueEstimate {
  /** Tỉ lệ thắng của Đen, 0..1. Trắng = 1 - blackWinRate */
  blackWinRate: number;
  /** Điểm chênh lệch dự đoán (âm = Trắng đang lợi thế) */
  scoreLead?: number;
}

/** Thống kê 1 node trong cây MCTS — hữu ích khi debug hoặc hiển thị "AI đang nghĩ gì" */
export interface MctsNodeStat {
  position: Position;
  visits: number;
  winRate: number;
  priorProbability: number;
}

/** Gói phản hồi đầy đủ mà AI Engine trả về sau khi phân tích 1 thế cờ */
export interface AiAnalysisResult {
  policyHints: PolicyHint[];
  valueEstimate: ValueEstimate;
  mctsStats?: MctsNodeStat[];
  /** Thời gian AI suy nghĩ (ms) — hiển thị loading/typing indicator nếu cần */
  thinkingTimeMs?: number;
}
