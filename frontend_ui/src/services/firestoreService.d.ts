// src/services/firestoreService.d.ts
// Khai báo kiểu thủ công cho firestoreService.js (file JS thuần) — giúp TS
// hiểu đúng signature từng hàm thay vì suy luận `any` qua allowJs, đồng thời
// đảm bảo TS luôn thấy ĐỦ danh sách export (tránh lỗi "no exported member"
// khi TS-inference-from-JS bị bỏ cuộc giữa chừng ở 1 số pattern JS phức tạp).

import type { BoardSize } from "../types/go";
import type { UserProfile, FriendRequest } from "../types/user";

interface PlayerInfoInput {
  uid: string;
  displayName?: string;
  username?: string;
  photoURL?: string | null;
  elo?: number | null;
}

// ---- Rooms ----
export function createRoom(hostUser: PlayerInfoInput, boardSize?: BoardSize): Promise<string>;
export function listenOpenRooms(boardSize: BoardSize, onChange: (rooms: any[]) => void): () => void;
export function listenRoom(roomId: string, onChange: (room: any | null) => void): () => void;
export function cancelRoom(roomId: string): Promise<void>;
export function joinRoom(roomId: string, guestUser: PlayerInfoInput): Promise<string>;

// ---- PvE ----
export function createPveMatch(user: PlayerInfoInput, boardSize?: BoardSize): Promise<string>;

// ---- Match state ----
export function submitMove(matchId: string, computedResult: any): Promise<void>;
export function setAiThinking(matchId: string, isThinking: boolean): Promise<void>;
export function resignMatch(matchId: string, resigningColor: "black" | "white"): Promise<void>;
export function getMatch(matchId: string): Promise<any | null>;

// ---- Users (Bước 1) ----
export function ensureUserProfile(firebaseUser: {
  uid: string;
  email: string | null;
  photoURL: string | null;
}): Promise<UserProfile>;
export function listenUserProfile(uid: string, onChange: (profile: UserProfile | null) => void): () => void;
export function updateUsername(uid: string, newUsername: string): Promise<void>;

// ---- Friends (Bước 2) ----
export function searchUsers(rawQuery: string, excludeUid: string): Promise<UserProfile[]>;
export function sendFriendRequest(
  fromUser: { uid: string; username: string; photoURL?: string | null },
  toUid: string
): Promise<void>;
export function listenIncomingFriendRequests(
  uid: string,
  onChange: (requests: FriendRequest[]) => void
): () => void;
export function acceptFriendRequest(request: FriendRequest): Promise<void>;
export function declineFriendRequest(requestId: string): Promise<void>;
export function listenFriendsProfiles(
  friendUids: string[],
  onChange: (profiles: UserProfile[]) => void
): () => void;

// ---- Quick match & mời đấu (Bước 3) ----
export function startQuickMatch(
  user: PlayerInfoInput,
  boardSize?: BoardSize
): Promise<{ matchId: string | null; roomId: string | null }>;
export function sendMatchInvite(
  fromUser: { uid: string; username: string; photoURL?: string | null },
  toUid: string,
  boardSize?: BoardSize
): Promise<void>;
export function listenIncomingMatchInvites(uid: string, onChange: (invites: any[]) => void): () => void;
export function acceptMatchInvite(invite: any, acceptingUser: PlayerInfoInput): Promise<string>;
export function declineMatchInvite(inviteId: string): Promise<void>;