// src/components/Watch/LiveMatchesPage.tsx
// Trang Xem Ván Đấu Đang Diễn Ra — Khán Đài Trực Tiếp (Live Spectator Arena)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../Home/Sidebar";
import {
  subscribeToLiveMatches,
  type LiveMatch,
} from "../../services/liveMatchesFirebaseService";
import "./LiveMatchesPage.css";

export function LiveMatchesPage() {
  const navigate = useNavigate();
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>([]);
  const [filterType, setFilterType] = useState<"all" | "pvp" | "pve" | "eve">("all");
  const [selectedMatch, setSelectedMatch] = useState<LiveMatch | null>(null);

  // Lắng nghe dữ liệu trận đấu và phòng chờ thực tế từ Firebase Firestore
  useEffect(() => {
    const unsub = subscribeToLiveMatches((items) => {
      setLiveMatches(items);
    });
    return () => unsub();
  }, []);

  const filtered =
    filterType === "all"
      ? liveMatches
      : liveMatches.filter((m) => m.type === filterType);

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
        <div className="live-container">
          {/* HEADER */}
          <header className="live-header">
            <div className="live-header__left">
              <span className="live-badge">Khán Đài Trực Tiếp</span>
              <h1>VÁN ĐẤU ĐANG DIỄN RA</h1>
              <p>Theo dõi thời gian thực các trận đấu kịch tính trong cộng đồng và đấu trường AI</p>
            </div>

            <div className="live-stats-bar">
              <div className="live-stat-item">
                <span className="live-stat-dot" />
                <span className="live-stat-val">{liveMatches.length}</span>
                <span className="live-stat-lbl">Phòng đấu trực tiếp</span>
              </div>
              <div className="live-stat-divider" />
              <div className="live-stat-item">
                <span className="live-stat-val">
                  {liveMatches.reduce((acc, m) => acc + m.spectatorsCount, 0)}
                </span>
                <span className="live-stat-lbl">Khán giả đang xem</span>
              </div>
            </div>
          </header>

          {/* BỘ LỌC CHẾ ĐỘ PHÒNG ĐẤU */}
          <nav className="live-tabs">
            <button
              type="button"
              className={`live-tab-btn ${filterType === "all" ? "live-tab-btn--active" : ""}`}
              onClick={() => setFilterType("all")}
            >
              Tất cả phòng đấu ({liveMatches.length})
            </button>
            <button
              type="button"
              className={`live-tab-btn ${filterType === "eve" ? "live-tab-btn--active" : ""}`}
              onClick={() => setFilterType("eve")}
            >
              Trực tiếp AI vs AI
            </button>
            <button
              type="button"
              className={`live-tab-btn ${filterType === "pvp" ? "live-tab-btn--active" : ""}`}
              onClick={() => setFilterType("pvp")}
            >
              Đối kháng PvP Online
            </button>
            <button
              type="button"
              className={`live-tab-btn ${filterType === "pve" ? "live-tab-btn--active" : ""}`}
              onClick={() => setFilterType("pve")}
            >
              Thử thách Máy AI
            </button>
          </nav>

          {/* DANH SÁCH CÁC TRẬN ĐẤU ĐANG DIỄN RA (CARDS GRID HOẶC EMPTY STATE) */}
          {filtered.length === 0 ? (
            <div className="live-empty-state">
              <div className="live-empty-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="24" cy="24" r="20" strokeDasharray="3 3" opacity="0.35" />
                  <circle cx="24" cy="24" r="13" opacity="0.6" />
                  <circle cx="24" cy="24" r="5" fill="var(--color-accent-red)" opacity="0.85" />
                  <path d="M24 4 L24 8 M24 40 L24 44 M4 24 L8 24 M40 24 L44 24" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="live-empty-title">Chưa Có Ván Đấu Đang Diễn Ra</h3>
              <p className="live-empty-desc">
                Hiện tại không có phòng đấu trực tuyến nào đang hoạt động. Khi người chơi hoặc hệ thống AI bắt đầu một ván cờ (PvP Online, AI vs AI hoặc Thử Thách Máy), dữ liệu trận đấu sẽ tự động xuất hiện tại đây để bạn vào khán đài theo dõi theo thời gian thực.
              </p>
              <div className="live-empty-actions">
                <button
                  type="button"
                  className="btn-live-empty btn-live-empty--primary"
                  onClick={() => navigate("/play/eve")}
                >
                  ▶ Khởi Động AI vs AI (EvE)
                </button>
                <button
                  type="button"
                  className="btn-live-empty"
                  onClick={() => navigate("/play/pve")}
                >
                  ⚔ Đấu Với Máy (PvE)
                </button>
                <button
                  type="button"
                  className="btn-live-empty"
                  onClick={() => navigate("/online")}
                >
                  🌐 Tìm Phòng Online (PvP)
                </button>
              </div>
            </div>
          ) : (
            <section className="live-grid">
              {filtered.map((match) => (
                <div key={match.id} className="live-card">
                  <div className="live-card__top">
                    <span className="live-indicator">
                      <span className="live-pulse" />
                      TRỰC TIẾP
                    </span>
                    <span className="live-type-tag">{match.typeLabel}</span>
                    <span className="live-spectators">👁 {match.spectatorsCount} đang xem</span>
                  </div>

                  <div className="live-card__vs-arena">
                    {/* KỲ THỦ ĐEN */}
                    <div className="live-player-box">
                      <div className="live-stone-avatar live-stone-avatar--black">
                        {match.playerBlack.isAi ? "AI" : match.playerBlack.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="live-player-meta">
                        <strong className="live-player-name">{match.playerBlack.name}</strong>
                        <span className="live-player-rank">{match.playerBlack.rank}</span>
                        <span className="live-player-clock">⏱ {match.playerBlack.timeLeft}</span>
                      </div>
                    </div>

                    <div className="live-vs-separator">
                      <span className="live-move-count">Nước {match.currentMove}</span>
                      <span className="live-vs-text">VS</span>
                    </div>

                    {/* KỲ THỦ TRẮNG */}
                    <div className="live-player-box live-player-box--right">
                      <div className="live-player-meta" style={{ textAlign: "right" }}>
                        <strong className="live-player-name">{match.playerWhite.name}</strong>
                        <span className="live-player-rank">{match.playerWhite.rank}</span>
                        <span className="live-player-clock">⏱ {match.playerWhite.timeLeft}</span>
                      </div>
                      <div className="live-stone-avatar live-stone-avatar--white">
                        {match.playerWhite.isAi ? "AI" : match.playerWhite.name.slice(0, 2).toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* THANH DỰ ĐOÁN WINRATE THỜI GIAN THỰC */}
                  <div className="live-winrate-bar-wrap">
                    <div className="live-winrate-labels">
                      <span>Đen {Math.round(match.blackWinRate * 100)}%</span>
                      <span>Trắng {Math.round((1 - match.blackWinRate) * 100)}%</span>
                    </div>
                    <div className="live-winrate-bar">
                      <div
                        className="live-winrate-fill"
                        style={{ width: `${match.blackWinRate * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* NÚT VÀO XEM / THÁCH ĐẤU */}
                  <div className="live-card__actions">
                    {match.isWaitingRoom && match.roomId ? (
                      <button
                        type="button"
                        className="btn-spectate btn-spectate--join"
                        onClick={() => navigate(`/join/${match.roomId}`)}
                      >
                        Vào Thách Đấu Ngay ⚔
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-spectate"
                        onClick={() => {
                          if (match.matchId) {
                            navigate(`/game/${match.matchId}`);
                          } else {
                            setSelectedMatch(match);
                          }
                        }}
                      >
                        Vào Xem Trực Tiếp ↗
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* MODAL KHÁN ĐÀI TRỰC TIẾP (SPECTATOR MODAL TEMPLATE) */}
          {selectedMatch && (
            <div className="spectator-modal-backdrop" onClick={() => setSelectedMatch(null)}>
              <div className="spectator-modal" onClick={(e) => e.stopPropagation()}>
                <header className="spectator-modal-header">
                  <div className="spectator-modal-title">
                    <span className="live-indicator">
                      <span className="live-pulse" />
                      TRỰC TIẾP
                    </span>
                    <h3>
                      {selectedMatch.playerBlack.name} vs {selectedMatch.playerWhite.name}
                    </h3>
                    <span className="spectator-modal-type">{selectedMatch.typeLabel}</span>
                  </div>

                  <button
                    type="button"
                    className="spectator-modal-close"
                    onClick={() => setSelectedMatch(null)}
                  >
                    ✕ Rời khán đài
                  </button>
                </header>

                <div className="spectator-modal-body">
                  {/* MÔ PHỎNG BÀN CỜ SPECTATOR */}
                  <div className="spectator-board-area">
                    <div className="spectator-board-canvas">
                      <div className="spectator-board-grid">
                        <div className="spectator-board-inner">
                          <span className="spectator-center-dot" />
                          <div className="spectator-preview-stones">
                            <span className="preview-stone-b" style={{ top: "45%", left: "48%" }} />
                            <span className="preview-stone-w" style={{ top: "45%", left: "55%" }} />
                            <span className="preview-stone-b" style={{ top: "52%", left: "55%" }} />
                            <span className="preview-stone-w" style={{ top: "52%", left: "48%" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CỘT THÔNG TIN VÁN ĐẤU & CHAT KHÁN GIẢ */}
                  <div className="spectator-info-sidebar">
                    <div className="spectator-match-info">
                      <h4>Trạng Thái Trận Đấu</h4>
                      <div className="spectator-metric-row">
                        <span>Số nước đi:</span>
                        <strong>Nước {selectedMatch.currentMove}</strong>
                      </div>
                      <div className="spectator-metric-row">
                        <span>Tỉ lệ thắng Đen:</span>
                        <strong style={{ color: "var(--color-accent-jade)" }}>
                          {Math.round(selectedMatch.blackWinRate * 100)}%
                        </strong>
                      </div>
                      <div className="spectator-metric-row">
                        <span>Khán giả theo dõi:</span>
                        <strong>{selectedMatch.spectatorsCount} người</strong>
                      </div>
                      {selectedMatch.matchId && (
                        <button
                          type="button"
                          className="btn-live-empty btn-live-empty--primary"
                          style={{ marginTop: "12px", width: "100%", justifyContent: "center" }}
                          onClick={() => navigate(`/game/${selectedMatch.matchId}`)}
                        >
                          Vào Bàn Cờ Trận Đấu ↗
                        </button>
                      )}
                    </div>

                    <div className="spectator-chat-box">
                      <h4>Bình Luận Khán Đài</h4>
                      <div className="spectator-chat-messages">
                        <div className="chat-empty-notice">
                          Khán đài hiện chưa có tin nhắn bình luận nào.
                        </div>
                      </div>
                      <div className="spectator-chat-input-row">
                        <input type="text" placeholder="Gửi bình luận vào khán đài..." disabled />
                        <button type="button" disabled>Gửi</button>
                      </div>
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
