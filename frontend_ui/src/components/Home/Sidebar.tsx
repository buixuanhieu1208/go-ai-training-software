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
  IconSearch,
  IconSpark,
} from "./icons";
import type { GameMode } from "../../types/mode";
import "./Sidebar.css";

interface FlyoutItem {
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
  badge?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  groups: FlyoutItem[][];
}

export interface SidebarProps {
  onSelectMode: (mode: GameMode) => void;
  onOpenRules: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

export function Sidebar({ onSelectMode, onOpenRules, onOpenLogin, onOpenRegister }: SidebarProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

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
          { label: "Chơi trực tuyến", disabled: true, badge: "Sắp ra mắt" },
          { label: "Đấu với AI (PvE)", onSelect: () => onSelectMode("pve") },
          { label: "Xem AI tự đấu (EvE)", onSelect: () => onSelectMode("eve") },
        ],
        [
          { label: "Luyện Tsumego", onSelect: () => onSelectMode("tsumego") },
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
          { label: "Câu đố mỗi ngày", disabled: true, badge: "Sắp ra mắt" },
          { label: "Puzzle Rush", disabled: true, badge: "Sắp ra mắt" },
        ],
      ],
    },
    {
      id: "learn",
      label: "Học",
      icon: <IconBook />,
      groups: [
        [
          { label: "Khoá học cơ bản", disabled: true, badge: "Sắp ra mắt" },
          { label: "Video hướng dẫn", disabled: true, badge: "Sắp ra mắt" },
        ],
      ],
    },
    {
      id: "train",
      label: "Luyện tập",
      icon: <IconSpark />,
      groups: [
        [
          { label: "Phân tích ván đấu", disabled: true, badge: "Sắp ra mắt" },
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
          { label: "Ván đấu nổi bật", disabled: true, badge: "Sắp ra mắt" },
          { label: "Giải đấu AI", disabled: true, badge: "Sắp ra mắt" },
        ],
      ],
    },
    {
      id: "community",
      label: "Cộng đồng",
      icon: <IconPeople />,
      groups: [
        [
          { label: "Diễn đàn", disabled: true, badge: "Sắp ra mắt" },
          { label: "Bảng xếp hạng", disabled: true, badge: "Sắp ra mắt" },
        ],
      ],
    },
    {
      id: "other",
      label: "Khác",
      icon: <IconDots />,
      groups: [
        [
          { label: "Cài đặt", disabled: true, badge: "Sắp ra mắt" },
          { label: "Giới thiệu dự án", disabled: true, badge: "Sắp ra mắt" },
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
                        <span>{fi.label}</span>
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
        <button type="button" className="sidebar__util-item">
          <IconSearch />
          <span className="sidebar__item-label">Tìm kiếm</span>
        </button>
        <button type="button" className="sidebar__signup-btn" onClick={onOpenRegister}>
          Đăng ký
        </button>
        <button type="button" className="sidebar__login-btn" onClick={onOpenLogin}>
          Đăng nhập
        </button>
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
