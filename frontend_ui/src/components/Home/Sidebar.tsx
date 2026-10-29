// src/components/Home/Sidebar.tsx
// Thanh điều hướng dọc cố định bên trái kiểu chess.com, thay cho header bar
// ngang trước đây. Mỗi mục có 1 flyout hiện bên phải khi hover/click. Chỉ
// mục "Chơi" là có hành động thật (chọn chế độ chơi thật của app); các mục
// còn lại (Câu đố, Học, Luyện tập, Xem, Cộng đồng, Khác) chỉ là UI placeholder
// cho đủ bố cục — theo đúng yêu cầu "có UI trước, chưa cần chức năng".

import { useEffect, useRef, useState } from "react";
import {
  IconBook,
  IconDots,
  IconDuo,
  IconEye,
  IconHelp,
  IconLanguage,
  IconPeople,
  IconPuzzle,
  IconSpark,
} from "./icons";
import type { GameMode } from "../../types/mode";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

interface FlyoutItem {
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
  badge?: string;
  icon?: React.ReactNode;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  groups: FlyoutItem[][];
}

export interface SidebarProps {
  onSelectMode: (mode: GameMode) => void;
  onGoOnline: () => void;
  onOpenRules: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

export function Sidebar({ onSelectMode, onGoOnline, onOpenRules, onOpenLogin, onOpenRegister }: SidebarProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const { user, profile, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeId) return;
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveId(null);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeId]);

  const NAV_ITEMS: NavItem[] = [
    {
      id: "play",
      label: "Chơi",
      icon: <IconDuo />,
      groups: [
        [
          { label: "Chơi cùng bạn (Local)", onSelect: () => onSelectMode("pvp-local") },
          { label: "Chơi trực tuyến", onSelect: onGoOnline },
          { label: "Đấu với AI (PvE)", onSelect: () => onSelectMode("pve") },
          { label: "Xem AI tự đấu (EvE)", onSelect: () => onSelectMode("eve") },
        ],
        [
          { label: "Luyện Tsumego", onSelect: () => onSelectMode("tsumego") },
          { label: "Đấu trường huyền thoại", onSelect: () => onSelectMode("legendary"), badge: "Mới" },
          { label: "Xem luật chơi", onSelect: onOpenRules },
        ],
      ],
    },
    {
      id: "puzzles",
      label: "Câu đố",
      icon: <IconPuzzle />,
      groups: [
        [
          { label: "Luyện Tsumego & Khai cuộc", onSelect: () => onSelectMode("tsumego") },
          { label: "Đấu trường huyền thoại", onSelect: () => onSelectMode("legendary"), badge: "Mới" },
        ],
      ],
    },
    {
      id: "learn",
      label: "Học",
      icon: <IconBook />,
      groups: [
        [
          { label: "Khoá học cơ bản", onSelect: () => navigate("/learn/courses") },
          { label: "Video hướng dẫn", onSelect: () => navigate("/learn/videos") },
        ],
      ],
    },
    {
      id: "train",
      label: "Luyện tập",
      icon: <IconSpark />,
      groups: [
        [
          { label: "Đấu trường huyền thoại", onSelect: () => onSelectMode("legendary"), badge: "Mới" },
          { label: "Luyện khai cuộc", disabled: true, badge: "Sắp ra mắt" },
        ],
      ],
    },
    {
      id: "watch",
      label: "Xem",
      icon: <IconEye />,
      groups: [
        [
          {
            label: "Ván đấu đang diễn ra",
            onSelect: () => navigate("/watch/live"),
            badge: "Trực tiếp",
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <path d="M5.5 5.5a10 10 0 0 0 0 13" />
                <path d="M18.5 5.5a10 10 0 0 1 0 13" />
              </svg>
            ),
          },
          {
            label: "Trận đấu AI (AI vs AI)",
            onSelect: () => onSelectMode("eve"),
            badge: "Tự đấu 3s",
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v4" />
                <line x1="8" y1="16" x2="8" y2="16" />
                <line x1="16" y1="16" x2="16" y2="16" />
              </svg>
            ),
          },
        ],
      ],
    },
    {
      id: "community",
      label: "Cộng đồng",
      icon: <IconPeople />,
      groups: [
        [
          { label: "Diễn đàn", onSelect: () => navigate("/forum"), badge: "Mới" },
          { label: "Bảng xếp hạng", onSelect: () => navigate("/leaderboard"), badge: "Mới" },
        ],
      ],
    },
    {
      id: "other",
      label: "Khác",
      icon: <IconDots />,
      groups: [
        [
          {
            label: "Kỳ phổ của tôi",
            onSelect: () => navigate("/archive"),
            badge: "Mới",
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            ),
          },
          {
            label: "Cài đặt",
            onSelect: () => navigate("/settings"),
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            ),
          },
          {
            label: "Giới thiệu dự án",
            onSelect: () => navigate("/about"),
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            ),
          },
        ],
      ],
    },
  ];

  return (
    <aside className="sidebar" ref={containerRef}>
      <div className="sidebar__brand">
        <span className="sidebar__logo">碁</span>
        <span className="sidebar__brand-name">Cờ Vây AI</span>
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.id}
            className="sidebar__item-wrap"
            onMouseEnter={() => setActiveId(item.id)}
            onMouseLeave={() => setActiveId((cur) => (cur === item.id ? null : cur))}
          >
            <button
              type="button"
              className={`sidebar__item ${activeId === item.id ? "sidebar__item--active" : ""}`}
              aria-expanded={activeId === item.id}
              onClick={() => setActiveId((cur) => (cur === item.id ? null : item.id))}
            >
              <span className="sidebar__item-icon">{item.icon}</span>
              <span className="sidebar__item-label">{item.label}</span>
            </button>

            {activeId === item.id && (
              <div className="sidebar__flyout" role="menu">
                {item.groups.map((group, gi) => (
                  <div className="sidebar__flyout-group" key={gi}>
                    {group.map((fi) => (
                      <button
                        key={fi.label}
                        type="button"
                        role="menuitem"
                        className={`sidebar__flyout-item ${fi.disabled ? "sidebar__flyout-item--disabled" : ""}`}
                        disabled={fi.disabled}
                        onClick={() => {
                          fi.onSelect?.();
                          setActiveId(null);
                        }}
                      >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          {fi.icon && <span style={{ opacity: 0.85, display: "inline-flex" }}>{fi.icon}</span>}
                          <span>{fi.label}</span>
                        </span>
                        {fi.badge && <span className="sidebar__flyout-badge">{fi.badge}</span>}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="sidebar__bottom">
        {user ? (
          <>
            <button type="button" className="sidebar__util-item" style={{ flexDirection: "row", gap: "8px", justifyContent: "flex-start", padding: "10px" }} onClick={() => navigate("/profile")}>
              {profile?.photoURL ? (
                <img src={profile.photoURL} alt="" style={{ width: 24, height: 24, borderRadius: "50%" }} />
              ) : (
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: "bold" }}>
                  {profile?.username?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
              <span className="sidebar__item-label" style={{ fontWeight: 600 }}>{profile?.username || "Đang tải..."}</span>
            </button>
            <button type="button" className="sidebar__util-item" onClick={() => signOutUser()}>
              <span className="sidebar__item-label">Đăng xuất</span>
            </button>
          </>
        ) : (
          <>
            <button type="button" className="sidebar__signup-btn" onClick={onOpenRegister}>
              Đăng ký
            </button>
            <button type="button" className="sidebar__login-btn" onClick={onOpenLogin}>
              Đăng nhập
            </button>
          </>
        )}

        <button type="button" className="sidebar__util-item">
          <IconHelp />
          <span className="sidebar__item-label">Trợ giúp</span>
        </button>
        <button type="button" className="sidebar__util-item">
          <IconLanguage />
          <span className="sidebar__item-label">Tiếng Việt</span>
        </button>
      </div>
    </aside>
  );
}
