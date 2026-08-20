// src/utils/boardUtils.ts
import type { BoardMatrix, BoardSize } from "../types/go";

/** Tạo bàn cờ trống kích thước size x size */
export function createEmptyBoard(size: BoardSize): BoardMatrix {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => "empty" as const)
  );
}

/** Clone sâu ma trận bàn cờ (tránh mutate state trực tiếp trong React) */
export function cloneBoard(board: BoardMatrix): BoardMatrix {
  return board.map((row) => [...row]);
}
