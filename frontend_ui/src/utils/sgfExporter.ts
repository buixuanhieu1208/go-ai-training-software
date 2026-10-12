// src/utils/sgfExporter.ts
// Tiện ích xuất biên bản ván cờ ra định dạng chuẩn quốc tế SGF (Smart Game Format FF[4]).
// Cho phép tải file .sgf về máy hoặc sao chép văn bản để chia sẻ.

import type { Move } from "../types/go";

export interface SgfExportOptions {
  boardSize: number;
  moveHistory: Move[];
  playerBlack?: string;
  playerWhite?: string;
  ruleSet?: "chinese" | "japanese";
  komi?: number;
  result?: string;
  gameName?: string;
  date?: string;
}

const COL_CHARS = "abcdefghijklmnopqrstuvwxyz";

/** Chuyển toạ độ 0-indexed (x, y) sang định dạng SGF 2 ký tự (vd: (3, 15) -> "dp") */
function positionToSgf(pos: { x: number; y: number } | null): string {
  if (!pos) return ""; // Pass
  const col = COL_CHARS[pos.x] ?? "";
  const row = COL_CHARS[pos.y] ?? "";
  return `${col}${row}`;
}

export function generateSgfString(options: SgfExportOptions): string {
  const {
    boardSize = 19,
    moveHistory = [],
    playerBlack = "Quân Đen",
    playerWhite = "Quân Trắng",
    ruleSet = "chinese",
    komi = ruleSet === "chinese" ? 7.5 : 6.5,
    result = "Unknown",
    gameName = "Cờ Vây AI - Ván đấu",
    date = new Date().toISOString().slice(0, 10),
  } = options;

  const ruleName = ruleSet === "chinese" ? "Chinese" : "Japanese";

  let header = `(;GM[1]FF[4]CA[UTF-8]AP[Co Vay AI:1.0]GN[${gameName}]`;
  header += `SZ[${boardSize}]`;
  header += `KM[${komi}]`;
  header += `RU[${ruleName}]`;
  header += `PB[${playerBlack}]`;
  header += `PW[${playerWhite}]`;
  header += `DT[${date}]`;
  if (result) header += `RE[${result}]`;

  let movesStr = "";
  for (const move of moveHistory) {
    const colorTag = move.color === "black" ? "B" : "W";
    const posStr = positionToSgf(move.position);
    movesStr += `\n;${colorTag}[${posStr}]`;
  }

  return `${header}${movesStr}\n)`;
}

/** Tải file .sgf trực tiếp xuống máy người dùng */
export function downloadSgfFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: "application/x-go-sgf;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".sgf") ? filename : `${filename}.sgf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
