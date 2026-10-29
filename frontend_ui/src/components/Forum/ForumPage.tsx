// src/components/Forum/ForumPage.tsx
// Trang Nhật Ký Phát Triển & Bản Tin Kỹ Thuật (Dev Logs & Architecture Milestones):
// - Đồng bộ giao diện 100% với Sidebar và nền tối của ứng dụng
// - Thay thế tin nhắn giả lập bằng các mốc phát triển kỹ thuật thực tế của dự án
// - Hỗ trợ lọc theo chuyên mục phân hệ, xem chi tiết và đóng góp phản hồi kỹ thuật

import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../Home/Sidebar";
import {
  DEVLOG_CATEGORIES,
  type DevLogPost,
  type DevLogComment,
} from "../../types/forum";
import {
  subscribeToForumPosts,
  createForumPost,
  likeForumPost,
  addForumComment,
  incrementForumPostViews,
} from "../../services/forumFirebaseService";
import { CreatePostModal } from "./CreatePostModal";
import { PostDetailModal } from "./PostDetailModal";
import "./ForumPage.css";

type SortOption = "latest" | "hot" | "pinned";

export function ForumPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<DevLogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<DevLogPost | null>(null);

  // Lắng nghe bản tin thời gian thực từ Firestore
  useEffect(() => {
    const unsubscribe = subscribeToForumPosts((updatedPosts) => {
      setPosts(updatedPosts);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Thêm đề xuất / ghi chú mới lên Firestore
  const handleAddNewPost = async (newPost: DevLogPost) => {
    try {
      const { id, ...postData } = newPost;
      const createdId = await createForumPost(postData);
      const savedPost = { ...newPost, id: createdId };
      setSelectedPost(savedPost);
    } catch {
      setPosts((prev) => [newPost, ...prev]);
      setSelectedPost(newPost);
    }
  };

  // Like bài viết trên Firestore
  const handleLikePost = (postId: string) => {
    likeForumPost(postId);
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
    }
  };

  // Thêm ghi chú kỹ thuật vào bài viết trên Firestore
  const handleAddComment = (postId: string, comment: DevLogComment) => {
    addForumComment(postId, comment);
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const updatedComments = [...p.comments, comment];
          return {
            ...p,
            comments: updatedComments,
            commentsCount: updatedComments.length,
          };
        }
        return p;
      })
    );
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) =>
        prev
          ? {
              ...prev,
              comments: [...prev.comments, comment],
              commentsCount: prev.comments.length + 1,
            }
          : null
      );
    }
  };

  const handleSelectPost = (post: DevLogPost) => {
    setSelectedPost(post);
    incrementForumPostViews(post.id);
  };

  // Lọc và sắp xếp bản tin
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Lọc theo Category
    if (activeCategory !== "all") {
      result = result.filter((p) => p.categoryId === activeCategory);
    }

    // Lọc theo Tìm kiếm
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.version.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sắp xếp
    if (sortBy === "pinned") {
      result.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
    } else if (sortBy === "hot") {
      result.sort((a, b) => b.likes + b.commentsCount * 2 - (a.likes + a.commentsCount * 2));
    } else {
      // Mới nhất (id desc)
      result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [posts, activeCategory, searchQuery, sortBy]);

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
        <div className="forum-container">
          {/* 1. HEADER */}
          <header className="forum-header">
            <div className="forum-header__left">
              <div className="forum-title-group">
                <h1>NHẬT KÝ PHÁT TRIỂN & BẢN TIN KỸ THUẬT</h1>
                <p>Theo dõi tiến độ kiến trúc phần mềm, cập nhật AI Engine, Luyện Tsumego và Đấu Trường Huyền Thoại</p>
              </div>
            </div>

            <div className="forum-header__right">
              <div className="forum-search-box">
                <input
                  type="text"
                  placeholder="Tìm phiên bản, từ khóa, tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                className="forum-btn forum-btn--primary"
                onClick={() => setIsCreateModalOpen(true)}
                type="button"
              >
                Đóng góp ghi chú
              </button>
            </div>
          </header>

          {/* 2. CHUYÊN MỤC PHÂN HỆ */}
          <nav className="forum-categories-bar">
            {DEVLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-chip ${activeCategory === cat.id ? "category-chip--active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
                type="button"
              >
                <span>{cat.name}</span>
                <span className="category-chip__count">
                  {cat.id === "all"
                    ? posts.length
                    : posts.filter((p) => p.categoryId === cat.id).length}
                </span>
              </button>
            ))}
          </nav>

          {/* 3. MAIN 2-COLUMN LAYOUT */}
          <div className="forum-main-layout">
            {/* Cột trái: Feed bản tin */}
            <main className="forum-feed-container">
              <div className="forum-sort-bar">
                <div className="sort-options">
                  <button
                    className={`sort-btn ${sortBy === "latest" ? "sort-btn--active" : ""}`}
                    onClick={() => setSortBy("latest")}
                    type="button"
                  >
                    Mới nhất
                  </button>
                  <button
                    className={`sort-btn ${sortBy === "hot" ? "sort-btn--active" : ""}`}
                    onClick={() => setSortBy("hot")}
                    type="button"
                  >
                    Quan tâm nhiều
                  </button>
                  <button
                    className={`sort-btn ${sortBy === "pinned" ? "sort-btn--active" : ""}`}
                    onClick={() => setSortBy("pinned")}
                    type="button"
                  >
                    Mốc trọng tâm
                  </button>
                </div>

                <span className="post-count-badge">
                  {filteredPosts.length} bản tin kỹ thuật
                </span>
              </div>

              {/* Danh sách bản tin */}
              <div className="forum-posts-list">
                {loading ? (
                  <div style={{ padding: "48px 24px", textAlign: "center", color: "var(--color-text-muted, #8e95a5)" }}>
                    Đang đồng bộ bản tin phát triển từ Firebase Firestore...
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div style={{ padding: "48px 24px", textAlign: "center", color: "var(--color-text-muted, #8e95a5)" }}>
                    Chưa có bài viết nào trong chuyên mục này.
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <article
                      key={post.id}
                      className={`forum-post-card ${post.isPinned ? "forum-post-card--pinned" : ""}`}
                      onClick={() => handleSelectPost(post)}
                    >
                      <div className="post-card__header">
                        <div className="devlog-author-info">
                          <span className="devlog-version-badge">{post.version}</span>
                          <span className="devlog-role-badge">{post.authorRole}</span>
                          <span className="devlog-date-line">· {post.date}</span>
                        </div>

                        <div className="post-card__meta-badges">
                          {post.isPinned && <span className="pinned-badge">Mốc chính</span>}
                        </div>
                      </div>

                      <h3 className="post-card__title">{post.title}</h3>
                      <p className="post-card__snippet">{post.snippet}</p>

                      <div className="post-card__footer">
                        <div className="post-tags">
                          {post.tags.map((tag) => (
                            <span key={tag} className="forum-tag-pill">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="post-stats-row">
                          <span>{post.views} lượt xem</span>
                          <span>{post.commentsCount} phản hồi kỹ thuật</span>
                          <span>{post.likes} hữu ích</span>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </main>

            {/* Cột phải: Sidebar kiến trúc dự án */}
            <aside className="forum-sidebar">
              {/* Thống kê dự án */}
              <div className="forum-side-card">
                <h3 className="side-card-title">Chỉ Số Dự Án</h3>
                <div className="community-stats-grid">
                  <div className="c-stat-box">
                    <span>Phiên bản</span>
                    <strong>v2.5.0</strong>
                  </div>
                  <div className="c-stat-box">
                    <span>Mốc Dev</span>
                    <strong>{posts.length}</strong>
                  </div>
                  <div className="c-stat-box">
                    <span>Ván Cờ Cổ</span>
                    <strong>20</strong>
                  </div>
                </div>
              </div>

              {/* Các phân hệ đã hoàn tất */}
              <div className="forum-side-card">
                <h3 className="side-card-title">Phân Hệ Kiến Trúc</h3>
                <div className="module-status-list">
                  <div className="module-item">
                    <span>AI Engine & Referee (FastAPI)</span>
                    <span className="module-tag">Hoạt động</span>
                  </div>
                  <div className="module-item">
                    <span>Đấu Trường Huyền Thoại 3 Sao</span>
                    <span className="module-tag">Hoạt động</span>
                  </div>
                  <div className="module-item">
                    <span>Luyện Tsumego & SGF Parser</span>
                    <span className="module-tag">Hoạt động</span>
                  </div>
                  <div className="module-item">
                    <span>Đấu Trực Tuyến Firestore</span>
                    <span className="module-tag">Hoạt động</span>
                  </div>
                  <div className="module-item">
                    <span>MCTS GPU Rollout</span>
                    <span className="module-tag" style={{ color: "#f59e0b", background: "rgba(245, 158, 11, 0.15)" }}>
                      Kế hoạch v3.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Nguyên tắc ghi chú kỹ thuật */}
              <div className="forum-side-card">
                <h3 className="side-card-title">Ghi Chú Kỹ Thuật</h3>
                <ul className="guidelines-list">
                  <li>Mọi bản tin phản ánh trung thực mã nguồn hiện tại của dự án.</li>
                  <li>Dữ liệu thời gian và nhật ký phiên bản được đồng bộ với tiến độ đề tài tốt nghiệp.</li>
                  <li>Khuyến khích đóng góp ý kiến về tối ưu hóa giải thuật và trải nghiệm thi đấu.</li>
                </ul>
              </div>
            </aside>
          </div>

          {/* 4. MODALS */}
          <CreatePostModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmitPost={handleAddNewPost}
          />

          <PostDetailModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            onLikePost={handleLikePost}
            onAddComment={handleAddComment}
          />
        </div>
      </div>
    </div>
  );
}
