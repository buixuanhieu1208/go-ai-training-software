// src/components/Layout/GameLayout.tsx
// Component Layout chính: chia màn hình thành 3 khu vực theo yêu cầu đề bài.
//   - Trái: Lịch sử nước đi
//   - Giữa: Bàn cờ (Board)
//   - Phải: Thanh Win-rate + Bảng điều khiển
// Đây là nơi "lắp ráp" các component con lại; không chứa logic luật cờ.

import type { ReactNode } from "react";
import "./GameLayout.css";

export interface GameLayoutProps {
  header: ReactNode;
  moveHistory: ReactNode;
  board: ReactNode;
  winRateBar: ReactNode;
  controlPanel: ReactNode;
}

export function GameLayout({ header, moveHistory, board, winRateBar, controlPanel }: GameLayoutProps) {
  return (
    <div className="game-layout">
      <header className="game-layout__header">{header}</header>

      <div className="game-layout__body">
        <aside className="game-layout__left">{moveHistory}</aside>

        <main className="game-layout__center">{board}</main>

        <aside className="game-layout__right">
          {winRateBar}
          {controlPanel}
        </aside>
      </div>
    </div>
  );
}
