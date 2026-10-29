// src/components/Forum/CreatePostModal.tsx
// Modal đóng góp ghi chú kỹ thuật hoặc đề xuất tính năng mới

import { useState } from "react";
import { DEVLOG_CATEGORIES, type DevLogPost } from "../../types/forum";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPost: (newPost: DevLogPost) => void;
}

export function CreatePostModal({ isOpen, onClose, onSubmitPost }: CreatePostModalProps) {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState<DevLogPost["categoryId"]>("ai");
  const [tagsInput, setTagsInput] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("Bạn (Kỳ Thủ / Nghiên Cứu)");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Vui lòng nhập tiêu đề ghi chú / đề xuất.");
      return;
    }
    if (!content.trim() || content.trim().length < 20) {
      setError("Nội dung chi tiết phải có ít nhất 20 ký tự.");
      return;
    }

    const tags = tagsInput
      .split(/[,# ]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    const newPost: DevLogPost = {
      id: `devlog_${Date.now()}`,
      version: "Đề xuất",
      categoryId,
      title: title.trim(),
      snippet: content.trim().slice(0, 140) + "...",
      content: content.trim(),
      authorName: authorName.trim() || "Thành Viên Cộng Đồng",
      authorRole: "Đóng Góp Ý Kiến",
      date: "Vừa xong",
      views: 1,
      likes: 1,
      commentsCount: 0,
      tags: tags.length > 0 ? tags : ["DongGop", "DevNote"],
      comments: [],
    };

    onSubmitPost(newPost);
    onClose();
  };

  return (
    <div className="forum-modal-backdrop" onClick={onClose}>
      <div className="forum-modal" onClick={(e) => e.stopPropagation()}>
        <div className="forum-modal__header">
          <div className="forum-modal__title-wrap">
            <h3>Đóng Góp Ghi Chú & Đề Xuất Kỹ Thuật</h3>
          </div>
          <button className="forum-modal__close-btn" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        {error && <div className="forum-modal__error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="forum-modal__form">
          <div className="forum-form-group">
            <label>Tiêu đề đề xuất / Ghi chú <span className="req">*</span></label>
            <input
              type="text"
              placeholder="VD: Đề xuất tối ưu hóa bộ đệm trạng thái bàn cờ khi đối chiếu SGF..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              required
            />
          </div>

          <div className="forum-form-row">
            <div className="forum-form-group" style={{ flex: 1 }}>
              <label>Phân hệ liên quan</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value as DevLogPost["categoryId"])}
              >
                {DEVLOG_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="forum-form-group" style={{ flex: 1 }}>
              <label>Thẻ từ khóa (Tags, cách nhau bởi dấu phẩy)</label>
              <input
                type="text"
                placeholder="VD: MCTS, GPU, Tsumego, HeThong"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
              />
            </div>
          </div>

          <div className="forum-form-group">
            <label>Người đóng góp / Danh xưng</label>
            <input
              type="text"
              placeholder="Tên của bạn hoặc vai trò nghiên cứu..."
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>

          <div className="forum-form-group">
            <label>Nội dung phân tích & Đề xuất chi tiết <span className="req">*</span></label>
            <textarea
              rows={6}
              placeholder="Mô tả chi tiết giải pháp, báo cáo thử nghiệm hoặc câu hỏi kỹ thuật cho đội ngũ phát triển..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (error) setError(null);
              }}
              required
            />
          </div>

          <div className="forum-modal__actions">
            <button
              type="button"
              className="forum-btn forum-btn--ghost"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="forum-btn forum-btn--primary"
            >
              Gửi đóng góp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
