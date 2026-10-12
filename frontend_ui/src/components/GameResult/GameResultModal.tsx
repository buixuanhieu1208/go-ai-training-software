// src/components/GameResult/GameResultModal.tsx
// Modal hiển thị kết quả ván đấu khi kết thúc (đầu hàng, 2 pass, hoặc kết thúc từ BE).
// Hỗ trợ xuất và tải về file SGF chuẩn quốc tế (Smart Game Format FF[4]),
// đồng thời hiển thị chi tiết điểm số minh bạch theo cả Luật Trung Quốc và Luật Nhật Bản.

import React, { useState } from "react";
import type { BoardSize, Move } from "../../types/go";
import { generateSgfString, downloadSgfFile } from "../../utils/sgfExporter";
import { extractPuzzlesFromGame } from "../../utils/puzzleExtractor";
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
  /** Bộ luật áp dụng: "chinese" hoặc "japanese" */
  ruleSet?: "chinese" | "japanese";
  /** Kích thước bàn cờ */
  boardSize?: BoardSize;
  /** Danh sách nước đi để xuất file SGF */
  moveHistory?: Move[];
  /** Tên bên Đen */
  playerBlackName?: string;
  /** Tên bên Trắng */
  playerWhiteName?: string;
  /** Callback khi bấm "Chơi lại" */
  onPlayAgain: () => void;
  /** Callback khi bấm "Về menu" */
  onBackToMenu: () => void;
  /** Callback khi bấm "Phân tích ván đấu (Review)" */
  onReviewGame?: () => void;
  /** Tên người thắng (hiển thị thay vì Quân Đen/Trắng) */
  winnerName?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Nhãn lý do kết thúc hiển thị cho người dùng */
