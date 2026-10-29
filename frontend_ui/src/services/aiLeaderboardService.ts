// src/services/aiLeaderboardService.ts
// Quản lý dữ liệu Bảng Xếp Hạng khi người chơi đánh bại AI ở từng chế độ.
// Đồng bộ Firestore và LocalStorage, có sẵn danh sách hạt giống các kỳ thủ tiêu biểu.

import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  runTransaction,
  serverTimestamp,
  increment,
  updateDoc,
} from "firebase/firestore";
import type { BoardSize } from "../types/go";
import type { AiDifficulty, AiVictoryRecord, AiLeaderboardFilter } from "../types/leaderboard";

const COLLECTION_NAME = "aiLeaderboard";
const LOCAL_STORAGE_KEY = "go_ai_defeats";


/** Ghi nhận chiến tích khi người chơi đánh bại AI */
export async function recordAiDefeat(
  user: { uid: string; displayName?: string | null; username?: string | null; photoURL?: string | null } | null,
  matchDetails: {
    boardSize: BoardSize;
    difficulty: AiDifficulty;
    playerColor: "black" | "white";
    winReason: "resign" | "double-pass" | "end";
    scoreMargin?: number | null;
    moveCount?: number;
  }
) {
  const { boardSize, difficulty, scoreMargin = 0, moveCount = 0 } = matchDetails;
  const modeKey = `${boardSize}_${difficulty}`;
  const now = Date.now();
  const effectiveMargin = Math.max(0, scoreMargin || 0);
  const effectiveMoves = moveCount || 60;

  // 1. Cập nhật localStorage để có dữ liệu ngay lập tức
  try {
    const rawLocal = localStorage.getItem(LOCAL_STORAGE_KEY);
    const localList: any[] = rawLocal ? JSON.parse(rawLocal) : [];
    localList.unshift({
      id: `local_${now}`,
      uid: user?.uid || "guest_player",
      username: user?.displayName || user?.username || "Bạn",
      photoURL: user?.photoURL || null,
      boardSize,
      difficulty,
      modeKey,
      scoreMargin: effectiveMargin,
      moveCount: effectiveMoves,
      timestamp: now,
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localList.slice(0, 100)));
  } catch (err) {
    console.warn("Lỗi lưu AI victory vào LocalStorage:", err);
  }

  // 2. Nếu đã đăng nhập Firebase, ghi nhận vào Firestore
  if (!user || !user.uid) return;

  try {
    const docId = `${user.uid}_${modeKey}`;
    const recordRef = doc(db, COLLECTION_NAME, docId);

    await runTransaction(db, async (tx) => {
      const snap = await tx.get(recordRef);
      if (snap.exists()) {
        const data = snap.data();
        const prevWins = data.winCount || 0;
        const prevFewest = data.fewestMoves && data.fewestMoves > 0 ? data.fewestMoves : 999;
        const prevMargin = data.bestScoreMargin || 0;

        tx.update(recordRef, {
          winCount: prevWins + 1,
          fewestMoves: Math.min(prevFewest, effectiveMoves),
          bestScoreMargin: Math.max(prevMargin, effectiveMargin),
          lastVictoryAt: serverTimestamp(),
          username: user.displayName || user.username || data.username || "Kỳ thủ",
          photoURL: user.photoURL ?? data.photoURL ?? null,
        });
      } else {
        tx.set(recordRef, {
          id: docId,
          uid: user.uid,
          username: user.displayName || user.username || "Kỳ thủ",
          photoURL: user.photoURL ?? null,
          boardSize,
          difficulty,
          modeKey,
          winCount: 1,
          fewestMoves: effectiveMoves,
          bestScoreMargin: effectiveMargin,
          lastVictoryAt: serverTimestamp(),
        });
      }
    });

    // Cập nhật tổng số trận thắng AI trong doc user
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      [`aiWins.${modeKey}`]: increment(1),
      aiTotalWins: increment(1),
    }).catch(async () => {
      await setDoc(
        userRef,
        {
          aiTotalWins: increment(1),
          aiWins: { [modeKey]: increment(1) },
        },
        { merge: true }
      );
    });
  } catch (err) {
    console.warn("Lỗi đồng bộ AI Leaderboard vào Firestore:", err);
  }
}

