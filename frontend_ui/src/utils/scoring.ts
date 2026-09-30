// src/utils/scoring.ts
// Tính điểm ván cờ theo luật Trung Quốc (Area scoring):
// Điểm = quân trên bàn + vùng đất (territory) + quân bắt được.
// Trắng được cộng thêm 6.5 điểm komi (tiên thủ bất lợi).

import type { BoardMatrix } from "../types/go";

const KOMI = 6.5;

interface ScoreResult {
  blackScore: number;
  whiteScore: number;
}

/**
 * Tính điểm bằng thuật toán Flood Fill — xác định vùng đất (territory) của mỗi bên.
 * Một vùng trống liên thông chỉ thuộc về 1 bên nếu TẤT CẢ quân giáp biên đều cùng màu.
 * Nếu vùng trống tiếp giáp cả đen lẫn trắng → vùng trung lập (neutral), không ai được điểm.
 *
 * @param board Ma trận bàn cờ hiện tại
 * @param capturedBlack Số quân trắng mà đen đã bắt (tù binh đen giữ)
 * @param capturedWhite Số quân đen mà trắng đã bắt (tù binh trắng giữ)
 */
export function calculateScore(
  board: BoardMatrix,
  capturedBlack: number,
  capturedWhite: number
): ScoreResult {
  const size = board.length;
  const visited: boolean[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false)
  );

  let blackTerritory = 0;
  let whiteTerritory = 0;
  let blackStones = 0;
  let whiteStones = 0;

  // Đếm quân trên bàn
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (board[y][x] === "black") blackStones++;
      else if (board[y][x] === "white") whiteStones++;
    }
  }

  // Flood fill tìm vùng đất
  const DIRS: [number, number][] = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (board[y][x] !== "empty" || visited[y][x]) continue;

      // BFS để tìm vùng trống liên thông
      const region: [number, number][] = [];
      const queue: [number, number][] = [[y, x]];
      visited[y][x] = true;
      let touchesBlack = false;
      let touchesWhite = false;

      while (queue.length > 0) {
        const [cy, cx] = queue.shift()!;
        region.push([cy, cx]);

        for (const [dy, dx] of DIRS) {
          const ny = cy + dy;
          const nx = cx + dx;
          if (ny < 0 || ny >= size || nx < 0 || nx >= size) continue;

          const cell = board[ny][nx];
          if (cell === "black") {
            touchesBlack = true;
          } else if (cell === "white") {
            touchesWhite = true;
          } else if (!visited[ny][nx]) {
            visited[ny][nx] = true;
            queue.push([ny, nx]);
          }
        }
      }

      // Vùng chỉ thuộc 1 bên nếu chỉ giáp biên với duy nhất 1 màu
      if (touchesBlack && !touchesWhite) {
        blackTerritory += region.length;
      } else if (touchesWhite && !touchesBlack) {
        whiteTerritory += region.length;
      }
      // Vùng trung lập: không cộng cho ai
    }
  }

  return {
    blackScore: blackStones + blackTerritory + capturedBlack,
    whiteScore: whiteStones + whiteTerritory + capturedWhite + KOMI,
  };
}
