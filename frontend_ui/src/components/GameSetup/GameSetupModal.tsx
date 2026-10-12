// src/components/GameSetup/GameSetupModal.tsx
// Modal chọn cấu hình trước khi bắt đầu ván đấu (Size bàn cờ, Độ khó AI, Chọn phe chơi).
// Tránh việc người chơi vừa bấm vào chế độ đã bị rơi ngay vào ván cờ.

import React, { useState } from "react";
import type { BoardSize } from "../../types/go";
import type { GameMode } from "../../types/mode";
import "./GameSetupModal.css";

export interface GameSetupModalProps {
  open: boolean;
  mode: GameMode;
  isGameStarted?: boolean;
  initialBoardSize?: BoardSize;
  initialDifficulty?: "easy" | "medium" | "hard";
  initialPlayerColor?: "black" | "white" | "random";
  initialRuleSet?: "chinese" | "japanese";
  onStartGame: (config: {
    boardSize: BoardSize;
    difficulty: "easy" | "medium" | "hard";
    playerColor: "black" | "white";
    ruleSet: "chinese" | "japanese";
  }) => void;
  onBackToMenu: () => void;
  onClose?: () => void;
  onApplyMidGame?: (config: {
    difficulty: "easy" | "medium" | "hard";
    ruleSet: "chinese" | "japanese";
  }) => void;
}

const BOARD_OPTIONS: { size: BoardSize; label: string; sub: string; desc: string }[] = [
  {
    size: 9,
    label: "9 × 9",
    sub: "Bàn nhỏ",
    desc: "Nhanh · 5-10 phút · Luyện góc & phản xạ",
  },
  {
    size: 13,
    label: "13 × 13",
    sub: "Trung bình",
    desc: "Chiến thuật · 15-20 phút · Cân bằng thế trận",
  },
  {
    size: 19,
    label: "19 × 19",
    sub: "Tiêu chuẩn",
    desc: "Chuẩn thi đấu · Toàn diện · Khai cuộc & trung tàn cuộc",
  },
];

const DIFFICULTY_OPTIONS: { id: "easy" | "medium" | "hard"; label: string; desc: string }[] = [
  {
    id: "easy",
    label: "Dễ",
    desc: "AI đánh nhẹ nhàng, phù hợp cho người mới làm quen",
  },
  {
    id: "medium",
    label: "Trung bình",
    desc: "Kỳ thủ phong trào, AI tính toán chiến thuật cơ bản",
  },
  {
    id: "hard",
    label: "Khó",
    desc: "KataGo & DualCNN, suy nghĩ sâu và tối ưu nước đi",
  },
];

const RULESET_OPTIONS: { id: "chinese" | "japanese"; label: string; komi: string; desc: string }[] = [
  {
    id: "chinese",
    label: "Luật Trung Quốc",
    komi: "Komi 7.5",
    desc: "Đếm diện tích (Area scoring): Đất trống + Quân sống trên bàn.",
  },
  {
    id: "japanese",
    label: "Luật Nhật Bản",
    komi: "Komi 6.5",
    desc: "Đếm mục (Territory scoring): Đất trống + Tù binh bắt được.",
  },
];

