// src/components/Online/tabs/AnalysisTab.tsx
import { useState } from "react";
import type { Move } from "../../../types/go";
import { analyzeFullGame } from "../../../services/refereeApi";
import type { TurnAnalysis } from "../../../services/refereeApi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import "./AnalysisTab.css";

export function AnalysisTab({ moveHistory, boardSize }: { moveHistory: Move[], boardSize: number }) {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<{ turn: number; winrate: number; scoreLead: number }[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchGraph = async () => {
    if (moveHistory.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await analyzeFullGame(boardSize, moveHistory);
      const data = res.turns.map((t, idx) => ({
        turn: idx,
        winrate: t.valueEstimate.blackWinRate * 100, // Đưa về %
        scoreLead: t.valueEstimate.scoreLead
      }));
      setChartData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analysis-tab">
      <div className="analysis-tab__header">
        <h3 className="analysis-tab__title">Biểu đồ Tỷ lệ thắng (KataGo)</h3>
        <button
          className="analysis-tab__fetch-btn"
          onClick={handleFetchGraph}
          disabled={loading || moveHistory.length === 0}
        >
          {loading ? "Đang phân tích..." : "Phân tích ván đấu"}
        </button>
      </div>

      {error && <div className="analysis-tab__error">{error}</div>}

      <div className="analysis-tab__graph-container">
        {chartData ? (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWinrate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a1a1a" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f0ede4" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="turn" tick={{ fill: "var(--color-text-muted)", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: "var(--color-text-muted)", fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-panel-raised)", border: "1px solid var(--color-border)" }}
                itemStyle={{ color: "var(--color-text-primary)", fontSize: "12px" }}
                labelStyle={{ color: "var(--color-text-muted)", fontSize: "11px", marginBottom: "4px" }}
                formatter={(value: any) => [`${Number(value).toFixed(1)}%`, "Tỷ lệ thắng (Đen)"]}
                labelFormatter={(label) => `Nước ${label}`}
              />
              <ReferenceLine y={50} stroke="var(--color-accent-amber)" strokeDasharray="3 3" opacity={0.5} />
              <Area type="monotone" dataKey="winrate" stroke="#8884d8" fillOpacity={1} fill="url(#colorWinrate)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="analysis-tab__graph-placeholder">
            {moveHistory.length === 0 ? "Chưa có nước đi nào." : "Bấm nút phân tích để vẽ biểu đồ."}
          </div>
        )}
      </div>

      <div className="analysis-tab__move-list-header">Lịch sử nước đi</div>
      <div className="analysis-tab__move-list">
        {moveHistory.map((m, i) =>
          i % 2 === 0 ? (
            <div className="analysis-tab__move-row" key={m.index}>
              <span className="analysis-tab__move-no">{Math.floor(i / 2) + 1}.</span>
              <span className="analysis-tab__move-black">{m.position ? `(${m.position.x},${m.position.y})` : "Pass"}</span>
              <span className="analysis-tab__move-white">
                {moveHistory[i + 1]?.position ? `(${moveHistory[i + 1].position!.x},${moveHistory[i + 1].position!.y})` : moveHistory[i + 1] ? "Pass" : ""}
              </span>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}