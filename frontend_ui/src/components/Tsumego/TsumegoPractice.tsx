// src/components/Tsumego/TsumegoPractice.tsx
// Chế độ luyện tập Tsumego & Khai cuộc (Tử hoạt, Cướp cờ - Ko, Quan tử - Yose, Khai cuộc - Joseki):
// - Hỗ trợ nạp SGF đa kích thước (9x9, 13x13, 19x19).
// - Đối thủ máy tự động đáp trả (AI response theo chuỗi SGF khi đi đúng).
// - Phản hồi & Máy đối ứng: Tự động đi nước đáp trả khi người dùng chọn sai để minh họa lý do thất bại.
// - Hệ thống gợi ý phân tầng (AI Layered hints):
//    + Cấp 1: Khoanh vùng điểm nóng (Hotspot Box) trên bàn cờ
//    + Cấp 2: Định hướng tư duy / Ý đồ chiến thuật
//    + Cấp 3: Nước đi đáp án tối ưu
// - Đề xuất thích ứng thông minh (Adaptive Learning Engine): tự động đánh giá phong độ và đề xuất bài tiếp theo.

import { useEffect, useRef, useState, useMemo } from "react";
import { Board } from "../Board/Board";
import { useSgfLoader } from "../../hooks/useSgfLoader";
import type { Position } from "../../types/go";
import type { TsumegoSgfPuzzle, HotspotArea } from "../../types/training";
import { recordDailyPuzzleSolved } from "../../data/puzzles/dailyChallenge";
import { recordPuzzleAttempt } from "../../utils/adaptiveLearning";
import { computeNextBoard } from "../../utils/goRules";
import { BOARD_COLUMN_LETTERS } from "../../constants/board";
import "./TsumegoPractice.css";

export interface TsumegoPracticeProps {
  puzzle: TsumegoSgfPuzzle;
  /** Gọi khi người dùng giải xong */
  onSolved?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  /** Callback chuyển bài theo đề xuất AI thích ứng */
  onAdaptiveNext?: () => void;
  adaptiveReason?: string | null;
}

type SolveStatus = "loading" | "solving" | "ai-move" | "ai-countering" | "wrong" | "solved";

const AI_RESPONSE_DELAY_MS = 450;
const COUNTER_MOVE_DELAY_MS = 400;

