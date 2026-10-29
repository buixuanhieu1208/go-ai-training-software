// src/services/liveMatchesFirebaseService.ts
// Lắng nghe các ván đấu đang diễn ra và các phòng đấu mở từ Firebase Firestore:
// - Collection 'matches' (status == 'ongoing')
// - Collection 'rooms' (status == 'waiting')

import { db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export interface LiveMatch {
  id: string;
  type: "pvp" | "pve" | "eve";
  typeLabel: string;
  isWaitingRoom?: boolean;
  roomId?: string;
  matchId?: string;
  playerBlack: {
    name: string;
    rank: string;
    rating: number;
    stoneType: "black";
    timeLeft: string;
    isAi?: boolean;
  };
  playerWhite: {
    name: string;
    rank: string;
    rating: number;
    stoneType: "white";
    timeLeft: string;
    isAi?: boolean;
  };
  currentMove: number;
  blackWinRate: number; // 0..1
  spectatorsCount: number;
  boardSize: number;
}

function eloToRank(elo?: number): string {
  if (!elo) return "10 Kyu";
  if (elo >= 2600) return "9 Dan Pro";
  if (elo >= 2400) return "6 Dan";
  if (elo >= 2200) return "4 Dan";
  if (elo >= 2000) return "2 Dan";
  if (elo >= 1800) return "1 Dan";
  if (elo >= 1600) return "1 Kyu";
  if (elo >= 1400) return "3 Kyu";
  if (elo >= 1200) return "5 Kyu";
  return "10 Kyu";
}

/**
 * Lắng nghe tất cả ván cờ đang diễn ra hoặc phòng chờ thách đấu
 */
export function subscribeToLiveMatches(
  onChange: (matches: LiveMatch[]) => void
): () => void {
  let activeMatches: LiveMatch[] = [];
  let waitingRooms: LiveMatch[] = [];

  const emit = () => {
    onChange([...activeMatches, ...waitingRooms]);
  };

  // 1. Lắng nghe matches có status == "ongoing"
  const matchesQuery = query(
    collection(db, "matches"),
    where("status", "==", "ongoing")
  );

  const unsubMatches = onSnapshot(
    matchesQuery,
    (snap) => {
      activeMatches = snap.docs.map((docSnap) => {
        const data = docSnap.data();
        const rawMode = data.mode;
        const players = data.players || {};
        const black = players.black || {};
        const white = players.white || {};

        const isBlackAi = black.uid === "AI_ENGINE" || black.isAi;
        const isWhiteAi = white.uid === "AI_ENGINE" || white.isAi;

        let type: "pvp" | "pve" | "eve" = rawMode === "eve" ? "eve" : rawMode === "pve" ? "pve" : "pvp";
        let typeLabel = "PvP Đối Kháng Online";
        if (isBlackAi && isWhiteAi || type === "eve") {
          type = "eve";
          typeLabel = "Trực Tiếp AI vs AI";
        } else if (isBlackAi || isWhiteAi || type === "pve") {
          type = "pve";
          typeLabel = "Thử Thách Máy AI";
        }

        const moveCount = Math.max(0, Number(data.nextMoveIndex || 1) - 1);

        return {
          id: docSnap.id,
          matchId: docSnap.id,
          type,
          typeLabel,
          playerBlack: {
            name: black.displayName || (isBlackAi ? "AI KataGo" : "Kỳ thủ Đen"),
            rank: eloToRank(black.elo),
            rating: Number(black.elo || 1200),
            stoneType: "black",
            timeLeft: "10:00",
            isAi: isBlackAi,
          },
          playerWhite: {
            name: white.displayName || (isWhiteAi ? "AI KataGo" : "Kỳ thủ Trắng"),
            rank: eloToRank(white.elo),
            rating: Number(white.elo || 1200),
            stoneType: "white",
            timeLeft: "10:00",
            isAi: isWhiteAi,
          },
          currentMove: moveCount,
          blackWinRate: 0.5,
          spectatorsCount: 1,
          boardSize: Number(data.boardSize || 19),
        };
      });
      emit();
    },
    (err) => {
      console.warn("Lỗi lắng nghe matches:", err);
      emit();
    }
  );

  // 2. Lắng nghe rooms có status == "waiting" (phòng đang chờ đối thủ)
  const roomsQuery = query(
    collection(db, "rooms"),
    where("status", "==", "waiting")
  );

  const unsubRooms = onSnapshot(
    roomsQuery,
    (snap) => {
      waitingRooms = snap.docs.map((docSnap) => {
        const data = docSnap.data();
        const hostName = data.hostDisplayName || "Chủ phòng";
        const hostElo = Number(data.hostElo || 1200);

        return {
          id: `room_${docSnap.id}`,
          roomId: docSnap.id,
          isWaitingRoom: true,
          type: "pvp",
          typeLabel: "Phòng Chờ Thách Đấu",
          playerBlack: {
            name: hostName,
            rank: eloToRank(hostElo),
            rating: hostElo,
            stoneType: "black",
            timeLeft: "15:00",
            isAi: false,
          },
          playerWhite: {
            name: "Đang chờ đối thủ...",
            rank: "Tự do",
            rating: 1000,
            stoneType: "white",
            timeLeft: "15:00",
            isAi: false,
          },
          currentMove: 0,
          blackWinRate: 0.5,
          spectatorsCount: 0,
          boardSize: Number(data.boardSize || 19),
        };
      });
      emit();
    },
    (err) => {
      console.warn("Lỗi lắng nghe rooms:", err);
      emit();
    }
  );

  return () => {
    unsubMatches();
    unsubRooms();
  };
}
