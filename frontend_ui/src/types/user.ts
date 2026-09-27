// src/types/user.ts
export interface UserProfile {
  uid: string;
  username: string;          // duy nhất, dùng để tìm kiếm — mặc định = phần trước "@" của email Google
  email: string;
  photoURL: string | null;
  elo: number;
  friendsList: string[];     // mảng uid bạn bè
  createdAt: unknown;        // Firestore Timestamp
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