import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { GameBackdrop } from "../Layout/GameBackdrop";
import { OnlineSidebar, type SidebarTab } from "./OnlineSidebar";
import { OnlineBoardPanel } from "./OnlineBoardPanel";
import { useMatch } from "../../hooks/useMatch";
import type { UseMatchResult } from "../../types/match";
import { Login } from "../Auth/Login";
import { Register } from "../Auth/Register";
import { resignMatch } from "../../services/firestoreService";
import { calculateScore } from "../../utils/goRules";
import { GameResultModal } from "../GameResult/GameResultModal";
import { ChatBox } from "../ChatBox/ChatBox";
import { ConfirmLeaveModal } from "../ConfirmLeaveModal/ConfirmLeaveModal";
import "../GameResult/GameResultModal.css";
import "./OnlineHub.css";

export default function OnlineHub() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [activeTab, setActiveTab] = useState<SidebarTab>("play");
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);
  const [authScreen, setAuthScreen] = useState<"login" | "register">("login");

  const matchState = useMatch(activeMatchId, user?.uid ?? null) as UseMatchResult;

  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  // Cảnh báo khi reload/đóng tab
  useEffect(() => {
    if (!matchState.match) return;
    
    // Nếu đối thủ không kết nối (bị timeout huỷ trận)
    if ((matchState.match.status as string) === "canceled") {
      setShowTimeoutModal(true);
      setActiveMatchId(null);
      return;
    }

    if (matchState.match.status !== "ongoing") return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [matchState.match?.status]);

  // Tự động chuyển sang tab "Nước đi" khi trận đấu bắt đầu để người chơi theo dõi ván cờ
  useEffect(() => {
    if (activeMatchId && matchState.match?.status === "ongoing") {
      setActiveTab("analysis");
    }
  }, [activeMatchId, matchState.match?.status]);

  if (!user) {
    if (authScreen === "login") {
      return <Login onBackHome={() => navigate("/")} onGoRegister={() => setAuthScreen("register")} />;
    } else {
      return <Register onBackHome={() => navigate("/")} onGoLogin={() => setAuthScreen("login")} />;
    }
  }

  const [pendingNavPath, setPendingNavPath] = useState<string | null>(null);

  const handleNavigateAway = (path: string) => {
    if (activeMatchId && matchState.match?.status === "ongoing") {
      setPendingNavPath(path);
    } else {
      navigate(path);
    }
  };

  const confirmLeave = async () => {
    if (activeMatchId && matchState.myColor) {
      await resignMatch(activeMatchId, matchState.myColor).catch(console.error);
    }
    if (pendingNavPath) navigate(pendingNavPath);
  };

  const isFinished = activeMatchId !== null && matchState.match?.status === "finished";
  const scores = isFinished && matchState.match 
    ? calculateScore(matchState.match.board as any, matchState.match.capturedBlack, matchState.match.capturedWhite, matchState.match.komi || 7.5) 
    : null;
  
  let winner = matchState.match?.winner ?? "black";
  let reason = matchState.match?.winMargin === null ? "resign" : "end";
  
  if (scores) {
    if ((matchState.match?.consecutivePasses ?? 0) >= 2) {
      reason = "double-pass";
      winner = scores.blackScore > scores.whiteScore ? "black" : "white";
    } else if (reason !== "resign") {
      winner = scores.blackScore > scores.whiteScore ? "black" : "white";
    }
  }

  const handleCloseResult = () => {
    setActiveMatchId(null);
  };

  const header = (
    <div className="app-header">
      <div className="app-header__title">
        <button className="app-header__back" onClick={() => handleNavigateAway("/")} type="button">
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
          <button className="online-hub__profile-btn" onClick={() => handleNavigateAway("/profile")} type="button">
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
            boardSize={activeMatchId && matchState.match ? matchState.match.boardSize : 19}
            activeMatchId={activeMatchId}
            matchState={activeMatchId ? matchState : null}
            onResign={matchState.resign}
          />
        </div>
      </div>

      {activeMatchId && (
        <ChatBox
          matchId={activeMatchId}
          currentUser={user}
          userColor={matchState.myColor}
          opponentName={matchState.opponent?.displayName}
          autoOpenOnStart={true}
        />
      )}

      <ConfirmLeaveModal
        open={Boolean(pendingNavPath)}
        title="Cảnh báo thoát trận đấu"
        message={
          <>
            Bạn đang trong một ván đấu trực tuyến. Nếu rời đi bây giờ, bạn sẽ bị{" "}
            <strong className="text-danger">ĐẦU HÀNG (XỬ THUA)</strong> ngay lập tức.
            <br /><br />
            Bạn có chắc chắn muốn rời đi không?
          </>
        }
        confirmText="Rời đi và Chịu thua"
        cancelText="Ở lại thi đấu"
        isDanger={true}
        onConfirm={confirmLeave}
        onCancel={() => setPendingNavPath(null)}
      />

      {showTimeoutModal && (
        <div className="game-result-overlay" style={{ zIndex: 9999 }}>
          <div className="game-result-modal" style={{ maxWidth: 400 }}>
            <h2 className="game-result-winner" style={{ color: "var(--color-accent-amber)", fontSize: 20 }}>Kết nối thất bại</h2>
            <p style={{ color: "var(--color-text-secondary)", fontSize: 14, textAlign: "center", marginBottom: 24, lineHeight: 1.5 }}>
              Đối thủ đã mất kết nối hoặc không phản hồi.<br/>
              Trận đấu này đã bị hủy.
            </p>
            <div className="game-result-actions">
              <button className="game-result-btn game-result-btn--primary" onClick={() => setShowTimeoutModal(false)} style={{ width: "100%" }}>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {isFinished && scores && (
        <GameResultModal
          open={true}
          winner={winner as "black" | "white"}
          winnerName={matchState.match?.players?.[winner as "black" | "white"]?.displayName}
          reason={reason as "end" | "resign" | "double-pass"}
          blackScore={scores.blackScore}
          whiteScore={scores.whiteScore}
          blackTerritory={scores.blackTerritory}
          whiteTerritory={scores.whiteTerritory}
          blackCaptures={matchState.match?.capturedBlack ?? 0}
          whiteCaptures={matchState.match?.capturedWhite ?? 0}
          blackStonesOnBoard={scores.blackStonesOnBoard ?? 0}
          whiteStonesOnBoard={scores.whiteStonesOnBoard ?? 0}
          komi={matchState.match?.komi || 7.5}
          onPlayAgain={handleCloseResult}
          onBackToMenu={handleCloseResult}
        />
      )}
    </div>
  );
}