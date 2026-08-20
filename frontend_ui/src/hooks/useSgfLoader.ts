// src/hooks/useSgfLoader.ts
// Hook dùng cho màn hình "Nhập ván đấu / Bài tập từ file .SGF": nhận File từ
// <input type="file">, parse, và expose board tại từng thời điểm để phát lại
// (playback) trên component Board có sẵn — tái sử dụng được cho cả chế độ
// xem lại ván đấu và chế độ tải đề bài Tsumego.

import { useCallback, useMemo, useState } from "react";
import type { BoardMatrix, Position } from "../types/go";
import {
  buildBoardSequence,
  parseSgf,
  type ParsedSgf,
} from "../utils/sgfParser";

export interface UseSgfLoaderReturn {
  parsed: ParsedSgf | null;
  /** Toàn bộ board tại mỗi nước đi — index i = board SAU nước đi thứ i+1 */
  boardSequence: BoardMatrix[];
  /** Board hiện đang xem, tương ứng currentMoveIndex */
  currentBoard: BoardMatrix | null;
  currentMoveIndex: number; // 0 = trước nước đi đầu tiên (bàn trống + setup)
  isLoading: boolean;
  error: string | null;
  /** Đọc file .SGF do người dùng chọn/kéo-thả */
  loadFromFile: (file: File) => Promise<void>;
  /** Đọc trực tiếp từ nội dung text (vd: dán SGF, hoặc fetch từ server) */
  loadFromText: (sgfText: string) => void;
  goToMove: (index: number) => void;
  nextMove: () => void;
  prevMove: () => void;
  reset: () => void;
  lastMovePosition: Position | null;
}

export function useSgfLoader(): UseSgfLoaderReturn {
  const [parsed, setParsed] = useState<ParsedSgf | null>(null);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const boardSequence = useMemo(() => {
    if (!parsed) return [];
    return buildBoardSequence(parsed);
  }, [parsed]);

  const loadFromText = useCallback((sgfText: string) => {
    setError(null);
    try {
      const result = parseSgf(sgfText);
      setParsed(result);
      setCurrentMoveIndex(0); // bắt đầu từ đầu ván — quan trọng cho chế độ Tsumego (giải từ thế cờ setup)
    } catch (e) {
      setParsed(null);
      setError(e instanceof Error ? e.message : "Không đọc được file SGF.");
    }
  }, []);

  const loadFromFile = useCallback(
    async (file: File) => {
      setIsLoading(true);
      setError(null);
      try {
        if (!file.name.toLowerCase().endsWith(".sgf")) {
          throw new Error("Vui lòng chọn file có đuôi .sgf");
        }
        const text = await file.text();
        loadFromText(text);
      } catch (e) {
        setParsed(null);
        setError(e instanceof Error ? e.message : "Không đọc được file SGF.");
      } finally {
        setIsLoading(false);
      }
    },
    [loadFromText]
  );

  const goToMove = useCallback(
    (index: number) => {
      if (!parsed) return;
      const clamped = Math.max(0, Math.min(index, parsed.moves.length));
      setCurrentMoveIndex(clamped);
    },
    [parsed]
  );

  const nextMove = useCallback(() => goToMove(currentMoveIndex + 1), [goToMove, currentMoveIndex]);
  const prevMove = useCallback(() => goToMove(currentMoveIndex - 1), [goToMove, currentMoveIndex]);

  const reset = useCallback(() => {
    setParsed(null);
    setCurrentMoveIndex(0);
    setError(null);
  }, []);

  // currentMoveIndex = 0 -> chưa đi nước nào, chỉ hiển thị quân setup (nếu có, vd Tsumego)
  const resolvedCurrentBoard = useMemo(() => {
    if (!parsed) return null;
    if (currentMoveIndex === 0) return boardSequenceFallback(parsed);
    return boardSequence[currentMoveIndex - 1] ?? null;
  }, [parsed, currentMoveIndex, boardSequence]);

  const lastMovePosition: Position | null =
    parsed && currentMoveIndex > 0 ? parsed.moves[currentMoveIndex - 1]?.position ?? null : null;

  return {
    parsed,
    boardSequence,
    currentBoard: resolvedCurrentBoard,
    currentMoveIndex,
    isLoading,
    error,
    loadFromFile,
    loadFromText,
    goToMove,
    nextMove,
    prevMove,
    reset,
    lastMovePosition,
  };
}

// Trường hợp ván đấu không có nước đi nào (chỉ có setup, vd đề Tsumego thuần
// vị trí ban đầu) — buildBoardSequence trả mảng rỗng nên cần dựng board setup riêng.
function boardSequenceFallback(parsed: ParsedSgf): BoardMatrix {
  const { boardSize } = parsed.metadata;
  const board: BoardMatrix = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => "empty" as const)
  );
  parsed.setupBlack.forEach((p) => (board[p.y][p.x] = "black"));
  parsed.setupWhite.forEach((p) => (board[p.y][p.x] = "white"));
  return board;
}
