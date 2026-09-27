// src/components/Online/tabs/PlayTab.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import {
  startQuickMatch,
  listenRoom,
  createPveMatch,
  listenFriendsProfiles,
  sendMatchInvite,
  listenIncomingMatchInvites,
  acceptMatchInvite,
  declineMatchInvite,
} from "../../../services/firestoreService";
import type { UserProfile } from "../../../types/user";
import "./PlayTab.css";

interface PlayTabProps {
  onEnterMatch: (matchId: string) => void; // OnlineHub set activeMatchId khi vào trận
}

export function PlayTab({ onEnterMatch }: PlayTabProps) {
  const { user, profile } = useAuth();
  const [busy, setBusy] = useState(false);
  const [waitingRoomId, setWaitingRoomId] = useState<string | null>(null);
  const [showFriendPicker, setShowFriendPicker] = useState(false);
  const [friends, setFriends] = useState<UserProfile[]>([]);
  const [incomingInvites, setIncomingInvites] = useState<any[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    return listenFriendsProfiles(profile.friendsList, (list) => setFriends(list as UserProfile[]));
  }, [profile]);

  useEffect(() => {
    if (!user) return;
    return listenIncomingMatchInvites(user.uid, setIncomingInvites);
  }, [user]);

  // Chờ có người vào phòng quick-match do chính mình tạo
  useEffect(() => {
    if (!waitingRoomId) return;
    return listenRoom(waitingRoomId, (room) => {
      if (room?.status === "matched" && room.matchId) {
        setWaitingRoomId(null);
        onEnterMatch(room.matchId);
      }
    });
  }, [waitingRoomId, onEnterMatch]);

  /** Chặn chung cho mọi hành động cần đăng nhập — hiện thông báo rõ ràng
   * thay vì disable nút im lặng (người dùng không hiểu vì sao nút "chết"). */
  const requireLogin = (): boolean => {
    if (!user) {
      setNotice("Bạn cần đăng nhập bằng Google (góc trên bên phải) trước khi chơi Online.");
      return false;
    }
    return true;
  };

  const handleQuickMatch = async () => {
    if (!requireLogin() || !user || !profile) return;
    setNotice(null);
    setBusy(true);
    try {
      const { matchId, roomId } = await startQuickMatch(
        { uid: user.uid, username: profile.username, photoURL: profile.photoURL, elo: profile.elo },
        19
      );
      if (matchId) onEnterMatch(matchId);
      else if (roomId) setWaitingRoomId(roomId);
    } catch (err: any) {
      setNotice(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleToggleFriendPicker = () => {
    if (!requireLogin()) return;
    setNotice(null);
    setShowFriendPicker((s) => !s);
  };

  const handlePlayAi = async () => {
    if (!requireLogin() || !user || !profile) return;
    setNotice(null);
    setBusy(true);
    try {
      const matchId = await createPveMatch(
        { uid: user.uid, displayName: profile.username, photoURL: profile.photoURL, elo: profile.elo },
        19
      );
      onEnterMatch(matchId);
    } catch (err: any) {
      setNotice(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleInviteFriend = async (friendUid: string) => {
    if (!profile) return;
    try {
      await sendMatchInvite(profile, friendUid, 19);
      setShowFriendPicker(false);
      setNotice("Đã gửi lời mời thách đấu!");
    } catch (err: any) {
      setNotice(err.message);
    }
  };

  const handleAcceptInvite = async (invite: any) => {
    if (!user || !profile) return;
    try {
      const matchId = await acceptMatchInvite(invite, {
        uid: user.uid,
        displayName: profile.username,
        photoURL: user.photoURL,
        elo: profile.elo,
      });
      onEnterMatch(matchId);
    } catch (err: any) {
      setNotice(err.message);
    }
  };

  return (
    <div className="play-tab">
      {notice && <div className="play-tab__notice">{notice}</div>}

      {waitingRoomId ? (
        <div className="play-tab__waiting">⏳ Đang tìm đối thủ...</div>
      ) : (
        <button className="play-tab__primary-btn" onClick={handleQuickMatch} disabled={busy}>
          ⚡ Ghép ngẫu nhiên
        </button>
      )}

      <button className="play-tab__secondary-btn" onClick={handleToggleFriendPicker} disabled={busy}>
        🎯 Chơi với bạn bè
      </button>

      {showFriendPicker && (
        <div className="play-tab__friend-picker">
          {friends.length === 0 ? (
            <p className="play-tab__empty">Chưa có bạn bè — thêm ở tab "Bạn bè" trước.</p>
          ) : (
            friends.map((f) => (
              <button key={f.uid} className="play-tab__friend-picker-row" onClick={() => handleInviteFriend(f.uid)}>
                Mời {f.username}
              </button>
            ))
          )}
        </div>
      )}

      <button className="play-tab__secondary-btn" onClick={handlePlayAi} disabled={busy}>
        🤖 Đấu với AI
      </button>

      {incomingInvites.length > 0 && (
        <div className="play-tab__section">
          <div className="play-tab__section-title">Lời mời thách đấu</div>
          {incomingInvites.map((inv) => (
            <div key={inv.id} className="play-tab__invite-row">
              <span>{inv.fromUsername}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="play-tab__invite-accept" onClick={() => handleAcceptInvite(inv)}>
                  Nhận
                </button>
                <button className="play-tab__invite-decline" onClick={() => declineMatchInvite(inv.id)}>
                  Từ chối
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}