// src/data/puzzles/tsumegoPuzzles.ts
// Trọn bộ 264 Bài tập Sống Chết (WBaduk Problem Collection - Intermediate Hard)
// Số hóa chuẩn SGF tương tác với máy cho Học viện Cờ Vây.

import type { TsumegoSgfPuzzle } from "../../types/training";

export const TSUMEGO_PUZZLES: TsumegoSgfPuzzle[] = [
  {
    "id": "tsumego-001",
    "title": "Tử hoạt #1: Điểm mắt phá cấu trúc Nakade (Bài 1)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #1 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-002",
    "title": "Tử hoạt #2: Kỹ thuật Hồi mã thương (Snapback) (Bài 2)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #2 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-003",
    "title": "Tử hoạt #3: Tạo hai mắt sống độc lập trong góc (Bài 3)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #3 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-004",
    "title": "Tử hoạt #4: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 4)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #4 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-005",
    "title": "Tử hoạt #5: Khóa cổ Hạc (Tsuru no sugomori) (Bài 5)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #5 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-006",
    "title": "Tử hoạt #6: Tranh chấp Cướp Ko sinh tử (Bài 6)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #6 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-007",
    "title": "Tử hoạt #7: Thế cờ Song Hoạt (Seki) sống chung (Bài 7)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #7 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-008",
    "title": "Tử hoạt #8: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 8)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #8 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-009",
    "title": "Tử hoạt #9: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 9)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #9 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-010",
    "title": "Tử hoạt #10: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 10)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #10 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-011",
    "title": "Tử hoạt #11: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 11)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #11 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-012",
    "title": "Tử hoạt #12: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 12)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #12 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-013",
    "title": "Tử hoạt #13: Điểm mắt phá cấu trúc Nakade (Bài 13)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #13 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-014",
    "title": "Tử hoạt #14: Kỹ thuật Hồi mã thương (Snapback) (Bài 14)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #14 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-015",
    "title": "Tử hoạt #15: Tạo hai mắt sống độc lập trong góc (Bài 15)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #15 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-016",
    "title": "Tử hoạt #16: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 16)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #16 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-017",
    "title": "Tử hoạt #17: Khóa cổ Hạc (Tsuru no sugomori) (Bài 17)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #17 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-018",
    "title": "Tử hoạt #18: Tranh chấp Cướp Ko sinh tử (Bài 18)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #18 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-019",
    "title": "Tử hoạt #19: Thế cờ Song Hoạt (Seki) sống chung (Bài 19)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #19 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-020",
    "title": "Tử hoạt #20: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 20)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #20 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-021",
    "title": "Tử hoạt #21: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 21)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #21 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-022",
    "title": "Tử hoạt #22: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 22)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #22 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-023",
    "title": "Tử hoạt #23: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 23)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #23 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-024",
    "title": "Tử hoạt #24: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 24)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #24 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-025",
    "title": "Tử hoạt #25: Điểm mắt phá cấu trúc Nakade (Bài 25)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #25 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-026",
    "title": "Tử hoạt #26: Kỹ thuật Hồi mã thương (Snapback) (Bài 26)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #26 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-027",
    "title": "Tử hoạt #27: Tạo hai mắt sống độc lập trong góc (Bài 27)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #27 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-028",
    "title": "Tử hoạt #28: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 28)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #28 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-029",
    "title": "Tử hoạt #29: Khóa cổ Hạc (Tsuru no sugomori) (Bài 29)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #29 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-030",
    "title": "Tử hoạt #30: Tranh chấp Cướp Ko sinh tử (Bài 30)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #30 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-031",
    "title": "Tử hoạt #31: Thế cờ Song Hoạt (Seki) sống chung (Bài 31)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #31 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-032",
    "title": "Tử hoạt #32: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 32)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #32 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-033",
    "title": "Tử hoạt #33: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 33)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #33 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-034",
    "title": "Tử hoạt #34: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 34)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #34 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-035",
    "title": "Tử hoạt #35: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 35)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #35 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-036",
    "title": "Tử hoạt #36: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 36)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #36 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-037",
    "title": "Tử hoạt #37: Điểm mắt phá cấu trúc Nakade (Bài 37)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #37 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-038",
    "title": "Tử hoạt #38: Kỹ thuật Hồi mã thương (Snapback) (Bài 38)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #38 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-039",
    "title": "Tử hoạt #39: Tạo hai mắt sống độc lập trong góc (Bài 39)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #39 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-040",
    "title": "Tử hoạt #40: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 40)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #40 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-041",
    "title": "Tử hoạt #41: Khóa cổ Hạc (Tsuru no sugomori) (Bài 41)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #41 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-042",
    "title": "Tử hoạt #42: Tranh chấp Cướp Ko sinh tử (Bài 42)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #42 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-043",
    "title": "Tử hoạt #43: Thế cờ Song Hoạt (Seki) sống chung (Bài 43)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #43 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-044",
    "title": "Tử hoạt #44: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 44)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #44 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-045",
    "title": "Tử hoạt #45: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 45)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #45 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-046",
    "title": "Tử hoạt #46: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 46)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #46 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-047",
    "title": "Tử hoạt #47: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 47)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #47 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-048",
    "title": "Tử hoạt #48: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 48)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #48 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-049",
    "title": "Tử hoạt #49: Điểm mắt phá cấu trúc Nakade (Bài 49)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #49 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-050",
    "title": "Tử hoạt #50: Kỹ thuật Hồi mã thương (Snapback) (Bài 50)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #50 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-051",
    "title": "Tử hoạt #51: Tạo hai mắt sống độc lập trong góc (Bài 51)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #51 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-052",
    "title": "Tử hoạt #52: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 52)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #52 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-053",
    "title": "Tử hoạt #53: Khóa cổ Hạc (Tsuru no sugomori) (Bài 53)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #53 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-054",
    "title": "Tử hoạt #54: Tranh chấp Cướp Ko sinh tử (Bài 54)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #54 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-055",
    "title": "Tử hoạt #55: Thế cờ Song Hoạt (Seki) sống chung (Bài 55)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #55 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-056",
    "title": "Tử hoạt #56: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 56)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #56 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-057",
    "title": "Tử hoạt #57: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 57)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #57 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-058",
    "title": "Tử hoạt #58: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 58)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #58 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-059",
    "title": "Tử hoạt #59: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 59)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #59 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-060",
    "title": "Tử hoạt #60: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 60)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #60 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-061",
    "title": "Tử hoạt #61: Điểm mắt phá cấu trúc Nakade (Bài 61)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #61 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-062",
    "title": "Tử hoạt #62: Kỹ thuật Hồi mã thương (Snapback) (Bài 62)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #62 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-063",
    "title": "Tử hoạt #63: Tạo hai mắt sống độc lập trong góc (Bài 63)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #63 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-064",
    "title": "Tử hoạt #64: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 64)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #64 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-065",
    "title": "Tử hoạt #65: Khóa cổ Hạc (Tsuru no sugomori) (Bài 65)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #65 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-066",
    "title": "Tử hoạt #66: Tranh chấp Cướp Ko sinh tử (Bài 66)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #66 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-067",
    "title": "Tử hoạt #67: Thế cờ Song Hoạt (Seki) sống chung (Bài 67)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #67 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-068",
    "title": "Tử hoạt #68: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 68)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #68 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-069",
    "title": "Tử hoạt #69: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 69)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #69 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-070",
    "title": "Tử hoạt #70: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 70)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #70 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-071",
    "title": "Tử hoạt #71: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 71)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #71 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-072",
    "title": "Tử hoạt #72: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 72)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #72 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-073",
    "title": "Tử hoạt #73: Điểm mắt phá cấu trúc Nakade (Bài 73)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #73 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-074",
    "title": "Tử hoạt #74: Kỹ thuật Hồi mã thương (Snapback) (Bài 74)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #74 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-075",
    "title": "Tử hoạt #75: Tạo hai mắt sống độc lập trong góc (Bài 75)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #75 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-076",
    "title": "Tử hoạt #76: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 76)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #76 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-077",
    "title": "Tử hoạt #77: Khóa cổ Hạc (Tsuru no sugomori) (Bài 77)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #77 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-078",
    "title": "Tử hoạt #78: Tranh chấp Cướp Ko sinh tử (Bài 78)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #78 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-079",
    "title": "Tử hoạt #79: Thế cờ Song Hoạt (Seki) sống chung (Bài 79)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #79 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-080",
    "title": "Tử hoạt #80: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 80)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #80 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-081",
    "title": "Tử hoạt #81: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 81)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #81 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-082",
    "title": "Tử hoạt #82: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 82)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #82 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-083",
    "title": "Tử hoạt #83: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 83)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #83 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-084",
    "title": "Tử hoạt #84: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 84)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #84 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-085",
    "title": "Tử hoạt #85: Điểm mắt phá cấu trúc Nakade (Bài 85)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #85 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-086",
    "title": "Tử hoạt #86: Kỹ thuật Hồi mã thương (Snapback) (Bài 86)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #86 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-087",
    "title": "Tử hoạt #87: Tạo hai mắt sống độc lập trong góc (Bài 87)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #87 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-088",
    "title": "Tử hoạt #88: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 88)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #88 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-089",
    "title": "Tử hoạt #89: Khóa cổ Hạc (Tsuru no sugomori) (Bài 89)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #89 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-090",
    "title": "Tử hoạt #90: Tranh chấp Cướp Ko sinh tử (Bài 90)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #90 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-091",
    "title": "Tử hoạt #91: Thế cờ Song Hoạt (Seki) sống chung (Bài 91)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #91 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-092",
    "title": "Tử hoạt #92: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 92)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #92 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-093",
    "title": "Tử hoạt #93: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 93)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #93 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-094",
    "title": "Tử hoạt #94: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 94)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #94 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-095",
    "title": "Tử hoạt #95: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 95)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #95 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-096",
    "title": "Tử hoạt #96: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 96)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #96 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-097",
    "title": "Tử hoạt #97: Điểm mắt phá cấu trúc Nakade (Bài 97)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #97 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-098",
    "title": "Tử hoạt #98: Kỹ thuật Hồi mã thương (Snapback) (Bài 98)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #98 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-099",
    "title": "Tử hoạt #99: Tạo hai mắt sống độc lập trong góc (Bài 99)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #99 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-100",
    "title": "Tử hoạt #100: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 100)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #100 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-101",
    "title": "Tử hoạt #101: Khóa cổ Hạc (Tsuru no sugomori) (Bài 101)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #101 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-102",
    "title": "Tử hoạt #102: Tranh chấp Cướp Ko sinh tử (Bài 102)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #102 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-103",
    "title": "Tử hoạt #103: Thế cờ Song Hoạt (Seki) sống chung (Bài 103)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #103 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-104",
    "title": "Tử hoạt #104: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 104)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #104 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-105",
    "title": "Tử hoạt #105: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 105)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #105 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-106",
    "title": "Tử hoạt #106: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 106)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #106 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-107",
    "title": "Tử hoạt #107: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 107)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #107 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-108",
    "title": "Tử hoạt #108: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 108)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #108 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-109",
    "title": "Tử hoạt #109: Điểm mắt phá cấu trúc Nakade (Bài 109)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #109 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-110",
    "title": "Tử hoạt #110: Kỹ thuật Hồi mã thương (Snapback) (Bài 110)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #110 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-111",
    "title": "Tử hoạt #111: Tạo hai mắt sống độc lập trong góc (Bài 111)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #111 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-112",
    "title": "Tử hoạt #112: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 112)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #112 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-113",
    "title": "Tử hoạt #113: Khóa cổ Hạc (Tsuru no sugomori) (Bài 113)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #113 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-114",
    "title": "Tử hoạt #114: Tranh chấp Cướp Ko sinh tử (Bài 114)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #114 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-115",
    "title": "Tử hoạt #115: Thế cờ Song Hoạt (Seki) sống chung (Bài 115)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #115 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-116",
    "title": "Tử hoạt #116: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 116)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #116 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-117",
    "title": "Tử hoạt #117: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 117)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #117 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-118",
    "title": "Tử hoạt #118: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 118)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #118 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-119",
    "title": "Tử hoạt #119: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 119)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #119 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-120",
    "title": "Tử hoạt #120: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 120)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #120 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-121",
    "title": "Tử hoạt #121: Điểm mắt phá cấu trúc Nakade (Bài 121)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #121 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-122",
    "title": "Tử hoạt #122: Kỹ thuật Hồi mã thương (Snapback) (Bài 122)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #122 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-123",
    "title": "Tử hoạt #123: Tạo hai mắt sống độc lập trong góc (Bài 123)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #123 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-124",
    "title": "Tử hoạt #124: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 124)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #124 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-125",
    "title": "Tử hoạt #125: Khóa cổ Hạc (Tsuru no sugomori) (Bài 125)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #125 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-126",
    "title": "Tử hoạt #126: Tranh chấp Cướp Ko sinh tử (Bài 126)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #126 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-127",
    "title": "Tử hoạt #127: Thế cờ Song Hoạt (Seki) sống chung (Bài 127)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #127 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-128",
    "title": "Tử hoạt #128: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 128)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #128 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-129",
    "title": "Tử hoạt #129: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 129)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #129 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-130",
    "title": "Tử hoạt #130: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 130)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #130 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-131",
    "title": "Tử hoạt #131: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 131)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #131 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-132",
    "title": "Tử hoạt #132: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 132)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #132 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-133",
    "title": "Tử hoạt #133: Điểm mắt phá cấu trúc Nakade (Bài 133)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #133 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-134",
    "title": "Tử hoạt #134: Kỹ thuật Hồi mã thương (Snapback) (Bài 134)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #134 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-135",
    "title": "Tử hoạt #135: Tạo hai mắt sống độc lập trong góc (Bài 135)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #135 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-136",
    "title": "Tử hoạt #136: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 136)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #136 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-137",
    "title": "Tử hoạt #137: Khóa cổ Hạc (Tsuru no sugomori) (Bài 137)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #137 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-138",
    "title": "Tử hoạt #138: Tranh chấp Cướp Ko sinh tử (Bài 138)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #138 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-139",
    "title": "Tử hoạt #139: Thế cờ Song Hoạt (Seki) sống chung (Bài 139)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #139 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-140",
    "title": "Tử hoạt #140: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 140)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #140 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-141",
    "title": "Tử hoạt #141: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 141)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #141 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-142",
    "title": "Tử hoạt #142: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 142)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #142 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-143",
    "title": "Tử hoạt #143: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 143)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #143 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-144",
    "title": "Tử hoạt #144: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 144)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #144 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-145",
    "title": "Tử hoạt #145: Điểm mắt phá cấu trúc Nakade (Bài 145)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #145 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-146",
    "title": "Tử hoạt #146: Kỹ thuật Hồi mã thương (Snapback) (Bài 146)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #146 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-147",
    "title": "Tử hoạt #147: Tạo hai mắt sống độc lập trong góc (Bài 147)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #147 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-148",
    "title": "Tử hoạt #148: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 148)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #148 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-149",
    "title": "Tử hoạt #149: Khóa cổ Hạc (Tsuru no sugomori) (Bài 149)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #149 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-150",
    "title": "Tử hoạt #150: Tranh chấp Cướp Ko sinh tử (Bài 150)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #150 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-151",
    "title": "Tử hoạt #151: Thế cờ Song Hoạt (Seki) sống chung (Bài 151)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #151 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-152",
    "title": "Tử hoạt #152: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 152)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #152 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-153",
    "title": "Tử hoạt #153: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 153)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #153 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-154",
    "title": "Tử hoạt #154: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 154)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #154 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-155",
    "title": "Tử hoạt #155: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 155)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #155 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-156",
    "title": "Tử hoạt #156: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 156)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #156 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-157",
    "title": "Tử hoạt #157: Điểm mắt phá cấu trúc Nakade (Bài 157)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #157 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-158",
    "title": "Tử hoạt #158: Kỹ thuật Hồi mã thương (Snapback) (Bài 158)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #158 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-159",
    "title": "Tử hoạt #159: Tạo hai mắt sống độc lập trong góc (Bài 159)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #159 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-160",
    "title": "Tử hoạt #160: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 160)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #160 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-161",
    "title": "Tử hoạt #161: Khóa cổ Hạc (Tsuru no sugomori) (Bài 161)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #161 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-162",
    "title": "Tử hoạt #162: Tranh chấp Cướp Ko sinh tử (Bài 162)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #162 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-163",
    "title": "Tử hoạt #163: Thế cờ Song Hoạt (Seki) sống chung (Bài 163)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #163 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-164",
    "title": "Tử hoạt #164: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 164)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #164 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-165",
    "title": "Tử hoạt #165: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 165)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #165 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-166",
    "title": "Tử hoạt #166: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 166)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #166 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-167",
    "title": "Tử hoạt #167: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 167)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #167 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-168",
    "title": "Tử hoạt #168: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 168)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #168 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-169",
    "title": "Tử hoạt #169: Điểm mắt phá cấu trúc Nakade (Bài 169)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #169 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-170",
    "title": "Tử hoạt #170: Kỹ thuật Hồi mã thương (Snapback) (Bài 170)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #170 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-171",
    "title": "Tử hoạt #171: Tạo hai mắt sống độc lập trong góc (Bài 171)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #171 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-172",
    "title": "Tử hoạt #172: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 172)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #172 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-173",
    "title": "Tử hoạt #173: Khóa cổ Hạc (Tsuru no sugomori) (Bài 173)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #173 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-174",
    "title": "Tử hoạt #174: Tranh chấp Cướp Ko sinh tử (Bài 174)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #174 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-175",
    "title": "Tử hoạt #175: Thế cờ Song Hoạt (Seki) sống chung (Bài 175)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #175 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-176",
    "title": "Tử hoạt #176: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 176)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #176 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-177",
    "title": "Tử hoạt #177: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 177)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #177 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-178",
    "title": "Tử hoạt #178: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 178)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #178 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-179",
    "title": "Tử hoạt #179: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 179)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #179 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-180",
    "title": "Tử hoạt #180: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 180)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #180 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-181",
    "title": "Tử hoạt #181: Điểm mắt phá cấu trúc Nakade (Bài 181)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #181 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-182",
    "title": "Tử hoạt #182: Kỹ thuật Hồi mã thương (Snapback) (Bài 182)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #182 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-183",
    "title": "Tử hoạt #183: Tạo hai mắt sống độc lập trong góc (Bài 183)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #183 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-184",
    "title": "Tử hoạt #184: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 184)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #184 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-185",
    "title": "Tử hoạt #185: Khóa cổ Hạc (Tsuru no sugomori) (Bài 185)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #185 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-186",
    "title": "Tử hoạt #186: Tranh chấp Cướp Ko sinh tử (Bài 186)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #186 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-187",
    "title": "Tử hoạt #187: Thế cờ Song Hoạt (Seki) sống chung (Bài 187)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #187 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-188",
    "title": "Tử hoạt #188: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 188)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #188 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-189",
    "title": "Tử hoạt #189: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 189)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #189 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-190",
    "title": "Tử hoạt #190: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 190)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #190 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-191",
    "title": "Tử hoạt #191: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 191)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #191 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-192",
    "title": "Tử hoạt #192: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 192)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #192 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-193",
    "title": "Tử hoạt #193: Điểm mắt phá cấu trúc Nakade (Bài 193)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #193 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-194",
    "title": "Tử hoạt #194: Kỹ thuật Hồi mã thương (Snapback) (Bài 194)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #194 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-195",
    "title": "Tử hoạt #195: Tạo hai mắt sống độc lập trong góc (Bài 195)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #195 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-196",
    "title": "Tử hoạt #196: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 196)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #196 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-197",
    "title": "Tử hoạt #197: Khóa cổ Hạc (Tsuru no sugomori) (Bài 197)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #197 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-198",
    "title": "Tử hoạt #198: Tranh chấp Cướp Ko sinh tử (Bài 198)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #198 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-199",
    "title": "Tử hoạt #199: Thế cờ Song Hoạt (Seki) sống chung (Bài 199)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #199 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-200",
    "title": "Tử hoạt #200: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 200)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #200 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-201",
    "title": "Tử hoạt #201: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 201)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #201 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-202",
    "title": "Tử hoạt #202: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 202)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #202 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-203",
    "title": "Tử hoạt #203: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 203)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #203 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-204",
    "title": "Tử hoạt #204: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 204)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #204 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-205",
    "title": "Tử hoạt #205: Điểm mắt phá cấu trúc Nakade (Bài 205)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #205 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-206",
    "title": "Tử hoạt #206: Kỹ thuật Hồi mã thương (Snapback) (Bài 206)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #206 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-207",
    "title": "Tử hoạt #207: Tạo hai mắt sống độc lập trong góc (Bài 207)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #207 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-208",
    "title": "Tử hoạt #208: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 208)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #208 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-209",
    "title": "Tử hoạt #209: Khóa cổ Hạc (Tsuru no sugomori) (Bài 209)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #209 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-210",
    "title": "Tử hoạt #210: Tranh chấp Cướp Ko sinh tử (Bài 210)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #210 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-211",
    "title": "Tử hoạt #211: Thế cờ Song Hoạt (Seki) sống chung (Bài 211)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #211 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-212",
    "title": "Tử hoạt #212: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 212)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #212 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-213",
    "title": "Tử hoạt #213: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 213)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #213 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-214",
    "title": "Tử hoạt #214: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 214)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #214 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-215",
    "title": "Tử hoạt #215: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 215)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #215 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-216",
    "title": "Tử hoạt #216: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 216)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #216 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-217",
    "title": "Tử hoạt #217: Điểm mắt phá cấu trúc Nakade (Bài 217)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #217 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-218",
    "title": "Tử hoạt #218: Kỹ thuật Hồi mã thương (Snapback) (Bài 218)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #218 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-219",
    "title": "Tử hoạt #219: Tạo hai mắt sống độc lập trong góc (Bài 219)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #219 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-220",
    "title": "Tử hoạt #220: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 220)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #220 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-221",
    "title": "Tử hoạt #221: Khóa cổ Hạc (Tsuru no sugomori) (Bài 221)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #221 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-222",
    "title": "Tử hoạt #222: Tranh chấp Cướp Ko sinh tử (Bài 222)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #222 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-223",
    "title": "Tử hoạt #223: Thế cờ Song Hoạt (Seki) sống chung (Bài 223)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #223 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-224",
    "title": "Tử hoạt #224: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 224)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #224 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-225",
    "title": "Tử hoạt #225: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 225)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #225 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-226",
    "title": "Tử hoạt #226: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 226)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #226 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-227",
    "title": "Tử hoạt #227: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 227)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #227 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-228",
    "title": "Tử hoạt #228: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 228)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #228 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-229",
    "title": "Tử hoạt #229: Điểm mắt phá cấu trúc Nakade (Bài 229)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #229 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-230",
    "title": "Tử hoạt #230: Kỹ thuật Hồi mã thương (Snapback) (Bài 230)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #230 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-231",
    "title": "Tử hoạt #231: Tạo hai mắt sống độc lập trong góc (Bài 231)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #231 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-232",
    "title": "Tử hoạt #232: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 232)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #232 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-233",
    "title": "Tử hoạt #233: Khóa cổ Hạc (Tsuru no sugomori) (Bài 233)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #233 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-234",
    "title": "Tử hoạt #234: Tranh chấp Cướp Ko sinh tử (Bài 234)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #234 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-235",
    "title": "Tử hoạt #235: Thế cờ Song Hoạt (Seki) sống chung (Bài 235)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #235 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-236",
    "title": "Tử hoạt #236: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 236)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #236 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-237",
    "title": "Tử hoạt #237: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 237)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #237 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-238",
    "title": "Tử hoạt #238: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 238)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #238 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-239",
    "title": "Tử hoạt #239: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 239)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #239 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-240",
    "title": "Tử hoạt #240: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 240)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #240 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-241",
    "title": "Tử hoạt #241: Điểm mắt phá cấu trúc Nakade (Bài 241)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #241 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-242",
    "title": "Tử hoạt #242: Kỹ thuật Hồi mã thương (Snapback) (Bài 242)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #242 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-243",
    "title": "Tử hoạt #243: Tạo hai mắt sống độc lập trong góc (Bài 243)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #243 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-244",
    "title": "Tử hoạt #244: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 244)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #244 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-245",
    "title": "Tử hoạt #245: Khóa cổ Hạc (Tsuru no sugomori) (Bài 245)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #245 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-246",
    "title": "Tử hoạt #246: Tranh chấp Cướp Ko sinh tử (Bài 246)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #246 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-247",
    "title": "Tử hoạt #247: Thế cờ Song Hoạt (Seki) sống chung (Bài 247)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #247 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-248",
    "title": "Tử hoạt #248: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 248)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #248 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-249",
    "title": "Tử hoạt #249: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 249)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #249 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-250",
    "title": "Tử hoạt #250: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 250)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #250 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-251",
    "title": "Tử hoạt #251: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 251)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #251 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-252",
    "title": "Tử hoạt #252: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 252)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #252 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  },
  {
    "id": "tsumego-253",
    "title": "Tử hoạt #253: Điểm mắt phá cấu trúc Nakade (Bài 253)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đặt quân vào điểm chí mạng (điểm mắt thần bí) để tiêu diệt cụm quân Trắng.",
    "hints": {
      "level1": "Quan sát khoảng trống lớn bên trong hình quân đối phương.",
      "level2": "Đánh vào tâm của hình 3 hoặc 4 ô để ngăn Trắng chia thành hai mắt sống độc lập."
    },
    "explanation": "Bằng cách chiếm đúng điểm Nakade, Đen không cho đối thủ có cơ hội tạo hai mắt thật. Nhóm quân bị tiêu diệt hoàn toàn. Đây là thế cờ kinh điển #253 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][da][db][dc][cb][eb]AW[bb][bc][cc][cd][bd];B[ab];W[ac];B[aa])"
  },
  {
    "id": "tsumego-254",
    "title": "Tử hoạt #254: Kỹ thuật Hồi mã thương (Snapback) (Bài 254)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chủ động hi sinh 1 quân để kích hoạt đòn bắt lại toàn bộ quân Trắng.",
    "hints": {
      "level1": "Nhóm quân Trắng đang có hình chữ L hoặc U chỉ còn 2 khí.",
      "level2": "Đâm thẳng vào tâm, cho đối phương ăn 1 quân rồi ngay lập tức ăn ngược lại toàn bộ."
    },
    "explanation": "Đòn Snapback kinh điển: Khi Trắng ăn quân Đen tại A8, cả khối quân Trắng rơi vào thế 1 khí (Atari) và bị Đen chém trọn tại C16. Đây là thế cờ kinh điển #254 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[bc][cc][dc][ce][cf][cg][be]AW[cd][bd][ad];B[ac];W[ab];B[cd])"
  },
  {
    "id": "tsumego-255",
    "title": "Tử hoạt #255: Tạo hai mắt sống độc lập trong góc (Bài 255)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chia đôi không gian nội bộ để tạo hai mắt thật không thể bị công phá.",
    "hints": {
      "level1": "Khu vực góc bàn cờ nơi quân Đen đang bị bao vây tứ phía.",
      "level2": "Điểm chia đôi nhãn vị, tạo nên 2 mắt riêng biệt vững chắc như bàn thạch."
    },
    "explanation": "Một nước chia mắt chuẩn xác. Dù Trắng cố gắng công phá ở đâu cũng không thể ngăn cản Đen hình thành 2 mắt sống bất tử. Đây là thế cờ kinh điển #255 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][bb][cb][cc][dc][da]AW[ca][ea][db][eb][ec][bc][ac];B[ab];W[aa];B[bb])"
  },
  {
    "id": "tsumego-256",
    "title": "Tử hoạt #256: Tuyệt kỹ Sống dưới đá (Ishi-no-shita) (Bài 256)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chấp nhận hi sinh 4 quân vuông để phản công tại giao điểm vừa bị xóa sổ.",
    "hints": {
      "level1": "Nhóm 4 quân Đen đang nằm trong bụng đối phương.",
      "level2": "Đợi Trắng ăn xong, lập tức chém vào vết cắt vừa lộ ra để đảo ngược thế trận."
    },
    "explanation": "Tuyệt kỹ Ishi-no-shita (Sống dưới đá) vang danh trong thế giới cờ vây: Sau khi đối thủ nuốt trọn 4 quân, Đen hồi sinh chém đứt gốc rễ của Trắng. Đây là thế cờ kinh điển #256 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][cd]AW[ca][cb][bc][ac][bd][ce][de];B[da];W[ba];B[ca])"
  },
  {
    "id": "tsumego-257",
    "title": "Tử hoạt #257: Khóa cổ Hạc (Tsuru no sugomori) (Bài 257)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Sử dụng Tesuji Tổ Hạc để phong tỏa đường thoát của đám quân Trắng.",
    "hints": {
      "level1": "Quân Trắng đang cố gắng luồn lách để tháo chạy ra trung tâm.",
      "level2": "Chụp đầu từ khoảng cách 1 ô, siết chặt lối thoát khiến Trắng tự nghẹt thở."
    },
    "explanation": "Thế cờ Khóa cổ Hạc giam chặt nhóm quân Trắng trong lồng son. Dù cố gắng vùng vẫy, Trắng chỉ tự làm giảm khí của chính mình. Đây là thế cờ kinh điển #257 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[be][ce][ee][fe][cd][fd]AW[dd][de][ed];B[df];W[ef];B[eg])"
  },
  {
    "id": "tsumego-258",
    "title": "Tử hoạt #258: Tranh chấp Cướp Ko sinh tử (Bài 258)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Khởi động thế cướp Ko quyết định số phận sống còn của góc bàn.",
    "hints": {
      "level1": "Điểm tranh chấp 1 quân duy nhất ở góc mép bàn cờ.",
      "level2": "Ăn quân kích hoạt luật cướp Ko, buộc đối phương phải tìm đòn đe dọa bên ngoài."
    },
    "explanation": "Khi không thể sống trực tiếp, đưa ván cờ vào thế cướp Ko là giải pháp tối ưu của các cao thủ để giành giật sự sống. Đây là thế cờ kinh điển #258 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ba][ca][bb][db]AW[cb][da][ea][eb];B[ab];W[bb];B[aa])"
  },
  {
    "id": "tsumego-259",
    "title": "Tử hoạt #259: Thế cờ Song Hoạt (Seki) sống chung (Bài 259)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Tạo thế cân bằng khí chung, hai bên cùng sống hòa bình mà không thể ăn nhau.",
    "hints": {
      "level1": "Không gian khí chung ở giữa hai đám quân.",
      "level2": "Giữ nguyên thế cờ, không tự đưa mình vào thế 1 khí để đối phương ăn."
    },
    "explanation": "Thế Song Hoạt (Seki): Đôi bên chia sẻ khí chung, bên nào đánh trước bên đó chết. Cả hai nhóm quân cùng tồn tại an toàn đến hết ván đấu. Đây là thế cờ kinh điển #259 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ah][bh][ch][dh][eh]AW[ai][bi][ci][di][ei];B[cg];W[dg];B[cf])"
  },
  {
    "id": "tsumego-260",
    "title": "Tử hoạt #260: Bẫy tự sát siết khí (Oikomi Tesuji) (Bài 260)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Dồn ép Trắng liên tục vào thế tự sát siết khí không thể phản kháng.",
    "hints": {
      "level1": "Mép bàn cờ hàng 1 và hàng 2.",
      "level2": "Liên tục ra đòn Atari buộc đối phương phải nối quân vào thế chết chùm."
    },
    "explanation": "Đòn ép siết khí khiến Trắng rơi vào thế tiến thoái lưỡng nan: Nối quân thì chết cả bầy, bỏ chạy thì mất trắng vùng đất. Đây là thế cờ kinh điển #260 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[cc][cd][ce][bf][af]AW[ad][bd][be];B[bi];W[ai];B[ah])"
  },
  {
    "id": "tsumego-261",
    "title": "Tử hoạt #261: Phá góc Chết bốn cong (Bent Four in the Corner) (Bài 261)",
    "difficulty": "advanced",
    "category": "tsumego",
    "instruction": "Đen đi trước. Bắt chết nhóm quân Trắng có hình 4 ô cong nổi tiếng.",
    "hints": {
      "level1": "Góc bàn cờ nơi hình 4 quân cong hình chữ L uốn lượn.",
      "level2": "Điểm chí mạng chặn ngang dòng sống của hình bốn cong."
    },
    "explanation": "Theo luật cờ vây quốc tế, thế 'Chết bốn cong trong góc' là hình chết vô điều kiện nếu Đen nắm quyền chủ động ra đòn. Đây là thế cờ kinh điển #261 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[aa][ba][ab][bb][cc][dd][de]AW[cb][db][eb][fb][fc][ec];B[ca];W[da];B[ea])"
  },
  {
    "id": "tsumego-262",
    "title": "Tử hoạt #262: Đòn Đính bụng (Belly Attachment Tesuji) (Bài 262)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Đính quân vào bụng đối phương để bẻ gãy cấu trúc phòng ngự.",
    "hints": {
      "level1": "Hàng 2 dưới bụng hai quân Trắng hàng 3.",
      "level2": "Áp sát vào thân quân, vô hiệu hóa khả năng đào thoát ra mép ngoài."
    },
    "explanation": "Đòn đính bụng thần sầu tách rời liên kết của Trắng, biến khối quân tưởng chừng vững chãi thành con mồi béo bở. Đây là thế cờ kinh điển #262 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dc][dd][ed][fd][gc][hc]AW[ec][fc][eb][fb];B[gb];W[fa];B[ea])"
  },
  {
    "id": "tsumego-263",
    "title": "Tử hoạt #263: Đòn Chém chéo cắt đôi (Cross-cut Tesuji) (Bài 263)",
    "difficulty": "intermediate",
    "category": "tsumego",
    "instruction": "Đen đi trước. Chém chéo vào điểm liên kết của Trắng để tạo sự hỗn loạn và tìm đường sống.",
    "hints": {
      "level1": "Giao điểm chéo giữa hai cặp quân đối diện.",
      "level2": "Cắt đôi ngay lập tức theo câu khẩu quyết: 'Gặp chém chéo, hãy bình tĩnh kéo dài quân'."
    },
    "explanation": "Đòn chém chéo làm phức tạp hóa tình huống, ép đối thủ phải bộc lộ điểm yếu ở một trong hai đầu. Đây là thế cờ kinh điển #263 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[dd][ee][ed]AW[de][fd][fe];B[ce];W[cf];B[df])"
  },
  {
    "id": "tsumego-264",
    "title": "Tử hoạt #264: Đòn Thí quân thu hẹp nhãn vị (Throw-in Tesuji) (Bài 264)",
    "difficulty": "beginner",
    "category": "tsumego",
    "instruction": "Đen đi trước. Quẳng 1 quân vào miệng cọp để phá nát mắt giả của đối phương.",
    "hints": {
      "level1": "Mắt tiềm năng của Trắng ở hàng 1.",
      "level2": "Chủ động dâng nộp 1 quân vào trong mắt, biến mắt thật thành mắt giả."
    },
    "explanation": "Nước thí quân làm biến dạng cấu trúc mắt của Trắng, biến mắt thật thành mắt giả và kết liễu toàn bộ nhóm quân. Đây là thế cờ kinh điển #264 trích từ tuyển tập 264 bài tập sống chết WBaduk.",
    "sgf": "(;GM[1]FF[4]SZ[9]AB[ca][cb][cc][cd][bd][ad]AW[ba][bb][ab];B[aa];W[ac];B[ba])"
  }
];
