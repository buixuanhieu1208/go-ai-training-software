// src/utils/rankUtils.ts
// Thang đo cấp bậc cờ vây quốc tế (Kyu / Dan) quy đổi từ hệ số Rating / ELO.
// Kyu (K): 25k -> 1k (Càng nhỏ càng mạnh)
// Dan (D): 1d -> 9d (Càng lớn càng mạnh)

export interface RankInfo {
  elo: number;
  rank: string;         // "15k", "1d", v.v.
  title: string;        // "Tập sự", "Sơ cấp", "Kỳ thủ Đẳng cấp", v.v.
  badgeColor: string;   // Màu nền badge
  textColor: string;    // Màu chữ badge
  nextRank: string | null;
  pointsToNext: number; // Điểm cần thêm để lên rank kế
  progressPct: number;  // % tiến trình trong bậc hiện tại (0 - 100)
}

interface RankTier {
  minElo: number;
  rank: string;
  title: string;
  badgeColor: string;
  textColor: string;
}

const RANK_TIERS: RankTier[] = [
  { minElo: 0,    rank: "25k", title: "Mới học cờ",    badgeColor: "#4a463c", textColor: "#ded8cc" },
  { minElo: 800,  rank: "20k", title: "Tập sự",         badgeColor: "#575143", textColor: "#ede7d9" },
  { minElo: 900,  rank: "18k", title: "Tập sự",         badgeColor: "#575143", textColor: "#ede7d9" },
  { minElo: 1000, rank: "15k", title: "Sơ cấp",         badgeColor: "#3a5643", textColor: "#9ae6b4" },
  { minElo: 1100, rank: "13k", title: "Sơ cấp",         badgeColor: "#3a5643", textColor: "#9ae6b4" },
  { minElo: 1200, rank: "11k", title: "Sơ cấp",         badgeColor: "#3a5643", textColor: "#9ae6b4" },
  { minElo: 1300, rank: "9k",  title: "Trung cấp",      badgeColor: "#2b4c6f", textColor: "#90cdf4" },
  { minElo: 1400, rank: "7k",  title: "Trung cấp",      badgeColor: "#2b4c6f", textColor: "#90cdf4" },
  { minElo: 1500, rank: "5k",  title: "Trung cấp",      badgeColor: "#2b4c6f", textColor: "#90cdf4" },
  { minElo: 1600, rank: "3k",  title: "Cao cấp",        badgeColor: "#6b46c1", textColor: "#d6bcfa" },
  { minElo: 1700, rank: "2k",  title: "Cao cấp",        badgeColor: "#6b46c1", textColor: "#d6bcfa" },
  { minElo: 1800, rank: "1k",  title: "Đỉnh cao Kyu",   badgeColor: "#744210", textColor: "#fbd38d" },
  { minElo: 1900, rank: "1d",  title: "Nhất đẳng (Dan)", badgeColor: "#c53030", textColor: "#feb2b2" },
  { minElo: 2000, rank: "2d",  title: "Nhị đẳng (Dan)",  badgeColor: "#c53030", textColor: "#feb2b2" },
  { minElo: 2100, rank: "3d",  title: "Tam đẳng (Dan)",  badgeColor: "#c53030", textColor: "#feb2b2" },
  { minElo: 2200, rank: "4d",  title: "Tứ đẳng (Dan)",   badgeColor: "#9b2c2c", textColor: "#fed7d7" },
  { minElo: 2300, rank: "5d",  title: "Ngũ đẳng (Dan)",  badgeColor: "#9b2c2c", textColor: "#fed7d7" },
  { minElo: 2400, rank: "6d",  title: "Lục đẳng (Dan)",  badgeColor: "#742a2a", textColor: "#fff5f5" },
  { minElo: 2500, rank: "7d",  title: "Thất đẳng",       badgeColor: "#b7791f", textColor: "#fefcbf" },
  { minElo: 2600, rank: "8d",  title: "Bát đẳng",        badgeColor: "#b7791f", textColor: "#fefcbf" },
  { minElo: 2700, rank: "9d",  title: "Cửu đẳng (Master)", badgeColor: "#d69e2e", textColor: "#1a202c" },
];

export function getRankFromElo(elo: number = 1000): RankInfo {
  const safeElo = Math.max(0, Math.round(elo));
  let tierIndex = 0;

  for (let i = 0; i < RANK_TIERS.length; i++) {
    if (safeElo >= RANK_TIERS[i].minElo) {
      tierIndex = i;
    } else {
      break;
    }
  }

  const currentTier = RANK_TIERS[tierIndex];
  const nextTier = tierIndex < RANK_TIERS.length - 1 ? RANK_TIERS[tierIndex + 1] : null;

  let pointsToNext = 0;
  let progressPct = 100;

  if (nextTier) {
    const tierSpan = nextTier.minElo - currentTier.minElo;
    const gained = safeElo - currentTier.minElo;
    pointsToNext = nextTier.minElo - safeElo;
    progressPct = Math.min(100, Math.max(0, Math.round((gained / tierSpan) * 100)));
  }

  return {
    elo: safeElo,
    rank: currentTier.rank,
    title: currentTier.title,
    badgeColor: currentTier.badgeColor,
    textColor: currentTier.textColor,
    nextRank: nextTier ? nextTier.rank : null,
    pointsToNext,
    progressPct,
  };
}
