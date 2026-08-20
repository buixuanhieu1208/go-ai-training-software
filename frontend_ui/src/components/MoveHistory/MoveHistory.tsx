// src/components/MoveHistory/MoveHistory.tsx
// Danh sách lịch sử nước đi, cuộn dọc, tự động scroll xuống nước mới nhất.
// mistakeTag (nếu có) được AI Engine gắn nhãn -> hiển thị badge màu cảnh báo,
// phục vụ tính năng "thống kê lỗi sai" (Atari, Dame...) ở màn hình phân tích.

import { useEffect, useRef } from "react";
import type { Move } from "../../types/go";
import "./MoveHistory.css";

export interface MoveHistoryProps {
  moves: Move[];
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
  const columns = "ABCDEFGHJKLMNOPQRST"; // bỏ chữ "I" theo quy ước cờ vây
  return `${columns[move.position.x]}${move.position.y + 1}`;
}

export function MoveHistory({ moves }: MoveHistoryProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [moves.length]);

  return (
    <div className="move-history">
      <div className="move-history__title">Lịch sử nước đi</div>
      <div className="move-history__list" ref={listRef}>
        {moves.length === 0 && <div className="move-history__empty">Chưa có nước đi nào</div>}
        {moves.map((move) => (
          <div key={move.index} className="move-history__row">
            <span className="move-history__index">{move.index}</span>
            <span className={`dot dot--${move.color}`} />
            <span className="move-history__pos">{formatPosition(move)}</span>
            {move.isCapture && <span className="move-history__capture">+{move.capturedCount}</span>}
            {move.mistakeTag && (
              <span className={`move-history__badge move-history__badge--${move.mistakeTag}`}>
                {MISTAKE_LABEL[move.mistakeTag]}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
