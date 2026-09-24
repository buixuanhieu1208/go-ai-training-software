
import React from "react";
import { type Board, BLACK, WHITE, EMPTY, BOARD_SIZE } from "../hooks/useGoGame";

interface GoBoardProps {
  board: Board;
  currentPlayer: number;
  isThinking: boolean;
  onCellClick: (row: number, col: number) => void;
}

const CELL_SIZE = 30;

export const GoBoard: React.FC<GoBoardProps> = ({
  board,
  currentPlayer,
  isThinking,
  onCellClick,
}) => {
  const boardPixelSize = CELL_SIZE * (BOARD_SIZE - 1);

  return (
    <div
      style={{
        position: "relative",
        width: boardPixelSize + CELL_SIZE,
        height: boardPixelSize + CELL_SIZE,
        backgroundColor: "#dcb35c",
        border: "2px solid #5c3a1e",
        margin: "20px auto",
        opacity: isThinking ? 0.7 : 1,
        pointerEvents: isThinking ? "none" : "auto",
      }}
    >
      {/* Grid lines */}
      <svg
        width={boardPixelSize + CELL_SIZE}
        height={boardPixelSize + CELL_SIZE}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {Array.from({ length: BOARD_SIZE }).map((_, i) => (
          <React.Fragment key={`line-${i}`}>
            <line
              x1={CELL_SIZE / 2}
              y1={CELL_SIZE / 2 + i * CELL_SIZE}
              x2={CELL_SIZE / 2 + boardPixelSize}
              y2={CELL_SIZE / 2 + i * CELL_SIZE}
              stroke="#5c3a1e"
              strokeWidth={1}
            />
            <line
              x1={CELL_SIZE / 2 + i * CELL_SIZE}
              y1={CELL_SIZE / 2}
              x2={CELL_SIZE / 2 + i * CELL_SIZE}
              y2={CELL_SIZE / 2 + boardPixelSize}
              stroke="#5c3a1e"
              strokeWidth={1}
            />
          </React.Fragment>
        ))}
      </svg>

      {/* Stones + click targets */}
      {board.map((rowArr, r) =>
        rowArr.map((cellValue, c) => (
          <div
            key={`${r}-${c}`}
            onClick={() => onCellClick(r, c)}
            style={{
              position: "absolute",
              top: r * CELL_SIZE,
              left: c * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: cellValue === EMPTY ? "pointer" : "default",
            }}
          >
            {cellValue !== EMPTY && (
              <div
                style={{
                  width: CELL_SIZE * 0.85,
                  height: CELL_SIZE * 0.85,
                  borderRadius: "50%",
                  backgroundColor: cellValue === BLACK ? "#111111" : "#f5f5f5",
                  border: cellValue === WHITE ? "1px solid #333" : "none",
                  boxShadow: "1px 1px 3px rgba(0,0,0,0.5)",
                }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};