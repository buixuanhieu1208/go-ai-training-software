// src/services/forumFirebaseService.ts
// Dịch vụ Diễn Đàn & Nhật Ký Phát Triển kết nối trực tiếp Firebase Firestore:
// - Đồng bộ bài viết thời gian thực (Realtime Snapshot Listener)
// - Đăng bài mới, thả tim (Like), bình luận phản hồi kỹ thuật
// - Tự động khởi tạo dữ liệu bản tin chính thức của dự án (KLCN152) khi collection trống

import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  increment,
  arrayUnion,
  query,
  orderBy,
} from "firebase/firestore";
import type { DevLogPost, DevLogComment } from "../types/forum";

export const INITIAL_DEV_LOGS: DevLogPost[] = [
  {
    id: "devlog_6",
    version: "v2.5.0",
    categoryId: "legendary",
    title: "Dev Log #6: Tái Hiện 20 Ván Cờ Huyền Thoại & Hệ Thống Đánh Giá Nhiệm Vụ 3 Sao (Tháng 10/2026)",
    snippet:
      "Tích hợp hoàn tất 20 ván cờ kinh điển trong lịch sử cờ vây nhân loại (Dosaku, Shusaku, Go Seigen, Lee Sedol vs AlphaGo) cùng bộ engine thuật toán đánh giá nhiệm vụ 3 sao theo thời gian thực...",
    content:
      "Trong đợt cập nhật lớn v2.5.0 (Tháng 10/2026), nhóm phát triển đã hoàn tất tích hợp chế độ 'Đấu Trường Huyền Thoại' (Legendary Challenge):\n\n1. Bộ dữ liệu 20 ván cờ kinh điển:\n- Trải dài qua 5 kỷ nguyên: Cổ điển (Honinbo Dosaku 1682, Honinbo Shusaku 1846), Cận đại (Go Seigen 'Tân Bố Cục' 1933), Hoàng kim (Takemiya Masaki 'Vũ Trụ Lưu' 1988), Hiện đại (Lee Sedol vs Gu Li), và Kỷ nguyên AI (Lee Sedol nước 78 'Thần chi nhất thủ', Ke Jie vs AlphaGo).\n- Mỗi ván cờ đều có thế cờ xuất phát chuẩn xác, bối cảnh lịch sử, lời điểm đạo và kỳ phổ tiếp nối trọn vẹn.\n\n2. Bộ máy thuật toán đánh giá 3 Sao (legendaryMissionEvaluator):\n- Sao 1 (Tinh hoa lịch sử): Kiểm tra tự động bằng thuật toán loang đồ thị BFS (Breadth-First Search) xem nhóm quân yếu có được cứu sống và kết nối lên trung tâm (hàng 7-12) hay không; đếm mật độ quân kiểm soát trung tâm (Moyo) đạt tối thiểu 6-8 quân; và xác thực các đòn đâm xuyên trung bàn.\n- Sao 2 (Khải hoàn): Chiến thắng ván đấu trước bot AI với toàn quyền tự do đánh tiếp.\n- Sao 3 (Kỳ đạo thượng thừa): Thắng không dùng Gợi ý, thắng không dùng Đi lại (0 Undo), hoặc ép đối thủ đầu hàng (Resign).\n\n3. Trình phát kỳ phổ timeline replayer:\n- Cho phép người học tua nhanh/chậm từng nước cờ lịch sử, xem danh sách nước đi và đối chiếu với nước đi của danh thủ.",
    authorName: "Nhóm Phát Triển Core",
    authorRole: "Dự Án Khóa Luận Tốt Nghiệp",
    date: "20/10/2026",
    views: 450,
    likes: 64,
    commentsCount: 2,
    tags: ["LegendaryArena", "3StarsMission", "BFSEngine", "Release_v2_5"],
    isPinned: true,
    isMilestone: true,
    comments: [
      {
        id: "c_1",
        authorName: "Kỹ sư AI Backend",
        authorRole: "AI Research",
        createdAt: "Hôm qua",
        content: "Đã tối ưu hóa hàm loang đồ thị BFS findGroupAndLiberties, thời gian kiểm tra sau mỗi nước đi chỉ mất dưới 0.05ms, không gây bất kỳ độ trễ nào cho UI bàn cờ.",
        likes: 12,
      },
      {
        id: "c_2",
        authorName: "Trưởng Nhóm Đồ Án",
        authorRole: "Core Developer",
        createdAt: "Hôm nay",
        content: "Đã lưu trữ số sao cao nhất của từng ván vào localStorage, hiển thị huy hiệu sao trực tiếp ngoài sảnh danh sách 20 ván cờ.",
        likes: 9,
      },
    ],
  },
  {
    id: "devlog_5",
    version: "v2.3.0",
    categoryId: "ai",
    title: "Dev Log #5: Trọng Tài AI (AI Referee) & Biểu Đồ Thẩm Định Ván Đấu Hậu Trận (Tháng 08/2026)",
    snippet:
      "Hoàn thiện hệ thống phân tích hậu ván cờ (Game Review): Biểu đồ Win-Rate động xuyên suốt ván đấu, tự động phân loại chất lượng nước đi và xuất file SGF chuẩn quốc tế...",
    content:
      "Bản cập nhật v2.3.0 tập trung nâng cấp hệ thống phân tích và đánh giá chuyên sâu:\n\n1. Biểu đồ Win-Rate động (Winrate Graph):\n- Thu thập điểm đánh giá từ Value Network tại mỗi hiệp cờ, vẽ đồ thị tỷ lệ thắng biến thiên mượt mà từ nước đầu tiên đến lúc kết thúc ván.\n\n2. Gắn nhãn chất lượng nước đi tự động (Quality Dots):\n- Nước đi xuất sắc (Brilliant): Tăng winrate vượt bậc hoặc tìm ra điểm yếu then chốt.\n- Nước đi chuẩn xác (Best/Good): Điểm rơi khớp với đề xuất của Policy Network.\n- Nước đi nghi ngờ (Inaccuracy) & Sai lầm thô thiển (Blunder): Làm rơi tỷ lệ thắng trên 15%.\n\n3. Trích xuất kỳ phổ chuẩn SGF (sgfExporter):\n- Cho phép tải về file `.sgf` đầy đủ thông tin tên kỳ thủ, kết quả, kích thước bàn cờ và bình chú từng hiệp.",
    authorName: "Nhóm Phát Triển AI",
    authorRole: "AI & Analytics",
    date: "15/08/2026",
    views: 620,
    likes: 82,
    commentsCount: 1,
    tags: ["AIReferee", "GameReview", "WinrateGraph", "SgfExporter"],
    isMilestone: true,
    comments: [
      {
        id: "c_3",
        authorName: "Kỹ sư Frontend UI",
        authorRole: "UI/UX Developer",
        createdAt: "16/08/2026",
        content: "Modal GameReviewModal đã hoạt động trơn tru với SVG Canvas biểu đồ tương tác, nhấp vào điểm bất kỳ sẽ nhảy bàn cờ đến đúng hiệp đó.",
        likes: 14,
      },
    ],
  },
  {
    id: "devlog_4",
    version: "v2.0.0",
    categoryId: "online",
    title: "Dev Log #4: Đồng Bộ Đấu Trường PvP Trực Tuyến Thời Gian Thực Qua Firebase Firestore (Tháng 06/2026)",
    snippet:
      "Mốc phát hành lớn v2.0.0: Cho phép hai người chơi kết nối trực tiếp qua mạng Internet, tạo phòng thi đấu bằng mã phòng, mời bạn bè và ghi nhận kết quả thi đấu...",
    content:
      "Đánh dấu bước ngoặt đưa ứng dụng từ phần mềm offline sang nền tảng đối kháng trực tuyến:\n\n1. Kiến trúc thời gian thực qua Firestore:\n- Quản lý trạng thái ván đấu (Match State) với cơ chế listener snapshot: đồng bộ nước đi của 2 bên với độ trễ < 150ms.\n- Tự động nhận diện khi người chơi mất kết nối hoặc hết thời gian Byo-yomi để xử thắng/thua khách quan.\n\n2. Sảnh chờ trực tuyến (OnlineHub):\n- Ghép cặp nhanh (Quick Match), tạo phòng riêng tư có mật mã, gửi lời mời kết bạn và trò chuyện qua ChatBox.\n- Tích hợp tài khoản Google Authentication bảo mật.",
    authorName: "Nhóm Mạng & Dịch Vụ",
    authorRole: "Cloud Engineer",
    date: "25/06/2026",
    views: 780,
    likes: 96,
    commentsCount: 1,
    tags: ["FirestorePvP", "OnlineHub", "RealtimeSync", "Release_v2_0"],
    isMilestone: true,
    comments: [
      {
        id: "c_4",
        authorName: "Kỹ sư Database",
        authorRole: "Backend Engineer",
        createdAt: "26/06/2026",
        content: "Cấu trúc dữ liệu collection matches đã được tối ưu chỉ lưu danh sách move history dạng chuỗi ngắn gọn, tiết kiệm 80% băng thông đọc/ghi Firestore.",
        likes: 11,
      },
    ],
  },
  {
    id: "devlog_3",
    version: "v1.5.0",
    categoryId: "tsumego",
    title: "Dev Log #3: Ra Mắt Trung Tâm Luyện Tsumego Với SGF Parser & Đối Chiếu Biến Thể (Tháng 04/2026)",
    snippet:
      "Xây dựng kho bài tập thế cờ sống chết (Tsumego Hub) hơn 30 bài mẫu, tự động đối chiếu nước đi của người chơi với lời giải trong file SGF và phản đòn thông minh...",
    content:
      "Phân hệ huấn luyện tư duy sống chết (Tsumego Hub) chính thức đi vào hoạt động:\n\n1. Trình phân giải SGF thuần TypeScript (sgfParser.ts):\n- Đọc đúng thuộc tính bàn cờ SZ, quân đặt sẵn AB/AW, bên đi trước PL và cây nước đi.\n- Hỗ trợ dò nhánh biến thể chính (Mainline) và các phản đòn tương ứng khi người chơi đi đúng.\n\n2. Kho bài tập phân cấp rõ ràng:\n- Nhập môn (Beginner / 15k - 10k): Nhận biết mắt thật, mắt giả, đòn bắt quân cơ bản.\n- Trung cấp (Intermediate / 9k - 1k): Thế cờ góc, bẻ siết khí, đòn điểm huyệt (Tesuji).\n- Cao cấp (Advanced / Dan level): Thế cờ phức tạp, trận cướp cờ (Ko) sinh tử.",
    authorName: "Nhóm Phát Triển Core",
    authorRole: "Core Developer",
    date: "12/04/2026",
    views: 510,
    likes: 58,
    commentsCount: 0,
    tags: ["TsumegoEngine", "SGFParser", "GoRules", "Release_v1_5"],
    comments: [],
  },
  {
    id: "devlog_2",
    version: "v1.2.0",
    categoryId: "ai",
    title: "Dev Log #2: Tích Hợp Backend AI Engine FastAPI & Mạng Nơ-ron Dự Đoán Nước Đi (Tháng 02/2026)",
    snippet:
      "Xây dựng API RESTful `/api/v1/get_move` bằng Python FastAPI, kết nối mô hình học sâu Dual-ResNet đánh giá bàn cờ và thanh Win-rate thời gian thực...",
    content:
      "Tích hợp hạt nhân trí tuệ nhân tạo (AI Engine) vào ứng dụng:\n\n1. Dịch vụ AI Backend (Python FastAPI):\n- Cung cấp endpoint nhận trạng thái bàn cờ 19x19 và lượt đi hiện tại, tính toán nước đi tốt nhất trong vòng 200ms - 500ms.\n- Hỗ trợ 3 mức độ khó AI: Dễ (Easy), Trung bình (Medium), Khó (Hard).\n\n2. Phản hồi trực quan trên Frontend:\n- Thanh Win-rate dạng viên đá chẻ đôi đen/trắng chạy dọc cạnh phải bàn cờ, cập nhật liên tục.\n- Vòng hào quang ngôi sao đánh dấu nước đi tối ưu mà mạng Policy đề xuất.",
    authorName: "Nhóm Nghiên Cứu AI",
    authorRole: "AI Research",
    date: "28/02/2026",
    views: 590,
    likes: 71,
    commentsCount: 0,
    tags: ["FastAPI", "DualResNet", "PolicyNetwork", "AIBackend"],
    comments: [],
  },
  {
    id: "devlog_1",
    version: "v1.0.0",
    categoryId: "release",
    title: "Dev Log #1: Khởi Động Dự Án — Xây Dựng Kiến Trúc Bàn Cờ Cờ Vây Chuẩn Luật (Tháng 01/2026)",
    snippet:
      "Đặt nền móng đầu tiên cho phần mềm 'Huấn Luyện Viên Ảo AI Cờ Vây': Thiết kế bàn cờ SVG 19x19, bộ đếm khí, quy tắc bắt quân và tính điểm chuẩn quốc tế...",
    content:
      "Khởi động dự án tốt nghiệp với việc xây dựng bộ lõi luật cờ vây (`goRules.ts`):\n\n1. Thuật toán quy tắc cờ vây (Go Rules Engine):\n- Thuật toán DFS tìm kiếm nhóm quân liên kết và tập hợp khí (liberties).\n- Xử lý bắt quân (applyCaptures), cấm tự sát (suicide rule), và luật Kiếp (Ko rule) ngăn lặp lại trạng thái bàn cờ.\n\n2. Tính điểm lãnh thổ (Score Calculation):\n- Thuật toán Flood-fill phân vùng lãnh thổ (Territory) và tính điểm theo luật Trung Quốc (diện tích: quân + đất, Komi 7.5) và Nhật Bản.\n\n3. Trải nghiệm thị giác:\n- Bàn cờ gỗ ấm áp đặt trong không gian tối tĩnh lặng (Zen Go aesthetic), hiệu ứng âm thanh đặt quân và bắt quân sống động.",
    authorName: "Trưởng Nhóm Đồ Án",
    authorRole: "Project Lead",
    date: "10/01/2026",
    views: 720,
    likes: 88,
    commentsCount: 0,
    tags: ["ProjectKickoff", "GoRulesCore", "Architecture", "Release_v1_0"],
    comments: [],
  },
  {
    id: "devlog_roadmap",
    version: "v3.0.0 Plan",
    categoryId: "roadmap",
    title: "Lộ Trình Tương Lai (Roadmap 2026 - 2027): Nâng Cấp MCTS Đa Luồng & Giải Đấu Tự Động",
    snippet:
      "Kế hoạch nâng cấp tiếp theo: Thuật toán Monte Carlo Tree Search (MCTS) song song trên GPU, hệ thống giải đấu theo hệ Thụy Sĩ (Swiss System) và ứng dụng di động...",
    content:
      "Định hướng phát triển cho các giai đoạn kế tiếp của dự án:\n\n1. Tối ưu hóa thuật toán MCTS:\n- Mở rộng tìm kiếm cây Monte Carlo đa luồng (Multi-threaded MCTS) trên GPU, cho phép người dùng tùy chỉnh số lần rollout (100 - 1600 visits) để tăng cường chiều sâu phân tích quan tử (Yose).\n\n2. Hệ thống Giải đấu Tự động (Swiss-System Tournament):\n- Tự động bốc thăm chia bảng, tính điểm hệ số Buchholz và điều hành giải đấu nội bộ trực tuyến.\n\n3. Hỗ trợ Đa nền tảng (PWA & Mobile):\n- Tối ưu giao diện cảm ứng cho điện thoại và máy tính bảng, cho phép cài đặt trực tiếp dưới dạng Progressive Web App.",
    authorName: "Nhóm Phát Triển Core",
    authorRole: "Roadmap Planning",
    date: "Kế hoạch 2026-2027",
    views: 410,
    likes: 54,
    commentsCount: 0,
    tags: ["Roadmap", "MCTS", "SwissTournament", "PWA"],
    isPinned: true,
    comments: [],
  },
];

