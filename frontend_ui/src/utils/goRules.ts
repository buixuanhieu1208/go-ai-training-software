// src/utils/goRules.ts
// Pure function tính luật cờ Go cơ bản: đặt quân, bắt quân, cấm tự sát, đếm điểm.
// Dùng chung cho PvP Online, PvE, PvP Local và parse SGF.

import type { BoardMatrix, Position, ScoreResult, Stone } from "../types/go";

export type PlayerColor = Exclude<Stone, "empty">;

export interface ComputeMoveResult {
  board: BoardMatrix;
  capturedCount: number;
  capturedPositions: Position[];
  isCapture?: boolean;
}

export interface GroupResult {
  group: Position[];
  liberties: Set<string>;
}

export const DIRECTIONS: ReadonlyArray<[number, number]> = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

export function inBounds(board: BoardMatrix, x: number, y: number): boolean {
  return y >= 0 && y < board.length && x >= 0 && x < board[0].length;
}

export function oppositeColor(color: PlayerColor): PlayerColor {
  return color === "black" ? "white" : "black";
}

export function cloneBoard(board: BoardMatrix): BoardMatrix {
  return board.map((row) => [...row]);
}

/** Loang (DFS) tìm toàn bộ nhóm quân liên kết cùng màu + tập hợp khí (liberties). */
export function findGroupAndLiberties(board: BoardMatrix, startX: number, startY: number): GroupResult {
  const color = board[startY][startX];
  if (color === "empty") return { group: [], liberties: new Set<string>() };

  const visited = new Set<string>();
  const group: Position[] = [];
  const liberties = new Set<string>();
  const stack: Array<[number, number]> = [[startX, startY]];

  while (stack.length > 0) {
    const [x, y] = stack.pop() as [number, number];
    const key = `${x},${y}`;
    if (visited.has(key)) continue;
    visited.add(key);
    group.push({ x, y });

    for (const [dx, dy] of DIRECTIONS) {
      const nx = x + dx;
      const ny = y + dy;
      if (!inBounds(board, nx, ny)) continue;

      const neighborColor = board[ny][nx];
      if (neighborColor === "empty") {
        liberties.add(`${nx},${ny}`);
      } else if (neighborColor === color) {
        const nKey = `${nx},${ny}`;
        if (!visited.has(nKey)) stack.push([nx, ny]);
      }
    }
  }

  return { group, liberties };
}

/**
 * Xử lý bắt quân đối phương xung quanh vị trí vừa đặt.
 * Dùng cho sgfParser.ts và các logic cũ.
 */
export function applyCaptures(
  board: BoardMatrix,
  position: Position,
  color: PlayerColor
): { board: BoardMatrix; capturedCount: number; capturedPositions: Position[] } {
  const { x, y } = position;
  const newBoard = cloneBoard(board);
  const opponent = oppositeColor(color);
  let capturedCount = 0;
  const capturedPositions: Position[] = []; // <-- Bổ sung mảng lưu toạ độ

  const visitedOpponentGroups = new Set<string>();
  for (const [dx, dy] of DIRECTIONS) {
    const nx = x + dx;
    const ny = y + dy;
    if (!inBounds(newBoard, nx, ny)) continue;
    if (newBoard[ny][nx] !== opponent) continue;

    const groupKey = `${nx},${ny}`;
    if (visitedOpponentGroups.has(groupKey)) continue;

    const { group, liberties } = findGroupAndLiberties(newBoard, nx, ny);
    for (const p of group) visitedOpponentGroups.add(`${p.x},${p.y}`);

    if (liberties.size === 0) {
      for (const p of group) {
        newBoard[p.y][p.x] = "empty";
        capturedCount += 1;
        capturedPositions.push(p); // <-- Ghi nhận toạ độ quân bị bắt
      }
    }
  }

  return { board: newBoard, capturedCount, capturedPositions };
}

