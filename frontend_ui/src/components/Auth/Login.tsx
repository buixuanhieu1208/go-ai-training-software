// src/components/Auth/Login.tsx
// Trang Đăng nhập — Firebase Auth (Email/Password + Google), đồng bộ hồ sơ Firestore.
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";
import { useAuth } from "../../contexts/AuthContext";
import { translateAuthError } from "../../services/authService";

export interface LoginProps {
  onBackHome: () => void;
  onGoRegister: () => void;
  /** Giữ để tương thích App.tsx — điều hướng sau đăng nhập do component tự xử lý (/online). */
  onAuthenticated?: () => void;
}

export function Login({ onBackHome, onGoRegister }: LoginProps) {
  const navigate = useNavigate();
  const { loginWithEmail, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Email chưa đúng định dạng.");
      return;
    }

    setSubmitting(true);
    try {
      await loginWithEmail(email, password, remember);
      navigate("/online");
    } catch (err) {
      setError(translateAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await signInWithGoogle();
      navigate("/online");
    } catch (err) {
      setError(translateAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Chào mừng trở lại"
      title="Đăng nhập"
      subtitle="Tiếp tục hành trình luyện cờ vây cùng AI của bạn."
      onBackHome={onBackHome}
      footer={
        <>
          Chưa có tài khoản?{" "}
          <button type="button" className="auth-link" onClick={onGoRegister}>
            Đăng ký ngay
          </button>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
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
              autoComplete="current-password"
              placeholder="••••••••"
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

        <div className="auth-row">
          <label className="auth-checkbox">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            <span>Ghi nhớ đăng nhập</span>
          </label>
          <button type="button" className="auth-link auth-link--muted">
            Quên mật khẩu?
          </button>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-submit" disabled={submitting}>
          {submitting ? "Đang đăng nhập…" : "Đăng nhập"}
        </button>

        <div className="auth-divider">
          <span>hoặc</span>
        </div>

        <button type="button" className="auth-oauth" onClick={handleGoogle} disabled={submitting}>
          <span className="auth-oauth__icon">G</span> Tiếp tục với Google
        </button>
      </form>
    </AuthLayout>
  );
}