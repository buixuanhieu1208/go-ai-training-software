// src/components/Legendary/LegendaryPractice.tsx
// Chế độ nhập vai ván cờ huyền thoại:
// - Tái hiện thế cờ lịch sử tại thời điểm then chốt
// - Người chơi tự mình tương tác, đánh cờ với đối thủ đáp trả
// - Lời điểm đạo ẩn dụ (không bot AI chỉ điểm, gợi mở tư duy chiều sâu)
// - Trình phát kỳ phổ lịch sử chuyên nghiệp với thanh tua timeline và danh sách nước đi

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Board } from "../Board/Board";
import { useSound } from "../../hooks/useSound";
import { parseSgf, sgfCoordToPosition, buildBoardSequence, type ParsedSgf } from "../../utils/sgfParser";
import { computeNextBoard, cloneBoard } from "../../utils/goRules";
import { BOARD_COLUMN_LETTERS } from "../../constants/board";
import type { Position, BoardMatrix } from "../../types/go";
import type { LegendaryGame } from "../../types/legendary";
import {
  IconArrowLeft,
  IconRotateCcw,
  IconUndo,
  IconBookOpen,
  IconPlay,
  IconPause,
  IconSkipBack,
  IconSkipForward,
  IconStepBack,
  IconStepForward,
  IconHistory,
  IconFlag,
  IconStar,
} from "./LegendaryIcons";
import {
  getGameStarObjectives,
  evaluateGameMissions,
  saveGameStars,
} from "../../utils/legendaryMissionEvaluator";
import "./LegendaryPractice.css";

export interface LegendaryPracticeProps {
  game: LegendaryGame;
  onBack: () => void;
  onNextGame?: () => void;
  onPrevGame?: () => void;
  hasNextGame?: boolean;
  hasPrevGame?: boolean;
}

interface InteractiveMove {
  position: Position | null;
  color: "black" | "white";
  capturedCount: number;
}

const COUNTRY_NAMES: Record<string, string> = {
  JP: "Nhật Bản",
  KR: "Hàn Quốc",
  CN: "Trung Quốc",
  TW: "Đài Loan",
  AI: "Trí Tuệ Nhân Tạo",
};

const ERA_NAMES: Record<string, string> = {
  classical: "Cổ Điển",
  early_modern: "Cận Đại",
  golden: "Hoàng Kim",
  modern: "Hiện Đại",
  ai_era: "Kỷ Nguyên AI",
};