/**
 * Đặt 1 quân `color` tại `position` lên `board`, xử lý bắt quân đối phương và
 * cấm nước tự sát. KHÔNG xử lý luật Ko (bỏ qua theo yêu cầu — chỉ logic cốt lõi).
 *
 * @throws {Error} nếu nước đi không hợp lệ (đã có quân / tự sát)
 */
export function computeNextBoard(
  board: BoardMatrix,
  position: Position | null,
  color: PlayerColor
): ComputeMoveResult {
  if (!position) {
    // Nước Pass — board không đổi, không quân nào bị bắt
    return { board, capturedCount: 0, capturedPositions: [], isCapture: false };
  }

  const { x, y } = position;

  if (!inBounds(board, x, y)) {
    throw new Error("Vị trí ngoài phạm vi bàn cờ.");
  }
  if (board[y][x] !== "empty") {
    throw new Error("Điểm này đã có quân cờ.");
  }

  // 1. Đặt quân tạm thời
  let newBoard = cloneBoard(board);
  newBoard[y][x] = color;

  // 2. Bắt quân (Tái sử dụng hàm applyCaptures)
  const captureResult = applyCaptures(newBoard, position, color);
  newBoard = captureResult.board;
  const capturedCount = captureResult.capturedCount;
  const capturedPositions = captureResult.capturedPositions;

  // 3. Cấm tự sát: sau khi bắt quân (nếu có), nhóm của mình phải còn khí
  const { liberties: ownLiberties } = findGroupAndLiberties(newBoard, x, y);
  if (ownLiberties.size === 0) {
    throw new Error("Nước đi tự sát (nhóm quân hết khí sau khi đặt).");
  }

  return { 
    board: newBoard, 
    capturedCount, 
    capturedPositions,
    isCapture: capturedCount > 0
  };
}

// ============================================================================
// tryPlaceStone — kiểm tra + thực hiện 1 nước đặt quân theo Luật cờ vây VCF.
//   Điều 5 : nhấc đám quân đối phương hết khí.
//   Điều 6 : cấm tự sát (điểm hết khí chỉ được đi nếu ăn được quân).
//   Điều 9 : cấm ăn lại KO ngay lập tức (`koPoint` do nước đi trước sinh ra).
// Pure function, không ném lỗi: trả về { ok:false, reason } khi nước đi không hợp lệ.
// ============================================================================
export type PlacementFailure = "out_of_bounds" | "occupied" | "ko" | "suicide";

export type PlacementResult =
  | {
      ok: true;
      board: BoardMatrix;
      capturedCount: number;
      capturedPositions: Position[];
      /** Điểm bên kế tiếp bị cấm đi ngay (KO), hoặc null. */
      koPoint: Position | null;
    }
  | { ok: false; reason: PlacementFailure };

export function tryPlaceStone(
  board: BoardMatrix,
  position: Position,
  color: PlayerColor,
  koPoint: Position | null = null
): PlacementResult {
  const { x, y } = position;
  if (!Number.isInteger(x) || !Number.isInteger(y) || !inBounds(board, x, y)) {
    return { ok: false, reason: "out_of_bounds" };
  }
  if (board[y][x] !== "empty") return { ok: false, reason: "occupied" };
  if (koPoint && koPoint.x === x && koPoint.y === y) return { ok: false, reason: "ko" };

  const withMove = cloneBoard(board);
  withMove[y][x] = color;
  const { board: after, capturedCount, capturedPositions } = applyCaptures(withMove, position, color);

  // Điều 6: sau khi ăn quân (nếu có), đám quân vừa đặt phải còn khí.
  const { group, liberties } = findGroupAndLiberties(after, x, y);
  if (liberties.size === 0) return { ok: false, reason: "suicide" };

  // Điều 9: ăn đúng 1 quân, quân vừa đặt đứng một mình và chỉ còn 1 khí -> thế KO.
  const nextKo =
    capturedCount === 1 && group.length === 1 && liberties.size === 1 ? capturedPositions[0] : null;

  return { ok: true, board: after, capturedCount, capturedPositions, koPoint: nextKo };
}

