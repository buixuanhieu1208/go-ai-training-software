// src/components/Lobby.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { GameBackdrop } from "./Layout/GameBackdrop";
import {
  createRoom,
  createPveMatch,
  joinRoom,
  listenOpenRooms,
  cancelRoom,
} from "../services/firestoreService";
import type { RoomData } from "../types/match";
import type { BoardSize } from "../types/go";
import "./Lobby.css";

const BOARD_SIZE: BoardSize = 19;

export default function Lobby() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signInWithGoogle, signOutUser } = useAuth();

  const [openRooms, setOpenRooms] = useState<RoomData[]>([]);
  const [myRoomId, setMyRoomId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const unsub = listenOpenRooms(BOARD_SIZE, (rooms: RoomData[]) => setOpenRooms(rooms));
    return unsub;
  }, []);

  useEffect(() => {
    if (!myRoomId) return;
    const unsub = onSnapshot(doc(db, "rooms", myRoomId), (snap) => {
      const room = snap.data();
      if (room?.status === "matched" && room.matchId) navigate(`/game/${room.matchId}`);
    });
    return unsub;
  }, [myRoomId, navigate]);

  const requireAuth = () => {
    if (!user) {
      setError("Bạn cần đăng nhập bằng Google trước khi chơi Online.");
      return null;
    }
    return { uid: user.uid, displayName: user.displayName ?? "Người chơi ẩn danh", photoURL: user.photoURL ?? null, elo: 1000 };
  };

  const handlePlayWithAi = async () => {
    const player = requireAuth();
    if (!player) return;
    setBusy(true);
    setError(null);
    try {
      const matchId = await createPveMatch(player, BOARD_SIZE);
      navigate(`/game/${matchId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleCreateRoom = async () => {
    const player = requireAuth();
    if (!player) return;
    setBusy(true);
    setError(null);
    try {
      setMyRoomId(await createRoom(player, BOARD_SIZE));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleJoinRoom = async (roomId: string) => {
    const player = requireAuth();
    if (!player) return;
    setBusy(true);
    setError(null);
    try {
      const matchId = await joinRoom(roomId, player);
      navigate(`/game/${matchId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleCancelRoom = async () => {
    if (!myRoomId) return;
    await cancelRoom(myRoomId);
    setMyRoomId(null);
  };

  const handleCopyLink = () => {
    if (!myRoomId) return;
    navigator.clipboard.writeText(`${window.location.origin}/join/${myRoomId}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(`Đăng nhập thất bại: ${err.code ?? err.message}`);
    }
  };
  // --- Header dùng ĐÚNG cấu trúc app-header như mọi màn chơi khác ---
  const header = (
    <div className="app-header">
      <div className="app-header__title">
        <button className="app-header__back" onClick={() => navigate("/")} type="button">
          ← Trở về
        </button>
        <span className="app-header__logo">碁</span>
        <div>
          <div className="app-header__name">Sảnh chờ trực tuyến</div>
          <div className="app-header__subtitle">Ghép trận PvP hoặc chơi cùng AI Engine</div>
        </div>
      </div>

      <div className="lobby__account">
        {authLoading ? (
          <span className="lobby__account-hint">Đang kiểm tra đăng nhập...</span>
        ) : user ? (
          <>
            {user.photoURL && <img src={user.photoURL} alt={user.displayName ?? ""} className="lobby__avatar" />}
            <span className="lobby__account-name">{user.displayName}</span>
            <button className="lobby__signout-btn" onClick={signOutUser} type="button">Đăng xuất</button>
          </>
        ) : (
          <button className="lobby__google-btn" onClick={handleGoogleLogin} type="button">Đăng nhập bằng Google</button>
        )}
      </div>
    </div>
  );

  return (
    <div className="game-layout">
      <GameBackdrop />
      <header className="game-layout__header">{header}</header>

      <div className="lobby-page">
        {error && <div className="lobby__error">{error}</div>}

        <div className="lobby__actions">
          <button className="lobby__action-card lobby__action-card--local" onClick={() => navigate("/game/local")}>
            <span className="lobby__action-icon">🀫</span>
            <span className="lobby__action-title">PvP Local</span>
            <span className="lobby__action-desc">Cùng 1 máy, 2 người thay phiên</span>
          </button>

          <button className="lobby__action-card lobby__action-card--pve" onClick={handlePlayWithAi} disabled={busy || !user}>
            <span className="lobby__action-icon">🤖</span>
            <span className="lobby__action-title">Đấu với AI</span>
            <span className="lobby__action-desc">DualCNN + MCTS Engine</span>
          </button>

          {myRoomId ? (
            <div className="lobby__action-card lobby__action-card--waiting">
              <span className="lobby__action-icon">⏳</span>
              <span className="lobby__action-title">Đang chờ đối thủ...</span>
              <div className="lobby__waiting-buttons">
                <button className="lobby__mini-btn" onClick={handleCopyLink} type="button">{linkCopied ? "Đã copy!" : "Copy Link"}</button>
                <button className="lobby__mini-btn lobby__mini-btn--danger" onClick={handleCancelRoom} type="button">Huỷ</button>
              </div>
            </div>
          ) : (
            <button className="lobby__action-card lobby__action-card--pvp" onClick={handleCreateRoom} disabled={busy || !user}>
              <span className="lobby__action-icon">⚔️</span>
              <span className="lobby__action-title">Tạo phòng PvP</span>
              <span className="lobby__action-desc">Ghép trận với người chơi khác</span>
            </button>
          )}
        </div>

        <h2 className="lobby__section-title">Phòng đang mở ({openRooms.length})</h2>
        <div className="lobby__room-list">
          {openRooms.length === 0 && <p className="lobby__empty">Chưa có phòng nào đang mở. Hãy tạo phòng mới!</p>}
          {openRooms.map((room) => (
            <div key={room.id} className="lobby__room-item">
              <div className="lobby__room-host">
                {room.hostPhotoURL ? (
                  <img src={room.hostPhotoURL} alt={room.hostDisplayName} className="lobby__avatar" />
                ) : (
                  <div className="lobby__avatar lobby__avatar--fallback">{room.hostDisplayName[0]}</div>
                )}
                <div>
                  <div className="lobby__room-host-name">{room.hostDisplayName}</div>
                  <div className="lobby__room-meta">ELO {room.hostElo} · Bàn {room.boardSize}×{room.boardSize}</div>
                </div>
              </div>
              <button className="lobby__join-btn" onClick={() => handleJoinRoom(room.id)} disabled={busy || !user || room.hostUid === user?.uid}>
                Tham gia
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}