// src/components/Board/Board.tsx
// Component thuần hiển thị bàn cờ: vẽ lưới bằng SVG (dễ scale, dễ chấm chính
// xác giao điểm), vẽ quân cờ, và overlay các chấm gợi ý AI (policy_hints).
// Component này KHÔNG chứa logic luật cờ — chỉ nhận state & bắn sự kiện click,
// giúp dễ test và dễ thay UI board 2D -> 3D sau này nếu cần.

import { useMemo } from "react";
import type { BoardMatrix, BoardSize, Position } from "../../types/go";
import type { PolicyHint } from "../../types/ai";
import { STAR_POINTS } from "../../constants/board";
import "./Board.css";

export interface BoardProps {
  board: BoardMatrix;
  boardSize: BoardSize;
  onPointClick: (position: Position) => void;
  /** Gợi ý nước đi từ Policy Network — mỗi phần tử gồm toạ độ + độ tự tin (0..1) */
  policyHints?: PolicyHint[];
  showHints?: boolean;
  lastMove?: Position | null;
  disabled?: boolean;
}

const CELL = 32; // px, khoảng cách giữa 2 giao điểm
const PADDING = 24; // px, lề quanh bàn cờ

export function Board({
  board,
  boardSize,
  onPointClick,
  policyHints = [],
  showHints = true,
  lastMove = null,
  disabled = false,
}: BoardProps) {
  const size = PADDING * 2 + CELL * (boardSize - 1);
  const starPoints = STAR_POINTS[boardSize] ?? [];

  const hintMap = useMemo(() => {
    const map = new Map<string, PolicyHint>();
    policyHints.forEach((h) => map.set(`${h.position.x},${h.position.y}`, h));
    return map;
  }, [policyHints]);

  const toCoord = (i: number) => PADDING + i * CELL;

  return (
    <div className={`board-wrapper ${disabled ? "board-wrapper--disabled" : ""}`}>
      <svg
        className="board-svg"
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="grid"
        aria-label={`Bàn cờ vây ${boardSize}x${boardSize}`}
      >
        {/* Nền gỗ */}
        <rect x={0} y={0} width={size} height={size} className="board-bg" rx={8} />

        {/* Lưới kẻ */}
        {Array.from({ length: boardSize }).map((_, i) => (
          <g key={`line-${i}`}>
            <line
              x1={toCoord(i)}
              y1={toCoord(0)}
              x2={toCoord(i)}
              y2={toCoord(boardSize - 1)}
              className="board-line"
            />
            <line
              x1={toCoord(0)}
              y1={toCoord(i)}
              x2={toCoord(boardSize - 1)}
              y2={toCoord(i)}
              className="board-line"
            />
          </g>
        ))}

        {/* Chấm sao (hoshi) */}
        {starPoints.map(([sx, sy]) => (
          <circle
            key={`star-${sx}-${sy}`}
            cx={toCoord(sx)}
            cy={toCoord(sy)}
            r={3}
            className="board-star"
          />
        ))}

        {/* Quân cờ */}
        {board.map((row, y) =>
          row.map((stone, x) => {
            if (stone === "empty") return null;
            const isLast = lastMove?.x === x && lastMove?.y === y;
            return (
              <g key={`stone-${x}-${y}`}>
                <circle
                  cx={toCoord(x)}
                  cy={toCoord(y)}
                  r={CELL / 2 - 2}
                  className={`board-stone board-stone--${stone}`}
                />
                {isLast && (
                  <circle
                    cx={toCoord(x)}
                    cy={toCoord(y)}
                    r={4}
                    className={`board-stone-marker board-stone-marker--${stone}`}
                  />
                )}
              </g>
            );
          })
        )}

        {/* Chấm gợi ý AI (policy hints) — độ tự tin quy đổi ra độ đậm + kích thước */}
        {showHints &&
          board.map((row, y) =>
            row.map((stone, x) => {
              if (stone !== "empty") return null;
              const hint = hintMap.get(`${x},${y}`);
              if (!hint) return null;
              const radius = 6 + hint.confidence * 8;
              return (
                <circle
                  key={`hint-${x}-${y}`}
                  cx={toCoord(x)}
                  cy={toCoord(y)}
                  r={radius}
                  className="board-hint"
                  style={{ opacity: 0.35 + hint.confidence * 0.5 }}
                />
              );
            })
          )}

        {/* Vùng click — 1 rect trong suốt cho mỗi giao điểm, dễ bắt sự kiện hơn quân nhỏ */}
        {board.map((row, y) =>
          row.map((_, x) => (
            <rect
              key={`click-${x}-${y}`}
              x={toCoord(x) - CELL / 2}
              y={toCoord(y) - CELL / 2}
              width={CELL}
              height={CELL}
              fill="transparent"
              className="board-click-target"
              onClick={() => !disabled && onPointClick({ x, y })}
            />
          ))
        )}
      </svg>
    </div>
  );
}
