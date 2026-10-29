// src/types/leaderboardEntry.ts
// Định nghĩa kiểu dữ liệu chuẩn cho Bảng Xếp Hạng Kỳ Thủ kết nối Firebase Firestore

export interface PlayerLeaderboardEntry {
  id: string;
  rank: number;
  currentRank?: number;
  username: string;
  displayName: string;
  initials: string;
  stoneType: "black" | "white";
  country: string;
  countryCode: string;
  danRank: string;
  isPro?: boolean;
  titleBadge?: string;
  ratingPoints: number;
  isCurrentUser?: boolean;

  // 1. Đấu với người chơi khác (PvP)
  pvpStats: {
    matches: number;
    wins: number;
    losses: number;
    draws: number;
    winRate: number;
    highScore: number;
    currentStreak: number;
  };

  // 2. Đấu với máy (PvE) theo 4 mức độ khó
  aiStats: {
    totalMatches: number;
    totalWins: number;
    byDifficulty: {
      easy: { matches: number; wins: number };
      medium: { matches: number; wins: number };
      hard: { matches: number; wins: number };
      master: { matches: number; wins: number };
    };
  };

  // 3. Giải bài tập Tsumego theo 4 độ khó
  tsumegoStats: {
    totalSolved: number;
    totalScore: number;
    byDifficulty: {
      beginner: { solved: number; total: number };
      intermediate: { solved: number; total: number };
      advanced: { solved: number; total: number };
      master: { solved: number; total: number };
    };
  };

  trend: "up" | "down" | "same";
  rankChange: number;
}

