// src/types/mode.ts
// Định nghĩa các chế độ chơi hiển thị ở Menu chính. Tách riêng khỏi go.ts vì
// đây là khái niệm thuộc về "luồng ứng dụng" (app flow), không phải luật cờ.

/**
 * pvp-local  — 2 người chơi luân phiên trên cùng 1 thiết bị.
 * pvp-online — 2 người chơi qua mạng (cần Backend realtime — hiện chưa có,
 *              hiển thị "Sắp ra mắt" ở Menu).
 * pve        — Người (Đen) đấu với AI Engine (Trắng).
 * eve        — AI đấu với AI, dùng để quan sát/kiểm thử engine.
 * tsumego    — Luyện tập giải thế cờ (Tử hoạt) từ file SGF.
 */
export type GameMode = "pvp-local" | "pvp-online" | "pve" | "eve" | "tsumego";

export interface GameModeOption {
  id: GameMode;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  disabled?: boolean;
  badge?: string;
}
