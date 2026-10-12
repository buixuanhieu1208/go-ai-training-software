// src/types/training.ts
// Kiểu dữ liệu cho module "Luyện tập": Tsumego, đánh giá phong độ (Elo/Kyu/Dan).

import type { BoardMatrix, MistakeTag } from "./go";

export type TsumegoDifficulty = "beginner" | "intermediate" | "advanced";

export interface TsumegoProblem {
  id: string;
  title: string;
  difficulty: TsumegoDifficulty;
  initialBoard: BoardMatrix;
  /** Bên phải giải (thường là quân đi trước) */
  toPlay: "black" | "white";
  /** Mô tả yêu cầu, vd: "Đen đi trước, sống" */
  instruction: string;
}

export type TsumegoCategory =
  | "life_death"
  | "ko"
  | "yose"
  | "opening"
  | "personal"
  | "tsumego"
  | "endgame";

export interface HotspotArea {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/**
 * Bài tập Tsumego định nghĩa trực tiếp bằng chuỗi SGF (dùng AB/AW để set thế
 * cờ ban đầu, và nhánh chính là lời giải đúng).
 */
export interface TsumegoSgfPuzzle {
  id: string;
  title: string;
  difficulty: TsumegoDifficulty;
  instruction: string;
  sgf: string;
  category?: TsumegoCategory;
  topic?: "life_death" | "ko" | "yose" | "opening" | "personal";
  rankGrade?: string; // e.g. "20k", "12k", "5k", "1d"
  explanation?: string;
  hotspotArea?: HotspotArea;
  hints?: {
    level1?: string; // Gợi ý cấp 1: Khu vực/Vùng trọng tâm
    level2?: string; // Gợi ý cấp 2: Hướng chiến thuật / Ý đồ
  };
}

/** Bản ghi kết quả giải bài tập của người dùng để phục vụ thuật toán Adaptive Learning */
export interface PuzzleSolveRecord {
  puzzleId: string;
  solvedAt: string;
  durationSeconds: number;
  attempts: number; // số lần đi nước trước khi thành công
  hintsUsed: number; // 0: không dùng, 1-3: cấp gợi ý đã mở
  wasCorrectFirstTry: boolean;
}

/** Hồ sơ năng lực giải thế cờ của người chơi (Adaptive Profile) */
export interface UserLearningProfile {
  solvedCount: number;
  accuracyRate: number; // 0 - 100%
  avgDurationSeconds: number;
  currentEstimatedRank: string; // e.g. "15k", "8k", "2d"
  recommendedDifficulty: TsumegoDifficulty;
  consecutiveFastSolves: number;
  consecutiveStruggles: number;
  records: Record<string, PuzzleSolveRecord>;
}

export type RankSystem = "kyu" | "dan";

/** 1 điểm dữ liệu trên biểu đồ tiến trình Elo/Kyu/Dan */
export interface ProgressPoint {
  date: string; // ISO date
  elo: number;
  rankLabel: string; // vd: "12k", "3d"
}

/** Thống kê lỗi sai tổng hợp theo loại, dùng để vẽ biểu đồ cột/pie */
export interface MistakeStat {
  tag: MistakeTag;
  count: number;
}