export interface RankedEntry extends AiVictoryRecord {
  rank: number;
  isCurrentUser?: boolean;
}

/** Lấy danh sách bảng xếp hạng theo bộ lọc */
export async function getAiLeaderboard(
  filter: AiLeaderboardFilter,
  currentUid?: string | null
): Promise<{
  entries: RankedEntry[];
  currentUserEntry: RankedEntry | null;
  totalSlayers: number;
  hardestModeConquered: string;
  fastestWinMoves: number;
}> {
  // Lấy dữ liệu từ Firestore và LocalStorage (chỉ lấy chiến tích thật của người chơi)
  const recordsMap = new Map<string, AiVictoryRecord>();

  // Tải từ Firestore
  try {
    const snap = await getDocs(collection(db, COLLECTION_NAME));
    snap.docs.forEach((d) => {
      if (d.id.startsWith("seed_")) return;
      const data = d.data() as any;
      if (data.uid?.startsWith("seed_")) return;
      const id = d.id;
      recordsMap.set(id, {
        id,
        uid: data.uid || id,
        username: data.username || "Kỳ thủ",
        photoURL: data.photoURL || null,
        boardSize: Number(data.boardSize) as BoardSize,
        difficulty: data.difficulty as AiDifficulty,
        modeKey: data.modeKey || `${data.boardSize}_${data.difficulty}`,
        winCount: data.winCount || 1,
        fewestMoves: data.fewestMoves || 0,
        bestScoreMargin: data.bestScoreMargin || 0,
        lastVictoryAt: data.lastVictoryAt?.toMillis?.() || Date.now(),
        danRank: data.danRank,
      });
    });
  } catch (err) {
    console.warn("Lỗi tải Firestore AI Leaderboard, sử dụng dữ liệu cục bộ:", err);
  }

  // Nạp thêm từ localStorage (cho guest hoặc ván vừa thắng chưa sync)
  try {
    const rawLocal = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (rawLocal) {
      const localList: any[] = JSON.parse(rawLocal);
      localList.forEach((m) => {
        if (m.id?.startsWith("seed_") || m.uid?.startsWith("seed_")) return;
        const key = `${m.uid}_${m.modeKey}`;
        const existing = recordsMap.get(key);
        if (existing) {
          // Chỉ tăng nếu chưa phản ánh
          if (m.timestamp > (existing.lastVictoryAt || 0) + 1000) {
            existing.winCount += 1;
            existing.fewestMoves = Math.min(existing.fewestMoves || 999, m.moveCount || 999);
            existing.bestScoreMargin = Math.max(existing.bestScoreMargin || 0, m.scoreMargin || 0);
          }
        } else {
          recordsMap.set(key, {
            id: key,
            uid: m.uid,
            username: m.username || "Bạn",
            photoURL: m.photoURL,
            boardSize: m.boardSize,
            difficulty: m.difficulty,
            modeKey: m.modeKey,
            winCount: 1,
            fewestMoves: m.moveCount || 60,
            bestScoreMargin: m.scoreMargin || 0,
            lastVictoryAt: m.timestamp,
          });
        }
      });
    }
  } catch (err) {}

  let allList = Array.from(recordsMap.values());

  // Thống kê toàn cảnh từ dữ liệu thật
  const uniqueSlayers = new Set(allList.map((i) => i.uid)).size;
  const hardWins = allList.filter((i) => i.difficulty === "hard");
  const mediumWins = allList.filter((i) => i.difficulty === "medium");
  const easyWins = allList.filter((i) => i.difficulty === "easy");

  let hardestModeConquered = "—";
  if (hardWins.some((i) => i.boardSize === 19)) {
    hardestModeConquered = "19×19 · Khó (KataGo)";
  } else if (hardWins.some((i) => i.boardSize === 13)) {
    hardestModeConquered = "13×13 · Khó";
  } else if (hardWins.some((i) => i.boardSize === 9)) {
    hardestModeConquered = "9×9 · Khó";
  } else if (mediumWins.some((i) => i.boardSize === 19)) {
    hardestModeConquered = "19×19 · Trung bình";
  } else if (mediumWins.some((i) => i.boardSize === 13)) {
    hardestModeConquered = "13×13 · Trung bình";
  } else if (mediumWins.some((i) => i.boardSize === 9)) {
    hardestModeConquered = "9×9 · Trung bình";
  } else if (easyWins.some((i) => i.boardSize === 19)) {
    hardestModeConquered = "19×19 · Dễ";
  } else if (easyWins.some((i) => i.boardSize === 13)) {
    hardestModeConquered = "13×13 · Dễ";
  } else if (easyWins.some((i) => i.boardSize === 9)) {
    hardestModeConquered = "9×9 · Dễ";
  }

  const allValidMoves = allList.map((i) => i.fewestMoves).filter((m) => m > 0);
  const fastestWinMoves = allValidMoves.length > 0 ? Math.min(...allValidMoves) : 0;


  // Lọc theo bộ lọc
  let filtered = allList.filter((item) => {
    if (filter.boardSize !== "all" && item.boardSize !== Number(filter.boardSize)) {
      return false;
    }
    if (filter.difficulty !== "all" && item.difficulty !== filter.difficulty) {
      return false;
    }
    return true;
  });

  // Sắp xếp
  filtered.sort((a, b) => {
    if (filter.sortBy === "fewestMoves") {
      const ma = a.fewestMoves > 0 ? a.fewestMoves : 999;
      const mb = b.fewestMoves > 0 ? b.fewestMoves : 999;
      if (ma !== mb) return ma - mb;
      return b.winCount - a.winCount;
    }
    if (filter.sortBy === "bestScoreMargin") {
      if (b.bestScoreMargin !== a.bestScoreMargin) {
        return b.bestScoreMargin - a.bestScoreMargin;
      }
      return b.winCount - a.winCount;
    }
    // Mặc định: winCount desc
    if (b.winCount !== a.winCount) {
      return b.winCount - a.winCount;
    }
    const ma = a.fewestMoves > 0 ? a.fewestMoves : 999;
    const mb = b.fewestMoves > 0 ? b.fewestMoves : 999;
    return ma - mb;
  });

  // Gắn số thứ tự rank
  let userRankEntry: RankedEntry | null = null;
  const rankedEntries: RankedEntry[] = filtered.map((entry, idx) => {
    const isMe = Boolean(currentUid && (entry.uid === currentUid || entry.uid === "guest_player"));
    const ranked: RankedEntry = {
      ...entry,
      rank: idx + 1,
      isCurrentUser: isMe,
    };
    if (isMe && !userRankEntry) {
      userRankEntry = ranked;
    }
    return ranked;
  });

  return {
    entries: rankedEntries,
    currentUserEntry: userRankEntry,
    totalSlayers: uniqueSlayers,
    hardestModeConquered,
    fastestWinMoves,
  };
}

export function getDifficultyLabel(diff: AiDifficulty): string {
  switch (diff) {
    case "hard":
      return "Khó (KataGo)";
    case "medium":
      return "Trung bình";
    case "easy":
      return "Dễ";
    default:
      return diff;
  }
}

export function getBoardSizeLabel(size: BoardSize): string {
  switch (size) {
    case 19:
      return "19×19 Tiêu chuẩn";
    case 13:
      return "13×13 Chiến thuật";
    case 9:
      return "9×9 Cờ chớp";
    default:
      return `${size}×${size}`;
  }
}
