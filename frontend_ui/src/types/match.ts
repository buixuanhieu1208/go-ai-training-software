// src/types/match.ts
import type { BoardMatrix, BoardSize, Position, FloatingScoreEffect, Move } from "./go";

export interface PlayerInfo {
  uid: string;
  displayName: string;
  photoURL: string | null;
  elo: number | null;
}

export interface RoomData {
  id: string;
  hostUid: string;
  hostDisplayName: string;
  hostPhotoURL: string | null;
  hostElo: number;
  mode: "pvp";
  boardSize: BoardSize;
  status: "waiting" | "matched" | "cancelled";
  guestUid: string | null;
  matchId: string | null;
}

// Tái dùng THẲNG type Move (đã có mistakeTag: MistakeTag | null đúng chuẩn)
// thay vì tự định nghĩa lại — tránh lệch kiểu như vừa gặp.
export type MoveLogEntry = Move;

export interface FirestoreMatch {
  id: string;
  mode: "pvp" | "pve";
  status: "ongoing" | "finished";
  boardSize: BoardSize;
  komi: number;
  players: { black: PlayerInfo | null; white: PlayerInfo | null };
  board: BoardMatrix;
  currentPlayer: "black" | "white";
  capturedBlack: number;
  capturedWhite: number;
  consecutivePasses: number;
  lastMove: (Position & { color: "black" | "white" }) | null;
  aiThinking: boolean;
  winner: "black" | "white" | null;
  winMargin: number | null;
}

export interface UseMatchResult {
  match: FirestoreMatch | null;
  moveHistory: MoveLogEntry[];
  loading: boolean;
  myColor: "black" | "white" | null;
  opponent: PlayerInfo | null;
  isMyTurn: boolean;
  playMove: (position: Position | null) => Promise<void>;
  resign: () => Promise<void>;
  moveError: string | null;
  floatingScores: FloatingScoreEffect[];
}