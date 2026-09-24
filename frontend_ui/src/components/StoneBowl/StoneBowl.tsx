// src/components/StoneBowl/StoneBowl.tsx
// "Hũ đựng quân" (goke) đặt hai bên bàn cờ — chi tiết trang trí truyền
// thống của bàn cờ vây thật, nơi người chơi bốc quân ra đặt. Hiện tại là
// trang trí + hiển thị số quân còn lại trong hũ (ước tính theo số nước đã
// đi của từng màu); chưa nối vào thao tác đặt quân thật (đặt quân vẫn thực
// hiện bằng cách bấm lên giao điểm trên bàn, như trước).

import { useState } from "react";
import "./StoneBowl.css";

export interface StoneBowlProps {
  color: "black" | "white";
  /** Số quân ước tính còn lại trong hũ */
  remaining: number;
  /** Tổng số quân ban đầu trong hũ, dùng để tính % vơi dần */
  total: number;
  label: string;
  side: "left" | "right";
}

// Vị trí quân cờ trong hũ — cố định (không random mỗi lần render) để tạo
// hình ảnh "một nắm quân đổ vào hũ" tự nhiên nhưng ổn định giữa các lần vẽ.
const PILE_LAYOUT: { x: number; y: number; r: number; rot: number }[] = [
  { x: 50, y: 54, r: 15, rot: 0 },
  { x: 34, y: 48, r: 14, rot: 12 },
  { x: 66, y: 47, r: 14, rot: -10 },
  { x: 42, y: 62, r: 14, rot: -6 },
  { x: 58, y: 63, r: 14, rot: 8 },
  { x: 28, y: 60, r: 13, rot: 18 },
  { x: 72, y: 59, r: 13, rot: -16 },
  { x: 50, y: 38, r: 13, rot: 4 },
  { x: 38, y: 35, r: 12, rot: -8 },
  { x: 62, y: 36, r: 12, rot: 10 },
  { x: 46, y: 70, r: 12, rot: 3 },
  { x: 20, y: 50, r: 11, rot: 22 },
];

export function StoneBowl({ color, remaining, total, label, side }: StoneBowlProps) {
  const [poked, setPoked] = useState(false);
  const fillRatio = Math.max(0, Math.min(1, remaining / total));
  // Vơi dần: hũ càng vơi thì càng ít quân hiển thị trong đống (tối đa 12).
  const visibleStones = Math.max(2, Math.round(fillRatio * PILE_LAYOUT.length));

  return (
    <div className={`stone-bowl stone-bowl--${side}`}>
      <button
        type="button"
        className={`stone-bowl__pot ${poked ? "stone-bowl__pot--poked" : ""}`}
        onAnimationEnd={() => setPoked(false)}
        onClick={() => setPoked(true)}
        aria-label={`Hũ đựng ${label.toLowerCase()}`}
        title={`${label} — còn khoảng ${remaining} quân`}
      >
        <svg viewBox="0 0 120 90" className="stone-bowl__svg">
          <defs>
            <radialGradient id={`bowlWood-${side}`} cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#6b4a2c" />
              <stop offset="100%" stopColor="#3c2716" />
            </radialGradient>
            <linearGradient id={`bowlRim-${side}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8a6136" />
              <stop offset="100%" stopColor="#5a3c22" />
            </linearGradient>
            <radialGradient id={`bowlInner-${side}`} cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#241608" />
              <stop offset="100%" stopColor="#100a04" />
            </radialGradient>
            <radialGradient id={`stoneBlackBowl-${side}`} cx="35%" cy="28%" r="75%">
              <stop offset="0%" stopColor="var(--color-stone-black-1)" />
              <stop offset="100%" stopColor="var(--color-stone-black-2)" />
            </radialGradient>
            <radialGradient id={`stoneWhiteBowl-${side}`} cx="35%" cy="28%" r="75%">
              <stop offset="0%" stopColor="var(--color-stone-white-1)" />
              <stop offset="100%" stopColor="var(--color-stone-white-2)" />
            </radialGradient>
          </defs>

          {/* Đế + thân hũ gỗ */}
          <ellipse cx="60" cy="78" rx="40" ry="8" fill="#150d05" opacity="0.55" />
          <path
            d="M14 40 Q14 78 60 80 Q106 78 106 40 L104 34 Q60 46 16 34 Z"
            fill={`url(#bowlWood-${side})`}
          />
          {/* Miệng hũ (vành) */}
          <ellipse cx="60" cy="33" rx="46" ry="13" fill={`url(#bowlRim-${side})`} />
          <ellipse cx="60" cy="33" rx="38" ry="9.5" fill={`url(#bowlInner-${side})`} />

          {/* Đống quân trong hũ */}
          <g>
            {PILE_LAYOUT.slice(0, visibleStones).map((s, i) => (
              <ellipse
                key={i}
                cx={16 + (s.x / 100) * 88}
                cy={22 + (s.y / 100) * 20}
                rx={s.r * 0.11 * 10}
                ry={s.r * 0.085 * 10}
                fill={color === "black" ? `url(#stoneBlackBowl-${side})` : `url(#stoneWhiteBowl-${side})`}
                stroke={color === "white" ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.4)"}
                strokeWidth="0.6"
                transform={`rotate(${s.rot} ${16 + (s.x / 100) * 88} ${22 + (s.y / 100) * 20})`}
                opacity={0.97}
              />
            ))}
          </g>
        </svg>
      </button>
      <div className="stone-bowl__caption">
        <span className={`dot dot--${color}`} />
        <span className="stone-bowl__label">{label}</span>
        <span className="stone-bowl__count">{remaining} quân</span>
      </div>
    </div>
  );
}
