// src/components/Profile/ProfilePage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { GameBackdrop } from "../Layout/GameBackdrop";
import type { UserProfile } from "../../types/user";
import { updateUsername } from "../../services/firestoreService";
import "./ProfilePage.css";

/** Trích username mặc định từ email Google: "hieu.bui123@gmail.com" -> "hieu.bui123" */
function deriveUsernameFromEmail(email: string): string {
  return email.split("@")[0];
}

export default function ProfilePage() {
  const { user, profile, loading: authLoading } = useAuth(); 
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) setUsernameInput(profile.username);
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    setError(null);
    setSaving(true);
    try {
      await updateUsername(user.uid, usernameInput); 
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || (user && !profile)) {
    return (
      <div className="game-layout">
        <div className="game-layout__status">Đang tải...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="game-layout">
        <div className="game-layout__status">Bạn cần đăng nhập để xem trang cá nhân.</div>
      </div>
    );
  }

  const header = (
    <div className="app-header">
      <div className="app-header__title">
        <button className="app-header__back" onClick={() => navigate("/online")} type="button">
          ← Trở về
        </button>
        <span className="app-header__logo">碁</span>
        <div>
          <div className="app-header__name">Trang cá nhân</div>
          <div className="app-header__subtitle">Cập nhật thông tin & Username của bạn</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="game-layout">
      <GameBackdrop />
      <header className="game-layout__header">{header}</header>

      <div className="profile-page">
        <div className="profile-page__card">
          <div className="profile-page__avatar-row">
            {profile.photoURL ? (
              <img src={profile.photoURL} alt="" className="profile-page__avatar" />
            ) : (
              <div className="profile-page__avatar profile-page__avatar--fallback">{profile.username[0]}</div>
            )}
            <div>
              <div className="profile-page__elo">ELO {profile.elo}</div>
              <div className="profile-page__email">{profile.email}</div>
            </div>
          </div>

          <label className="profile-page__field">
            <span className="profile-page__label">Username (dùng để bạn bè tìm kiếm)</span>
            <input
              className="profile-page__input"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="vd: hieu_bui"
            />
          </label>

          {error && <div className="profile-page__error">{error}</div>}

          <button className="profile-page__save-btn" onClick={handleSave} disabled={saving}>
            {saving ? "Đang lưu..." : saved ? "Đã lưu!" : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
}