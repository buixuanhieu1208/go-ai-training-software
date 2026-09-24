// src/App.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { AnalysisPanel } from "./components/AnalysisPanel/AnalysisPanel";
import { useRefereeAnalysis } from "./hooks/useRefereeAnalysis";
import { GameLayout } from "./components/Layout/GameLayout";
import { GameBackdrop } from "./components/Layout/GameBackdrop";
import { Board } from "./components/Board/Board";
import { WinRateBar } from "./components/WinRateBar/WinRateBar";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { MoveHistory } from "./components/MoveHistory/MoveHistory";
import { TsumegoPractice } from "./components/Tsumego/TsumegoPractice";
import { MOCK_TSUMEGO_PUZZLES } from "./components/Tsumego/mockTsumegoData";
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
import { BOARD_SIZES } from "./constants/board";
import "./styles/tokens.css";
import "./App.css";


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

function App() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [mode, setMode] = useState<GameMode>("pvp-local");
  const [rulesOpen, setRulesOpen] = useState(false);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [boardSize, setBoardSize] = useState<BoardSize>(19);
  const [evePaused, setEvePaused] = useState(false);

  // === "isAiThinking": cờ ĐANG CHỜ BACKEND THẬT trả lời (khác isThinking của
  // useAiAnalysis vốn chỉ phục vụ vòng tròn gợi ý). Đây là state cốt lõi giữ
  // lại từ bản cũ để khoá bàn cờ / nút Undo trong lúc chờ AI Engine Python. ===
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
  // PvE: chỉ lượt Trắng do AI đảm nhiệm (người chơi luôn cầm Đen).
  // EvE: cả 2 bên đều do AI đảm nhiệm, trừ khi đang tạm dừng (evePaused).
  const isAiControlledTurn =
    !gameState.isFinished &&
    ((mode === "pve" && gameState.currentPlayer === "white") || (mode === "eve" && !evePaused));

  // === LUỒNG KẾT NỐI BACKEND THẬT (khôi phục từ frontend_ui bản CŨ) ===
  // Thay cho việc lấy nước đi từ analysis.policyHints[0] (mock nội bộ), effect
  // này gọi thẳng POST /api/v1/get_move của Backend Python mỗi khi tới lượt
  // AI, dịch bàn cờ chữ ("black"/"white"/"empty") sang số (1/-1/0) đúng
  // contract mà Backend đang chờ, rồi áp nước đi trả về bằng placeStone/pass
  // — cùng cơ chế state y hệt nước đi của người chơi.
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
          }),
        });

        if (!response.ok) throw new Error(`Lỗi kết nối Backend: ${response.status}`);
        
        // 4. XỬ LÝ KẾT QUẢ TRẢ VỀ
        const data: BackendMoveResponse = await response.json();

        if (data.action === "end") {
          // Game kết thúc, hiển thị kết quả
          const winnerName = data.winner === "black" ? "Quân Đen" : "Quân Trắng";
          alert(`🏁 VÁN ĐẤU KẾT THÚC!\n\nĐiểm Đen: ${data.black_score}\nĐiểm Trắng: ${data.white_score}\n\n🏆 NGƯỜI CHIẾN THẮNG: ${winnerName}`);
          return; 
        } else if (data.action === "pass") {
          pass();
        } else if (data.action === "move" && data.row !== undefined && data.col !== undefined) {
          const success = placeStone({ x: data.col, y: data.row });
          if (!success) {
            console.warn("AI trả về nước đi không hợp lệ, tự động pass.", data);
            pass();
          }
        }
        
      } catch (error) {
        console.error("Lỗi khi kết nối với AI Engine:", error);
      } finally {
        setIsAiThinking(false);
        aiRequestInFlight.current = false;
      }
    };

    fetchAiMove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAiControlledTurn, gameState.currentPlayer, gameState.isFinished]);

  const annotatedMoveHistory = useMemo(() => {
    if (!refereeResult) return gameState.moveHistory;
    const tagByIndex = new Map(refereeResult.annotatedMoves.map((m) => [m.index, m.mistakeTag]));
    return gameState.moveHistory.map((m) => ({
      ...m,
      mistakeTag: tagByIndex.get(m.index) ?? m.mistakeTag ?? null,
    }));
  }, [gameState.moveHistory, refereeResult]);

  const handleAnalyzeGame = () => {
    if (gameState.moveHistory.length === 0) return;
    runAnalysis(boardSize, gameState.moveHistory);
  };

  const clearEffects = () => {
    comboCountRef.current = 0;
    setFloatingScores([]);
    setComboMessage(null);
  };

  const handleSelectMode = (nextMode: GameMode) => {
    setMode(nextMode);
    setEvePaused(false);
    clearEffects();
    if (nextMode === "tsumego") {
      setPuzzleIndex(0);
    } else {
      resetGame(boardSize);
    }
    setScreen("game");
  };

  const handleBackToMenu = () => setScreen("menu");
  const handleOpenLogin = () => setScreen("login");
  const handleOpenRegister = () => setScreen("register");

  const handleBoardSizeChange = (size: BoardSize) => {
    setBoardSize(size);
    resetGame(size);
    clearEffects();
    clearAnalysis();
  };

  const handleResetGame = () => {
    resetGame(boardSize);
    setEvePaused(false);
    clearEffects();
    clearAnalysis();
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
        <div className="app-header__board-size">
          {BOARD_SIZES.map((size) => (
            <button
              key={size}
              className={`board-size-btn ${size === boardSize ? "board-size-btn--active" : ""}`}
              onClick={() => handleBoardSizeChange(size)}
            >
              {size}×{size}
            </button>
          ))}
        </div>
      )}

      <button className="app-header__rules-btn" onClick={() => setRulesOpen(true)} type="button" aria-label="Hướng dẫn luật chơi">
        📖 Luật chơi
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
          onOpenRules={() => setRulesOpen(true)}
          onOpenLogin={handleOpenLogin}
          onOpenRegister={handleOpenRegister}
        />
        {rulesModal}
      </>
    );
  }

  if (mode === "tsumego") {
    const puzzle = MOCK_TSUMEGO_PUZZLES[puzzleIndex];
    return (
      <div className="game-layout">
        <GameBackdrop />
        <header className="game-layout__header">{header}</header>
        <div className="tsumego-page">
          <TsumegoPractice key={puzzle.id} puzzle={puzzle} onSolved={() => {}} />
          <div className="tsumego-page__switcher">
            {MOCK_TSUMEGO_PUZZLES.map((p, i) => (
              <button
                key={p.id}
                className={`board-size-btn ${i === puzzleIndex ? "board-size-btn--active" : ""}`}
                onClick={() => setPuzzleIndex(i)}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
        {rulesModal}
        <ChatBox />
      </div>
    );
  }

  const isPveAiTurn = mode === "pve" && gameState.currentPlayer === "white";
  const boardDisabled = gameState.isFinished || mode === "eve" || isPveAiTurn || isAiThinking;

  const roleLabels: { black: string; white: string } =
    mode === "pve"
      ? { black: "Bạn", white: isAiThinking ? "AI Engine (đang suy nghĩ...)" : "AI Engine" }
      : mode === "eve"
      ? {
          black: isAiThinking && gameState.currentPlayer === "black" ? "AI Engine (đang suy nghĩ...)" : "AI Engine",
          white: isAiThinking && gameState.currentPlayer === "white" ? "AI Engine (đang suy nghĩ...)" : "AI Engine",
        }
      : { black: "Người chơi 1", white: "Người chơi 2" };

  const stonesUsedBlack = gameState.moveHistory.filter((m) => m.color === "black" && m.position !== null).length;
  const stonesUsedWhite = gameState.moveHistory.filter((m) => m.color === "white" && m.position !== null).length;

  return (
    <>
      <GameLayout
        header={header}
        moveHistory={
          <>
            <MoveHistory moves={annotatedMoveHistory} />
            <AnalysisPanel
              result={refereeResult}
              isLoading={isAnalyzing}
              error={analysisError}
              onAnalyze={handleAnalyzeGame}
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
          <PlayerCard
            color="white"
            label={roleLabels.white}
            capturedCount={gameState.capturedWhite}
            isActive={!gameState.isFinished && gameState.currentPlayer === "white"}
          />
        }
        bottomBar={
          <PlayerCard
            color="black"
            label={roleLabels.black}
            capturedCount={gameState.capturedBlack}
            isActive={!gameState.isFinished && gameState.currentPlayer === "black"}
          />
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
            onUndo={undo}
            onPass={pass}
            onResign={resign}
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
      {rulesModal}
      <ChatBox />
    </>
  );
}

export default App;