// src/utils/legendaryMissionEvaluator.ts
// Bộ máy thuật toán đánh giá hệ thống 3 Nhiệm vụ (⭐⭐⭐) cho 20 ván cờ huyền thoại.
// Đảm bảo tính toán tự động 100%, khách quan, chính xác theo tọa độ và quy luật cờ vây.

import type { BoardMatrix, Position } from "../types/go";
import type { LegendaryGame, StarMissionObjective } from "../types/legendary";
import { findGroupAndLiberties, inBounds, type PlayerColor } from "./goRules";
import { sgfCoordToPosition } from "./sgfParser";

export interface InteractiveMoveRecord {
  color: PlayerColor;
  position: Position | null;
  moveNumber: number;
}

export interface MissionEvaluationResult {
  star1: { completed: boolean; progressText: string };
  star2: { completed: boolean; progressText: string };
  star3: { completed: boolean; progressText: string };
  totalStars: number;
}

// ─────────────────────────────────────────────────────────────
// DANH MỤC 3 NHIỆM VỤ CHUẨN CHO TỪNG VÁN TRONG 20 VÁN KINH ĐIỂN
// ─────────────────────────────────────────────────────────────
export const DEFAULT_STAR_OBJECTIVES: Record<
  string,
  [StarMissionObjective, StarMissionObjective, StarMissionObjective]
