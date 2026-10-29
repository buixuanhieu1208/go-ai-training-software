// src/components/Settings/SettingsPage.tsx
// Trang Cài Đặt Hệ Thống — Quản lý Theme Sáng/Tối, Bàn Cờ, Âm Thanh & Trợ Lý AI
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../Home/Sidebar";
import { useTheme } from "../../contexts/ThemeContext";
import "./SettingsPage.css";

interface SettingsState {
  showCoordinates: boolean;
  showMoveNumbers: boolean;
  highlightLastMove: boolean;
  showAiHints: boolean;
  stoneSound: boolean;
  alertSound: boolean;
  soundVolume: number;
  autoWinrate: boolean;
  deepAnalysis: boolean;
  autoSaveSgf: boolean;
}

const DEFAULT_SETTINGS: SettingsState = {
  showCoordinates: true,
  showMoveNumbers: true,
  highlightLastMove: true,
  showAiHints: true,
  stoneSound: true,
  alertSound: true,
  soundVolume: 80,
  autoWinrate: true,
  deepAnalysis: true,
  autoSaveSgf: true,
};

const SETTINGS_STORAGE_KEY = "go_app_settings_preferences";

export function SettingsPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const [settings, setSettings] = useState<SettingsState>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch {
      // fallback
    }
    return DEFAULT_SETTINGS;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const updateSetting = <K extends keyof SettingsState>(key: K, val: SettingsState[K]) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: val };
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setTheme("dark");
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
    showToast("Đã khôi phục cài đặt gốc mặc định!");
  };

  const handleSave = () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    showToast("Đã lưu cấu hình cài đặt thành công!");
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
        <div className="settings-container">
          {/* TOAST THÔNG BÁO */}
          {toastMessage && (
            <div className="settings-toast">
              <span className="toast-icon">✓</span>
              <span>{toastMessage}</span>
            </div>
          )}

          {/* HEADER */}
          <header className="settings-header">
            <div className="settings-title-group">
              <h1>CÀI ĐẶT HỆ THỐNG</h1>
              <p>Tùy biến giao diện, âm thanh bàn cờ và trợ lý huấn luyện cờ vây AI</p>
            </div>

            <div className="settings-header-actions">
              <button
                type="button"
                className="settings-btn settings-btn--ghost"
                onClick={handleReset}
              >
                Khôi phục mặc định
              </button>
              <button
                type="button"
                className="settings-btn settings-btn--primary"
                onClick={handleSave}
              >
                Lưu cài đặt
              </button>
            </div>
          </header>

          {/* SECTION 1: THEME GIAO DIỆN SÁNG / TỐI (TRỌNG TÂM) */}
          <section className="settings-card">
            <div className="settings-card__header">
              <div className="settings-card__badge">Chế Độ Hiển Thị</div>
              <h2>Giao Diện Nền Sáng / Tối</h2>
              <p>Chọn phong cách màu sắc phù hợp với không gian và thời điểm tập luyện của bạn</p>
            </div>

            <div className="theme-selector-grid">
              {/* THEME TỐI (DARK MODE) */}
              <div
                className={`theme-card ${theme === "dark" ? "theme-card--active" : ""}`}
                onClick={() => {
                  setTheme("dark");
                  showToast("Đã chuyển sang Chế độ Nền Tối");
                }}
              >
                <div className="theme-card__preview theme-card__preview--dark">
                  <div className="preview-topbar" />
                  <div className="preview-body">
                    <div className="preview-sidebar" />
                    <div className="preview-board">
                      <div className="preview-stone preview-stone--black" />
                      <div className="preview-stone preview-stone--white" />
                    </div>
                  </div>
                </div>

                <div className="theme-card__content">
                  <div className="theme-card__header">
                    <span className="theme-card__name">Chế Độ Nền Tối (Dark Mode)</span>
                    <span className="theme-card__radio">
                      {theme === "dark" && <span className="radio-dot" />}
                    </span>
                  </div>
                  <p className="theme-card__desc">
                    Tông than chì & gỗ sẫm cổ kính (`#14140f`), kết hợp ánh ngọc Jade dịu mắt. Giúp
                    tối ưu hóa thị giác và duy trì sự tập trung cao độ trong các ván cờ kéo dài.
                  </p>
                  <div className="theme-card__tags">
                    <span className="theme-pill">Mặc định</span>
                    <span className="theme-pill">Dịu mắt ban đêm</span>
                    <span className="theme-pill">Độ tương phản cao</span>
                  </div>
                </div>
              </div>

              {/* THEME SÁNG (LIGHT MODE) */}
              <div
                className={`theme-card ${theme === "light" ? "theme-card--active" : ""}`}
                onClick={() => {
                  setTheme("light");
                  showToast("Đã chuyển sang Chế độ Nền Sáng");
                }}
              >
                <div className="theme-card__preview theme-card__preview--light">
                  <div className="preview-topbar" />
                  <div className="preview-body">
                    <div className="preview-sidebar" />
                    <div className="preview-board">
                      <div className="preview-stone preview-stone--black" />
                      <div className="preview-stone preview-stone--white" />
                    </div>
                  </div>
                </div>

                <div className="theme-card__content">
                  <div className="theme-card__header">
                    <span className="theme-card__name">Chế Độ Nền Sáng (Light Mode)</span>
                    <span className="theme-card__radio">
                      {theme === "light" && <span className="radio-dot" />}
                    </span>
                  </div>
                  <p className="theme-card__desc">
                    Tông giấy dó truyền thống & gỗ sáng ấm áp (`#f5f2ea`). Chữ đen sắc nét, mang lại
                    cảm giác thoáng đãng, tự nhiên trong môi trường học tập nhiều ánh sáng ban ngày.
                  </p>
                  <div className="theme-card__tags">
                    <span className="theme-pill">Giấy dó truyền thống</span>
                    <span className="theme-pill">Rõ nét ban ngày</span>
                    <span className="theme-pill">Ấm áp & tinh tế</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: CÀI ĐẶT BÀN CỜ & TƯƠNG TÁC */}
          <section className="settings-card">
            <div className="settings-card__header">
              <div className="settings-card__badge">Kỳ Đạo Bàn Cờ</div>
              <h2>Hiển Thị & Tương Tác Bàn Cờ</h2>
              <p>Tùy chỉnh các ký hiệu hỗ trợ đọc thế cờ trên lưới 19x19, 13x13 và 9x9</p>
            </div>

            <div className="settings-options-list">
              <div className="setting-row">
                <div className="setting-info">
                  <h4>Hiển thị tọa độ bàn cờ (A-T, 1-19)</h4>
                  <p>In hàng chữ cái và số ở 4 cạnh bàn cờ giúp ghi chép và đọc thế cờ chuẩn quốc tế</p>
                </div>
                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={settings.showCoordinates}
                    onChange={(e) => updateSetting("showCoordinates", e.target.checked)}
                  />
                  <span className="switch-slider" />
                </label>
              </div>

              <div className="setting-row">
                <div className="setting-info">
                  <h4>Đánh số thứ tự nước đi (Move Numbers)</h4>
                  <p>Hiển thị số thứ tự trên từng quân cờ đã hạ để thuận tiện theo dõi trình tự ván đấu</p>
                </div>
                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={settings.showMoveNumbers}
                    onChange={(e) => updateSetting("showMoveNumbers", e.target.checked)}
                  />
                  <span className="switch-slider" />
                </label>
              </div>

              <div className="setting-row">
                <div className="setting-info">
                  <h4>Hiệu ứng nổi bật quân cờ vừa đánh</h4>
                  <p>Phát sáng vòng hào quang nhẹ quanh quân cờ cuối cùng đối thủ hoặc AI vừa hạ</p>
                </div>
                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={settings.highlightLastMove}
                    onChange={(e) => updateSetting("highlightLastMove", e.target.checked)}
                  />
                  <span className="switch-slider" />
                </label>
              </div>

              <div className="setting-row">
                <div className="setting-info">
                  <h4>Hiển thị gợi ý điểm đặt quân hợp lệ</h4>
                  <p>Hiện chấm tròn mờ tại các giao điểm hợp lệ khi di chuyển chuột qua bàn cờ</p>
                </div>
                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={settings.showAiHints}
                    onChange={(e) => updateSetting("showAiHints", e.target.checked)}
                  />
                  <span className="switch-slider" />
                </label>
              </div>
            </div>
          </section>

          {/* SECTION 3: ÂM THANH & HIỆU ỨNG */}
          <section className="settings-card">
            <div className="settings-card__header">
              <div className="settings-card__badge">Âm Thanh</div>
              <h2>Âm Thanh & Phản Hồi Tác Vụ</h2>
              <p>Mô phỏng chân thực tiếng cờ gõ trên mặt gỗ Kaya Nhật Bản</p>
            </div>

            <div className="settings-options-list">
              <div className="setting-row">
                <div className="setting-info">
                  <h4>Tiếng gõ quân cờ (Stone Clack)</h4>
                  <p>Phát âm thanh giòn tan chân thực khi hạ quân đen/trắng xuống bàn</p>
                </div>
                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={settings.stoneSound}
                    onChange={(e) => updateSetting("stoneSound", e.target.checked)}
                  />
                  <span className="switch-slider" />
                </label>
              </div>

              <div className="setting-row">
                <div className="setting-info">
                  <h4>Âm thanh cảnh báo Chiếu (Atari) & Bắt quân (Capture)</h4>
                  <p>Phát hiệu ứng âm thanh đặc biệt khi có đám quân nguy cấp hoặc bị tiêu diệt</p>
                </div>
                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={settings.alertSound}
                    onChange={(e) => updateSetting("alertSound", e.target.checked)}
                  />
                  <span className="switch-slider" />
                </label>
              </div>

              <div className="setting-row setting-row--slider">
                <div className="setting-info">
                  <h4>Âm lượng hiệu ứng ({settings.soundVolume}%)</h4>
                  <p>Điều chỉnh mức độ to nhỏ của toàn bộ âm thanh trong phần mềm</p>
                </div>
                <div className="slider-control-wrap">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.soundVolume}
                    onChange={(e) => updateSetting("soundVolume", Number(e.target.value))}
                    className="settings-slider"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: TRỢ LÝ HUẤN LUYỆN AI */}
          <section className="settings-card">
            <div className="settings-card__header">
              <div className="settings-card__badge">Trí Tuệ Nhân Tạo</div>
              <h2>Trọng Tài AI & Phân Tích Thế Cờ</h2>
              <p>Cấu hình thuật toán mạng nơ-ron học sâu CNN & engine đánh giá trận đấu</p>
            </div>

            <div className="settings-options-list">
              <div className="setting-row">
                <div className="setting-info">
                  <h4>Thanh Winrate thời gian thực</h4>
                  <p>Biểu diễn cán cân lực lượng và xác suất chiến thắng của Đen/Trắng trực tiếp cạnh bàn cờ</p>
                </div>
                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={settings.autoWinrate}
                    onChange={(e) => updateSetting("autoWinrate", e.target.checked)}
                  />
                  <span className="switch-slider" />
                </label>
              </div>

              <div className="setting-row">
                <div className="setting-info">
                  <h4>Báo cáo trọng tài chi tiết sau ván đấu</h4>
                  <p>Tự động tổng hợp biểu đồ diễn biến, phân loại nước đi (Thần thủ, Sai lầm, Đãng trí)</p>
                </div>
                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={settings.deepAnalysis}
                    onChange={(e) => updateSetting("deepAnalysis", e.target.checked)}
                  />
                  <span className="switch-slider" />
                </label>
              </div>

              <div className="setting-row">
                <div className="setting-info">
                  <h4>Tự động lưu kỳ phổ (.SGF)</h4>
                  <p>Lưu trữ biên bản ván đấu vào bộ nhớ thiết bị ngay khi kết thúc trận</p>
                </div>
                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={settings.autoSaveSgf}
                    onChange={(e) => updateSetting("autoSaveSgf", e.target.checked)}
                  />
                  <span className="switch-slider" />
                </label>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
