// src/components/Legendary/LegendaryHub.tsx
// Trung tâm Đấu Trường Huyền Thoại:
// - Lọc theo Kỷ nguyên lịch sử (AI Era, Hoàng kim, Cổ điển, v.v.)
// - Lọc theo Chiến thuật (Chiến lược, Cận chiến, Hy sinh, Quan tử, Tesuji...)
// - Tìm kiếm ván cờ theo tên kỳ thủ, giải đấu, năm
// - Thống kê tiến độ giải đố của người dùng

import { useState, useMemo, useEffect } from "react";
import { LEGENDARY_GAMES } from "../../data/legendaryGames";
import { LegendaryPractice } from "./LegendaryPractice";
import type { GameEra, GameCategory } from "../../types/legendary";
import {
  IconScroll,
  IconSparkles,
  IconSwords,
  IconScale,
  IconBookOpen,
  IconFeather,
  IconSearch,
  IconCheckCircle,
  IconCompass,
  IconArrowLeft,
  IconStar,
} from "./LegendaryIcons";
import { getSavedGameStars } from "../../utils/legendaryMissionEvaluator";
import "./LegendaryHub.css";

interface LegendaryHubProps {
  onBackToMenu?: () => void;
}

type EraTab = "all" | GameEra;

interface EraTabItem {
  id: EraTab;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string; color?: string }>;
}

const ERA_TAB_CONFIG: EraTabItem[] = [
  { id: "all", label: "Tất cả (20)", icon: IconScroll },
  { id: "ai_era", label: "Kỷ Nguyên AI", icon: IconSparkles },
  { id: "modern", label: "Hiện Đại (2000-2015)", icon: IconSwords },
  { id: "golden", label: "Hoàng Kim (1960-2000)", icon: IconScale },
  { id: "early_modern", label: "Cận Đại (1900-1960)", icon: IconBookOpen },
  { id: "classical", label: "Cổ Điển (Trước 1900)", icon: IconFeather },
];

const CATEGORY_LABELS: Record<GameCategory, string> = {
  strategy: "Chiến lược",
  fighting: "Cận chiến",
  sacrifice: "Hy sinh quân",
  endgame: "Quan tử (Yose)",
  opening: "Khai cuộc",
  invasion: "Xâm nhập",
  ko: "Cướp cờ (Ko)",
  moyo: "Thế lực (Moyo)",
  tesuji: "Nước kỹ thuật (Tesuji)",
};

