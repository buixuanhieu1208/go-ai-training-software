// src/services/refereeApi.ts
// Client gọi tới nhóm API "Trọng tài & Scoring" ở backend_ai
// (backend_ai/main.py — /api/referee/*, /api/score/*, xem Bước 2).
//
// LƯU Ý: Backend thật KHÔNG có 1 endpoint gộp trả sẵn score+combo+mistakeStats
// như bản gốc go-ai-training-software giả định. File này gọi riêng 3 endpoint
// (/api/referee/analyze, /api/score/territory, /api/score/combo) rồi GỘP kết
// quả tại Client thành đúng shape AnalyzeGameResult mà AnalysisPanel.tsx cần
// — nhờ vậy AnalysisPanel.tsx port từ bản gốc không phải sửa gì.

import type { BoardMatrix, Move, MistakeTag } from "../types/go";

export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:8000";

/** Board dạng số (1/-1/0) — đúng contract Backend đang dùng (utils/game_logic.py). */
export type NumericBoard = number[][];

/** FE dùng BoardMatrix = Stone[][] ("black"/"white"/"empty") — chuyển sang số trước khi gửi Backend. */
export function boardToNumeric(board: BoardMatrix): NumericBoard {
  return board.map((row) =>
    row.map((cell) => (cell === "black" ? 1 : cell === "white" ? -1 : 0))
  );
}

export class RefereeApiError extends Error {}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new RefereeApiError(
      `Không kết nối được tới backend tại ${API_BASE_URL}. Hãy chắc chắn server đang chạy: ` +
        `uvicorn main:app --reload --port 8000`
    );
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new RefereeApiError(`Backend trả lỗi ${res.status}: ${text || res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// ============================================================================
// 1) POST /api/referee/analyze
// ============================================================================
interface AnalyzeApiResponse {
  finalBoard: NumericBoard;
  annotatedMoves: Move[];
  capturedBlack: number;
  capturedWhite: number;
}

function analyzeGame(boardSize: number, moveHistory: Move[]): Promise<AnalyzeApiResponse> {
  return postJson<AnalyzeApiResponse>("/api/referee/analyze", { boardSize, moveHistory });
}

// ============================================================================
// 2) POST /api/score/territory
// ============================================================================
export interface RefereeScoreResult {
  blackTerritory: number;
  whiteTerritory: number;
  blackScore: number;
  whiteScore: number;
  territoryMap: ("black" | "white" | "neutral")[][];
  winner: "black" | "white" | null;
  winMargin: number | null;
}

/** board truyền vào đây PHẢI là NumericBoard (vd: lấy từ analyzeGame().finalBoard). */
function scoreTerritory(board: NumericBoard, komi = 7.5): Promise<RefereeScoreResult> {
  return postJson<RefereeScoreResult>("/api/score/territory", { board, komi });
}

// ============================================================================
// 3) POST /api/score/combo
// ============================================================================
export interface ComboEvent {
  color: "black" | "white";
  startMoveIndex: number;
  endMoveIndex: number;
  length: number;
  stonesCaptured: number;
  bonusPoints: number;
}

export interface ComboSide {
  totalComboBonus: number;
  bestStreak: number;
  events: ComboEvent[];
}

export interface ComboApiResponse {
  black: ComboSide;
  white: ComboSide;
  events: ComboEvent[];
}

function scoreCombo(moveHistory: Move[]): Promise<ComboApiResponse> {
  return postJson<ComboApiResponse>("/api/score/combo", { moveHistory });
}

// ============================================================================
// 4) POST /api/referee/validate-move
// ============================================================================
export interface ValidateMoveResult {
  legal: boolean;
  reasonCode: "occupied" | "suicide" | "ko" | "out_of_bounds" | null;
  reason: string | null;
  capturedCount: number;
  capturedPositions: { x: number; y: number }[];
  resultingBoard: NumericBoard | null;
  resultingSignature: string | null;
}

/** board truyền vào đây là BoardMatrix (Stone[][]) — hàm tự convert sang số. */
export function validateMove(
  board: BoardMatrix,
  position: { x: number; y: number },
  color: "black" | "white",
  previousBoardSignature?: string | null
): Promise<ValidateMoveResult> {
  return postJson<ValidateMoveResult>("/api/referee/validate-move", {
    board: boardToNumeric(board),
    position,
    color,
    previousBoardSignature: previousBoardSignature ?? null,
  });
}

// ============================================================================
// GET /health — LƯU Ý: Backend thật expose tại "/health", KHÔNG phải
// "/api/health" như bản gốc training (đã sửa lại cho đúng main.py).
// ============================================================================
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

// ============================================================================
// Gộp kết quả tại Client — đây là hàm chính mà useRefereeAnalysis.ts sẽ gọi.
// Thứ tự: analyze trước (để lấy finalBoard + annotatedMoves có mistakeTag),
// sau đó gọi song song territory (dùng finalBoard vừa có) và combo.
// ============================================================================
export interface MistakeStat {
  tag: MistakeTag;
  count: number;
}

function computeMistakeStats(annotatedMoves: Move[]): MistakeStat[] {
  const counts = new Map<MistakeTag, number>();
  for (const m of annotatedMoves) {
    if (!m.mistakeTag) continue;
    counts.set(m.mistakeTag, (counts.get(m.mistakeTag) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([tag, count]) => ({ tag, count }));
}

export interface AnalyzeGameResult {
  finalBoard: NumericBoard;
  annotatedMoves: Move[];
  capturedBlack: number;
  capturedWhite: number;
  score: RefereeScoreResult;
  combo: ComboApiResponse;
  mistakeStats: MistakeStat[];
  winner: "black" | "white" | null;
  winMargin: number | null;
}

export async function runFullAnalysis(
  boardSize: number,
  moveHistory: Move[],
  komi = 7.5
): Promise<AnalyzeGameResult> {
  const analyze = await analyzeGame(boardSize, moveHistory);
  const [score, combo] = await Promise.all([
    scoreTerritory(analyze.finalBoard, komi),
    scoreCombo(moveHistory),
  ]);

  return {
    ...analyze,
    score,
    combo,
    mistakeStats: computeMistakeStats(analyze.annotatedMoves),
    winner: score.winner,
    winMargin: score.winMargin,
  };
}