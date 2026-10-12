// src/utils/adaptiveLearning.ts
// Bộ máy Đề xuất Bài tập Thông minh (Adaptive Learning Engine):
// - Thu thập dữ liệu thực tế: thời gian suy nghĩ, số lần đi sai, mức độ dùng gợi ý.
// - Tự động điều chỉnh độ khó (Adaptive Difficulty) phù hợp với thực lực người chơi.
// - Đề xuất bài tập kế tiếp cá nhân hóa kèm lý do giải thích minh bạch từ AI.

import type {
  TsumegoSgfPuzzle,
  TsumegoDifficulty,
  UserLearningProfile,
  PuzzleSolveRecord,
} from "../types/training";

const STORAGE_KEY = "go_adaptive_learning_profile";

const DEFAULT_PROFILE: UserLearningProfile = {
  solvedCount: 0,
  accuracyRate: 100,
  avgDurationSeconds: 20,
  currentEstimatedRank: "18k",
  recommendedDifficulty: "beginner",
  consecutiveFastSolves: 0,
  consecutiveStruggles: 0,
  records: {},
};

export function loadLearningProfile(): UserLearningProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveLearningProfile(profile: UserLearningProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error("Không thể lưu learning profile:", err);
  }
}

/**
 * Ghi nhận kết quả 1 lượt giải bài tập và cập nhật hồ sơ thích ứng
 */
export function recordPuzzleAttempt(
  puzzle: TsumegoSgfPuzzle,
  durationSeconds: number,
  attempts: number,
  hintsUsed: number
): { profile: UserLearningProfile; recommendationReason: string } {
  const current = loadLearningProfile();

  const wasCorrectFirstTry = attempts <= 1 && hintsUsed === 0;
  const isFastSolve = durationSeconds <= 25 && wasCorrectFirstTry;
  const isStruggling = durationSeconds >= 60 || attempts > 2 || hintsUsed >= 2;

  const newRecord: PuzzleSolveRecord = {
    puzzleId: puzzle.id,
    solvedAt: new Date().toISOString(),
    durationSeconds,
    attempts,
    hintsUsed,
    wasCorrectFirstTry,
  };

  const updatedRecords = { ...current.records, [puzzle.id]: newRecord };
  const allRecords = Object.values(updatedRecords);

  const solvedCount = allRecords.length;
  const correctCount = allRecords.filter((r) => r.wasCorrectFirstTry).length;
  const accuracyRate = Math.round((correctCount / solvedCount) * 100);

  const totalDuration = allRecords.reduce((acc, r) => acc + r.durationSeconds, 0);
  const avgDurationSeconds = Math.round(totalDuration / solvedCount);

  let consecutiveFastSolves = isFastSolve ? current.consecutiveFastSolves + 1 : 0;
  let consecutiveStruggles = isStruggling ? current.consecutiveStruggles + 1 : 0;

  let recommendedDifficulty: TsumegoDifficulty = current.recommendedDifficulty;
  let recommendationReason = "";

  // Thuật toán điều chỉnh thích ứng (Adaptive Difficulty Ladder)
  if (consecutiveFastSolves >= 2) {
    if (recommendedDifficulty === "beginner") {
      recommendedDifficulty = "intermediate";
      recommendationReason =
        "Thăng hạng! Bạn đã giải chính xác và nhanh chóng liên tiếp. AI nâng độ khó lên mức Trung cấp.";
    } else if (recommendedDifficulty === "intermediate" && consecutiveFastSolves >= 3) {
      recommendedDifficulty = "advanced";
      recommendationReason =
        "Xuất sắc! Phong độ rất cao, AI đề xuất các thế cờ Nâng cao (Kỳ thủ Dan).";
    } else {
      recommendationReason =
        "Phong độ ổn định! Tiếp tục duy trì các bài tập cùng cấp độ để rèn luyện phản xạ.";
    }
  } else if (consecutiveStruggles >= 2) {
    if (recommendedDifficulty === "advanced") {
      recommendedDifficulty = "intermediate";
      recommendationReason =
        "AI phát hiện bạn gặp trở ngại ở thế cờ khó. Tự động điều chỉnh về mức Trung cấp để củng cố kỹ năng.";
    } else if (recommendedDifficulty === "intermediate" && consecutiveStruggles >= 3) {
      recommendedDifficulty = "beginner";
      recommendationReason =
        "AI chuyển về các bài tập Sơ cấp trọng tâm để bạn nắm vững cấu trúc mắt sống.";
    } else {
      recommendationReason =
        "Hãy thư giãn và quan sát kỹ hình cờ. AI duy trì bài tập củng cố để hỗ trợ bạn.";
    }
  } else {
    recommendationReason = `Thời gian giải: ${durationSeconds}s · Độ khó đề xuất: ${
      recommendedDifficulty === "beginner"
        ? "Sơ cấp"
        : recommendedDifficulty === "intermediate"
        ? "Trung cấp"
        : "Nâng cao"
    }.`;
  }

  // Ước tính xếp hạng Kyu/Dan theo hiệu suất giải bài tập
  let estimatedRank = "18k";
  if (recommendedDifficulty === "advanced" && accuracyRate >= 70) estimatedRank = "1d";
  else if (recommendedDifficulty === "advanced") estimatedRank = "3k";
  else if (recommendedDifficulty === "intermediate" && accuracyRate >= 70) estimatedRank = "7k";
  else if (recommendedDifficulty === "intermediate") estimatedRank = "12k";
  else if (accuracyRate >= 80) estimatedRank = "15k";

  const updatedProfile: UserLearningProfile = {
    solvedCount,
    accuracyRate,
    avgDurationSeconds,
    currentEstimatedRank: estimatedRank,
    recommendedDifficulty,
    consecutiveFastSolves,
    consecutiveStruggles,
    records: updatedRecords,
  };

  saveLearningProfile(updatedProfile);
  return { profile: updatedProfile, recommendationReason };
}

