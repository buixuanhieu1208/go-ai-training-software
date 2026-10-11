// src/hooks/useRefereeAnalysis.ts
// Hook gọi Backend thật (backend_ai) để "trọng tài phân tích ván đấu": tính
// điểm lãnh thổ, đếm quân ăn được, tính combo, gắn nhãn lỗi từng nước.
// Tách riêng hoàn toàn khỏi useAiAnalysis (chỉ dùng cho đánh giá gợi ý nước đi).

import { useCallback, useState } from "react";
import type { Move } from "../types/go";
import {
  runFullAnalysis,
  checkBackendHealth,
  RefereeApiError,
  type AnalyzeGameResult,
} from "../services/refereeApi";

export interface UseRefereeAnalysisReturn {
  result: AnalyzeGameResult | null;
  isLoading: boolean;
  error: string | null;
  /** Gọi backend để phân tích lại với moveHistory hiện tại. */
  runAnalysis: (boardSize: number, moveHistory: Move[], komi?: number) => Promise<void>;
  clear: () => void;
}

export function useRefereeAnalysis(): UseRefereeAnalysisReturn {
  const [result, setResult] = useState<AnalyzeGameResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = useCallback(
    async (boardSize: number, moveHistory: Move[], komi = 7.5) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await runFullAnalysis(boardSize, moveHistory, komi);
        setResult(data);
      } catch (err) {
        const healthy = await checkBackendHealth();
        if (err instanceof RefereeApiError) {
          setError(err.message);
        } else if (!healthy) {
          setError("Không kết nối được backend. Hãy chắc chắn đã chạy: uvicorn main:app --port 8000");
        } else {
          setError("Có lỗi khi phân tích ván đấu.");
        }
        setResult(null);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clear = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, isLoading, error, runAnalysis, clear };
}