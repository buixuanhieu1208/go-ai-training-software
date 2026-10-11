import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { UserProfile } from "../../types/user";
import { updateUsername } from "../../services/firestoreService";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { user, profile, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || (user && !profile)) {
    return (
      <div className="profile-page-wrapper">
        <div className="profile-page__loading">Đang tải hồ sơ...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="profile-page-wrapper">
        <div className="profile-page__loading">
          Bạn cần đăng nhập để xem trang cá nhân.
          <button className="profile-btn-primary" onClick={() => navigate("/")}>Về trang chủ</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page-wrapper">
      <div className="profile-header-nav">
        <button className="profile-back-btn" onClick={() => navigate("/")}>
          ← Quay lại trang chủ
        </button>
        <div className="profile-header-actions">
          <button className="profile-btn-outline" onClick={() => logout()}>Đăng xuất</button>
        </div>
      </div>

      <div className="profile-container">
        {/* Cột trái: Thông tin cá nhân */}
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-card__banner" />
            <div className="profile-card__avatar-wrapper">
              {profile.photoURL ? (
                <img src={profile.photoURL} alt="" className="profile-card__avatar" />
              ) : (
                <div className="profile-card__avatar profile-card__avatar--fallback">
                  {profile.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="profile-card__info">
              {isEditing ? (
                <div className="profile-edit-form">
                  <input
                    className="profile-input"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Tên hiển thị mới..."
                  />
                  {error && <div className="profile-error">{error}</div>}
                  <div className="profile-edit-actions">
                    <button className="profile-btn-primary" onClick={handleSave} disabled={saving}>
                      {saving ? "Đang lưu..." : "Lưu"}
                    </button>
                    <button className="profile-btn-ghost" onClick={() => setIsEditing(false)}>Hủy</button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="profile-card__name">
                    {profile.username}
                  </h1>
                  <p className="profile-card__email">{profile.email}</p>
                  <button className="profile-btn-outline profile-edit-btn" onClick={() => setIsEditing(true)}>
                    Chỉnh sửa hồ sơ
                  </button>
                  {saved && <div className="profile-success">Đã cập nhật hồ sơ!</div>}
                </>
              )}
            </div>

            <div className="profile-stats">
              <div className="profile-stat-box">
                <span className="profile-stat-label">ELO Cờ Vây</span>
                <span className="profile-stat-value">{profile.elo}</span>
              </div>
              <div className="profile-stat-box">
                <span className="profile-stat-label">Bạn bè</span>
                <span className="profile-stat-value">{profile.friendsList?.length || 0}</span>
              </div>
            </div>
            
            <div className="profile-joined">
              Tham gia: {profile.createdAt ? new Date(profile.createdAt.seconds * 1000).toLocaleDateString("vi-VN") : "Gần đây"}
            </div>
          </div>
        </div>

        {/* Cột phải: Lịch sử & Thống kê chi tiết */}
        <div className="profile-main">
          <div className="profile-section">
            <h2 className="profile-section-title">Tổng quan thành tích</h2>
            <div className="profile-overview-grid">
              <div className="profile-overview-card">
                <div className="profile-overview-icon">🏆</div>
                <div className="profile-overview-data">
                  <h3>Xếp hạng</h3>
                  <p>Kỳ thủ ELO {profile.elo}</p>
                </div>
              </div>
              <div className="profile-overview-card">
                <div className="profile-overview-icon">⚔️</div>
                <div className="profile-overview-data">
                  <h3>Ván đấu</h3>
                  <p>Sẽ cập nhật sớm</p>
                </div>
              </div>
              <div className="profile-overview-card">
                <div className="profile-overview-icon">🧩</div>
                <div className="profile-overview-data">
                  <h3>Tsumego đã giải</h3>
                  <p>Sẽ cập nhật sớm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2 className="profile-section-title">Lịch sử ván đấu (Sắp ra mắt)</h2>
            <div className="profile-empty-state">
              <p>Chưa có dữ liệu ván đấu nào được ghi nhận.</p>
              <button className="profile-btn-primary" onClick={() => navigate("/online")}>Chơi ván đầu tiên</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}