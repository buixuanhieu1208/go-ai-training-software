// src/components/About/AboutPage.tsx
// Trang Giới Thiệu Dự Án — Khóa Luận Tốt Nghiệp Đại Học Công Thương TP.HCM (HUIT) 2026
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../Home/Sidebar";
import "./AboutPage.css";

export function AboutPage() {
  const navigate = useNavigate();

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
        <div className="about-container">
          {/* 1. HERO BANNER KHÓA LUẬN */}
          <header className="about-hero">
            <div className="about-hero__badge">Khóa Luận Tốt Nghiệp Đại Học · Năm 2026</div>
            <h1 className="about-hero__title">
              HỆ THỐNG HUẤN LUYỆN & PHÂN TÍCH THẾ CỜ VÂY TÍCH HỢP TRÍ TUỆ NHÂN TẠO
            </h1>
            <p className="about-hero__subtitle">
              Ứng dụng công nghệ Trí tuệ Nhân tạo (AI Deep Learning) & Mạng Nơ-ron tích chập (CNN)
              trong hỗ trợ rèn luyện kỳ nghệ, thẩm định thế cờ và đấu trường cờ vây trực tuyến
            </p>

            <div className="about-institution-bar">
              <div className="institution-item">
                <span className="inst-label">Cơ quan chủ quản</span>
                <strong className="inst-value">Trường Đại học Công Thương TP. Hồ Chí Minh (HUIT)</strong>
              </div>
              <div className="institution-divider" />
              <div className="institution-item">
                <span className="inst-label">Đơn vị đào tạo</span>
                <strong className="inst-value">Khoa Công Nghệ Thông Tin</strong>
              </div>
              <div className="institution-divider" />
              <div className="institution-item">
                <span className="inst-label">Chuyên ngành</span>
                <strong className="inst-value">Kỹ Thuật Phần Mềm & Trí Tuệ Nhân Tạo</strong>
              </div>
            </div>
          </header>

          {/* 2. THẺ TÁC GIẢ THỰC HIỆN ĐỀ TÀI */}
          <section className="about-authors-section">
            <div className="section-title-wrap">
              <span className="section-tag">Nhóm Tác Giả</span>
              <h2>Sinh Viên Thực Hiện Đề Tài</h2>
              <p>Khoá luận tốt nghiệp niên khóa 2022 - 2026 · Khoa Công Nghệ Thông Tin HUIT</p>
            </div>

            <div className="authors-grid">
              {/* SINH VIÊN 1: HUỲNH MINH QUÂN */}
              <div className="author-card">
                <div className="author-avatar author-avatar--black">
                  <span>MQ</span>
                </div>
                <div className="author-meta">
                  <span className="author-role">Chủ nhiệm đề tài / Lập trình viên chính</span>
                  <h3 className="author-name">Huỳnh Minh Quân</h3>
                  <div className="author-details-list">
                    <div className="author-detail-row">
                      <span className="detail-key">Mã số sinh viên:</span>
                      <strong className="detail-val">2001230724</strong>
                    </div>
                    <div className="author-detail-row">
                      <span className="detail-key">Lớp danh nghĩa:</span>
                      <strong className="detail-val">14DHTH05</strong>
                    </div>
                    <div className="author-detail-row">
                      <span className="detail-key">Nhiệm vụ chính:</span>
                      <span className="detail-val">
                        Kiến trúc Frontend, AI Referee, BFS Engine, Tsumego & Đấu trường huyền thoại
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SINH VIÊN 2: BÙI XUÂN HIẾU */}
              <div className="author-card">
                <div className="author-avatar author-avatar--white">
                  <span>XH</span>
                </div>
                <div className="author-meta">
                  <span className="author-role">Đồng tác giả / Kỹ sư Hệ thống</span>
                  <h3 className="author-name">Bùi Xuân Hiếu</h3>
                  <div className="author-details-list">
                    <div className="author-detail-row">
                      <span className="detail-key">Mã số sinh viên:</span>
                      <strong className="detail-val">200123...</strong>
                    </div>
                    <div className="author-detail-row">
                      <span className="detail-key">Lớp danh nghĩa:</span>
                      <strong className="detail-val">14DHTH05</strong>
                    </div>
                    <div className="author-detail-row">
                      <span className="detail-key">Nhiệm vụ chính:</span>
                      <span className="detail-val">
                        Backend FastAPI, Huấn luyện mô hình CNN Policy Network & PvP Firestore
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. TỔNG QUAN & MỤC TIÊU NGHIÊN CỨU */}
          <section className="about-overview-card">
            <h2>Mục Tiêu & Ý Nghĩa Khoa Học Của Dự Án</h2>
            <div className="overview-paragraphs">
              <p>
                Cờ vây (Go / Weiqi / Baduk) là bộ môn thể thao trí tuệ cổ xưa có không gian trạng thái
                khổng lồ (xấp xỉ \(10^{170}\) biến thể khả dĩ), vượt xa khả năng tính toán của các
                thuật toán vét cạn truyền thống. Sự trỗi dậy của mạng nơ-ron học sâu (Deep Learning) và
                học tăng cường (Reinforcement Learning) đã mở ra kỷ nguyên mới cho cờ vây hiện đại.
              </p>
              <p>
                Đề tài khóa luận này tập trung nghiên cứu và hiện thực hóa một <strong>hệ thống phần mềm
                huấn luyện cờ vây toàn diện</strong>, tích hợp sâu trí tuệ nhân tạo để phục vụ cộng đồng
                yêu cờ vây tại Việt Nam. Không chỉ dừng lại ở một công cụ chơi cờ thông thường, hệ thống
                cung cấp các giải pháp thẩm định thế trận, tự động chấm điểm lãnh thổ, giải bài tập cờ thế
                và đặc biệt là phân tích lại các ván đấu lịch sử hào hùng thông qua hệ thống nhiệm vụ thông minh.
              </p>
            </div>
          </section>

          {/* 4. CÁC TÍNH NĂNG NÒNG CỐT CỦA DỰ ÁN */}
          <section className="about-features-section">
            <div className="section-title-wrap">
              <span className="section-tag">Module Chức Năng</span>
              <h2>Các Phân Hệ Nòng Cốt Được Hiện Thực Hóa</h2>
              <p>Toàn bộ kiến trúc và tính năng đang hoạt động trong mã nguồn của hệ thống</p>
            </div>

            <div className="features-grid">
              {/* FEATURE 1 */}
              <div className="feature-box">
                <div className="feature-icon">🧠</div>
                <h3>AI Engine & Policy Network</h3>
                <p>
                  Tích hợp mạng nơ-ron tích chập (CNN) dự đoán phân phối xác suất nước đi trên lưới
                  19x19. Backend FastAPI xử lý suy luận thời gian thực với độ trễ thấp, hỗ trợ 4 mức
                  độ kỹ năng: Dễ, Trung bình, Khó và Bậc thầy.
                </p>
                <div className="feature-badges">
                  <span>FastAPI</span>
                  <span>CNN Policy Net</span>
                  <span>4 Cấp độ</span>
                </div>
              </div>

              {/* FEATURE 2 */}
              <div className="feature-box">
                <div className="feature-icon">⚖️</div>
                <h3>Trọng Tài AI (AI Referee)</h3>
                <p>
                  Tự động đếm lãnh thổ và chấm điểm sau khi hai bên thỏa thuận dừng ván đấu theo luật
                  cờ vây quốc tế. Thuật toán chấm điểm tự động phân định chính xác mắt sống, quân chết
                  và cộng điểm đất kèm Komi 7.5.
                </p>
                <div className="feature-badges">
                  <span>Luật Nhật Bản/Trung Quốc</span>
                  <span>Komi 7.5</span>
                  <span>Đếm đất tự động</span>
                </div>
              </div>

              {/* FEATURE 3 */}
              <div className="feature-box">
                <div className="feature-icon">📊</div>
                <h3>Thẩm Định Ván Đấu & Winrate Graph</h3>
                <p>
                  Báo cáo phân tích chuyên sâu sau trận đấu, đánh giá chất lượng từng nước cờ của kỳ
                  thủ thành 5 bậc: Thần thủ (Brilliant), Nước cờ hay (Good), Thiếu chính xác (Inaccuracy),
                  Sai sót (Mistake) và Sai lầm nghiêm trọng (Blunder).
                </p>
                <div className="feature-badges">
                  <span>Winrate Graph</span>
                  <span>Phân loại 5 cấp</span>
                  <span>Xuất file SGF</span>
                </div>
              </div>

              {/* FEATURE 4 */}
              <div className="feature-box">
                <div className="feature-icon">⚔️</div>
                <h3>Đấu Trường 20 Ván Cờ Huyền Thoại</h3>
                <p>
                  Tái hiện 20 kiệt tác lịch sử (Nước cờ đỏ tai Honinbo Shusaku 1846, Thần thủ 78 Lee
                  Sedol vs AlphaGo 2016...). Ứng dụng thuật toán BFS đồ thị kiểm tra liên lạc thế lực
                  và hệ thống nhiệm vụ 3 sao độc đáo.
                </p>
                <div className="feature-badges">
                  <span>20 Ván đấu kinh điển</span>
                  <span>Thuật toán BFS</span>
                  <span>Nhiệm vụ 3 sao</span>
                </div>
              </div>

              {/* FEATURE 5 */}
              <div className="feature-box">
                <div className="feature-icon">🧩</div>
                <h3>Kho Cờ Thế Tsumego Hub</h3>
                <p>
                  Hơn 100+ bài tập cờ thế từ Nhập môn, Sơ cấp, Trung cấp đến Bậc thầy. Tích hợp bộ
                  giải mã cây biến thể SGF tương tác nhiều nhánh, phản hồi lập tức khi kỳ thủ hạ
                  nước đi chính xác hoặc mắc bẫy.
                </p>
                <div className="feature-badges">
                  <span>Cây biến thể SGF</span>
                  <span>Phân nhánh thông minh</span>
                  <span>Hơn 100+ bài tập</span>
                </div>
              </div>

              {/* FEATURE 6 */}
              <div className="feature-box">
                <div className="feature-icon">🌐</div>
                <h3>Đấu Trường Trực Tuyến PvP Online</h3>
                <p>
                  Kết nối kỳ thủ thi đấu đối kháng thời gian thực qua Google Cloud Firestore. Quản lý
                  phòng đấu (Tạo phòng, Nhập mã phòng), hệ thống kết bạn, hồ sơ cá nhân và bảng xếp
                  hạng vinh danh người chơi.
                </p>
                <div className="feature-badges">
                  <span>Cloud Firestore</span>
                  <span>Realtime Sync</span>
                  <span>Quản lý phòng đấu</span>
                </div>
              </div>
            </div>
          </section>

          {/* 5. CÔNG NGHỆ ÁP DỤNG (TECH STACK) */}
          <section className="about-tech-stack">
            <div className="section-title-wrap">
              <span className="section-tag">Công Nghệ</span>
              <h2>Ngăn Xếp Công Nghệ Thực Hiện (Tech Stack)</h2>
            </div>

            <div className="tech-stack-cards">
              <div className="tech-card">
                <h4>Giao Diện (Frontend)</h4>
                <ul>
                  <li><strong>React 19 & TypeScript</strong>: Nền tảng xây dựng component hiện đại</li>
                  <li><strong>Vite</strong>: Build tool tốc độ cao & tối ưu bundle</li>
                  <li><strong>Custom SVG Board Engine</strong>: Bàn cờ vector sắc nét, tối ưu hiệu năng</li>
                  <li><strong>Design Tokens & Theme</strong>: Hỗ trợ linh hoạt cả Nền Tối & Nền Sáng</li>
                </ul>
              </div>

              <div className="tech-card">
                <h4>Trí Tuệ Nhân Tạo & Máy Chủ (AI / Backend)</h4>
                <ul>
                  <li><strong>Python & FastAPI</strong>: Máy chủ API RESTful xử lý nước đi</li>
                  <li><strong>PyTorch & CNN</strong>: Huấn luyện và suy luận mạng nơ-ron thế cờ</li>
                  <li><strong>Go Rules Engine</strong>: Bộ luật cờ vây chuẩn quốc tế (`goRules.ts`)</li>
                  <li><strong>SGF Engine</strong>: Parser và exporter định dạng Smart Game Format</li>
                </ul>
              </div>

              <div className="tech-card">
                <h4>Lưu Trữ & Thời Gian Thực (Cloud & Realtime)</h4>
                <ul>
                  <li><strong>Google Firebase Auth</strong>: Xác thực tài khoản người dùng an toàn</li>
                  <li><strong>Cloud Firestore</strong>: Đồng bộ ván cờ trực tuyến thời gian thực</li>
                  <li><strong>Local Storage Cache</strong>: Lưu trữ offline cài đặt, lịch sử và tiến độ</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. LỜI CẢM ƠN & BẢN QUYỀN */}
          <footer className="about-footer-card">
            <h3>Lời Tri Ân & Cam Kết Bản Quyền</h3>
            <p>
              Nhóm sinh viên xin gửi lời cảm ơn chân thành và sâu sắc nhất đến Quý Thầy/Cô Khoa Công
              Nghệ Thông Tin - Trường Đại học Công Thương Thành phố Hồ Chí Minh (HUIT) đã tận tình giảng
              dạy, định hướng khoa học và tạo mọi điều kiện tốt nhất để chúng em hoàn thành khóa luận này.
            </p>
            <div className="about-footer-meta">
              <span>© 2026 Huỳnh Minh Quân & Bùi Xuân Hiếu · Khoa CNTT - ĐH Công Thương TP.HCM</span>
              <span>Phiên bản đồ án: 2.5.0-Release</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
