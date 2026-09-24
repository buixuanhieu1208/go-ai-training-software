// src/components/Auth/Login.tsx
// Trang Đăng nhập — hiện tại chỉ là UI (chưa nối Backend xác thực thật).
// Submit giả lập độ trễ mạng rồi coi như đăng nhập thành công, quay về Trang chủ.

import { useState, type FormEvent } from "react";
import { AuthLayout } from "./AuthLayout";

export interface LoginProps {
  onBackHome: () => void;
  onGoRegister: () => void;
  onAuthenticated: () => void;
}

export function Login({ onBackHome, onGoRegister, onAuthenticated }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
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

    // TODO: nối API đăng nhập thật khi Backend sẵn sàng — hiện đang giả lập.
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onAuthenticated();
    }, 650);
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

        <button type="button" className="auth-oauth" disabled title="Sắp ra mắt">
          <span className="auth-oauth__icon">G</span> Tiếp tục với Google
        </button>
      </form>
    </AuthLayout>
  );
}
