// src/utils/puzzleExtractor.ts
// Phân hệ Trích xuất Bài tập Tsumego từ Ván đấu (Game Blunder Extractor):
// Tự động rà soát toàn bộ ván đấu, trích xuất các tình huống mắc sai lầm (Blunder, Atari, Overplay)
// để tạo thành các bài tập Tsumego cá nhân hóa cho kỳ thủ rút kinh nghiệm và sửa sai.

import type { Move, BoardSize, Position } from "../types/go";
import type { TsumegoSgfPuzzle, HotspotArea } from "../types/training";
import { BOARD_COLUMN_LETTERS } from "../constants/board";
import { savePersonalPuzzle } from "../data/puzzles/allPuzzles";
import { computeNextBoard } from "./goRules";
import { createEmptyBoard } from "./boardUtils";

const COL_CHARS = "abcdefghijklmnopqrstuvwxyz";

function posToSgfCoord(pos: Position): string {
  const c = COL_CHARS[pos.x] ?? "a";
  const r = COL_CHARS[pos.y] ?? "a";
  return `${c}${r}`;
}

function calculateHotspot(pos: Position, boardSize: BoardSize): HotspotArea {
  return {
    minX: Math.max(0, pos.x - 2),
    maxX: Math.min(boardSize - 1, pos.x + 2),
    minY: Math.max(0, pos.y - 2),
    maxY: Math.min(boardSize - 1, pos.y + 2),
  };
}

/**
 * Trích xuất các bài tập Tsumego cá nhân hóa từ các nước đi lỗi trong ván cờ
 */
export function extractPuzzlesFromGame(
  moveHistory: Move[],
  boardSize: BoardSize,
  userColor: "black" | "white" = "black"
): TsumegoSgfPuzzle[] {
  if (moveHistory.length === 0) return [];

  // 1. Tìm các nước đi của người chơi bị gắn cờ lỗi hoặc các nước bước ngoặt
  const blunderMoves: { move: Move; indexInHistory: number }[] = [];

  moveHistory.forEach((m, idx) => {
    if (m.color === userColor && m.position !== null) {
      if (m.mistakeTag === "blunder" || m.mistakeTag === "atari" || m.mistakeTag === "overplay") {
        blunderMoves.push({ move: m, indexInHistory: idx });
      }
    }
  });

  // Nếu không có blunder rõ ràng, lấy 1-2 nước đi bị đối phương bắt quân nặng nề nhất
  if (blunderMoves.length === 0) {
    moveHistory.forEach((m, idx) => {
      if (m.color !== userColor && m.isCapture && (m.capturedCount ?? 0) >= 1) {
        // Nước trước đó của người chơi có thể là nguyên nhân bị bắt
        const prevMove = moveHistory[idx - 1];
        if (prevMove && prevMove.color === userColor && prevMove.position !== null) {
          blunderMoves.push({ move: prevMove, indexInHistory: idx - 1 });
        }
      }
    });
  }

  // Giới hạn tối đa 3 bài tập từ 1 ván để tránh quá tải
  const selectedBlunders = blunderMoves.slice(0, 3);
  if (selectedBlunders.length === 0) return [];

  const createdPuzzles: TsumegoSgfPuzzle[] = [];

  for (const { move, indexInHistory } of selectedBlunders) {
    if (!move.position) continue;

    // 2. Tái tạo trạng thái bàn cờ TRƯỚC nước đi sai này
    let simBoard = createEmptyBoard(boardSize);
    for (let i = 0; i < indexInHistory; i++) {
      const pastMove = moveHistory[i];
      if (pastMove.position) {
        try {
          const res = computeNextBoard(simBoard, pastMove.position, pastMove.color);
          simBoard = res.board;
        } catch {
          // Bỏ qua lỗi bất thường
        }
      }
    }

    // 3. Gom danh sách quân Đen (AB) và quân Trắng (AW) hiện có
    const blackCoords: string[] = [];
    const whiteCoords: string[] = [];

    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        const cell = simBoard[y][x];
        if (cell === "black") {
          blackCoords.push(`[${posToSgfCoord({ x, y })}]`);
        } else if (cell === "white") {
          whiteCoords.push(`[${posToSgfCoord({ x, y })}]`);
        }
      }
    }

    const playedCoordName = `${BOARD_COLUMN_LETTERS[move.position.x]}${move.position.y + 1}`;
    const timestamp = Date.now().toString().slice(-4);
    const puzzleId = `personal-${move.index}-${timestamp}`;

    // Tìm một điểm trống hợp lệ lân cận làm nước giải đúng (thay cho nước lỗi)
    let altPosition: Position = move.position;
    const candidates: Position[] = [
      { x: move.position.x + 1, y: move.position.y },
      { x: move.position.x - 1, y: move.position.y },
      { x: move.position.x, y: move.position.y + 1 },
      { x: move.position.x, y: move.position.y - 1 },
    ];
    for (const c of candidates) {
      if (c.x >= 0 && c.x < boardSize && c.y >= 0 && c.y < boardSize) {
        if (simBoard[c.y][c.x] === "empty") {
          altPosition = c;
          break;
        }
      }
    }

    const playerTag = userColor === "black" ? "B" : "W";
    const solutionCoord = posToSgfCoord(altPosition);

    let abTag = blackCoords.length > 0 ? `AB${blackCoords.join("")}` : "";
    let awTag = whiteCoords.length > 0 ? `AW${whiteCoords.join("")}` : "";

    const sgfContent = `(;GM[1]FF[4]SZ[${boardSize}]${abTag}${awTag};${playerTag}[${solutionCoord}])`;

    const hotspot = calculateHotspot(move.position, boardSize);

    const puzzle: TsumegoSgfPuzzle = {
      id: puzzleId,
      title: `Rút kinh nghiệm nước #${move.index} (${playedCoordName})`,
      difficulty: "intermediate",
      category: "personal",
      topic: "personal",
      rankGrade: "Cá nhân",
      instruction: `Trong ván đấu vừa qua, bạn đã đặt quân tại ${playedCoordName} (${
        move.mistakeTag === "blunder"
          ? "Nước sơ hở"
          : move.mistakeTag === "atari"
          ? "Bị dồn vào thế 1 khí"
          : "Nước chưa tối ưu"
      }). Hãy tìm nước đi tối ưu hơn để cứu vãn thế trận!`,
      hotspotArea: hotspot,
      hints: {
        level1: `Tập trung vào khu vực xung quanh điểm ${playedCoordName}.`,
        level2: "Thay vì hấp tấp tấn công, hãy gia cố liên kết bảo vệ các quân cờ ít khí.",
      },
      explanation: `Bài học từ ván đấu: Nước đi tại ${playedCoordName} đã tạo cơ hội cho đối thủ phản công. Điểm ${
        BOARD_COLUMN_LETTERS[altPosition.x]
      }${altPosition.y + 1} giúp giữ vững hình cờ và bảo toàn sinh lực.`,
      sgf: sgfContent,
    };

    savePersonalPuzzle(puzzle);
    createdPuzzles.push(puzzle);
  }

  return createdPuzzles;
}
