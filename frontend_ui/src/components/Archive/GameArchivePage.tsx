// src/components/Archive/GameArchivePage.tsx
// Trang Kỳ Phổ Của Tôi — Quản lý lịch sử, xem lại ván đấu và xuất file SGF
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../Home/Sidebar";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchUserArchiveGames,
  generateStandardSgf,
  type SavedGame,
} from "../../services/archiveFirebaseService";
import "./GameArchivePage.css";

export function GameArchivePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filterMode, setFilterMode] = useState<"all" | "pve" | "pvp" | "legendary">("all");
  const [selectedGame, setSelectedGame] = useState<SavedGame | null>(null);
  const [gamesList, setGamesList] = useState<SavedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewMoveIndex, setReviewMoveIndex] = useState(1);

  // Tải kỳ phổ từ Firebase Firestore và LocalStorage
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchUserArchiveGames(user?.uid)
      .then((games) => {
        if (!isMounted) return;
        setGamesList(games);
      })
      .catch((err) => {
        console.warn("Lỗi tải kỳ phổ:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [user]);

  const filtered =
    filterMode === "all"
      ? gamesList
      : gamesList.filter((g) => g.mode === filterMode);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa kỳ phổ này khỏi kho lưu trữ?")) {
      setGamesList((prev) => prev.filter((g) => g.id !== id));
      try {
        const rawSaved = localStorage.getItem("go_saved_games");
        if (rawSaved) {
          const list: SavedGame[] = JSON.parse(rawSaved);
          localStorage.setItem("go_saved_games", JSON.stringify(list.filter((g) => g.id !== id)));
        }
      } catch {}
    }
  };

  const handleDownloadSgf = (game: SavedGame, e: React.MouseEvent) => {
    e.stopPropagation();
    const sgfContent = game.sgfContent || generateStandardSgf(game);
    const blob = new Blob([sgfContent], { type: "application/x-go-sgf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${game.id}_ky_pho.sgf`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
        <div className="archive-container">
          {/* HEADER */}
          <header className="archive-header">
            <div className="archive-title-group">
              <span className="archive-badge">Thư Viện Ván Đấu Cá Nhân</span>
              <h1>KỲ PHỔ CỦA TÔI</h1>
              <p>Lưu trữ biên bản SGF, xem lại từng nước đi và phân tích độ chuẩn xác ván đấu</p>
            </div>

            <div className="archive-stats-strip">
              <div className="archive-stat-card">
                <span className="stat-label">Tổng Ván Đã Lưu</span>
                <strong className="stat-num">{gamesList.length}</strong>
              </div>
              <div className="archive-stat-card">
                <span className="stat-label">Tỉ Lệ Thắng</span>
                <strong className="stat-num" style={{ color: "var(--color-accent-jade)" }}>
                  {gamesList.length === 0
                    ? "0%"
                    : `${Math.round(
                        (gamesList.filter((g) => g.result === "win").length / gamesList.length) * 100
                      )}%`}
                </strong>
              </div>
              <div className="archive-stat-card">
                <span className="stat-label">Độ Chuẩn Xác TB</span>
                <strong className="stat-num" style={{ color: "var(--color-accent-amber)" }}>
                  {gamesList.length === 0
                    ? "—%"
                    : `${(
                        gamesList.reduce((acc, g) => acc + g.accuracy, 0) / gamesList.length
                      ).toFixed(1)}%`}
                </strong>
              </div>
            </div>
          </header>

          {/* TABS LỌC CHẾ ĐỘ */}
          <nav className="archive-tabs">
            <button
              type="button"
              className={`archive-tab-btn ${filterMode === "all" ? "archive-tab-btn--active" : ""}`}
              onClick={() => setFilterMode("all")}
            >
              Tất cả ({gamesList.length})
            </button>
            <button
              type="button"
              className={`archive-tab-btn ${filterMode === "pve" ? "archive-tab-btn--active" : ""}`}
              onClick={() => setFilterMode("pve")}
            >
              Đấu Với Máy (PvE)
            </button>
            <button
              type="button"
              className={`archive-tab-btn ${filterMode === "pvp" ? "archive-tab-btn--active" : ""}`}
              onClick={() => setFilterMode("pvp")}
            >
              Đối Kháng PvP Online
            </button>
            <button
              type="button"
              className={`archive-tab-btn ${filterMode === "legendary" ? "archive-tab-btn--active" : ""}`}
              onClick={() => setFilterMode("legendary")}
            >
              Đấu Trường Huyền Thoại
            </button>
          </nav>

          {/* BẢNG DANH SÁCH KỲ PHỔ */}
          <section className="archive-table-container">
            <table className="archive-table">
              <thead>
                <tr>
                  <th>Mã Ván Cờ</th>
                  <th>Thời Gian</th>
                  <th>Chế Độ</th>
                  <th>Quân Đi</th>
                  <th>Đối Thủ</th>
                  <th>Kết Quả</th>
                  <th>Số Nước</th>
                  <th>Độ Chuẩn</th>
                  <th style={{ textAlign: "right" }}>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="archive-empty-cell">
                      <div className="archive-empty-wrapper">
                        <div className="archive-empty-icon" aria-hidden="true">
                          <svg
                            viewBox="0 0 48 48"
                            width="52"
                            height="52"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          >
                            <rect
                              x="8"
                              y="8"
                              width="32"
                              height="32"
                              rx="6"
                              strokeDasharray="3 3"
                              opacity="0.4"
                            />
                            <path d="M8 24h32M24 8v32" strokeOpacity="0.25" />
                            <circle cx="18" cy="18" r="4.5" fill="#14140f" stroke="#666" strokeWidth="1" />
                            <circle cx="30" cy="30" r="4.5" fill="#ffffff" stroke="#999" strokeWidth="1" />
                          </svg>
                        </div>
                        <h4 className="archive-empty-title">
                          {loading ? "Đang nạp kỳ phổ cá nhân..." : "Kho Kỳ Phổ Đang Để Trống"}
                        </h4>
                        <p className="archive-empty-desc">
                          {loading
                            ? "Đang đồng bộ biên bản thi đấu từ Firebase Firestore và bộ nhớ thiết bị..."
                            : "Bạn chưa lưu ván đấu nào vào bộ nhớ cá nhân. Sau khi thi đấu (PvE Đấu Với Máy, PvP Đối Kháng Online hoặc Ván Đấu Huyền Thoại), bạn có thể lưu lại biên bản kỳ phổ (.SGF) để xem lại từng nước đi và phân tích độ chuẩn xác tại đây."}
                        </p>
                        <div className="archive-empty-actions">
                          <button
                            type="button"
                            className="btn-archive-empty btn-archive-empty--primary"
                            onClick={() => navigate("/play/pve")}
                          >
                            ⚔ Chơi Ván Mới Với Máy (PvE)
                          </button>
                          <button
                            type="button"
                            className="btn-archive-empty"
                            onClick={() => navigate("/online")}
                          >
                            🌐 Tìm Trận Online (PvP)
                          </button>
                          <button
                            type="button"
                            className="btn-archive-empty"
                            onClick={() => navigate("/play/legendary")}
                          >
                            📜 Đấu Trường Huyền Thoại
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((game) => (
                    <tr
                      key={game.id}
                      className="archive-row"
                      onClick={() => {
                        setSelectedGame(game);
                        setReviewMoveIndex(game.totalMoves);
                      }}
                    >
                      <td className="col-id">
                        <strong>{game.id}</strong>
                      </td>
                      <td className="col-date">{game.date}</td>
                      <td>
                        <span className="mode-pill">{game.modeLabel}</span>
                      </td>
                      <td>
                        <div className="stone-color-cell">
                          <span className={`stone-dot stone-dot--${game.playerColor}`} />
                          <span>{game.playerColor === "black" ? "Quân Đen" : "Quân Trắng"}</span>
                        </div>
                      </td>
                      <td>
                        <div className="opponent-cell">
                          <strong>{game.opponentName}</strong>
                          <span className="opponent-rank">{game.opponentRank}</span>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`result-badge ${
                            game.result === "win" ? "result-badge--win" : "result-badge--loss"
                          }`}
                        >
                          {game.result === "win" ? "Thắng" : "Thua"}
                        </span>
                        <div className="result-text">{game.resultText}</div>
                      </td>
                      <td className="col-moves">{game.totalMoves} nước</td>
                      <td>
                        <span className="accuracy-val">{game.accuracy}%</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="row-actions">
                          <button
                            type="button"
                            className="btn-action btn-action--review"
                            title="Xem lại từng nước đi"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedGame(game);
                              setReviewMoveIndex(game.totalMoves);
                            }}
                          >
                            Xem lại ↗
                          </button>
                          <button
                            type="button"
                            className="btn-action btn-action--sgf"
                            title="Tải file SGF"
                            onClick={(e) => handleDownloadSgf(game, e)}
                          >
                            SGF
                          </button>
                          <button
                            type="button"
                            className="btn-action btn-action--del"
                            title="Xóa kỳ phổ"
                            onClick={(e) => handleDelete(game.id, e)}
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>

          {/* MODAL XEM LẠI KỲ PHỔ (REVIEW SGF MODAL) */}
          {selectedGame && (
            <div className="archive-modal-backdrop" onClick={() => setSelectedGame(null)}>
              <div className="archive-modal" onClick={(e) => e.stopPropagation()}>
                <header className="archive-modal-header">
                  <div className="archive-modal-title">
                    <h3>Chi Tiết Kỳ Phổ: {selectedGame.id}</h3>
                    <p>
                      {selectedGame.modeLabel} · vs {selectedGame.opponentName} ({selectedGame.opponentRank})
                    </p>
                  </div>

                  <button
                    type="button"
                    className="archive-modal-close"
                    onClick={() => setSelectedGame(null)}
                  >
                    ✕ Đóng
                  </button>
                </header>

                <div className="archive-modal-body">
                  <div className="archive-review-board">
                    <div className="archive-preview-board">
                      <div className="archive-preview-grid">
                        <span className="archive-preview-stone archive-preview-stone--b" style={{ top: "35%", left: "40%" }} />
                        <span className="archive-preview-stone archive-preview-stone--w" style={{ top: "42%", left: "48%" }} />
                        <span className="archive-preview-stone archive-preview-stone--b" style={{ top: "50%", left: "55%" }} />
                        <span className="archive-preview-stone archive-preview-stone--w" style={{ top: "60%", left: "38%" }} />
                      </div>
                    </div>

                    <div className="archive-review-controls">
                      <button
                        type="button"
                        onClick={() => setReviewMoveIndex(1)}
                        disabled={reviewMoveIndex <= 1}
                      >
                        |◀
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewMoveIndex((p) => Math.max(1, p - 1))}
                        disabled={reviewMoveIndex <= 1}
                      >
                        ◀
                      </button>
                      <span className="review-move-indicator">
                        Nước đi: <strong>{reviewMoveIndex}</strong> / {selectedGame.totalMoves}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setReviewMoveIndex((p) => Math.min(selectedGame.totalMoves, p + 1))
                        }
                        disabled={reviewMoveIndex >= selectedGame.totalMoves}
                      >
                        ▶
                      </button>
                      <button
                        type="button"
                        onClick={() => setReviewMoveIndex(selectedGame.totalMoves)}
                        disabled={reviewMoveIndex >= selectedGame.totalMoves}
                      >
                        ▶|
                      </button>
                    </div>
                  </div>

                  <div className="archive-review-sidebar">
                    <h4>Thông Số Thẩm Định AI</h4>
                    <div className="review-stat-item">
                      <span>Kết quả:</span>
                      <strong>{selectedGame.resultText}</strong>
                    </div>
                    <div className="review-stat-item">
                      <span>Độ chuẩn xác:</span>
                      <strong style={{ color: "var(--color-accent-jade)" }}>
                        {selectedGame.accuracy}%
                      </strong>
                    </div>
                    <div className="review-stat-item">
                      <span>Tổng số nước đi:</span>
                      <strong>{selectedGame.totalMoves} nước</strong>
                    </div>

                    <div className="review-notes-box">
                      <h5>Thông Tin Biên Bản Kỳ Phổ:</h5>
                      <ul>
                        <li>✦ Định dạng lưu trữ: Chuẩn quốc tế SGF (Smart Game Format)</li>
                        <li>✦ Đánh giá độ chính xác tổng thể: {selectedGame.accuracy}%</li>
                        <li>✦ Sẵn sàng tải về để phân tích chuyên sâu cùng KataGo / Lizzie</li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      className="btn-download-full-sgf"
                      onClick={(e) => handleDownloadSgf(selectedGame, e)}
                    >
                      Tải File .SGF Chuẩn Quốc Tế
                    </button>
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
