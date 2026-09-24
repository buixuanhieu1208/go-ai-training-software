// src/components/Auth/Register.tsx
// Trang Đăng ký — hiện tại chỉ là UI (chưa nối Backend xác thực thật).
// Submit giả lập độ trễ mạng rồi coi như tạo tài khoản thành công, quay về Trang chủ.

import { useState, type FormEvent } from "react";
import { AuthLayout } from "./AuthLayout";

export interface RegisterProps {
  onBackHome: () => void;
  onGoLogin: () => void;
  onAuthenticated: () => void;
}

export function Register({ onBackHome, onGoLogin, onAuthenticated }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
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

    // TODO: nối API đăng ký thật khi Backend sẵn sàng — hiện đang giả lập.
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onAuthenticated();
    }, 650);
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
          <span className="auth-field__label">Họ và tên</span>
          <input
            className="auth-input"
            type="text"
            autoComplete="name"
            placeholder="Nguyễn Văn A"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