/**
 * Đề xuất bài tập thông minh tiếp theo dựa trên hồ sơ thích ứng của người dùng
 */
export function getRecommendedNextPuzzle(
  allPuzzles: TsumegoSgfPuzzle[],
  currentPuzzleId?: string,
  preferredCategory?: string
): { puzzle: TsumegoSgfPuzzle; reason: string } {
  const profile = loadLearningProfile();
  const solvedIds = new Set(Object.keys(profile.records));

  // Lọc bài tập theo category nếu có
  let candidatePool = allPuzzles;
  if (preferredCategory && preferredCategory !== "all") {
    candidatePool = allPuzzles.filter((p) => p.category === preferredCategory);
  }
  if (candidatePool.length === 0) candidatePool = allPuzzles;

  // 1. Ưu tiên bài chưa giải khớp với recommendedDifficulty
  let matches = candidatePool.filter(
    (p) => p.difficulty === profile.recommendedDifficulty && !solvedIds.has(p.id) && p.id !== currentPuzzleId
  );

  let reason = `Đề xuất cấp độ ${
    profile.recommendedDifficulty === "beginner"
      ? "Sơ cấp"
      : profile.recommendedDifficulty === "intermediate"
      ? "Trung cấp"
      : "Nâng cao"
  } dựa trên tốc độ và độ chính xác của bạn.`;

  // 2. Nếu đã giải hết độ khó đó, tìm bài chưa giải bất kỳ
  if (matches.length === 0) {
    matches = candidatePool.filter((p) => !solvedIds.has(p.id) && p.id !== currentPuzzleId);
    reason = "Bạn đã hoàn thành hầu hết bài tập cấp này. AI đề xuất bài tập mới tiếp theo.";
  }

  // 3. Nếu đã giải hết toàn bộ, chọn bài bất kỳ khác bài hiện tại
  if (matches.length === 0) {
    matches = candidatePool.filter((p) => p.id !== currentPuzzleId);
    reason = "Ôn tập lại bài tập để duy trì cảm giác cờ nhạy bén.";
  }

  const selected = matches[Math.floor(Math.random() * matches.length)] || allPuzzles[0];
  return { puzzle: selected, reason };
}
