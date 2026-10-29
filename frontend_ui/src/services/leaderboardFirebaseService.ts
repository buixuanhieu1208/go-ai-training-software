// src/services/leaderboardFirebaseService.ts
// Lấy dữ liệu Bảng Xếp Hạng thực tế từ Firebase Firestore:
// - Nạp danh sách người chơi từ collection 'users'
// - Nạp chiến tích diệt AI từ collection 'aiLeaderboard'
// - Tự động tính toán điểm Rating, Dan/Kyu, tỉ lệ thắng và thứ hạng theo thời gian thực

import { db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  limit,
} from "firebase/firestore";
import type { PlayerLeaderboardEntry } from "../types/leaderboardEntry";

export function eloToDanRank(elo: number): string {
  if (elo >= 2600) return "9 Dan Pro";
  if (elo >= 2400) return "6 Dan";
  if (elo >= 2200) return "4 Dan";
  if (elo >= 2000) return "2 Dan";
  if (elo >= 1800) return "1 Dan";
  if (elo >= 1600) return "1 Kyu";
  if (elo >= 1400) return "3 Kyu";
  if (elo >= 1200) return "5 Kyu";
  if (elo >= 1000) return "8 Kyu";
  return "15 Kyu";
}

/** Tải toàn bộ bảng xếp hạng thực tế từ Firebase Firestore */
export async function fetchRealLeaderboard(
  currentUid?: string | null
): Promise<PlayerLeaderboardEntry[]> {
  const playerMap = new Map<string, PlayerLeaderboardEntry>();

  // 1. Tải danh sách người dùng từ collection 'users'
  try {
    const usersSnap = await getDocs(query(collection(db, "users"), limit(100)));
    usersSnap.forEach((docSnap) => {
      const data = docSnap.data();
      const uid = docSnap.id;
      const displayName = data.displayName || data.username || "Kỳ thủ";
      const username = data.username || `user_${uid.slice(0, 6)}`;
      const elo = Number(data.elo || 1000);
      const wins = Number(data.wins || 0);
      const losses = Number(data.losses || 0);
      const draws = Number(data.draws || 0);
      const matches = wins + losses + draws;
      const winRate = matches > 0 ? Number(((wins / matches) * 100).toFixed(1)) : 0;

      const words = displayName.trim().split(/\s+/);
      const initials = words.length > 1
        ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
        : words[0].slice(0, 2).toUpperCase();

      // Thống kê AI từ user doc nếu có
      const aiWins = data.aiWins || {};
      const aiTotalWins = Number(data.aiTotalWins || 0);
      const easyAiWins = Number(aiWins["19_easy"] || 0) + Number(aiWins["13_easy"] || 0) + Number(aiWins["9_easy"] || 0);
      const medAiWins = Number(aiWins["19_medium"] || 0) + Number(aiWins["13_medium"] || 0) + Number(aiWins["9_medium"] || 0);
      const hardAiWins = Number(aiWins["19_hard"] || 0) + Number(aiWins["13_hard"] || 0) + Number(aiWins["9_hard"] || 0);
      const masterAiWins = Number(aiWins["19_hard"] || 0);

      const tsumegoSolved = Number(data.tsumegoSolved || 0);

      playerMap.set(uid, {
        id: uid,
        rank: 0,
        username,
        displayName,
        initials,
        stoneType: (matches + wins) % 2 === 0 ? "black" : "white",
        country: data.country || "Việt Nam",
        countryCode: data.countryCode || "VN",
        danRank: eloToDanRank(elo),
        isPro: elo >= 2600,
        titleBadge: elo >= 2400 ? "Cao Thủ Đại Sư" : hardAiWins > 0 ? "Diệt KataGo" : undefined,
        ratingPoints: elo,
        isCurrentUser: Boolean(currentUid && uid === currentUid),
        pvpStats: {
          matches,
          wins,
          losses,
          draws,
          winRate,
          highScore: Number(data.highScore || elo),
          currentStreak: Number(data.currentStreak || 0),
        },
        aiStats: {
          totalMatches: aiTotalWins,
          totalWins: aiTotalWins,
          byDifficulty: {
            easy: { matches: easyAiWins, wins: easyAiWins },
            medium: { matches: medAiWins, wins: medAiWins },
            hard: { matches: hardAiWins, wins: hardAiWins },
            master: { matches: masterAiWins, wins: masterAiWins },
          },
        },
        tsumegoStats: {
          totalSolved: tsumegoSolved,
          totalScore: tsumegoSolved * 10,
          byDifficulty: {
            beginner: { solved: Math.min(20, tsumegoSolved), total: 20 },
            intermediate: { solved: Math.min(20, Math.max(0, tsumegoSolved - 20)), total: 20 },
            advanced: { solved: Math.min(20, Math.max(0, tsumegoSolved - 40)), total: 20 },
            master: { solved: Math.min(20, Math.max(0, tsumegoSolved - 60)), total: 20 },
          },
        },
        trend: "same",
        rankChange: 0,
      });
    });
  } catch (err) {
    console.warn("Lỗi tải users từ Firestore cho Leaderboard:", err);
  }

  // Nếu người dùng hiện tại chưa có trong danh sách top 100, nạp riêng hồ sơ của họ
  if (currentUid && !playerMap.has(currentUid)) {
    try {
      const userDoc = await getDoc(doc(db, "users", currentUid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        const displayName = data.displayName || data.username || "Bạn";
        const username = data.username || `user_${currentUid.slice(0, 6)}`;
        const elo = Number(data.elo || 1000);
        const wins = Number(data.wins || 0);
        const losses = Number(data.losses || 0);
        const draws = Number(data.draws || 0);
        const matches = wins + losses + draws;
        const winRate = matches > 0 ? Number(((wins / matches) * 100).toFixed(1)) : 0;
        const words = displayName.trim().split(/\s+/);
        const initials = words.length > 1
          ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
          : words[0].slice(0, 2).toUpperCase();

        const aiWins = data.aiWins || {};
        const aiTotalWins = Number(data.aiTotalWins || 0);
        const easyAiWins = Number(aiWins["19_easy"] || 0) + Number(aiWins["13_easy"] || 0) + Number(aiWins["9_easy"] || 0);
        const medAiWins = Number(aiWins["19_medium"] || 0) + Number(aiWins["13_medium"] || 0) + Number(aiWins["9_medium"] || 0);
        const hardAiWins = Number(aiWins["19_hard"] || 0) + Number(aiWins["13_hard"] || 0) + Number(aiWins["9_hard"] || 0);

        playerMap.set(currentUid, {
          id: currentUid,
          rank: 0,
          username,
          displayName,
          initials,
          stoneType: (matches + wins) % 2 === 0 ? "black" : "white",
          country: data.country || "Việt Nam",
          countryCode: data.countryCode || "VN",
          danRank: eloToDanRank(elo),
          isPro: elo >= 2600,
          titleBadge: elo >= 2400 ? "Cao Thủ Đại Sư" : hardAiWins > 0 ? "Diệt KataGo" : undefined,
          ratingPoints: elo,
          isCurrentUser: true,
          pvpStats: {
            matches,
            wins,
            losses,
            draws,
            winRate,
            highScore: Number(data.highScore || elo),
            currentStreak: Number(data.currentStreak || 0),
          },
          aiStats: {
            totalMatches: aiTotalWins,
            totalWins: aiTotalWins,
            byDifficulty: {
              easy: { matches: easyAiWins, wins: easyAiWins },
              medium: { matches: medAiWins, wins: medAiWins },
              hard: { matches: hardAiWins, wins: hardAiWins },
              master: { matches: hardAiWins, wins: hardAiWins },
            },
          },
          tsumegoStats: {
            totalSolved: Number(data.tsumegoSolved || 0),
            totalScore: Number(data.tsumegoSolved || 0) * 10,
            byDifficulty: {
              beginner: { solved: Math.min(20, Number(data.tsumegoSolved || 0)), total: 20 },
              intermediate: { solved: Math.min(20, Math.max(0, Number(data.tsumegoSolved || 0) - 20)), total: 20 },
              advanced: { solved: Math.min(20, Math.max(0, Number(data.tsumegoSolved || 0) - 40)), total: 20 },
              master: { solved: Math.min(20, Math.max(0, Number(data.tsumegoSolved || 0) - 60)), total: 20 },
            },
          },
          trend: "same",
          rankChange: 0,
        });
      }
    } catch (err) {
      console.warn("Lỗi nạp hồ sơ người dùng hiện tại:", err);
    }
  }

  // 2. Tải thành tích từ collection 'aiLeaderboard' và ghép vào
  try {
    const aiSnap = await getDocs(query(collection(db, "aiLeaderboard"), limit(100)));
    aiSnap.forEach((docSnap) => {
      const data = docSnap.data();
      const uid = data.uid || docSnap.id;
      const difficulty = data.difficulty || "medium";
      const winCount = Number(data.winCount || 1);
      const isMaster = difficulty === "hard" && Number(data.boardSize) === 19;

      let player = playerMap.get(uid);
      if (!player) {
        const displayName = data.username || "Kỳ thủ";
        const words = displayName.trim().split(/\s+/);
        const initials = words.length > 1
          ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
          : words[0].slice(0, 2).toUpperCase();

        const estElo = 1200 + winCount * 30;
        player = {
          id: uid,
          rank: 0,
          username: `user_${uid.slice(0, 6)}`,
          displayName,
          initials,
          stoneType: "black",
          country: "Việt Nam",
          countryCode: "VN",
          danRank: eloToDanRank(estElo),
          titleBadge: difficulty === "hard" ? "Diệt KataGo" : undefined,
          ratingPoints: estElo,
          isCurrentUser: Boolean(currentUid && uid === currentUid),
          pvpStats: {
            matches: 0,
            wins: 0,
            losses: 0,
            draws: 0,
            winRate: 0,
            highScore: estElo,
            currentStreak: 0,
          },
          aiStats: {
            totalMatches: winCount,
            totalWins: winCount,
            byDifficulty: {
              easy: { matches: 0, wins: 0 },
              medium: { matches: 0, wins: 0 },
              hard: { matches: 0, wins: 0 },
              master: { matches: 0, wins: 0 },
            },
          },
          tsumegoStats: {
            totalSolved: 0,
            totalScore: 0,
            byDifficulty: {
              beginner: { solved: 0, total: 20 },
              intermediate: { solved: 0, total: 20 },
              advanced: { solved: 0, total: 20 },
              master: { solved: 0, total: 20 },
            },
          },
          trend: "same",
          rankChange: 0,
        };
        playerMap.set(uid, player);
      }

      // Cập nhật số ván thắng AI vào hồ sơ
      if (difficulty === "easy") {
        player.aiStats.byDifficulty.easy.wins += winCount;
        player.aiStats.byDifficulty.easy.matches += winCount;
      } else if (difficulty === "medium") {
        player.aiStats.byDifficulty.medium.wins += winCount;
        player.aiStats.byDifficulty.medium.matches += winCount;
      } else if (difficulty === "hard") {
        player.aiStats.byDifficulty.hard.wins += winCount;
        player.aiStats.byDifficulty.hard.matches += winCount;
      }
      if (isMaster) {
        player.aiStats.byDifficulty.master.wins += winCount;
        player.aiStats.byDifficulty.master.matches += winCount;
      }
      player.aiStats.totalWins += winCount;
      player.aiStats.totalMatches += winCount;
    });
  } catch (err) {
    console.warn("Lỗi tải aiLeaderboard từ Firestore:", err);
  }

  // 3. Nạp thêm các chiến tích lưu tạm từ LocalStorage (guest hoặc ván vừa thắng offline)
  try {
    const rawLocal = localStorage.getItem("go_ai_defeats");
    if (rawLocal) {
      const localList: any[] = JSON.parse(rawLocal);
      localList.forEach((m) => {
        const uid = m.uid || "guest_player";
        const difficulty = m.difficulty || "medium";
        let player = playerMap.get(uid);
        if (!player) {
          const displayName = m.username || "Bạn (Khách)";
          player = {
            id: uid,
            rank: 0,
            username: "guest",
            displayName,
            initials: "BẠ",
            stoneType: "black",
            country: "Việt Nam",
            countryCode: "VN",
            danRank: "1 Kyu",
            ratingPoints: 1550,
            isCurrentUser: true,
            pvpStats: { matches: 0, wins: 0, losses: 0, draws: 0, winRate: 0, highScore: 1550, currentStreak: 0 },
            aiStats: {
              totalMatches: 0,
              totalWins: 0,
              byDifficulty: {
                easy: { matches: 0, wins: 0 },
                medium: { matches: 0, wins: 0 },
                hard: { matches: 0, wins: 0 },
                master: { matches: 0, wins: 0 },
              },
            },
            tsumegoStats: {
              totalSolved: 0,
              totalScore: 0,
              byDifficulty: {
                beginner: { solved: 0, total: 20 },
                intermediate: { solved: 0, total: 20 },
                advanced: { solved: 0, total: 20 },
                master: { solved: 0, total: 20 },
              },
            },
            trend: "same",
            rankChange: 0,
          };
          playerMap.set(uid, player);
        }
        player.aiStats.totalWins += 1;
        player.aiStats.totalMatches += 1;
        if (difficulty === "easy") player.aiStats.byDifficulty.easy.wins += 1;
        else if (difficulty === "medium") player.aiStats.byDifficulty.medium.wins += 1;
        else if (difficulty === "hard") player.aiStats.byDifficulty.hard.wins += 1;
      });
    }
  } catch (err) {}

  // 4. Sắp xếp sơ bộ theo Rating Points
  const result = Array.from(playerMap.values()).sort(
    (a, b) => b.ratingPoints - a.ratingPoints
  );

  return result.map((p, idx) => ({
    ...p,
    rank: idx + 1,
    currentRank: idx + 1,
  }));
}
