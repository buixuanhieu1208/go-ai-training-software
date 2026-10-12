// src/components/Tsumego/TsumegoHub.tsx
// Trung tâm Luyện tập Cờ Vây Toàn diện:
// - Phân loại theo 4 chủ đề cốt lõi: Thế cờ Sống/Chết, Cướp cờ - Ko, Quan tử - Yose, Khai cuộc - Joseki.
// - Bài tập cá nhân hóa: Trích xuất từ các lỗi sai (blunder) trong ván cờ thực chiến.
// - Đề xuất thích ứng thông minh (Adaptive Learning): Tự động đánh giá phong độ, đề xuất bài tập khớp trình độ.
// - Phân cấp Kyu / Dan trực quan, theo dõi chuỗi ngày và tỉ lệ giải đúng.

import { useState, useMemo, useEffect } from "react";
import { TsumegoPractice } from "./TsumegoPractice";
import {
  getAllCurrentPuzzles,
  getPersonalPuzzles,
  deletePersonalPuzzle,
} from "../../data/puzzles/allPuzzles";
import {
  getDailyPuzzlesForToday,
  loadDailyState,
  getTodayDateString,
} from "../../data/puzzles/dailyChallenge";
import {
  loadLearningProfile,
  getRecommendedNextPuzzle,
} from "../../utils/adaptiveLearning";
import type { TsumegoDifficulty } from "../../types/training";
import "./TsumegoHub.css";

type TabCategory =
  | "daily"
  | "adaptive"
  | "life_death"
  | "ko"
  | "yose"
  | "opening"
  | "personal"
  | "all";

