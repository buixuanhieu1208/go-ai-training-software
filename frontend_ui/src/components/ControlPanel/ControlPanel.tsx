import "./ControlPanel.css";

export interface ControlPanelProps {
  currentPlayer: "black" | "white";
  onUndo: () => void;
  onPass: () => void;
  onResign: () => void;
  onReset: () => void;
  canUndo: boolean;
  isFinished: boolean;
  hintsEnabled: boolean;
  onToggleHints: (enabled: boolean) => void;
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
  /** Chỉ dùng ở chế độ EvE — cho phép tạm dừng/tiếp tục 2 AI tự đấu & tự bắt đầu lại sau 3s */
  autoplayControls?: {
    isPaused: boolean;
    onToggle: () => void;
    autoRestart?: boolean;
    onToggleAutoRestart?: () => void;
    countdown?: number | null;
  };
}

export function ControlPanel({
  currentPlayer,
  onUndo,
  onPass,
  onResign,
  onReset,
  canUndo,
  isFinished,
  hintsEnabled,
  onToggleHints,
  soundEnabled,
  onToggleSound,
  autoplayControls,
}: ControlPanelProps) {
  return (
    <div className="control-panel">
      <div className="control-panel__turn">
        <span className={`dot dot--${currentPlayer}`} />
        <span>
          {isFinished ? "Ván đấu đã kết thúc" : currentPlayer === "black" ? "Lượt Đen" : "Lượt Trắng"}
        </span>
      </div>

      {autoplayControls && (
        <div className="control-panel__eve-box">
          <button
            className="btn btn--secondary control-panel__autoplay-btn"
            onClick={autoplayControls.onToggle}
            disabled={isFinished}
          >
            {autoplayControls.isPaused ? "▶ Tiếp tục AI vs AI" : "⏸ Tạm dừng AI vs AI"}
          </button>

          {autoplayControls.onToggleAutoRestart && (
            <label className="control-panel__auto-restart-label">
              <input
                type="checkbox"
                checked={autoplayControls.autoRestart ?? true}
                onChange={autoplayControls.onToggleAutoRestart}
              />
              <span>Tự động bắt đầu lại sau 3s</span>
            </label>
          )}

          {isFinished && autoplayControls.countdown !== null && autoplayControls.countdown !== undefined && (
            <div className="control-panel__countdown-badge">
              ⏱ Bắt đầu ván mới sau <strong>{autoplayControls.countdown}s</strong>
            </div>
          )}
        </div>
      )}

      <div className="control-panel__actions">
        <button className="btn btn--secondary" onClick={onUndo} disabled={!canUndo || isFinished}>
          <span aria-hidden="true">↺</span> Đi lại
        </button>
        <button className="btn btn--secondary" onClick={onPass} disabled={isFinished}>
          <span aria-hidden="true">⏭</span> Bỏ lượt
        </button>
        {!isFinished ? (
          <button className="btn btn--danger" onClick={onResign} disabled={isFinished}>
            <span aria-hidden="true">🏳</span> Đầu hàng
          </button>
        ) : (
          <button 
            className="btn btn--secondary" 
            onClick={onReset} 
            style={{ backgroundColor: "#2e7d32", color: "white", borderColor: "transparent" }}
          >
            ↻ Chơi lại
          </button>
        )}
      </div>

      <div className="control-panel__toggles">
        <label className="toggle">
          <span className="toggle__switch">
            <input
              type="checkbox"
              checked={hintsEnabled}
              onChange={(e) => onToggleHints(e.target.checked)}
            />
            <span className="toggle__track" aria-hidden="true">
              <span className="toggle__thumb" />
            </span>
          </span>
          <span>Hiện gợi ý AI</span>
        </label>
        {hintsEnabled && (
          <div className="control-panel__legend">★ = nước đi tối ưu do AI đề xuất</div>
        )}
        <label className="toggle">
          <span className="toggle__switch">
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => onToggleSound(e.target.checked)}
            />
            <span className="toggle__track" aria-hidden="true">
              <span className="toggle__thumb" />
            </span>
          </span>
          <span>Âm thanh</span>
        </label>
      </div>
    </div>
  );
}