// ============================================================================
// calculateScore — đếm điểm theo luật Trung Quốc (Area Scoring).
//   Điểm = Vùng đất (territory) + Quân trên bàn + Quân bắt được.
//   Quân Trắng được cộng thêm komi (mặc định 6.5) vì đi sau.
//   Territory được tính bằng Flood Fill: các điểm trống chỉ tiếp giáp
//   (trực tiếp hoặc gián tiếp) với 1 màu duy nhất thuộc về màu đó.
// ============================================================================

/** Đếm số quân từng màu đang có trên bàn cờ. */
function countStonesOnBoard(board: BoardMatrix): { black: number; white: number } {
  let black = 0;
  let white = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell === "black") black++;
      else if (cell === "white") white++;
    }
  }
  return { black, white };
}

/**
 * Đếm điểm theo luật Trung Quốc (Chinese / Area Scoring).
 *
 * @param board         Ma trận trạng thái bàn cờ hiện tại
 * @param capturedBlack Số quân Trắng đã bị Đen bắt (tích luỹ cả ván)
 * @param capturedWhite Số quân Đen đã bị Trắng bắt (tích luỹ cả ván)
 * @param komi          Điểm bù cho Trắng (mặc định 6.5)
 */
export function calculateScore(
  board: BoardMatrix,
  capturedBlack: number,
  capturedWhite: number,
  komi: number = 6.5
): ScoreResult {
  const size = board.length;

  // 1. Tạo bản đồ vùng đất (territory map) bằng Flood Fill
  const territoryMap: ("black" | "white" | "neutral")[][] = Array.from(
    { length: size },
    () => Array.from({ length: size }, () => "neutral" as const)
  );

  const visited = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false)
  );

  let blackTerritory = 0;
  let whiteTerritory = 0;

  // Duyệt từng điểm trống chưa thăm, loang (BFS) để xác định vùng đất
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (board[y][x] !== "empty" || visited[y][x]) continue;

      // BFS loang vùng trống liên thông
      const region: Position[] = [];
      const queue: Position[] = [{ x, y }];
      const borderColors = new Set<PlayerColor>();
      visited[y][x] = true;

      while (queue.length > 0) {
        const current = queue.shift()!;
        region.push(current);

        for (const [dx, dy] of DIRECTIONS) {
          const nx = current.x + dx;
          const ny = current.y + dy;
          if (!inBounds(board, nx, ny)) continue;

          const neighbor = board[ny][nx];
          if (neighbor === "empty") {
            if (!visited[ny][nx]) {
              visited[ny][nx] = true;
              queue.push({ x: nx, y: ny });
            }
          } else {
            // Ghi nhận màu quân tiếp giáp biên vùng trống
            borderColors.add(neighbor);
          }
        }
      }

      // Nếu vùng trống chỉ tiếp giáp đúng 1 màu -> thuộc vùng đất màu đó
      if (borderColors.size === 1) {
        const owner = borderColors.values().next().value as PlayerColor;
        for (const p of region) {
          territoryMap[p.y][p.x] = owner;
        }
        if (owner === "black") blackTerritory += region.length;
        else whiteTerritory += region.length;
      }
      // Nếu tiếp giáp cả 2 màu hoặc không tiếp giáp gì -> neutral (dame)
    }
  }

  // 2. Đếm quân trên bàn
  const stones = countStonesOnBoard(board);

  // 3. Tính tổng điểm theo Area Scoring
  const blackScore = blackTerritory + stones.black + capturedBlack;
  const whiteScore = whiteTerritory + stones.white + capturedWhite + komi;

  return {
    blackTerritory,
    whiteTerritory,
    blackScore,
    whiteScore,
    territoryMap,
  };
}