export function TsumegoHub() {
  const [activeTab, setActiveTab] = useState<TabCategory>("daily");
  const [difficultyFilter, setDifficultyFilter] = useState<"all" | TsumegoDifficulty>("all");
  const [selectedPuzzleId, setSelectedPuzzleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [adaptiveReason, setAdaptiveReason] = useState<string | null>(null);

  // Danh sách toàn bộ bài tập (bao gồm cả bài tập cá nhân vừa trích xuất)
  const [allPuzzles, setAllPuzzles] = useState(getAllCurrentPuzzles);

  const refreshAllPuzzles = () => {
    setAllPuzzles(getAllCurrentPuzzles());
  };

  const openingCount = useMemo(() => allPuzzles.filter((p) => p.category === "opening" || p.topic === "opening").length, [allPuzzles]);
  const tsumegoCount = useMemo(() => allPuzzles.filter((p) => p.category === "tsumego" || p.category === "life_death" || p.topic === "life_death").length, [allPuzzles]);
  const koCount = useMemo(() => allPuzzles.filter((p) => p.category === "ko" || p.topic === "ko").length, [allPuzzles]);
  const yoseCount = useMemo(() => allPuzzles.filter((p) => p.category === "yose" || p.topic === "yose").length, [allPuzzles]);
  const personalPuzzles = useMemo(() => getPersonalPuzzles(), [allPuzzles]);

  // Adaptive learning profile
  const [learningProfile, setLearningProfile] = useState(loadLearningProfile());

  // Daily challenge state
  const [dailyState, setDailyState] = useState(loadDailyState());
  const dailyPuzzles = useMemo(() => getDailyPuzzlesForToday(), []);

  // Danh sách bài tập hoàn thành lưu trong localStorage
  const [solvedIds, setSolvedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem("go_solved_puzzle_ids");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const markPuzzleSolved = (id: string) => {
    setSolvedIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem("go_solved_puzzle_ids", JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
    setDailyState(loadDailyState());
    setLearningProfile(loadLearningProfile());
  };

  // Lọc danh sách bài theo tab và độ khó
  const currentList = useMemo(() => {
    if (activeTab === "daily") return dailyPuzzles;

    if (activeTab === "adaptive") {
      // Tab thích ứng: các bài tập có độ khó đề xuất hoặc các bài tập trọng tâm
      return allPuzzles.filter((p) => p.difficulty === learningProfile.recommendedDifficulty);
    }

    if (activeTab === "personal") {
      return personalPuzzles;
    }

    let list = allPuzzles;
    if (activeTab === "opening") {
      list = list.filter((p) => p.category === "opening" || p.topic === "opening");
    } else if (activeTab === "life_death") {
      list = list.filter((p) => p.category === "tsumego" || p.category === "life_death" || p.topic === "life_death");
    } else if (activeTab === "ko") {
      list = list.filter((p) => p.category === "ko" || p.topic === "ko");
    } else if (activeTab === "yose") {
      list = list.filter((p) => p.category === "yose" || p.topic === "yose");
    }

    if (difficultyFilter !== "all") {
      list = list.filter((p) => p.difficulty === difficultyFilter);
    }
    return list;
  }, [activeTab, difficultyFilter, dailyPuzzles, allPuzzles, personalPuzzles, learningProfile.recommendedDifficulty]);

  // Lọc thêm theo tìm kiếm từ khóa/số thứ tự
  const displayedList = useMemo(() => {
    if (!searchQuery.trim()) return currentList;
    const q = searchQuery.trim().toLowerCase();
    return currentList.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.instruction.toLowerCase().includes(q)
    );
  }, [currentList, searchQuery]);

  // Nếu chưa chọn bài nào, mặc định bài đầu tiên của danh sách hiện tại
  useEffect(() => {
    if (displayedList.length > 0 && (!selectedPuzzleId || !displayedList.some((p) => p.id === selectedPuzzleId))) {
      setSelectedPuzzleId(displayedList[0].id);
    }
  }, [displayedList, selectedPuzzleId]);

  const currentPuzzle = useMemo(() => {
    return displayedList.find((p) => p.id === selectedPuzzleId) ?? displayedList[0];
  }, [displayedList, selectedPuzzleId]);

  const currentIndex = useMemo(() => {
    return displayedList.findIndex((p) => p.id === currentPuzzle?.id);
  }, [displayedList, currentPuzzle]);

  const handleNext = () => {
    if (currentIndex < displayedList.length - 1) {
      setSelectedPuzzleId(displayedList[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedPuzzleId(displayedList[currentIndex - 1].id);
    }
  };

  const handleAdaptiveNext = () => {
    const recommended = getRecommendedNextPuzzle(allPuzzles, currentPuzzle?.id);
    setSelectedPuzzleId(recommended.puzzle.id);
    setAdaptiveReason(recommended.reason);
  };

  const handleDeletePersonal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deletePersonalPuzzle(id);
    refreshAllPuzzles();
  };

  return (
    <div className="tsumego-hub">
      {/* Thanh điều hướng tab theo 4 chủ đề và tính năng thông minh */}
      <div className="tsumego-hub__top-bar">
        <div className="tsumego-hub__tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === "daily" ? "tab-btn--active" : ""}`}
            onClick={() => {
              setActiveTab("daily");
              setSearchQuery("");
            }}
          >
            Hôm nay
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "adaptive" ? "tab-btn--active" : ""}`}
            onClick={() => {
              setActiveTab("adaptive");
              setSearchQuery("");
            }}
          >
            Thích ứng AI
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "life_death" ? "tab-btn--active" : ""}`}
            onClick={() => {
              setActiveTab("life_death");
              setSearchQuery("");
            }}
          >
            Sống &amp; Chết ({tsumegoCount})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "ko" ? "tab-btn--active" : ""}`}
            onClick={() => {
              setActiveTab("ko");
              setSearchQuery("");
            }}
          >
            Cướp cờ - Ko ({koCount})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "yose" ? "tab-btn--active" : ""}`}
            onClick={() => {
              setActiveTab("yose");
              setSearchQuery("");
            }}
          >
            Quan tử - Yose ({yoseCount})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "opening" ? "tab-btn--active" : ""}`}
            onClick={() => {
              setActiveTab("opening");
              setSearchQuery("");
            }}
          >
            Khai cuộc ({openingCount})
          </button>
          {personalPuzzles.length > 0 && (
            <button
              type="button"
              className={`tab-btn ${activeTab === "personal" ? "tab-btn--active" : ""}`}
              onClick={() => {
                setActiveTab("personal");
                setSearchQuery("");
              }}
            >
              Bài cá nhân ({personalPuzzles.length})
            </button>
          )}
          <button
            type="button"
            className={`tab-btn ${activeTab === "all" ? "tab-btn--active" : ""}`}
            onClick={() => {
              setActiveTab("all");
              setSearchQuery("");
            }}
          >
            Tất cả ({allPuzzles.length})
          </button>
        </div>

        {/* Badge thống kê chuỗi & trình độ Kyu */}
        <div className="tsumego-hub__stats-badge">
          <span className="badge-item badge-item--rank" title="Trình độ Tsumego ước tính theo hiệu suất">
            Trình độ: {learningProfile.currentEstimatedRank}
          </span>
          <span className="badge-item badge-item--streak" title="Chuỗi ngày giải bài liên tục">
            Chuỗi: {dailyState.streak} ngày
          </span>
          <span className="badge-item badge-item--completed" title="Số bài đã giải xong">
            Đã giải: {solvedIds.length} / {allPuzzles.length}
          </span>
        </div>
      </div>

      {/* Banner chế độ thích ứng AI (Adaptive Learning Banner) */}
      {activeTab === "adaptive" && (
        <div className="adaptive-banner">
          <div className="adaptive-banner__info">
            <h4 className="adaptive-banner__title">Học tập Thích ứng (Adaptive Learning)</h4>
            <p className="adaptive-banner__desc">
              AI liên tục theo dõi thời gian suy nghĩ, số lần thử và độ chính xác để tự động điều chỉnh độ khó bài tập phù hợp với thực lực của bạn.
            </p>
            <div className="adaptive-banner__stats">
              <span>Độ khó đề xuất: <strong>{learningProfile.recommendedDifficulty === "beginner" ? "Sơ cấp" : learningProfile.recommendedDifficulty === "intermediate" ? "Trung cấp" : "Nâng cao"}</strong></span>
              <span>Độ chính xác: <strong>{learningProfile.accuracyRate}%</strong></span>
              <span>Thời gian TB: <strong>{learningProfile.avgDurationSeconds}s</strong></span>
            </div>
          </div>
          <button type="button" className="adaptive-banner__btn" onClick={handleAdaptiveNext}>
            🚀 Giải bài AI đề xuất
          </button>
        </div>
      )}

      {/* Thông tin ngày ở tab Daily */}
      {activeTab === "daily" && (
        <div className="daily-banner">
          <div className="daily-banner__info">
            <h4 className="daily-banner__date">Hôm nay: {getTodayDateString()}</h4>
            <p className="daily-banner__sub">
              Hoàn thành 3 bài thử thách mỗi ngày để tích lũy chuỗi ngày và nhận thêm sao.
            </p>
          </div>
          <div className="daily-banner__progress">
            Tiến độ hôm nay: <strong>{dailyState.completedPuzzleIds.length} / 3</strong>
          </div>
        </div>
      )}

      {/* Thanh lọc độ khó & Kyu/Dan (ẩn khi ở tab Daily hoặc Adaptive) */}
      {activeTab !== "daily" && activeTab !== "adaptive" && (
        <div className="tsumego-hub__filter-bar">
          <span className="filter-label">Cấp độ:</span>
          {(["all", "beginner", "intermediate", "advanced"] as const).map((diff) => (
            <button
              key={diff}
              type="button"
              className={`filter-btn ${difficultyFilter === diff ? "filter-btn--active" : ""}`}
              onClick={() => setDifficultyFilter(diff)}
            >
              {diff === "all"
                ? "Tất cả"
                : diff === "beginner"
                ? "Sơ cấp (25k-15k)"
                : diff === "intermediate"
                ? "Trung cấp (14k-5k)"
                : "Nâng cao (4k-1d+)"}
            </button>
          ))}
          <span className="filter-count">({currentList.length} bài)</span>
        </div>
      )}

      {/* Khu vực chính: Bàn cờ luyện tập + Danh sách bài */}
      <div className="tsumego-hub__content">
        {currentPuzzle ? (
          <div className="tsumego-hub__practice-area">
            <TsumegoPractice
              key={currentPuzzle.id}
              puzzle={currentPuzzle}
              onSolved={() => markPuzzleSolved(currentPuzzle.id)}
              onNext={handleNext}
              onPrev={handlePrev}
              hasPrev={currentIndex > 0}
              hasNext={currentIndex < currentList.length - 1}
              onAdaptiveNext={handleAdaptiveNext}
              adaptiveReason={adaptiveReason}
            />
          </div>
        ) : (
          <div className="tsumego-hub__empty">
            {activeTab === "personal"
              ? "Bạn chưa có bài tập cá nhân nào. Hãy chơi một ván cờ với AI, sau đó bấm 'Trích xuất bài tập' ở bảng kết quả để luyện lại các nước lỗi!"
              : "Không tìm thấy bài tập phù hợp với bộ lọc."}
          </div>
        )}

        {/* Danh sách chọn bài (Sidebar list) */}
        <div className="tsumego-hub__list-sidebar">
          <div className="sidebar-header-box">
            <h4 className="sidebar-title">Danh sách bài tập ({displayedList.length})</h4>
            <input
              type="text"
              className="puzzle-search-input"
              placeholder="Tìm theo tên hoặc số #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="puzzle-items-list">
            {displayedList.length === 0 ? (
              <div className="puzzle-item-empty">Không có bài tập nào khớp từ khóa.</div>
            ) : (
              displayedList.map((p, idx) => {
                const isSelected = p.id === currentPuzzle?.id;
                const isSolved = solvedIds.includes(p.id) || dailyState.completedPuzzleIds.includes(p.id);
                const isPersonal = p.category === "personal";
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={`puzzle-item-btn ${isSelected ? "puzzle-item-btn--active" : ""} ${
                      isSolved ? "puzzle-item-btn--solved" : ""
                    }`}
                    onClick={() => setSelectedPuzzleId(p.id)}
                  >
                    <span className="puzzle-item-no">#{idx + 1}</span>
                    <div className="puzzle-item-info">
                      <span className="puzzle-item-title">{p.title}</span>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <span className={`puzzle-item-tag puzzle-item-tag--${p.difficulty}`}>
                          {p.rankGrade ? `${p.rankGrade} · ` : ""}
                          {p.difficulty === "beginner" ? "Sơ cấp" : p.difficulty === "intermediate" ? "Trung cấp" : "Nâng cao"}
                        </span>
                      </div>
                    </div>
                    {isSolved && <span className="puzzle-item-check" title="Đã hoàn thành">✓</span>}
                    {isPersonal && (
                      <span
                        className="puzzle-item-del"
                        title="Xóa bài tập cá nhân này"
                        onClick={(e) => handleDeletePersonal(p.id, e)}
                      >
                        ✕
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TsumegoHub;
