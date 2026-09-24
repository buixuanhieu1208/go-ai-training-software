// src/components/Layout/GameLayout.tsx
// Component Layout chính: chia màn hình thành 3 khu vực theo yêu cầu đề bài.
//   - Trái: Lịch sử nước đi
//   - Giữa: Bàn cờ (Board)
//   - Phải: Thanh Win-rate + Bảng điều khiển
// Đây là nơi "lắp ráp" các component con lại; không chứa logic luật cờ.

import type { ReactNode } from "react";
import { GameBackdrop } from "./GameBackdrop";
import "./GameLayout.css";

export interface GameLayoutProps {
  header: ReactNode;
  moveHistory: ReactNode;
  board: ReactNode;
  winRateBar: ReactNode;
  controlPanel: ReactNode;
  /** Thẻ người chơi phía trên/dưới bàn cờ (kiểu lichess/chess.com) — không bắt buộc */
  topBar?: ReactNode;
  bottomBar?: ReactNode;
  /** Hũ đựng quân cờ (goke) hai bên bàn cờ — không bắt buộc, chỉ mang tính trang trí */
  leftBowl?: ReactNode;
  rightBowl?: ReactNode;
}

export function GameLayout({
  header,
  moveHistory,
  board,
  winRateBar,
  controlPanel,
  topBar,
  bottomBar,
  leftBowl,
  rightBowl,
}: GameLayoutProps) {
  return (
    <div className="game-layout">
      <GameBackdrop />

      <header className="game-layout__header">{header}</header>

      <div className="game-layout__body">
        <aside className="game-layout__left">{moveHistory}</aside>

        <main className="game-layout__center">
          <div className="game-layout__board-row">
            {leftBowl}
            <div className="game-layout__board-col">
              {topBar}
              {board}
              {bottomBar}
            </div>
            {rightBowl}
          </div>
        </main>

        <aside className="game-layout__right">
          {winRateBar}
          {controlPanel}
        </aside>
      </div>
    </div>
  );
}
