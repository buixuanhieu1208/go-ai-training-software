// src/App.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnalysisPanel } from "./components/AnalysisPanel/AnalysisPanel";
import { useRefereeAnalysis } from "./hooks/useRefereeAnalysis";
import { GameLayout } from "./components/Layout/GameLayout";
import { GameBackdrop } from "./components/Layout/GameBackdrop";
import { Board } from "./components/Board/Board";
import { WinRateBar } from "./components/WinRateBar/WinRateBar";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { MoveHistory } from "./components/MoveHistory/MoveHistory";
import { TsumegoHub } from "./components/Tsumego/TsumegoHub";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { RulesModal } from "./components/RulesModal/RulesModal";
import { ComboToast, type ComboToastMessage } from "./components/Effects/ComboToast";
import { PlayerCard } from "./components/PlayerCard/PlayerCard";
import { StoneBowl } from "./components/StoneBowl/StoneBowl";
import { ChatBox } from "./components/ChatBox/ChatBox";
import { useGameState } from "./hooks/useGameState";
import { useAiAnalysis } from "./hooks/useAiAnalysis";
import { useSound } from "./hooks/useSound";
import type { BoardSize, FloatingScoreEffect } from "./types/go";
import type { GameMode } from "./types/mode";
import GameRoom from "./components/GameRoom";
import "./styles/tokens.css";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import LocalGameRoom from "./components/LocalGameRoom";
import JoinRoom from "./components/JoinRoom";
import OnlineHub from "./components/Online/OnlineHub";
import ProfilePage from "./components/Profile/ProfilePage";
import AddFriend from "./components/AddFriend";
import { GameResultModal } from "./components/GameResult/GameResultModal";
import { GameSetupModal } from "./components/GameSetup/GameSetupModal";
import { GameReviewModal } from "./components/Analysis/GameReviewModal";
import { generateGameReviewReport } from "./utils/reviewEvaluator";
import type { GameReviewReport } from "./types/review";
import { calculateScore } from "./utils/goRules";
import { generateSgfString, downloadSgfFile } from "./utils/sgfExporter";
import { ErrorBoundary } from "./components/ErrorBoundary";

type Screen = "menu" | "game" | "login" | "register";

const STONES_PER_BOWL = 180;
const AI_API_URL = "http://localhost:8000/api/v1/get_move";

const MODE_LABEL: Record<GameMode, string> = {
  "pvp-local": "PvP — Cùng máy",
  "pvp-online": "PvP — Trực tuyến",
  pve: "PvE — Đấu với AI",
  eve: "EvE — AI vs AI",
  tsumego: "Luyện Tsumego",
};

interface BackendMoveResponse {
  action: "move" | "pass" | "end";
  row?: number;
  col?: number;
  black_score?: number;
  white_score?: number;
  winner?: "black" | "white";
}

function parseRoute(pathname: string): { screen: Screen; mode: GameMode } {
  const p = pathname.toLowerCase().replace(/\/+$/, "") || "/";
  if (p === "/login") return { screen: "login", mode: "pvp-local" };
  if (p === "/register") return { screen: "register", mode: "pvp-local" };
  if (p === "/tsumego" || p === "/play/tsumego") return { screen: "game", mode: "tsumego" };
  if (p === "/pve" || p === "/play/pve") return { screen: "game", mode: "pve" };
  if (p === "/pvp" || p === "/play/pvp" || p === "/play/pvp-local" || p === "/play/local") return { screen: "game", mode: "pvp-local" };
  if (p === "/eve" || p === "/play/eve") return { screen: "game", mode: "eve" };
  return { screen: "menu", mode: "pvp-local" };
}