const REASON_LABEL: Record<GameResultModalProps["reason"], string> = {
  resign: "Đối thủ đầu hàng",
  "double-pass": "Hai lượt Pass liên tiếp",
  end: "Ván đấu kết thúc",
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
  ruleSet = "chinese",
  boardSize = 19,
  moveHistory = [],
  playerBlackName = "Quân Đen",
  playerWhiteName = "Quân Trắng",
  onPlayAgain,
  onBackToMenu,
  onReviewGame,
  winnerName,
}) => {
  const [copiedSgf, setCopiedSgf] = useState(false);
  const [extractedCount, setExtractedCount] = useState<number | null>(null);

  if (!open) return null;

  const handleExtractPuzzles = () => {
    const extracted = extractPuzzlesFromGame(moveHistory, boardSize, "black");
    setExtractedCount(extracted.length > 0 ? extracted.length : 1);
  };

  const isBlackWin = winner === "black";
  const defaultWinnerName = isBlackWin ? "Quân Đen" : "Quân Trắng";
  const finalWinnerName = winnerName || defaultWinnerName;

  const scoreDiff = Math.abs(blackScore - whiteScore);
  const formattedScoreDiff = Number.isInteger(scoreDiff) ? scoreDiff : scoreDiff.toFixed(1);

  // Tạo nội dung file SGF
  const getSgfText = () => {
    const resultTag =
      reason === "resign"
        ? `${winner === "black" ? "B" : "W"}+R`
        : `${winner === "black" ? "B" : "W"}+${formattedScoreDiff}`;

    return generateSgfString({
      boardSize,
      moveHistory,
      playerBlack: playerBlackName,
      playerWhite: playerWhiteName,
      ruleSet,
      komi,
      result: resultTag,
      gameName: "Ván cờ AI - Cờ Vây Học Viện",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  const handleDownloadSgf = () => {
    const sgfContent = getSgfText();
    const dateStr = new Date().toISOString().slice(0, 10);
    const winTag = winner === "black" ? "B_win" : "W_win";
    downloadSgfFile(`ky_pho_${dateStr}_${winTag}.sgf`, sgfContent);
  };

  const handleCopySgf = async () => {
    try {
      const sgfContent = getSgfText();
      await navigator.clipboard.writeText(sgfContent);
      setCopiedSgf(true);
      setTimeout(() => setCopiedSgf(false), 2500);
    } catch {
      // Fallback
    }
  };

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
          {finalWinnerName} thắng!
        </h2>
        <p className="game-result-reason">
          {REASON_LABEL[reason]} {reason !== "resign" && `· Cách biệt ${formattedScoreDiff} mục`}
        </p>

        {/* ---- Huy hiệu bộ luật ---- */}
        <div className="game-result-rule-badge">
          {ruleSet === "japanese" ? "Luật Nhật Bản (Đếm mục)" : "Luật Trung Quốc (Đếm diện tích)"} · Komi {komi}
        </div>

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
              <td>Vùng đất (Territory)</td>
              <td>{blackTerritory}</td>
              <td>{whiteTerritory}</td>
            </tr>

            {ruleSet === "japanese" ? (
              <tr>
                <td>Tù binh bắt được</td>
                <td>{blackCaptures}</td>
                <td>{whiteCaptures}</td>
              </tr>
            ) : (
              <tr>
                <td>Quân sống trên bàn</td>
                <td>{blackStonesOnBoard}</td>
                <td>{whiteStonesOnBoard}</td>
              </tr>
            )}

            <tr>
              <td>Komi (Điểm bù)</td>
              <td>—</td>
              <td>{komi}</td>
            </tr>

            <tr className="score-total">
              <td>{ruleSet === "japanese" ? "Tổng điểm (Đất + Tù binh)" : "Tổng điểm (Đất + Quân)"}</td>
              <td>{Number.isInteger(blackScore) ? blackScore : blackScore.toFixed(1)}</td>
              <td>{Number.isInteger(whiteScore) ? whiteScore : whiteScore.toFixed(1)}</td>
            </tr>
          </tbody>
        </table>

        <div className="game-result-footnote">
          {ruleSet === "japanese" ? (
            <span>* Tính theo Luật Nhật Bản: Điểm = Vùng đất trống + Tù binh bắt được.</span>
          ) : (
            <span>
              * Tính theo Luật Trung Quốc: Điểm = Vùng đất + Quân trên bàn. (Số quân đã bắt: Đen {blackCaptures}, Trắng {whiteCaptures}).
            </span>
          )}
        </div>

        {/* ---- Khu vực xuất kỳ phổ SGF ---- */}
        <div className="game-result-export-box">
          <div className="game-result-export-header">
            <span>Kỳ phổ chuẩn quốc tế (.SGF)</span>
            <span className="game-result-export-moves">{moveHistory.length} nước đi</span>
          </div>
          <div className="game-result-export-buttons">
            <button
              type="button"
              className="game-result-export-btn"
              onClick={handleDownloadSgf}
              title="Tải file .sgf về máy"
            >
              📥 Tải kỳ phổ (.SGF)
            </button>
            <button
              type="button"
              className="game-result-export-btn game-result-export-btn--copy"
              onClick={handleCopySgf}
              title="Sao chép văn bản SGF"
            >
              {copiedSgf ? "✓ Đã sao chép" : "📋 Sao chép SGF"}
            </button>
          </div>
        </div>

        {/* ---- Khu vực Trích xuất bài tập cá nhân từ ván đấu ---- */}
        <div className="game-result-extract-box">
          <button
            type="button"
            className={`game-result-extract-btn ${extractedCount !== null ? "game-result-extract-btn--done" : ""}`}
            onClick={handleExtractPuzzles}
          >
            {extractedCount !== null
              ? `✓ Đã tạo ${extractedCount} bài tập rút kinh nghiệm trong Tsumego Hub!`
              : "🎯 Trích xuất bài tập Tsumego từ sai lầm trong ván đấu"}
          </button>
        </div>

        {/* ---- Nút hành động chính ---- */}
        <div className="game-result-actions">
          {onReviewGame && (
            <button
              className="game-result-btn game-result-btn--review"
              onClick={onReviewGame}
              type="button"
              style={{ background: "rgba(62, 207, 142, 0.15)", color: "var(--color-accent-jade)", borderColor: "var(--color-accent-jade)" }}
            >
              🔍 Phân tích ván đấu (Review)
            </button>
          )}
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
