// src/components/Learn/CoursesPage.tsx
// Trang Khóa Học Cờ Vây Cơ Bản — Dành cho người mới nhập môn
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../Home/Sidebar";
import "./CoursesPage.css";

interface Lesson {
  id: number;
  romanId: string;
  title: string;
  shortDesc: string;
  duration: string;
  level: string;
  sections: {
    heading: string;
    content: string[];
    diagramNote?: string;
    boardDiagram?: {
      black: [number, number][];
      white: [number, number][];
      markers?: { pos: [number, number]; label: string; type: "liberty" | "atari" | "eye" }[];
    };
  }[];
  keyRules: string[];
  practiceHint: string;
}

const LESSONS: Lesson[] = [
  {
    id: 1,
    romanId: "I",
    title: "Bàn Cờ & Khí Của Quân (Liberties)",
    shortDesc: "Làm quen với lưới 19x19, các giao điểm và hơi thở sinh mệnh của quân cờ.",
    duration: "10 phút",
    level: "Vỡ lòng",
    sections: [
      {
        heading: "1. Bàn cờ và các giao điểm",
        content: [
          "Bàn cờ vây tiêu chuẩn gồm 19 đường dọc và 19 đường ngang giao nhau tạo thành 361 giao điểm. Người mới tập chơi thường bắt đầu với bàn nhỏ 9x9 hoặc 13x13 để nắm vững quy tắc cơ bản.",
          "Quân cờ được hạ trực tiếp lên các giao điểm (chứ không nằm trong ô vuông như cờ vua). Một khi đã hạ xuống bàn, quân cờ không được phép dịch chuyển, trừ khi bị đối phương bắt đi.",
        ],
      },
      {
        heading: "2. Khí là gì? (Sinh mệnh của quân cờ)",
        content: [
          "Khí (Liberties) là các giao điểm trống liền kề trực tiếp theo 4 hướng: trên, dưới, trái, phải của quân cờ (không tính đường chéo).",
          "Quân ở giữa bàn cờ có tối đa 4 khí.",
          "Quân ở cạnh biên chỉ có 3 khí.",
          "Quân ở góc bàn cờ chỉ có 2 khí.",
        ],
        diagramNote: "Sơ đồ minh họa: Quân đen đơn độc tại trung tâm có 4 khí liền kề bao quanh.",
        boardDiagram: {
          black: [[2, 2]],
          white: [],
          markers: [
            { pos: [1, 2], label: "1", type: "liberty" },
            { pos: [3, 2], label: "2", type: "liberty" },
            { pos: [2, 1], label: "3", type: "liberty" },
            { pos: [2, 3], label: "4", type: "liberty" },
          ],
        },
      },
      {
        heading: "3. Nối quân và tăng thêm khí",
        content: [
          "Khi hai hoặc nhiều quân cùng màu nằm liền kề nhau theo đường dọc hoặc ngang, chúng tự động kết nối thành một khối (đám quân) và chia sẻ chung tất cả các khí.",
          "Càng kết nối nhiều quân, khối cờ càng vững chắc và khó bị bắt hơn.",
        ],
      },
    ],
    keyRules: [
      "Quân cờ hạ tại giao điểm, không di chuyển.",
      "Chỉ đường thẳng trực tiếp (dọc/ngang) mới tạo thành khí, đường chéo không phải là khí.",
      "Khi toàn bộ khí của một đám quân bị đối phương bịt kín, đám quân đó lập tức bị nhấc ra khỏi bàn.",
    ],
    practiceHint: "Luyện bài tập bắt quân nhập môn trong mục Luyện Tsumego để thuần thục cách đếm khí.",
  },
  {
    id: 2,
    romanId: "II",
    title: "Thế Chiếu (Atari) & Các Đòn Bắt Quân",
    shortDesc: "Hiểu trạng thái nguy cấp và 3 đòn bắt quân kinh điển: Shicho, Geta và Uttekaae.",
    duration: "15 phút",
    level: "Cơ bản",
    sections: [
      {
        heading: "1. Trạng thái Chiếu (Atari)",
        content: [
          "Khi một đám quân chỉ còn duy nhất 1 khí cuối cùng, trạng thái đó gọi là 'Atari' (tương tự như Chiếu tướng trong cờ vua).",
          "Nếu bên bị chiếu không kịp thời nối quân chạy trốn, đối thủ chỉ cần đặt thêm 1 quân vào khí còn lại là sẽ ăn trọn đám quân đó.",
        ],
        diagramNote: "Quân đen bị 3 quân trắng vây, chỉ còn 1 khí duy nhất ở phía dưới (Đang bị Atari).",
        boardDiagram: {
          black: [[2, 2]],
          white: [
            [1, 2],
            [3, 2],
            [2, 1],
          ],
          markers: [{ pos: [2, 3], label: "!", type: "atari" }],
        },
      },
      {
        heading: "2. Thế Shicho (Cầu thang ziczac / Bắt đuổi)",
        content: [
          "Một trong những đòn bắt quân đẹp mắt nhất: Bên tấn công liên tục chiếu quân đối phương theo đường dích dắc hình bậc thang về phía biên bàn cờ.",
          "Nếu trên đường cầu thang không có quân tiếp viện của bên bị đuổi, đám quân đó chắc chắn sẽ bị tiêu diệt.",
        ],
      },
      {
        heading: "3. Thế Geta (Bẫy lưới) & Uttekaae (Hồi sinh bắt ngược)",
        content: [
          "Thế Geta: Không cần chiếu trực tiếp mà giăng một chiếc lưới bao quanh từ xa, khiến đối phương vừa bước đi là tự rơi vào thế chết.",
          "Đòn Uttekaae: Hy sinh 1 quân cờ vào miệng cọp đối phương để đổi lại việc bắt gọn cả khối quân lớn của địch ở nước tiếp theo.",
        ],
      },
    ],
    keyRules: [
      "Luôn quan sát xem quân mình có đang rơi vào thế Atari hay không trước khi tấn công.",
      "Cẩn trọng đọc đường cầu thang Shicho đến tận góc bàn cờ trước khi quyết định đuổi quân.",
    ],
    practiceHint: "Tập nhận biết các bẫy Geta và Uttekaae để không mắc sai lầm sơ đẳng trong trung bàn.",
  },
  {
    id: 3,
    romanId: "III",
    title: "Sinh Tử — Mắt Thật, Mắt Giả & Đám Quân Sống",
    shortDesc: "Nền tảng sinh tồn tối thượng: Bí mật đằng sau định lý 'Hai mắt là sống vô điều kiện'.",
    duration: "20 phút",
    level: "Quan trọng",
    sections: [
      {
        heading: "1. Định lý Hai Mắt (Two Eyes)",
        content: [
          "Trong cờ vây, đối phương không được phép đặt quân vào nơi không có khí (nước đi tự sát), TRỪ KHI nước đi đó trực tiếp ăn quân của ta.",
          "Do đó, nếu một đám quân tạo ra được 2 khoảng trống độc lập (gọi là 2 mắt riêng biệt), đối thủ sẽ không bao giờ có thể ăn được, vì họ không thể hạ quân vào 2 mắt cùng một lúc!",
          "Một đám quân có 2 mắt thật được coi là 'Sống vô điều kiện' (Alive).",
        ],
        diagramNote: "Đám quân đen bao quanh 2 khoảng trống độc lập, tạo thành 2 mắt bất khả xâm phạm.",
        boardDiagram: {
          black: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
            [2, 3],
            [3, 1],
            [3, 2],
            [3, 3],
            [2, 2],
          ],
          white: [],
          markers: [
            { pos: [1, 2], label: "M1", type: "eye" },
            { pos: [3, 2], label: "M2", type: "eye" },
          ],
        },
      },
      {
        heading: "2. Mắt thật và Mắt giả (False Eye)",
        content: [
          "Mắt thật: Các góc bảo vệ mắt đều thuộc quyền kiểm soát của ta, đối phương không thể phá vỡ.",
          "Mắt giả: Nhìn bề ngoài giống một mắt, nhưng các quân bao quanh bị khiếm khuyết. Khi bị đối thủ siết khí, ta buộc phải tự lấp mắt mình hoặc bị bắt.",
        ],
      },
    ],
    keyRules: [
      "Một đám quân dù lớn đến đâu, nếu chỉ có 1 mắt thì vẫn là đám quân chết (nếu bị bao vây chặt).",
      "Quy tắc vàng: 'Hai mắt là sống, một mắt là chết'.",
    ],
    practiceHint: "Hãy làm các bài tập Tsumego chuyên về nhận diện Mắt Thật / Mắt Giả.",
  },
  {
    id: 4,
    romanId: "IV",
    title: "Quy Tắc Tranh Chấp Cướp (Luật Ko)",
    shortDesc: "Quy tắc ngăn chặn vòng lặp vĩnh cửu và nghệ thuật tìm đòn dọa cướp (Ko Threats).",
    duration: "15 phút",
    level: "Trung cấp",
    sections: [
      {
        heading: "1. Khái niệm 'Ko' (Kiếp / Vòng lặp)",
        content: [
          "Khi hai quân cờ ở vị trí có thể ăn qua ăn lại lẫn nhau vô tận, tình huống này gọi là 'Ko' (nghĩa là vĩnh hằng trong tiếng Nhật).",
          "Luật Ko quy định: Khi bên A vừa bắt 1 quân tạo thành thế Ko, bên B TUYỆT ĐỐI KHÔNG ĐƯỢC bắt lại ngay lập tức ở nước tiếp theo.",
        ],
      },
      {
        heading: "2. Nghệ thuật Dọa Cướp (Ko Threat)",
        content: [
          "Để giành lại đám quân trong thế Ko, bên B phải đánh một nước ở vị trí khác đe dọa sinh mệnh một đám quân lớn của bên A (nước dọa cướp).",
          "Nếu bên A bỏ qua để kết thúc vụ cướp, bên B sẽ ăn đám quân bị đe dọa. Nếu bên A cứu quân, bên B mới được quyền quay lại bắt lại quân cờ trong thế Ko ban đầu.",
        ],
      },
    ],
    keyRules: [
      "Không bao giờ được ăn lại ngay sau khi đối phương vừa bắt cướp.",
      "Tìm nước dọa cướp có giá trị lớn hơn đám quân đang tranh chấp.",
    ],
    practiceHint: "Nắm vững luật Ko để không bị phạm quy trong các trận đấu PvP Online.",
  },
  {
    id: 5,
    romanId: "V",
    title: "Phân Chia Lãnh Thổ & Đếm Điểm Tàn Cuộc",
    shortDesc: "Mục đích tối hậu của cờ vây: Chiếm đất, giữ đất, bù điểm Komi và cách xác định người thắng.",
    duration: "15 phút",
    level: "Tổng kết",
    sections: [
      {
        heading: "1. Đất (Lãnh thổ) là gì?",
        content: [
          "Mục tiêu cốt lõi của cờ vây là khoanh vùng và kiểm soát lãnh thổ trống trên bàn cờ, không phải là tìm cách ăn thật nhiều quân.",
          "Mỗi giao điểm trống được quân của bạn bao bọc an toàn tuyệt đối sẽ được tính là 1 điểm đất (Mok).",
          "Châm ngôn cờ vây cổ xưa: 'Kim Góc, Bạc Biên, Cỏ Rác Trung Tâm' — Góc dễ vây đất nhất, tiếp theo là biên, và khó vây đất nhất là khu trung tâm.",
        ],
      },
      {
        heading: "2. Điểm bù Komi & Kết thúc trận đấu",
        content: [
          "Vì bên Đen luôn được quyền đi trước (chiếm ưu thế chủ động ban đầu), nên theo luật quốc tế hiện đại, bên Trắng sẽ được cộng thêm 7.5 điểm bù (Komi).",
          "Số lẻ 0.5 điểm giúp ván cờ vây không bao giờ có kết quả hòa.",
          "Khi cả hai kỳ thủ đều thấy không còn vùng đất nào để tranh chấp, cả hai cùng bấm 'Bỏ lượt' (Pass) liên tiếp để kết thúc ván và chuyển sang chế độ AI Referee đếm đất.",
        ],
      },
    ],
    keyRules: [
      "Đen đi trước, Trắng được hưởng 7.5 điểm Komi bù lượt.",
      "Tổng điểm = Lãnh thổ chiếm được + Tù binh đối phương bị bắt + Điểm Komi.",
    ],
    practiceHint: "Hãy thử sức ngay một ván đấu với AI mức Dễ (PvE) để tự mình cảm nhận cách đếm đất kết thúc ván!",
  },
];

