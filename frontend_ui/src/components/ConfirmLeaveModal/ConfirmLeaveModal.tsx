// src/components/ConfirmLeaveModal/ConfirmLeaveModal.tsx
import { useEffect, useRef } from "react";
import "./ConfirmLeaveModal.css";

export interface ConfirmLeaveModalProps {
  open: boolean;
  title?: string;
  message?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmLeaveModal({
  open,
  title = "Rời khỏi ván đấu?",
  message = "Ván cờ hiện tại đang diễn ra. Nếu rời đi lúc này, tiến trình ván đấu sẽ không được lưu. Bạn có chắc chắn muốn rời đi?",
  confirmText = "Rời ván đấu",
  cancelText = "Tiếp tục chơi",
  isDanger = false,
  onConfirm,
  onCancel,
}: ConfirmLeaveModalProps) {
  const stayButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    // Tự động focus nút "Tiếp tục chơi" khi modal bật lên để nếu người chơi bấm Enter/Space sẽ không bị thoát nhầm
    const timer = setTimeout(() => {
      stayButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="confirm-leave-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-leave-title"
    >
      <div className="confirm-leave-modal">
        <div
          className={`confirm-leave__icon-badge ${
            isDanger ? "confirm-leave__icon-badge--danger" : ""
          }`}
          aria-hidden="true"
        >
          {isDanger ? "⚠️" : "✕"}
        </div>

        <h2 id="confirm-leave-title" className="confirm-leave__title">
          {title}
        </h2>

        <div className="confirm-leave__message">{message}</div>

        <div className="confirm-leave__actions">
          <button
            type="button"
            className={`confirm-leave__btn ${
              isDanger
                ? "confirm-leave__btn--leave-danger"
                : "confirm-leave__btn--leave"
            }`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>

          <button
            ref={stayButtonRef}
            type="button"
            className="confirm-leave__btn confirm-leave__btn--stay"
            onClick={onCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
