// src/components/Auth/AuthLayout.tsx
// Khung dùng chung cho trang Đăng nhập / Đăng ký: nền bàn cờ vây (GoBoardBackdrop)
// + thẻ kính mờ (glass card) đặt giữa màn hình, theo đúng token màu/tông tối
// của toàn bộ app. Chỉ là UI — chưa nối Backend xác thực thật.

import type { ReactNode } from "react";
import { GoBoardBackdrop } from "./GoBoardBackdrop";
import "./Auth.css";

export interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
  onBackHome: () => void;
}

export function AuthLayout({ eyebrow, title, subtitle, children, footer, onBackHome }: AuthLayoutProps) {
  return (
    <div className="auth-shell">
      <GoBoardBackdrop />

      <div className="auth-page">
        <button type="button" className="auth-back" onClick={onBackHome}>
          <span aria-hidden="true">←</span> Về trang chủ
        </button>

        <div className="auth-card">
          <div className="auth-card__brand">
            <span className="sidebar__logo">碁</span>
            <span>Cờ Vây AI</span>
          </div>

          <span className="auth-card__eyebrow">{eyebrow}</span>
          <h1 className="auth-card__title">{title}</h1>
          <p className="auth-card__subtitle">{subtitle}</p>

          {children}

          <div className="auth-card__footer">{footer}</div>
        </div>
      </div>
    </div>
  );
}
