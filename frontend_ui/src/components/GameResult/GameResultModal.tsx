// src/components/GameResult/GameResultModal.tsx
// Modal hiển thị kết quả ván đấu khi kết thúc (đầu hàng, 2 pass, hoặc kết thúc từ BE).

import React from "react";
import "./GameResultModal.css";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface GameResultModalProps {
  /** Có hiển thị modal hay không */
  open: boolean;
  /** Bên thắng cuộc */
  winner: "black" | "white";
  /** Lý do kết thúc ván */
  reason: "resign" | "double-pass" | "end";
  /** Tổng điểm Đen */
  blackScore: number;
  /** Tổng điểm Trắng */
  whiteScore: number;
  /** Vùng đất Đen */
  blackTerritory: number;
  /** Vùng đất Trắng */
  whiteTerritory: number;
  /** Quân bắt được của Đen (= số quân Trắng bị bắt) */
  blackCaptures: number;
  /** Quân bắt được của Trắng (= số quân Đen bị bắt) */
  whiteCaptures: number;
  /** Số quân Đen đang trên bàn */
  blackStonesOnBoard: number;
  /** Số quân Trắng đang trên bàn */
  whiteStonesOnBoard: number;
  /** Điểm bù cho Trắng */
  komi: number;
  /** Callback khi bấm "Chơi lại" */
  onPlayAgain: () => void;
  /** Callback khi bấm "Về menu" */
  onBackToMenu: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Nhãn lý do kết thúc hiển thị cho người dùng */
const REASON_LABEL: Record<GameResultModalProps["reason"], string> = {
  resign: "Đầu hàng",
  "double-pass": "Hai lượt pass",
  end: "Kết thúc",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const GameResultModal: React.FC<GameResultModalProps> = ({
  open,
  winner,
  reason,
  blackScore,
  whiteScore,
  blackTerritory,
  whiteTerritory,
  blackCaptures,
  whiteCaptures,
  blackStonesOnBoard,
  whiteStonesOnBoard,
  komi,
  onPlayAgain,
  onBackToMenu,
}) => {
  if (!open) return null;

  const isBlackWin = winner === "black";

  return (
    <div className="game-result-overlay" role="dialog" aria-modal="true">
      <div className="game-result-modal">
        {/* ---- Tiêu đề ---- */}
        <div className="game-result-trophy">🏆</div>
        <h2
          className={`game-result-winner ${
            isBlackWin ? "game-result-winner--black" : "game-result-winner--white"
          }`}
        >
          {isBlackWin ? "Quân Đen thắng!" : "Quân Trắng thắng!"}
        </h2>
        <p className="game-result-reason">{REASON_LABEL[reason]}</p>

        {/* ---- Bảng điểm chi tiết ---- */}
        <table className="game-result-scores">
          <thead>
            <tr>
              <th />
              <th>⚫ Đen</th>
              <th>⚪ Trắng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vùng đất</td>
              <td>{blackTerritory}</td>
              <td>{whiteTerritory}</td>
            </tr>
            <tr>
              <td>Quân trên bàn</td>
              <td>{blackStonesOnBoard}</td>
              <td>{whiteStonesOnBoard}</td>
            </tr>
            <tr>
              <td>Quân bắt được</td>
              <td>{blackCaptures}</td>
              <td>{whiteCaptures}</td>
            </tr>
            <tr>
              <td>Komi</td>
              <td>—</td>
              <td>{komi}</td>
            </tr>
            <tr className="score-total">
              <td>Tổng điểm</td>
              <td>{blackScore}</td>
              <td>{whiteScore}</td>
            </tr>
          </tbody>
        </table>

        {/* ---- Nút hành động ---- */}
        <div className="game-result-actions">
          <button
            className="game-result-btn game-result-btn--primary"
            onClick={onPlayAgain}
            type="button"
          >
            ↻ Chơi lại
          </button>
          <button
            className="game-result-btn game-result-btn--secondary"
            onClick={onBackToMenu}
            type="button"
          >
            ← Về menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameResultModal;