export function CoursesPage() {
  const navigate = useNavigate();
  const [activeLessonId, setActiveLessonId] = useState<number>(1);

  const currentLesson = LESSONS.find((l) => l.id === activeLessonId) || LESSONS[0];

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
        <div className="courses-container">
          {/* HEADER */}
          <header className="courses-header">
            <div className="courses-title-group">
              <span className="courses-badge">Giáo Trình Nhập Môn Cờ Vây</span>
              <h1>KHÓA HỌC CỜ VÂY CƠ BẢN</h1>
              <p>Lộ trình 5 bài học tương tác chuẩn mực từ vỡ lòng đến thành thạo luật chơi</p>
            </div>

            <div className="courses-progress-box">
              <span className="progress-label">Tiến trình học</span>
              <strong className="progress-value">Bài {activeLessonId} / {LESSONS.length}</strong>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(activeLessonId / LESSONS.length) * 100}%` }}
                />
              </div>
            </div>
          </header>

          <div className="courses-layout">
            {/* CỘT TRÁI: DANH SÁCH BÀI HỌC (NAVIGATION LIST) */}
            <aside className="courses-sidebar-nav">
              <h3 className="nav-title">Chương Trình Học</h3>
              <div className="lessons-nav-list">
                {LESSONS.map((lesson) => {
                  const isActive = lesson.id === activeLessonId;
                  return (
                    <button
                      key={lesson.id}
                      type="button"
                      className={`lesson-nav-item ${isActive ? "lesson-nav-item--active" : ""}`}
                      onClick={() => setActiveLessonId(lesson.id)}
                    >
                      <div className="lesson-nav-roman">{lesson.romanId}</div>
                      <div className="lesson-nav-text">
                        <span className="lesson-nav-title">{lesson.title}</span>
                        <div className="lesson-nav-meta">
                          <span>{lesson.duration}</span>
                          <span>·</span>
                          <span className="lesson-level-tag">{lesson.level}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="courses-support-card">
                <h4>Cần Thực Hành?</h4>
                <p>Sau khi học lý thuyết, hãy giải bài tập cờ thế để ghi nhớ sâu các thế cờ.</p>
                <button
                  type="button"
                  className="btn-practice"
                  onClick={() => navigate("/tsumego")}
                >
                  Kho Luyện Tsumego ↗
                </button>
              </div>
            </aside>

            {/* CỘT PHẢI: NỘI DUNG CHI TIẾT BÀI HỌC */}
            <main className="courses-main-content">
              <article className="lesson-article">
                <div className="lesson-article-header">
                  <div className="lesson-badge-row">
                    <span className="lesson-pill">Bài {currentLesson.romanId}</span>
                    <span className="lesson-duration">Thời lượng: {currentLesson.duration}</span>
                    <span className="lesson-level-badge">{currentLesson.level}</span>
                  </div>
                  <h2>{currentLesson.title}</h2>
                  <p className="lesson-lead">{currentLesson.shortDesc}</p>
                </div>

                {/* CÁC PHẦN NỘI DUNG */}
                <div className="lesson-sections-list">
                  {currentLesson.sections.map((sec, idx) => (
                    <section key={idx} className="lesson-section-block">
                      <h3>{sec.heading}</h3>
                      {sec.content.map((pText, pIdx) => (
                        <p key={pIdx}>{pText}</p>
                      ))}

                      {/* Sơ đồ bàn cờ minh họa (nếu có) */}
                      {sec.boardDiagram && (
                        <div className="diagram-board-box">
                          <div className="diagram-board-grid">
                            {[0, 1, 2, 3, 4].map((r) =>
                              [0, 1, 2, 3, 4].map((c) => {
                                const isBlack = sec.boardDiagram?.black.some(
                                  ([br, bc]) => br === r && bc === c
                                );
                                const isWhite = sec.boardDiagram?.white.some(
                                  ([wr, wc]) => wr === r && wc === c
                                );
                                const marker = sec.boardDiagram?.markers?.find(
                                  (m) => m.pos[0] === r && m.pos[1] === c
                                );

                                return (
                                  <div key={`${r}-${c}`} className="diagram-cell">
                                    <div className="cell-line-h" />
                                    <div className="cell-line-v" />
                                    {isBlack && <div className="mini-stone mini-stone--black" />}
                                    {isWhite && <div className="mini-stone mini-stone--white" />}
                                    {marker && (
                                      <div
                                        className={`mini-marker mini-marker--${marker.type}`}
                                      >
                                        {marker.label}
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            )}
                          </div>
                          {sec.diagramNote && (
                            <div className="diagram-board-caption">
                              <span>✦ {sec.diagramNote}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </section>
                  ))}
                </div>

                {/* ĐIỀU THEN CHỐT CẦN NHỚ */}
                <div className="lesson-rules-summary">
                  <h4>Quy Tắc Then Chốt Cần Ghi Nhớ</h4>
                  <ul>
                    {currentLesson.keyRules.map((rule, rIdx) => (
                      <li key={rIdx}>{rule}</li>
                    ))}
                  </ul>
                </div>

                {/* ĐIỀU HƯỚNG BÀI TRƯỚC / BÀI SAU */}
                <div className="lesson-nav-actions">
                  <button
                    type="button"
                    className="lesson-btn lesson-btn--prev"
                    disabled={activeLessonId === 1}
                    onClick={() => setActiveLessonId((prev) => Math.max(1, prev - 1))}
                  >
                    ← Bài trước
                  </button>

                  <div className="lesson-nav-hint">
                    <span>{currentLesson.practiceHint}</span>
                  </div>

                  {activeLessonId < LESSONS.length ? (
                    <button
                      type="button"
                      className="lesson-btn lesson-btn--next"
                      onClick={() =>
                        setActiveLessonId((prev) => Math.min(LESSONS.length, prev + 1))
                      }
                    >
                      Bài tiếp theo →
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="lesson-btn lesson-btn--finish"
                      onClick={() => navigate("/pve")}
                    >
                      Bắt đầu thi đấu với AI ↗
                    </button>
                  )}
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
