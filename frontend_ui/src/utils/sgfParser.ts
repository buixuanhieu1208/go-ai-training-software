// src/utils/sgfParser.ts
// Parser thuần cho định dạng SGF (Smart Game Format) — không phụ thuộc React,
// dễ unit test và dễ tái sử dụng ở cả FE lẫn tool tiền xử lý dữ liệu (Node script)
// nếu nhóm cần build training set cho Policy/Value Network.
//
// Phạm vi hỗ trợ (đủ dùng cho khoá luận, đã ghi rõ giới hạn):
//  - Đọc đúng: SZ (kích thước bàn), B/W (nước đi), AB/AW/AE (setup quân),
//    PL (bên đi trước), C (comment), các property thông tin ván đấu (PB, PW, RE, DT...).
//  - Với cây SGF có nhánh biến thể (variations dùng nhiều dấu "("), parser chỉ
//    đọc NHÁNH CHÍNH (main line) — tức luôn đi theo nhánh con đầu tiên. Việc này
//    hợp lý vì phần lớn file .SGF từ KGS/OGS dùng để luyện tập là ván đấu thật,
//    không có biến thể. Nếu cần phân tích biến thể sau này, mở rộng `parseSgf`
//    để trả về cây thay vì mảng phẳng.

import type { BoardMatrix, BoardSize, Position, Stone } from "../types/go";
import { applyCaptures } from "./goRules";
import { createEmptyBoard } from "./boardUtils";

export interface SgfMove {
  color: Exclude<Stone, "empty">;
  position: Position | null; // null = Pass
  comment?: string;
}

export interface SgfMetadata {
  boardSize: BoardSize;
  playerBlack?: string;
  playerWhite?: string;
  result?: string;
  date?: string;
  komi?: number;
  ruleSet?: string;
}

export interface ParsedSgf {
  metadata: SgfMetadata;
  /** Quân đặt sẵn trước ván đấu (vd: cho bài tập Tsumego), qua thuộc tính AB/AW */
  setupBlack: Position[];
  setupWhite: Position[];
  /** Danh sách nước đi theo đúng thứ tự trong nhánh chính */
  moves: SgfMove[];
}

const SGF_LETTERS = "abcdefghijklmnopqrstuvwxyz";

/** Chuyển 1 toạ độ SGF (vd: "pd") thành Position {x, y}. Chuỗi rỗng = Pass (null). */
export function sgfCoordToPosition(raw: string): Position | null {
  if (!raw) return null; // B[] hoặc W[] -> Pass
  const x = SGF_LETTERS.indexOf(raw[0]);
  const y = SGF_LETTERS.indexOf(raw[1]);
  if (x === -1 || y === -1) return null;
  return { x, y };
}

/** Chiều ngược lại — hữu ích khi cần export lại ván đấu ra .SGF (vd: sau khi luyện tập xong) */
export function positionToSgfCoord(pos: Position): string {
  return `${SGF_LETTERS[pos.x]}${SGF_LETTERS[pos.y]}`;
}

interface RawNode {
  properties: Record<string, string[]>;
}

/** Đọc 1 node ";PROP[val]PROP[val]..." bắt đầu tại cursor.pos (đã đứng ngay sau ";") */
function parseNodeProperties(sgf: string, cursor: { pos: number }): RawNode {
  const properties: Record<string, string[]> = {};
  const len = sgf.length;

  while (cursor.pos < len && !"(;)".includes(sgf[cursor.pos])) {
    let name = "";
    while (cursor.pos < len && /[A-Za-z]/.test(sgf[cursor.pos])) {
      name += sgf[cursor.pos];
      cursor.pos++;
    }
    if (!name) {
      cursor.pos++;
      continue;
    }

    const values: string[] = [];
    while (cursor.pos < len && sgf[cursor.pos] === "[") {
      cursor.pos++; // bỏ qua "["
      let value = "";
      while (cursor.pos < len && sgf[cursor.pos] !== "]") {
        if (sgf[cursor.pos] === "\\" && cursor.pos + 1 < len) {
          // ký tự escape trong SGF, vd: \] hoặc \\
          value += sgf[cursor.pos + 1];
          cursor.pos += 2;
          continue;
        }
        value += sgf[cursor.pos];
        cursor.pos++;
      }
      cursor.pos++; // bỏ qua "]"
      values.push(value);
    }

    if (values.length > 0) properties[name.toUpperCase()] = values;
  }

  return { properties };
}