export function LegendaryHub({ onBackToMenu }: LegendaryHubProps) {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [activeEra, setActiveEra] = useState<EraTab>("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | GameCategory>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [solvedIds, setSolvedIds] = useState<string[]>([]);

  // Đọc danh sách đã giải từ localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("go_legendary_solved_ids");
      if (stored) setSolvedIds(JSON.parse(stored));
    } catch {
      // Bỏ qua nếu lỗi parse
    }
  }, [selectedGameId]);

  // Lọc danh sách ván đấu
  const filteredGames = useMemo(() => {
    return LEGENDARY_GAMES.filter((g) => {
      // Lọc Era
      if (activeEra !== "all" && g.era !== activeEra) return false;

      // Lọc Category
      if (categoryFilter !== "all" && g.category !== categoryFilter) return false;

      // Lọc Difficulty
      if (difficultyFilter !== "all" && g.difficulty !== difficultyFilter) return false;

      // Tìm kiếm từ khóa
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = g.title.toLowerCase().includes(query) || g.titleEn.toLowerCase().includes(query);
        const matchPlayer =
          g.blackPlayer.name.toLowerCase().includes(query) ||
          g.whitePlayer.name.toLowerCase().includes(query);
        const matchTournament = g.tournament.toLowerCase().includes(query);
        const matchYear = g.year.toString().includes(query);
        if (!matchTitle && !matchPlayer && !matchTournament && !matchYear) return false;
      }

      return true;
    });
  }, [activeEra, categoryFilter, difficultyFilter, searchQuery]);

  const selectedGameIndex = useMemo(() => {
    if (!selectedGameId) return -1;
    return LEGENDARY_GAMES.findIndex((g) => g.id === selectedGameId);
  }, [selectedGameId]);

  const selectedGame = useMemo(() => {
    if (selectedGameIndex === -1) return null;
    return LEGENDARY_GAMES[selectedGameIndex];
  }, [selectedGameIndex]);

  // Nếu đang trong chế độ chơi ván cờ cụ thể
  if (selectedGame) {
    return (
      <LegendaryPractice
        game={selectedGame}
        onBack={() => setSelectedGameId(null)}
        hasPrevGame={selectedGameIndex > 0}
        hasNextGame={selectedGameIndex < LEGENDARY_GAMES.length - 1}
        onPrevGame={() => {
          if (selectedGameIndex > 0) {
            setSelectedGameId(LEGENDARY_GAMES[selectedGameIndex - 1].id);
          }
        }}
        onNextGame={() => {
          if (selectedGameIndex < LEGENDARY_GAMES.length - 1) {
            setSelectedGameId(LEGENDARY_GAMES[selectedGameIndex + 1].id);
          }
        }}
      />
    );
  }

  return (
    <div className="legendary-hub">
      {/* Hero Banner */}
      <section className="legendary-hero">
        <div className="legendary-hero__content">
          <div className="legendary-hero__badge-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="legendary-hero__badge">
              <IconSparkles size={14} />
              <span>Ván cờ kinh điển</span>
            </div>
            {onBackToMenu && (
              <button
                className="legendary-btn legendary-btn--ghost"
                onClick={onBackToMenu}
                style={{ marginBottom: "12px", border: "1px solid rgba(255,255,255,0.12)", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <IconArrowLeft size={15} />
                <span>Trang chủ</span>
              </button>
            )}
          </div>
          <h1 className="legendary-hero__title">ĐẤU TRƯỜNG HUYỀN THOẠI</h1>
          <p className="legendary-hero__desc">
            20 thế cờ then chốt trong lịch sử cờ vây thế giới. Thử sức tìm lời giải và theo dõi toàn bộ diễn biến ván cờ.
          </p>

          <div className="legendary-stats-bar">
            <div className="legendary-stat-item">
              <span className="legendary-stat-value">{LEGENDARY_GAMES.length}</span>
              <span className="legendary-stat-label">Ván cờ kinh điển</span>
            </div>
            <div className="legendary-stat-divider" />
            <div className="legendary-stat-item">
              <span className="legendary-stat-value legendary-stat-value--solved">
                {solvedIds.length} / {LEGENDARY_GAMES.length}
              </span>
              <span className="legendary-stat-label">Đã giải thành công</span>
            </div>
            <div className="legendary-stat-divider" />
            <div className="legendary-stat-item">
              <span className="legendary-stat-value">5</span>
              <span className="legendary-stat-label">Kỷ nguyên cờ vây</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Kỷ nguyên */}
      <nav className="legendary-tabs">
        {ERA_TAB_CONFIG.map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`legendary-tab-btn ${activeEra === tab.id ? "legendary-tab-btn--active" : ""}`}
              onClick={() => setActiveEra(tab.id)}
            >
              <span className="legendary-tab-icon">
                <TabIcon size={16} />
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bộ lọc phụ & Tìm kiếm */}
      <div className="legendary-filter-bar">
        <div className="legendary-search-box">
          <IconSearch size={16} className="legendary-search-icon" />
          <input
            type="text"
            placeholder="Tìm theo kỳ thủ, giải đấu, năm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="legendary-clear-search" onClick={() => setSearchQuery("")}>
              ✕
            </button>
          )}
        </div>

        <div className="legendary-selects">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as "all" | GameCategory)}
            className="legendary-select"
          >
            <option value="all">Tất cả chủ đề</option>
            {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
              <option key={cat} value={cat}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={difficultyFilter}
            onChange={(e) =>
              setDifficultyFilter(e.target.value === "all" ? "all" : Number(e.target.value))
            }
            className="legendary-select"
          >
            <option value="all">Tất cả độ khó</option>
            <option value="3">★★★ Trung cấp</option>
            <option value="4">★★★★ Cao cấp</option>
            <option value="5">★★★★★ Huyền thoại</option>
          </select>
        </div>
      </div>

      {/* Danh sách thẻ ván cờ */}
      {filteredGames.length === 0 ? (
        <div className="legendary-empty-state">
          <div className="legendary-empty-icon">
            <IconCompass size={44} color="#7f8c8d" />
          </div>
          <h3>Không tìm thấy ván cờ phù hợp</h3>
          <p>Hãy thử xóa bộ lọc tìm kiếm hoặc chọn kỷ nguyên khác.</p>
        </div>
      ) : (
        <div className="legendary-grid">
          {filteredGames.map((g) => {
            const isSolved = solvedIds.includes(g.id);
            const earnedStars = getSavedGameStars(g.id);
            return (
              <div
                key={g.id}
                className={`legendary-card-item ${isSolved ? "legendary-card-item--solved" : ""}`}
                onClick={() => setSelectedGameId(g.id)}
              >
                {/* Header thẻ */}
                <div className="legendary-card-item__top">
                  <div className="legendary-card-item__badges">
                    <span className="legendary-era-tag">
                      {ERA_TAB_CONFIG.find((t) => t.id === g.era)?.label || g.era}
                    </span>
                    <span className="legendary-cat-tag">
                      {CATEGORY_LABELS[g.category] || g.category}
                    </span>
                  </div>

                  <div className="legendary-card-item__meta">
                    {earnedStars > 0 && (
                      <span className="legendary-earned-stars-badge" title={`Đã đạt ${earnedStars}/3 sao chiến dịch`}>
                        <IconStar size={12} color="#f59e0b" filled={true} />
                        <span>{earnedStars}/3 Sao</span>
                      </span>
                    )}
                    <span className="legendary-stars">
                      {"★".repeat(g.difficulty)}
                      <span className="legendary-stars--dim">{"★".repeat(5 - g.difficulty)}</span>
                    </span>
                    {isSolved && (
                      <span className="legendary-solved-badge" title="Đã hoàn thành thử thách này">
                        <IconCheckCircle size={13} />
                        <span>Đã giải</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Tiêu đề ván cờ */}
                <h3 className="legendary-card-item__title">{g.title}</h3>
                <p className="legendary-card-item__subtitle">{g.titleEn}</p>

                {/* Kỳ thủ đối đầu */}
                <div className="legendary-card-item__players">
                  <div className="legendary-mini-player">
                    <span>●</span>
                    <span className="legendary-country-badge">{g.blackPlayer.country}</span>
                    <strong>{g.blackPlayer.name}</strong>
                  </div>
                  <span className="legendary-mini-vs">vs</span>
                  <div className="legendary-mini-player">
                    <span>○</span>
                    <span className="legendary-country-badge">{g.whitePlayer.country}</span>
                    <strong>{g.whitePlayer.name}</strong>
                  </div>
                </div>

                {/* Đoạn trích bối cảnh */}
                <p className="legendary-card-item__snippet">
                  {g.contextStory.slice(0, 115)}...
                </p>

                {/* Chân thẻ */}
                <div className="legendary-card-item__footer">
                  <div className="legendary-card-item__challenge-info">
                    <span className="legendary-move-pill">
                      Nước #{g.challengeMoveNumber}
                    </span>
                    <span className="legendary-turn-pill">
                      {g.playerToMove === "black" ? "Đen đi" : "Trắng đi"}
                    </span>
                  </div>

                  <button className="legendary-card-item__btn">
                    {isSolved ? "Xem lại" : "Vào ván"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
