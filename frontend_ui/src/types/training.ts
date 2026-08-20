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

/**
 * Bài tập Tsumego định nghĩa trực tiếp bằng chuỗi SGF (dùng AB/AW để set thế
 * cờ ban đầu, và nhánh chính là lời giải đúng). Đây là dạng dữ liệu thực tế
 * dùng cho TsumegoPractice — gọn hơn TsumegoProblem vì không cần tiền xử lý
 * thành BoardMatrix, việc đó do sgfParser lo.
 */
export interface TsumegoSgfPuzzle {
  id: string;
  title: string;
  difficulty: TsumegoDifficulty;
  instruction: string;
  sgf: string;
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
