// src/data/puzzles/dailyChallenge.ts
// Quản lý Thử thách hàng ngày (Daily Challenge):
// - Mỗi ngày tự động chọn ra 3 bài tập (1 Dễ, 1 Vừa, 1 Khó) dựa trên ngày hiện tại.
// - Lưu trữ tiến độ, chuỗi ngày liên tiếp (streak 🔥), và điểm số vào localStorage.

import type { TsumegoSgfPuzzle } from "../../types/training";
import { OPENING_PUZZLES } from "./openingPuzzles";
import { TSUMEGO_PUZZLES } from "./tsumegoPuzzles";

const STORAGE_KEY_DAILY = "go_daily_challenge_state";

export interface DailyChallengeState {
  lastDate: string; // "YYYY-MM-DD"
  streak: number;
  completedPuzzleIds: string[];
  totalStars: number;
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Băm ngày thành số nguyên để random có tính xác thực theo ngày */
function pseudoHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Lấy 3 bài tập đại diện cho ngày hôm nay */
export function getDailyPuzzlesForToday(): TsumegoSgfPuzzle[] {
  const dateStr = getTodayDateString();
  const seed = pseudoHash(dateStr);

  const allPuzzles = [...OPENING_PUZZLES, ...TSUMEGO_PUZZLES];
  const beginners = allPuzzles.filter((p) => p.difficulty === "beginner");
  const intermediates = allPuzzles.filter((p) => p.difficulty === "intermediate");
  const advanceds = allPuzzles.filter((p) => p.difficulty === "advanced");

  const p1 = beginners[seed % beginners.length];
  const p2 = intermediates[(seed + 1) % intermediates.length];
  const p3 = advanceds[(seed + 2) % advanceds.length];

  return [p1, p2, p3];
}

/** Tải dữ liệu trạng thái Daily Challenge từ localStorage */
export function loadDailyState(): DailyChallengeState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DAILY);
    if (!raw) {
      return {
        lastDate: "",
        streak: 0,
        completedPuzzleIds: [],
        totalStars: 0,
      };
    }
    const state: DailyChallengeState = JSON.parse(raw);
    const today = getTodayDateString();

    // Nếu qua ngày mới thì reset danh sách hoàn thành trong ngày
    if (state.lastDate !== today) {
      // Kiểm tra xem có giữ streak không (nếu ngày trước là hôm qua)
      const last = new Date(state.lastDate);
      const now = new Date(today);
      const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 3600 * 24));

      if (diffDays > 1) {
        state.streak = 0; // Đứt chuỗi nếu bỏ lỡ hơn 1 ngày
      }
      state.completedPuzzleIds = [];
    }
    return state;
  } catch {
    return {
      lastDate: "",
      streak: 0,
      completedPuzzleIds: [],
      totalStars: 0,
    };
  }
}

/** Ghi nhận một bài đã giải xong trong ngày */
export function recordDailyPuzzleSolved(puzzleId: string): DailyChallengeState {
  const state = loadDailyState();
  const today = getTodayDateString();

  if (!state.completedPuzzleIds.includes(puzzleId)) {
    state.completedPuzzleIds.push(puzzleId);
    state.totalStars += 1;

    // Nếu đã hoàn thành đủ 3 bài của ngày hôm nay và hôm nay chưa tăng streak
    if (state.completedPuzzleIds.length >= 3 && state.lastDate !== today) {
      state.streak += 1;
      state.lastDate = today;
    }
  }

  try {
    localStorage.setItem(STORAGE_KEY_DAILY, JSON.stringify(state));
  } catch (err) {
    console.error("Lỗi lưu daily challenge state:", err);
  }

  return state;
}
