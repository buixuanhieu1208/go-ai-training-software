// src/components/WinRateBar/WinRateBar.tsx
// Thanh Win-rate dọc — điểm nhấn thị giác chính bên cạnh bàn cờ.
// Thiết kế như 1 "viên đá" chẻ đôi đen/trắng, chiều cao mỗi phần tỉ lệ với
// % thắng, chuyển động mượt (CSS transition) mỗi khi blackWinRate đổi.

import "./WinRateBar.css";

export interface WinRateBarProps {
  /** Tỉ lệ thắng của Đen, 0..1 */
  blackWinRate: number;
  isThinking?: boolean;
}

export function WinRateBar({ blackWinRate, isThinking = false }: WinRateBarProps) {
  const blackPct = Math.round(blackWinRate * 100);
  const whitePct = 100 - blackPct;

  return (
    <div className="winrate">
      <div className="winrate__label">
        <span className="winrate__label-title">Win-rate</span>
        {isThinking && <span className="winrate__thinking">AI đang tính…</span>}
      </div>

      <div className="winrate__track" role="meter" aria-valuenow={blackPct} aria-valuemin={0} aria-valuemax={100}>
        <div className="winrate__segment winrate__segment--white" style={{ height: `${whitePct}%` }} />
        <div className="winrate__segment winrate__segment--black" style={{ height: `${blackPct}%` }} />
        <div className="winrate__divider" style={{ bottom: `${blackPct}%` }} />
      </div>

      <div className="winrate__readout">
        <div className="winrate__readout-row">
          <span className="dot dot--black" />
          <span>Đen {blackPct}%</span>
        </div>
        <div className="winrate__readout-row">
          <span className="dot dot--white" />
          <span>Trắng {whitePct}%</span>
        </div>
      </div>
    </div>
  );
}