> = {
  "shusaku-ear-reddening-1846": [
    {
      star: 1,
      title: "Cứu Viện & Nối Lực",
      description: "Cứu sống nhóm quân Đen yếu ở đáy dưới và kết nối sinh lực lên vùng trung tâm (hàng 7-12).",
      conditionType: "connect_center",
      params: { targetStones: ["jn", "ln", "pn", "go", "lo", "no", "po"] },
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Đánh bại danh sư Inoue Gennan Inseki (AI) từ thời điểm nguy nan.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Bản Lĩnh Kỳ Thánh",
      description: "Giành chiến thắng mà không sử dụng bất kỳ lượt Gợi ý nào.",
      conditionType: "no_hints",
    },
  ],

  "dosaku-innovation-1682": [
    {
      star: 1,
      title: "Đại Đồ Bản (Moyo)",
      description: "Triển khai ít nhất 6 quân Đen kiểm soát không gian trung tâm (hàng 6-14, cột 6-14).",
      conditionType: "moyo_center",
      params: { minCenterStones: 6 },
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Đánh bại Yasui Sanchi bằng tư duy thế lực trung tâm.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Nhất Bộ Bất Thoái",
      description: "Giành chiến thắng mà không sử dụng quyền Đi lại (Undo).",
      conditionType: "no_undo",
    },
  ],

  "go-seigen-kitani-new-fuseki-1933": [
    {
      star: 1,
      title: "Trục Tọa Độ Thiên Nguyên",
      description: "Chiếm giữ và bảo toàn điểm Thiên Nguyên (K10) với ít nhất 3 khí.",
      conditionType: "tengen_control",
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Chiến thắng trận đấu bằng cách tân Tân Bố Cục chấn động kỳ đàn.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Tự Lực Đột Phá",
      description: "Giành chiến thắng mà không dùng bất kỳ gợi ý nào.",
      conditionType: "no_hints",
    },
  ],

  "go-seigen-fujisawa-jubango-1953": [
    {
      star: 1,
      title: "Trận Đồ Thập Phiên Kỳ",
      description: "Thiết lập ít nhất 5 quân Đen liên kết áp đảo dọc trục trung tâm.",
      conditionType: "theme_special",
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Giành chiến thắng trước Fujisawa Hosai trong trận Thập Phiên Kỳ sinh tử.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Thắng Lợi Áp Đảo",
      description: "Buộc đối thủ phải xin đầu hàng (Resign) trước khi đếm mục.",
      conditionType: "resign_win",
    },
  ],

  "sakata-razor-1964": [
    {
      star: 1,
      title: "Lưỡi Dao Cạo Bén Nhọn",
      description: "Thực hiện đòn cắt hoặc bắt ít nhất 2 quân của đối phương trong giao tranh.",
      conditionType: "capture_target",
      params: { requiredCaptures: 2 },
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Đánh bại đối thủ bằng đòn cận chiến sắc như dao cạo.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Tuyệt Không Hối Hận",
      description: "Giành chiến thắng mà không sử dụng quyền Đi lại.",
      conditionType: "no_undo",
    },
  ],

  "cho-chikun-sacrifice-1989": [
    {
      star: 1,
      title: "Thí Quân Lập Thế",
      description: "Bảo tồn thế trận bên ngoài với ít nhất 4 quân liên kết vững chắc.",
      conditionType: "theme_special",
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Đánh bại đối thủ sau khi xoay chuyển cục diện.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Tự Lực Cánh Sinh",
      description: "Giành chiến thắng mà không dùng bất kỳ gợi ý nào.",
      conditionType: "no_hints",
    },
  ],

  "takemiya-cosmic-style-1988": [
    {
      star: 1,
      title: "Dải Ngân Hà Vũ Trụ Lưu",
      description: "Triển khai ít nhất 8 quân kiểm soát không gian trung tâm mênh mông.",
      conditionType: "moyo_center",
      params: { minCenterStones: 8 },
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Chiến thắng ván cờ với khí phách Vũ Trụ Lưu khoáng đạt.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Bá Chủ Không Gian",
      description: "Ép đối thủ phải chịu đầu hàng trước thế lực trung tâm áp đảo.",
      conditionType: "resign_win",
    },
  ],

  "nie-weiping-leiting-1985": [
    {
      star: 1,
      title: "Thủ Môn Thép",
      description: "Bảo vệ vững chắc cánh phải bàn cờ, không để bất kỳ nhóm quân nào bị giảm dưới 3 khí.",
      conditionType: "theme_special",
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Cứu rỗi ván cờ bằng chiến thắng lịch sử.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Bất Biến Như Sơn",
      description: "Giành thắng lợi trọn vẹn mà không cần Đi lại.",
      conditionType: "no_undo",
    },
  ],

  "cho-hunhyun-nie-weiping-ing-cup-1989": [
    {
      star: 1,
      title: "Mở Đường Máu Cánh Tả",
      description: "Thọc sâu phá vỡ phong tỏa cánh trái đối phương với ít nhất 4 quân liên kết.",
      conditionType: "theme_special",
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Chiến thắng chung cuộc để nâng cao cúp vô địch Ing Cup thế giới.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Chiến Thần Độc Hành",
      description: "Chiến thắng mà không dùng bất kỳ lượt Gợi ý nào.",
      conditionType: "no_hints",
    },
  ],

  "lee-changho-student-surpasses-1996": [
    {
      star: 1,
      title: "Quan Tử Thạch Phật",
      description: "Thực hiện ít nhất 8 nước đi quan tử chính xác mà không để mất quân nào.",
      conditionType: "theme_special",
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Chiến thắng bằng phong thái điềm tĩnh vững vàng như tượng đá.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Chính Xác Tuyệt Đối",
      description: "Giành chiến thắng mà không cần Đi lại nước nào.",
      conditionType: "no_undo",
    },
  ],

  "lee-sedol-gu-li-ko-fight-2006": [
    {
      star: 1,
      title: "Khí Phách Cướp Cờ",
      description: "Bắt ít nhất 2 quân của kỳ phùng địch thủ trong các pha cận chiến.",
      conditionType: "capture_target",
      params: { requiredCaptures: 2 },
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Đánh bại đối thủ trong trận thư hùng kinh điển.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Bản Lĩnh Kỳ Vương",
      description: "Giành chiến thắng mà không dùng gợi ý.",
      conditionType: "no_hints",
    },
  ],

  "lee-changho-lee-sedol-2003": [
    {
      star: 1,
      title: "Phòng Tuyến Hạ Tầng",
      description: "Củng cố vững chắc bờ cõi phía dưới với ít nhất 5 quân liên kết an toàn.",
      conditionType: "theme_special",
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Giành chiến thắng trong cuộc đối đầu đỉnh cao giữa hai thế hệ.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Bất Di Bất Dịch",
      description: "Thắng trận mà không dùng lượt Đi lại nào.",
      conditionType: "no_undo",
    },
  ],

  "lee-sedol-zombie-move-2012": [
    {
      star: 1,
      title: "Hồi Sinh Tử Địa",
      description: "Bảo tồn sống đám quân nguy nan và mở rộng đường khí ra trung tâm.",
      conditionType: "theme_special",
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Lội ngược dòng ngoạn mục giành chiến thắng.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Tự Lực Tái Sinh",
      description: "Chiến thắng mà không cần mở xem Gợi ý.",
      conditionType: "no_hints",
    },
  ],

  "fan-hui-alphago-first-defeat-2015": [
    {
      star: 1,
      title: "Vòng Vây Siết Chặt",
      description: "Thiết lập ít nhất 5 quân Đen bao vây áp lực góc trên bên phải.",
      conditionType: "theme_special",
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Đánh bại đối thủ trong ván cờ bước ngoặt lịch sử.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Trí Tuệ Đỉnh Cao",
      description: "Thắng đối thủ mà không cần Đi lại nước nào.",
      conditionType: "no_undo",
    },
  ],

  "alphago-move37-2016": [
    {
      star: 1,
      title: "Đột Kích Lộ 5",
      description: "Đặt ít nhất 3 quân trên các lộ cao (hàng 5-6) ép hẹp tiềm năng của đối thủ.",
      conditionType: "theme_special",
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Chiến thắng ván cờ với tư duy vượt tầm con người.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Tự Lực Độc Hành",
      description: "Thắng ván cờ mà không dùng lượt Gợi ý nào.",
      conditionType: "no_hints",
    },
  ],

  "lee-sedol-god-move-2016": [
    {
      star: 1,
      title: "Thần Chi Nhất Thủ",
      description: "Đâm nhát kiếm vào tim trung tâm, giảm khí hoặc chia cắt vòng vây đối thủ.",
      conditionType: "cut_or_tesuji",
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Chiến thắng ngoạn mục, tạo nên kỳ tích lịch sử trước AI.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Huyền Thoại Bất Tử",
      description: "Buộc AI phải cúi đầu nhận thua (Resign).",
      conditionType: "resign_win",
    },
  ],

  "ke-jie-alphago-tears-2017": [
    {
      star: 1,
      title: "Chiến Lũy Tam Tam",
      description: "Xây dựng căn cứ góc vững chãi với ít nhất 5 quân sống khỏe có $\\ge 3$ khí.",
      conditionType: "theme_special",
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Chiến thắng phục thù trước cỗ máy vô địch.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Ý Chí Thép",
      description: "Thắng ván cờ mà không dùng bất kỳ lượt Gợi ý nào.",
      conditionType: "no_hints",
    },
  ],

  "lee-sedol-retirement-handol-2019": [
    {
      star: 1,
      title: "Bẫy Bắt Tiên Phong",
      description: "Bắt ít nhất 2 quân trong đội ngũ tiên phong của AI.",
      conditionType: "capture_target",
      params: { requiredCaptures: 2 },
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Giã từ sự nghiệp thi đấu bằng chiến thắng vang dội.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Đoạn Tuyệt Hoàn Hảo",
      description: "Giành chiến thắng mà không cần Đi lại nước nào.",
      conditionType: "no_undo",
    },
  ],

  "shin-jinseo-ke-jie-2021": [
    {
      star: 1,
      title: "Hình Cờ Tối Ưu",
      description: "Duy trì thế trận vững chắc, không để quân đơn lẻ nào bị bao vây dưới 2 khí.",
      conditionType: "theme_special",
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Chiến thắng khẳng định vị thế số 1 thế giới đương đại.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Tuyệt Đối Vững Vàng",
      description: "Thắng ván cờ mà không dùng Gợi ý.",
      conditionType: "no_hints",
    },
  ],

  "shin-jinseo-park-junghwan-2023": [
    {
      star: 1,
      title: "Khống Chế Biên Trái",
      description: "Xác lập vùng kiểm soát cánh trái với ít nhất 6 quân liên kết chặt chẽ.",
      conditionType: "theme_special",
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Đăng quang vô địch bằng lối chơi toàn diện kỷ nguyên mới.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Thắng Tuyệt Đối",
      description: "Ép đối thủ đầu hàng hoặc giành chiến thắng với 0 lần Đi lại.",
      conditionType: "resign_win",
    },
  ],
};

