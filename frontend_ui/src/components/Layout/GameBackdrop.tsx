// src/components/Layout/GameBackdrop.tsx
// Nền trang trí phía sau toàn bộ màn hình chơi (PvP/PvE/EvE/Tsumego) — một
// lớp bàn cờ vây mờ ảo phía sau, rất nhẹ để không "đấu" với bàn cờ thật ở
// giữa màn hình. Cùng ngôn ngữ thị giác với nền trang Đăng nhập/Đăng ký
// (xem components/Auth/GoBoardBackdrop.tsx) nhưng độ mờ cao hơn nhiều.

const SIZE = 19;
const CELL = 44;
const PAD = 44;
const BOARD_PX = CELL * (SIZE - 1) + PAD * 2;
const HOSHI: [number, number][] = [
  [3, 3], [3, 9], [3, 15],
  [9, 3], [9, 9], [9, 15],
  [15, 3], [15, 9], [15, 15],
];

export function GameBackdrop() {
  return (
    <div className="game-backdrop" aria-hidden="true">
      <svg
        className="game-backdrop__board"
        viewBox={`0 0 ${BOARD_PX} ${BOARD_PX}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="gameWoodGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-board-light)" />
            <stop offset="100%" stopColor="var(--color-board-dark)" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={BOARD_PX} height={BOARD_PX} fill="url(#gameWoodGrad)" />
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
            r={5}
            fill="var(--color-board-line)"
          />
        ))}
      </svg>
      <div className="game-backdrop__scrim" />
    </div>
  );
}