// ============================================================================
// GameApp — TOÀN BỘ logic chơi cục bộ (local state, không qua Firestore):
// pvp-local, pve (gọi thẳng Backend AI), eve, tsumego. Hỗ trợ URL route
// trực tiếp (/pve, /pvp, /eve, /tsumego) để khi F5 / refresh không bị văng về home.
// ============================================================================
function GameApp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [aiDifficulty, setAiDifficulty] = useState<"easy" | "medium" | "hard">("hard");
  const [playerColor, setPlayerColor] = useState<"black" | "white">("black");
  const [ruleSet, setRuleSet] = useState<"chinese" | "japanese">("chinese");
  const [screen, setScreen] = useState<Screen>(() => parseRoute(window.location.pathname).screen);
  const [mode, setMode] = useState<GameMode>(() => parseRoute(window.location.pathname).mode);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(
    () => parseRoute(window.location.pathname).screen === "game" && parseRoute(window.location.pathname).mode !== "tsumego"
  );

  // Đồng bộ state khi URL trên thanh địa chỉ thay đổi (F5, bấm nút browser back/forward, direct link)
  useEffect(() => {
    const parsed = parseRoute(location.pathname);
    setScreen(parsed.screen);
    setMode(parsed.mode);
    if (parsed.screen === "game" && parsed.mode !== "tsumego") {
      setIsSetupModalOpen((prev) => (!isGameStarted ? true : prev));
    } else {
      setIsSetupModalOpen(false);
    }
  }, [location.pathname, isGameStarted]);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [boardSize, setBoardSize] = useState<BoardSize>(19);
  const [evePaused, setEvePaused] = useState(false);
  // Lý do kết thúc ván + điểm từ Backend (nếu có) để hiển thị GameResultModal.
  const [gameEndReason, setGameEndReason] = useState<"resign" | "double-pass" | "end" | null>(null);
  const [backendScore, setBackendScore] = useState<{ black: number; white: number } | null>(null);
  // Modal Review & Phân tích chuyên sâu ván đấu (Winrate Graph, Quality dots, Variations)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewReport, setReviewReport] = useState<GameReviewReport | null>(null);

  // === isAiThinking: Cờ báo hiệu đang chờ AI Engine Python tính nước đi. ===
  // Khác với isHintThinking (của useAiAnalysis) chỉ dùng để hiện loading cho WinRateBar,
  // isAiThinking dùng để khoá bàn cờ và nút Undo để người chơi không can thiệp lúc AI đang nghĩ.
  const [isAiThinking, setIsAiThinking] = useState(false);
  const aiRequestInFlight = useRef(false);

  const { gameState, placeStone, pass, resign, undo, resetGame } = useGameState(boardSize);
  const { analysis, isThinking: isHintThinking, hintsEnabled, setHintsEnabled } = useAiAnalysis(
    gameState.board,
    gameState.currentPlayer,
    gameState.moveHistory.length
  );
  const {
    result: refereeResult,
    isLoading: isAnalyzing,
    error: analysisError,
    runAnalysis,
    clear: clearAnalysis,
  } = useRefereeAnalysis();
  const { play, enabled: soundEnabled, setEnabled: setSoundEnabled } = useSound();

  // ---- Hiệu ứng: "+N" nổi lên khi bắt quân + banner "Combo x N" (giữ nguyên từ tv2) ----
  const [floatingScores, setFloatingScores] = useState<FloatingScoreEffect[]>([]);
  const [comboMessage, setComboMessage] = useState<ComboToastMessage | null>(null);
  const comboCountRef = useRef(0);
  const effectIdRef = useRef(0);

  const prevMoveCount = useRef(gameState.moveHistory.length);
  const lastMove = gameState.moveHistory[gameState.moveHistory.length - 1];

  useEffect(() => {
    if (gameState.moveHistory.length > prevMoveCount.current) {
      const last = gameState.moveHistory[gameState.moveHistory.length - 1];

      if (last.position === null) {
        play("pass");
        comboCountRef.current = 0;
      } else if (last.isCapture && last.capturedCount) {
        play("capture");
        comboCountRef.current += 1;

        const positions = last.capturedPositions?.length ? last.capturedPositions : [last.position];
        if (positions.length > 0) {
          const cx = positions.reduce((sum, p) => sum + p.x, 0) / positions.length;
          const cy = positions.reduce((sum, p) => sum + p.y, 0) / positions.length;

          const scoreId = effectIdRef.current++;
          setFloatingScores((prev) => [
            ...prev,
            { id: scoreId, x: cx, y: cy, value: last.capturedCount!, color: last.color },
          ]);
          setTimeout(() => {
            setFloatingScores((prev) => prev.filter((f) => f.id !== scoreId));
          }, 1100);
        }

        if (comboCountRef.current >= 2) {
          const comboId = effectIdRef.current++;
          setComboMessage({ id: comboId, count: comboCountRef.current, color: last.color });
          setTimeout(() => {
            setComboMessage((current) => (current?.id === comboId ? null : current));
          }, 1400);
        }
      } else {
        play("place");
        comboCountRef.current = 0;
      }
    }
    prevMoveCount.current = gameState.moveHistory.length;
  }, [gameState.moveHistory, play]);

  // ---- Xác định khi nào lượt đi hiện tại thuộc về AI Engine Backend ----
  // PvE: AI đảm nhiệm bên đối diện playerColor.
  // EvE: cả 2 bên đều do AI đảm nhiệm, trừ khi đang tạm dừng (evePaused).
  // Chỉ kích hoạt khi ván đấu đã được người chơi bấm Bắt đầu (isGameStarted).
  const isPveAiTurn = mode === "pve" && gameState.currentPlayer !== playerColor;
  const isAiControlledTurn =
    isGameStarted &&
    !gameState.isFinished &&
    ((mode === "pve" && isPveAiTurn) || (mode === "eve" && !evePaused));

  // === LUỒNG KẾT NỐI BACKEND THẬT (AI Engine) ===
  // Effect này gọi thẳng POST /api/v1/get_move của Backend Python mỗi khi tới lượt
  // AI, dịch bàn cờ chữ ("black"/"white"/"empty") sang số (1/-1/0) đúng
  // contract mà Backend đang chờ, rồi áp nước đi trả về bằng placeStone/pass.
  useEffect(() => {
    if (!isAiControlledTurn || gameState.isFinished || aiRequestInFlight.current) return;

    const fetchAiMove = async () => {
      aiRequestInFlight.current = true;
      setIsAiThinking(true);

      try {
        // 1. Đếm số lần pass liên tiếp
        let passes = 0;
        for (let i = gameState.moveHistory.length - 1; i >= 0; i--) {
          if (gameState.moveHistory[i].position === null) passes++;
          else break;
        }

        // 2. Dịch bàn cờ Frontend (chữ) -> Backend (số): black=1, white=-1, empty=0
        const backendBoard = gameState.board.map((row) =>
          row.map((cell) => (cell === "black" ? 1 : cell === "white" ? -1 : 0))
        );
        const currentPlayerNumeric = gameState.currentPlayer === "black" ? 1 : -1;

        // 3. GỌI API BACKEND
        const response = await fetch(AI_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            board: backendBoard,
            current_player: currentPlayerNumeric,
            consecutive_passes: passes,
            difficulty: aiDifficulty,
            // Điều 9 (KO): Backend không giữ lịch sử giữa các request nên phải gửi điểm đang bị cấm.
            // Backend dùng [hàng, cột] = [y, x].
            ko_point: gameState.koPoint ? [gameState.koPoint.y, gameState.koPoint.x] : null,
          }),
        });

        if (!response.ok) {
          // Lấy thông điệp lỗi Backend (vd: 422 "Thế cờ bất hợp lệ") để báo cho người chơi.
          let detail = "";
          try {
            const body = await response.json();
            detail = typeof body?.detail === "string" ? body.detail : JSON.stringify(body?.detail ?? "");
          } catch {
            /* body không phải JSON */
          }
          throw new Error(`Backend trả lỗi ${response.status}${detail ? ` — ${detail}` : ""}`);
        }

        // 4. XỬ LÝ KẾT QUẢ TRẢ VỀ
        const data: BackendMoveResponse = await response.json();

        if (data.action === "end") {
          // Backend kết thúc ván — lưu điểm và đánh dấu isFinished
          setBackendScore({
            black: data.black_score ?? 0,
            white: data.white_score ?? 0,
          });
          resign();
          setGameEndReason('end');
          return;
        } else if (data.action === "pass") {
          const lastMove = gameState.moveHistory[gameState.moveHistory.length - 1];
          if (lastMove && lastMove.position === null) setGameEndReason('double-pass');
          pass();
        } else if (data.action === "move" && data.row !== undefined && data.col !== undefined) {
          const success = placeStone({ x: data.col, y: data.row });
          if (!success) {
            console.warn("AI trả về nước đi không hợp lệ, tự động pass.", data);
            const lastMove = gameState.moveHistory[gameState.moveHistory.length - 1];
            if (lastMove && lastMove.position === null) setGameEndReason('double-pass');
            pass();
          }
        }
      } catch (error) {
        console.error("Lỗi khi kết nối với AI Engine:", error);
        // Trước đây lỗi chỉ ghi console -> lượt vẫn của AI, bàn cờ bị khóa, người chơi không biết vì sao.
        // Giờ báo rõ và mở lối thoát: Undo / Ván mới (EvE thì tự tạm dừng, bấm tiếp tục để thử lại).
        if (mode === "eve") setEvePaused(true);
        const reason = error instanceof Error ? error.message : String(error);
        alert(`⚠️ AI không thể đi nước này.\n\n${reason}\n\nBạn có thể bấm Undo (hoàn nước) hoặc Ván mới.`);
      } finally {
        setIsAiThinking(false);
        aiRequestInFlight.current = false;
      }
    };

    fetchAiMove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAiControlledTurn, gameState.currentPlayer, gameState.isFinished, aiDifficulty]);

  const annotatedMoveHistory = useMemo(() => {
    if (!refereeResult) return gameState.moveHistory;
    const tagByIndex = new Map(refereeResult.annotatedMoves.map((m) => [m.index, m.mistakeTag]));
    return gameState.moveHistory.map((m) => ({
      ...m,
      mistakeTag: tagByIndex.get(m.index) ?? m.mistakeTag ?? null,
    }));
  }, [gameState.moveHistory, refereeResult]);

  // Tự động sinh báo cáo đánh giá ván cờ (Game Review Report) để cập nhật màu chất lượng nước đi
  useEffect(() => {
    if (gameState.moveHistory.length > 0) {
      generateGameReviewReport(boardSize, gameState.moveHistory)
        .then((rep) => setReviewReport(rep))
        .catch(() => {});
    } else {
      setReviewReport(null);
    }
  }, [gameState.moveHistory.length, boardSize]);

  const handleAnalyzeGame = () => {
    if (gameState.moveHistory.length === 0) return;
    runAnalysis(boardSize, gameState.moveHistory);
    generateGameReviewReport(boardSize, gameState.moveHistory)
      .then((rep) => setReviewReport(rep))
      .catch(() => {});
  };

  const clearEffects = () => {
    comboCountRef.current = 0;
    setFloatingScores([]);
    setComboMessage(null);
  };

  // ---- Undo: PvE hoàn 2 nước (AI + người chơi), các mode khác hoàn 1 nước ----
  const handleUndo = useCallback(() => {
    if (mode === "pve") {
      // Edge case: nếu chỉ còn 1 nước trong lịch sử (người chơi đi nhưng AI chưa trả lời),
      // chỉ undo 1 lần. Bình thường undo 2 lần (nước AI + nước người chơi).
      const moveCount = gameState.moveHistory.length;
      if (moveCount >= 2) {
        undo(); // undo nước AI (trắng)
        undo(); // undo nước người chơi (đen)
      } else {
        undo(); // chỉ 1 nước
      }
      // Reset cờ AI để tránh state cũ kích hoạt request mới sai lúc
      aiRequestInFlight.current = false;
    } else {
      undo();
    }
  }, [mode, gameState.moveHistory.length, undo]);

  // ---- Resign có gắn lý do kết thúc ----
  const handleResign = useCallback(() => {
    resign();
    setGameEndReason('resign');
  }, [resign]);

  // ---- Pass có theo dõi double-pass ----
  const handlePass = useCallback(() => {
    // Kiểm tra xem nước pass này có gây double-pass không (kết thúc ván)
    const lastMove = gameState.moveHistory[gameState.moveHistory.length - 1];
    const willDoublePass = Boolean(lastMove && lastMove.position === null);
    pass();
    if (willDoublePass) {
      setGameEndReason('double-pass');
    }
  }, [pass, gameState.moveHistory]);

  // ---- Tính điểm khi ván đấu kết thúc ----
  const scoreResult = useMemo(() => {
    if (!gameState.isFinished) return null;
    const currentKomi = ruleSet === "chinese" ? 7.5 : 6.5;
    if (backendScore) {
      return {
        blackScore: backendScore.black,
        whiteScore: backendScore.white,
        blackTerritory: 0,
        whiteTerritory: 0,
        blackStonesOnBoard: 0,
        whiteStonesOnBoard: 0,
        territoryMap: [],
        ruleSet,
        komi: currentKomi,
      } as ReturnType<typeof calculateScore>;
    }
    return calculateScore(
      gameState.board,
      gameState.capturedBlack,
      gameState.capturedWhite,
      currentKomi,
      ruleSet
    );
  }, [gameState.isFinished, gameState.board, gameState.capturedBlack, gameState.capturedWhite, backendScore, ruleSet]);

  const handleExportSgf = useCallback(() => {
    if (gameState.moveHistory.length === 0) return;
    const currentKomi = ruleSet === "chinese" ? 7.5 : 6.5;
    const pBlack = mode === "pve" ? (playerColor === "black" ? "Bạn" : "AI Engine") : "Người chơi 1 (Đen)";
    const pWhite = mode === "pve" ? (playerColor === "white" ? "Bạn" : "AI Engine") : "Người chơi 2 (Trắng)";
    const dateStr = new Date().toISOString().slice(0, 10);
    const sgf = generateSgfString({
      boardSize,
      moveHistory: gameState.moveHistory,
      playerBlack: pBlack,
      playerWhite: pWhite,
      ruleSet,
      komi: currentKomi,
      result: gameState.isFinished
        ? (scoreResult ? (scoreResult.blackScore > scoreResult.whiteScore ? "B+Win" : "W+Win") : "Resign")
        : "In Progress",
      date: dateStr,
    });
    downloadSgfFile(`ky_pho_${dateStr}_van_dau.sgf`, sgf);
  }, [boardSize, gameState.moveHistory, gameState.isFinished, mode, playerColor, ruleSet, scoreResult]);

  const handleSelectMode = (nextMode: GameMode) => {
    if (nextMode === "pvp-online") {
      navigate("/online");
      return;
    }
    setEvePaused(false);
    clearEffects();
    setGameEndReason(null);
    setBackendScore(null);
    setMode(nextMode);
    setScreen("game");
    setIsGameStarted(false);

    if (nextMode === "tsumego") {
      setIsSetupModalOpen(false);
      navigate("/tsumego");
    } else {
      setIsSetupModalOpen(true);
      if (nextMode === "pve") {
        navigate("/pve");
      } else if (nextMode === "eve") {
        navigate("/eve");
      } else if (nextMode === "pvp-local") {
        navigate("/pvp");
      }
    }
  };

  const handleStartGame = (config: {
    boardSize: BoardSize;
    difficulty: "easy" | "medium" | "hard";
    playerColor: "black" | "white";
    ruleSet?: "chinese" | "japanese";
  }) => {
    setBoardSize(config.boardSize);
    setAiDifficulty(config.difficulty);
    setPlayerColor(config.playerColor);
    if (config.ruleSet) {
      setRuleSet(config.ruleSet);
    }
    resetGame(config.boardSize);
    clearEffects();
    clearAnalysis();
    setGameEndReason(null);
    setBackendScore(null);
    setEvePaused(false);
    setIsGameStarted(true);
    setIsSetupModalOpen(false);
  };

  const handleApplyOptionsMidGame = (options: {
    difficulty: "easy" | "medium" | "hard";
    ruleSet: "chinese" | "japanese";
  }) => {
    setAiDifficulty(options.difficulty);
    setRuleSet(options.ruleSet);
    setIsSetupModalOpen(false);
  };

  const handleBackToMenu = () => {
    setIsSetupModalOpen(false);
    setIsGameStarted(false);
    navigate("/");
  };
  const handleOpenLogin = () => navigate("/login");
  const handleOpenRegister = () => navigate("/register");

  const handleResetGame = () => {
    setIsSetupModalOpen(true);
    setIsGameStarted(false);
    resetGame(boardSize);
    setEvePaused(false);
    clearEffects();
    clearAnalysis();
    setGameEndReason(null);
    setBackendScore(null);
  };

  const header = (
    <div className="app-header">
      <div className="app-header__title">
        {screen === "game" && (
          <button className="app-header__back" onClick={handleBackToMenu} type="button">
            ← Menu
          </button>
        )}
        <span className="app-header__logo">碁</span>
        <div>
          <div className="app-header__name">
            {screen === "menu" ? "Huấn luyện viên ảo AI — Cờ vây" : MODE_LABEL[mode]}
          </div>
          <div className="app-header__subtitle">Luyện tập &amp; phân tích thế cờ theo thời gian thực</div>
        </div>
      </div>

      {screen === "game" && mode !== "tsumego" && (
        <div className="app-header__right-controls">
          <div className="app-header__info-badges">
            <span className="app-header__info-pill">Bàn {boardSize}×{boardSize}</span>
            {(mode === "pve" || mode === "eve") && (
              <span className="app-header__info-pill app-header__info-pill--accent">
                Độ khó: {aiDifficulty === "easy" ? "Dễ" : aiDifficulty === "medium" ? "Trung bình" : "Khó"}
              </span>
            )}
            <span className="app-header__info-pill">
              {ruleSet === "chinese" ? "Luật Trung Quốc" : "Luật Nhật Bản"}
            </span>
          </div>

          <button
            type="button"
            className="board-size-btn board-size-btn--setup"
            onClick={() => setIsSetupModalOpen(true)}
            title="Mở bảng cài đặt kích thước bàn cờ & độ khó"
          >
            ⚙ Tùy chọn ván đấu
          </button>
        </div>
      )}

      <button className="app-header__rules-btn" onClick={() => setRulesOpen(true)} type="button" aria-label="Hướng dẫn luật chơi">
        Luật chơi
      </button>
    </div>
  );

  const rulesModal = <RulesModal open={rulesOpen} onClose={() => setRulesOpen(false)} />;

  if (screen === "login") {
    return <Login onBackHome={handleBackToMenu} onGoRegister={handleOpenRegister} onAuthenticated={handleBackToMenu} />;
  }

  if (screen === "register") {
    return <Register onBackHome={handleBackToMenu} onGoLogin={handleOpenLogin} onAuthenticated={handleBackToMenu} />;
  }

  if (screen === "menu") {
    return (
      <>
        <Home
          onSelectMode={handleSelectMode}
          onGoOnline={() => navigate("/online")}
          onOpenRules={() => setRulesOpen(true)}
          onOpenLogin={handleOpenLogin}
          onOpenRegister={handleOpenRegister}
        />
        {rulesModal}
      </>
    );
  }

  if (mode === "tsumego") {
    return (
      <div className="game-layout">
        <GameBackdrop />
        <header className="game-layout__header">{header}</header>
        <TsumegoHub />
        {rulesModal}
        <ChatBox />
      </div>
    );
  }

  const boardDisabled =
    !isGameStarted ||
    isSetupModalOpen ||
    gameState.isFinished ||
    mode === "eve" ||
    isPveAiTurn ||
    isAiThinking;

  const roleLabels: { black: string; white: string } =
    mode === "pve"
      ? {
          black:
            playerColor === "black"
              ? "Bạn (Quân Đen)"
              : isAiThinking
              ? "AI Engine (đang suy nghĩ...)"
              : "AI Engine (Quân Đen)",
          white:
            playerColor === "white"
              ? "Bạn (Quân Trắng)"
              : isAiThinking
              ? "AI Engine (đang suy nghĩ...)"
              : "AI Engine (Quân Trắng)",
        }
      : mode === "eve"
      ? {
          black:
            isAiThinking && gameState.currentPlayer === "black"
              ? "AI Engine 1 (đang suy nghĩ...)"
              : "AI Engine 1 (Quân Đen)",
          white:
            isAiThinking && gameState.currentPlayer === "white"
              ? "AI Engine 2 (đang suy nghĩ...)"
              : "AI Engine 2 (Quân Trắng)",
        }
      : { black: "Người chơi 1 (Đen)", white: "Người chơi 2 (Trắng)" };

  const opponentColor = playerColor === "black" ? "white" : "black";
  const myColor = playerColor;

  const stonesUsedBlack = gameState.moveHistory.filter((m) => m.color === "black" && m.position !== null).length;
  const stonesUsedWhite = gameState.moveHistory.filter((m) => m.color === "white" && m.position !== null).length;


  return (
    <>
      <GameLayout
        header={header}
        moveHistory={
          <>
            <MoveHistory
              moves={annotatedMoveHistory}
              onExportSgf={handleExportSgf}
              evaluations={reviewReport?.evaluations}
            />
            <AnalysisPanel
              result={refereeResult}
              isLoading={isAnalyzing}
              error={analysisError}
              onAnalyze={handleAnalyzeGame}
              onOpenReviewModal={() => setIsReviewModalOpen(true)}
              disabled={gameState.moveHistory.length === 0 || isAiThinking}
            />
          </>
        }
        leftBowl={
          <StoneBowl
            color="black"
            side="left"
            label="Hũ quân Đen"
            total={STONES_PER_BOWL}
            remaining={Math.max(0, STONES_PER_BOWL - stonesUsedBlack)}
          />
        }
        rightBowl={
          <StoneBowl
            color="white"
            side="right"
            label="Hũ quân Trắng"
            total={STONES_PER_BOWL}
            remaining={Math.max(0, STONES_PER_BOWL - stonesUsedWhite)}
          />
        }
        topBar={
          mode === "pve" ? (
            <PlayerCard
              color={opponentColor}
              label={roleLabels[opponentColor]}
              capturedCount={opponentColor === "black" ? gameState.capturedBlack : gameState.capturedWhite}
              isActive={isGameStarted && !gameState.isFinished && gameState.currentPlayer === opponentColor}
            />
          ) : (
            <PlayerCard
              color="white"
              label={roleLabels.white}
              capturedCount={gameState.capturedWhite}
              isActive={isGameStarted && !gameState.isFinished && gameState.currentPlayer === "white"}
            />
          )
        }
        bottomBar={
          mode === "pve" ? (
            <PlayerCard
              color={myColor}
              label={roleLabels[myColor]}
              capturedCount={myColor === "black" ? gameState.capturedBlack : gameState.capturedWhite}
              isActive={isGameStarted && !gameState.isFinished && gameState.currentPlayer === myColor}
            />
          ) : (
            <PlayerCard
              color="black"
              label={roleLabels.black}
              capturedCount={gameState.capturedBlack}
              isActive={isGameStarted && !gameState.isFinished && gameState.currentPlayer === "black"}
            />
          )
        }
        board={
          <Board
            board={gameState.board}
            boardSize={boardSize}
            onPointClick={(pos) => {
              if (boardDisabled) return;
              const success = placeStone(pos);
              if (!success) play("error");
            }}
            policyHints={analysis?.policyHints}
            showHints={hintsEnabled}
            lastMove={lastMove?.position ?? null}
            disabled={boardDisabled}
            floatingScores={floatingScores}
          />
        }
        winRateBar={
          <WinRateBar
            blackWinRate={analysis?.valueEstimate.blackWinRate ?? 0.5}
            isThinking={isHintThinking || isAiThinking}
          />
        }
        controlPanel={
          <ControlPanel
            currentPlayer={gameState.currentPlayer}
            onUndo={handleUndo}
            onPass={handlePass}
            onResign={handleResign}
            onReset={handleResetGame}
            canUndo={gameState.moveHistory.length > 0 && !isAiThinking}
            isFinished={gameState.isFinished}
            hintsEnabled={hintsEnabled}
            onToggleHints={setHintsEnabled}
            soundEnabled={soundEnabled}
            onToggleSound={setSoundEnabled}
            autoplayControls={
              mode === "eve" ? { isPaused: evePaused, onToggle: () => setEvePaused((p) => !p) } : undefined
            }
          />
        }
      />
      <ComboToast message={comboMessage} />
      {gameState.isFinished && scoreResult && (() => {
        // Đếm quân trên bàn để hiển thị chi tiết bảng điểm
        let blackOnBoard = 0;
        let whiteOnBoard = 0;
        for (const row of gameState.board) {
          for (const cell of row) {
            if (cell === "black") blackOnBoard++;
            else if (cell === "white") whiteOnBoard++;
          }
        }
        let finalWinner: "black" | "white" = scoreResult.blackScore > scoreResult.whiteScore ? "black" : "white";
        if (gameEndReason === "resign") {
           finalWinner = gameState.currentPlayer === "black" ? "white" : "black";
        }
        let winnerName: string | undefined = undefined;
        if (mode === "pve") {
          winnerName = finalWinner === playerColor ? "Bạn" : "AI Engine";
        }
        const currentKomi = ruleSet === "chinese" ? 7.5 : 6.5;
        const playerBlackName =
          mode === "pve"
            ? playerColor === "black"
              ? "Bạn"
              : "AI Engine"
            : "Người chơi 1 (Đen)";
        const playerWhiteName =
          mode === "pve"
            ? playerColor === "white"
              ? "Bạn"
              : "AI Engine"
            : "Người chơi 2 (Trắng)";

        return (
          <GameResultModal
            open
            winner={finalWinner}
            winnerName={winnerName}
            reason={gameEndReason ?? "end"}
            blackScore={scoreResult.blackScore}
            whiteScore={scoreResult.whiteScore}
            blackTerritory={scoreResult.blackTerritory}
            whiteTerritory={scoreResult.whiteTerritory}
            blackCaptures={gameState.capturedBlack}
            whiteCaptures={gameState.capturedWhite}
            blackStonesOnBoard={blackOnBoard}
            whiteStonesOnBoard={whiteOnBoard}
            komi={currentKomi}
            ruleSet={ruleSet}
            boardSize={boardSize}
            moveHistory={gameState.moveHistory}
            playerBlackName={playerBlackName}
            playerWhiteName={playerWhiteName}
            onPlayAgain={handleResetGame}
            onBackToMenu={handleBackToMenu}
            onReviewGame={() => setIsReviewModalOpen(true)}
          />
        );
      })()}
      <GameReviewModal
        open={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        boardSize={boardSize}
        moveHistory={gameState.moveHistory}
        playerBlackName={roleLabels.black}
        playerWhiteName={roleLabels.white}
        onGoToTsumego={() => {
          setIsReviewModalOpen(false);
          navigate("/tsumego");
        }}
      />
      <GameSetupModal
        open={isSetupModalOpen && screen === "game"}
        mode={mode}
        isGameStarted={isGameStarted}
        initialBoardSize={boardSize}
        initialDifficulty={aiDifficulty}
        initialPlayerColor={playerColor}
        initialRuleSet={ruleSet}
        onStartGame={handleStartGame}
        onBackToMenu={handleBackToMenu}
        onClose={() => setIsSetupModalOpen(false)}
        onApplyMidGame={handleApplyOptionsMidGame}
      />
      {rulesModal}
      <ChatBox />
    </>
  );
}

// ============================================================================
// App — lớp Router ngoài cùng. "/" = toàn bộ trải nghiệm local (GameApp,
// không đổi gì bên trong); "/online" = Lobby Firestore; "/game/:matchId" =
// phòng chơi thật (PvP/PvE qua Firestore, độc lập hoàn toàn với useGameState).
// ============================================================================
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/online" element={<OnlineHub />} />
            <Route path="/game/local" element={<LocalGameRoom />} />
            <Route path="/game/:matchId" element={<GameRoom />} />
            <Route path="/join/:roomId" element={<JoinRoom />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/add-friend/:uid" element={<AddFriend />} />
            <Route path="/pve" element={<GameApp />} />
            <Route path="/pvp" element={<GameApp />} />
            <Route path="/eve" element={<GameApp />} />
            <Route path="/tsumego" element={<GameApp />} />
            <Route path="/login" element={<GameApp />} />
            <Route path="/register" element={<GameApp />} />
            <Route path="/*" element={<GameApp />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;