// src/components/Auth/GoBoardBackdrop.tsx
// Nền trang trí cho các trang Đăng nhập / Đăng ký: một bàn cờ vây 19x19 vẽ
// bằng SVG (đường kẻ gỗ + sao điểm + vài quân cờ rải rác), phối màu theo
// đúng token của app (--color-board-*, --color-stone-*). Vẽ code, không
// dùng ảnh chụp — vừa nhẹ, vừa nhất quán bản sắc "phòng học cờ buổi tối"
// của toàn bộ sản phẩm.

const SIZE = 19;
const CELL = 40;
const PAD = 40;
const BOARD_PX = CELL * (SIZE - 1) + PAD * 2;
const HOSHI: [number, number][] = [
  [3, 3], [3, 9], [3, 15],
  [9, 3], [9, 9], [9, 15],
  [15, 3], [15, 9], [15, 15],
];

// Vài quân cờ "bối cảnh" — rải rác như một ván đấu dở dang, chỉ mang tính
// trang trí (mờ dần vào nền), không đại diện thế cờ thật.
const DECOR_STONES: { x: number; y: number; color: "black" | "white" }[] = [
  { x: 3, y: 3, color: "black" },
  { x: 4, y: 3, color: "white" },
  { x: 3, y: 4, color: "white" },
  { x: 9, y: 9, color: "black" },
  { x: 9, y: 10, color: "white" },
  { x: 10, y: 9, color: "black" },
  { x: 15, y: 15, color: "white" },
  { x: 14, y: 15, color: "black" },
  { x: 6, y: 13, color: "black" },
  { x: 13, y: 5, color: "white" },
  { x: 16, y: 6, color: "black" },
  { x: 2, y: 12, color: "white" },
];

export function GoBoardBackdrop() {
  return (
    <div className="auth-backdrop" aria-hidden="true">
      <svg
        className="auth-backdrop__board"
        viewBox={`0 0 ${BOARD_PX} ${BOARD_PX}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="authWoodGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-board-light)" />
            <stop offset="100%" stopColor="var(--color-board-dark)" />
          </linearGradient>
          <radialGradient id="authStoneBlack" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="var(--color-stone-black-1)" />
            <stop offset="100%" stopColor="var(--color-stone-black-2)" />
          </radialGradient>
          <radialGradient id="authStoneWhite" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="var(--color-stone-white-1)" />
            <stop offset="100%" stopColor="var(--color-stone-white-2)" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width={BOARD_PX} height={BOARD_PX} fill="url(#authWoodGrad)" />

        {Array.from({ length: SIZE }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={PAD + i * CELL}
            y1={PAD}
            x2={PAD + i * CELL}
            y2={PAD + (SIZE - 1) * CELL}
            stroke="var(--color-board-line)"
            strokeWidth={1.5}
          />
        ))}
        {Array.from({ length: SIZE }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={PAD}
            y1={PAD + i * CELL}
            x2={PAD + (SIZE - 1) * CELL}
            y2={PAD + i * CELL}
            stroke="var(--color-board-line)"
            strokeWidth={1.5}
          />
        ))}

        {HOSHI.map(([x, y]) => (
          <circle
            key={`hoshi-${x}-${y}`}
            cx={PAD + x * CELL}
            cy={PAD + y * CELL}
            r={4.5}
            fill="var(--color-board-line)"
          />
        ))}

        {DECOR_STONES.map((s, i) => (
          <circle
            key={i}
            cx={PAD + s.x * CELL}
            cy={PAD + s.y * CELL}
            r={CELL * 0.46}
            fill={s.color === "black" ? "url(#authStoneBlack)" : "url(#authStoneWhite)"}
            stroke={s.color === "white" ? "rgba(0,0,0,0.15)" : "none"}
          />
        ))}
      </svg>
      <div className="auth-backdrop__scrim" />
    </div>
  );
}