let hasAttemptedSeed = false;

/**
 * Tự động gieo dữ liệu bản tin chính thức nếu Firestore collection chưa có bài nào
 */
async function autoSeedForumIfEmpty(): Promise<void> {
  if (hasAttemptedSeed) return;
  hasAttemptedSeed = true;

  try {
    const snap = await getDocs(collection(db, "forum_posts"));
    if (snap.empty) {
      console.log("Khởi tạo bộ dữ liệu Dev Logs chính thức lên Firestore...");
      for (let i = 0; i < INITIAL_DEV_LOGS.length; i++) {
        const item = INITIAL_DEV_LOGS[i];
        await setDoc(doc(db, "forum_posts", item.id), {
          ...item,
          createdAtMillis: Date.now() - i * 86400000,
        });
      }
    }
  } catch (err) {
    console.warn("Không thể tự gieo dữ liệu forum_posts lên Firestore (có thể do quyền hạn hoặc offline):", err);
  }
}

/**
 * Lắng nghe danh sách bài viết thời gian thực từ Firestore
 */
export function subscribeToForumPosts(
  onUpdate: (posts: DevLogPost[]) => void
): () => void {
  // Kiểm tra gieo mầm dữ liệu
  autoSeedForumIfEmpty();

  const q = query(collection(db, "forum_posts"), orderBy("createdAtMillis", "desc"));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        onUpdate(INITIAL_DEV_LOGS);
        return;
      }

      const list: DevLogPost[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          version: data.version || "v1.0.0",
          categoryId: data.categoryId || "release",
          title: data.title || "Bản tin phát triển",
          snippet: data.snippet || "",
          content: data.content || "",
          authorName: data.authorName || "Kỳ Thủ",
          authorRole: data.authorRole || "Thành Viên",
          date: data.date || "Gần đây",
          views: Number(data.views || 0),
          likes: Number(data.likes || 0),
          commentsCount: Number(data.commentsCount || (data.comments ? data.comments.length : 0)),
          tags: Array.isArray(data.tags) ? data.tags : [],
          isPinned: Boolean(data.isPinned),
          isMilestone: Boolean(data.isMilestone),
          comments: Array.isArray(data.comments) ? data.comments : [],
          createdAtMillis: Number(data.createdAtMillis || 0),
        });
      });

      onUpdate(list);
    },
    (err) => {
      console.warn("Lỗi Firestore listener forum_posts, sử dụng bộ dữ liệu dự phòng:", err);
      onUpdate(INITIAL_DEV_LOGS);
    }
  );

  return unsubscribe;
}

