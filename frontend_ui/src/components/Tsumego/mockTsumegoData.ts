// src/components/Tsumego/mockTsumegoData.ts
// Dữ liệu bài tập Tsumego giả lập (hardcode), dùng để test UI trước khi có
// API load đề thật từ Backend. Mỗi bài là 1 chuỗi SGF với AB/AW set thế cờ
// ban đầu, và nhánh chính (main line) chính là lời giải đúng.
//
// Cả 2 ván dưới đây đã được kiểm chứng bằng script độc lập (chạy qua
// sgfParser + goRules thật, không chỉ suy luận bằng tay): puzzle "Bắt quân
// Trắng" xác nhận đúng 2 quân Trắng bị bắt ở nước cuối; puzzle "Cứu quân Đen"
// xác nhận nhóm Đen thoát khỏi tình trạng chỉ còn 1 khí (atari) sau nước đầu.

import type { TsumegoSgfPuzzle } from "../../types/training";

export const MOCK_TSUMEGO_PUZZLES: TsumegoSgfPuzzle[] = [
  {
    id: "tsumego-capture-white-01",
    title: "Bắt quân Trắng",
    difficulty: "beginner",
    instruction: "Đen đi trước. Bắt sống 2 quân Trắng.",
    // AB: cd,ce,ed,ee (tường vây trái/phải) | AW: dd,de (2 quân Trắng cần bắt)
    // Lời giải: B[dc] (áp sát phía trên, dồn Trắng còn 1 khí) -> W[gg] (Trắng
    // tenuki, đi nơi khác vì không cứu được) -> B[df] (bắt trọn 2 quân Trắng).
    sgf: `(;GM[1]FF[4]SZ[9]AB[cd][ce][ed][ee]AW[dd][de];B[dc];W[gg];B[df])`,
  },
  {
    id: "tsumego-save-black-01",
    title: "Cứu quân Đen",
    difficulty: "beginner",
    instruction: "Đen đi trước. Nhóm Đen đang bị vây, tìm nước đi để thoát hiểm.",
    // AB: ff,fg (2 quân Đen đang atari, chỉ còn 1 khí phía trên) | AW: ef,eg,gf,gg,fh (vây quanh)
    // Lời giải: B[fe] (vươn lên thoát atari, có thêm khí) -> W[fd] (Trắng đuổi
    // theo) -> B[ee] (Đen vươn tiếp, củng cố nhóm, thoát an toàn).
    sgf: `(;GM[1]FF[4]SZ[9]AB[ff][fg]AW[ef][eg][gf][gg][fh];B[fe];W[fd];B[ee])`,
  },
];
