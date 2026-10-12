// src/data/puzzles/allPuzzles.ts
// Điểm tổng hợp toàn bộ kho tàng bài tập của hệ thống:
// - Khai cuộc & Định thức (Joseki - 501 bài)
// - Thế cờ Sống / Chết (Tử hoạt - 264 bài WBaduk)
// - Cướp cờ - Ko (Ko fights)
// - Quan tử - Yose (Endgame)
// - Bài tập cá nhân (Personalized puzzles trích xuất từ ván đấu)

import type { TsumegoSgfPuzzle, TsumegoDifficulty, TsumegoCategory } from "../../types/training";
import { OPENING_PUZZLES } from "./openingPuzzles";
import { TSUMEGO_PUZZLES } from "./tsumegoPuzzles";
import { KO_PUZZLES, YOSE_PUZZLES } from "./specializedPuzzles";

export const BUILTIN_PUZZLES: TsumegoSgfPuzzle[] = [
  ...TSUMEGO_PUZZLES,
  ...OPENING_PUZZLES,
  ...KO_PUZZLES,
  ...YOSE_PUZZLES,
];

/** Lấy các bài tập cá nhân được trích xuất từ các lỗi sai trong ván cờ */
export function getPersonalPuzzles(): TsumegoSgfPuzzle[] {
  try {
    const raw = localStorage.getItem("go_personal_extracted_puzzles");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePersonalPuzzle(puzzle: TsumegoSgfPuzzle): void {
  try {
    const existing = getPersonalPuzzles();
    const updated = [puzzle, ...existing.filter((p) => p.id !== puzzle.id)];
    localStorage.setItem("go_personal_extracted_puzzles", JSON.stringify(updated));
  } catch (err) {
    console.error("Lỗi khi lưu bài tập cá nhân:", err);
  }
}

export function deletePersonalPuzzle(id: string): void {
  try {
    const existing = getPersonalPuzzles();
    const updated = existing.filter((p) => p.id !== id);
    localStorage.setItem("go_personal_extracted_puzzles", JSON.stringify(updated));
  } catch (err) {
    console.error("Lỗi khi xóa bài tập cá nhân:", err);
  }
}

/** Toàn bộ bài tập hiện có trong hệ thống (gồm cả bài hệ thống và bài cá nhân) */
export const ALL_PUZZLES: TsumegoSgfPuzzle[] = [
  ...BUILTIN_PUZZLES,
];

export function getAllCurrentPuzzles(): TsumegoSgfPuzzle[] {
  return [...BUILTIN_PUZZLES, ...getPersonalPuzzles()];
}

export function getPuzzlesByCategory(
  category: "all" | TsumegoCategory
): TsumegoSgfPuzzle[] {
  const all = getAllCurrentPuzzles();
  if (category === "all") return all;
  if (category === "personal") return getPersonalPuzzles();
  if (category === "tsumego" || category === "life_death") {
    return all.filter((p) => p.category === "tsumego" || p.category === "life_death" || p.topic === "life_death");
  }
  if (category === "opening") {
    return all.filter((p) => p.category === "opening" || p.topic === "opening");
  }
  if (category === "ko") {
    return all.filter((p) => p.category === "ko" || p.topic === "ko");
  }
  if (category === "yose" || category === "endgame") {
    return all.filter((p) => p.category === "yose" || p.category === "endgame" || p.topic === "yose");
  }
  return all.filter((p) => p.category === category);
}

export function filterPuzzles(
  category: "all" | TsumegoCategory,
  difficulty: "all" | TsumegoDifficulty
): TsumegoSgfPuzzle[] {
  let list = getPuzzlesByCategory(category);
  if (difficulty !== "all") {
    list = list.filter((p) => p.difficulty === difficulty);
  }
  return list;
}
