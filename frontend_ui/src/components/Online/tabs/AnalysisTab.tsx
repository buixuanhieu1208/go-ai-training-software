// src/components/Online/tabs/AnalysisTab.tsx
import type { Move } from "../../../types/go";
import "./AnalysisTab.css";

export function AnalysisTab({ moveHistory }: { moveHistory: Move[] }) {
  if (moveHistory.length === 0) {
    return <div className="analysis-tab__empty">Chọn 1 ván đấu đang diễn ra để xem lại từng nước đi tại đây.</div>;
  }
  return (
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
  );
}