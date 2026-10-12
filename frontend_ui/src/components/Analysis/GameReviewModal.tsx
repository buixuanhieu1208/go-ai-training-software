// src/components/Analysis/GameReviewModal.tsx
// Phân hệ Phân tích & Review Kỳ phổ (SGF Analysis & Full Game Review):
// 1. Biểu đồ Tỷ lệ thắng (Winrate Graph) qua từng nước đi.
// 2. Đánh giá chất lượng nước đi: 🟢 Tối ưu, 🟡 Bình thường, 🔴 Sai lầm (Blunder).
// 3. Gợi ý biến đổi (Variations) với chênh lệch mục (Score Lead) & xem trước trên bàn cờ.
// 4. Trích xuất bài tập Tsumego từ sai lầm ván đấu vào kho bài tập cá nhân.

import { useState, useEffect, useMemo, useCallback } from "react";
import type { BoardMatrix, BoardSize, Move, Position } from "../../types/go";
import type { GameReviewReport, TurnEvaluation, VariationLine, VariationStep } from "../../types/review";
import { reconstructBoardAtTurn, generateGameReviewReport, formatGoCoord } from "../../utils/reviewEvaluator";
import { extractPuzzlesFromGame } from "../../utils/puzzleExtractor";
import { savePersonalPuzzle } from "../../data/puzzles/allPuzzles";
import { Board } from "../Board/Board";
import { WinrateGraph } from "./WinrateGraph";
import { VariationViewer } from "./VariationViewer";
import { MoveHistory } from "../MoveHistory/MoveHistory";
import "./GameReviewModal.css";

export interface GameReviewModalProps {
  open: boolean;
  onClose: () => void;
  boardSize: BoardSize;
  moveHistory: Move[];
  playerBlackName?: string;
  playerWhiteName?: string;
  onGoToTsumego?: () => void;
}