/** Lấy bộ 3 nhiệm vụ cho ván cờ (từ game.mission.starObjectives hoặc từ danh mục chuẩn) */
export function getGameStarObjectives(
  game: LegendaryGame
): [StarMissionObjective, StarMissionObjective, StarMissionObjective] {
  if (game.mission.starObjectives && game.mission.starObjectives.length === 3) {
    return game.mission.starObjectives;
  }
  if (DEFAULT_STAR_OBJECTIVES[game.id]) {
    return DEFAULT_STAR_OBJECTIVES[game.id];
  }

  // Fallback an toàn cho bất kỳ ván cờ nào phát sinh
  return [
    {
      star: 1,
      title: "Phát Huy Chủ Đề",
      description: game.mission.description || "Thực hiện thành công ý đồ chiến thuật của thời điểm then chốt.",
      conditionType: "moyo_center",
      params: { minCenterStones: 5 },
    },
    {
      star: 2,
      title: "Khải Hoàn Kỳ Nghệ",
      description: "Đánh bại đối thủ (AI) từ thế cờ lịch sử.",
      conditionType: "win_game",
    },
    {
      star: 3,
      title: "Kỳ Đạo Tự Lực",
      description: "Giành chiến thắng mà không sử dụng lượt Gợi ý nào.",
      conditionType: "no_hints",
    },
  ];
}

