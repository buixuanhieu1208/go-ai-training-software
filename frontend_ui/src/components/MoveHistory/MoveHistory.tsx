// src/components/MoveHistory/MoveHistory.tsx
// Danh sách lịch sử nước đi, cuộn dọc, tự động scroll xuống nước mới nhất.
// Đánh giá chất lượng nước đi với điểm màu trực quan:
// 🟢 Điểm Xanh: Nước tối ưu của AI
// 🟡 Điểm Vàng: Nước bình thường / chưa tối ưu
// 🔴 Điểm Đỏ: Nước sai lầm nghiêm trọng (Blunder)

import { useEffect, useMemo, useRef } from "react";
import type { Move } from "../../types/go";
import type { TurnEvaluation } from "../../types/review";
import { BOARD_COLUMN_LETTERS } from "../../constants/board";
import "./MoveHistory.css";

export interface MoveHistoryProps {
  moves: Move[];
  onExportSgf?: () => void;
  evaluations?: TurnEvaluation[];
  selectedTurn?: number;
  onSelectMove?: (turnIndex: number) => void;
}

const MISTAKE_LABEL: Record<string, string> = {
  atari: "Atari",
  dame: "Dame",
  blunder: "Blunder",
  slow_move: "Chậm",
  overplay: "Quá tay",
};

function formatPosition(move: Move): string {
  if (!move.position) return "Pass";
  return `${BOARD_COLUMN_LETTERS[move.position.x]}${move.position.y + 1}`;
}

export function MoveHistory({
  moves,
  onExportSgf,
  evaluations,
  selectedTurn,
  onSelectMove,
}: MoveHistoryProps) {
  const listRef = useRef<HTMLDivElement>(null);

  // Map tra cứu nhanh đánh giá theo move.index
  const evalByIndex = useMemo(
    () => new Map(evaluations?.map((ev) => [ev.turnIndex, ev]) ?? []),
    [evaluations]
  );

  useEffect(() => {
    if (selectedTurn === undefined) {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [moves.length, selectedTurn]);

  return (
    <div className="move-history">
      <div className="move-history__header">
        <div className="move-history__title">Lịch sử nước đi</div>
        {onExportSgf && moves.length > 0 && (
          <button
            type="button"
            className="move-history__export-btn"
            onClick={onExportSgf}
            title="Tải file kỳ phổ .SGF"
          >
            📥 Xuất SGF
          </button>
        )}
      </div>

      {evaluations && evaluations.length > 1 && (
        <div className="move-history__quality-legend">
          <span className="legend-item"><span className="legend-dot legend-dot--best" /> Tối ưu</span>
          <span className="legend-item"><span className="legend-dot legend-dot--inaccuracy" /> Chưa chuẩn</span>
          <span className="legend-item"><span className="legend-dot legend-dot--blunder" /> Sai lầm</span>
        </div>
      )}

      <div className="move-history__list" ref={listRef}>
        {moves.length === 0 && <div className="move-history__empty">Chưa có nước đi nào</div>}
        {moves.map((move) => {
          const ev = evalByIndex.get(move.index);
          const isSelected = selectedTurn === move.index;
          const quality = ev?.quality;

          return (
            <div
              key={move.index}
              className={`move-history__row ${isSelected ? "move-history__row--selected" : ""} ${onSelectMove ? "move-history__row--clickable" : ""}`}
              onClick={() => onSelectMove?.(move.index)}
              title={ev?.explanation ?? `Nước đi #${move.index}`}
            >
              <span className="move-history__index">{move.index}</span>
              <span className={`dot dot--${move.color}`} />
              <span className="move-history__pos">{formatPosition(move)}</span>

              {/* Điểm màu chất lượng nước đi */}
              {quality && (
                <span
                  className={`move-quality-dot move-quality-dot--${quality}`}
                  title={ev?.qualityLabel ?? quality}
                />
              )}

              {move.isCapture && <span className="move-history__capture">+{move.capturedCount}</span>}

              {move.mistakeTag && (
                <span className={`move-history__badge move-history__badge--${move.mistakeTag}`}>
                  {MISTAKE_LABEL[move.mistakeTag] ?? move.mistakeTag}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
