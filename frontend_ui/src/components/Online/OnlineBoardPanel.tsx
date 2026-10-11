import { useEffect } from "react";
import { Board } from "../Board/Board";
import { OnlinePlayerBar } from "./OnlinePlayerBar";
import type { UseMatchResult } from "../../types/match";
import "./OnlineBoardPanel.css";

interface OnlineBoardPanelProps {
  activeMatchId: string | null;
  matchState: UseMatchResult | null;
}

export function OnlineBoardPanel({ activeMatchId, matchState }: OnlineBoardPanelProps) {
  if (!activeMatchId || !matchState || !matchState.match) {
    return (
      <div className="online-board-panel online-board-panel--idle">
        <div className="obp-idle__board-preview" aria-hidden="true">
          {/* Decorative grid lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={`h${i}`} className="obp-idle__grid-h" style={{ top: `${(i / 8) * 100}%` }} />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={`v${i}`} className="obp-idle__grid-v" style={{ left: `${(i / 8) * 100}%` }} />
          ))}
          <div className="obp-idle__stone obp-idle__stone--b" style={{ top: '30%', left: '30%' }} />
          <div className="obp-idle__stone obp-idle__stone--w" style={{ top: '30%', left: '55%' }} />
          <div className="obp-idle__stone obp-idle__stone--b" style={{ top: '55%', left: '44%' }} />
          <div className="obp-idle__stone obp-idle__stone--w" style={{ top: '55%', left: '65%' }} />
        </div>
        <div className="obp-idle__text">
          <div className="obp-idle__logo">碁</div>
          <div className="obp-idle__title">Sẵn sàng thi đấu?</div>
          <div className="obp-idle__desc">Chọn chế độ thời gian và bấm <strong>Ghép trận</strong> ở bảng bên phải để bắt đầu.</div>
        </div>
      </div>
    );
  }

  const { match, isMyTurn, playMove } = matchState;
  const myColor = matchState.myColor ?? "black";
  const opponentColor = myColor === "black" ? "white" : "black";
  return (
    <div className="online-board-panel online-board-panel--active">
      {/* Opponent on top */}
      <OnlinePlayerBar
        color={opponentColor}
        displayName={match.players[opponentColor]?.displayName ?? (opponentColor === "black" ? "Quân Đen" : "Quân Trắng")}
        photoURL={match.players[opponentColor]?.photoURL ?? undefined}
        elo={match.players[opponentColor]?.elo ?? undefined}
        capturedCount={opponentColor === "black" ? match.capturedBlack : match.capturedWhite}
        isActive={match.currentPlayer === opponentColor}
      />
      <div className="obp-board-wrap" style={{ position: "relative" }}>
        <Board
          board={match.board}
          boardSize={match.boardSize}
          onPointClick={(p) => playMove(p)}
          disabled={!isMyTurn}
          lastMove={match.lastMove}
          floatingScores={matchState.floatingScores}
        />
      </div>
      {/* Me on bottom */}
      <OnlinePlayerBar
        color={myColor}
        displayName={match.players[myColor]?.displayName ?? (myColor === "black" ? "Quân Đen" : "Quân Trắng")}
        photoURL={match.players[myColor]?.photoURL ?? undefined}
        elo={match.players[myColor]?.elo ?? undefined}
        capturedCount={myColor === "black" ? match.capturedBlack : match.capturedWhite}
        isActive={match.currentPlayer === myColor}
        isMe
      />
    </div>
  );
}