/** Bỏ qua toàn bộ 1 nhánh biến thể "(...)" bắt đầu tại cursor.pos == "(", kể cả các nhánh con lồng bên trong. */
function skipVariation(sgf: string, cursor: { pos: number }): void {
  let depth = 0;
  const len = sgf.length;
  while (cursor.pos < len) {
    const ch = sgf[cursor.pos];
    if (ch === "(") depth++;
    else if (ch === ")") {
      depth--;
      if (depth === 0) {
        cursor.pos++;
        return;
      }
    }
    cursor.pos++;
  }
}

/**
 * Đệ quy đọc 1 "sequence" SGF bắt đầu ngay sau dấu "(" đã tiêu thụ.
 * Đọc tuần tự các node ";...", và khi gặp nhánh con "(", LUÔN đi theo nhánh
 * ĐẦU TIÊN làm nhánh chính (main line theo quy ước SGF phổ biến), rồi bỏ qua
 * mọi nhánh anh em còn lại trước khi đóng sequence hiện tại bằng ")".
 */
function parseSequence(sgf: string, cursor: { pos: number }): RawNode[] {
  const nodes: RawNode[] = [];
  const len = sgf.length;

  while (cursor.pos < len) {
    const ch = sgf[cursor.pos];

    if (ch === ";") {
      cursor.pos++;
      nodes.push(parseNodeProperties(sgf, cursor));
      continue;
    }

    if (ch === "(") {
      // Nhánh con đầu tiên gặp được coi là phần tiếp theo của nhánh chính.
      cursor.pos++;
      nodes.push(...parseSequence(sgf, cursor));

      // Sau khi nhánh chính con đóng lại, bỏ qua các nhánh anh em (biến thể).
      while (cursor.pos < len && sgf[cursor.pos] === "(") {
        skipVariation(sgf, cursor);
      }
      continue;
    }

    if (ch === ")") {
      cursor.pos++;
      return nodes;
    }

    cursor.pos++; // khoảng trắng / ký tự thừa
  }

  return nodes;
}

/** Tokenize toàn bộ chuỗi SGF, chỉ giữ lại nhánh chính (main line). */
function tokenizeMainLine(sgf: string): RawNode[] {
  const cursor = { pos: 0 };
  const len = sgf.length;

  // Bỏ qua khoảng trắng / ký tự thừa trước dấu "(" gốc
  while (cursor.pos < len && sgf[cursor.pos] !== "(") cursor.pos++;
  if (cursor.pos >= len) return [];

  cursor.pos++; // tiêu thụ "(" gốc
  return parseSequence(sgf, cursor);
}

function parseBoardSize(value: string | undefined): BoardSize {
  const parsed = value ? parseInt(value, 10) : 19;
  if (parsed === 9 || parsed === 13 || parsed === 19) return parsed;
  // Kích thước lạ (vd: 21x21) -> mặc định về 19 để không vỡ UI hiện tại;
  // ghi log để dev biết mà mở rộng BOARD_SIZES nếu cần hỗ trợ thêm.
  console.warn(`[sgfParser] Kích thước bàn cờ không được hỗ trợ (${value}), dùng mặc định 19x19.`);
  return 19;
}

