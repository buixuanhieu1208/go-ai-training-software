// src/utils/goRules.ts
// Thuật toán loang (Flood Fill / BFS) dùng cho 2 việc:
//  1) Tìm nhóm quân + khí (liberties) -> xác định bắt quân (capture).
//  2) Đếm điểm lãnh thổ (Territory Scoring) khi kết thúc ván.
//
// Đây là bản triển khai FE tạm thời (client-side) cho mục đích demo/luyện tập
// nhanh; khi ghép AI Engine ở BE (Python), phần xác thực luật đầy đủ (ko rule,
// suicide, superko...) nên chạy ở BE để đảm bảo tính nhất quán.

import type { BoardMatrix, Position, ScoreResult, Stone } from "../types/go";

const DIRECTIONS = [
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
];

function inBounds(board: BoardMatrix, x: number, y: number): boolean {
  return y >= 0 && y < board.length && x >= 0 && x < board[0].length;
}

/**
 * Loang từ 1 điểm để tìm toàn bộ nhóm quân cùng màu liên kết (connected group)
 * và tập hợp các điểm khí (liberties) xung quanh nhóm đó.
 */
export function findGroupAndLiberties(
  board: BoardMatrix,
  start: Position
): { group: Position[]; liberties: Position[] } {
  const color = board[start.y][start.x];
  const visited = new Set<string>();
  const group: Position[] = [];
  const libertySet = new Set<string>();
  const stack: Position[] = [start];

  while (stack.length > 0) {
    const current = stack.pop()!;
    const key = `${current.x},${current.y}`;
    if (visited.has(key)) continue;
    visited.add(key);
    group.push(current);

    for (const { dx, dy } of DIRECTIONS) {
      const nx = current.x + dx;
      const ny = current.y + dy;
      if (!inBounds(board, nx, ny)) continue;
      const neighborColor = board[ny][nx];
      if (neighborColor === "empty") {
        libertySet.add(`${nx},${ny}`);
      } else if (neighborColor === color) {
        const nKey = `${nx},${ny}`;
        if (!visited.has(nKey)) stack.push({ x: nx, y: ny });
      }
    }
  }

  const liberties = Array.from(libertySet).map((k) => {
    const [x, y] = k.split(",").map(Number);
    return { x, y };
  });

  return { group, liberties };
}

/**
 * Sau khi đặt 1 quân tại `move`, kiểm tra các nhóm quân đối phương liền kề.
 * Nhóm nào hết khí (0 liberties) sẽ bị bắt (xoá khỏi bàn cờ).
 * Trả về: bàn cờ mới + số quân bị bắt.
 */
export function applyCaptures(
  board: BoardMatrix,
  move: Position,
  movedColor: Exclude<Stone, "empty">
): { board: BoardMatrix; capturedCount: number } {
  const opponent: Stone = movedColor === "black" ? "white" : "black";
  const newBoard = board.map((row) => [...row]);
  let capturedCount = 0;
  const visited = new Set<string>();

  for (const { dx, dy } of DIRECTIONS) {
    const nx = move.x + dx;
    const ny = move.y + dy;
    if (!inBounds(newBoard, nx, ny)) continue;
    if (newBoard[ny][nx] !== opponent) continue;

    const key = `${nx},${ny}`;
    if (visited.has(key)) continue;

    const { group, liberties } = findGroupAndLiberties(newBoard, { x: nx, y: ny });
    group.forEach((p) => visited.add(`${p.x},${p.y}`));

    if (liberties.length === 0) {
      group.forEach((p) => {
        newBoard[p.y][p.x] = "empty";
        capturedCount += 1;
      });
    }
  }

  return { board: newBoard, capturedCount };
}

/**
 * Đếm điểm bằng Flood Fill: loang trên các vùng trống liên tục, xác định
 * vùng đó tiếp giáp với màu nào -> thuộc lãnh thổ màu đó (nếu chỉ tiếp giáp
 * 1 màu duy nhất), ngược lại là vùng trung lập (dame).
 */
export function calculateTerritory(board: BoardMatrix): ScoreResult {
  const size = board.length;
  const territoryMap: ("black" | "white" | "neutral")[][] = Array.from(
    { length: size },
    () => Array.from({ length: size }, () => "neutral" as const)
  );
  const visited = new Set<string>();
  let blackTerritory = 0;
  let whiteTerritory = 0;
  let blackStones = 0;
  let whiteStones = 0;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const stone = board[y][x];
      if (stone === "black") blackStones++;
      if (stone === "white") whiteStones++;

      const key = `${x},${y}`;
      if (stone !== "empty" || visited.has(key)) continue;

      // BFS loang vùng trống
      const region: Position[] = [];
      const bordering = new Set<Stone>();
      const stack: Position[] = [{ x, y }];
      const localVisited = new Set<string>([key]);

      while (stack.length > 0) {
        const cur = stack.pop()!;
        region.push(cur);
        for (const { dx, dy } of DIRECTIONS) {
          const nx = cur.x + dx;
          const ny = cur.y + dy;
          if (!inBounds(board, nx, ny)) continue;
          const nColor = board[ny][nx];
          const nKey = `${nx},${ny}`;
          if (nColor === "empty") {
            if (!localVisited.has(nKey)) {
              localVisited.add(nKey);
              stack.push({ x: nx, y: ny });
            }
          } else {
            bordering.add(nColor);
          }
        }
      }

      region.forEach((p) => visited.add(`${p.x},${p.y}`));

      let owner: "black" | "white" | "neutral" = "neutral";
      if (bordering.size === 1) {
        owner = bordering.has("black") ? "black" : "white";
      }
      if (owner === "black") blackTerritory += region.length;
      if (owner === "white") whiteTerritory += region.length;

      region.forEach((p) => {
        territoryMap[p.y][p.x] = owner;
      });
    }
  }

  return {
    blackTerritory,
    whiteTerritory,
    blackScore: blackTerritory + blackStones,
    whiteScore: whiteTerritory + whiteStones,
    territoryMap,
  };
}
