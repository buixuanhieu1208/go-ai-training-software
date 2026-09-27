// src/components/LocalGameRoom.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameLayout } from "./Layout/GameLayout";
import { Board } from "./Board/Board";
import { MoveHistory } from "./MoveHistory/MoveHistory";
import { PlayerCard } from "./PlayerCard/PlayerCard";
import { StoneBowl } from "./StoneBowl/StoneBowl";
import { computeNextBoard } from "../utils/goRules";
import type { BoardMatrix, BoardSize, Move, Position, FloatingScoreEffect } from "../types/go";
import "./GameRoom.css";

const BOARD_SIZE: BoardSize = 19;
const STONES_PER_BOWL = 180;

function createEmptyBoard(size: BoardSize): BoardMatrix {
  return Array.from({ length: size }, () => Array(size).fill("empty"));
}

export default function LocalGameRoom() {
  const navigate = useNavigate();

  const [board, setBoard] = useState<BoardMatrix>(() => createEmptyBoard(BOARD_SIZE));
  const [currentPlayer, setCurrentPlayer] = useState<"black" | "white">("black");
  const [capturedBlack, setCapturedBlack] = useState(0); // số quân TRẮNG đã bị ĐEN bắt
  const [capturedWhite, setCapturedWhite] = useState(0); // số quân ĐEN đã bị TRẮNG bắt
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);
  const [consecutivePasses, setConsecutivePasses] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [lastMove, setLastMove] = useState<Position | null>(null);
  const [floatingScores, setFloatingScores] = useState<FloatingScoreEffect[]>([]);

  const isFinished = consecutivePasses >= 2;

  const applyMove = (
    position: Position | null,
    color: "black" | "white",
    capturedCount: number,
    capturedPositions: Position[],
    nextBoard: BoardMatrix
  ) => {
    setBoard(nextBoard);
    setLastMove(position);
    setMoveHistory((prev) => [
      ...prev,
      { index: prev.length + 1, color, position, capturedCount, isCapture: capturedCount > 0, capturedPositions },
    ]);

    if (capturedCount > 0) {
      const positions = capturedPositions.length ? capturedPositions : position ? [position] : [];
      if (positions.length > 0) {
        const cx = positions.reduce((sum, p) => sum + p.x, 0) / positions.length;
        const cy = positions.reduce((sum, p) => sum + p.y, 0) / positions.length;
        const id = Date.now();
        setFloatingScores((prev) => [...prev, { id, x: cx, y: cy, value: capturedCount, color }]);
        setTimeout(() => setFloatingScores((prev) => prev.filter((f) => f.id !== id)), 1100);
      }
    }

    if (color === "black") setCapturedWhite((c) => c + capturedCount);
    else setCapturedBlack((c) => c + capturedCount);
    setConsecutivePasses(position ? 0 : consecutivePasses + 1);
    setCurrentPlayer(color === "black" ? "white" : "black");
  };

  const handlePointClick = (position: Position) => {
    if (isFinished) return;
    setError(null);
    try {
      const { board: nextBoard, capturedCount, capturedPositions } = computeNextBoard(board, position, currentPlayer);
      applyMove(position, currentPlayer, capturedCount, capturedPositions ?? [], nextBoard);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handlePass = () => {
    if (isFinished) return;
    setLastMove(null);
    setMoveHistory((prev) => [
      ...prev,
      { index: prev.length + 1, color: currentPlayer, position: null, capturedCount: 0, isCapture: false },
    ]);
    setConsecutivePasses((p) => p + 1);
    setCurrentPlayer((p) => (p === "black" ? "white" : "black"));
  };

  const handleReset = () => {
    setBoard(createEmptyBoard(BOARD_SIZE));
    setCurrentPlayer("black");
    setCapturedBlack(0);
    setCapturedWhite(0);
    setMoveHistory([]);
    setConsecutivePasses(0);
    setLastMove(null);
    setError(null);
    setFloatingScores([]);
  };

  const statusLabel = isFinished
    ? "Ván đấu kết thúc (2 lượt Pass liên tiếp)"
    : `Đến lượt: ${currentPlayer === "black" ? "Đen" : "Trắng"}`;

  const stonesUsedBlack = moveHistory.filter((m) => m.color === "black" && m.position !== null).length;
  const stonesUsedWhite = moveHistory.filter((m) => m.color === "white" && m.position !== null).length;

  const header = (
    <div className="app-header">
      <div className="app-header__title">
        <button className="app-header__back" onClick={() => navigate("/online")} type="button">
          ← Về sảnh chờ
        </button>
        <span className="app-header__logo">碁</span>
        <div>
          <div className="app-header__name">PvP Local</div>
          <div className="app-header__subtitle">{statusLabel}</div>
        </div>
      </div>
    </div>
  );

  return (
    <GameLayout
      header={header}
      moveHistory={
        <>
          {error && <div className="game-room__banner game-room__banner--error">{error}</div>}
          <MoveHistory moves={moveHistory} />
        </>
      }
      leftBowl={
        <StoneBowl color="black" side="left" label="Hũ quân Đen" total={STONES_PER_BOWL} remaining={Math.max(0, STONES_PER_BOWL - stonesUsedBlack)} />
      }
      rightBowl={
        <StoneBowl color="white" side="right" label="Hũ quân Trắng" total={STONES_PER_BOWL} remaining={Math.max(0, STONES_PER_BOWL - stonesUsedWhite)} />
      }
      topBar={
        <PlayerCard color="white" label="Người chơi 2" capturedCount={capturedWhite} isActive={!isFinished && currentPlayer === "white"} />
      }
      bottomBar={
        <PlayerCard color="black" label="Người chơi 1" capturedCount={capturedBlack} isActive={!isFinished && currentPlayer === "black"} />
      }
      board={
        <Board
          board={board}
          boardSize={BOARD_SIZE}
          onPointClick={handlePointClick}
          disabled={isFinished}
          lastMove={lastMove}
          floatingScores={floatingScores}
        />
      }
      winRateBar={
        <div className="game-room__info-panel">
          <div className="game-room__info-title">PvP Local</div>
          <div className="game-room__info-note">2 người chơi thay phiên trên cùng 1 máy, không qua Firestore.</div>
        </div>
      }
      controlPanel={
        <div className="local-room__controls">
          <button className="game-room__resign-btn" onClick={handlePass} disabled={isFinished}>
            Pass
          </button>
          <button className="game-room__resign-btn" onClick={handleReset}>
            Chơi lại
          </button>
        </div>
      }
    />
  );
}