/**
 * Tạo một bài viết hoặc ghi chú kỹ thuật mới lên Firestore
 */
export async function createForumPost(
  newPost: Omit<DevLogPost, "id">
): Promise<string> {
  const postData = {
    ...newPost,
    createdAtMillis: Date.now(),
    views: 1,
    likes: 1,
    commentsCount: 0,
    comments: [],
  };

  try {
    const docRef = await addDoc(collection(db, "forum_posts"), postData);
    return docRef.id;
  } catch (err) {
    console.warn("Lỗi tạo bài viết trên Firestore:", err);
    throw err;
  }
}

/**
 * Tăng lượt thích cho bài viết trên Firestore
 */
export async function likeForumPost(postId: string): Promise<void> {
  try {
    const postRef = doc(db, "forum_posts", postId);
    await updateDoc(postRef, {
      likes: increment(1),
    });
  } catch (err) {
    console.warn("Lỗi thả tim bài viết trên Firestore:", err);
  }
}

/**
 * Thêm một bình luận kỹ thuật vào bài viết trên Firestore
 */
export async function addForumComment(
  postId: string,
  comment: DevLogComment
): Promise<void> {
  try {
    const postRef = doc(db, "forum_posts", postId);
    await updateDoc(postRef, {
      comments: arrayUnion(comment),
      commentsCount: increment(1),
    });
  } catch (err) {
    console.warn("Lỗi thêm bình luận vào Firestore:", err);
  }
}

/**
 * Tăng lượt xem bài viết
 */
export async function incrementForumPostViews(postId: string): Promise<void> {
  try {
    const postRef = doc(db, "forum_posts", postId);
    await updateDoc(postRef, {
      views: increment(1),
    });
  } catch (err) {}
}

