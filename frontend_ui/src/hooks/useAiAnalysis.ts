// src/hooks/useAiAnalysis.ts
// Hook đóng vai trò "cổng kết nối" tới AI Engine (Policy + Value + MCTS) ở Backend.
// Kết nối tới Backend API POST /api/v1/analyze để lấy đánh giá (Win rate) và gợi ý (Policy hints).

import { useEffect, useState } from "react";
import type { AiAnalysisResult } from "../types/ai";
import type { BoardMatrix } from "../types/go";


async function fetchAnalysis(
  board: BoardMatrix,
  currentPlayer: "black" | "white"
): Promise<AiAnalysisResult> {
  const res = await fetch("http://localhost:8000/api/v1/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      board: board.map((row) =>
        row.map((cell) => (cell === "black" ? 1 : cell === "white" ? -1 : 0))
      ),
      current_player: currentPlayer === "black" ? 1 : -1,
    }),
  });
  if (!res.ok) {
    console.error("Lỗi khi phân tích bằng AI:", await res.text());
    return {
      policyHints: [],
      valueEstimate: { blackWinRate: 0.5 },
      thinkingTimeMs: 0,
    };
  }
  return res.json();
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