export function TsumegoPractice({
  puzzle,
  onSolved,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
  onAdaptiveNext,
  adaptiveReason,
}: TsumegoPracticeProps) {
  const { parsed, currentBoard, currentMoveIndex, loadFromText, goToMove, lastMovePosition } =
    useSgfLoader();

  const [status, setStatus] = useState<SolveStatus>("loading");
  const [wrongBoardOverlay, setWrongBoardOverlay] = useState<ReturnType<typeof import("../../utils/boardUtils").cloneBoard> | null>(
    null
  );
  const [lastActionPosition, setLastActionPosition] = useState<Position | null>(null);
  const [refutationNote, setRefutationNote] = useState<string | null>(null);
  const [hintLevel, setHintLevel] = useState<number>(0); // 0: chưa xem, 1: khoanh vùng, 2: ý đồ, 3: đáp án
  const [adaptiveFeedback, setAdaptiveFeedback] = useState<string | null>(null);

  const aiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const attemptsRef = useRef<number>(0);

  // Người chơi luôn là màu của nước đi đầu tiên trong nhánh chính
  const playerColor = parsed?.moves[0]?.color ?? "black";
  const opponentColor = playerColor === "black" ? "white" : "black";

  // Tải lại bài mỗi khi prop `puzzle` đổi
  useEffect(() => {
    loadFromText(puzzle.sgf);
    setWrongBoardOverlay(null);
    setLastActionPosition(null);
    setRefutationNote(null);
    setHintLevel(0);
    setAdaptiveFeedback(null);
    startTimeRef.current = Date.now();
    attemptsRef.current = 0;
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle]);

  // Điều phối trạng thái khi currentMoveIndex thay đổi
  useEffect(() => {
    if (!parsed) return;

    if (currentMoveIndex >= parsed.moves.length && parsed.moves.length > 0) {
      setStatus("solved");
      recordDailyPuzzleSolved(puzzle.id);

      // Ghi nhận thành tích vào hồ sơ Adaptive Learning
      const durationSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
      const { recommendationReason } = recordPuzzleAttempt(
        puzzle,
        durationSeconds,
        attemptsRef.current,
        hintLevel
      );
      setAdaptiveFeedback(
        `⚡ Giải xong trong ${durationSeconds}s (${attemptsRef.current <= 1 ? "Chính xác lượt 1" : `${attemptsRef.current} lần thử`}) · ${recommendationReason}`
      );

      onSolved?.();
      return;
    }

    const nextExpected = parsed.moves[currentMoveIndex];
    if (nextExpected && nextExpected.color !== playerColor) {
      setStatus("ai-move");
      aiTimerRef.current = setTimeout(() => {
        goToMove(currentMoveIndex + 1);
      }, AI_RESPONSE_DELAY_MS);
      return () => {
        if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
      };
    }

    setStatus("solving");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsed, currentMoveIndex, playerColor, puzzle.id]);

  const currentExpectedMove = parsed?.moves[currentMoveIndex]?.position ?? null;

  // Tính toán vùng điểm nóng (Hotspot) cho AI Hint Cấp 1
  const hotspotArea: HotspotArea | null = useMemo(() => {
    if (puzzle.hotspotArea) return puzzle.hotspotArea;
    if (!currentExpectedMove || !parsed) return null;
    const bSize = parsed.metadata.boardSize;
    return {
      minX: Math.max(0, currentExpectedMove.x - 2),
      maxX: Math.min(bSize - 1, currentExpectedMove.x + 2),
      minY: Math.max(0, currentExpectedMove.y - 2),
      maxY: Math.min(bSize - 1, currentExpectedMove.y + 2),
    };
  }, [puzzle.hotspotArea, currentExpectedMove, parsed]);

  const handlePointClick = (pos: Position) => {
    if (status !== "solving" || !parsed || !currentBoard) return;
    if (currentBoard[pos.y][pos.x] !== "empty") return;

    attemptsRef.current += 1;
    const expected = parsed.moves[currentMoveIndex];
    const isCorrect =
      expected?.position !== null &&
      expected?.position?.x === pos.x &&
      expected?.position?.y === pos.y;

    if (isCorrect) {
      goToMove(currentMoveIndex + 1);
      return;
    }

    // Nước đi sai: Máy đối ứng tự động đi nước đáp trả minh họa lý do thất bại!
    try {
      // 1. Đặt quân của người chơi
      const playerResult = computeNextBoard(currentBoard, pos, playerColor);
      setWrongBoardOverlay(playerResult.board);
      setLastActionPosition(pos);
      setStatus("ai-countering");

      // 2. Máy đối ứng tính toán nước đòn phản công sau COUNTER_MOVE_DELAY_MS
      aiTimerRef.current = setTimeout(() => {
        let counterPos = expected?.position;

        // Nếu điểm tối ưu đã bị chiếm, tìm điểm chặn liền kề
        if (!counterPos || playerResult.board[counterPos.y][counterPos.x] !== "empty") {
          const neighbors = [
            { x: pos.x + 1, y: pos.y },
            { x: pos.x - 1, y: pos.y },
            { x: pos.x, y: pos.y + 1 },
            { x: pos.x, y: pos.y - 1 },
          ];
          counterPos = neighbors.find(
            (p) =>
              p.x >= 0 &&
              p.x < parsed.metadata.boardSize &&
              p.y >= 0 &&
              p.y < parsed.metadata.boardSize &&
              playerResult.board[p.y][p.x] === "empty"
          ) || null;
        }

        if (counterPos) {
          try {
            const counterResult = computeNextBoard(playerResult.board, counterPos, opponentColor);
            setWrongBoardOverlay(counterResult.board);
            setLastActionPosition(counterPos);
            const coordStr = `${BOARD_COLUMN_LETTERS[counterPos.x]}${counterPos.y + 1}`;
            setRefutationNote(
              `Máy đối ứng lập tức đáp trả tại ${coordStr} để phá cấu trúc mắt sống và chia cắt liên kết của bạn!`
            );
          } catch {
            setRefutationNote("Nước cờ chưa tối ưu. Đối thủ dễ dàng phong tỏa và tiêu diệt nhóm quân.");
          }
        } else {
          setRefutationNote("Nước đi sai hướng. Nhóm quân bị mất khí và không thể sống sót.");
        }

        setStatus("wrong");
      }, COUNTER_MOVE_DELAY_MS);
    } catch {
      setStatus("wrong");
      setRefutationNote("Nước đi không hợp lệ hoặc rơi vào thế cấm.");
    }
  };

  const handleRetryAttempt = () => {
    setWrongBoardOverlay(null);
    setLastActionPosition(null);
    setRefutationNote(null);
    setStatus("solving");
  };

  const handleRestartPuzzle = () => {
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    setWrongBoardOverlay(null);
    setLastActionPosition(null);
    setRefutationNote(null);
    setHintLevel(0);
    setAdaptiveFeedback(null);
    startTimeRef.current = Date.now();
    attemptsRef.current = 0;
    goToMove(0);
  };

  const handleRevealNextHint = () => {
    setHintLevel((prev) => Math.min(3, prev + 1));
  };

  if (!parsed || !currentBoard) {
    return <div className="tsumego-practice tsumego-practice--loading">Đang tải bài tập…</div>;
  }

  const displayedBoard = wrongBoardOverlay ?? currentBoard;
  const displayedLastMove =
    status === "wrong" || status === "ai-countering" ? lastActionPosition : lastMovePosition;

  return (
    <div className="tsumego-practice">
      <div className="tsumego-practice__board">
        <Board
          board={displayedBoard}
          boardSize={parsed.metadata.boardSize}
          onPointClick={handlePointClick}
          hotspotArea={hintLevel >= 1 && status !== "solved" ? hotspotArea : null}
          showHints={hintLevel >= 3 && currentExpectedMove !== null}
          policyHints={
            hintLevel >= 3 && currentExpectedMove
              ? [{ position: currentExpectedMove, confidence: 1, rank: 1 }]
              : undefined
          }
          lastMove={displayedLastMove}
          disabled={status === "ai-move" || status === "ai-countering" || status === "wrong" || status === "solved"}
        />
      </div>

      <div className="tsumego-practice__panel">
        <div className="tsumego-practice__header">
          <h3 className="tsumego-practice__title">{puzzle.title}</h3>
          <span className={`tsumego-practice__difficulty tsumego-practice__difficulty--${puzzle.difficulty}`}>
            {puzzle.rankGrade ? `${puzzle.rankGrade} · ` : ""}
            {puzzle.difficulty === "beginner"
              ? "Sơ cấp"
              : puzzle.difficulty === "intermediate"
              ? "Trung cấp"
              : "Nâng cao"}
          </span>
        </div>

        <p className="tsumego-practice__instruction">{puzzle.instruction}</p>

        <div className="tsumego-practice__turn">
          <span className={`dot dot--${playerColor}`} />
          <span>{playerColor === "black" ? "Quân Đen" : "Quân Trắng"} đi trước</span>
        </div>

        {/* Hộp trạng thái */}
        <div className="tsumego-practice__status" aria-live="polite">
          {status === "solving" && (
            <div className="status-box status-box--neutral">Đến lượt bạn đặt quân.</div>
          )}
          {status === "ai-move" && (
            <div className="status-box status-box--info">Đối thủ đang đáp trả theo thế trận…</div>
          )}
          {status === "ai-countering" && (
            <div className="status-box status-box--warning">
              Nước cờ chưa tối ưu. Máy đối ứng đang tính toán phản công…
            </div>
          )}
          {status === "wrong" && (
            <div className="status-box status-box--error">
              <div><strong>Nước đi thất bại!</strong></div>
              <div style={{ marginTop: 4, fontSize: '12px', opacity: 0.9 }}>
                {refutationNote || "Đối thủ đã khai thác điểm yếu để ngăn chặn ý đồ của bạn."}
              </div>
            </div>
          )}
          {status === "solved" && (
            <div className="status-box status-box--success">
              <div>Chính xác! Bạn đã hoàn thành bài tập này.</div>
              {adaptiveFeedback && (
                <div style={{ marginTop: 6, fontSize: "12px", color: "#bbf7d0", lineHeight: 1.4 }}>
                  {adaptiveFeedback}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Gợi ý phân tầng (AI Layered Hints) */}
        {status !== "solved" && (
          <div className="tsumego-practice__hints-section">
            {hintLevel >= 1 && (
              <div className="hint-card hint-card--lvl1">
                <strong>Gợi ý cấp 1 (Khoanh vùng điểm nóng):</strong>{" "}
                {puzzle.hints?.level1 || "Quan sát vùng viền vàng nhấp nháy trên bàn cờ."}
              </div>
            )}
            {hintLevel >= 2 && puzzle.hints?.level2 && (
              <div className="hint-card hint-card--lvl2">
                <strong>Gợi ý cấp 2 (Định hướng tư duy):</strong> {puzzle.hints.level2}
              </div>
            )}
            {hintLevel >= 3 && currentExpectedMove && (
              <div className="hint-card hint-card--lvl3">
                <strong>Gợi ý cấp 3 (Đáp án):</strong> Đã đánh dấu điểm sao tối ưu trên bàn cờ.
              </div>
            )}

            {hintLevel < 3 && (
              <button
                type="button"
                className="btn-hint"
                onClick={handleRevealNextHint}
              >
                {hintLevel === 0
                  ? "Xem gợi ý Cấp 1 (Khoanh vùng)"
                  : hintLevel === 1
                  ? "Xem gợi ý Cấp 2 (Hướng tư duy)"
                  : "Hiện đáp án chính xác trên bàn"}
              </button>
            )}
          </div>
        )}

        {/* Bình chú chiến thuật khi giải đúng */}
        {status === "solved" && puzzle.explanation && (
          <div className="tsumego-practice__explanation">
            <h4 className="explanation-title">Bình chú chiến thuật:</h4>
            <p className="explanation-text">{puzzle.explanation}</p>
          </div>
        )}

        {/* Các nút hành động */}
        <div className="tsumego-practice__actions">
          {status === "wrong" && (
            <button className="btn btn--primary" onClick={handleRetryAttempt}>
              ↺ Thử lại nước cờ
            </button>
          )}

          {status === "solved" && (
            <>
              {onAdaptiveNext ? (
                <button
                  className="btn btn--primary"
                  onClick={onAdaptiveNext}
                  title={adaptiveReason || "AI tự động chọn bài tập khớp thực lực tiếp theo"}
                >
                  Bài AI đề xuất tiếp theo
                </button>
              ) : (
                hasNext && onNext && (
                  <button className="btn btn--primary" onClick={onNext}>
                    Bài tiếp theo
                  </button>
                )
              )}
            </>
          )}

          <div className="action-row">
            {hasPrev && onPrev && (
              <button className="btn btn--secondary" onClick={onPrev}>
                Bài trước
              </button>
            )}
            <button className="btn btn--secondary" onClick={handleRestartPuzzle}>
              Bắt đầu lại
            </button>
            {hasNext && onNext && status !== "solved" && (
              <button className="btn btn--secondary" onClick={onNext}>
                Bỏ qua
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TsumegoPractice;
