// src/components/Tsumego/TsumegoPractice.tsx
// Chế độ luyện tập Tsumego (Tử hoạt): tải 1 bài từ chuỗi SGF (AB/AW = thế cờ
// ban đầu, nhánh chính = lời giải), người dùng đặt quân, hệ thống đối chiếu
// với nước tiếp theo trong nhánh chính để chấm Đúng/Sai. Tái sử dụng nguyên
// vẹn component Board và hook useSgfLoader — không thêm logic luật cờ mới.
//
// Quy ước trạng thái:
//   'loading'  — đang parse SGF (đồng bộ nên gần như tức thời, giữ để mở rộng sau)
//   'solving'  — đang chờ người dùng đặt quân đúng lượt
//   'ai-move'  — vừa đúng, đang "delay" trước khi đối thủ (ghi trong SGF) đánh trả
//   'wrong'    — người dùng vừa đặt sai, hiện quân đó tạm thời + cảnh báo đỏ
//   'solved'   — đã đi hết nhánh chính, bài tập hoàn thành

import { useEffect, useRef, useState } from "react";
import { Board } from "../Board/Board";
import { useSgfLoader } from "../../hooks/useSgfLoader";
import { cloneBoard } from "../../utils/boardUtils";
import type { Position } from "../../types/go";
import type { TsumegoSgfPuzzle } from "../../types/training";
import "./TsumegoPractice.css";

export interface TsumegoPracticeProps {
  puzzle: TsumegoSgfPuzzle;
  /** Gọi khi người dùng giải xong — hữu ích để component cha chuyển sang bài tiếp theo */
  onSolved?: () => void;
}

type SolveStatus = "loading" | "solving" | "ai-move" | "wrong" | "solved";

const AI_RESPONSE_DELAY_MS = 500;

export function TsumegoPractice({ puzzle, onSolved }: TsumegoPracticeProps) {
  const { parsed, currentBoard, currentMoveIndex, loadFromText, goToMove, lastMovePosition } =
    useSgfLoader();

  const [status, setStatus] = useState<SolveStatus>("loading");
  const [wrongBoardOverlay, setWrongBoardOverlay] = useState<ReturnType<typeof cloneBoard> | null>(
    null
  );
  const [wrongPosition, setWrongPosition] = useState<Position | null>(null);
  const aiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Người chơi luôn là màu của nước đi đầu tiên trong nhánh chính — quy ước
  // chuẩn cho file SGF Tsumego (bên cần giải luôn đi trước).
  const playerColor = parsed?.moves[0]?.color ?? "black";

  // Tải lại bài mỗi khi prop `puzzle` đổi (vd: bấm "Bài tiếp theo" ở component cha)
  useEffect(() => {
    loadFromText(puzzle.sgf);
    setWrongBoardOverlay(null);
    setWrongPosition(null);
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle]);

  // Điều phối trạng thái mỗi khi tiến độ (currentMoveIndex) thay đổi: nếu đã
  // đi hết nhánh chính -> solved; nếu nước tiếp theo thuộc về "đối thủ" (màu
  // khác playerColor) -> tự động đánh trả sau 1 khoảng delay ngắn.
  useEffect(() => {
    if (!parsed) return;

    if (currentMoveIndex >= parsed.moves.length) {
      setStatus("solved");
      onSolved?.();
      return;
    }

    const nextExpected = parsed.moves[currentMoveIndex];
    if (nextExpected.color !== playerColor) {
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
  }, [parsed, currentMoveIndex, playerColor]);

  const handlePointClick = (pos: Position) => {
    if (status !== "solving" || !parsed || !currentBoard) return;
    if (currentBoard[pos.y][pos.x] !== "empty") return;

    const expected = parsed.moves[currentMoveIndex];
    const isCorrect =
      expected?.position !== null &&
      expected?.position?.x === pos.x &&
      expected?.position?.y === pos.y;

    if (isCorrect) {
      goToMove(currentMoveIndex + 1);
      return;
    }

    // Sai nhánh: hiện tạm quân vừa đặt (để người chơi thấy rõ mình vừa đánh
    // đâu) trên 1 board overlay riêng, KHÔNG đụng vào state thật của
    // useSgfLoader — nên "Thử lại" chỉ cần xoá overlay này, không cần undo gì cả.
    const overlay = cloneBoard(currentBoard);
    overlay[pos.y][pos.x] = playerColor;
    setWrongBoardOverlay(overlay);
    setWrongPosition(pos);
    setStatus("wrong");
  };

  const handleRetryAttempt = () => {
    setWrongBoardOverlay(null);
    setWrongPosition(null);
    setStatus("solving");
  };

  const handleRestartPuzzle = () => {
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    setWrongBoardOverlay(null);
    setWrongPosition(null);
    goToMove(0);
  };

  if (!parsed || !currentBoard) {
    return <div className="tsumego-practice tsumego-practice--loading">Đang tải bài tập…</div>;
  }

  const displayedBoard = wrongBoardOverlay ?? currentBoard;
  const displayedLastMove = status === "wrong" ? wrongPosition : lastMovePosition;

  return (
    <div className="tsumego-practice">
      <div className="tsumego-practice__board">
        <Board
          board={displayedBoard}
          boardSize={parsed.metadata.boardSize}
          onPointClick={handlePointClick}
          showHints={false}
          lastMove={displayedLastMove}
          disabled={status === "ai-move" || status === "wrong" || status === "solved"}
        />
      </div>

      <div className="tsumego-practice__panel">
        <div className="tsumego-practice__header">
          <h3 className="tsumego-practice__title">{puzzle.title}</h3>
          <span className={`tsumego-practice__difficulty tsumego-practice__difficulty--${puzzle.difficulty}`}>
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
          <span>{playerColor === "black" ? "Đen" : "Trắng"} đi trước</span>
        </div>

        <div className="tsumego-practice__status" aria-live="polite">
          {status === "solving" && <div className="status-box status-box--neutral">Đến lượt bạn đi.</div>}
          {status === "ai-move" && (
            <div className="status-box status-box--info">Đối thủ đang phản hồi…</div>
          )}
          {status === "wrong" && (
            <div className="status-box status-box--error">
              Nước đi sai! Đây không phải nước đi đúng trong lời giải.
            </div>
          )}
          {status === "solved" && (
            <div className="status-box status-box--success">Chính xác! Bạn đã giải xong bài tập.</div>
          )}
        </div>

        <div className="tsumego-practice__actions">
          {status === "wrong" && (
            <button className="btn btn--secondary" onClick={handleRetryAttempt}>
              Thử lại nước đi
            </button>
          )}
          <button className="btn btn--secondary" onClick={handleRestartPuzzle}>
            Chơi lại từ đầu
          </button>
        </div>
      </div>
    </div>
  );
}