/** Hàm chính: parse toàn bộ nội dung file .SGF thành cấu trúc dữ liệu dùng cho FE */
export function parseSgf(sgfText: string): ParsedSgf {
  const nodes = tokenizeMainLine(sgfText.trim());
  if (nodes.length === 0) {
    throw new Error("File SGF không hợp lệ hoặc rỗng.");
  }

  const rootProps = nodes[0].properties;
  const boardSize = parseBoardSize(rootProps.SZ?.[0]);

  const metadata: SgfMetadata = {
    boardSize,
    playerBlack: rootProps.PB?.[0],
    playerWhite: rootProps.PW?.[0],
    result: rootProps.RE?.[0],
    date: rootProps.DT?.[0],
    komi: rootProps.KM ? parseFloat(rootProps.KM[0]) : undefined,
    ruleSet: rootProps.RU?.[0],
  };

  const setupBlack: Position[] = (rootProps.AB ?? [])
    .map(sgfCoordToPosition)
    .filter((p): p is Position => p !== null);
  const setupWhite: Position[] = (rootProps.AW ?? [])
    .map(sgfCoordToPosition)
    .filter((p): p is Position => p !== null);

  const moves: SgfMove[] = [];

  for (const node of nodes) {
    const { properties } = node;
    if ("B" in properties) {
      moves.push({
        color: "black",
        position: sgfCoordToPosition(properties.B[0]),
        comment: properties.C?.[0],
      });
    } else if ("W" in properties) {
      moves.push({
        color: "white",
        position: sgfCoordToPosition(properties.W[0]),
        comment: properties.C?.[0],
      });
    }
    // Các node chỉ chứa AB/AW/AE/C mà không có B hoặc W (setup, comment giữa
    // ván) không được xem là 1 "nước đi" nên bị bỏ qua ở đây theo thiết kế.
  }

  return { metadata, setupBlack, setupWhite, moves };
}

/**
 * Sinh ra dãy ma trận trạng thái bàn cờ (BoardMatrix) tương ứng SAU mỗi nước
 * đi trong `parsed.moves` — chính là dữ liệu "tiền xử lý" cần cho việc train
 * Policy/Value Network (yêu cầu cốt lõi #1 của đề tài).
 *
 * @param upToIndex  chỉ tính đến nước thứ N (0-based, exclusive). Bỏ trống = tính hết ván.
 */
export function buildBoardSequence(parsed: ParsedSgf, upToIndex?: number): BoardMatrix[] {
  const { boardSize } = parsed.metadata;
  const { setupBlack, setupWhite } = parsed;
  let board: BoardMatrix = createEmptyBoard(boardSize);

  setupBlack.forEach((p) => (board[p.y][p.x] = "black"));
  setupWhite.forEach((p) => (board[p.y][p.x] = "white"));

  const sequence: BoardMatrix[] = [];
  const limit = upToIndex ?? parsed.moves.length;

  for (let i = 0; i < Math.min(limit, parsed.moves.length); i++) {
    const move = parsed.moves[i];
    if (move.position) {
      const boardWithMove = board.map((row) => [...row]);
      boardWithMove[move.position.y][move.position.x] = move.color;
      const { board: boardAfterCapture } = applyCaptures(boardWithMove, move.position, move.color);
      board = boardAfterCapture;
    }
    // Pass (position === null) không đổi board, nhưng vẫn được ghi vào sequence
    // để giữ đúng độ dài tương ứng với moveHistory (dùng khi phát lại ván đấu).
    sequence.push(board.map((row) => [...row]));
  }

  return sequence;
}

/** Tiện ích: lấy board tại đúng 1 thời điểm (vd: hiển thị "nước thứ 42") mà không cần cả sequence */
export function buildBoardAtMove(parsed: ParsedSgf, moveIndex: number): BoardMatrix {
  const sequence = buildBoardSequence(parsed, moveIndex);
  if (sequence.length === 0) {
    const { boardSize } = parsed.metadata;
    const { setupBlack, setupWhite } = parsed;
    const board = createEmptyBoard(boardSize);
    setupBlack.forEach((p) => (board[p.y][p.x] = "black"));
    setupWhite.forEach((p) => (board[p.y][p.x] = "white"));
    return board;
  }
  return sequence[sequence.length - 1];
}