export function GameReviewModal({
  open,
  onClose,
  boardSize,
  moveHistory,
  playerBlackName = "Quân Đen",
  playerWhiteName = "Quân Trắng",
  onGoToTsumego,
}: GameReviewModalProps) {
  const [report, setReport] = useState<GameReviewReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<number>(moveHistory.length);
  const [previewingVariation, setPreviewingVariation] = useState<VariationLine | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [extractedPuzzlesCount, setExtractedPuzzlesCount] = useState<number | null>(null);

  // Sinh báo cáo phân tích toàn ván cờ khi mở modal
  useEffect(() => {
    if (!open || moveHistory.length === 0) return;

    let isMounted = true;
    setIsLoading(true);
    setPreviewingVariation(null);
    setCurrentTurn(moveHistory.length);
    setExtractedPuzzlesCount(null);

    generateGameReviewReport(boardSize, moveHistory)
      .then((rep) => {
        if (isMounted) {
          setReport(rep);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Lỗi phân tích ván đấu:", err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [open, boardSize, moveHistory]);

  // Tự động phát từng nước đi nếu bật autoplay
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentTurn((prev) => {
        if (prev >= moveHistory.length) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [isPlaying, moveHistory.length]);

  // Bàn cờ tại thời điểm `currentTurn`
  const currentBoard = useMemo<BoardMatrix>(() => {
    return reconstructBoardAtTurn(boardSize, moveHistory, currentTurn);
  }, [boardSize, moveHistory, currentTurn]);

  // Quân cờ cuối cùng vừa đi tại `currentTurn`
  const lastMovePosition = useMemo<Position | null>(() => {
    if (currentTurn === 0 || currentTurn > moveHistory.length) return null;
    return moveHistory[currentTurn - 1]?.position ?? null;
  }, [currentTurn, moveHistory]);

  // Các bước biến thể xem trước (nếu có)
  const variationSteps = useMemo<VariationStep[]>(() => {
    if (!previewingVariation || previewingVariation.moves.length === 0) return [];
    const activeEval = report?.evaluations[currentTurn];
    const baseColor = activeEval?.move?.color ?? "black";

    return previewingVariation.moves.map((pos, sIdx) => {
      const stepColor =
        sIdx % 2 === 0
          ? baseColor
          : baseColor === "black"
          ? "white"
          : "black";
      return {
        position: pos,
        stepNumber: sIdx + 1,
        color: stepColor,
        coordText: formatGoCoord(pos, boardSize),
      };
    });
  }, [previewingVariation, report, currentTurn, boardSize]);

  // Đánh giá tại nước hiện tại
  const currentEval: TurnEvaluation = useMemo(() => {
    if (!report || !report.evaluations[currentTurn]) {
      return {
        turnIndex: currentTurn,
        move: currentTurn > 0 ? moveHistory[currentTurn - 1] : null,
        blackWinRate: 0.5,
        whiteWinRate: 0.5,
        scoreLead: 0,
        variations: [],
      };
    }
    return report.evaluations[currentTurn];
  }, [report, currentTurn, moveHistory]);

  // Xử lý chuyển đổi turn
  const handleSelectTurn = useCallback((turnIdx: number) => {
    const clamped = Math.max(0, Math.min(moveHistory.length, turnIdx));
    setCurrentTurn(clamped);
    setPreviewingVariation(null);
  }, [moveHistory.length]);

  // Xử lý trích xuất bài tập từ các sai lầm trong ván đấu
  const handleExtractPuzzles = useCallback(() => {
    const puzzles = extractPuzzlesFromGame(moveHistory, boardSize, "black");
    puzzles.forEach((p) => savePersonalPuzzle(p));
    setExtractedPuzzlesCount(puzzles.length);
  }, [moveHistory, boardSize]);

  if (!open) return null;

  return (
    <div className="game-review-overlay" role="dialog" aria-modal="true">
      <div className="game-review-modal">
        {/* ---- Header ---- */}
        <div className="game-review-header">
          <div className="game-review-header__left">
            <span className="game-review-logo">碁</span>
            <div>
              <h2 className="game-review-title">Phân tích &amp; Đánh giá Kỳ phổ AI</h2>
              <span className="game-review-subtitle">
                Đánh giá chất lượng nước đi, biểu đồ tỷ lệ thắng &amp; gợi ý biến đổi thế cờ
              </span>
            </div>
          </div>
          <button type="button" className="game-review-close-btn" onClick={onClose} title="Đóng">
            ✕
          </button>
        </div>

        {/* ---- Loading Indicator ---- */}
        {isLoading && (
          <div className="game-review-loading">
            <span className="game-review-spinner" />
            <span>AI đang phân tích từng nước đi trong ván đấu...</span>
          </div>
        )}

        {/* ---- Summary Banner ---- */}
        {report && (
          <div className="game-review-summary">
            {/* Quân Đen */}
            <div className="review-player-card review-player-card--black">
              <div className="review-player-card__top">
                <span className="dot dot--black" />
                <span className="review-player-name">{playerBlackName}</span>
                <span className="review-accuracy-badge">
                  Độ chính xác: <strong>{report.summary.black.accuracyPercent}%</strong>
                </span>
              </div>
              <div className="review-player-stats">
                <span className="stat-pill stat-pill--best">🟢 {report.summary.black.best} Tối ưu</span>
                <span className="stat-pill stat-pill--inaccuracy">🟡 {report.summary.black.inaccuracy} Chưa chuẩn</span>
                <span className="stat-pill stat-pill--blunder">🔴 {report.summary.black.blunder} Sai lầm</span>
              </div>
            </div>

            {/* Quân Trắng */}
            <div className="review-player-card review-player-card--white">
              <div className="review-player-card__top">
                <span className="dot dot--white" />
                <span className="review-player-name">{playerWhiteName}</span>
                <span className="review-accuracy-badge">
                  Độ chính xác: <strong>{report.summary.white.accuracyPercent}%</strong>
                </span>
              </div>
              <div className="review-player-stats">
                <span className="stat-pill stat-pill--best">🟢 {report.summary.white.best} Tối ưu</span>
                <span className="stat-pill stat-pill--inaccuracy">🟡 {report.summary.white.inaccuracy} Chưa chuẩn</span>
                <span className="stat-pill stat-pill--blunder">🔴 {report.summary.white.blunder} Sai lầm</span>
              </div>
            </div>
          </div>
        )}

        {/* ---- Nội dung chính 2 cột ---- */}
        <div className="game-review-body">
          {/* Cột trái: Bàn cờ & Bộ điều khiển tua nước */}
          <div className="game-review-board-col">
            <div className="game-review-board-wrap">
              <Board
                board={currentBoard}
                boardSize={boardSize}
                onPointClick={() => {}}
                lastMove={lastMovePosition}
                disabled
                variationSteps={variationSteps}
              />
            </div>

            {/* Stepper controls */}
            <div className="game-review-stepper">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => handleSelectTurn(0)}
                disabled={currentTurn === 0}
                title="Về đầu ván (Nước 0)"
              >
                |◀◀
              </button>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => handleSelectTurn(currentTurn - 1)}
                disabled={currentTurn === 0}
                title="Lùi 1 nước"
              >
                ◀
              </button>
              <button
                type="button"
                className="stepper-btn stepper-btn--play"
                onClick={() => setIsPlaying((p) => !p)}
                title={isPlaying ? "Tạm dừng" : "Tự động phát"}
              >
                {isPlaying ? "⏸ Dừng" : "▶ Phát"}
              </button>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => handleSelectTurn(currentTurn + 1)}
                disabled={currentTurn >= moveHistory.length}
                title="Tiến 1 nước"
              >
                ▶
              </button>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => handleSelectTurn(moveHistory.length)}
                disabled={currentTurn >= moveHistory.length}
                title="Đến cuối ván"
              >
                ▶▶|
              </button>

              <span className="stepper-counter">
                {currentTurn === 0 ? "Khởi đầu" : `Nước ${currentTurn} / ${moveHistory.length}`}
              </span>
            </div>
          </div>

          {/* Cột phải: Biểu đồ Winrate, Gợi ý biến đổi, và Danh sách nước đi */}
          <div className="game-review-info-col">
            {/* 1. Biểu đồ Winrate */}
            {report && (
              <div className="game-review-section">
                <div className="game-review-section__title">
                  📈 Biểu đồ Tỷ lệ thắng (Winrate Graph)
                </div>
                <WinrateGraph
                  evaluations={report.evaluations}
                  selectedTurn={currentTurn}
                  onSelectTurn={handleSelectTurn}
                  boardSize={boardSize}
                />
              </div>
            )}

            {/* 2. Gợi ý biến đổi (Variations) */}
            <div className="game-review-section">
              <div className="game-review-section__title">
                💡 Gợi ý Biến đổi &amp; Đánh giá nước đi (AI Variations)
              </div>
              <VariationViewer
                currentEvaluation={currentEval}
                boardSize={boardSize}
                previewingVariation={previewingVariation}
                onPreviewVariation={setPreviewingVariation}
              />
            </div>

            {/* 3. Trích xuất bài tập từ sai lầm */}
            <div className="game-review-extract-box">
              <button
                type="button"
                className={`game-review-extract-btn ${extractedPuzzlesCount !== null ? "game-review-extract-btn--done" : ""}`}
                onClick={handleExtractPuzzles}
              >
                {extractedPuzzlesCount !== null
                  ? `✓ Đã trích xuất ${extractedPuzzlesCount} bài tập cá nhân từ các tình huống mắc lỗi!`
                  : "🎯 Trích xuất bài tập Tsumego từ sai lầm trong ván đấu"}
              </button>
              {extractedPuzzlesCount !== null && onGoToTsumego && (
                <button
                  type="button"
                  className="game-review-goto-btn"
                  onClick={() => {
                    onClose();
                    onGoToTsumego();
                  }}
                >
                  Luyện tập bài vừa tạo ngay →
                </button>
              )}
            </div>

            {/* 4. Lịch sử nước đi gắn nhãn màu */}
            <div className="game-review-section game-review-section--history">
              <div className="game-review-section__title">
                📜 Lịch sử nước đi (Click để chuyển nước)
              </div>
              <div className="game-review-history-box">
                <MoveHistory
                  moves={moveHistory}
                  evaluations={report?.evaluations}
                  selectedTurn={currentTurn}
                  onSelectMove={handleSelectTurn}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
