// src/components/Leaderboard/LeaderboardPage.tsx
// Trang Bảng Xếp Hạng Kỳ Thủ — Thiết kế theo nhận diện cờ vây truyền thống & hiện đại:
// - Tích hợp Sidebar cố định bên trái đồng bộ 100% với Home
// - Hỗ trợ đầy đủ dữ liệu thực từ Firestore / LocalStorage khi người chơi chiến thắng AI
// - Thống kê đầy đủ các chế độ:
//   1. Tổng hợp toàn năng (Rating Elo)
//   2. Đấu với người chơi khác (PvP, tỉ lệ thắng, chuỗi thắng)
//   3. Đấu với máy (Dễ, Trung bình, Khó, Bậc thầy KataGo)
//   4. Số bài Tsumego đã giải theo từng độ khó

import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sidebar } from "../Home/Sidebar";
import { useAuth } from "../../contexts/AuthContext";
import type { PlayerLeaderboardEntry } from "../../types/leaderboardEntry";
import { fetchRealLeaderboard } from "../../services/leaderboardFirebaseService";
import "./LeaderboardPage.css";

type LeaderboardTab = "all" | "pvp" | "ai" | "tsumego";

export function LeaderboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Đọc tab từ search params nếu có (?tab=ai)
  const initialTab = useMemo<LeaderboardTab>(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam === "ai" || tabParam === "pvp" || tabParam === "tsumego") {
      return tabParam;
    }
    return "all";
  }, [location.search]);

  const [activeTab, setActiveTab] = useState<LeaderboardTab>(initialTab);
  const [timeFilter, setTimeFilter] = useState("all-time");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerLeaderboardEntry | null>(null);

  // Dữ liệu thực từ Firestore / LocalStorage
  const [realPlayers, setRealPlayers] = useState<PlayerLeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Quản lý animation trượt thanh chọn chế độ (Sliding Tab Indicator)
  const tabsContainerRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Record<LeaderboardTab, HTMLButtonElement | null>>({
    all: null,
    pvp: null,
    ai: null,
    tsumego: null,
  });
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const updateSlider = () => {
      const activeEl = tabRefs.current[activeTab];
      if (activeEl) {
        setSliderStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1,
        });
      }
    };

    updateSlider();
    window.addEventListener("resize", updateSlider);
    const timer = setTimeout(updateSlider, 60);
    return () => {
      window.removeEventListener("resize", updateSlider);
      clearTimeout(timer);
    };
  }, [activeTab]);

  // Tải bảng xếp hạng thực tế từ Firebase Firestore
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchRealLeaderboard(user?.uid)
      .then((players) => {
        if (!isMounted) return;
        setRealPlayers(players);
      })
      .catch((err) => {
        console.warn("Lỗi tải Bảng Xếp Hạng thực tế:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Sắp xếp dữ liệu theo từng tab
  const sortedPlayers = useMemo(() => {
    const list = [...realPlayers];

    if (activeTab === "pvp") {
      list.sort(
        (a, b) => b.pvpStats.highScore - a.pvpStats.highScore || b.pvpStats.wins - a.pvpStats.wins
      );
    } else if (activeTab === "ai") {
      list.sort((a, b) => {
        const scoreA =
          a.aiStats.byDifficulty.master.wins * 4 +
          a.aiStats.byDifficulty.hard.wins * 3 +
          a.aiStats.byDifficulty.medium.wins * 2 +
          a.aiStats.byDifficulty.easy.wins;
        const scoreB =
          b.aiStats.byDifficulty.master.wins * 4 +
          b.aiStats.byDifficulty.hard.wins * 3 +
          b.aiStats.byDifficulty.medium.wins * 2 +
          b.aiStats.byDifficulty.easy.wins;
        return scoreB - scoreA || b.aiStats.totalWins - a.aiStats.totalWins;
      });
    } else if (activeTab === "tsumego") {
      list.sort((a, b) => b.tsumegoStats.totalSolved - a.tsumegoStats.totalSolved);
    } else {
      list.sort((a, b) => b.ratingPoints - a.ratingPoints);
    }

    return list.map((item, index) => ({
      ...item,
      currentRank: index + 1,
    }));
  }, [realPlayers, activeTab]);

  // Lọc theo tìm kiếm
  const filteredPlayers = useMemo(() => {
    if (!searchQuery.trim()) return sortedPlayers;
    const q = searchQuery.toLowerCase().trim();
    return sortedPlayers.filter(
      (p) =>
        p.displayName.toLowerCase().includes(q) ||
        p.username.toLowerCase().includes(q) ||
        p.danRank.toLowerCase().includes(q)
    );
  }, [sortedPlayers, searchQuery]);

  // Top 3 cho bục vinh quang (nếu có dữ liệu)
  const top1 = sortedPlayers[0];
  const top2 = sortedPlayers[1];
  const top3 = sortedPlayers[2];

  // Người dùng hiện tại
  const currentUser = useMemo(() => {
    return sortedPlayers.find((p) => p.isCurrentUser) || null;
  }, [sortedPlayers]);


  return (
    <div className="home-shell">
      {/* SIDEBAR ĐỒNG BỘ 100% VỚI HOME */}
      <Sidebar
        onSelectMode={(mode) => navigate(`/play/${mode}`)}
        onGoOnline={() => navigate("/online")}
        onOpenRules={() => {}}
        onOpenLogin={() => navigate("/login")}
        onOpenRegister={() => navigate("/register")}
      />

      <div className="home-content">
        <div className="leaderboard-container">
          {/* 1. HEADER */}
          <header className="leaderboard-header">
            <div className="leaderboard-header__left">
              <div className="leaderboard-title-group">
                <h1>BẢNG XẾP HẠNG KỲ THỦ</h1>
                <p>Vinh danh kỳ nghệ trên mọi đấu trường: Đối kháng PvP, Đấu Máy AI & Luyện Tsumego</p>
              </div>
            </div>

            <div className="leaderboard-header__right">
              <select
                className="leaderboard-time-select"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="weekly">Tuần này</option>
                <option value="monthly">Tháng này</option>
                <option value="season">Mùa giải 2026</option>
                <option value="all-time">Toàn thời gian</option>
              </select>

              <div className="leaderboard-search-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Tìm kỳ thủ, đẳng cấp..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </header>

          {/* 2. CHẾ ĐỘ LỌC (CATEGORY TABS VỚI THANH TRƯỢT ANIMATION) */}
          <nav className="leaderboard-tabs" ref={tabsContainerRef}>
            <div
              className="leaderboard-tabs-slider"
              style={{
                transform: `translateX(${sliderStyle.left}px)`,
                width: `${sliderStyle.width}px`,
                opacity: sliderStyle.opacity,
              }}
            />
            <button
              ref={(el) => {
                tabRefs.current.all = el;
              }}
              className={`leaderboard-tab-btn ${activeTab === "all" ? "leaderboard-tab-btn--active" : ""}`}
              onClick={() => setActiveTab("all")}
              type="button"
            >
              Tổng Hợp Toàn Năng
            </button>
            <button
              ref={(el) => {
                tabRefs.current.pvp = el;
              }}
              className={`leaderboard-tab-btn ${activeTab === "pvp" ? "leaderboard-tab-btn--active" : ""}`}
              onClick={() => setActiveTab("pvp")}
              type="button"
            >
              Đối Kháng PvP (Điểm Kỳ Lực)
            </button>
            <button
              ref={(el) => {
                tabRefs.current.ai = el;
              }}
              className={`leaderboard-tab-btn ${activeTab === "ai" ? "leaderboard-tab-btn--active" : ""}`}
              onClick={() => setActiveTab("ai")}
              type="button"
            >
              Đấu Với Máy (Bảng Vàng Diệt AI)
            </button>
            <button
              ref={(el) => {
                tabRefs.current.tsumego = el;
              }}
              className={`leaderboard-tab-btn ${activeTab === "tsumego" ? "leaderboard-tab-btn--active" : ""}`}
              onClick={() => setActiveTab("tsumego")}
              type="button"
            >
              Bậc Thầy Tsumego
            </button>
          </nav>

          {/* SKELETON LOADING HOẶC DỮ LIỆU THỰC TẾ */}
          {loading ? (
            <div className="leaderboard-loading-wrapper">
              {/* Banner trạng thái đồng bộ */}
              <div className="leaderboard-loading-banner">
                <div className="loading-orbit-stones">
                  <span className="orbit-stone orbit-stone--black" />
                  <span className="orbit-stone orbit-stone--white" />
                </div>
                <div className="loading-text-group">
                  <h4>Đang đồng bộ dữ liệu kỳ thủ từ Firebase Firestore...</h4>
                  <p>Vui lòng chờ trong giây lát để hệ thống cập nhật điểm kỳ lực và thứ hạng mới nhất</p>
                </div>
              </div>

              {/* Podium Skeleton */}
              <div className="podium-skeleton-grid">
                <div className="podium-skeleton-item podium-skeleton-item--2">
                  <div className="podium-sk-medallion skeleton-shimmer" />
                  <div className="podium-sk-avatar skeleton-shimmer" />
                  <div className="podium-sk-name skeleton-shimmer" />
                  <div className="podium-sk-rank skeleton-shimmer" />
                  <div className="podium-sk-points skeleton-shimmer" />
                  <div className="podium-sk-line skeleton-shimmer" />
                </div>
                <div className="podium-skeleton-item podium-skeleton-item--1">
                  <div className="podium-sk-medallion skeleton-shimmer" />
                  <div className="podium-sk-avatar skeleton-shimmer" />
                  <div className="podium-sk-name skeleton-shimmer" />
                  <div className="podium-sk-rank skeleton-shimmer" />
                  <div className="podium-sk-points skeleton-shimmer" />
                  <div className="podium-sk-line skeleton-shimmer" />
                </div>
                <div className="podium-skeleton-item podium-skeleton-item--3">
                  <div className="podium-sk-medallion skeleton-shimmer" />
                  <div className="podium-sk-avatar skeleton-shimmer" />
                  <div className="podium-sk-name skeleton-shimmer" />
                  <div className="podium-sk-rank skeleton-shimmer" />
                  <div className="podium-sk-points skeleton-shimmer" />
                  <div className="podium-sk-line skeleton-shimmer" />
                </div>
              </div>

              {/* Table Skeleton */}
              <div className="leaderboard-table-container" style={{ marginTop: 24 }}>
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th style={{ width: "64px", textAlign: "center" }}>Hạng</th>
                      <th>Kỳ Thủ</th>
                      <th>Đẳng Cấp</th>
                      <th>Điểm Kỳ Lực</th>
                      <th>PvP (W-L)</th>
                      <th>Đấu Máy</th>
                      <th>Tsumego</th>
                      <th style={{ width: "80px", textAlign: "center" }}>Chi Tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((idx) => (
                      <tr key={idx} className="skeleton-row">
                        <td style={{ textAlign: "center" }}>
                          <div className="sk-badge-circle skeleton-shimmer" />
                        </td>
                        <td>
                          <div className="sk-player-cell">
                            <div className="sk-avatar-circle skeleton-shimmer" />
                            <div className="sk-player-text">
                              <div className="sk-name-bar skeleton-shimmer" />
                              <div className="sk-sub-bar skeleton-shimmer" />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="sk-pill skeleton-shimmer" />
                        </td>
                        <td>
                          <div className="sk-stat-box skeleton-shimmer" />
                        </td>
                        <td>
                          <div className="sk-stat-box skeleton-shimmer" />
                        </td>
                        <td>
                          <div className="sk-stat-box skeleton-shimmer" />
                        </td>
                        <td>
                          <div className="sk-stat-box skeleton-shimmer" />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <div className="sk-action-btn skeleton-shimmer" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="leaderboard-content-loaded">
              {/* 3. BỤC VINH QUANG TOP 3 (PODIUM) */}
              {!searchQuery && (
                <section className="leaderboard-podium">
                  {/* HẠNG 2 */}
                  <div
                    className={`podium-item podium-item--second ${top2 ? "" : "podium-item--placeholder"}`}
                    onClick={() => top2 && setSelectedPlayer(top2)}
                  >
                    <div className="podium-rank-medallion podium-rank-medallion--2">II</div>
                    <div className="podium-avatar-wrap">
                      <div
                        className={`go-stone-avatar ${
                          top2 ? `go-stone-avatar--${top2.stoneType}` : "go-stone-avatar--placeholder"
                        }`}
                      >
                        {top2 ? top2.initials : "—"}
                      </div>
                    </div>
                    <h3 className="podium-name">{top2?.displayName || "Đang chờ kỳ thủ"}</h3>
                    <span className="podium-dan">{top2?.danRank || "Vị trí Á Quân"}</span>
                    <div className="podium-points">{top2 ? `${top2.ratingPoints} pts` : "— pts"}</div>
                    <div className="podium-stats-snippet">
                      {top2 ? (
                        <>
                          <span>PvP: {top2.pvpStats.wins}W - {top2.pvpStats.losses}L</span>
                          <span>Đấu máy: {top2.aiStats.totalWins}/{top2.aiStats.totalMatches} ván</span>
                          <span>Tsumego: {top2.tsumegoStats.totalSolved} bài</span>
                        </>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </div>
                  </div>

                  {/* HẠNG 1 */}
                  <div
                    className={`podium-item podium-item--first ${top1 ? "" : "podium-item--placeholder"}`}
                    onClick={() => top1 && setSelectedPlayer(top1)}
                  >
                    <div className="podium-rank-medallion podium-rank-medallion--1">I</div>
                    <div className="podium-avatar-wrap">
                      <div
                        className={`go-stone-avatar ${
                          top1 ? `go-stone-avatar--${top1.stoneType}` : "go-stone-avatar--placeholder"
                        }`}
                      >
                        {top1 ? top1.initials : "—"}
                      </div>
                    </div>
                    <h3 className="podium-name">{top1?.displayName || "Đang chờ kỳ thủ"}</h3>
                    <span className="podium-dan">{top1?.danRank || "Vị trí Quán Quân"}</span>
                    <div className="podium-points">{top1 ? `${top1.ratingPoints} pts` : "— pts"}</div>
                    <div className="podium-stats-snippet">
                      {top1 ? (
                        <>
                          <span>PvP: {top1.pvpStats.wins}W - {top1.pvpStats.losses}L</span>
                          <span>Đấu máy: {top1.aiStats.totalWins}/{top1.aiStats.totalMatches} ván</span>
                          <span>Tsumego: {top1.tsumegoStats.totalSolved} bài</span>
                        </>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </div>
                  </div>

                  {/* HẠNG 3 */}
                  <div
                    className={`podium-item podium-item--third ${top3 ? "" : "podium-item--placeholder"}`}
                    onClick={() => top3 && setSelectedPlayer(top3)}
                  >
                    <div className="podium-rank-medallion podium-rank-medallion--3">III</div>
                    <div className="podium-avatar-wrap">
                      <div
                        className={`go-stone-avatar ${
                          top3 ? `go-stone-avatar--${top3.stoneType}` : "go-stone-avatar--placeholder"
                        }`}
                      >
                        {top3 ? top3.initials : "—"}
                      </div>
                    </div>
                    <h3 className="podium-name">{top3?.displayName || "Đang chờ kỳ thủ"}</h3>
                    <span className="podium-dan">{top3?.danRank || "Vị trí Quý Quân"}</span>
                    <div className="podium-points">{top3 ? `${top3.ratingPoints} pts` : "— pts"}</div>
                    <div className="podium-stats-snippet">
                      {top3 ? (
                        <>
                          <span>PvP: {top3.pvpStats.wins}W - {top3.pvpStats.losses}L</span>
                          <span>Đấu máy: {top3.aiStats.totalWins}/{top3.aiStats.totalMatches} ván</span>
                          <span>Tsumego: {top3.tsumegoStats.totalSolved} bài</span>
                        </>
                      ) : (
                        <span>Chưa có dữ liệu</span>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {/* 4. THẺ THỨ HẠNG CỦA BẠN (YOUR RANK) */}
              <section className="leaderboard-your-rank">
                <div className="your-rank__left">
                  <span className="your-rank__num">{currentUser ? `#${currentUser.currentRank || currentUser.rank || 1}` : "#—"}</span>
                  <div className="your-rank__info">
                    <h4>Hạng của bạn: {currentUser ? currentUser.displayName : (user?.displayName || "Bạn (Tân thủ)")}</h4>
                    <p>
                      Đẳng cấp: <strong>{currentUser ? currentUser.danRank : "Chưa phân cấp"}</strong> · Danh hiệu: <em>{currentUser?.titleBadge || "Tân thủ nhập môn"}</em>
                    </p>
                  </div>
                </div>

                <div className="your-rank__metrics">
                  <div className="your-metric-item">
                    <span className="your-metric-label">Điểm Kỳ Lực</span>
                    <span className="your-metric-value">{currentUser ? `${currentUser.ratingPoints} pts` : "— pts"}</span>
                  </div>
                  <div className="your-metric-item">
                    <span className="your-metric-label">PvP với Người</span>
                    <span className="your-metric-value">
                      {currentUser ? `${currentUser.pvpStats.matches} ván (${currentUser.pvpStats.winRate}%)` : "0 ván (0%)"}
                    </span>
                  </div>
                  <div className="your-metric-item">
                    <span className="your-metric-label">Đấu Máy (Thắng)</span>
                    <span className="your-metric-value">
                      {currentUser ? `${currentUser.aiStats.totalWins}/${currentUser.aiStats.totalMatches}` : "0/0 ván"}
                    </span>
                  </div>
                  <div className="your-metric-item">
                    <span className="your-metric-label">Tsumego Giải Được</span>
                    <span className="your-metric-value">
                      {currentUser ? `${currentUser.tsumegoStats.totalSolved} bài` : "0 bài"}
                    </span>
                  </div>
                </div>
              </section>

              {/* 5. BẢNG DANH SÁCH CHI TIẾT */}
              <section className="leaderboard-table-container">
                {filteredPlayers.length === 0 ? (
                  <div className="leaderboard-empty-state">
                    <div className="leaderboard-empty-stone-pair">
                      <span className="empty-stone empty-stone--black" />
                      <span className="empty-stone empty-stone--white" />
                    </div>
                    <h3>
                      {searchQuery
                        ? `Không tìm thấy kỳ thủ phù hợp với "${searchQuery}"`
                        : "Chưa có kỳ thủ nào ghi danh trên bảng xếp hạng này"}
                    </h3>
                    <p>
                      {searchQuery
                        ? "Vui lòng thử tìm kiếm với tên hoặc đẳng cấp khác, hoặc bấm nút bên dưới để xóa từ khóa tìm kiếm."
                        : "Hãy là người đầu tiên tham gia thi đấu đối kháng, hạ gục AI hoặc giải các thế cờ Tsumego hóc búa để ghi tên mình lên bảng vàng!"}
                    </p>
                    <div className="empty-state-actions">
                      {searchQuery ? (
                        <button className="empty-state-btn" onClick={() => setSearchQuery("")}>
                          ✕ Xóa bộ lọc tìm kiếm
                        </button>
                      ) : (
                        <>
                          <button className="empty-state-btn" onClick={() => navigate("/pve")}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="11" width="18" height="10" rx="2" />
                              <circle cx="12" cy="5" r="2" />
                              <path d="M12 7v4" />
                            </svg>
                            Đấu với AI ngay
                          </button>
                          <button className="empty-state-btn empty-state-btn--ghost" onClick={() => navigate("/online")}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            Đấu PvP Online
                          </button>
                          <button className="empty-state-btn empty-state-btn--ghost" onClick={() => navigate("/tsumego")}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            Luyện Tsumego
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <table className="leaderboard-table">
                    <thead>
                      <tr>
                        <th style={{ width: "64px", textAlign: "center" }}>Hạng</th>
                        <th>Kỳ Thủ</th>
                        <th>Đẳng Cấp</th>
                        {activeTab === "all" && (
                          <>
                            <th>Điểm Kỳ Lực</th>
                            <th>PvP (W-L)</th>
                            <th>Đấu Máy</th>
                            <th>Tsumego</th>
                            <th>Xu Hướng</th>
                          </>
                        )}
                        {activeTab === "pvp" && (
                          <>
                            <th>Điểm Cao Nhất</th>
                            <th>Số Trận</th>
                            <th>Trận Thắng</th>
                            <th>Tỉ Lệ Thắng</th>
                            <th>Chuỗi Thắng</th>
                          </>
                        )}
                        {activeTab === "ai" && (
                          <>
                            <th>Tổng Trận</th>
                            <th>Trận Thắng</th>
                            <th>Dễ</th>
                            <th>Trung Bình</th>
                            <th>Khó</th>
                            <th>Bậc Thầy (19x19)</th>
                          </>
                        )}
                        {activeTab === "tsumego" && (
                          <>
                            <th>Đã Giải</th>
                            <th>Điểm</th>
                            <th>Nhập Môn</th>
                            <th>Trung Cấp</th>
                            <th>Cao Cấp</th>
                            <th>Bậc Thầy</th>
                          </>
                        )}
                        <th style={{ width: "80px", textAlign: "center" }}>Chi Tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPlayers.map((player) => {
                        const isTop1 = player.currentRank === 1;
                        const isTop2 = player.currentRank === 2;
                        const isTop3 = player.currentRank === 3;

                        return (
                          <tr
                            key={player.id}
                            className={`leaderboard-row ${player.isCurrentUser ? "leaderboard-row--current" : ""} ${
                              isTop1 ? "leaderboard-row--top1" : isTop2 ? "leaderboard-row--top2" : isTop3 ? "leaderboard-row--top3" : ""
                            }`}
                            onClick={() => setSelectedPlayer(player)}
                          >
                            <td style={{ textAlign: "center" }}>
                              <span
                                className={`rank-badge ${
                                  isTop1
                                    ? "rank-badge--1"
                                    : isTop2
                                    ? "rank-badge--2"
                                    : isTop3
                                    ? "rank-badge--3"
                                    : ""
                                }`}
                              >
                                {player.currentRank}
                              </span>
                            </td>
                            <td>
                              <div className="player-cell">
                                <div className={`go-stone-avatar go-stone-avatar--${player.stoneType} go-stone-avatar--sm`}>
                                  {player.initials}
                                </div>
                                <div className="player-names">
                                  <div className="player-name-row">
                                    <span className="player-display-name">{player.displayName}</span>
                                    {player.isCurrentUser && <span className="you-pill">BẠN</span>}
                                  </div>
                                  <span className="player-username">@{player.username} · {player.country}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="dan-badge">{player.danRank}</span>
                              {player.titleBadge && <span className="player-title-badge">✦ {player.titleBadge}</span>}
                            </td>

                            {activeTab === "all" && (
                              <>
                                <td>
                                  <strong className="table-highlight-points">{player.ratingPoints}</strong>
                                </td>
                                <td>
                                  {player.pvpStats.wins}W - {player.pvpStats.losses}L
                                </td>
                                <td>
                                  {player.aiStats.totalWins} / {player.aiStats.totalMatches} ván
                                </td>
                                <td>
                                  {player.tsumegoStats.totalSolved} bài
                                </td>
                                <td>
                                  <span className={`trend-indicator trend--${player.trend}`}>
                                    {player.trend === "up" && "▲"}
                                    {player.trend === "down" && "▼"}
                                    {player.trend === "same" && "—"}
                                  </span>
                                </td>
                              </>
                            )}

                            {activeTab === "pvp" && (
                              <>
                                <td>
                                  <strong className="table-highlight-points">{player.pvpStats.highScore}</strong>
                                </td>
                                <td>{player.pvpStats.matches}</td>
                                <td>{player.pvpStats.wins}</td>
                                <td>
                                  <span style={{ color: "#3ecf8e", fontWeight: 700 }}>{player.pvpStats.winRate}%</span>
                                </td>
                                <td>
                                  <span className="streak-badge">🔥 {player.pvpStats.currentStreak}</span>
                                </td>
                              </>
                            )}

                            {activeTab === "ai" && (
                              <>
                                <td>{player.aiStats.totalMatches}</td>
                                <td>
                                  <strong style={{ color: "#3ecf8e" }}>{player.aiStats.totalWins}</strong>
                                </td>
                                <td>{player.aiStats.byDifficulty.easy.wins}</td>
                                <td>{player.aiStats.byDifficulty.medium.wins}</td>
                                <td>{player.aiStats.byDifficulty.hard.wins}</td>
                                <td>
                                  <strong style={{ color: "#e0a537" }}>{player.aiStats.byDifficulty.master.wins}</strong>
                                </td>
                              </>
                            )}

                            {activeTab === "tsumego" && (
                              <>
                                <td>
                                  <strong style={{ color: "#3ecf8e" }}>{player.tsumegoStats.totalSolved}</strong>
                                </td>
                                <td>{player.tsumegoStats.totalScore}</td>
                                <td>{player.tsumegoStats.byDifficulty.beginner.solved}</td>
                                <td>{player.tsumegoStats.byDifficulty.intermediate.solved}</td>
                                <td>{player.tsumegoStats.byDifficulty.advanced.solved}</td>
                                <td>
                                  <strong style={{ color: "#e0a537" }}>{player.tsumegoStats.byDifficulty.master.solved}</strong>
                                </td>
                              </>
                            )}

                            <td style={{ textAlign: "center" }}>
                              <button
                                type="button"
                                className="btn-view-profile"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPlayer(player);
                                }}
                              >
                                <span>Xem</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="9 18 15 12 9 6" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </section>
            </div>
          )}

          {/* 6. MODAL CHI TIẾT KỲ THỦ */}
          {selectedPlayer && (
            <div className="leaderboard-modal-overlay" onClick={() => setSelectedPlayer(null)}>
              <div className="leaderboard-modal" onClick={(e) => e.stopPropagation()}>
                <button
                  className="leaderboard-modal__close"
                  onClick={() => setSelectedPlayer(null)}
                  type="button"
                >
                  ✕
                </button>

                <div className="modal-player-header">
                  <div
                    className={`go-stone-avatar go-stone-avatar--${selectedPlayer.stoneType}`}
                    style={{ width: 56, height: 56, fontSize: "1.2rem" }}
                  >
                    {selectedPlayer.initials}
                  </div>
                  <div className="modal-player-info">
                    <h3>{selectedPlayer.displayName}</h3>
                    <p>
                      @{selectedPlayer.username} · {selectedPlayer.country} ·{" "}
                      <span className="dan-badge">{selectedPlayer.danRank}</span>
                    </p>
                    {selectedPlayer.titleBadge && (
                      <span className="player-title-badge">✦ {selectedPlayer.titleBadge}</span>
                    )}
                  </div>
                </div>

                <div className="modal-stats-grid">
                  <div className="modal-stat-box">
                    <span>Điểm Kỳ Lực</span>
                    <strong>{selectedPlayer.ratingPoints}</strong>
                  </div>
                  <div className="modal-stat-box">
                    <span>Điểm Cao Nhất</span>
                    <strong>{selectedPlayer.pvpStats.highScore}</strong>
                  </div>
                  <div className="modal-stat-box">
                    <span>Tỉ Lệ Thắng PvP</span>
                    <strong style={{ color: "#3ecf8e" }}>{selectedPlayer.pvpStats.winRate}%</strong>
                  </div>
                </div>

                <div className="modal-breakdown-section">
                  <h4>Đấu Với Máy (PvE):</h4>
                  <div className="modal-bars-list">
                    <div className="modal-bar-item">
                      <span>Mức Dễ (Easy):</span>
                      <strong>{selectedPlayer.aiStats.byDifficulty.easy.wins} / {selectedPlayer.aiStats.byDifficulty.easy.matches} ván thắng</strong>
                    </div>
                    <div className="modal-bar-item">
                      <span>Mức Trung Bình (Medium):</span>
                      <strong>{selectedPlayer.aiStats.byDifficulty.medium.wins} / {selectedPlayer.aiStats.byDifficulty.medium.matches} ván thắng</strong>
                    </div>
                    <div className="modal-bar-item">
                      <span>Mức Khó (Hard):</span>
                      <strong>{selectedPlayer.aiStats.byDifficulty.hard.wins} / {selectedPlayer.aiStats.byDifficulty.hard.matches} ván thắng</strong>
                    </div>
                    <div className="modal-bar-item">
                      <span>Mức Bậc Thầy (Master 19x19):</span>
                      <strong>{selectedPlayer.aiStats.byDifficulty.master.wins} / {selectedPlayer.aiStats.byDifficulty.master.matches} ván thắng</strong>
                    </div>
                  </div>
                </div>

                <div className="modal-breakdown-section">
                  <h4>Bài Tập Tsumego Đã Vượt Qua:</h4>
                  <div className="modal-bars-list">
                    <div className="modal-bar-item">
                      <span>Nhập Môn:</span>
                      <strong>{selectedPlayer.tsumegoStats.byDifficulty.beginner.solved} / {selectedPlayer.tsumegoStats.byDifficulty.beginner.total} bài</strong>
                    </div>
                    <div className="modal-bar-item">
                      <span>Trung Cấp:</span>
                      <strong>{selectedPlayer.tsumegoStats.byDifficulty.intermediate.solved} / {selectedPlayer.tsumegoStats.byDifficulty.intermediate.total} bài</strong>
                    </div>
                    <div className="modal-bar-item">
                      <span>Cao Cấp:</span>
                      <strong>{selectedPlayer.tsumegoStats.byDifficulty.advanced.solved} / {selectedPlayer.tsumegoStats.byDifficulty.advanced.total} bài</strong>
                    </div>
                    <div className="modal-bar-item">
                      <span>Bậc Thầy:</span>
                      <strong>{selectedPlayer.tsumegoStats.byDifficulty.master.solved} / {selectedPlayer.tsumegoStats.byDifficulty.master.total} bài</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;
