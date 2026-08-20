// src/components/SgfViewer/SgfViewer.tsx
// Component demo/độc lập minh hoạ cách dùng useSgfLoader: tải file .SGF,
// hiển thị lên Board có sẵn, và tua qua từng nước bằng nút hoặc thanh trượt.
// Có thể dùng trực tiếp cho tính năng "Xem lại ván đấu" hoặc làm nền cho
// màn hình "Tải đề Tsumego từ SGF" sau này.

import { useRef } from "react";
import { Board } from "../Board/Board";
import { useSgfLoader } from "../../hooks/useSgfLoader";
import "./SgfViewer.css";

export function SgfViewer() {
  const {
    parsed,
    currentBoard,
    currentMoveIndex,
    isLoading,
    error,
    loadFromFile,
    goToMove,
    nextMove,
    prevMove,
    lastMovePosition,
  } = useSgfLoader();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFromFile(file);
  };

  return (
    <div className="sgf-viewer">
      <div className="sgf-viewer__toolbar">
        <button className="btn btn--secondary" onClick={() => fileInputRef.current?.click()}>
          {isLoading ? "Đang đọc..." : "Tải file .SGF"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".sgf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {parsed && (
          <span className="sgf-viewer__meta">
            {parsed.metadata.playerBlack ?? "Đen"} vs {parsed.metadata.playerWhite ?? "Trắng"} ·{" "}
            {parsed.metadata.boardSize}×{parsed.metadata.boardSize}
            {parsed.metadata.result ? ` · Kết quả: ${parsed.metadata.result}` : ""}
          </span>
        )}
      </div>

      {error && <div className="sgf-viewer__error">{error}</div>}

      {parsed && currentBoard && (
        <>
          <Board
            board={currentBoard}
            boardSize={parsed.metadata.boardSize}
            onPointClick={() => {}}
            showHints={false}
            lastMove={lastMovePosition}
            disabled
          />

          <div className="sgf-viewer__controls">
            <button className="btn btn--secondary" onClick={prevMove} disabled={currentMoveIndex === 0}>
              ← Nước trước
            </button>
            <input
              type="range"
              min={0}
              max={parsed.moves.length}
              value={currentMoveIndex}
              onChange={(e) => goToMove(Number(e.target.value))}
              className="sgf-viewer__slider"
            />
            <button
              className="btn btn--secondary"
              onClick={nextMove}
              disabled={currentMoveIndex === parsed.moves.length}
            >
              Nước sau →
            </button>
            <span className="sgf-viewer__counter">
              {currentMoveIndex} / {parsed.moves.length}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
