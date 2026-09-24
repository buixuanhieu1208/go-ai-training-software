// src/components/Home/HeroBoardDemo.tsx
// Bàn cờ "sống" trong Hero của trang chủ — không phải ảnh tĩnh. Tự động lặp
// lại 1 chuỗi nước đi có thật (đã kiểm chứng bằng goRules), kết thúc bằng 1
// nước bắt quân để kích hoạt lại đúng hiệu ứng "+N điểm" dùng trong ván đấu
// thật — vừa minh hoạ luật cờ, vừa là "chữ ký" thị giác của trang chủ.

import { useEffect, useMemo, useRef, useState } from "react";
import { Board } from "../Board/Board";
import { applyCaptures } from "../../utils/goRules";
import { cloneBoard, createEmptyBoard } from "../../utils/boardUtils";
import type { BoardMatrix, FloatingScoreEffect, Position, Stone } from "../../types/go";

const DEMO_SIZE = 9;
const FRAME_INTERVAL_MS = 1400;

interface DemoFrame {
  board: BoardMatrix;
  lastMove: Position | null;
  capture?: { positions: Position[]; color: Exclude<Stone, "empty"> };
}

function buildDemoFrames(): DemoFrame[] {
  let board = createEmptyBoard(DEMO_SIZE);

  // Thế cờ mượn từ bài Tsumego "Bắt quân Trắng" (đã kiểm chứng ở mockTsumegoData.ts):
  // Đen vây 4 góc, Trắng 2 quân ở giữa — Đen áp sát rồi bắt trọn.
  const setupBlack: Position[] = [
    { x: 2, y: 3 }, // c d
    { x: 2, y: 4 }, // c e
    { x: 4, y: 3 }, // e d
    { x: 4, y: 4 }, // e e
  ];
  const setupWhite: Position[] = [
    { x: 3, y: 3 }, // d d
    { x: 3, y: 4 }, // d e
  ];
  setupBlack.forEach((p) => (board[p.y][p.x] = "black"));
  setupWhite.forEach((p) => (board[p.y][p.x] = "white"));

  const frames: DemoFrame[] = [{ board: cloneBoard(board), lastMove: null }];

  const moves: { color: Exclude<Stone, "empty">; position: Position }[] = [
    { color: "black", position: { x: 3, y: 2 } }, // d c — áp sát phía trên
    { color: "white", position: { x: 6, y: 6 } }, // g g — Trắng tenuki
    { color: "black", position: { x: 3, y: 5 } }, // d f — bắt trọn 2 quân Trắng
  ];

  moves.forEach((move) => {
    const withMove = cloneBoard(board);
    withMove[move.position.y][move.position.x] = move.color;
    const { board: afterCapture, capturedCount, capturedPositions } = applyCaptures(
      withMove,
      move.position,
      move.color
    );
    board = afterCapture;
    frames.push({
      board: cloneBoard(board),
      lastMove: move.position,
      capture: capturedCount > 0 ? { positions: capturedPositions, color: move.color } : undefined,
    });
  });

  return frames;
}

export function HeroBoardDemo() {
  const frames = useMemo(() => buildDemoFrames(), []);
  const [frameIndex, setFrameIndex] = useState(0);
  const [floatingScores, setFloatingScores] = useState<FloatingScoreEffect[]>([]);
  const effectIdRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIndex((i) => (i + 1) % frames.length);
    }, FRAME_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [frames.length]);

  const frame = frames[frameIndex];

  useEffect(() => {
    if (!frame.capture) return;
    const { positions, color } = frame.capture;
    const cx = positions.reduce((sum, p) => sum + p.x, 0) / positions.length;
    const cy = positions.reduce((sum, p) => sum + p.y, 0) / positions.length;
    const id = effectIdRef.current++;
    setFloatingScores((prev) => [...prev, { id, x: cx, y: cy, value: positions.length, color }]);
    const cleanup = setTimeout(() => {
      setFloatingScores((prev) => prev.filter((f) => f.id !== id));
    }, 1100);
    return () => clearTimeout(cleanup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameIndex]);

  return (
    <div className="hero-board-demo" aria-hidden="true">
      <Board
        board={frame.board}
        boardSize={DEMO_SIZE}
        onPointClick={() => {}}
        showHints={false}
        lastMove={frame.lastMove}
        disabled
        floatingScores={floatingScores}
      />
      <span className="hero-board-demo__caption">Bàn cờ minh hoạ — Đen vừa bắt trọn 2 quân Trắng</span>
    </div>
  );
}
