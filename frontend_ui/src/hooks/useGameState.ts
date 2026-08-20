// src/hooks/useGameState.ts
// Hook trung tâm quản lý trạng thái 1 ván cờ: đặt quân, pass, undo, resign.
// Tách riêng khỏi UI để component Board chỉ lo hiển thị + bắt sự kiện click.

import { useCallback, useState } from "react";
import type { BoardSize, GameState, Move, Position, Stone } from "../types/go";
import { applyCaptures } from "../utils/goRules";
import { cloneBoard, createEmptyBoard } from "../utils/boardUtils";

function createInitialState(boardSize: BoardSize): GameState {
  return {
    boardSize,
    board: createEmptyBoard(boardSize),
    currentPlayer: "black",
    moveHistory: [],
    capturedBlack: 0,
    capturedWhite: 0,
    isFinished: false,
  };
}

export interface UseGameStateReturn {
  gameState: GameState;
  /** Đặt quân tại vị trí (x, y). Trả về false nếu nước đi không hợp lệ (đã có quân). */
  placeStone: (position: Position) => boolean;
  pass: () => void;
  resign: () => void;
  undo: () => void;
  resetGame: (boardSize?: BoardSize) => void;
}

export function useGameState(initialBoardSize: BoardSize = 19): UseGameStateReturn {
  const [gameState, setGameState] = useState<GameState>(() =>
    createInitialState(initialBoardSize)
  );
  // Lưu lịch sử board snapshot để Undo O(1) thay vì replay toàn bộ ván.
  const [boardHistory, setBoardHistory] = useState<GameState["board"][]>([]);

  const placeStone = useCallback(
    (position: Position): boolean => {
      let success = true;
      setGameState((prev) => {
        if (prev.isFinished) {
          success = false;
          return prev;
        }
        if (prev.board[position.y][position.x] !== "empty") {
          success = false;
          return prev;
        }

        const boardWithMove = cloneBoard(prev.board);
        boardWithMove[position.y][position.x] = prev.currentPlayer;

        const { board: boardAfterCapture, capturedCount } = applyCaptures(
          boardWithMove,
          position,
          prev.currentPlayer
        );

        const nextColor: Exclude<Stone, "empty"> =
          prev.currentPlayer === "black" ? "white" : "black";

        const move: Move = {
          index: prev.moveHistory.length + 1,
          color: prev.currentPlayer,
          position,
          isCapture: capturedCount > 0,
          capturedCount,
          mistakeTag: null, // sẽ được AI Engine gắn nhãn sau (atari/dame/blunder...)
        };

        setBoardHistory((h) => [...h, prev.board]);

        return {
          ...prev,
          board: boardAfterCapture,
          currentPlayer: nextColor,
          moveHistory: [...prev.moveHistory, move],
          capturedBlack:
            prev.currentPlayer === "black"
              ? prev.capturedBlack + capturedCount
              : prev.capturedBlack,
          capturedWhite:
            prev.currentPlayer === "white"
              ? prev.capturedWhite + capturedCount
              : prev.capturedWhite,
        };
      });
      return success;
    },
    []
  );

  const pass = useCallback(() => {
    setGameState((prev) => {
      const move: Move = {
        index: prev.moveHistory.length + 1,
        color: prev.currentPlayer,
        position: null,
      };
      const lastMove = prev.moveHistory[prev.moveHistory.length - 1];
      const isDoublePass = lastMove && lastMove.position === null;

      setBoardHistory((h) => [...h, prev.board]);

      return {
        ...prev,
        currentPlayer: prev.currentPlayer === "black" ? "white" : "black",
        moveHistory: [...prev.moveHistory, move],
        isFinished: Boolean(isDoublePass), // 2 lần pass liên tiếp -> kết thúc ván
      };
    });
  }, []);

  const resign = useCallback(() => {
    setGameState((prev) => ({ ...prev, isFinished: true }));
  }, []);

  const undo = useCallback(() => {
    setBoardHistory((history) => {
      if (history.length === 0) return history;
      const previousBoard = history[history.length - 1];
      setGameState((prev) => ({
        ...prev,
        board: previousBoard,
        currentPlayer: prev.currentPlayer === "black" ? "white" : "black",
        moveHistory: prev.moveHistory.slice(0, -1),
        isFinished: false,
      }));
      return history.slice(0, -1);
    });
  }, []);

  const resetGame = useCallback((boardSize?: BoardSize) => {
    setGameState((prev) => createInitialState(boardSize ?? prev.boardSize));
    setBoardHistory([]);
  }, []);

  return { gameState, placeStone, pass, resign, undo, resetGame };
}