export function LegendaryPractice({
  game,
  onBack,
  onNextGame,
  onPrevGame,
  hasNextGame,
  hasPrevGame,
}: LegendaryPracticeProps) {
  const { play } = useSound();

  // Mode: "play" (người chơi tương tác đấu tiếp) hoặc "replay" (mô phỏng kỳ phổ lịch sử)
  const [activeTab, setActiveTab] = useState<"play" | "replay">("play");

  // Parse SGF gốc
  const parsedSgf: ParsedSgf | null = useMemo(() => {
    try {
      return parseSgf(game.sgf);
    } catch {
      return null;
    }
  }, [game.sgf]);

  // Bàn cờ thế xuất phát (trước nước then chốt)
  const initialSetupBoard: BoardMatrix = useMemo(() => {
    const b: BoardMatrix = Array(19)
      .fill(null)
      .map(() => Array(19).fill("empty"));
    if (parsedSgf) {
      parsedSgf.setupBlack.forEach((p) => {
        if (b[p.y] && b[p.y][p.x] !== undefined) b[p.y][p.x] = "black";
      });
      parsedSgf.setupWhite.forEach((p) => {
        if (b[p.y] && b[p.y][p.x] !== undefined) b[p.y][p.x] = "white";
      });
    }
    return b;
  }, [parsedSgf]);

  // -------------------------------------------------------------
  // STATE CHO CHẾ ĐỘ CHƠI TỰ DO (PLAY MODE - TỰ DO TÁC CHIẾN ĐỂ CHIẾN THẮNG)
  // -------------------------------------------------------------
  const [currentPlayBoard, setCurrentPlayBoard] = useState<BoardMatrix>(initialSetupBoard);
  const [playMoveHistory, setPlayMoveHistory] = useState<InteractiveMove[]>([]);
  const [isOpponentThinking, setIsOpponentThinking] = useState(false);
  const [playerStuckNotice, setPlayerStuckNotice] = useState<string | null>(null);
  const [showRiddleModal, setShowRiddleModal] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(false);
  const [undoCount, setUndoCount] = useState(0);
  const [gameOver, setGameOver] = useState<{
    over: boolean;
    winner: "player" | "opponent" | "draw";
    reason: string;
  } | null>(null);

  const playerColor = game.playerToMove;

  // Bộ 3 nhiệm vụ chiến dịch của ván cờ
  const starObjectives = useMemo(() => getGameStarObjectives(game), [game]);

  // Đánh giá tiến độ 3 nhiệm vụ theo thời gian thực
  const missionResult = useMemo(() => {
    return evaluateGameMissions({
      game,
      board: currentPlayBoard,
      initialBoard: initialSetupBoard,
      history: playMoveHistory.map((m, idx) => ({
        color: m.color,
        position: m.position,
        moveNumber: idx + 1,
      })),
      hintsUsed,
      undoCount,
      gameOver,
      playerColor,
    });
  }, [
    game,
    currentPlayBoard,
    initialSetupBoard,
    playMoveHistory,
    hintsUsed,
    undoCount,
    gameOver,
    playerColor,
  ]);

  // Tự động lưu số sao cao nhất khi ván đấu kết thúc
  useEffect(() => {
    if (gameOver?.over && missionResult.totalStars > 0) {
      saveGameStars(game.id, missionResult.totalStars);
    }
  }, [gameOver, missionResult.totalStars, game.id]);

  // -------------------------------------------------------------
  // STATE CHO CHẾ ĐỘ MÔ PHỎNG KỲ PHỔ LỊCH SỬ (REPLAY MODE)
  // -------------------------------------------------------------
  const replayBoardSequence: BoardMatrix[] = useMemo(() => {
    if (!parsedSgf) return [initialSetupBoard];
    return [initialSetupBoard, ...buildBoardSequence(parsedSgf)];
  }, [parsedSgf, initialSetupBoard]);

  const [replayIndex, setReplayIndex] = useState<number>(1);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset khi đổi ván cờ
  useEffect(() => {
    setCurrentPlayBoard(initialSetupBoard);
    setPlayMoveHistory([]);
    setIsOpponentThinking(false);
    setPlayerStuckNotice(null);
    setShowRiddleModal(false);
    setHintsUsed(false);
    setUndoCount(0);
    setGameOver(null);
    setActiveTab("play");
    setReplayIndex(1);
    setIsPlayingAuto(false);
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
  }, [game, initialSetupBoard]);

  // Quản lý autoplay cho replay
  useEffect(() => {
    if (!isPlayingAuto) {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      return;
    }

    if (replayIndex >= replayBoardSequence.length - 1) {
      setIsPlayingAuto(false);
      return;
    }

    autoPlayTimerRef.current = setTimeout(() => {
      setReplayIndex((prev) => Math.min(prev + 1, replayBoardSequence.length - 1));
      play("place");
    }, 1300);

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [isPlayingAuto, replayIndex, replayBoardSequence.length, play]);

  // Tọa độ nước đi của tuyển thủ trong lịch sử
  const actualPos = useMemo(() => sgfCoordToPosition(game.actualMove), [game.actualMove]);

  const posLabel = (pos: Position | null) => {
    if (!pos) return "Pass";
    const col = BOARD_COLUMN_LETTERS[pos.x] ?? "?";
    const row = pos.y + 1;
    return `${col}${row}`;
  };

  // Lượt đi trong chế độ chơi
  const isPlayerTurnInPlay =
    playMoveHistory.length % 2 === 0 && !isOpponentThinking;

  // -------------------------------------------------------------
  // XỬ LÝ KHI NGƯỜI CHƠI ĐẶT QUÂN (HOÀN TOÀN TỰ DO CHIẾN THUẬT)
  // -------------------------------------------------------------
  const handlePlayerMove = useCallback(
    async (pos: Position) => {
      if (!isPlayerTurnInPlay || isOpponentThinking || gameOver?.over) return;

      if (currentPlayBoard[pos.y][pos.x] !== "empty") {
        play("error");
        return;
      }

      const playerColor = game.playerToMove;
      let nextResult;
      try {
        nextResult = computeNextBoard(currentPlayBoard, pos, playerColor);
      } catch {
        play("error");
        return;
      }

      play(nextResult.capturedCount > 0 ? "capture" : "place");

      const newHistory: InteractiveMove[] = [
        ...playMoveHistory,
        { position: pos, color: playerColor, capturedCount: nextResult.capturedCount },
      ];

      setCurrentPlayBoard(nextResult.board);
      setPlayMoveHistory(newHistory);
      setIsOpponentThinking(true);

      // Đối thủ phản hồi qua AI Backend hoặc Tactical Engine
      const opponentColor = playerColor === "black" ? "white" : "black";

      setTimeout(async () => {
        let opponentPos: Position | null = null;
        let isOpponentPass = false;

        // 1. Gọi AI Backend (FastAPI /api/v1/get_move)
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3000);

          const res = await fetch("http://localhost:8000/api/v1/get_move", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
              board: nextResult.board.map((row) =>
                row.map((cell) => (cell === "black" ? 1 : cell === "white" ? -1 : 0))
              ),
              current_player: opponentColor === "black" ? 1 : -1,
              consecutive_passes: 0,
              difficulty: "medium",
            }),
          });
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            if (
              data.action === "move" &&
              data.row !== undefined &&
              data.col !== undefined &&
              nextResult.board[data.row][data.col] === "empty"
            ) {
              try {
                computeNextBoard(nextResult.board, { x: data.col, y: data.row }, opponentColor);
                opponentPos = { x: data.col, y: data.row };
              } catch {
                opponentPos = null;
              }
            } else if (data.action === "pass") {
              isOpponentPass = true;
            }
          }
        } catch {
          // Backend offline / timeout -> dùng fallback chiến thuật bên dưới
        }

        // 2. Fallback chiến thuật: ưu tiên các ô trống lân cận nước vừa đi (bán kính 2)
        if (!opponentPos && !isOpponentPass) {
          const candidateNeighbors: Position[] = [];
          for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              if (dx === 0 && dy === 0) continue;
              const nx = pos.x + dx;
              const ny = pos.y + dy;
              if (nx >= 0 && nx < 19 && ny >= 0 && ny < 19 && nextResult.board[ny][nx] === "empty") {
                candidateNeighbors.push({ x: nx, y: ny });
              }
            }
          }

          for (const cand of candidateNeighbors) {
            try {
              computeNextBoard(nextResult.board, cand, opponentColor);
              opponentPos = cand;
              break;
            } catch {
              continue;
            }
          }

          // Nếu lân cận đều không đi được, quét toàn bộ bàn cờ tìm bất kỳ ô trống hợp lệ nào
          if (!opponentPos) {
            for (let y = 0; y < 19 && !opponentPos; y++) {
              for (let x = 0; x < 19; x++) {
                if (nextResult.board[y][x] === "empty") {
                  try {
                    computeNextBoard(nextResult.board, { x, y }, opponentColor);
                    opponentPos = { x, y };
                    break;
                  } catch {
                    continue;
                  }
                }
              }
            }
          }
        }

        // 3. Áp dụng nước đi của đối thủ vào bàn cờ
        try {
          if (opponentPos) {
            const oppResult = computeNextBoard(nextResult.board, opponentPos, opponentColor);
            play(oppResult.capturedCount > 0 ? "capture" : "place");

            setCurrentPlayBoard(oppResult.board);
            setPlayMoveHistory([
              ...newHistory,
              { position: opponentPos, color: opponentColor, capturedCount: oppResult.capturedCount },
            ]);

            if (oppResult.capturedCount > 0) {
              setPlayerStuckNotice(
                `Đối thủ vừa bắt ${oppResult.capturedCount} quân của bạn.`
              );
            }
          } else {
            // Đối thủ Pass (bỏ lượt)
            play("place");
            setPlayMoveHistory([
              ...newHistory,
              { position: null, color: opponentColor, capturedCount: 0 },
            ]);
            setPlayerStuckNotice("Đối thủ đã bỏ lượt (Pass). Đến lượt bạn!");
          }
        } catch (e) {
          console.error("Lỗi khi đối thủ đi quân:", e);
          setPlayMoveHistory([
            ...newHistory,
            { position: null, color: opponentColor, capturedCount: 0 },
          ]);
        } finally {
          setIsOpponentThinking(false);
        }
      }, 600);
    },
    [
      isPlayerTurnInPlay,
      isOpponentThinking,
      gameOver,
      currentPlayBoard,
      game.playerToMove,
      playMoveHistory,
      play,
    ]
  );

  // Bỏ lượt (Pass)
  const handlePass = useCallback(() => {
    if (!isPlayerTurnInPlay || isOpponentThinking || gameOver?.over) return;

    const playerColor = game.playerToMove;
    const opponentColor = playerColor === "black" ? "white" : "black";

    const lastMove = playMoveHistory.length > 0 ? playMoveHistory[playMoveHistory.length - 1] : null;
    if (lastMove && lastMove.position === null) {
      // 2 lượt pass liên tiếp -> Kết thúc ván cờ
      play("place");
      setPlayMoveHistory([
        ...playMoveHistory,
        { position: null, color: playerColor, capturedCount: 0 },
      ]);
      setGameOver({
        over: true,
        winner: "draw",
        reason: "Cả hai bên đều đã bỏ lượt. Ván cờ đã chính thức kết thúc!",
      });
      return;
    }

    play("place");
    const newHistory: InteractiveMove[] = [
      ...playMoveHistory,
      { position: null, color: playerColor, capturedCount: 0 },
    ];
    setPlayMoveHistory(newHistory);
    setIsOpponentThinking(true);

    setTimeout(async () => {
      let opponentPos: Position | null = null;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const res = await fetch("http://localhost:8000/api/v1/get_move", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            board: currentPlayBoard.map((row) =>
              row.map((cell) => (cell === "black" ? 1 : cell === "white" ? -1 : 0))
            ),
            current_player: opponentColor === "black" ? 1 : -1,
            consecutive_passes: 1,
            difficulty: "medium",
          }),
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (
            data.action === "move" &&
            data.row !== undefined &&
            data.col !== undefined &&
            currentPlayBoard[data.row][data.col] === "empty"
          ) {
            opponentPos = { x: data.col, y: data.row };
          }
        }
      } catch {
        // ignore
      }

      if (opponentPos) {
        try {
          const oppResult = computeNextBoard(currentPlayBoard, opponentPos, opponentColor);
          play(oppResult.capturedCount > 0 ? "capture" : "place");
          setCurrentPlayBoard(oppResult.board);
          setPlayMoveHistory([
            ...newHistory,
            { position: opponentPos, color: opponentColor, capturedCount: oppResult.capturedCount },
          ]);
        } catch {
          setPlayMoveHistory([
            ...newHistory,
            { position: null, color: opponentColor, capturedCount: 0 },
          ]);
          setGameOver({
            over: true,
            winner: "draw",
            reason: "Cả hai bên đều đã bỏ lượt. Ván cờ kết thúc!",
          });
        }
      } else {
        // Đối thủ cũng pass -> Kết thúc
        play("place");
        setPlayMoveHistory([
          ...newHistory,
          { position: null, color: opponentColor, capturedCount: 0 },
        ]);
        setGameOver({
          over: true,
          winner: "draw",
          reason: "Cả hai bên đều đã bỏ lượt. Ván cờ kết thúc!",
        });
      }
      setIsOpponentThinking(false);
    }, 600);
  }, [
    isPlayerTurnInPlay,
    isOpponentThinking,
    gameOver,
    game.playerToMove,
    playMoveHistory,
    currentPlayBoard,
    play,
  ]);

  // Đầu hàng (Resign)
  const handleResign = useCallback(() => {
    if (isOpponentThinking || gameOver?.over) return;
    setGameOver({
      over: true,
      winner: "opponent",
      reason: `Bạn đã nhận thua. Bạn có thể nhấn "Xem kỳ phổ" để nghiên cứu lại cách danh thủ đã chiến thắng ván cờ này!`,
    });
  }, [isOpponentThinking, gameOver]);

  // Đi lại (Undo 2 nước: nước của đối thủ và nước của người chơi)
  const handleUndo = useCallback(() => {
    if (playMoveHistory.length < 2 || isOpponentThinking) return;

    // Tái tạo lại bàn cờ từ đầu đến nước n-2
    let b = cloneBoard(initialSetupBoard);
    const targetMoves = playMoveHistory.slice(0, playMoveHistory.length - 2);

    for (const m of targetMoves) {
      if (m.position) {
        try {
          const res = computeNextBoard(b, m.position, m.color);
          b = res.board;
        } catch {
          // bỏ qua
        }
      }
    }

    setCurrentPlayBoard(b);
    setPlayMoveHistory(targetMoves);
    setPlayerStuckNotice(null);
    setGameOver(null);
    setUndoCount((prev) => prev + 1);
  }, [playMoveHistory, isOpponentThinking, initialSetupBoard]);

  // Chơi lại từ đầu
  const handleRestart = useCallback(() => {
    setCurrentPlayBoard(initialSetupBoard);
    setPlayMoveHistory([]);
    setIsOpponentThinking(false);
    setPlayerStuckNotice(null);
    setGameOver(null);
    setHintsUsed(false);
    setUndoCount(0);
  }, [initialSetupBoard]);

  // Nước đi vừa đi gần nhất trên bàn cờ đang hiển thị
  const displayedLastMove = useMemo(() => {
    if (activeTab === "play") {
      if (playMoveHistory.length > 0) {
        return playMoveHistory[playMoveHistory.length - 1].position;
      }
      return null;
    }
    // Replay mode:
    if (replayIndex === 0) return null;
    if (parsedSgf && parsedSgf.moves[replayIndex - 1]) {
      return parsedSgf.moves[replayIndex - 1].position;
    }
    return actualPos;
  }, [activeTab, playMoveHistory, replayIndex, parsedSgf, actualPos]);

  // Bàn cờ đang hiển thị
  const displayedBoard =
    activeTab === "play"
      ? currentPlayBoard
      : replayBoardSequence[replayIndex] || initialSetupBoard;

  // Lời bình tại nước cờ đang xem trong replay
  const currentReplayComment = useMemo(() => {
    if (activeTab !== "replay" || !parsedSgf) return null;
    if (replayIndex === 0) {
      return "Thế cờ chuẩn bị trước thời khắc lịch sử.";
    }
    const move = parsedSgf.moves[replayIndex - 1];
    if (move && move.comment) {
      return move.comment;
    }
    if (replayIndex === 1) {
      return game.moveExplanation;
    }
    return null;
  }, [activeTab, parsedSgf, replayIndex, game.moveExplanation]);

  return (
    <div className="legendary-practice">
      {/* Thanh Header chính */}
      <header className="legendary-practice__header">
        <button className="legendary-btn legendary-btn--ghost" onClick={onBack}>
          <IconArrowLeft size={16} />
          <span>Danh sách</span>
        </button>

        <div className="legendary-practice__title-group">
          <div className="legendary-practice__meta-pills">
            <span className="legendary-pill">{ERA_NAMES[game.era] || game.era}</span>
            <span className="legendary-pill">{game.year}</span>
            <span className="legendary-pill">{game.tournament}</span>
          </div>
          <h2 className="legendary-practice__title">{game.title}</h2>
        </div>

        <div className="legendary-practice__tab-switch">
          <button
            className={`legendary-switch-btn ${activeTab === "play" ? "legendary-switch-btn--active" : ""}`}
            onClick={() => setActiveTab("play")}
          >
            <IconFlag size={15} />
            <span>Tự giải</span>
          </button>
          <button
            className={`legendary-switch-btn ${activeTab === "replay" ? "legendary-switch-btn--active" : ""}`}
            onClick={() => {
              setActiveTab("replay");
              setIsPlayingAuto(false);
            }}
          >
            <IconHistory size={15} />
            <span>Kỳ phổ</span>
          </button>
        </div>
      </header>

      {/* Dải thông tin kỳ thủ đối đầu */}
      <div className="legendary-players-strip">
        <div
          className={`legendary-player-box ${
            game.playerToMove === "black" ? "legendary-player-box--turn" : ""
          }`}
        >
          <span className="legendary-stone-icon legendary-stone-icon--black" />
          <div className="legendary-player-meta">
            <strong>{game.blackPlayer.name}</strong>
            <small>
              {game.blackPlayer.rank} · {COUNTRY_NAMES[game.blackPlayer.country] || game.blackPlayer.country}
            </small>
          </div>
          {game.playerToMove === "black" && (
            <span className="legendary-turn-chip">Lượt nhập vai</span>
          )}
        </div>

        <div className="legendary-vs-divider">VS</div>

        <div
          className={`legendary-player-box ${
            game.playerToMove === "white" ? "legendary-player-box--turn" : ""
          }`}
        >
          <span className="legendary-stone-icon legendary-stone-icon--white" />
          <div className="legendary-player-meta">
            <strong>{game.whitePlayer.name}</strong>
            <small>
              {game.whitePlayer.rank} · {COUNTRY_NAMES[game.whitePlayer.country] || game.whitePlayer.country}
            </small>
          </div>
          {game.playerToMove === "white" && (
            <span className="legendary-turn-chip">Lượt nhập vai</span>
          )}
        </div>
      </div>

      {/* Khu vực trung tâm: Bàn cờ + Bảng điều khiển */}
      <main className="legendary-practice__main">
        {/* CỘT BÀN CỜ */}
        <section className="legendary-practice__board-area">
          <div className="legendary-board-card">
            <Board
              board={displayedBoard}
              boardSize={19}
              onPointClick={activeTab === "play" ? handlePlayerMove : () => {}}
              disabled={activeTab !== "play" || !isPlayerTurnInPlay || isOpponentThinking || Boolean(gameOver?.over)}
              lastMove={displayedLastMove}
              showHints={false}
            />
          </div>

          {/* Dòng trạng thái dưới bàn cờ */}
          <div className="legendary-board-status">
            {activeTab === "play" ? (
              gameOver?.over ? (
                <span className="legendary-status-txt">Ván cờ kết thúc</span>
              ) : isOpponentThinking ? (
                <span className="legendary-status-txt legendary-status-txt--thinking">
                  Đối thủ đang suy nghĩ...
                </span>
              ) : playMoveHistory.length === 0 ? (
                <span className="legendary-status-txt">
                  Nước #{game.challengeMoveNumber} · Lượt của bạn
                </span>
              ) : (
                <span className="legendary-status-txt">
                  Nước #{game.challengeMoveNumber + playMoveHistory.length} · Lượt {isPlayerTurnInPlay ? "bạn" : "đối thủ"}
                </span>
              )
            ) : (
              <span className="legendary-status-txt">
                Kỳ phổ · Nước #{game.challengeMoveNumber + replayIndex - 1} /{" "}
                {game.challengeMoveNumber + (parsedSgf?.moves.length || 1) - 1}
              </span>
            )}
          </div>
        </section>

        {/* CỘT BÊN PHẢI: ĐIỀU KHIỂN & LỊCH SỬ */}
        <aside className="legendary-practice__sidebar">
          {activeTab === "play" ? (
            /* TAB 1: CHƠI TỰ DO ĐỂ CHIẾN THẮNG */
            <div className="legendary-panel">
              {/* NHIỆM VỤ CHIẾN DỊCH 3 SAO (⭐⭐⭐) */}
              <div className="legendary-mission-card">
                <div className="legendary-mission-card__header">
                  <div className="legendary-mission-card__title-wrap">
                    <IconStar size={18} color="#f59e0b" filled={missionResult.totalStars > 0} />
                    <span className="legendary-mission-card__title">NHIỆM VỤ CHIẾN DỊCH</span>
                  </div>
                  <div className="legendary-mission-card__stars-pill">
                    <span className="legendary-stars-count">{missionResult.totalStars}/3</span>
                    <div className="legendary-stars-icons">
                      <IconStar size={13} color="#f59e0b" filled={missionResult.star1.completed} />
                      <IconStar size={13} color="#f59e0b" filled={missionResult.star2.completed} />
                      <IconStar size={13} color="#f59e0b" filled={missionResult.star3.completed} />
                    </div>
                  </div>
                </div>

                <div className="legendary-mission-list">
                  {/* SAO 1 */}
                  <div className={`legendary-mission-item ${missionResult.star1.completed ? "legendary-mission-item--completed" : ""}`}>
                    <div className="legendary-mission-item__left">
                      <div className="legendary-star-badge">
                        <IconStar size={13} color="#f59e0b" filled={missionResult.star1.completed} />
                        <span>1</span>
                      </div>
                      <div className="legendary-mission-item__info">
                        <span className="legendary-mission-item__name">{starObjectives[0].title}</span>
                        <p className="legendary-mission-item__desc">{starObjectives[0].description}</p>
                      </div>
                    </div>
                    <span className={`legendary-mission-status-pill ${missionResult.star1.completed ? "legendary-mission-status-pill--success" : ""}`}>
                      {missionResult.star1.progressText}
                    </span>
                  </div>

                  {/* SAO 2 */}
                  <div className={`legendary-mission-item ${missionResult.star2.completed ? "legendary-mission-item--completed" : ""}`}>
                    <div className="legendary-mission-item__left">
                      <div className="legendary-star-badge">
                        <IconStar size={13} color="#f59e0b" filled={missionResult.star2.completed} />
                        <span>2</span>
                      </div>
                      <div className="legendary-mission-item__info">
                        <span className="legendary-mission-item__name">{starObjectives[1].title}</span>
                        <p className="legendary-mission-item__desc">{starObjectives[1].description}</p>
                      </div>
                    </div>
                    <span className={`legendary-mission-status-pill ${missionResult.star2.completed ? "legendary-mission-status-pill--success" : ""}`}>
                      {missionResult.star2.progressText}
                    </span>
                  </div>

                  {/* SAO 3 */}
                  <div className={`legendary-mission-item ${missionResult.star3.completed ? "legendary-mission-item--completed" : ""}`}>
                    <div className="legendary-mission-item__left">
                      <div className="legendary-star-badge">
                        <IconStar size={13} color="#f59e0b" filled={missionResult.star3.completed} />
                        <span>3</span>
                      </div>
                      <div className="legendary-mission-item__info">
                        <span className="legendary-mission-item__name">{starObjectives[2].title}</span>
                        <p className="legendary-mission-item__desc">{starObjectives[2].description}</p>
                      </div>
                    </div>
                    <span className={`legendary-mission-status-pill ${missionResult.star3.completed ? "legendary-mission-status-pill--success" : ""}`}>
                      {missionResult.star3.progressText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bối cảnh ván cờ */}
              <div className="legendary-panel__section">
                <div className="legendary-section-head">
                  <IconBookOpen size={17} />
                  <h3>Bối cảnh lịch sử</h3>
                </div>
                <p className="legendary-story-para">{game.contextStory}</p>
              </div>

              {/* Thông báo kết thúc ván nếu có */}
              {gameOver?.over && (
                <div className="legendary-gameover-card">
                  <div className="legendary-gameover-stars-wrap">
                    <IconStar size={26} color="#f59e0b" filled={missionResult.star1.completed} />
                    <IconStar size={34} color="#f59e0b" filled={missionResult.star2.completed} />
                    <IconStar size={26} color="#f59e0b" filled={missionResult.star3.completed} />
                  </div>
                  <h4 className="legendary-gameover-title">
                    {missionResult.totalStars === 3
                      ? "Đại Công Cáo Thành — Đạt 3 Sao!"
                      : missionResult.totalStars === 2
                      ? "Khải Hoàn Thắng Lợi — Đạt 2 Sao!"
                      : missionResult.totalStars === 1
                      ? "Đạt 1 Sao Chiến Dịch!"
                      : "Kết Thúc Ván Đấu"}
                  </h4>
                  <p className="legendary-gameover-desc">{gameOver.reason}</p>
                  <div className="legendary-gameover-actions">
                    <button className="legendary-btn legendary-btn--ghost" onClick={handleRestart}>
                      <IconRotateCcw size={15} />
                      <span>Chơi lại</span>
                    </button>
                    <button
                      className="legendary-btn legendary-btn--primary"
                      onClick={() => {
                        setActiveTab("replay");
                        setReplayIndex(1);
                      }}
                    >
                      <IconHistory size={15} />
                      <span>Xem kỳ phổ</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Thông báo thế bí hoặc phản đòn nếu có */}
              {playerStuckNotice && !gameOver?.over && (
                <div className="legendary-alert legendary-alert--stuck">
                  <p>{playerStuckNotice}</p>
                </div>
              )}

              {/* Các nút hành động chiến đấu */}
              <div className="legendary-controls-grid">
                <button
                  className="legendary-ctrl-btn"
                  onClick={handlePass}
                  disabled={!isPlayerTurnInPlay || isOpponentThinking || Boolean(gameOver?.over)}
                  title="Bỏ lượt đi của bạn"
                >
                  <span>Bỏ lượt</span>
                </button>

                <button
                  className="legendary-ctrl-btn legendary-ctrl-btn--danger"
                  onClick={handleResign}
                  disabled={isOpponentThinking || Boolean(gameOver?.over)}
                  title="Nhận thua ván đấu"
                >
                  <span>Đầu hàng</span>
                </button>

                <button
                  className="legendary-ctrl-btn"
                  onClick={handleUndo}
                  disabled={playMoveHistory.length < 2 || isOpponentThinking}
                  title="Đi lại 2 nước vừa rồi"
                >
                  <IconUndo size={16} />
                  <span>Đi lại</span>
                </button>

                <button
                  className="legendary-ctrl-btn"
                  onClick={handleRestart}
                  disabled={playMoveHistory.length === 0}
                  title="Đặt lại thế cờ ban đầu"
                >
                  <IconRotateCcw size={16} />
                  <span>Chơi lại</span>
                </button>

                <button
                  className="legendary-ctrl-btn"
                  onClick={() => {
                    setShowRiddleModal(true);
                    setHintsUsed(true);
                  }}
                  title="Xem gợi ý"
                >
                  <IconBookOpen size={16} />
                  <span>Gợi ý</span>
                </button>

                <button
                  className="legendary-ctrl-btn legendary-ctrl-btn--primary"
                  onClick={() => {
                    setActiveTab("replay");
                    setReplayIndex(1);
                  }}
                  title="Xem toàn bộ nước đi thực tế của tuyển thủ"
                >
                  <IconHistory size={16} />
                  <span>Xem kỳ phổ</span>
                </button>
              </div>

              {/* Bài học cờ vây */}
              <div className="legendary-lesson-card">
                <span className="legendary-lesson-title">ĐÚC KẾT</span>
                <p className="legendary-lesson-body">{game.lesson}</p>
              </div>
            </div>
          ) : (
            /* TAB 2: MÔ PHỎNG KỲ PHỔ (TIMELINE REPLAYER) */
            <div className="legendary-panel">
              <div className="legendary-panel__section">
                <div className="legendary-section-head">
                  <IconHistory size={17} />
                  <h3>Diễn biến ván cờ</h3>
                </div>
                <p className="legendary-story-para">
                  Nước #{game.challengeMoveNumber} đến khi kết thúc ván ({game.blackPlayer.name} vs {game.whitePlayer.name}).
                </p>
              </div>

              {/* Bộ điều khiển Timeline Scrubbing */}
              <div className="legendary-timeline-controller">
                <div className="legendary-timeline-slider-row">
                  <input
                    type="range"
                    min={0}
                    max={replayBoardSequence.length - 1}
                    value={replayIndex}
                    onChange={(e) => {
                      setReplayIndex(Number(e.target.value));
                      setIsPlayingAuto(false);
                      play("place");
                    }}
                    className="legendary-timeline-slider"
                  />
                  <div className="legendary-timeline-counter">
                    <span>#{game.challengeMoveNumber + replayIndex - 1}</span>
                  </div>
                </div>

                <div className="legendary-playback-btns">
                  <button
                    className="legendary-playback-btn"
                    onClick={() => {
                      setReplayIndex(0);
                      setIsPlayingAuto(false);
                    }}
                    title="Về thế cờ ban đầu"
                  >
                    <IconSkipBack size={16} />
                  </button>

                  <button
                    className="legendary-playback-btn"
                    onClick={() => {
                      setReplayIndex((prev) => Math.max(0, prev - 1));
                      setIsPlayingAuto(false);
                    }}
                    disabled={replayIndex === 0}
                    title="Lùi 1 nước"
                  >
                    <IconStepBack size={16} />
                  </button>

                  <button
                    className="legendary-playback-btn legendary-playback-btn--play"
                    onClick={() => setIsPlayingAuto(!isPlayingAuto)}
                    title={isPlayingAuto ? "Tạm dừng" : "Tự động phát"}
                  >
                    {isPlayingAuto ? <IconPause size={18} /> : <IconPlay size={18} />}
                  </button>

                  <button
                    className="legendary-playback-btn"
                    onClick={() => {
                      setReplayIndex((prev) => Math.min(replayBoardSequence.length - 1, prev + 1));
                      setIsPlayingAuto(false);
                      play("place");
                    }}
                    disabled={replayIndex >= replayBoardSequence.length - 1}
                    title="Tiến 1 nước"
                  >
                    <IconStepForward size={16} />
                  </button>

                  <button
                    className="legendary-playback-btn"
                    onClick={() => {
                      setReplayIndex(replayBoardSequence.length - 1);
                      setIsPlayingAuto(false);
                    }}
                    title="Đến nước kết thúc ván"
                  >
                    <IconSkipForward size={16} />
                  </button>
                </div>
              </div>

              {/* Lời bình luận chi tiết tại nước đi đang xem */}
              <div className="legendary-commentary-box">
                <span className="legendary-commentary-head">
                  {replayIndex === 1
                    ? `★ Nước Then Chốt: ${posLabel(actualPos)}`
                    : `Diễn biến nước #${game.challengeMoveNumber + replayIndex - 1}`}
                </span>
                <p className="legendary-commentary-text">
                  {currentReplayComment ||
                    (replayIndex === 1
                      ? game.moveExplanation
                      : `Hai bên tiếp tục giằng co thế trận.`)}
                </p>
                {replayIndex > 1 && (
                  <p className="legendary-commentary-sub">{game.afterStory}</p>
                )}
              </div>

              {/* Danh sách nước đi (Sheet) để click tua nhanh */}
              {parsedSgf && parsedSgf.moves.length > 0 && (
                <div className="legendary-sheet-container">
                  <span className="legendary-sheet-title">KỲ PHỔ</span>
                  <div className="legendary-sheet-grid">
                    {parsedSgf.moves.map((m, idx) => {
                      const moveNum = game.challengeMoveNumber + idx;
                      const isCurrent = replayIndex === idx + 1;
                      const isActualKey = idx === 0;

                      return (
                        <button
                          key={idx}
                          className={`legendary-sheet-cell ${isCurrent ? "legendary-sheet-cell--active" : ""} ${
                            isActualKey ? "legendary-sheet-cell--key" : ""
                          }`}
                          onClick={() => {
                            setReplayIndex(idx + 1);
                            setIsPlayingAuto(false);
                            play("place");
                          }}
                        >
                          <span className={`legendary-cell-stone legendary-cell-stone--${m.color}`} />
                          <span className="legendary-cell-num">#{moveNum}</span>
                          <span className="legendary-cell-pos">{posLabel(m.position)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Nút quay lại thực chiến hoặc ván tiếp */}
              <div className="legendary-action-row">
                <button
                  className="legendary-btn legendary-btn--ghost"
                  onClick={() => setActiveTab("play")}
                >
                  <IconUndo size={15} />
                  <span>Thử lại</span>
                </button>

                {hasPrevGame && onPrevGame && (
                  <button className="legendary-btn legendary-btn--ghost" onClick={onPrevGame}>
                    <IconStepBack size={15} />
                    <span>Ván trước</span>
                  </button>
                )}

                {hasNextGame && onNextGame && (
                  <button className="legendary-btn legendary-btn--primary" onClick={onNextGame}>
                    <span>Ván tiếp</span>
                    <IconStepForward size={15} />
                  </button>
                )}
              </div>
            </div>
          )}
        </aside>
      </main>

      {/* MODAL GỢI Ý (LỜI ĐIỂM ĐẠO) */}
      {showRiddleModal && (
        <div className="legendary-modal-backdrop" onClick={() => setShowRiddleModal(false)}>
          <div className="legendary-riddle-modal" onClick={(e) => e.stopPropagation()}>
            <div className="legendary-riddle-icon-wrap">
              <IconBookOpen size={24} />
            </div>
            <h3 className="legendary-riddle-title">Lời Điểm Đạo</h3>
            <blockquote className="legendary-riddle-quote">
              “{game.crypticHint}”
            </blockquote>
            <button
              className="legendary-btn legendary-btn--primary"
              onClick={() => setShowRiddleModal(false)}
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
