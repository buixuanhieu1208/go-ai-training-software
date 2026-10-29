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
  /** Có phải trận đấu với AI không */
  isAiMatch?: boolean;
  /** Độ khó AI: "easy" | "medium" | "hard" */
  aiDifficulty?: "easy" | "medium" | "hard";
  /** Callback khi bấm "Xem Bảng Xếp Hạng" */
  onViewLeaderboard?: () => void;
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
  isAiMatch = false,
  aiDifficulty,
  onViewLeaderboard,
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
        <div className="game-result-trophy">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-amber)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
            <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
        </div>
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
              <th>Quân Đen</th>
              <th>Quân Trắng</th>
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
              Tải kỳ phổ (.SGF)
            </button>
            <button
              type="button"
              className="game-result-export-btn game-result-export-btn--copy"
              onClick={handleCopySgf}
              title="Sao chép văn bản SGF"
            >
              {copiedSgf ? "Đã sao chép" : "Sao chép SGF"}
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
              ? `Đã tạo ${extractedCount} bài tập rút kinh nghiệm trong Tsumego Hub!`
              : "Trích xuất bài tập Tsumego từ sai lầm trong ván đấu"}
          </button>
        </div>

        {/* ---- Banner vinh danh diệt AI ---- */}
        {isAiMatch && winnerName === "Bạn" && (
          <div
            className="game-result-ai-victory-banner"
            style={{
              background: "linear-gradient(135deg, rgba(234, 179, 8, 0.16) 0%, rgba(245, 158, 11, 0.06) 100%)",
              border: "1px solid rgba(234, 179, 8, 0.4)",
              borderRadius: "12px",
              padding: "14px 16px",
              margin: "12px 0 16px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(234, 179, 8, 0.2)",
                  color: "#f59e0b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
                  <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#facc15" }}>
                  Chiến tích đã được lưu vào Bảng Xếp Hạng!
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-text-subtle)", marginTop: "2px" }}>
                  Thắng AI chế độ {boardSize}×{boardSize} ({aiDifficulty === "hard" ? "Khó" : aiDifficulty === "medium" ? "Trung bình" : "Dễ"}).
                </div>
              </div>
            </div>
            {onViewLeaderboard && (
              <button
                type="button"
                onClick={onViewLeaderboard}
                style={{
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: 600,
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)",
                  color: "#0f172a",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Xem Bảng Xếp Hạng
              </button>
            )}
          </div>
        )}

        {/* ---- Nút hành động chính ---- */}
        <div className="game-result-actions">
          {onViewLeaderboard && (
            <button
              className="game-result-btn game-result-btn--leaderboard"
              onClick={onViewLeaderboard}
              type="button"
              style={{
                background: "rgba(234, 179, 8, 0.15)",
                color: "#facc15",
                borderColor: "rgba(234, 179, 8, 0.4)",
              }}
            >
              Bảng xếp hạng
            </button>
          )}
          {onReviewGame && (
            <button
              className="game-result-btn game-result-btn--review"
              onClick={onReviewGame}
              type="button"
              style={{ background: "rgba(62, 207, 142, 0.15)", color: "var(--color-accent-jade)", borderColor: "var(--color-accent-jade)" }}
            >
              Phân tích ván đấu
            </button>
          )}
          <button
            className="game-result-btn game-result-btn--primary"
            onClick={onPlayAgain}
            type="button"
          >
            Chơi lại
          </button>
          <button
            className="game-result-btn game-result-btn--secondary"
            onClick={onBackToMenu}
            type="button"
          >
            Về menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameResultModal;
