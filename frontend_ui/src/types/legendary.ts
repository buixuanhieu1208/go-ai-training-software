/**
 * @file legendary.ts
 * @description Type definitions cho chế độ "Đấu Trường Huyền Thoại" (Legendary Challenge)
 *
 * Cho phép người chơi nhập vai vào những thời khắc then chốt nhất
 * trong lịch sử cờ vây thế giới, so sánh nước đi của mình với:
 *   1. Nước tuyển thủ đã đi (lịch sử)
 *   2. Nước AI đánh giá tối ưu (KataGo/DualCNN)
 */

// ─── THÔNG TIN KỲ THỦ ───────────────────────────────────────

export interface LegendaryPlayerInfo {
  /** Tên kỳ thủ (tiếng Anh hoặc tên phổ biến quốc tế) */
  name: string;
  /** Đẳng cấp tại thời điểm thi đấu (ví dụ: "9 dan", "7 dan") */
  rank: string;
  /** Quốc gia / tổ chức */
  country: 'JP' | 'KR' | 'CN' | 'TW' | 'AI';
}

// ─── PHÂN LOẠI ───────────────────────────────────────────────

/** Kỷ nguyên lịch sử của ván cờ */
export type GameEra =
  | 'classical'     // Cổ điển (trước 1900)
  | 'early_modern'  // Cận đại (1900–1960)
  | 'golden'        // Hoàng kim (1960–2000)
  | 'modern'        // Hiện đại (2000–2015)
  | 'ai_era';       // Kỷ nguyên AI (2016–nay)

/** Phân loại chiến thuật/chủ đề nước đi huyền thoại */
export type GameCategory =
  | 'strategy'      // Chiến lược toàn bàn (cục diện lớn, cân bằng thế trận)
  | 'fighting'      // Cận chiến khốc liệt (đánh giáp lá cà, tấn công trực diện)
  | 'sacrifice'     // Hy sinh chiến thuật (bỏ quân để đạt lợi thế lớn hơn)
  | 'endgame'       // Quan tử — Yose (giai đoạn cuối, tính toán chính xác)
  | 'opening'       // Khai cuộc đột phá (phá vỡ lý thuyết truyền thống)
  | 'invasion'      // Xâm nhập lãnh thổ đối phương (nhảy vào vùng kiểm soát)
  | 'ko'            // Trận cướp cờ phức tạp (Ko fight)
  | 'moyo'          // Xây dựng thế lực trung tâm (Moyo / Influence)
  | 'tesuji';       // Nước cờ kỹ thuật tinh tế (sáng tạo cục bộ)

export interface StarMissionObjective {
  /** Số sao: 1 (Chủ đề lịch sử), 2 (Thắng trận), 3 (Kỳ đạo thượng thừa) */
  star: 1 | 2 | 3;
  /** Tên nhiệm vụ */
  title: string;
  /** Mô tả chi tiết yêu cầu */
  description: string;
  /** Loại điều kiện đánh giá thuật toán */
  conditionType:
    | 'theme_special'     // Điều kiện chủ đề độc nhất của từng ván (do evaluator xử lý)
    | 'moyo_center'       // Kiểm soát vùng trung tâm (>= X quân)
    | 'rescue_group'      // Cứu sống toàn bộ nhóm quân mục tiêu
    | 'connect_center'    // Kết nối nhóm quân hiểm trở lên vùng trung tâm
    | 'cut_or_tesuji'     // Đòn chia cắt hoặc bắt quân then chốt
    | 'capture_target'    // Bắt ít nhất N quân đối phương
    | 'tengen_control'    // Kiểm soát Thiên Nguyên / trục tọa độ
    | 'win_game'          // Chiến thắng ván đấu trước AI
    | 'no_hints'          // Thắng mà không dùng Gợi ý
    | 'no_undo'           // Thắng mà không dùng Đi lại
    | 'resign_win'        // Thắng áp đảo (đối thủ đầu hàng)
    | 'move_efficiency';  // Thắng trong giới hạn số nước đi
  /** Tham số bổ trợ cho điều kiện */
  params?: {
    minCenterStones?: number;
    targetStones?: string[];
    maxMoves?: number;
    requiredCaptures?: number;
  };
}

export interface GameMission {
  /** Tiêu đề ngắn gọn của nhiệm vụ. Ví dụ: "Thần Chi Nhất Thủ: Giải Cứu Rồng Trắng" */
  title: string;
  /** Mô tả chi tiết tình huống hiểm nghèo và mục tiêu cụ thể */
  description: string;
  /** Loại nhiệm vụ chiến thuật */
  type: 'rescue' | 'capture' | 'breakthrough' | 'endgame' | 'moyo' | 'strategy';
  /** Tọa độ các quân trọng tâm cần giải cứu hoặc công phá (định dạng SGF: ['kj', 'lj', ...]) */
  targetStones?: string[];
  /** Gợi ý chiến thuật định hướng */
  hint?: string;
  /** Số nước giao tranh cục bộ để xác nhận thành công nhánh sáng tạo (mặc định 4) */
  criticalTurns?: number;
  /** Hệ thống 3 nhiệm vụ tương ứng với 3 sao ⭐⭐⭐ */
  starObjectives?: [StarMissionObjective, StarMissionObjective, StarMissionObjective];
}

