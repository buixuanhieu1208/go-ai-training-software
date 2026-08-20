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
}: ControlPanelProps) {
  return (
    <div className="control-panel">
      <div className="control-panel__turn">
        <span className={`dot dot--${currentPlayer}`} />
        <span>
          {isFinished ? "Ván đấu đã kết thúc" : currentPlayer === "black" ? "Lượt Đen" : "Lượt Trắng"}
        </span>
      </div>

      <div className="control-panel__actions">
        <button className="btn btn--secondary" onClick={onUndo} disabled={!canUndo || isFinished}>
          Đi lại
        </button>
        <button className="btn btn--secondary" onClick={onPass} disabled={isFinished}>
          Bỏ lượt
        </button>
        {!isFinished ? (
          <button className="btn btn--danger" onClick={onResign} disabled={isFinished}>
            Đầu hàng
          </button>
        ) : (
          <button 
            className="btn btn--secondary" 
            onClick={onReset} 
            style={{ backgroundColor: "#2e7d32", color: "white", borderColor: "transparent" }}
          >
            Chơi lại
          </button>
        )}
      </div>

      <div className="control-panel__toggles">
        <label className="toggle">
          <input
            type="checkbox"
            checked={hintsEnabled}
            onChange={(e) => onToggleHints(e.target.checked)}
          />
          <span>Hiện gợi ý AI</span>
        </label>
        <label className="toggle">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => onToggleSound(e.target.checked)}
          />
          <span>Âm thanh</span>
        </label>
      </div>
    </div>
  );
}