// src/components/Forum/PostDetailModal.tsx
// Modal xem chi tiết bản tin kỹ thuật / Dev Log và các ghi chú phản hồi

import { useState } from "react";
import type { DevLogPost, DevLogComment } from "../../types/forum";

interface PostDetailModalProps {
  post: DevLogPost | null;
  onClose: () => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, comment: DevLogComment) => void;
}

export function PostDetailModal({
  post,
  onClose,
  onLikePost,
  onAddComment,
}: PostDetailModalProps) {
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("Bạn (Kỳ Thủ)");
  const [liked, setLiked] = useState(false);

  if (!post) return null;

  const handleLike = () => {
    if (!liked) {
      onLikePost(post.id);
      setLiked(true);
    }
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: DevLogComment = {
      id: `c_${Date.now()}`,
      authorName: commentAuthor.trim() || "Thành Viên Cộng Đồng",
      authorRole: "Đóng Góp Ý Kiến",
      createdAt: "Vừa xong",
      content: commentText.trim(),
      likes: 0,
    };

    onAddComment(post.id, newComment);
    setCommentText("");
  };

  return (
    <div className="forum-modal-backdrop" onClick={onClose}>
      <div className="forum-modal forum-modal--detail" onClick={(e) => e.stopPropagation()}>
        <div className="forum-modal__header">
          <div className="devlog-modal-meta">
            <span className="devlog-version-badge">{post.version}</span>
            <div className="devlog-author-info">
              <strong>{post.authorName}</strong>
              <span className="devlog-role-badge">{post.authorRole}</span>
              <span className="devlog-date-line">· {post.date}</span>
            </div>
          </div>

          <button className="forum-modal__close-btn" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        {/* Nội dung bản tin */}
        <div className="forum-detail-body">
          <h2 className="forum-detail-title">
            {post.isPinned && <span className="pinned-badge">Ghim</span>}
            {post.title}
          </h2>

          <div className="forum-tags-list">
            {post.tags.map((tag) => (
              <span key={tag} className="forum-tag-pill">
                #{tag}
              </span>
            ))}
          </div>

          <div className="forum-content-text">
            {post.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Thanh tương tác */}
          <div className="forum-action-bar">
            <button
              className={`forum-like-btn ${liked ? "forum-like-btn--active" : ""}`}
              onClick={handleLike}
              type="button"
            >
              <span>{liked ? "Hữu ích" : "Đánh giá hữu ích"}</span>
              <strong>{post.likes}</strong>
            </button>

            <div className="forum-stats-readout">
              <span>{post.views} lượt xem</span>
              <span>{post.comments.length} ghi chú phản hồi</span>
            </div>
          </div>

          {/* Khu vực phản hồi / Ghi chú kỹ thuật */}
          <div className="forum-comments-section">
            <h3 className="comments-heading">
              Ghi Chú Kỹ Thuật & Thảo Luận ({post.comments.length})
            </h3>

            {/* Form gửi phản hồi */}
            <form onSubmit={handleSendComment} className="comment-form">
              <input
                type="text"
                placeholder="Tên / Vai trò của bạn..."
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                style={{
                  background: "#14140f",
                  border: "1px solid var(--color-border)",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  color: "#fff",
                  fontSize: "0.82rem",
                  width: "220px",
                }}
              />
              <textarea
                rows={3}
                placeholder="Gửi câu hỏi kỹ thuật, báo cáo thử nghiệm hoặc đóng góp giải pháp..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
              />
              <button
                type="submit"
                className="forum-btn forum-btn--primary forum-btn--sm send-comment-btn"
                disabled={!commentText.trim()}
              >
                Gửi phản hồi
              </button>
            </form>

            {/* Danh sách phản hồi */}
            <div className="comments-list">
              {post.comments.length === 0 ? (
                <div className="no-comments-msg">
                  Chưa có ghi chú phản hồi nào cho bản tin này.
                </div>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-bubble">
                      <div className="comment-head">
                        <strong>{comment.authorName}</strong>
                        <span className="devlog-role-badge">{comment.authorRole}</span>
                        <span className="comment-time">{comment.createdAt}</span>
                      </div>
                      <p className="comment-content">{comment.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
