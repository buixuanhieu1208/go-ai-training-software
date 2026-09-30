// src/components/Auth/Register.tsx
// Trang Đăng ký — Firebase Auth (Email/Password) + tạo hồ sơ users/{uid} trên Firestore.
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";
import { useAuth } from "../../contexts/AuthContext";
import { translateAuthError, USERNAME_REGEX } from "../../services/authService";

export interface RegisterProps {
  onBackHome: () => void;
  onGoLogin: () => void;
  /** Giữ để tương thích App.tsx — điều hướng sau đăng ký do component tự xử lý (/online). */
  onAuthenticated?: () => void;
}

export function Register({ onBackHome, onGoLogin }: RegisterProps) {
  const navigate = useNavigate();
  const { registerWithEmail } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (!USERNAME_REGEX.test(username.trim())) {
      setError("Username gồm 3–20 ký tự: chữ cái không dấu, số, dấu gạch dưới (_) hoặc dấu chấm (.).");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Email chưa đúng định dạng.");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu cần tối thiểu 6 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    if (!agree) {
      setError("Bạn cần đồng ý với Điều khoản sử dụng để tiếp tục.");
      return;
    }

    setSubmitting(true);
    try {
      await registerWithEmail(email, password, username);
      navigate("/online");
    } catch (err) {
      setError(translateAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Bắt đầu hành trình"
      title="Tạo tài khoản"
      subtitle="Lưu tiến trình luyện tập, lịch sử ván đấu và bài Tsumego của riêng bạn."
      onBackHome={onBackHome}
      footer={
        <>
          Đã có tài khoản?{" "}
          <button type="button" className="auth-link" onClick={onGoLogin}>
            Đăng nhập
          </button>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label className="auth-field">
          <span className="auth-field__label">Tên người dùng (Username)</span>
          <input
            className="auth-input"
            type="text"
            autoComplete="username"
            placeholder="vd: hieu_bui"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="auth-field">
          <span className="auth-field__label">Email</span>
          <input
            className="auth-input"
            type="email"
            autoComplete="email"
            placeholder="ban@vidu.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="auth-field">
          <span className="auth-field__label">Mật khẩu</span>
          <div className="auth-input-wrap">
            <input
              className="auth-input"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Tối thiểu 6 ký tự"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="auth-input-wrap__toggle"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>
        </label>

        <label className="auth-field">
          <span className="auth-field__label">Xác nhận mật khẩu</span>
          <input
            className="auth-input"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <label className="auth-checkbox">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span>
            Tôi đồng ý với <span className="auth-link auth-link--static">Điều khoản sử dụng</span>
          </span>
        </label>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-submit" disabled={submitting}>
          {submitting ? "Đang tạo tài khoản…" : "Tạo tài khoản"}
        </button>
      </form>
    </AuthLayout>
  );
}