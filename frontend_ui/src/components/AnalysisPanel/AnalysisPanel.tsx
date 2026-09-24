// src/components/AnalysisPanel/AnalysisPanel.tsx
import "./AnalysisPanel.css";
import type { AnalyzeGameResult } from "../../services/refereeApi";

export interface AnalysisPanelProps {
  result: AnalyzeGameResult | null;
  isLoading: boolean;
  error: string | null;
  onAnalyze: () => void;
  disabled?: boolean;
}

const MISTAKE_LABEL: Record<string, string> = {
  atari: "Atari",
  dame: "Dame",
  blunder: "Blunder",
  slow_move: "Nước chậm",
  overplay: "Quá tay",
};

export function AnalysisPanel({ result, isLoading, error, onAnalyze, disabled }: AnalysisPanelProps) {
  return (
    <div className="analysis-panel">
      <div className="analysis-panel__header">
        <span className="analysis-panel__title">Trọng tài phân tích ván đấu</span>
        <button
          className="btn btn--secondary analysis-panel__btn"
          onClick={onAnalyze}
          disabled={disabled || isLoading}
        >
          {isLoading ? "Đang phân tích…" : "Phân tích ván đấu"}
        </button>
      </div>

      {error && <div className="analysis-panel__error">{error}</div>}

      {!error && !result && !isLoading && (
        <div className="analysis-panel__empty">
          Nhấn "Phân tích ván đấu" để gọi backend tính điểm lãnh thổ, quân ăn được và combo.
        </div>
      )}

      {result && (
        <div className="analysis-panel__body">
          <div className="analysis-panel__score">
            <div className="analysis-panel__score-col">
              <span className="dot dot--black" />
              <span className="analysis-panel__score-value">{result.score.blackScore.toFixed(1)}</span>
              <span className="analysis-panel__score-label">
                Lãnh thổ {result.score.blackTerritory} · Ăn {result.capturedWhite}
              </span>
            </div>
            <div className="analysis-panel__score-vs">–</div>
            <div className="analysis-panel__score-col">
              <span className="dot dot--white" />
              <span className="analysis-panel__score-value">{result.score.whiteScore.toFixed(1)}</span>
              <span className="analysis-panel__score-label">
                Lãnh thổ {result.score.whiteTerritory} · Ăn {result.capturedBlack}
              </span>
            </div>
          </div>

          {result.winner && (
            <div className="analysis-panel__winner">
              {result.winner === "black" ? "Đen" : "Trắng"} thắng {result.winMargin?.toFixed(1)} điểm
            </div>
          )}

          <div className="analysis-panel__section">
            <div className="analysis-panel__section-title">Điểm combo liên tiếp</div>
            <div className="analysis-panel__combo-row">
              <span className="dot dot--black" />
              <span>
                +{result.combo.black.totalComboBonus} điểm (chuỗi dài nhất: {result.combo.black.bestStreak} nước)
              </span>
            </div>
            <div className="analysis-panel__combo-row">
              <span className="dot dot--white" />
              <span>
                +{result.combo.white.totalComboBonus} điểm (chuỗi dài nhất: {result.combo.white.bestStreak} nước)
              </span>
            </div>
          </div>

          {result.mistakeStats.length > 0 && (
            <div className="analysis-panel__section">
              <div className="analysis-panel__section-title">Thống kê lỗi</div>
              <div className="analysis-panel__mistakes">
                {result.mistakeStats.map((m) => (
                  <span key={m.tag} className={`analysis-panel__mistake-badge analysis-panel__mistake-badge--${m.tag}`}>
                    {MISTAKE_LABEL[m.tag] ?? m.tag}: {m.count}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}