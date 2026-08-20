import { useEffect, useRef, useState } from "react";
import { GameLayout } from "./components/Layout/GameLayout";
import { Board } from "./components/Board/Board";
import { WinRateBar } from "./components/WinRateBar/WinRateBar";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import { MoveHistory } from "./components/MoveHistory/MoveHistory";
import { TsumegoPractice } from "./components/Tsumego/TsumegoPractice";
import { MOCK_TSUMEGO_PUZZLES } from "./components/Tsumego/mockTsumegoData";
import { useGameState } from "./hooks/useGameState";
import { useAiAnalysis } from "./hooks/useAiAnalysis";
import { useSound } from "./hooks/useSound";
import type { BoardSize } from "./types/go";
import { BOARD_SIZES } from "./constants/board";
import "./styles/tokens.css";
import "./App.css";

type AppMode = "play" | "tsumego";

function App() {
  const [mode, setMode] = useState<AppMode>("play");
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [boardSize, setBoardSize] = useState<BoardSize>(19);
  const { gameState, placeStone, pass, resign, undo, resetGame } = useGameState(boardSize);
  const { analysis, isThinking, hintsEnabled, setHintsEnabled } = useAiAnalysis(
    gameState.board,
    gameState.currentPlayer,
    gameState.moveHistory.length
  );
  const { play, enabled: soundEnabled, setEnabled: setSoundEnabled } = useSound();

  const prevMoveCount = useRef(gameState.moveHistory.length);
  const lastMove = gameState.moveHistory[gameState.moveHistory.length - 1];

  useEffect(() => {
    if (gameState.moveHistory.length > prevMoveCount.current) {
      const last = gameState.moveHistory[gameState.moveHistory.length - 1];
      if (last.position === null) play("pass");
      else if (last.isCapture) play("capture");
      else play("place");
    }
    prevMoveCount.current = gameState.moveHistory.length;
  }, [gameState.moveHistory, play]);

  const handleBoardSizeChange = (size: BoardSize) => {
    setBoardSize(size);
    resetGame(size);
  };

  const header = (
    <div className="app-header">
      <div className="app-header__title">
        <span className="app-header__logo">碁</span>
        <div>
          <div className="app-header__name">Huấn luyện viên ảo AI — Cờ vây</div>
          <div className="app-header__subtitle">Luyện tập &amp; phân tích thế cờ theo thời gian thực</div>
        </div>
      </div>

      <div className="app-header__mode-switch">
        <button
          className={`board-size-btn ${mode === "play" ? "board-size-btn--active" : ""}`}
          onClick={() => setMode("play")}
        >
          Chơi tự do
        </button>
        <button
          className={`board-size-btn ${mode === "tsumego" ? "board-size-btn--active" : ""}`}
          onClick={() => setMode("tsumego")}
        >
          Luyện Tsumego
        </button>
      </div>

      <div className="app-header__board-size" style={{ visibility: mode === "play" ? "visible" : "hidden" }}>
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
    </div>
  );

  if (mode === "tsumego") {
    const puzzle = MOCK_TSUMEGO_PUZZLES[puzzleIndex];
    return (
      <div className="game-layout">
        <header className="game-layout__header">{header}</header>
        <div className="tsumego-page">
          <TsumegoPractice
            key={puzzle.id}
            puzzle={puzzle}
            onSolved={() => {}}
          />
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
      </div>
    );
  }

  return (
    <GameLayout
      header={header}
      moveHistory={<MoveHistory moves={gameState.moveHistory} />}
      board={
        <Board
          board={gameState.board}
          boardSize={boardSize}
          onPointClick={(pos) => {
            const success = placeStone(pos);
            if (!success) play("error");
          }}
          policyHints={analysis?.policyHints}
          showHints={hintsEnabled}
          lastMove={lastMove?.position ?? null}
          disabled={gameState.isFinished}
        />
      }
      winRateBar={
        <WinRateBar
          blackWinRate={analysis?.valueEstimate.blackWinRate ?? 0.5}
          isThinking={isThinking}
        />
      }
      controlPanel={
        <ControlPanel
          currentPlayer={gameState.currentPlayer}
          onUndo={undo}
          onPass={pass}
          onResign={resign}
          onReset={() => resetGame(boardSize)}
          canUndo={gameState.moveHistory.length > 0}
          isFinished={gameState.isFinished}
          hintsEnabled={hintsEnabled}
          onToggleHints={setHintsEnabled}
          soundEnabled={soundEnabled}
          onToggleSound={setSoundEnabled}
        />
      }
    />
  );
}

export default App;