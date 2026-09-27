// src/components/Online/OnlineBoardPanel.tsx
import { GameLayout } from "../Layout/GameLayout";
import { Board } from "../Board/Board";
import { PlayerCard } from "../PlayerCard/PlayerCard";
import type { UseMatchResult } from "../../types/match";

interface OnlineBoardPanelProps {
  activeMatchId: string | null;
  matchState: UseMatchResult | null;
}

export function OnlineBoardPanel({ activeMatchId, matchState }: OnlineBoardPanelProps) {
  if (!activeMatchId || !matchState || !matchState.match) {
    return (
      <div className="online-board-panel online-board-panel--idle">
        <div className="online-board-panel__idle-icon">碁</div>
        <div className="online-board-panel__idle-title">Chưa có ván đấu nào</div>
        <div className="online-board-panel__idle-desc">Chọn "Ghép ngẫu nhiên" ở khung bên phải để bắt đầu.</div>
      </div>
    );
  }

  const { match, isMyTurn, playMove } = matchState;
  return (
    <div className="online-board-panel">
      <PlayerCard color="white" label={match.players.white?.displayName ?? "Trắng"} capturedCount={match.capturedWhite} isActive={match.currentPlayer === "white"} />
      <Board board={match.board} boardSize={match.boardSize} onPointClick={(p) => playMove(p)} disabled={!isMyTurn} lastMove={match.lastMove} floatingScores={matchState.floatingScores} />
      <PlayerCard color="black" label={match.players.black?.displayName ?? "Đen"} capturedCount={match.capturedBlack} isActive={match.currentPlayer === "black"} />
    </div>
  );
}