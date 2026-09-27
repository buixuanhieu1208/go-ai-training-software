// src/components/AddFriend.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { sendFriendRequest } from "../services/firestoreService";
import "./GameRoom.css";

export default function AddFriend() {
  const { uid: targetUid } = useParams<{ uid: string }>();
  const navigate = useNavigate();
  const { user, profile, loading, signInWithGoogle } = useAuth();
  const [status, setStatus] = useState<"idle" | "sent" | "error" | "self">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (loading || !user || !profile || !targetUid) return;
    if (user.uid === targetUid) {
      setStatus("self");
      return;
    }
    sendFriendRequest(profile, targetUid)
      .then(() => setStatus("sent"))
      .catch((err) => {
        setStatus("error");
        setErrorMsg(err.message);
      });
  }, [user, profile, loading, targetUid]);

  if (loading) return <div className="game-layout__status">Đang kiểm tra đăng nhập...</div>;

  if (!user) {
    return (
      <div className="game-layout__status">
        Cần đăng nhập để gửi lời mời kết bạn.
        <br />
        <button className="game-room__link-btn" onClick={signInWithGoogle}>Đăng nhập bằng Google</button>
      </div>
    );
  }

  return (
    <div className="game-layout__status">
      {status === "idle" && "Đang gửi lời mời kết bạn..."}
      {status === "sent" && "Đã gửi lời mời kết bạn! Đang chuyển về sảnh chờ..."}
      {status === "self" && "Đây là link kết bạn của chính bạn."}
      {status === "error" && `Không thể gửi lời mời: ${errorMsg}`}
      {(status === "sent" || status === "self" || status === "error") && (
        <>
          <br />
          <button className="game-room__link-btn" onClick={() => navigate("/online")}>Về sảnh chờ</button>
        </>
      )}
    </div>
  );
}