// src/types/forum.ts
// Định nghĩa kiểu dữ liệu cho Diễn Đàn & Nhật Ký Phát Triển kết nối Firestore

export interface DevLogComment {
  id: string;
  authorName: string;
  authorRole: string;
  createdAt: string;
  content: string;
  likes: number;
}

export interface DevLogPost {
  id: string;
  version: string;
  categoryId: "release" | "legendary" | "ai" | "tsumego" | "online" | "roadmap";
  title: string;
  snippet: string;
  content: string;
  authorName: string;
  authorRole: string;
  date: string;
  views: number;
  likes: number;
  commentsCount: number;
  tags: string[];
  isPinned?: boolean;
  isMilestone?: boolean;
  comments: DevLogComment[];
  createdAtMillis?: number;
}

export interface DevLogCategory {
  id: "all" | "release" | "legendary" | "ai" | "tsumego" | "online" | "roadmap";
  name: string;
  description: string;
}

export const DEVLOG_CATEGORIES: DevLogCategory[] = [
  {
    id: "all",
    name: "Tất cả bản tin",
    description: "Toàn bộ nhật ký phát triển và ghi chú kỹ thuật",
  },
  {
    id: "release",
    name: "Bản phát hành (Releases)",
    description: "Các mốc cập nhật phiên bản chính thức của phần mềm",
  },
  {
    id: "legendary",
    name: "Đấu Trường Huyền Thoại",
    description: "Tái hiện 20 ván cờ kinh điển và thuật toán nhiệm vụ 3 sao",
  },
  {
    id: "ai",
    name: "AI Engine & Trọng Tài",
    description: "Mô hình mạng nơ-ron, FastAPI backend và AI Referee",
  },
  {
    id: "tsumego",
    name: "Luyện Tsumego & SGF",
    description: "Thuật toán thế cờ sống chết, đếm khí và cây biến thể",
  },
  {
    id: "online",
    name: "Đồng Bộ Firestore PvP",
    description: "Kết nối thời gian thực, quản lý phòng và hồ sơ kỳ thủ",
  },
  {
    id: "roadmap",
    name: "Lộ Trình Tương Lai",
    description: "Kế hoạch nâng cấp MCTS, giải đấu và tối ưu hiệu năng",
  },
];