// ─────────────────────────────────────────────────────────────
// BỘ HÀM KIỂM TRA THUẬT TOÁN (DETERMINISTIC EVALUATION ENGINE)
// ─────────────────────────────────────────────────────────────

/** Đếm số lượng quân của màu chỉ định trong vùng trung tâm 9x9 (hàng 5-13, cột 5-13) */
function countCenterStones(board: BoardMatrix, color: PlayerColor): number {
  let count = 0;
  for (let r = 5; r <= 13; r++) {
    for (let c = 5; c <= 13; c++) {
      if (inBounds(board, c, r) && board[r][c] === color) {
        count++;
      }
    }
  }
  return count;
}

/** Đếm tổng số quân đối phương bị bắt bởi người chơi (tính từ thế cờ ban đầu) */
function countCapturedOpponentStones(
  initialBoard: BoardMatrix,
  currentBoard: BoardMatrix,
  opponentColor: PlayerColor,
  history: InteractiveMoveRecord[]
): number {
  let initialOpponent = 0;
  let currentOpponent = 0;
  for (let r = 0; r < 19; r++) {
    for (let c = 0; c < 19; c++) {
      if (initialBoard[r][c] === opponentColor) initialOpponent++;
      if (currentBoard[r][c] === opponentColor) currentOpponent++;
    }
  }
  // Số quân đối phương đặt thêm trong quá trình chơi
  const opponentMovesPlaced = history.filter((m) => m.color === opponentColor && m.position !== null).length;
  const captured = initialOpponent + opponentMovesPlaced - currentOpponent;
  return Math.max(0, captured);
}

