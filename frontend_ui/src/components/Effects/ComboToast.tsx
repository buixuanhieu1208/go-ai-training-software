// src/components/Effects/ComboToast.tsx
// Banner "Combo x N" hiện giữa màn hình khi 1 bên bắt quân nhiều lượt liên
// tiếp (không tính vào luật cờ — chỉ là hiệu ứng UI tạo cảm giác hào hứng).
// App.tsx chịu trách nhiệm đếm số lần bắt quân liên tiếp và tự xoá message
// sau một khoảng thời gian (xem comboCountRef trong App.tsx).

import "./ComboToast.css";

export interface ComboToastMessage {
  id: number;
  count: number;
  color: "black" | "white";
}

export interface ComboToastProps {
  message: ComboToastMessage | null;
}

export function ComboToast({ message }: ComboToastProps) {
  if (!message) return null;

  return (
    <div className="combo-toast-layer" aria-live="polite">
      <div key={message.id} className={`combo-toast combo-toast--${message.color}`}>
        <span className="combo-toast__label">Combo</span>
        <span className="combo-toast__count">×{message.count}</span>
      </div>
    </div>
  );
}
