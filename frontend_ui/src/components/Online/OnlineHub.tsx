// src/components/Online/OnlineHub.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { GameBackdrop } from "../Layout/GameBackdrop";
import { OnlineSidebar, type SidebarTab } from "./OnlineSidebar";
import { OnlineBoardPanel } from "./OnlineBoardPanel";
import { useMatch } from "../../hooks/useMatch";
import type { UseMatchResult } from "../../types/match";
import "./OnlineHub.css";

export default function OnlineHub() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [activeTab, setActiveTab] = useState<SidebarTab>("play");
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);

  const matchState = useMatch(activeMatchId, user?.uid ?? null) as UseMatchResult;

  const header = (
    <div className="app-header">
      <div className="app-header__title">
        <button className="app-header__back" onClick={() => navigate("/")} type="button">
          ← Trở về
        </button>
        <span className="app-header__logo">碁</span>
        <div>
          <div className="app-header__name">Chơi trực tuyến</div>
          <div className="app-header__subtitle">Ghép trận, kết bạn và phân tích ván đấu</div>
        </div>
      </div>

      <div className="online-hub__account">
        {user ? (
          <button className="online-hub__profile-btn" onClick={() => navigate("/profile")} type="button">
            {user.photoURL && <img src={user.photoURL} alt="" className="online-hub__avatar" />}
            <span>{user.displayName}</span>
          </button>
        ) : (
          <button className="lobby__google-btn" onClick={signInWithGoogle} type="button">
            Đăng nhập bằng Google
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="game-layout">
      <GameBackdrop />
      <header className="game-layout__header">{header}</header>

      <div className="online-hub">
        <div className="online-hub__board-area">
          <OnlineBoardPanel activeMatchId={activeMatchId} matchState={activeMatchId ? matchState : null} />
        </div>
        <div className="online-hub__sidebar-area">
          <OnlineSidebar
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            onEnterMatch={setActiveMatchId}
            activeMoveHistory={activeMatchId ? matchState.moveHistory : []}
          />
        </div>
      </div>
    </div>
  );
}