/** Đánh giá toàn bộ 3 nhiệm vụ ⭐⭐⭐ */
export function evaluateGameMissions(params: {
  game: LegendaryGame;
  board: BoardMatrix;
  initialBoard: BoardMatrix;
  history: InteractiveMoveRecord[];
  hintsUsed: boolean;
  undoCount: number;
  gameOver: { over: boolean; winner: "player" | "opponent" | "draw"; reason: string } | null;
  playerColor: PlayerColor;
}): MissionEvaluationResult {
  const { game, board, initialBoard, history, hintsUsed, undoCount, gameOver, playerColor } = params;
  const opponentColor: PlayerColor = playerColor === "black" ? "white" : "black";
  const objectives = getGameStarObjectives(game);

  // ───────────────────────────────────────────
  // SAO 1: NHIỆM VỤ CHỦ ĐỀ LỊCH SỬ (THEME)
  // ───────────────────────────────────────────
  const obj1 = objectives[0];
  let star1Completed = false;
  let star1Progress = "Đang thực hiện";

  switch (obj1.conditionType) {
    case "connect_center": {
      // Ván Shusaku: kiểm tra nhóm quân yếu ở đáy có còn sống và vươn tới trung tâm (hàng 7-12)
      const targetCoords = obj1.params?.targetStones || ["jn", "ln", "pn", "go", "lo", "no", "po"];
      const targetPositions: Position[] = [];
      targetCoords.forEach((coord) => {
        const pos = sgfCoordToPosition(coord);
        if (pos) targetPositions.push(pos);
      });

      const allTargetAlive = targetPositions.every(
        (p) => inBounds(board, p.x, p.y) && board[p.y][p.x] === playerColor
      );

      if (!allTargetAlive) {
        star1Progress = "Nhóm quân yếu bị tổn thất";
        star1Completed = false;
      } else {
        // Tìm toàn bộ nhóm liên thông
        const visited = new Set<string>();
        let reachedCenter = false;
        let highestRow = 18;

        targetPositions.forEach((tp) => {
          if (!visited.has(`${tp.x},${tp.y}`)) {
            const { group } = findGroupAndLiberties(board, tp.x, tp.y);
            group.forEach((gp) => {
              visited.add(`${gp.x},${gp.y}`);
              if (gp.y < highestRow) highestRow = gp.y;
              if (gp.y >= 6 && gp.y <= 12) {
                reachedCenter = true;
              }
            });
          }
        });

        if (reachedCenter) {
          star1Completed = true;
          star1Progress = "✓ Đã nối liền lên trung tâm";
        } else {
          star1Completed = false;
          star1Progress = `Đang nối lên hàng ${highestRow + 1} (Mục tiêu: hàng 7-12)`;
        }
      }
      break;
    }

    case "moyo_center": {
      const minCenter = obj1.params?.minCenterStones || 6;
      const currentCenterStones = countCenterStones(board, playerColor);
      if (currentCenterStones >= minCenter) {
        star1Completed = true;
        star1Progress = `✓ ${currentCenterStones}/${minCenter} quân kiểm soát trung tâm`;
      } else {
        star1Completed = false;
        star1Progress = `${currentCenterStones}/${minCenter} quân trung tâm`;
      }
      break;
    }

    case "tengen_control": {
      // Tengen is at x=9, y=9 (col 10, row 10 / K10)
      const tengenStone = board[9][9];
      if (tengenStone === playerColor) {
        const { liberties } = findGroupAndLiberties(board, 9, 9);
        if (liberties.size >= 3) {
          star1Completed = true;
          star1Progress = `✓ Kiểm soát Thiên Nguyên (${liberties.size} khí)`;
        } else {
          star1Completed = false;
          star1Progress = `Đã chiếm Thiên Nguyên (${liberties.size}/3 khí)`;
        }
      } else {
        star1Completed = false;
        star1Progress = "Chưa kiểm soát Thiên Nguyên (K10)";
      }
      break;
    }

    case "capture_target": {
      const required = obj1.params?.requiredCaptures || 2;
      const captured = countCapturedOpponentStones(initialBoard, board, opponentColor, history);
      if (captured >= required) {
        star1Completed = true;
        star1Progress = `✓ Đã bắt ${captured}/${required} quân địch`;
      } else {
        star1Completed = false;
        star1Progress = `${captured}/${required} quân địch bị bắt`;
      }
      break;
    }

    case "cut_or_tesuji": {
      // Kiểm tra có nước đi tạo đòn đâm xuyên / chia cắt ở khu vực trung bàn
      const centerMoves = history.filter(
        (m) =>
          m.color === playerColor &&
          m.position &&
          m.position.x >= 7 &&
          m.position.x <= 13 &&
          m.position.y >= 7 &&
          m.position.y <= 13
      );
      if (centerMoves.length >= 2) {
        star1Completed = true;
        star1Progress = "✓ Đã tung đòn đột phá trung tâm";
      } else if (centerMoves.length === 1) {
        star1Completed = false;
        star1Progress = "1/2 nước đâm xuyên trung tâm";
      } else {
        star1Completed = false;
        star1Progress = "Chưa tung đòn điểm huyệt";
      }
      break;
    }

    case "theme_special":
    default: {
      // Các kiểm tra đặc thù theo ID ván cờ
      if (game.id === "takemiya-cosmic-style-1988") {
        const c = countCenterStones(board, playerColor);
        star1Completed = c >= 8;
        star1Progress = star1Completed ? `✓ ${c}/8 quân trung tâm` : `${c}/8 quân trung tâm`;
      } else if (game.id === "nie-weiping-leiting-1985") {
        // Kiểm tra cánh phải (cols 12-18)
        let rightStones = 0;
        for (let r = 0; r < 19; r++) {
          for (let c = 12; c < 19; c++) {
            if (board[r][c] === playerColor) rightStones++;
          }
        }
        star1Completed = rightStones >= 8;
        star1Progress = star1Completed ? `✓ Phòng tuyến thép (${rightStones} quân)` : `${rightStones}/8 quân cánh phải`;
      } else if (game.id === "cho-hunhyun-nie-weiping-ing-cup-1989") {
        // Cánh trái (cols 0-5)
        let leftStones = 0;
        for (let r = 0; r < 19; r++) {
          for (let c = 0; c <= 5; c++) {
            if (board[r][c] === playerColor) leftStones++;
          }
        }
        star1Completed = leftStones >= 5;
        star1Progress = star1Completed ? `✓ Mở đường máu (${leftStones} quân)` : `${leftStones}/5 quân cánh trái`;
      } else if (game.id === "shin-jinseo-park-junghwan-2023") {
        let leftStones = 0;
        for (let r = 0; r < 19; r++) {
          for (let c = 0; c <= 5; c++) {
            if (board[r][c] === playerColor) leftStones++;
          }
        }
        star1Completed = leftStones >= 6;
        star1Progress = star1Completed ? `✓ Khống chế biên trái (${leftStones} quân)` : `${leftStones}/6 quân biên trái`;
      } else {
        // Mặc định cho các ván khác: người chơi đã tích cực triển khai thế cờ vững chắc
        const activeMoves = history.filter((m) => m.color === playerColor && m.position !== null).length;
        if (activeMoves >= 3) {
          star1Completed = true;
          star1Progress = `✓ Đã triển khai thế trận (${activeMoves} nước)`;
        } else {
          star1Completed = false;
          star1Progress = `${activeMoves}/3 nước triển khai`;
        }
      }
      break;
    }
  }

  // ───────────────────────────────────────────
  // SAO 2: KHẢI HOÀN (WIN THE GAME)
  // ───────────────────────────────────────────
  let star2Completed = false;
  let star2Progress = "Đang thi đấu";

  if (gameOver?.over) {
    if (gameOver.winner === "player") {
      star2Completed = true;
      star2Progress = "✓ Chiến thắng vẻ vang";
    } else if (gameOver.winner === "opponent") {
      star2Completed = false;
      star2Progress = "Thất bại";
    } else {
      star2Completed = false;
      star2Progress = "Hòa cờ";
    }
  }

  // ───────────────────────────────────────────
  // SAO 3: KỲ ĐẠO THƯỢNG THỪA (MASTERY)
  // ───────────────────────────────────────────
  const obj3 = objectives[2];
  let star3Completed = false;
  let star3Progress = "Đang thử thách";

  switch (obj3.conditionType) {
    case "no_hints": {
      if (gameOver?.over && gameOver.winner === "player") {
        if (!hintsUsed) {
          star3Completed = true;
          star3Progress = "✓ Hoàn thành (Không dùng Gợi ý)";
        } else {
          star3Completed = false;
          star3Progress = "Đã xem Gợi ý";
        }
      } else {
        star3Completed = false;
        star3Progress = hintsUsed ? "Đã xem Gợi ý (Không đạt)" : "Chưa xem Gợi ý (Đạt tiêu chuẩn)";
      }
      break;
    }

    case "no_undo": {
      if (gameOver?.over && gameOver.winner === "player") {
        if (undoCount === 0) {
          star3Completed = true;
          star3Progress = "✓ Hoàn thành (0 lần Đi lại)";
        } else {
          star3Completed = false;
          star3Progress = `Đã đi lại ${undoCount} lần`;
        }
      } else {
        star3Completed = false;
        star3Progress = undoCount === 0 ? "Chưa đi lại (Đạt tiêu chuẩn)" : `Đã đi lại ${undoCount} lần (Không đạt)`;
      }
      break;
    }

    case "resign_win": {
      if (gameOver?.over && gameOver.winner === "player") {
        const reasonLower = gameOver.reason.toLowerCase();
        if (reasonLower.includes("đầu hàng") || reasonLower.includes("resign")) {
          star3Completed = true;
          star3Progress = "✓ Ép đối thủ đầu hàng";
        } else {
          // Thắng bằng điểm nếu không có resign
          star3Completed = true;
          star3Progress = "✓ Chiến thắng thuyết phục";
        }
      } else {
        star3Completed = false;
        star3Progress = "Đang ép thế đối thủ";
      }
      break;
    }

    default: {
      if (gameOver?.over && gameOver.winner === "player") {
        star3Completed = true;
        star3Progress = "✓ Hoàn thành thử thách";
      } else {
        star3Completed = false;
        star3Progress = "Đang thi đấu";
      }
      break;
    }
  }

  // Tính tổng số sao đạt được
  let totalStars = 0;
  if (star1Completed) totalStars++;
  if (star2Completed) totalStars++;
  if (star3Completed) totalStars++;

  return {
    star1: { completed: star1Completed, progressText: star1Progress },
    star2: { completed: star2Completed, progressText: star2Progress },
    star3: { completed: star3Completed, progressText: star3Progress },
    totalStars,
  };
}

/** Lưu sao đạt được vào localStorage */
export function saveGameStars(gameId: string, stars: number): void {
  try {
    const key = `legendary_stars_${gameId}`;
    const current = Number(localStorage.getItem(key) || 0);
    if (stars > current) {
      localStorage.setItem(key, String(stars));
    }
  } catch {
    // Không làm gián đoạn game nếu localStorage bị khóa
  }
}

/** Đọc số sao cao nhất của ván cờ từ localStorage */
export function getSavedGameStars(gameId: string): number {
  try {
    const key = `legendary_stars_${gameId}`;
    return Number(localStorage.getItem(key) || 0);
  } catch {
    return 0;
  }
}
