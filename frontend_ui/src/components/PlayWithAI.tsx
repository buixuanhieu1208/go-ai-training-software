// src/App.tsx
import React, { useEffect, useRef } from "react";
import { useGoGame, BLACK } from "../hooks/useGoGame";
import { GoBoard } from "./GoBoard";

export const PlayWithAI: React.FC = () => {
  const {
    board,
    currentPlayer,
    consecutivePasses,
    isThinking,
    playMove,
    passTurn,
    fetchAIMove,
    resetGame,
  } = useGoGame();

  const pendingAITurn = useRef(false);

  const handleCellClick = (row: number, col: number) => {
    if (currentPlayer !== BLACK || isThinking) return;
    const success = playMove(row, col);
    if (success) {
      pendingAITurn.current = true;
    }
  };

  const handlePass = () => {
    if (currentPlayer !== BLACK || isThinking) return;
    passTurn();
    pendingAITurn.current = true;
  };

  useEffect(() => {
    if (pendingAITurn.current && currentPlayer !== BLACK) {
      pendingAITurn.current = false;
      fetchAIMove();
    }
  }, [currentPlayer, fetchAIMove]);

  const handleReset = () => {
    pendingAITurn.current = false;
    resetGame();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      <h1>Go (Cờ vây) vs AI</h1>

      <div style={{ marginBottom: "10px", fontSize: "16px" }}>
        <strong>Turn:</strong> {currentPlayer === BLACK ? "Black (You)" : "White (AI)"}{" "}
        {isThinking && <span> — AI is thinking...</span>}
        <br />
        <strong>Consecutive passes:</strong> {consecutivePasses}
      </div>

      <GoBoard
        board={board}
        currentPlayer={currentPlayer}
        isThinking={isThinking}
        onCellClick={handleCellClick}
      />

      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <button
          onClick={handlePass}
          disabled={currentPlayer !== BLACK || isThinking}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Pass
        </button>
        <button
          onClick={handleReset}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

