// src/components/PlayerCard/PlayerCard.tsx
// Thẻ thông tin người chơi — đặt trên/dưới bàn cờ (kiểu chess.com/lichess).
// Hiển thị số quân đã bắt (dữ liệu này trước đây được tính trong
// useGameState nhưng chưa từng hiện ra UI) và viền sáng khi tới lượt.

import "./PlayerCard.css";

export interface PlayerCardProps {
  color: "black" | "white";
  label: string;
  capturedCount: number;
  isActive: boolean;
}

export function PlayerCard({ color, label, capturedCount, isActive }: PlayerCardProps) {
  return (
    <div className={`player-card player-card--${color} ${isActive ? "player-card--active" : ""}`}>
      <span className={`player-card__stone player-card__stone--${color}`} aria-hidden="true" />
      <div className="player-card__info">
        <span className="player-card__label">{label}</span>
        <span className="player-card__sub">{color === "black" ? "Quân Đen" : "Quân Trắng"}</span>
      </div>
      {isActive && <span className="player-card__turn-badge">Đang đi</span>}
      <div className="player-card__captures">
        <span className="player-card__captures-value">{capturedCount}</span>
        <span className="player-card__captures-label">bắt được</span>
      </div>
    </div>
  );
}
