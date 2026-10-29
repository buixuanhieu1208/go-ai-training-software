// src/components/Online/tabs/PlayTab.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import {
  startQuickMatch,
  listenRoom,
  listenFriendsProfiles,
  sendMatchInvite,
  listenIncomingMatchInvites,
  acceptMatchInvite,
  declineMatchInvite,
  cancelRoom,
} from "../../../services/firestoreService";
import type { UserProfile } from "../../../types/user";
import type { UseMatchResult } from "../../../types/match";
import "./PlayTab.css";

interface PlayTabProps {
  onEnterMatch: (matchId: string) => void;
  activeMatchId?: string | null;
  matchState?: UseMatchResult | null;
  onResign?: () => void;
  onSwitchToAnalysis?: () => void;
}

// Hệ thống thời gian Byoyomi (秒読み) — chuẩn thi đấu cờ vây quốc tế.
const TIME_CONTROLS = [
  {
    id: "quick",
    label: "Cờ chớp",
    byoyomi: { 9: "3 phút + 5s", 13: "5 phút + 10s", 19: "10 phút + 15s" },
    badge: null,
  },
  {
    id: "normal",
    label: "Nhanh",
    byoyomi: { 9: "5 phút + 10s", 13: "15 phút + 20s", 19: "20 phút + 30s" },
    badge: "Phổ biến",
  },
  {
    id: "standard",
    label: "Tiêu chuẩn",
    byoyomi: { 9: "10 phút + 20s", 13: "25 phút + 30s", 19: "40 phút + 1 phút" },
    badge: null,
  },
  {
    id: "classical",
    label: "Cổ điển",
    byoyomi: { 9: "20 phút + 30s", 13: "45 phút + 1 phút", 19: "90 phút + 3 phút" },
    badge: null,
  },
] as const;

const BOARD_SIZES = [9, 13, 19] as const;

