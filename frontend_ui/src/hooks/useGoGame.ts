import { useState, useCallback } from "react";

export const BOARD_SIZE = 19;
export const BLACK = 1;
export const WHITE = -1;
export const EMPTY = 0;

export type Board = number[][];

interface AIMoveResponse {
  action: "move" | "pass";
  row?: number;
  col?: number;
}

interface UseGoGameReturn {
  board: Board;
  currentPlayer: number;
  consecutivePasses: number;
  isThinking: boolean;
  playMove: (row: number, col: number) => boolean;
  passTurn: () => void;
  fetchAIMove: () => Promise<void>;
  resetGame: () => void;
}

const createEmptyBoard = (): Board =>
  Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(EMPTY));

const API_URL = "http://localhost:8000/api/v1/get_move";

export function useGoGame(): UseGoGameReturn {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<number>(BLACK);
  const [consecutivePasses, setConsecutivePasses] = useState<number>(0);
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const playMove = useCallback(
    (row: number, col: number): boolean => {
      if (board[row][col] !== EMPTY) return false;

      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = currentPlayer;

      setBoard(newBoard);
      setCurrentPlayer((prev) => (prev === BLACK ? WHITE : BLACK));
      setConsecutivePasses(0);
      return true;
    },
    [board, currentPlayer]
  );

  const passTurn = useCallback(() => {
    setCurrentPlayer((prev) => (prev === BLACK ? WHITE : BLACK));
    setConsecutivePasses((prev) => prev + 1);
  }, []);

  const fetchAIMove = useCallback(async (): Promise<void> => {
    setIsThinking(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          board,
          current_player: currentPlayer,
          consecutive_passes: consecutivePasses,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: AIMoveResponse = await response.json();

      if (data.action === "pass") {
        setCurrentPlayer((prev) => (prev === BLACK ? WHITE : BLACK));
        setConsecutivePasses((prev) => prev + 1);
      } else if (
        data.action === "move" &&
        data.row !== undefined &&
        data.col !== undefined
      ) {
        setBoard((prevBoard) => {
          const newBoard = prevBoard.map((r) => [...r]);
          newBoard[data.row!][data.col!] = currentPlayer;
          return newBoard;
        });
        setCurrentPlayer((prev) => (prev === BLACK ? WHITE : BLACK));
        setConsecutivePasses(0);
      }
    } catch (error) {
      console.error("Failed to fetch AI move:", error);
    } finally {
      setIsThinking(false);
    }
  }, [board, currentPlayer, consecutivePasses]);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPlayer(BLACK);
    setConsecutivePasses(0);
    setIsThinking(false);
  }, []);

  return {
    board,
    currentPlayer,
    consecutivePasses,
    isThinking,
    playMove,
    passTurn,
    fetchAIMove,
    resetGame,
  };
}