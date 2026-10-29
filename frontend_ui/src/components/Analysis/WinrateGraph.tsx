// src/components/Analysis/WinrateGraph.tsx
// Biểu đồ Tỷ lệ thắng (Winrate Graph):
// Trực quan hóa biến động lợi thế giữa hai bên (Đen vs Trắng) qua từng nước đi.
// Cho phép click vào bất kỳ điểm nào trên biểu đồ để nhảy bàn cờ đến nước đi đó.
// Đánh dấu rõ các mốc: 🟢 Tối ưu, 🟡 Bình thường, 🔴 Sai lầm nghiêm trọng (Blunder).

import { useState, useRef, useMemo, type MouseEvent } from "react";
import type { TurnEvaluation } from "../../types/review";
import { formatGoCoord } from "../../utils/reviewEvaluator";
import "./WinrateGraph.css";

export interface WinrateGraphProps {
  evaluations: TurnEvaluation[];
  selectedTurn: number;
  onSelectTurn: (turnIndex: number) => void;
  boardSize?: number;
  height?: number;
}

export function WinrateGraph({
  evaluations,
  selectedTurn,
  onSelectTurn,
  boardSize = 19,
  height = 150,
}: WinrateGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTurn, setHoveredTurn] = useState<number | null>(null);

  const totalTurns = Math.max(1, evaluations.length - 1);
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 22;
  const paddingBottom = 26;
  const viewWidth = 600;
  const viewHeight = height;

  const graphWidth = viewWidth - paddingLeft - paddingRight;
  const graphHeight = viewHeight - paddingTop - paddingBottom;
  const midY = paddingTop + graphHeight / 2;

  // Tọa độ (x, y) cho từng turn
  const points = useMemo(() => {
    return evaluations.map((ev, idx) => {
      const x = paddingLeft + (idx / totalTurns) * graphWidth;
      // y = 0 ở trên đỉnh (100% Đen), y = graphHeight ở đáy (0% Đen / 100% Trắng)
      const y = paddingTop + (1.0 - ev.blackWinRate) * graphHeight;
      return { x, y, ev, idx };
    });
  }, [evaluations, totalTurns, graphWidth, graphHeight, paddingTop, paddingLeft]);

  // Đường Path chính cho Winrate curve
  const curvePath = useMemo(() => {
    if (points.length === 0) return "";
    return points.reduce((path, p, i) => `${path} ${i === 0 ? "M" : "L"} ${p.x.toFixed(1)},${p.y.toFixed(1)}`, "");
  }, [points]);

  // Vùng diện tích tô màu (Fill Area) giữa curve và đường 50%
  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    const firstX = points[0].x;
    const lastX = points[points.length - 1].x;
    return `${curvePath} L ${lastX.toFixed(1)},${midY.toFixed(1)} L ${firstX.toFixed(1)},${midY.toFixed(1)} Z`;
  }, [points, curvePath, midY]);

  // Tìm turn gần nhất khi click hoặc hover
  const getTurnFromMouse = (e: MouseEvent<HTMLDivElement>): number => {
    if (!containerRef.current) return selectedTurn;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (clickX - (paddingLeft / viewWidth) * rect.width) / ((graphWidth / viewWidth) * rect.width)));
    const turnIndex = Math.round(ratio * totalTurns);
    return Math.max(0, Math.min(evaluations.length - 1, turnIndex));
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const turn = getTurnFromMouse(e);
    onSelectTurn(turn);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const turn = getTurnFromMouse(e);
    setHoveredTurn(turn);
  };

  const handleMouseLeave = () => {
    setHoveredTurn(null);
  };

  const activeTurn = hoveredTurn !== null ? hoveredTurn : selectedTurn;
  const activeEval = evaluations[activeTurn] ?? evaluations[0];
  const activePoint = points[activeTurn] ?? points[0];

  return (
    <div
      className="winrate-graph-container"
      ref={containerRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        className="winrate-graph-svg"
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="winrateAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(62, 207, 142, 0.35)" />
            <stop offset="50%" stopColor="rgba(62, 207, 142, 0.05)" />
            <stop offset="100%" stopColor="rgba(235, 175, 76, 0.35)" />
          </linearGradient>
          <linearGradient id="winrateLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3ecf8e" />
            <stop offset="50%" stopColor="#62d8a5" />
            <stop offset="100%" stopColor="#e0a537" />
          </linearGradient>
        </defs>

        {/* Nền phân chia vùng Đen / Trắng */}
        <rect
          x={paddingLeft}
          y={paddingTop}
          width={graphWidth}
          height={graphHeight / 2}
          fill="rgba(10, 10, 10, 0.25)"
        />
        <rect
          x={paddingLeft}
          y={midY}
          width={graphWidth}
          height={graphHeight / 2}
          fill="rgba(255, 255, 255, 0.04)"
        />

        {/* Nhãn vùng ưu thế */}
        <text x={paddingLeft + 8} y={paddingTop + 14} className="winrate-bg-label winrate-bg-label--black">
          ▲ Đen ưu thế
        </text>
        <text x={paddingLeft + 8} y={paddingTop + graphHeight - 6} className="winrate-bg-label winrate-bg-label--white">
          ▼ Trắng ưu thế
        </text>

        {/* Trục hoành 50% (Cân bằng) */}
        <line
          x1={paddingLeft}
          y1={midY}
          x2={paddingLeft + graphWidth}
          y2={midY}
          className="winrate-axis-mid"
        />

        {/* Các mốc phần trăm trục tung */}
        <text x={paddingLeft - 6} y={paddingTop + 5} textAnchor="end" className="winrate-axis-text">
          100%
        </text>
        <text x={paddingLeft - 6} y={midY + 4} textAnchor="end" className="winrate-axis-text winrate-axis-text--mid">
          50%
        </text>
        <text x={paddingLeft - 6} y={paddingTop + graphHeight + 4} textAnchor="end" className="winrate-axis-text">
          0%
        </text>

        {/* Các mốc số nước đi trên trục hoành */}
        {totalTurns > 0 &&
          [0, 0.25, 0.5, 0.75, 1.0].map((ratio) => {
            const moveNum = Math.round(ratio * totalTurns);
            const x = paddingLeft + ratio * graphWidth;
            return (
              <text key={ratio} x={x} y={viewHeight - 8} textAnchor="middle" className="winrate-axis-text">
                {moveNum === 0 ? "Bắt đầu" : `#${moveNum}`}
              </text>
            );
          })}

        {/* Vùng diện tích Gradient */}
        <path d={areaPath} fill="url(#winrateAreaGrad)" />

        {/* Đường biểu diễn tỷ lệ thắng (Winrate Curve) */}
        <path d={curvePath} fill="none" stroke="url(#winrateLineGrad)" strokeWidth="2.5" />

        {/* Các chấm chất lượng nước đi */}
        {points.map((p) => {
          if (!p.ev.move) return null;
          const q = p.ev.quality;
          if (q === "blunder") {
            return (
              <g key={p.idx} className="winrate-node winrate-node--blunder">
                <circle cx={p.x} cy={p.y} r={5} className="winrate-node-pulse" />
                <circle cx={p.x} cy={p.y} r={4} className="winrate-dot winrate-dot--blunder" />
              </g>
            );
          }
          if (q === "inaccuracy") {
            return (
              <circle
                key={p.idx}
                cx={p.x}
                cy={p.y}
                r={2.5}
                className="winrate-dot winrate-dot--inaccuracy"
              />
            );
          }
          if (q === "best" && (p.idx % 5 === 0 || p.ev.deltaWinRate && p.ev.deltaWinRate > 0.05)) {
            return (
              <circle
                key={p.idx}
                cx={p.x}
                cy={p.y}
                r={2.5}
                className="winrate-dot winrate-dot--best"
              />
            );
          }
          return null;
        })}

        {/* Thanh con trỏ nước đi hiện tại (Selected Turn Marker) */}
        {activePoint && (
          <g className="winrate-cursor">
            <line
              x1={activePoint.x}
              y1={paddingTop}
              x2={activePoint.x}
              y2={paddingTop + graphHeight}
              className="winrate-cursor-line"
            />
            <circle cx={activePoint.x} cy={activePoint.y} r={5.5} className="winrate-cursor-outer" />
            <circle cx={activePoint.x} cy={activePoint.y} r={3} className="winrate-cursor-dot" />
          </g>
        )}
      </svg>

      {/* Tooltip hiển thị chi tiết thông số tại nước đang chọn / hover */}
      {activeEval && (
        <div className="winrate-tooltip">
          <div className="winrate-tooltip__header">
            <span className="winrate-tooltip__turn">
              {activeTurn === 0
                ? "Thế cờ xuất phát"
                : `Nước #${activeTurn}: ${activeEval.move?.color === "black" ? "Đen" : "Trắng"} (${formatGoCoord(activeEval.move?.position ?? null, boardSize as any)})`}
            </span>
            {activeEval.quality && activeTurn > 0 && (
              <span className={`winrate-tooltip__badge winrate-tooltip__badge--${activeEval.quality}`}>
                {activeEval.quality === "best" && "Tối ưu"}
                {activeEval.quality === "good" && "Tốt"}
                {activeEval.quality === "inaccuracy" && "Chưa tối ưu"}
                {activeEval.quality === "blunder" && "Sai lầm"}
              </span>
            )}
          </div>
          <div className="winrate-tooltip__body">
            <div className="winrate-tooltip__item">
              <span className="winrate-tooltip__label">Đen:</span>
              <strong className="winrate-tooltip__value winrate-tooltip__value--black">
                {(activeEval.blackWinRate * 100).toFixed(1)}%
              </strong>
            </div>
            <div className="winrate-tooltip__item">
              <span className="winrate-tooltip__label">Trắng:</span>
              <strong className="winrate-tooltip__value winrate-tooltip__value--white">
                {(activeEval.whiteWinRate * 100).toFixed(1)}%
              </strong>
            </div>
            <div className="winrate-tooltip__item">
              <span className="winrate-tooltip__label">Ước tính mục:</span>
              <strong className="winrate-tooltip__value">
                {activeEval.scoreLead >= 0
                  ? `Đen +${activeEval.scoreLead.toFixed(1)}`
                  : `Trắng +${Math.abs(activeEval.scoreLead).toFixed(1)}`}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
