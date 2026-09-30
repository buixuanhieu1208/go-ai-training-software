// src/hooks/useGameState.ts
// Hook trung tâm quản lý trạng thái 1 ván cờ: đặt quân, pass, undo, resign.
// Tách riêng khỏi UI để component Board chỉ lo hiển thị + bắt sự kiện click.
//
// Luật áp dụng (Luật cờ vây VCF): Điều 5 ăn quân, Điều 6 cấm tự sát, Điều 9 KO.
// Toàn bộ nước đi được kiểm tra ĐỒNG BỘ bằng tryPlaceStone (goRules.ts) trên `stateRef`,
// nên placeStone() trả về đúng true/false ngay lập tức (không phụ thuộc thời điểm React chạy updater).

import { useCallback, useRef, useState } from "react";
import type { BoardSize, GameState, Move, Position, Stone } from "../types/go";
import { tryPlaceStone } from "../utils/goRules";
import { createEmptyBoard } from "../utils/boardUtils";

function createInitialState(boardSize: BoardSize): GameState {
  return {
    boardSize,
    board: createEmptyBoard(boardSize),
    currentPlayer: "black",
    moveHistory: [],
    capturedBlack: 0,
    capturedWhite: 0,
    isFinished: false,
    koPoint: null,
  };
}

export interface UseGameStateReturn {
  gameState: GameState;
  /**
   * Đặt quân tại vị trí (x, y). Trả về false (và KHÔNG đổi gì) nếu nước đi không hợp lệ:
   * ván đã kết thúc / ngoài bàn / ô đã có quân / tự sát (Điều 6) / ăn lại KO ngay (Điều 9).
   */
  placeStone: (position: Position) => boolean;
  pass: () => void;
  resign: () => void;
  undo: () => void;
  resetGame: (boardSize?: BoardSize) => void;
}

export function useGameState(initialBoardSize: BoardSize = 19): UseGameStateReturn {
  const [gameState, setGameState] = useState<GameState>(() => createInitialState(initialBoardSize));

  // `stateRef` luôn là trạng thái MỚI NHẤT (mọi thay đổi đều đi qua commit()).
  const stateRef = useRef<GameState>(gameState);
  // Lịch sử snapshot để Undo O(1) (khôi phục cả số quân đã bắt và điểm KO).
  const historyRef = useRef<GameState[]>([]);

  const commit = useCallback((next: GameState) => {
    stateRef.current = next;
    setGameState(next);
  }, []);

  const placeStone = useCallback(
    (position: Position): boolean => {
      const prev = stateRef.current;
      if (prev.isFinished) return false;

      const result = tryPlaceStone(prev.board, position, prev.currentPlayer, prev.koPoint ?? null);
      if (!result.ok) return false;

      const nextColor: Exclude<Stone, "empty"> = prev.currentPlayer === "black" ? "white" : "black";
      const move: Move = {
        index: prev.moveHistory.length + 1,
        color: prev.currentPlayer,
        position,
        isCapture: result.capturedCount > 0,
        capturedCount: result.capturedCount,
        capturedPositions: result.capturedCount > 0 ? result.capturedPositions : undefined,
        mistakeTag: null, // sẽ được AI Engine gắn nhãn sau (atari/dame/blunder...)
      };

      historyRef.current.push(prev);
      commit({
        ...prev,
        board: result.board,
        currentPlayer: nextColor,
        moveHistory: [...prev.moveHistory, move],
        capturedBlack:
          prev.currentPlayer === "black" ? prev.capturedBlack + result.capturedCount : prev.capturedBlack,
        capturedWhite:
          prev.currentPlayer === "white" ? prev.capturedWhite + result.capturedCount : prev.capturedWhite,
        koPoint: result.koPoint,
      });
      return true;
    },
    [commit]
  );

  const pass = useCallback(() => {
    const prev = stateRef.current;
    if (prev.isFinished) return;

    const move: Move = {
      index: prev.moveHistory.length + 1,
      color: prev.currentPlayer,
      position: null,
    };
    const lastMove = prev.moveHistory[prev.moveHistory.length - 1];
    const isDoublePass = Boolean(lastMove && lastMove.position === null);

    historyRef.current.push(prev);
    commit({
      ...prev,
      currentPlayer: prev.currentPlayer === "black" ? "white" : "black",
      moveHistory: [...prev.moveHistory, move],
      isFinished: isDoublePass, // 2 lần pass liên tiếp -> kết thúc ván
      koPoint: null, // KO chỉ cấm đúng một nước kế tiếp (Điều 9)
    });
  }, [commit]);

  const resign = useCallback(() => {
    commit({ ...stateRef.current, isFinished: true });
  }, [commit]);

  const undo = useCallback(() => {
    const snapshot = historyRef.current.pop();
    if (!snapshot) return;
    commit({ ...snapshot, isFinished: false });
  }, [commit]);

  const resetGame = useCallback(
    (boardSize?: BoardSize) => {
      historyRef.current = [];
      commit(createInitialState(boardSize ?? stateRef.current.boardSize));
    },
    [commit]
  );

  return { gameState, placeStone, pass, resign, undo, resetGame };
}