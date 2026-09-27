// src/components/JoinRoom.tsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { GameBackdrop } from "./Layout/GameBackdrop";
import { joinRoom } from "../services/firestoreService";
import "./GameRoom.css";

export default function JoinRoom() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { user, loading, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (loading || !user || !roomId) return;
    joinRoom(roomId, { uid: user.uid, displayName: user.displayName ?? "Khách", photoURL: user.photoURL ?? null, elo: 1000 })
      .then((matchId: string) => navigate(`/game/${matchId}`))
      .catch(() => navigate("/online"));
  }, [user, loading, roomId, navigate]);

  return (
    <div className="game-layout">
      <GameBackdrop />
      <div className="game-layout__status">
        {loading ? (
          "Đang kiểm tra đăng nhập..."
        ) : !user ? (
          <>
            Cần đăng nhập để tham gia phòng.
            <br />
            <button className="game-room__link-btn" onClick={signInWithGoogle}>Đăng nhập bằng Google</button>
          </>
        ) : (
          "Đang vào phòng..."
        )}
      </div>
    </div>
  );
}