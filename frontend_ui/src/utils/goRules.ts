// src/utils/goRules.ts
// Pure function tính luật cờ Go cơ bản: đặt quân, bắt quân, cấm tự sát.
// Dùng chung cho PvP Online, PvE, PvP Local và parse SGF.

import type { BoardMatrix, Position, Stone } from "../types/go";

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