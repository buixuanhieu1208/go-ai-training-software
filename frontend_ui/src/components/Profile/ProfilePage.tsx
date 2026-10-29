// src/components/Profile/ProfilePage.tsx
// Trang cá nhân: Thông tin kỳ thủ, Xếp hạng Kyu/Dan & ELO, Đổi mật khẩu, và Thống kê thành tích.

import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { updateUsername } from "../../services/firestoreService";
import { changeUserPassword, requestPasswordReset } from "../../services/authService";
import { getRankFromElo } from "../../utils/rankUtils";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { user, profile, loading: authLoading, signOutUser } = useAuth();
  const navigate = useNavigate();

  // Đổi Username
  const [usernameInput, setUsernameInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Đổi Mật khẩu
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError, setPwdError] = useState<string | null>(null);
  const [pwdSuccess, setPwdSuccess] = useState<string | null>(null);

  // Quên / Gửi email đặt lại mật khẩu
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (profile) setUsernameInput(profile.username);
  }, [profile]);

  const rankInfo = useMemo(() => {
    return getRankFromElo(profile?.elo ?? 1000);
  }, [profile?.elo]);

  const solvedTsumegoCount = useMemo(() => {
    try {
      const raw = localStorage.getItem("go_solved_puzzle_ids");
      return raw ? JSON.parse(raw).length : 0;
    } catch {
      return 0;
    }
  }, []);

  const isPasswordUser = useMemo(() => {
    return user?.providerData.some((p) => p.providerId === "password");
  }, [user]);

  const handleSaveUsername = async () => {
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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError(null);
    setPwdSuccess(null);

    if (!currentPassword) {
      setPwdError("Vui lòng nhập mật khẩu hiện tại.");
      return;
    }
    if (newPassword.length < 6) {
      setPwdError("Mật khẩu mới phải có tối thiểu 6 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    setPwdLoading(true);
    try {
      await changeUserPassword(currentPassword, newPassword);
      setPwdSuccess("Đổi mật khẩu thành công!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPwdError(err.message);
    } finally {
      setPwdLoading(false);
    }
  };

  const handleSendResetEmail = async () => {
    setResetLoading(true);
    setPwdError(null);
    setResetSuccess(null);
    try {
      await requestPasswordReset(profile?.email || user?.email || undefined);
      setResetSuccess("Đã gửi email khôi phục mật khẩu. Vui lòng kiểm tra hộp thư!");
    } catch (err: any) {
      setPwdError(err.message);
    } finally {
      setResetLoading(false);
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
          <button className="profile-btn-outline" onClick={() => signOutUser()}>Đăng xuất</button>
        </div>
      </div>

      <div className="profile-container">
        {/* Cột trái: Thông tin cá nhân & Rank Badge */}
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
                    <button className="profile-btn-primary" onClick={handleSaveUsername} disabled={saving}>
                      {saving ? "Đang lưu..." : "Lưu"}
                    </button>
                    <button className="profile-btn-ghost" onClick={() => setIsEditing(false)}>Hủy</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="profile-card__header-row">
                    <h1 className="profile-card__name">{profile.username}</h1>
                    <span
                      className="profile-rank-badge"
                      style={{ backgroundColor: rankInfo.badgeColor, color: rankInfo.textColor }}
                      title={`Đẳng cấp: ${rankInfo.title}`}
                    >
                      {rankInfo.rank}
                    </span>
                  </div>
                  <p className="profile-card__email">{profile.email}</p>
                  <button className="profile-btn-outline profile-edit-btn" onClick={() => setIsEditing(true)}>
                    Chỉnh sửa tên hiển thị
                  </button>
                  {saved && <div className="profile-success">Đã cập nhật hồ sơ!</div>}
                </>
              )}
            </div>

            {/* Hộp tiến trình Rank */}
            <div className="profile-rank-progress">
              <div className="profile-rank-progress__label">
                <span>Cấp bậc: <strong>{rankInfo.rank} ({rankInfo.title})</strong></span>
                {rankInfo.nextRank && <span>Mục tiêu: <strong>{rankInfo.nextRank}</strong></span>}
              </div>
              <div className="profile-rank-progress__bar-wrap">
                <div
                  className="profile-rank-progress__bar"
                  style={{ width: `${rankInfo.progressPct}%`, backgroundColor: rankInfo.badgeColor }}
                />
              </div>
              <div className="profile-rank-progress__sub">
                {rankInfo.nextRank
                  ? `Còn ${rankInfo.pointsToNext} ELO để thăng hạng ${rankInfo.nextRank}`
                  : "Bạn đã đạt cấp bậc cao nhất!"}
              </div>
            </div>

            <div className="profile-stats">
              <div className="profile-stat-box">
                <span className="profile-stat-label">Hệ số ELO</span>
                <span className="profile-stat-value">{profile.elo}</span>
              </div>
              <div className="profile-stat-box">
                <span className="profile-stat-label">Bạn bè</span>
                <span className="profile-stat-value">{profile.friendsList?.length || 0}</span>
              </div>
            </div>

            <div className="profile-joined">
              Tham gia: {((profile as any).createdAt || profile.created_at) ? new Date(((profile as any).createdAt?.seconds || 0) * 1000 || Date.now()).toLocaleDateString("vi-VN") : "Gần đây"}
            </div>
          </div>
        </div>

        {/* Cột phải: Thành tích & Bảo mật (Đổi mật khẩu) */}
        <div className="profile-main">
          {/* Section 1: Tổng quan thành tích */}
          <div className="profile-section">
            <h2 className="profile-section-title">Tổng quan thành tích & Đẳng cấp</h2>
            <div className="profile-overview-grid">
              <div className="profile-overview-card">
                <div className="profile-overview-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
                    <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>
                <div className="profile-overview-data">
                  <h3>Xếp hạng cờ vây</h3>
                  <p>
                    {rankInfo.rank} · {rankInfo.title}
                  </p>
                </div>
              </div>

              <div className="profile-overview-card">
                <div className="profile-overview-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
                    <line x1="13" y1="19" x2="19" y2="13" />
                    <line x1="16" y1="16" x2="20" y2="20" />
                    <line x1="19" y1="21" x2="21" y2="19" />
                    <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
                    <line x1="5" y1="14" x2="9" y2="18" />
                    <line x1="7" y1="17" x2="4" y2="20" />
                    <line x1="3" y1="19" x2="5" y2="21" />
                  </svg>
                </div>
                <div className="profile-overview-data">
                  <h3>Thành tích thi đấu</h3>
                  <p>
                    {profile.wins ?? 0} Thắng / {profile.losses ?? 0} Thua
                  </p>
                </div>
              </div>

              <div className="profile-overview-card">
                <div className="profile-overview-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-jade)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="3" y1="15" x2="21" y2="15" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                    <line x1="15" y1="3" x2="15" y2="21" />
                  </svg>
                </div>
                <div className="profile-overview-data">
                  <h3>Tsumego đã giải</h3>
                  <p>{solvedTsumegoCount} bài hoàn thành</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Bảo mật & Đổi mật khẩu */}
          <div className="profile-section">
            <div className="profile-section-header">
              <h2 className="profile-section-title">Bảo mật tài khoản</h2>
              <button
                type="button"
                className="profile-btn-outline"
                onClick={() => setShowPasswordSection((p) => !p)}
              >
                {showPasswordSection ? "Đóng form đổi mật khẩu" : "Đổi mật khẩu"}
              </button>
            </div>

            {showPasswordSection && (
              <div className="profile-security-box">
                {isPasswordUser ? (
                  <form onSubmit={handleChangePassword} className="profile-pwd-form">
                    <div className="profile-form-group">
                      <label className="profile-form-label">Mật khẩu hiện tại</label>
                      <input
                        type="password"
                        className="profile-input"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Nhập mật khẩu hiện tại..."
                        autoComplete="current-password"
                      />
                    </div>

                    <div className="profile-form-group">
                      <label className="profile-form-label">Mật khẩu mới (tối thiểu 6 ký tự)</label>
                      <input
                        type="password"
                        className="profile-input"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nhập mật khẩu mới..."
                        autoComplete="new-password"
                      />
                    </div>

                    <div className="profile-form-group">
                      <label className="profile-form-label">Xác nhận mật khẩu mới</label>
                      <input
                        type="password"
                        className="profile-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu mới..."
                        autoComplete="new-password"
                      />
                    </div>

                    {pwdError && <div className="profile-error">{pwdError}</div>}
                    {pwdSuccess && <div className="profile-success">{pwdSuccess}</div>}
                    {resetSuccess && <div className="profile-success">{resetSuccess}</div>}

                    <div className="profile-pwd-actions">
                      <button type="submit" className="profile-btn-primary" disabled={pwdLoading}>
                        {pwdLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
                      </button>
                      <button
                        type="button"
                        className="profile-btn-ghost"
                        onClick={handleSendResetEmail}
                        disabled={resetLoading}
                      >
                        {resetLoading ? "Đang gửi..." : "Quên mật khẩu? Gửi email khôi phục"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-oauth-notice">
                    <p>
                      Tài khoản của bạn được liên kết qua <strong>Google OAuth</strong>.
                      Mật khẩu được bảo vệ trực tiếp và an toàn bởi Google.
                    </p>
                    <button
                      type="button"
                      className="profile-btn-outline"
                      onClick={handleSendResetEmail}
                      disabled={resetLoading}
                    >
                      {resetLoading ? "Đang gửi..." : "Gửi email thiết lập mật khẩu riêng"}
                    </button>
                    {resetSuccess && <div className="profile-success">{resetSuccess}</div>}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section 3: Lịch sử ván đấu */}
          <div className="profile-section">
            <h2 className="profile-section-title">Lịch sử ván đấu</h2>
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