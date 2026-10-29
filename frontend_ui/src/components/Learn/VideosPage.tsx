// src/components/Learn/VideosPage.tsx
// Trang Video Hướng Dẫn Cờ Vây — Tuyển tập đa nguồn: Việt Nam, Hoa Kỳ, Hàn Quốc, Google DeepMind
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../Home/Sidebar";
import "./VideosPage.css";

interface GoVideo {
  id: string;
  youtubeId: string;
  title: string;
  channelName: string;
  country: "VN" | "US" | "KR" | "UK" | "GLOBAL";
  countryLabel: string;
  language: "vi" | "en";
  duration: string;
  category: "beginner" | "opening" | "tactics" | "documentary";
  categoryLabel: string;
  level: string;
  description: string;
  keyPoints: string[];
}

const GO_VIDEOS: GoVideo[] = [
  // 1. VIỆT NAM (TIẾNG VIỆT)
  {
    id: "v-vn-1",
    youtubeId: "Xh2ds5whuWs",
    title: "Học Chơi Cờ Vây #1: Hướng Dẫn Cầm Tay Chỉ Việc Cho Người Mới Bắt Đầu",
    channelName: "Vương Đánh Cờ Vây",
    country: "VN",
    countryLabel: "Việt Nam",
    language: "vi",
    duration: "15:20",
    category: "beginner",
    categoryLabel: "Nhập Môn Vỡ Lòng",
    level: "30k - 25k",
    description:
      "Bài giảng video tiếng Việt chi tiết từ những bước đi chập chững: làm quen với bàn cờ, cách cầm quân cờ đúng chuẩn, đếm số khí và quy tắc ăn quân đối phương.",
    keyPoints: [
      "Khái niệm khí và các giao điểm trên bàn cờ",
      "Quy tắc ăn quân khi đối thủ hết khí",
      "Trạng thái Chiếu (Atari) và cách nhận biết",
    ],
  },
  {
    id: "v-vn-2",
    youtubeId: "uSrZDx7JVgw",
    title: "Học Cách Chơi Cờ Vây Cơ Bản Nhất Trong 10 Phút",
    channelName: "Văn Vương IGO",
    country: "VN",
    countryLabel: "Việt Nam",
    language: "vi",
    duration: "10:15",
    category: "beginner",
    categoryLabel: "Nhập Môn Vỡ Lòng",
    level: "30k - 20k",
    description:
      "Tóm tắt cô đọng và nhanh nhất toàn bộ luật chơi cờ vây: cách chiếm đất, khoanh vùng lãnh thổ, luật ăn quân và điều kiện kết thúc một ván cờ.",
    keyPoints: [
      "Bản chất của cờ vây là khoanh đất, không phải ăn quân",
      "Cách tính điểm đất và tù binh",
      "Lưu ý cơ bản để không bị bắt nhầm quân",
    ],
  },
  {
    id: "v-vn-3",
    youtubeId: "XxCu3oa_mWA",
    title: "Bài 1: Quy Tắc Và Khí Của Quân Cờ Vây",
    channelName: "Cờ Vây Việt Nam",
    country: "VN",
    countryLabel: "Việt Nam",
    language: "vi",
    duration: "12:40",
    category: "beginner",
    categoryLabel: "Nhập Môn Vỡ Lòng",
    level: "30k - 20k",
    description:
      "Hướng dẫn chuẩn mực về khái niệm khí: quân ở góc (2 khí), quân ở biên (3 khí), quân ở trung tâm (4 khí) và cách nối quân để tăng khí sinh mệnh.",
    keyPoints: [
      "Định nghĩa khí qua các đường kẻ thẳng",
      "Khí ở góc, biên và trung tâm",
      "Kỹ thuật kết nối để bảo vệ đám quân",
    ],
  },
  {
    id: "v-vn-4",
    youtubeId: "fs-2BoNi6WM",
    title: "Bài 6: Nhận Biết Mắt Thật, Mắt Giả & Đám Quân Sống Bất Tử",
    channelName: "Cờ Vây Việt Nam",
    country: "VN",
    countryLabel: "Việt Nam",
    language: "vi",
    duration: "16:15",
    category: "tactics",
    categoryLabel: "Sống Chết & Mắt",
    level: "20k - 15k",
    description:
      "Giải thích nền tảng sinh tồn tối quan trọng trong cờ vây: tại sao đám quân phải có 2 mắt độc lập mới sống được, và cách phân biệt mắt thật với mắt giả.",
    keyPoints: [
      "Quy luật vàng: Hai mắt là sống, một mắt là chết",
      "Cấu tạo mắt thật và các điểm then chốt",
      "Kỹ thuật phá mắt giả của đối thủ",
    ],
  },
  {
    id: "v-vn-5",
    youtubeId: "41l-0AqpDPM",
    title: "Đại Chiến Đỉnh Cao: Kiện Tướng Tuệ Trần vs Phạm Anh (Rating #1 VN)",
    channelName: "Cờ Vây Academy (Trần Quang Tuệ 5D)",
    country: "VN",
    countryLabel: "Việt Nam",
    language: "vi",
    duration: "25:30",
    category: "tactics",
    categoryLabel: "Kỳ Thủ Đỉnh Cao",
    level: "5k - 5D",
    description:
      "Trần Quang Tuệ (vô địch quốc gia nhiều lần) phân tích trận đấu đỉnh cao với kỳ thủ số 1 Việt Nam. Bình luận chiến thuật trung bàn và các đòn công thủ sắc bén.",
    keyPoints: [
      "Khai cuộc và chiếm các điểm chiến lược",
      "Chiến thuật phân cắt và tấn công trung bàn",
      "Kỹ thuật siết quan triệt tàn cuộc khốc liệt",
    ],
  },

  // 2. HOA KỲ & QUỐC TẾ (TIẾNG ANH)
  {
    id: "v-us-1",
    youtubeId: "xMshtO8h7RU",
    title: "Learn To Play Go! A Guide for Beginners (Đồ Họa Hoạt Họa 2D Đẹp Nhất)",
    channelName: "In Sente",
    country: "US",
    countryLabel: "Hoa Kỳ",
    language: "en",
    duration: "13:58",
    category: "beginner",
    categoryLabel: "Nhập Môn Quốc Tế",
    level: "30k - 20k",
    description:
      "Bộ video hoạt họa 2D nổi tiếng thế giới của kênh In Sente (Hoa Kỳ), minh họa cực kỳ trực quan và sinh động toàn bộ hệ thống luật cờ vây, hai mắt và thế cướp Ko.",
    keyPoints: [
      "Đồ họa hoạt họa trực quan từng nước đi",
      "Giải thích dễ hiểu về luật cấm lặp (Ko Rule)",
      "Phong cách sư phạm nhẹ nhàng, chuẩn mực",
    ],
  },
  {
    id: "v-global-1",
    youtubeId: "oZTdT8MQexk",
    title: "How to Play Go: Rules Explained (Go Game, Baduk, Weiqi)",
    channelName: "GoMagic",
    country: "GLOBAL",
    countryLabel: "Quốc Tế",
    language: "en",
    duration: "11:45",
    category: "beginner",
    categoryLabel: "Nhập Môn Quốc Tế",
    level: "30k - 20k",
    description:
      "GoMagic tổng hợp cách chơi cờ vây bằng phong cách hiện đại với visual effects sắc nét, giải thích từ bàn cờ nhỏ 9x9 nâng dần lên 13x13 và 19x19.",
    keyPoints: [
      "Khởi đầu với bàn cờ 9x9 dễ tiếp cận",
      "Quy tắc bao vây và bắt quân",
      "Cách tính điểm đất theo chuẩn hiện đại",
    ],
  },
  {
    id: "v-us-2",
    youtubeId: "FtPtonZGnJY",
    title: "Nick Sibicky Go Lecture #47: Fighting 101 — Nghệ Thuật Giao Chiến",
    channelName: "Nick Sibicky (Seattle Go Center)",
    country: "US",
    countryLabel: "Hoa Kỳ",
    language: "en",
    duration: "48:12",
    category: "tactics",
    categoryLabel: "Chiến Thuật & Giao Chiến",
    level: "15k - 5k",
    description:
      "Bài giảng kinh điển của Nick Sibicky tại trung tâm cờ vây Seattle Go Center. Hướng dẫn cách tư duy khi giao chiến giáp lá cà, tránh ham ăn quân mà mất đất.",
    keyPoints: [
      "Nguyên tắc không chạy quân nặng",
      "Cách hy sinh quân để xây dựng thế lực ngoài",
      "Tấn công để tạo đất chứ không phải để giết",
    ],
  },
  {
    id: "v-us-3",
    youtubeId: "OKHwXMGNz8s",
    title: "Revisiting AlphaGo vs Lee Sedol, Game 4 — Phân Tích Thần Thủ 78",
    channelName: "Michael Redmond 9-Dan Pro & AGA",
    country: "US",
    countryLabel: "Nhật Bản / Mỹ",
    language: "en",
    duration: "34:20",
    category: "documentary",
    categoryLabel: "Chuyên Gia 9-Dan",
    level: "Mọi Cấp Độ",
    description:
      "Kỳ thủ chuyên nghiệp 9 đẳng phương Tây duy nhất tại Viện Cờ Nhật Bản Michael Redmond phân tích sâu nước cờ xuyên khe 78 của Lee Sedol khiến AI bối rối.",
    keyPoints: [
      "Bối cảnh ván 4 khi Lee Sedol đã bị dẫn 0-3",
      "Thần thủ 78: Nước cờ một trong triệu khả năng",
      "Phản ứng của mạng nơ-ron AlphaGo sau nước 78",
    ],
  },

  // 3. HÀN QUỐC (TIẾNG ANH & HÀN)
  {
    id: "v-kr-1",
    youtubeId: "k_kpXpxHfrQ",
    title: "How To Fight in Middle Game? Bí Quyết Trung Bàn Từ Chuyên Nghiệp",
    channelName: "Baduk Doctor (Kim Seong-ryong 9P)",
    country: "KR",
    countryLabel: "Hàn Quốc",
    language: "en",
    duration: "18:40",
    category: "tactics",
    categoryLabel: "Kỳ Thủ Hàn Quốc",
    level: "10k - 1D",
    description:
      "Kỳ thủ chuyên nghiệp Hàn Quốc chia sẻ các mẹo chiến đấu trong trung bàn, cách đọc cờ nhiều nước và tránh các bẫy phản công nguy hiểm của đối phương.",
    keyPoints: [
      "Kỹ thuật đọc trước 3-5 nước đi",
      "Đánh vào điểm yếu của hình cờ đối phương",
      "Tư duy thực chiến của các Pro Hàn Quốc",
    ],
  },

  // 4. GOOGLE DEEPMIND (ANH QUỐC)
  {
    id: "v-uk-1",
    youtubeId: "WXuK6gekU1Y",
    title: "AlphaGo — The Movie | Bộ Phim Tài Liệu Đạt Giải Của Google DeepMind",
    channelName: "Google DeepMind (Phụ Đề Tiếng Việt)",
    country: "UK",
    countryLabel: "Google DeepMind",
    language: "en",
    duration: "1:30:28",
    category: "documentary",
    categoryLabel: "Phim Tư Liệu & AI",
    level: "Mọi Cấp Độ",
    description:
      "Toàn bộ bộ phim tài liệu kinh điển ghi lại cuộc chạm trán lịch sử giữa trí tuệ nhân tạo AlphaGo và huyền thoại cờ vây thế giới Lee Sedol năm 2016.",
    keyPoints: [
      "Hành trình phát triển mạng nơ-ron học sâu của DeepMind",
      "Diễn biến 5 ván đấu nghẹt thở với Lee Sedol",
      "Thần thủ 78 — nước cờ kỳ tích của trí tuệ con người",
    ],
  },
];

