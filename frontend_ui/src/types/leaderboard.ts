// src/types/leaderboard.ts
import type { BoardSize } from "./go";

export type AiDifficulty = "easy" | "medium" | "hard";

export interface AiVictoryRecord {
  id: string;
  uid: string;
  username: string;
  photoURL?: string | null;
  boardSize: BoardSize;
  difficulty: AiDifficulty;
  modeKey: string; // e.g. "19_hard", "13_medium", "9_easy"
  winCount: number;
  fewestMoves: number;
  bestScoreMargin: number;
  lastVictoryAt: number | any;
  danRank?: string;
}

export interface AiLeaderboardFilter {
  boardSize: "all" | BoardSize;
  difficulty: "all" | AiDifficulty;
  sortBy: "winCount" | "fewestMoves" | "bestScoreMargin";
}
