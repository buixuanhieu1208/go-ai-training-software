// src/components/Board/Board.tsx
// Component thuần hiển thị bàn cờ: vẽ lưới bằng SVG (dễ scale, dễ chấm chính
// xác giao điểm), vẽ quân cờ, và overlay các chấm gợi ý AI (policy_hints).
// Component này KHÔNG chứa logic luật cờ — chỉ nhận state & bắn sự kiện click,
// giúp dễ test và dễ thay UI board 2D -> 3D sau này nếu cần.

import { useMemo } from "react";
import type { BoardMatrix, BoardSize, FloatingScoreEffect, Position } from "../../types/go";
import type { PolicyHint } from "../../types/ai";
import { STAR_POINTS, BOARD_COLUMN_LETTERS } from "../../constants/board";
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
  /** Hiệu ứng "+N điểm" nổi lên khi bắt quân — xem FloatingScoreEffect (types/go.ts) */
  floatingScores?: FloatingScoreEffect[];
}

const CELL = 32; // px, khoảng cách giữa 2 giao điểm
const PADDING = 40; // px, lề quanh bàn cờ — đủ chỗ cho toạ độ chữ/số

export function Board({
  board,
  boardSize,
  onPointClick,
  policyHints = [],
  showHints = true,
  lastMove = null,
  disabled = false,
  floatingScores = [],
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
        {/* Gradient bo tròn cho quân cờ trông có chiều sâu hơn thay vì màu phẳng */}
        <defs>
          <radialGradient id="stoneBlackGrad" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#5c5c59" />
            <stop offset="55%" stopColor="#232320" />
            <stop offset="100%" stopColor="#0a0a09" />
          </radialGradient>
          <radialGradient id="stoneWhiteGrad" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#ece6d8" />
            <stop offset="100%" stopColor="#c9c2ac" />
          </radialGradient>
        </defs>

        {/* Nền gỗ */}
        <rect x={0} y={0} width={size} height={size} className="board-bg" rx={8} />

        {/* Toạ độ: chữ cái dưới đáy, số bên trái — đúng quy ước bàn cờ vây thật */}
        {Array.from({ length: boardSize }).map((_, i) => (
          <text
            key={`col-label-${i}`}
            x={toCoord(i)}
            y={toCoord(boardSize - 1) + 22}
            textAnchor="middle"
            className="board-coord-label"
          >
            {BOARD_COLUMN_LETTERS[i]}
          </text>
        ))}
        {Array.from({ length: boardSize }).map((_, i) => (
          <text
            key={`row-label-${i}`}
            x={toCoord(0) - 20}
            y={toCoord(i)}
            textAnchor="end"
            dominantBaseline="central"
            className="board-coord-label"
          >
            {i + 1}
          </text>
        ))}

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

        {/* Chấm gợi ý AI (policy hints) — độ tự tin quy đổi ra độ đậm + kích thước.
            Gợi ý rank 1 (nước đi tối ưu) được làm nổi bật riêng bằng viền vàng
            nhấp nháy + dấu sao, để phân biệt với các gợi ý phụ khác. */}
        {showHints &&
          board.map((row, y) =>
            row.map((stone, x) => {
              if (stone !== "empty") return null;
              const hint = hintMap.get(`${x},${y}`);
              if (!hint) return null;
              const isBest = hint.rank === 1;
              const radius = 6 + hint.confidence * 8;
              return (
                <g key={`hint-${x}-${y}`}>
                  {isBest && (
                    <circle
                      cx={toCoord(x)}
                      cy={toCoord(y)}
                      r={radius + 4}
                      className="board-hint__best-ring"
                    />
                  )}
                  <circle
                    cx={toCoord(x)}
                    cy={toCoord(y)}
                    r={radius}
                    className={`board-hint ${isBest ? "board-hint--best" : ""}`}
                    style={{ opacity: 0.35 + hint.confidence * 0.5 }}
                  />
                  {isBest && (
                    <text x={toCoord(x)} y={toCoord(y) + 4} textAnchor="middle" className="board-hint__star">
                      ★
                    </text>
                  )}
                  <title>
                    {isBest ? "Nước đi tối ưu (AI đề xuất)" : `Gợi ý #${hint.rank ?? "?"}`} —{" "}
                    {Math.round(hint.confidence * 100)}%
                  </title>
                </g>
              );
            })
          )}

        {/* Hiệu ứng "+N" nổi lên & mờ dần khi vừa bắt quân */}
        {floatingScores.map((f) => (
          <text
            key={f.id}
            x={toCoord(f.x)}
            y={toCoord(f.y)}
            textAnchor="middle"
            className={`board-floating-score board-floating-score--${f.color}`}
          >
            +{f.value}
          </text>
        ))}

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
