// src/components/ChatBox/ChatBox.tsx
// Khung chat nổi hỗ trợ realtime qua Firestore và BroadcastChannel (cho test 2 tab cùng máy)
// và fallback demo local khi chơi offline / PvE.
import { useEffect, useRef, useState, type FormEvent } from "react";
import { auth } from "../../firebase";
import {
  sendMatchMessage,
  listenMatchMessages,
  type MatchChatMessage,
} from "../../services/firestoreService";
import "./ChatBox.css";

export interface ChatBoxProps {
  matchId?: string | null;
  currentUser?: {
    uid: string;
    displayName?: string | null;
    username?: string | null;
    photoURL?: string | null;
  } | null;
  userColor?: "black" | "white" | string | null;
  opponentName?: string | null;
  autoOpenOnStart?: boolean;
}

interface DisplayMessage {
  id: string;
  author: "me" | "opponent" | "system";
  senderName?: string;
  senderColor?: "black" | "white" | string;
  text: string;
  time: string;
}

const QUICK_PRESETS = [
  "Chào bạn!",
  "Chúc ván cờ hay!",
  "Nước đi hay đấy!",
  "Cảm ơn vì ván cờ!",
  "Chờ mình chút nha!",
];

const AUTO_REPLIES = [
  "Nước đi hay đấy!",
  "Để mình nghĩ thêm chút.",
  "Chỗ đó có vẻ nguy hiểm nha.",
  "Ván này căng đấy.",
  "Ok, tới lượt bạn rồi đó.",
];

