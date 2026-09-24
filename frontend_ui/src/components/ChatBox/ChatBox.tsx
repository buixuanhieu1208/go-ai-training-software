// src/components/ChatBox/ChatBox.tsx
// Khung chat nổi ở góc dưới bên phải màn hình chơi. Hiện tại là UI độc lập
// (chưa nối Backend/WebSocket thật) — tin nhắn gửi đi được lưu tại local
// state, kèm 1 câu phản hồi giả lập từ "Đối thủ" để khung chat không bị
// trống trải khi demo. Có thể thay bằng kết nối realtime thật sau này mà
// không cần đổi giao diện.

import { useEffect, useRef, useState, type FormEvent } from "react";
import "./ChatBox.css";

interface ChatMessage {
  id: number;
  author: "me" | "opponent" | "system";
  text: string;
  time: string;
}

const AUTO_REPLIES = [
  "Nước đi hay đấy!",
  "Để mình nghĩ thêm chút 🤔",
  "Chỗ đó có vẻ nguy hiểm nha",
  "Ván này căng à nha 😄",
  "Ok, tới lượt bạn rồi đó",
];

function timeNow(): string {
  return new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

let idCounter = 1;

export function ChatBox() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: idCounter++,
      author: "system",
      text: "Ván đấu bắt đầu! Chúc hai bạn chơi vui vẻ 🎉",
      time: timeNow(),
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  useEffect(() => () => {
    if (replyTimer.current) clearTimeout(replyTimer.current);
  }, []);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { id: idCounter++, author: "me", text, time: timeNow() }]);
    setDraft("");

    // Phản hồi giả lập — chỉ để khung chat "sống" khi demo chưa có Backend thật.
    replyTimer.current = setTimeout(() => {
      const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      setMessages((prev) => [
        ...prev,
        { id: idCounter++, author: "opponent", text: reply, time: timeNow() },
      ]);
      setUnread((u) => (open ? 0 : u + 1));
    }, 900 + Math.random() * 800);
  };

  return (
    <div className="chatbox">
      {open && (
        <div className="chatbox__panel">
          <div className="chatbox__header">
            <span className="chatbox__title">💬 Trò chuyện</span>
            <button
              type="button"
              className="chatbox__close"
              onClick={() => setOpen(false)}
              aria-label="Thu nhỏ khung chat"
            >
              ✕
            </button>
          </div>

          <div className="chatbox__list" ref={listRef}>
            {messages.map((m) => (
              <div key={m.id} className={`chatbox__msg chatbox__msg--${m.author}`}>
                {m.author !== "system" && (
                  <span className="chatbox__msg-author">{m.author === "me" ? "Bạn" : "Đối thủ"}</span>
                )}
                <div className="chatbox__msg-bubble">{m.text}</div>
                <span className="chatbox__msg-time">{m.time}</span>
              </div>
            ))}
          </div>

          <form className="chatbox__composer" onSubmit={handleSend}>
            <input
              className="chatbox__input"
              type="text"
              placeholder="Nhắn gì đó…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={280}
            />
            <button type="submit" className="chatbox__send" disabled={!draft.trim()} aria-label="Gửi">
              ➤
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chatbox__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Đóng khung chat" : "Mở khung chat"}
      >
        {open ? "✕" : "💬"}
        {!open && unread > 0 && <span className="chatbox__badge">{unread}</span>}
      </button>
    </div>
  );
}