export const GameSetupModal: React.FC<GameSetupModalProps> = ({
  open,
  mode,
  isGameStarted = false,
  initialBoardSize = 19,
  initialDifficulty = "hard",
  initialPlayerColor = "black",
  initialRuleSet = "chinese",
  onStartGame,
  onBackToMenu,
  onClose,
  onApplyMidGame,
}) => {
  const [selectedSize, setSelectedSize] = useState<BoardSize>(initialBoardSize);
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "medium" | "hard">(initialDifficulty);
  const [selectedColor, setSelectedColor] = useState<"black" | "white" | "random">(initialPlayerColor);
  const [selectedRuleSet, setSelectedRuleSet] = useState<"chinese" | "japanese">(initialRuleSet);

  React.useEffect(() => {
    if (open) {
      setSelectedSize(initialBoardSize);
      setSelectedDifficulty(initialDifficulty);
      setSelectedColor(initialPlayerColor);
      setSelectedRuleSet(initialRuleSet);
    }
  }, [open, initialBoardSize, initialDifficulty, initialPlayerColor, initialRuleSet]);

  // Phím Esc để đóng modal và tiếp tục chơi (khi ván đấu đang diễn ra)
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const modeTitle =
    mode === "pve"
      ? "PvE — Đấu với AI"
      : mode === "eve"
      ? "EvE — AI vs AI"
      : "PvP — Cùng máy";

  const handleStart = () => {
    let resolvedColor: "black" | "white" = "black";
    if (selectedColor === "random") {
      resolvedColor = Math.random() < 0.5 ? "black" : "white";
    } else {
      resolvedColor = selectedColor;
    }

    onStartGame({
      boardSize: selectedSize,
      difficulty: selectedDifficulty,
      playerColor: resolvedColor,
      ruleSet: selectedRuleSet,
    });
  };

  const handleContinue = () => {
    if (onApplyMidGame) {
      onApplyMidGame({
        difficulty: selectedDifficulty,
        ruleSet: selectedRuleSet,
      });
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className="game-setup-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="setup-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) {
          onClose();
        }
      }}
    >
      <div className="game-setup-modal">
        {onClose && (
          <button
            type="button"
            className="game-setup__close-btn"
            onClick={onClose}
            title="Đóng và tiếp tục chơi (Esc)"
            aria-label="Đóng"
          >
            ✕
          </button>
        )}
        {/* Header */}
        <div className="game-setup__header">
          <div className="game-setup__badge">{modeTitle}</div>
          <h2 id="setup-modal-title" className="game-setup__title">Tùy chọn ván đấu</h2>
          <p className="game-setup__subtitle">
            {isGameStarted
              ? "Tùy chỉnh cấp độ AI hoặc luật thi đấu, hoặc bắt đầu một ván đấu mới."
              : "Thiết lập kích thước bàn cờ, cấp độ và bộ luật trước khi bắt đầu."}
          </p>
        </div>

        {/* Section 1: Board Size */}
        <div className="game-setup__section">
          <label className="game-setup__section-label">1. Kích thước bàn cờ</label>
          <div className="game-setup__cards-grid">
            {BOARD_OPTIONS.map((opt) => (
              <button
                key={opt.size}
                type="button"
                className={`game-setup__card ${selectedSize === opt.size ? "game-setup__card--active" : ""}`}
                onClick={() => setSelectedSize(opt.size)}
              >
                <div className="game-setup__card-main">{opt.label}</div>
                <div className="game-setup__card-sub">{opt.sub}</div>
                <div className="game-setup__card-desc">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: AI Difficulty (chỉ cho PvE và EvE) */}
        {(mode === "pve" || mode === "eve") && (
          <div className="game-setup__section">
            <label className="game-setup__section-label">2. Mức độ thử thách AI</label>
            <div className="game-setup__cards-grid">
              {DIFFICULTY_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`game-setup__card ${selectedDifficulty === opt.id ? "game-setup__card--active" : ""}`}
                  onClick={() => setSelectedDifficulty(opt.id)}
                >
                  <div className="game-setup__card-main">{opt.label}</div>
                  <div className="game-setup__card-desc">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Ruleset */}
        <div className="game-setup__section">
          <label className="game-setup__section-label">
            {mode === "pve" || mode === "eve" ? "3. Bộ luật thi đấu" : "2. Bộ luật thi đấu"}
          </label>
          <div className="game-setup__cards-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {RULESET_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`game-setup__card ${selectedRuleSet === opt.id ? "game-setup__card--active" : ""}`}
                onClick={() => setSelectedRuleSet(opt.id)}
              >
                <div className="game-setup__card-main">{opt.label}</div>
                <div className="game-setup__card-sub" style={{ color: "var(--color-accent-amber)" }}>{opt.komi}</div>
                <div className="game-setup__card-desc">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Section 4: Player Color (chỉ cho PvE) */}
        {mode === "pve" && (
          <div className="game-setup__section">
            <label className="game-setup__section-label">4. Chọn quân cờ của bạn</label>
            <div className="game-setup__color-row">
              <button
                type="button"
                className={`game-setup__color-btn ${selectedColor === "black" ? "game-setup__color-btn--active" : ""}`}
                onClick={() => setSelectedColor("black")}
              >
                <span className="game-setup__stone-dot game-setup__stone-dot--black" />
                <span>Quân Đen (Đi trước)</span>
              </button>
              <button
                type="button"
                className={`game-setup__color-btn ${selectedColor === "white" ? "game-setup__color-btn--active" : ""}`}
                onClick={() => setSelectedColor("white")}
              >
                <span className="game-setup__stone-dot game-setup__stone-dot--white" />
                <span>Quân Trắng ({selectedRuleSet === "chinese" ? "Komi +7.5" : "Komi +6.5"})</span>
              </button>
              <button
                type="button"
                className={`game-setup__color-btn ${selectedColor === "random" ? "game-setup__color-btn--active" : ""}`}
                onClick={() => setSelectedColor("random")}
              >
                <span className="game-setup__stone-dot game-setup__stone-dot--split" />
                <span>Ngẫu nhiên</span>
              </button>
            </div>
          </div>
        )}

        {/* Summary note */}
        <div className="game-setup__rules-note">
          Luật thi đấu: <strong>{selectedRuleSet === "chinese" ? "Luật Trung Quốc (Komi 7.5)" : "Luật Nhật Bản (Komi 6.5)"}</strong> · {selectedRuleSet === "chinese" ? "Tính điểm theo diện tích (Quân + Đất)." : "Tính điểm theo mục (Đất trống + Tù binh bắt được)."}
        </div>

        {/* Actions */}
        <div className="game-setup__actions">
          <button type="button" className="game-setup__btn-back" onClick={onBackToMenu}>
            ← Về Menu
          </button>
          {isGameStarted && (
            <button
              type="button"
              className="game-setup__btn-continue"
              onClick={handleContinue}
              title="Quay lại bàn cờ tiếp tục ván đấu"
            >
              ▶ Tiếp tục chơi
            </button>
          )}
          <button type="button" className="game-setup__btn-start" onClick={handleStart}>
            {isGameStarted ? "↻ Bắt đầu ván mới" : "Bắt đầu ván đấu"}
          </button>
        </div>
      </div>
    </div>
  );
};
