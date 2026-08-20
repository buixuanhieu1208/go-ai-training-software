// src/hooks/useAiAnalysis.ts
// Hook đóng vai trò "cổng kết nối" tới AI Engine (Policy + Value + MCTS) ở Backend.
// Ở Tuần 1, BE chưa sẵn sàng nên ta trả về dữ liệu giả lập (mock) có cùng shape
// với response thật trong tương lai (xem src/types/ai.ts). Khi BE xong endpoint
// POST /api/analyze, chỉ cần thay nội dung hàm `fetchAnalysis` bên dưới —
// toàn bộ UI (Board, WinRateBar) không cần sửa gì.

import { useEffect, useState } from "react";
import type { AiAnalysisResult } from "../types/ai";
import type { BoardMatrix } from "../types/go";

const MOCK_LATENCY_MS = 400;

async function fetchAnalysis(
  board: BoardMatrix,
  currentPlayer: "black" | "white"
): Promise<AiAnalysisResult> {
  // TODO(BE integration): thay đoạn dưới bằng:
  // const res = await fetch(`${API_BASE_URL}/api/analyze`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ board, currentPlayer }),
  // });
  // return res.json();

  await new Promise((r) => setTimeout(r, MOCK_LATENCY_MS));

  const size = board.length;
  const emptyPositions: { x: number; y: number }[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (board[y][x] === "empty") emptyPositions.push({ x, y });
    }
  }
  const hintCount = Math.min(5, emptyPositions.length);
  const shuffled = [...emptyPositions].sort(() => Math.random() - 0.5);

  return {
    policyHints: shuffled.slice(0, hintCount).map((position, i) => ({
      position,
      confidence: Math.max(0.15, 1 - i * 0.18 - Math.random() * 0.1),
      rank: i + 1,
    })),
    valueEstimate: {
      blackWinRate: currentPlayer === "black" ? 0.5 + Math.random() * 0.1 : 0.5 - Math.random() * 0.1,
    },
    thinkingTimeMs: MOCK_LATENCY_MS,
  };
}

export interface UseAiAnalysisReturn {
  analysis: AiAnalysisResult | null;
  isThinking: boolean;
  /** Bật/tắt gợi ý AI — tương ứng nút "Hiện gợi ý" trên Control Panel */
  hintsEnabled: boolean;
  setHintsEnabled: (enabled: boolean) => void;
}

export function useAiAnalysis(
  board: BoardMatrix,
  currentPlayer: "black" | "white",
  moveCount: number
): UseAiAnalysisReturn {
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [hintsEnabled, setHintsEnabled] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsThinking(true);

    fetchAnalysis(board, currentPlayer).then((result) => {
      if (!cancelled) {
        setAnalysis(result);
        setIsThinking(false);
      }
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveCount, currentPlayer]);

  return { analysis, isThinking, hintsEnabled, setHintsEnabled };
}