// ─── CẤU TRÚC DỮ LIỆU CHÍNH ────────────────────────────────

export interface LegendaryGame {
  /** Mã định danh duy nhất. Ví dụ: "shusaku-ear-reddening-1846" */
  id: string;

  // ── Thông tin kỳ thủ ──
  blackPlayer: LegendaryPlayerInfo;
  whitePlayer: LegendaryPlayerInfo;

  // ── Thông tin giải đấu ──
  /** Tên giải đấu hoặc bối cảnh thi đấu */
  tournament: string;
  /** Năm diễn ra ván đấu */
  year: number;
  /** Kết quả ván đấu (ví dụ: "B+Resign", "W+2.5", "B+3") */
  result: string;
  /** Kích thước bàn cờ (luôn là 19 cho ván chuyên nghiệp) */
  boardSize: 19;
  /** Điểm bù Komi */
  komi: number;

  // ── Cấu hình thử thách & Nhiệm vụ ──
  /**
   * Số thứ tự nước đi mà người chơi được hỏi.
   * Ví dụ: challengeMoveNumber = 78 → hiển thị bàn cờ tại nước 77,
   * hỏi người chơi: "Bạn sẽ đi nước thứ 78 ở đâu?"
   */
  challengeMoveNumber: number;
  /** Bên nào đến lượt đi tại thời điểm thử thách */
  playerToMove: 'black' | 'white';
  /**
   * Tọa độ SGF nước đi thực tế của tuyển thủ (đáp án chính).
   * Ví dụ: "pd" = cột p (16), hàng d (4) → giao điểm Q16
   * Quy ước SGF: chữ cái đầu = cột (a=1 trái), chữ cái sau = hàng (a=1 trên)
   */
  actualMove: string;

  /** Nhiệm vụ chiến thuật cụ thể của ván cờ */
  mission: GameMission;

  // ── Phân loại ──
  era: GameEra;
  category: GameCategory;
  /**
   * Độ khó của thử thách:
   * 1 = Nhập môn (Beginner), 2 = Trung cấp, 3 = Cao cấp,
   * 4 = Chuyên nghiệp (Pro), 5 = Huyền thoại (Legendary)
   */
  difficulty: 1 | 2 | 3 | 4 | 5;

  // ── Nội dung hiển thị (Tiếng Việt) ──
  /** Tên gọi nổi tiếng của ván đấu / nước đi (tiếng Việt) */
  title: string;
  /** Tên tiếng Anh */
  titleEn: string;
  /** Bối cảnh lịch sử, tâm lý trước thời điểm then chốt */
  contextStory: string;
  /** Giải thích tại sao nước đi thực tế của tuyển thủ đặc biệt */
  moveExplanation: string;
  /** Diễn biến và hệ quả sau nước đi then chốt */
  afterStory: string;
  /** Bài học chiến thuật & tư duy mà người học rút ra */
  lesson: string;
  /** Lời điểm đạo / Triết lý ẩn dụ gợi ý tư duy sâu sắc mà không lộ tọa độ */
  crypticHint: string;

  // ── Dữ liệu kỳ phổ SGF ──
  /**
   * Nội dung SGF chứa:
   * - Thế cờ tại thời điểm thử thách (dùng AB[]/AW[] setup stones)
   * - Chuỗi đáp án: nước đi tuyển thủ + diễn biến tiếp theo
   *
   * Format: (;GM[1]FF[4]SZ[19]PB[...]PW[...]
   *          AB[stones...] AW[stones...]
   *          PL[B hoặc W]
   *          ;B[answer];W[response]...)
   *
   * Lưu ý: fullGameSgf (toàn bộ ván đấu) có thể bổ sung sau
   * từ các cơ sở dữ liệu kỳ phổ (GoGoD, Go4Go, Sensei's Library).
   */
  sgf: string;
  /** URL nguồn để xác minh & tải SGF đầy đủ của ván đấu */
  sgfSource?: string;
  /** SGF toàn bộ ván đấu (tùy chọn, bổ sung sau) */
  fullGameSgf?: string;

  // ── Thống kê (khởi tạo mặc định, cập nhật động khi có người chơi) ──
  stats: {
    /** Tổng số lượt thử thách */
    totalAttempts: number;
    /** Tỉ lệ % người chơi đi trùng nước tuyển thủ */
    correctRate: number;
  };
}
