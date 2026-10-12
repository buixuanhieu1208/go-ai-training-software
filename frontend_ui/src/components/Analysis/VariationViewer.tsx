// src/components/Analysis/VariationViewer.tsx
// Phân hệ Gợi ý biến đổi (Variations / Principal Variations):
// Hiển thị các chuỗi nước đi thay thế tối ưu mà AI đề xuất, ước tính chênh lệch mục (Score Lead),
// và cho phép người dùng xem trước các bước biến thể trực tiếp trên bàn cờ.

import { useState } from "react";
import type { TurnEvaluation, VariationLine } from "../../types/review";
import { formatGoCoord } from "../../utils/reviewEvaluator";
import "./VariationViewer.css";

export interface VariationViewerProps {
  currentEvaluation: TurnEvaluation;
  boardSize: number;
  previewingVariation: VariationLine | null;
  onPreviewVariation: (variation: VariationLine | null) => void;
}

export function VariationViewer({
  currentEvaluation,
  boardSize,
  previewingVariation,
  onPreviewVariation,
}: VariationViewerProps) {
  const { move, quality, deltaWinRate, variations, turnIndex } = currentEvaluation;
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);

  if (!move || variations.length === 0) {
    return (
      <div className="variation-viewer variation-viewer--empty">
        <div className="variation-viewer__empty-text">
          {turnIndex === 0
            ? "Thế cờ bắt đầu. Chọn một nước đi để xem gợi ý biến đổi của AI."
            : "Chưa có dữ liệu biến đổi cho nước đi này."}
        </div>
      </div>
    );
  }

  const actualCoord = formatGoCoord(move.position, boardSize as any);
  const activeVar = variations[selectedVariationIndex] ?? variations[0];

  return (
    <div className="variation-viewer">
      {/* So sánh nước thực tế vs nước tối ưu của AI */}
      <div className="variation-viewer__comparison">
        <div className="var-compare-col var-compare-col--actual">
          <span className="var-compare-label">Nước thực tế đã đi</span>
          <div className="var-compare-val">
            <span className={`dot dot--${move.color}`} />
            <strong>{actualCoord}</strong>
            <span className={`var-badge var-badge--${quality}`}>
              {quality === "best" && "🟢 Tối ưu"}
              {quality === "good" && "🟢 Tốt"}
              {quality === "inaccuracy" && "🟡 Chưa chuẩn"}
              {quality === "blunder" && "🔴 Sai lầm"}
            </span>
          </div>
          {deltaWinRate !== undefined && deltaWinRate < -0.02 && (
            <span className="var-compare-loss">
              {deltaWinRate <= -0.1 ? "Mất ưu thế lớn: " : "Tổn thất: "}
              {(deltaWinRate * 100).toFixed(1)}% winrate
            </span>
          )}
        </div>

        <div className="var-compare-divider">➔</div>

        <div className="var-compare-col var-compare-col--recommended">
          <span className="var-compare-label">AI khuyến nghị đi</span>
          <div className="var-compare-val">
            <span className={`dot dot--${move.color}`} />
            <strong className="var-highlight-coord">
              {activeVar.moveTexts[0] ?? "Pass"}
            </strong>
            <span className="var-badge var-badge--ai">AI Best</span>
          </div>
          <span className="var-compare-gain">
            Ước tính: {activeVar.scoreLead >= 0 ? `+${activeVar.scoreLead.toFixed(1)}` : activeVar.scoreLead.toFixed(1)} mục (Winrate {(activeVar.winrate * 100).toFixed(1)}%)
          </span>
        </div>
      </div>

      {/* Danh sách các nhánh biến thể (Variation tabs) */}
      <div className="variation-viewer__tabs">
        {variations.map((v, idx) => (
          <button
            key={v.rank}
            type="button"
            className={`var-tab-btn ${selectedVariationIndex === idx ? "var-tab-btn--active" : ""}`}
            onClick={() => {
              setSelectedVariationIndex(idx);
              if (previewingVariation) {
                onPreviewVariation(v);
              }
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Chi tiết chuỗi nước đi của nhánh biến thể */}
      <div className="variation-viewer__detail">
        <div className="var-seq-header">
          <span className="var-seq-title">Chuỗi nước đi tiếp theo (Sequence):</span>
          <button
            type="button"
            className={`var-preview-btn ${previewingVariation?.rank === activeVar.rank ? "var-preview-btn--active" : ""}`}
            onClick={() => {
              if (previewingVariation?.rank === activeVar.rank) {
                onPreviewVariation(null);
              } else {
                onPreviewVariation(activeVar);
              }
            }}
          >
            {previewingVariation?.rank === activeVar.rank
              ? "✕ Đóng xem biến thể"
              : "👁 Xem biến thể trên bàn cờ"}
          </button>
        </div>

        <div className="var-seq-list">
          {activeVar.moveTexts.map((mText, stepIdx) => {
            const stepColor =
              stepIdx % 2 === 0
                ? move.color
                : move.color === "black"
                ? "white"
                : "black";
            return (
              <span key={stepIdx} className="var-seq-item">
                <span className="var-seq-step">#{stepIdx + 1}</span>
                <span className={`dot dot--${stepColor}`} />
                <span className="var-seq-coord">{mText}</span>
              </span>
            );
          })}
        </div>

        {activeVar.comment && (
          <div className="var-seq-comment">
            💡 {activeVar.comment}
          </div>
        )}
      </div>
    </div>
  );
}