export function PlayTab({
  onEnterMatch,
  activeMatchId,
  matchState,
  onResign,
  onSwitchToAnalysis,
}: PlayTabProps) {
  const { user, profile } = useAuth();
  const [busy, setBusy] = useState(false);
  const [waitingRoomId, setWaitingRoomId] = useState<string | null>(null);
  const [showFriendPicker, setShowFriendPicker] = useState(false);
  const [friends, setFriends] = useState<UserProfile[]>([]);
  const [incomingInvites, setIncomingInvites] = useState<any[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<typeof TIME_CONTROLS[number]["id"]>("normal");
  const [selectedSize, setSelectedSize] = useState<typeof BOARD_SIZES[number]>(19);
  const [confirmingResign, setConfirmingResign] = useState(false);

  const isPlaying = Boolean(activeMatchId && matchState?.match?.status === "ongoing");

  useEffect(() => {
    if (!profile) return;
    return listenFriendsProfiles(profile.friendsList, (list) => setFriends(list as UserProfile[]));
  }, [profile]);

  useEffect(() => {
    if (!user) return;
    return listenIncomingMatchInvites(user.uid, setIncomingInvites);
  }, [user]);

  useEffect(() => {
    if (!waitingRoomId) return;
    return listenRoom(waitingRoomId, (room) => {
      if (room?.status === "matched" && room.matchId) {
        setWaitingRoomId(null);
        onEnterMatch(room.matchId);
      }
    });
  }, [waitingRoomId, onEnterMatch]);

  // Hủy phòng nếu người dùng chuyển tab hoặc thoát khỏi trang trong lúc đang tìm trận
  useEffect(() => {
    return () => {
      if (waitingRoomId) {
        import("../../../services/firestoreService").then(({ cancelRoom }) => {
          cancelRoom(waitingRoomId).catch(() => {});
        });
      }
    };
  }, [waitingRoomId]);

  const requireLogin = (): boolean => {
    if (!user) {
      setNotice("Bạn cần đăng nhập bằng Google (góc trên bên phải) trước khi chơi Online.");
      return false;
    }
    return true;
  };

  const handleQuickMatch = async () => {
    if (isPlaying) {
      setNotice("Bạn đang trong trận đấu. Vui lòng kết thúc ván hiện tại trước khi ghép trận mới.");
      return;
    }
    if (!requireLogin() || !user || !profile) return;
    setNotice(null);
    setBusy(true);
    try {
      const { matchId, roomId } = await startQuickMatch(
        { uid: user.uid, username: profile.username, photoURL: profile.photoURL, elo: profile.elo },
        selectedSize
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
    if (isPlaying) {
      setNotice("Bạn đang trong trận đấu. Không thể thách đấu ván khác.");
      return;
    }
    if (!requireLogin()) return;
    setNotice(null);
    setShowFriendPicker((s) => !s);
  };

  const handleInviteFriend = async (friendUid: string) => {
    if (!profile) return;
    try {
      await sendMatchInvite(profile, friendUid, selectedSize);
      setShowFriendPicker(false);
      setNotice("Đã gửi lời mời thách đấu!");
    } catch (err: any) {
      setNotice(err.message);
    }
  };

  const handleAcceptInvite = async (invite: any) => {
    if (isPlaying) {
      setNotice("Bạn đang trong ván đấu. Vui lòng kết thúc ván trước khi nhận lời mời khác.");
      return;
    }
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

  const handleCancelSearch = async () => {
    if (!waitingRoomId) return;
    setBusy(true);
    try {
      await cancelRoom(waitingRoomId);
    } catch (err: any) {
      console.error(err);
    } finally {
      setWaitingRoomId(null);
      setBusy(false);
    }
  };

  const handleResignClick = () => {
    if (!confirmingResign) {
      setConfirmingResign(true);
      setTimeout(() => setConfirmingResign(false), 4000);
    } else {
      setConfirmingResign(false);
      onResign?.();
    }
  };

  // Lấy mô tả byoyomi hiển thị theo kích thước bàn đang chọn
  const selectedTc = TIME_CONTROLS.find((tc) => tc.id === selectedTime)!;
  const byoyomiLabel = selectedTc.byoyomi[selectedSize];

  return (
    <div className="play-tab">
      {notice && <div className="play-tab__notice">{notice}</div>}

      {/* Khi đang thi đấu: Khóa nút tìm trận và hiển thị trạng thái trận đấu */}
      {isPlaying ? (
        <div className="play-tab__ongoing-card">
          <div className="play-tab__ongoing-header">
            <span className="play-tab__ongoing-pulse">●</span>
            <span className="play-tab__ongoing-title">Trận đấu đang diễn ra</span>
          </div>

          <div className="play-tab__ongoing-body">
            <div className="play-tab__ongoing-row">
              <span className="play-tab__ongoing-label">Đối thủ:</span>
              <span className="play-tab__ongoing-value">
                <strong>
                  {matchState?.opponent?.displayName ||
                    (matchState?.myColor === "black" ? "Quân Trắng" : "Quân Đen")}
                </strong>
                {matchState?.opponent?.elo && (
                  <span className="play-tab__ongoing-elo">({matchState.opponent.elo} ELO)</span>
                )}
              </span>
            </div>

            <div className="play-tab__ongoing-row">
              <span className="play-tab__ongoing-label">Màu quân của bạn:</span>
              <span className="play-tab__ongoing-value">
                <span
                  style={{
                    display: "inline-block",
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    background: matchState?.myColor === "black" ? "#111" : "#fff",
                    border: "1px solid rgba(255,255,255,0.4)",
                    marginRight: 6,
                    verticalAlign: "middle",
                  }}
                />
                <strong>
                  {matchState?.myColor === "black" ? "Quân Đen (Đi trước)" : "Quân Trắng (Komi 7.5)"}
                </strong>
              </span>
            </div>

            <div className="play-tab__ongoing-row">
              <span className="play-tab__ongoing-label">Lượt đi:</span>
              <span
                className="play-tab__ongoing-value"
                style={{
                  color: matchState?.isMyTurn ? "var(--color-accent-jade)" : "var(--color-text-secondary)",
                  fontWeight: 600,
                }}
              >
                {matchState?.isMyTurn ? "Tới lượt bạn" : "Đối thủ đang suy nghĩ..."}
              </span>
            </div>

            <div className="play-tab__ongoing-row">
              <span className="play-tab__ongoing-label">Số nước đã đi:</span>
              <span className="play-tab__ongoing-value">
                {matchState?.moveHistory?.length || 0} nước
              </span>
            </div>
          </div>

          <div className="play-tab__ongoing-notice">
            Bạn đang trong một ván cờ trực tiếp. Chức năng ghép trận ngẫu nhiên được tạm khóa để bảo đảm
            tính công bằng cho ván đấu.
          </div>

          <div className="play-tab__ongoing-actions">
            {onSwitchToAnalysis && (
              <button
                type="button"
                className="play-tab__ongoing-btn play-tab__ongoing-btn--view"
                onClick={onSwitchToAnalysis}
              >
                Xem biên bản nước đi
              </button>
            )}

            <button
              type="button"
              className={`play-tab__ongoing-btn play-tab__ongoing-btn--resign ${
                confirmingResign ? "play-tab__ongoing-btn--confirming" : ""
              }`}
              onClick={handleResignClick}
            >
              {confirmingResign ? "Bấm lần nữa để xác nhận Xin thua" : "Xin thua (Đầu hàng)"}
            </button>
          </div>
        </div>
      ) : (
        /* Giao diện sảnh chờ khi chưa vào trận */
        <>
          {/* Bộ chọn kích thước bàn */}
          <div className="play-tab__section-label">Kích thước bàn</div>
          <div className="play-tab__size-row">
            {BOARD_SIZES.map((sz) => (
              <button
                key={sz}
                type="button"
                className={`play-tab__size-btn ${selectedSize === sz ? "play-tab__size-btn--active" : ""}`}
                onClick={() => setSelectedSize(sz)}
              >
                {sz}×{sz}
              </button>
            ))}
          </div>

          {/* Bộ chọn thời gian — Byoyomi */}
          <div className="play-tab__section-label">
            Thời gian
            <span className="play-tab__byoyomi-tip"> · Byoyomi (秒読み)</span>
          </div>
          <div className="play-tab__time-grid">
            {TIME_CONTROLS.map((tc) => (
              <button
                key={tc.id}
                type="button"
                className={`play-tab__time-card ${selectedTime === tc.id ? "play-tab__time-card--active" : ""}`}
                onClick={() => setSelectedTime(tc.id)}
              >
                {tc.badge && <span className="play-tab__time-badge">{tc.badge}</span>}
                <span className="play-tab__time-card-label">{tc.label}</span>
                <span className="play-tab__time-card-sub">{tc.byoyomi[selectedSize]}</span>
              </button>
            ))}
          </div>

          {/* Dòng tóm tắt thời gian đã chọn */}
          <div className="play-tab__time-summary">
            <span>
              {selectedSize}×{selectedSize} · {byoyomiLabel}/nước đọc
            </span>
          </div>

          {/* Ghép trận */}
          {waitingRoomId ? (
            <div className="play-tab__waiting-wrapper">
              <div className="play-tab__waiting">
                <span className="play-tab__waiting-spinner" />
                Đang tìm đối thủ...
              </div>
              <button className="play-tab__cancel-btn" onClick={handleCancelSearch} disabled={busy}>
                Hủy
              </button>
            </div>
          ) : (
            <button className="play-tab__primary-btn" onClick={handleQuickMatch} disabled={busy}>
              Ghép trận ngẫu nhiên
            </button>
          )}

          {/* Thách bạn bè */}
          <button className="play-tab__secondary-btn" onClick={handleToggleFriendPicker} disabled={busy}>
            Thách đấu bạn bè
          </button>

          {showFriendPicker && (
            <div className="play-tab__friend-picker">
              {friends.length === 0 ? (
                <p className="play-tab__empty">Chưa có bạn bè — thêm ở tab "Bạn bè" trước.</p>
              ) : (
                friends.map((f) => (
                  <button
                    key={f.uid}
                    className="play-tab__friend-picker-row"
                    onClick={() => handleInviteFriend(f.uid)}
                  >
                    <span className="play-tab__friend-avatar">{f.username[0]}</span>
                    {f.username}
                  </button>
                ))
              )}
            </div>
          )}

          {/* Lời mời đến */}
          {incomingInvites.length > 0 && (
            <div className="play-tab__section">
              <div className="play-tab__section-title">
                Lời mời thách đấu ({incomingInvites.length})
              </div>
              {incomingInvites.map((inv) => (
                <div key={inv.id} className="play-tab__invite-row">
                  <span>{inv.fromUsername}</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      className="play-tab__invite-accept"
                      onClick={() => handleAcceptInvite(inv)}
                    >
                      Nhận
                    </button>
                    <button
                      className="play-tab__invite-decline"
                      onClick={() => declineMatchInvite(inv.id)}
                    >
                      Từ chối
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}