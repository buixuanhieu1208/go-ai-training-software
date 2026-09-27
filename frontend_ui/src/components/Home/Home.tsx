// src/components/Home/Home.tsx
// Trang chủ — điều hướng chính giờ nằm ở Sidebar cố định bên trái (kiểu
// chess.com) thay cho header ngang trước đây. Phần nội dung chỉ còn vai trò
// giới thiệu/marketing (hero, tính năng, xem trước Tsumego, footer) — không
// còn tự chọn chế độ chơi ở đây nữa, việc đó đã chuyển hết vào Sidebar.

import { useMemo } from "react";
import { Board } from "../Board/Board";
import { HeroBoardDemo } from "./HeroBoardDemo";
import { Sidebar } from "./Sidebar";
import { MOCK_TSUMEGO_PUZZLES } from "../Tsumego/mockTsumegoData";
import { parseSgf, buildBoardAtMove } from "../../utils/sgfParser";
import { IconGrid, IconScale, IconSpark, IconStar } from "./icons";
import type { GameMode } from "../../types/mode";
import "./Home.css";

export interface HomeProps {
  onSelectMode: (mode: GameMode) => void;
  onGoOnline: () => void;
  onOpenRules: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

const FEATURES: { icon: React.ReactNode; title: string; description: string }[] = [
  {
    icon: <IconStar />,
    title: "AI gợi ý nước đi tối ưu",
    description:
      "Nước đi tốt nhất do Policy Network đề xuất được đánh dấu riêng bằng vòng sáng ★ ngay trên bàn cờ.",
  },
  {
    icon: <IconGrid />,
    title: "Luyện Tsumego có chấm điểm",
    description:
      "Giải thế cờ sống-chết, hệ thống tự đối chiếu với lời giải trong file SGF và báo Đúng/Sai ngay lập tức.",
  },
  {
    icon: <IconSpark />,
    title: "Hiệu ứng trực quan sống động",
    description:
      "Điểm bắt quân nổi lên tại đúng vị trí, thông báo Combo khi bắt liên tiếp — luyện tập trực quan, dễ theo dõi.",
  },
  {
    icon: <IconScale />,
    title: "Chuẩn luật Trung Quốc",
    description:
      "Tính điểm theo diện tích (quân + lãnh thổ), Komi 7.5, đầy đủ luật khí — bắt quân — Kiếp như thi đấu thật.",
  },
];

export function Home({ onSelectMode, onGoOnline, onOpenRules, onOpenLogin, onOpenRegister }: HomeProps) {
  const teaserPuzzle = MOCK_TSUMEGO_PUZZLES[0];
  const teaserBoard = useMemo(() => {
    const parsed = parseSgf(teaserPuzzle.sgf);
    return { board: buildBoardAtMove(parsed, 0), size: parsed.metadata.boardSize };
  }, [teaserPuzzle.sgf]);

  return (
    <div className="home-shell">
      <Sidebar
        onSelectMode={onSelectMode}
        onGoOnline={onGoOnline}
        onOpenRules={onOpenRules}
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
      />

      <div className="home-content">
        <header className="home-hero">
          <div className="home-hero__text">
            <span className="home-hero__eyebrow home-anim home-anim--1">Huấn luyện viên ảo AI · Cờ vây</span>
            <h1 className="home-hero__title home-anim home-anim--2">
              Luyện cờ vây cùng <span className="home-hero__title-accent">AI</span>, theo thời gian thực.
            </h1>
            <p className="home-hero__subtitle home-anim home-anim--3">
              Chơi PvP cùng bạn bè, đấu với AI, xem hai AI tự đối luyện, hoặc giải các thế Tsumego —
              tất cả trên một bàn cờ hiểu luật, hiểu khí, và biết bắt quân.
            </p>
            <div className="home-hero__cta home-anim home-anim--4">
              <button className="home-btn home-btn--primary home-btn--lg" onClick={onOpenRegister} type="button">
                Đăng ký miễn phí
              </button>
              <button className="home-btn home-btn--ghost home-btn--lg" onClick={onOpenRules} type="button">
                Xem luật chơi
              </button>
            </div>
          </div>

          <div className="home-hero__visual home-anim home-anim--3">
            <HeroBoardDemo />
          </div>
        </header>

        <section id="features" className="home-section home-section--muted">
          <div className="home-section__head">
            <h2>Vì sao luyện tập ở đây</h2>
            <p>Mỗi ván đấu đều đi kèm phản hồi trực quan, không chỉ là đặt quân lên bàn cờ.</p>
          </div>
          <div className="home-feature-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="home-feature-card">
                <span className="home-feature-card__icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="tsumego-teaser" className="home-section">
          <div className="home-teaser">
            <div className="home-teaser__board">
              <Board
                board={teaserBoard.board}
                boardSize={teaserBoard.size}
                onPointClick={() => {}}
                showHints={false}
                disabled
              />
            </div>
            <div className="home-teaser__info">
              <span className="home-tag home-tag--amber">
                {teaserPuzzle.difficulty === "beginner"
                  ? "Sơ cấp"
                  : teaserPuzzle.difficulty === "intermediate"
                  ? "Trung cấp"
                  : "Nâng cao"}
              </span>
              <h2>{teaserPuzzle.title}</h2>
              <p>{teaserPuzzle.instruction}</p>
              <button className="home-btn home-btn--primary" onClick={() => onSelectMode("tsumego")} type="button">
                Giải ngay
              </button>
            </div>
          </div>
        </section>

        <footer className="home-footer">
          <div className="home-footer__grid">
            <div>
              <div className="home-footer__brand">
                <span className="sidebar__logo">碁</span>
                <span>Cờ Vây AI</span>
              </div>
              <p className="home-footer__note">
                Dự án huấn luyện &amp; phân tích cờ vây. Nước đi của AI Engine (chế độ PvE/EvE) được tính
                toán trực tiếp bởi Backend Python (DualCNN + MCTS) qua API /api/v1/get_move.
              </p>
            </div>
            <div>
              <h4>Chơi</h4>
              <button onClick={() => onSelectMode("pvp-local")} type="button">PvP — Cùng máy</button>
              <button onClick={() => onSelectMode("pve")} type="button">PvE — Đấu với AI</button>
              <button onClick={() => onSelectMode("eve")} type="button">EvE — AI vs AI</button>
            </div>
            <div>
              <h4>Học</h4>
              <button onClick={onOpenRules} type="button">Luật chơi (Luật Trung Quốc)</button>
              <button onClick={() => onSelectMode("tsumego")} type="button">Luyện Tsumego</button>
            </div>
          </div>
          <div className="home-footer__bottom">© {new Date().getFullYear()} Cờ Vây AI — Dự án demo, phi thương mại.</div>
        </footer>
      </div>
    </div>
  );
}
