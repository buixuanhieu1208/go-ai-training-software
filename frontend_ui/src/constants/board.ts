// src/constants/board.ts
import type { BoardSize } from "../types/go";

export const BOARD_SIZES: BoardSize[] = [9, 13, 19];

/** Toạ độ các điểm sao (hoshi) theo từng kích thước bàn cờ, dùng để vẽ chấm sao */
export const STAR_POINTS: Record<BoardSize, [number, number][]> = {
  9: [
    [2, 2],
    [2, 6],
    [6, 2],
    [6, 6],
    [4, 4],
  ],
  13: [
    [3, 3],
    [3, 9],
    [9, 3],
    [9, 9],
    [6, 6],
  ],
  19: [
    [3, 3],
    [3, 9],
    [3, 15],
    [9, 3],
    [9, 9],
    [9, 15],
    [15, 3],
    [15, 9],
    [15, 15],
  ],
};

export const DEFAULT_BOARD_SIZE: BoardSize = 19;