type CategoryFilter = "all" | "beginner" | "opening" | "tactics" | "documentary";
type SourceFilter = "all" | "vn" | "intl";

export function VideosPage() {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<GoVideo>(GO_VIDEOS[0]);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");

  const filteredVideos = useMemo(() => {
    return GO_VIDEOS.filter((v) => {
      const matchCat = categoryFilter === "all" || v.category === categoryFilter;
      const matchSource =
        sourceFilter === "all" ||
        (sourceFilter === "vn" && v.language === "vi") ||
        (sourceFilter === "intl" && v.language === "en");
      return matchCat && matchSource;
    });
  }, [categoryFilter, sourceFilter]);

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
        <div className="videos-container">
          {/* HEADER */}
          <header className="videos-header">
            <div className="videos-title-row">
              <div className="videos-title-group">
                <span className="videos-badge">Thư Viện Đa Nguồn Quốc Tế & Việt Nam</span>
                <h1>VIDEO BÀI GIẢNG CỜ VÂY</h1>
                <p>
                  Tuyển chọn từ các nguồn uy tín: Vương Đánh Cờ Vây, Cờ Vây Academy, In Sente (Mỹ),
                  Michael Redmond 9-Dan, Baduk Doctor (Hàn Quốc) và Google DeepMind
                </p>
              </div>

              {/* NGUỒN PHÁT: BỘ LỌC QUỐC GIA / NGÔN NGỮ */}
              <div className="videos-source-filter">
                <button
                  type="button"
                  className={`source-btn ${sourceFilter === "all" ? "source-btn--active" : ""}`}
                  onClick={() => setSourceFilter("all")}
                >
                  Tất cả ({GO_VIDEOS.length})
                </button>
                <button
                  type="button"
                  className={`source-btn ${sourceFilter === "vn" ? "source-btn--active" : ""}`}
                  onClick={() => setSourceFilter("vn")}
                >
                  Tiếng Việt (5)
                </button>
                <button
                  type="button"
                  className={`source-btn ${sourceFilter === "intl" ? "source-btn--active" : ""}`}
                  onClick={() => setSourceFilter("intl")}
                >
                  Quốc Tế / Tiếng Anh (6)
                </button>
              </div>
            </div>

            {/* BỘ LỌC CHỦ ĐỀ */}
            <div className="videos-tabs">
              <button
                type="button"
                className={`video-tab-btn ${categoryFilter === "all" ? "video-tab-btn--active" : ""}`}
                onClick={() => setCategoryFilter("all")}
              >
                Tất cả chủ đề
              </button>
              <button
                type="button"
                className={`video-tab-btn ${categoryFilter === "beginner" ? "video-tab-btn--active" : ""}`}
                onClick={() => setCategoryFilter("beginner")}
              >
                Nhập Môn Vỡ Lòng
              </button>
              <button
                type="button"
                className={`video-tab-btn ${categoryFilter === "opening" ? "video-tab-btn--active" : ""}`}
                onClick={() => setCategoryFilter("opening")}
              >
                Khai Cuộc & Định Thức
              </button>
              <button
                type="button"
                className={`video-tab-btn ${categoryFilter === "tactics" ? "video-tab-btn--active" : ""}`}
                onClick={() => setCategoryFilter("tactics")}
              >
                Trung Bàn & Giao Chiến
              </button>
              <button
                type="button"
                className={`video-tab-btn ${categoryFilter === "documentary" ? "video-tab-btn--active" : ""}`}
                onClick={() => setCategoryFilter("documentary")}
              >
                Tư Liệu & AI
              </button>
            </div>
          </header>

          <div className="videos-main-layout">
            {/* CỘT TRÁI: KHUNG PHÁT VIDEO CHÍNH */}
            <main className="video-player-column">
              <div className="video-screen-card">
                {/* 16:9 Responsive Player Frame với đầy đủ cấu hình nhúng của YouTube */}
                <div className="video-player-wrapper">
                  <iframe
                    key={selectedVideo.youtubeId}
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="video-player-iframe"
                  />
                </div>

                {/* Thông tin bài giảng đang phát */}
                <div className="video-info-panel">
                  <div className="video-info-header">
                    <div className="video-info-meta-row">
                      <span className="video-country-pill">
                        {selectedVideo.countryLabel}
                      </span>
                      <span className="video-category-pill">{selectedVideo.categoryLabel}</span>
                      <span className="video-level-pill">Trình độ: {selectedVideo.level}</span>
                      <span className="video-duration-pill">Thời lượng: {selectedVideo.duration}</span>
                    </div>

                    <h2 className="current-video-title">{selectedVideo.title}</h2>
                    <div className="video-channel-row">
                      <span className="channel-avatar">✦</span>
                      <span className="channel-name">{selectedVideo.channelName}</span>
                    </div>
                  </div>

                  <p className="video-description-text">{selectedVideo.description}</p>

                  <div className="video-keypoints-box">
                    <h4>Nội Dung Trọng Tâm Bài Học:</h4>
                    <ul>
                      {selectedVideo.keyPoints.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Nút hành động & Link gốc trên YouTube */}
                  <div className="video-external-actions">
                    <a
                      href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-youtube-link"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>Xem trên YouTube (Trang gốc) ↗</span>
                    </a>

                    <button
                      type="button"
                      className="btn-practice-game"
                      onClick={() => navigate("/learn/courses")}
                    >
                      Đọc giáo trình lý thuyết 5 bài
                    </button>
                  </div>
                </div>
              </div>
            </main>

            {/* CỘT PHẢI: DANH SÁCH BÀI GIẢNG TUYỂN CHỌN */}
            <aside className="video-playlist-column">
              <div className="playlist-header">
                <h3>Danh Sách Bài Giảng ({filteredVideos.length})</h3>
                <span className="playlist-hint">Bấm vào bất kỳ bài nào để phát ngay</span>
              </div>

              <div className="playlist-cards-list">
                {filteredVideos.map((video) => {
                  const isPlaying = video.id === selectedVideo.id;
                  return (
                    <div
                      key={video.id}
                      className={`playlist-card ${isPlaying ? "playlist-card--active" : ""}`}
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div className="playlist-card-thumb-wrap">
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                          alt={video.title}
                          className="playlist-card-thumb"
                          loading="lazy"
                        />
                        <span className="playlist-thumb-duration">{video.duration}</span>
                        {isPlaying && <div className="playlist-playing-indicator">Đang phát</div>}
                      </div>

                      <div className="playlist-card-content">
                        <div className="playlist-card-tags-row">
                          <span className="playlist-card-country">{video.countryLabel}</span>
                          <span className="playlist-card-category">{video.categoryLabel}</span>
                        </div>
                        <h4 className="playlist-card-title">{video.title}</h4>
                        <div className="playlist-card-meta">
                          <span className="playlist-card-channel">{video.channelName}</span>
                          <span>·</span>
                          <span className="playlist-card-level">{video.level}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
