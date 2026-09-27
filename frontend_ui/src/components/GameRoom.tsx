// src/components/GameRoom.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useMatch } from "../hooks/useMatch";
import { GameLayout } from "./Layout/GameLayout";
import { Board } from "./Board/Board";
import { MoveHistory } from "./MoveHistory/MoveHistory";
import { PlayerCard } from "./PlayerCard/PlayerCard";
import { StoneBowl } from "./StoneBowl/StoneBowl";
import type { UseMatchResult } from "../types/match";
import "./GameRoom.css";

const STONES_PER_BOWL = 180;

export default function GameRoom() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [confirmingResign, setConfirmingResign] = useState(false);

  const {
    match,
    moveHistory,
    loading,
    myColor,
    opponent,
    isMyTurn,
    playMove,
    resign,
    moveError,
    floatingScores,
  } = useMatch(matchId, user?.uid ?? null) as UseMatchResult;

  // --- Các trạng thái sớm: chưa đăng nhập / đang tải / không tìm thấy match ---
  // Dùng chung khung .game-layout__status để không "trần trụi" giữa nền đen.
  if (authLoading || loading) {
    return (
      <div className="game-layout">
        <div className="game-layout__status">Đang tải ván đấu...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="game-layout">
        <div className="game-layout__status">
          Bạn cần đăng nhập để vào phòng đấu.{" "}
          <button className="game-room__link-btn" onClick={() => navigate("/online")}>
            Về sảnh chờ
          </button>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="game-layout">
        <div className="game-layout__status">Không tìm thấy ván đấu, hoặc ván đấu đang được khởi tạo...</div>
      </div>
    );
  }

  const waitingForOpponent = match.mode === "pvp" && (!match.players.black || !match.players.white);
  const boardDisabled = !isMyTurn || match.status === "finished" || waitingForOpponent;

  const handleLeave = async () => {
    if (match.status === "ongoing" && myColor) await resign();
    navigate("/online");
  };

  const handleResign = async () => {
    if (!confirmingResign) {
      setConfirmingResign(true);
      return;
    }
    await resign();
    setConfirmingResign(false);
  };

  const statusLabel =
    match.status === "finished"
      ? `Ván đấu kết thúc — ${match.winner === "black" ? "Đen" : "Trắng"} thắng`
      : match.aiThinking
      ? "AI đang suy nghĩ..."
      : isMyTurn
      ? "Đến lượt bạn"
      : `Đang chờ ${match.currentPlayer === "black" ? "Đen" : "Trắng"} đi`;

  const stonesUsedBlack = moveHistory.filter((m) => m.color === "black" && m.position !== null).length;
  const stonesUsedWhite = moveHistory.filter((m) => m.color === "white" && m.position !== null).length;

  // --- Header dùng ĐÚNG cấu trúc app-header như GameApp (PvE/Local/EvE) ---
  const header = (
    <div className="app-header">
      <div className="app-header__title">
        <button className="app-header__back" onClick={handleLeave} type="button">
          ← Rời phòng
        </button>
        <span className="app-header__logo">碁</span>
        <div>
          <div className="app-header__name">{match.mode === "pve" ? "Đấu với AI" : "PvP Online"}</div>
          <div className="app-header__subtitle">Bàn {match.boardSize}×{match.boardSize} · {statusLabel}</div>
        </div>
      </div>
    </div>
  );

  return (
    <GameLayout
      header={header}
      moveHistory={
        <>
          {opponent && (
            <div className="game-room__opponent">
              {opponent.photoURL ? (
                <img src={opponent.photoURL} alt={opponent.displayName} className="game-room__opponent-avatar" />
              ) : (
                <div className="game-room__opponent-avatar game-room__opponent-avatar--fallback">
                  {opponent.uid === "AI_ENGINE" ? "🤖" : opponent.displayName[0]}
                </div>
              )}
              <div>
                <div className="game-room__opponent-name">{opponent.displayName}</div>
                <div className="game-room__opponent-meta">{opponent.elo ? `ELO ${opponent.elo}` : "AI Engine"}</div>
              </div>
            </div>
          )}
          {waitingForOpponent && <div className="game-room__banner game-room__banner--warning">Đang chờ đối thủ vào phòng...</div>}
          {moveError && <div className="game-room__banner game-room__banner--error">{moveError}</div>}
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
        <PlayerCard
          color="white"
          label={match.players.white?.displayName ?? "Trắng"}
          capturedCount={match.capturedWhite}
          isActive={!waitingForOpponent && match.status === "ongoing" && match.currentPlayer === "white"}
        />
      }
      bottomBar={
        <PlayerCard
          color="black"
          label={match.players.black?.displayName ?? "Đen"}
          capturedCount={match.capturedBlack}
          isActive={!waitingForOpponent && match.status === "ongoing" && match.currentPlayer === "black"}
        />
      }
      board={
        <Board
          board={match.board}
          boardSize={match.boardSize}
          onPointClick={(position) => playMove(position)}
          disabled={boardDisabled}
          lastMove={match.lastMove}
          floatingScores={floatingScores}
        />
      }
      winRateBar={
        <div className="game-room__info-panel">
          <div className="game-room__info-title">Trận đấu trực tuyến</div>
          <div className="game-room__info-note">Không có gợi ý AI ở chế độ PvP Online.</div>
        </div>
      }
      controlPanel={
        match.status === "ongoing" && myColor ? (
          <button
            className={`game-room__resign-btn ${confirmingResign ? "game-room__resign-btn--confirm" : ""}`}
            onClick={handleResign}
          >
            {confirmingResign ? "Bấm lần nữa để xác nhận xin thua" : "Xin thua"}
          </button>
        ) : (
          <button className="game-room__resign-btn" onClick={() => navigate("/online")}>
            Về sảnh chờ
          </button>
        )
      }
    />
  );
}