// src/types/user.ts
export interface UserProfile {
  user_id: string;
  uid: string;              // alias của user_id, giữ tương thích code cũ (bạn bè, ghép trận...)
  username: string;         // duy nhất
  usernameLower: string;    // dùng để tìm kiếm không phân biệt hoa/thường
  email: string;
  photoURL: string | null;
  elo: number;
  wins: number;
  losses: number;
  draws: number;
  role: "PLAYER" | "ADMIN";
  status: "ACTIVE" | "LOCKED";
  friendsList: string[];
  created_at: unknown;      // Firestore Timestamp
}

export interface FriendRequest {
  id: string;
  fromUid: string;
  fromUsername: string;
  toUid: string;
  status: "pending" | "accepted" | "declined";
  createdAt: unknown;
}

export interface RecentOpponent {
  uid: string;
  username: string;
  photoURL: string | null;
  lastPlayedAt: unknown;
  result: "win" | "loss" | "draw";
}