function formatTime(createdAt: any): string {
  if (!createdAt) {
    return new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  }
  if (typeof createdAt === "number") {
    return new Date(createdAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  }
  if (createdAt?.toDate && typeof createdAt.toDate === "function") {
    return createdAt.toDate().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  }
  if (createdAt?.seconds) {
    return new Date(createdAt.seconds * 1000).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (createdAt instanceof Date) {
    return createdAt.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  }
  return new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

let localIdCounter = 1;

export function ChatBox({
  matchId,
  currentUser,
  userColor = "black",
  opponentName,
  autoOpenOnStart = true,
}: ChatBoxProps) {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [draft, setDraft] = useState("");

  // Định danh người chơi hiện tại, luôn có fallback an toàn nếu props chưa truyền hoặc auth đang tải
  const effectiveUid =
    currentUser?.uid || auth.currentUser?.uid || `player_${userColor || "black"}`;
  const effectiveName =
    currentUser?.displayName ||
    currentUser?.username ||
    auth.currentUser?.displayName ||
    (userColor === "black" ? "Quân Đen" : "Quân Trắng");

  // Local fallback messages when no matchId
  const [localMessages, setLocalMessages] = useState<DisplayMessage[]>([
    {
      id: "sys-0",
      author: "system",
      text: "Ván đấu bắt đầu! Chúc hai bạn chơi vui vẻ.",
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  // Realtime messages from Firestore / BroadcastChannel
  const [realtimeMessages, setRealtimeMessages] = useState<DisplayMessage[]>([]);

  const listRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevCountRef = useRef(0);
  const hasAutoOpened = useRef(false);

  // Auto-open on match start if matchId is present
  useEffect(() => {
    if (matchId && autoOpenOnStart && !hasAutoOpened.current) {
      setOpen(true);
      hasAutoOpened.current = true;
    }
  }, [matchId, autoOpenOnStart]);

  // Listen to Firestore match messages + BroadcastChannel
  useEffect(() => {
    if (!matchId) return;

    const unsub = listenMatchMessages(matchId, (serverMsgs: MatchChatMessage[]) => {
      const formatted: DisplayMessage[] = serverMsgs.map((m) => {
        const isMe = m.senderUid === effectiveUid;
        const isSys = m.senderUid === "system";
        return {
          id: m.id,
          author: isSys ? "system" : isMe ? "me" : "opponent",
          senderName: m.senderName,
          senderColor: m.senderColor,
          text: m.text,
          time: formatTime(m.createdAt),
        };
      });

      // Đếm tin nhắn chưa đọc từ đối thủ khi đang đóng khung chat
      if (serverMsgs.length > prevCountRef.current) {
        const newMsgs = serverMsgs.slice(prevCountRef.current);
        const incomingFromOther = newMsgs.filter(
          (m) => m.senderUid !== effectiveUid && m.senderUid !== "system"
        );
        if (incomingFromOther.length > 0 && !open) {
          setUnread((u) => u + incomingFromOther.length);
        }
      }
      prevCountRef.current = serverMsgs.length;

      // Hợp nhất mượt mà với bất kỳ tin nhắn optimistic cục bộ nào
      setRealtimeMessages((prev) => {
        const map = new Map<string, DisplayMessage>();
        for (const item of prev) {
          map.set(item.id, item);
        }
        for (const item of formatted) {
          map.set(item.id, item);
        }
        return Array.from(map.values());
      });
    });

    return () => unsub();
  }, [matchId, effectiveUid, open]);

  // Active messages list
  const activeMessages = matchId ? realtimeMessages : localMessages;

  // Auto scroll to bottom
  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [activeMessages, open]);

  // Reset unread when opened
  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  useEffect(() => () => {
    if (replyTimer.current) clearTimeout(replyTimer.current);
  }, []);

  const sendText = (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    // 1. Xoá nháp ngay lập tức để người dùng có thể tiếp tục gõ
    setDraft("");

    const nowStr = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    const localId = `msg_${effectiveUid}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    // 2. OPTIMISTIC UI: Hiển thị ngay lập tức lên khung chat của người gửi (0ms)
    const newDisplayMsg: DisplayMessage = {
      id: localId,
      author: "me",
      senderName: effectiveName,
      senderColor: userColor || "black",
      text,
      time: nowStr,
    };

    if (matchId) {
      setRealtimeMessages((prev) => {
        if (prev.some((m) => m.id === localId)) return prev;
        return [...prev, newDisplayMsg];
      });

      // 3. Gửi ngầm tới Firestore và BroadcastChannel
      sendMatchMessage(matchId, {
        id: localId,
        senderUid: effectiveUid,
        senderName: effectiveName,
        senderColor: userColor || "black",
        text,
      }).catch((err) => {
        console.warn("Lỗi gửi tin nhắn trận đấu:", err);
      });
    } else {
      // Local fallback cho chế độ PvE hoặc xem cờ
      setLocalMessages((prev) => [
        ...prev,
        {
          id: `local-${localIdCounter++}`,
          author: "me",
          text,
          time: nowStr,
        },
      ]);

      replyTimer.current = setTimeout(() => {
        const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
        setLocalMessages((prev) => [
          ...prev,
          {
            id: `local-${localIdCounter++}`,
            author: "opponent",
            senderName: opponentName || "Đối thủ",
            text: reply,
            time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setUnread((u) => (open ? 0 : u + 1));
      }, 900 + Math.random() * 800);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendText(draft);
  };

  return (
    <div className="chatbox">
      {open && (
        <div className="chatbox__panel">
          <div className="chatbox__header">
            <div className="chatbox__header-info">
              <span className="chatbox__title">
                {opponentName ? `Trò chuyện với ${opponentName}` : "Trò chuyện trận đấu"}
              </span>
              {matchId && <span className="chatbox__status-online">● Trực tiếp</span>}
            </div>
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
            {activeMessages.length === 0 && (
              <div className="chatbox__msg chatbox__msg--system">
                <div className="chatbox__msg-bubble">
                  Ván đấu bắt đầu! Chúc hai bạn thi đấu vui vẻ và cống hiến.
                </div>
              </div>
            )}
            {activeMessages.map((m) => (
              <div key={m.id} className={`chatbox__msg chatbox__msg--${m.author}`}>
                {m.author !== "system" && (
                  <span className="chatbox__msg-author">
                    {m.author === "me" ? "Bạn" : m.senderName || "Đối thủ"}
                    {m.senderColor && (
                      <span
                        className={`chatbox__badge-stone chatbox__badge-stone--${m.senderColor}`}
                      >
                        {m.senderColor === "black" ? "Đen" : "Trắng"}
                      </span>
                    )}
                  </span>
                )}
                <div className="chatbox__msg-bubble">{m.text}</div>
                <span className="chatbox__msg-time">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Quick preset message chips */}
          <div className="chatbox__quick-chips">
            {QUICK_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                className="chatbox__chip"
                onClick={() => sendText(preset)}
              >
                {preset}
              </button>
            ))}
          </div>

          <form className="chatbox__composer" onSubmit={handleSubmit}>
            <input
              className="chatbox__input"
              type="text"
              placeholder="Nhắn tin cho đối thủ…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={280}
            />
            <button
              type="submit"
              className="chatbox__send"
              disabled={!draft.trim()}
              aria-label="Gửi tin nhắn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
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
        {open ? (
          <span style={{ fontSize: 18, lineHeight: 1 }}>✕</span>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {!open && unread > 0 && <span className="chatbox__badge">{unread}</span>}
      </button>
    </div>
  );
}
