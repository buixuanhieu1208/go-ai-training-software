// src/hooks/useAiAnalysis.ts
// Hook đóng vai trò "cổng kết nối" tới AI Engine (Policy + Value + MCTS) ở Backend.
// Kết nối tới Backend API POST /api/v1/analyze để lấy đánh giá (Win rate) và gợi ý (Policy hints).

import { useEffect, useRef, useState } from "react";
import type { AiAnalysisResult } from "../types/ai";
import type { BoardMatrix } from "../types/go";


async function fetchAnalysis(
  board: BoardMatrix,
  currentPlayer: "black" | "white"
): Promise<AiAnalysisResult> {
  try {
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
      return {
        policyHints: [],
        valueEstimate: { blackWinRate: 0.5 },
        thinkingTimeMs: 0,
      };
    }
    return await res.json();
  } catch {
    return {
      policyHints: [],
      valueEstimate: { blackWinRate: 0.5 },
      thinkingTimeMs: 0,
    };
  }
}

export interface UseAiAnalysisReturn {
  analysis: AiAnalysisResult | null;
  isThinking: boolean;
  /** Bật/tắt gợi ý AI — tương ứng nút "Hiện gợi ý" trên Control Panel */
  hintsEnabled: boolean;
  setHintsEnabled: (enabled: boolean) => void;
}

// Hệ số EMA — càng nhỏ thì thanh chuyển động càng mượt (nhưng phản ứng chậm hơn).
// 0.35 là giá trị cân bằng: phản ứng đủ nhanh sau 2-3 nước nhưng không giật cục.
const EMA_ALPHA = 0.35;

export function useAiAnalysis(
  board: BoardMatrix,
  currentPlayer: "black" | "white",
  moveCount: number
): UseAiAnalysisReturn {
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [hintsEnabled, setHintsEnabled] = useState(true);

  // Giữ smoothed winrate giữa các request để tránh thanh nhảy giật cục.
  const smoothedWinRate = useRef<number>(0.5);

  useEffect(() => {
    let cancelled = false;
    setIsThinking(true);

    fetchAnalysis(board, currentPlayer).then((result) => {
      if (cancelled) return;

      // Áp EMA: smoothed = alpha * rawNew + (1-alpha) * smoothedOld
      // Clamp [0.05, 0.95] để thanh không bao giờ chạm 0% hay 100% — tránh gây
      // hiểu lầm "ván đã kết thúc" khi thực ra AI chỉ đánh giá tạm thời.
      const raw = result.valueEstimate.blackWinRate ?? 0.5;
      const clamped = Math.max(0.05, Math.min(0.95, raw));
      smoothedWinRate.current =
        EMA_ALPHA * clamped + (1 - EMA_ALPHA) * smoothedWinRate.current;

      setAnalysis({
        ...result,
        valueEstimate: { blackWinRate: smoothedWinRate.current },
      });
      setIsThinking(false);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveCount, currentPlayer]);

  return { analysis, isThinking, hintsEnabled, setHintsEnabled };
}
