// src/components/Tsumego/mockTsumegoData.ts
// Re-export toàn bộ dữ liệu bài tập thực tế từ data/puzzles/allPuzzles.ts
// để giữ tương thích ngược với các component đang import từ đây.

import { ALL_PUZZLES } from "../../data/puzzles/allPuzzles";

export const MOCK_TSUMEGO_PUZZLES = ALL_PUZZLES;
