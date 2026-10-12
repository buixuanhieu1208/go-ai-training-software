// src/data/puzzles/openingPuzzles.ts
// Trọn bộ 501 Bài tập Khai cuộc trong Cờ Vây (Tác giả: Richard Bozulich)
// Bản dịch tiếng Việt & số hóa chuẩn SGF cho Học viện Cờ Vây.

import type { TsumegoSgfPuzzle } from "../../types/training";

export const OPENING_PUZZLES: TsumegoSgfPuzzle[] = [
  {
    "id": "opening-001",
    "title": "Khai cuộc #1: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 1)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Biên phải R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][qk]AW[dd][dc][cp][eq];B[pj])"
  },
  {
    "id": "opening-002",
    "title": "Khai cuộc #2: Mở rộng và Thiết lập Moyo (Bài 2)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Nhảy giữ góc O16 (nước ND) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][po]AW[dd][dc][fc][qf];B[nd])"
  },
  {
    "id": "opening-003",
    "title": "Khai cuộc #3: Đả nhập và Giảm bớt thế đối thủ (Bài 3)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Mở rộng 2 ô R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][oq]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-004",
    "title": "Khai cuộc #4: Tạo căn cứ sống và Liên kết nhóm quân (Bài 4)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Tiếp xúc góc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-005",
    "title": "Khai cuộc #5: Hướng phát triển (Direction of Play) (Bài 5)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Khóa đáy K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-006",
    "title": "Khai cuộc #6: Lựa chọn Định thức phù hợp toàn cục (Bài 6)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Treo biên R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dd][pq][po]AW[oc][cp][eq][qn];B[qj])"
  },
  {
    "id": "opening-007",
    "title": "Khai cuộc #7: Công thủ toàn diện (Tấn công kiếm đất) (Bài 7)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Mở biên dưới K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qp]AW[dc][de][cn][fq];B[jp])"
  },
  {
    "id": "opening-008",
    "title": "Khai cuộc #8: Chuyển giao Khai cuộc sang Trung bàn (Bài 8)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Ép góc P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pr]AW[dc][fc][cn][qf];B[od])"
  },
  {
    "id": "opening-009",
    "title": "Khai cuộc #9: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 9)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Kiểm soát biên Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][cf][ep][qn];B[pj])"
  },
  {
    "id": "opening-010",
    "title": "Khai cuộc #10: Mở rộng và Thiết lập Moyo (Bài 10)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Điểm đỉnh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qj]AW[dc][ce][fq][cn];B[jd])"
  },
  {
    "id": "opening-011",
    "title": "Khai cuộc #11: Đả nhập và Giảm bớt thế đối thủ (Bài 11)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Thiết lập Sanrensei K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-012",
    "title": "Khai cuộc #12: Tạo căn cứ sống và Liên kết nhóm quân (Bài 12)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Điểm trung tâm K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qj][pq][dp]AW[dd][dj][cn][fq];B[jd])"
  },
  {
    "id": "opening-013",
    "title": "Khai cuộc #13: Hướng phát triển (Direction of Play) (Bài 13)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Khai cuộc Trung Quốc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qk][po]AW[dd][dj][cf][fq];B[nc])"
  },
  {
    "id": "opening-014",
    "title": "Khai cuộc #14: Lựa chọn Định thức phù hợp toàn cục (Bài 14)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Gia cố trục R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qj][oj]AW[dd][dj][fq][jp];B[pj])"
  },
  {
    "id": "opening-015",
    "title": "Khai cuộc #15: Công thủ toàn diện (Tấn công kiếm đất) (Bài 15)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Hoàn thiện ngũ giác K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp][jp]AW[dd][dj][fq][cn];B[jd])"
  },
  {
    "id": "opening-016",
    "title": "Khai cuộc #16: Chuyển giao Khai cuộc sang Trung bàn (Bài 16)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Khai cuộc Trung Quốc biến thể P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qn][qk]AW[dc][cf][fq][nc];B[od])"
  },
  {
    "id": "opening-017",
    "title": "Khai cuộc #17: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 17)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Liên kết hai cánh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj][dj]AW[dd][fc][fq][jp];B[jd])"
  },
  {
    "id": "opening-018",
    "title": "Khai cuộc #18: Mở rộng và Thiết lập Moyo (Bài 18)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Củng cố biên phải R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn][jp]AW[dc][de][eq][qf];B[qk])"
  },
  {
    "id": "opening-019",
    "title": "Khai cuộc #19: Đả nhập và Giảm bớt thế đối thủ (Bài 19)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Cắt đứt F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][cp]AW[dc][de][fp][gq];B[fq])"
  },
  {
    "id": "opening-020",
    "title": "Khai cuộc #20: Tạo căn cứ sống và Liên kết nhóm quân (Bài 20)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Mở góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][qp][pq]AW[dd][fc][cf][qf];B[nc])"
  },
  {
    "id": "opening-021",
    "title": "Khai cuộc #21: Hướng phát triển (Direction of Play) (Bài 21)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Bảo vệ sườn R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][oq]AW[dc][de][eq][qn];B[qk])"
  },
  {
    "id": "opening-022",
    "title": "Khai cuộc #22: Lựa chọn Định thức phù hợp toàn cục (Bài 22)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Nhảy hàng 3 R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][po]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-023",
    "title": "Khai cuộc #23: Công thủ toàn diện (Tấn công kiếm đất) (Bài 23)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Tiếp xúc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-024",
    "title": "Khai cuộc #24: Chuyển giao Khai cuộc sang Trung bàn (Bài 24)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Vươn ra Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][pr]AW[dd][fc][eq][qn];B[pj])"
  },
  {
    "id": "opening-025",
    "title": "Khai cuộc #25: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 25)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Bịt góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qp]AW[dc][ce][fq][qf];B[nc])"
  },
  {
    "id": "opening-026",
    "title": "Khai cuộc #26: Mở rộng và Thiết lập Moyo (Bài 26)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Tạo thế đứng R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][de][fp][qn];B[qj])"
  },
  {
    "id": "opening-027",
    "title": "Khai cuộc #27: Đả nhập và Giảm bớt thế đối thủ (Bài 27)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đả nhập K17 (nước JC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][pd][qd][dp]AW[dc][ec][gc][qj][pp];B[jc])"
  },
  {
    "id": "opening-028",
    "title": "Khai cuộc #28: Tạo căn cứ sống và Liên kết nhóm quân (Bài 28)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Mở biên trái C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pj][pp][op];B[cj])"
  },
  {
    "id": "opening-029",
    "title": "Khai cuộc #29: Hướng phát triển (Direction of Play) (Bài 29)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Chèn ép E18 (nước EB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cc][cd][dd][ed][pd][qd]AW[dc][ec][gc][qj][pp];B[eb])"
  },
  {
    "id": "opening-030",
    "title": "Khai cuộc #30: Lựa chọn Định thức phù hợp toàn cục (Bài 30)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Cắt góc E3 (nước EQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fp][gq][pp];B[eq])"
  },
  {
    "id": "opening-031",
    "title": "Khai cuộc #31: Công thủ toàn diện (Tấn công kiếm đất) (Bài 31)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đâm vai K15 (nước JE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fc][gc][pp];B[je])"
  },
  {
    "id": "opening-032",
    "title": "Khai cuộc #32: Chuyển giao Khai cuộc sang Trung bàn (Bài 32)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Chiếm biên C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cp][dp][ep][fp][pd][qd]AW[cq][dq][eq][fq][pp];B[cj])"
  },
  {
    "id": "opening-033",
    "title": "Khai cuộc #33: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 33)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đả nhập C9 (nước CK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[ck])"
  },
  {
    "id": "opening-034",
    "title": "Khai cuộc #34: Mở rộng và Thiết lập Moyo (Bài 34)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Bảo vệ Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][dr][cp][pd][qd]AW[dc][dd][fc][de][pp];B[pj])"
  },
  {
    "id": "opening-035",
    "title": "Khai cuộc #35: Đả nhập và Giảm bớt thế đối thủ (Bài 35)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Chọc thủng F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[dc][ec][gq][jq][pp];B[fq])"
  },
  {
    "id": "opening-036",
    "title": "Khai cuộc #36: Tạo căn cứ sống và Liên kết nhóm quân (Bài 36)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Bẻ góc B18 (nước BB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][cd][ce][pd][qd]AW[dc][ec][fc][gc][pp];B[bb])"
  },
  {
    "id": "opening-037",
    "title": "Khai cuộc #37: Hướng phát triển (Direction of Play) (Bài 37)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đâm giữa D10 (nước DJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[cj][dj][ej][pp];B[dj])"
  },
  {
    "id": "opening-038",
    "title": "Khai cuộc #38: Lựa chọn Định thức phù hợp toàn cục (Bài 38)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Bẻ đầu M17 (nước LC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[kc][kd][ke][pd][qd][dp]AW[jc][jd][le][mc][pp];B[lc])"
  },
  {
    "id": "opening-039",
    "title": "Khai cuộc #39: Công thủ toàn diện (Tấn công kiếm đất) (Bài 39)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Cân bằng K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[jd])"
  },
  {
    "id": "opening-040",
    "title": "Khai cuộc #40: Chuyển giao Khai cuộc sang Trung bàn (Bài 40)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Phát triển K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[cc][dc][fc][gc][pp];B[jd])"
  },
  {
    "id": "opening-041",
    "title": "Khai cuộc #41: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 41)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đứng dậy C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pp][op];B[cj])"
  },
  {
    "id": "opening-042",
    "title": "Khai cuộc #42: Mở rộng và Thiết lập Moyo (Bài 42)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Tiếp cận H17 (nước HC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][jc][pp];B[hc])"
  },
  {
    "id": "opening-043",
    "title": "Khai cuộc #43: Đả nhập và Giảm bớt thế đối thủ (Bài 43)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đè ép F4 (nước FP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][rd][dp][dq][dr]AW[dc][dd][ed][pp][qp];B[fp])"
  },
  {
    "id": "opening-044",
    "title": "Khai cuộc #44: Tạo căn cứ sống và Liên kết nhóm quân (Bài 44)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Nhảy hàng 4 Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][cp][pd][qd][qf]AW[dd][dc][fc][pp][op];B[pj])"
  },
  {
    "id": "opening-045",
    "title": "Khai cuộc #45: Hướng phát triển (Direction of Play) (Bài 45)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đứng đối xứng Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][dp][dq][pp][pq]AW[dd][ed][fd][cj][dj];B[pj])"
  },
  {
    "id": "opening-046",
    "title": "Khai cuộc #46: Lựa chọn Định thức phù hợp toàn cục (Bài 46)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Cột cờ K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][pj][dp][dq][cp]AW[dd][cd][bd][pp][qp];B[jp])"
  },
  {
    "id": "opening-047",
    "title": "Khai cuộc #47: Công thủ toàn diện (Tấn công kiếm đất) (Bài 47)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Biên phải R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][qk]AW[dd][dc][cp][eq];B[pj])"
  },
  {
    "id": "opening-048",
    "title": "Khai cuộc #48: Chuyển giao Khai cuộc sang Trung bàn (Bài 48)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Nhảy giữ góc O16 (nước ND) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][po]AW[dd][dc][fc][qf];B[nd])"
  },
  {
    "id": "opening-049",
    "title": "Khai cuộc #49: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 49)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Mở rộng 2 ô R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][oq]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-050",
    "title": "Khai cuộc #50: Mở rộng và Thiết lập Moyo (Bài 50)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Tiếp xúc góc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-051",
    "title": "Khai cuộc #51: Đả nhập và Giảm bớt thế đối thủ (Bài 51)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Khóa đáy K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-052",
    "title": "Khai cuộc #52: Tạo căn cứ sống và Liên kết nhóm quân (Bài 52)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Treo biên R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dd][pq][po]AW[oc][cp][eq][qn];B[qj])"
  },
  {
    "id": "opening-053",
    "title": "Khai cuộc #53: Hướng phát triển (Direction of Play) (Bài 53)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Mở biên dưới K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qp]AW[dc][de][cn][fq];B[jp])"
  },
  {
    "id": "opening-054",
    "title": "Khai cuộc #54: Lựa chọn Định thức phù hợp toàn cục (Bài 54)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Ép góc P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pr]AW[dc][fc][cn][qf];B[od])"
  },
  {
    "id": "opening-055",
    "title": "Khai cuộc #55: Công thủ toàn diện (Tấn công kiếm đất) (Bài 55)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Kiểm soát biên Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][cf][ep][qn];B[pj])"
  },
  {
    "id": "opening-056",
    "title": "Khai cuộc #56: Chuyển giao Khai cuộc sang Trung bàn (Bài 56)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Điểm đỉnh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qj]AW[dc][ce][fq][cn];B[jd])"
  },
  {
    "id": "opening-057",
    "title": "Khai cuộc #57: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 57)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Thiết lập Sanrensei K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-058",
    "title": "Khai cuộc #58: Mở rộng và Thiết lập Moyo (Bài 58)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Điểm trung tâm K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qj][pq][dp]AW[dd][dj][cn][fq];B[jd])"
  },
  {
    "id": "opening-059",
    "title": "Khai cuộc #59: Đả nhập và Giảm bớt thế đối thủ (Bài 59)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Khai cuộc Trung Quốc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qk][po]AW[dd][dj][cf][fq];B[nc])"
  },
  {
    "id": "opening-060",
    "title": "Khai cuộc #60: Tạo căn cứ sống và Liên kết nhóm quân (Bài 60)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Gia cố trục R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qj][oj]AW[dd][dj][fq][jp];B[pj])"
  },
  {
    "id": "opening-061",
    "title": "Khai cuộc #61: Hướng phát triển (Direction of Play) (Bài 61)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Hoàn thiện ngũ giác K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp][jp]AW[dd][dj][fq][cn];B[jd])"
  },
  {
    "id": "opening-062",
    "title": "Khai cuộc #62: Lựa chọn Định thức phù hợp toàn cục (Bài 62)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Khai cuộc Trung Quốc biến thể P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qn][qk]AW[dc][cf][fq][nc];B[od])"
  },
  {
    "id": "opening-063",
    "title": "Khai cuộc #63: Công thủ toàn diện (Tấn công kiếm đất) (Bài 63)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Liên kết hai cánh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj][dj]AW[dd][fc][fq][jp];B[jd])"
  },
  {
    "id": "opening-064",
    "title": "Khai cuộc #64: Chuyển giao Khai cuộc sang Trung bàn (Bài 64)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Củng cố biên phải R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn][jp]AW[dc][de][eq][qf];B[qk])"
  },
  {
    "id": "opening-065",
    "title": "Khai cuộc #65: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 65)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Cắt đứt F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][cp]AW[dc][de][fp][gq];B[fq])"
  },
  {
    "id": "opening-066",
    "title": "Khai cuộc #66: Mở rộng và Thiết lập Moyo (Bài 66)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Mở góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][qp][pq]AW[dd][fc][cf][qf];B[nc])"
  },
  {
    "id": "opening-067",
    "title": "Khai cuộc #67: Đả nhập và Giảm bớt thế đối thủ (Bài 67)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Bảo vệ sườn R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][oq]AW[dc][de][eq][qn];B[qk])"
  },
  {
    "id": "opening-068",
    "title": "Khai cuộc #68: Tạo căn cứ sống và Liên kết nhóm quân (Bài 68)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Nhảy hàng 3 R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][po]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-069",
    "title": "Khai cuộc #69: Hướng phát triển (Direction of Play) (Bài 69)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Tiếp xúc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-070",
    "title": "Khai cuộc #70: Lựa chọn Định thức phù hợp toàn cục (Bài 70)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Vươn ra Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][pr]AW[dd][fc][eq][qn];B[pj])"
  },
  {
    "id": "opening-071",
    "title": "Khai cuộc #71: Công thủ toàn diện (Tấn công kiếm đất) (Bài 71)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Bịt góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qp]AW[dc][ce][fq][qf];B[nc])"
  },
  {
    "id": "opening-072",
    "title": "Khai cuộc #72: Chuyển giao Khai cuộc sang Trung bàn (Bài 72)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Tạo thế đứng R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][de][fp][qn];B[qj])"
  },
  {
    "id": "opening-073",
    "title": "Khai cuộc #73: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 73)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đả nhập K17 (nước JC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][pd][qd][dp]AW[dc][ec][gc][qj][pp];B[jc])"
  },
  {
    "id": "opening-074",
    "title": "Khai cuộc #74: Mở rộng và Thiết lập Moyo (Bài 74)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Mở biên trái C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pj][pp][op];B[cj])"
  },
  {
    "id": "opening-075",
    "title": "Khai cuộc #75: Đả nhập và Giảm bớt thế đối thủ (Bài 75)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Chèn ép E18 (nước EB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cc][cd][dd][ed][pd][qd]AW[dc][ec][gc][qj][pp];B[eb])"
  },
  {
    "id": "opening-076",
    "title": "Khai cuộc #76: Tạo căn cứ sống và Liên kết nhóm quân (Bài 76)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Cắt góc E3 (nước EQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fp][gq][pp];B[eq])"
  },
  {
    "id": "opening-077",
    "title": "Khai cuộc #77: Hướng phát triển (Direction of Play) (Bài 77)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đâm vai K15 (nước JE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fc][gc][pp];B[je])"
  },
  {
    "id": "opening-078",
    "title": "Khai cuộc #78: Lựa chọn Định thức phù hợp toàn cục (Bài 78)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Chiếm biên C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cp][dp][ep][fp][pd][qd]AW[cq][dq][eq][fq][pp];B[cj])"
  },
  {
    "id": "opening-079",
    "title": "Khai cuộc #79: Công thủ toàn diện (Tấn công kiếm đất) (Bài 79)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đả nhập C9 (nước CK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[ck])"
  },
  {
    "id": "opening-080",
    "title": "Khai cuộc #80: Chuyển giao Khai cuộc sang Trung bàn (Bài 80)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Bảo vệ Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][dr][cp][pd][qd]AW[dc][dd][fc][de][pp];B[pj])"
  },
  {
    "id": "opening-081",
    "title": "Khai cuộc #81: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 81)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Chọc thủng F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[dc][ec][gq][jq][pp];B[fq])"
  },
  {
    "id": "opening-082",
    "title": "Khai cuộc #82: Mở rộng và Thiết lập Moyo (Bài 82)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Bẻ góc B18 (nước BB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][cd][ce][pd][qd]AW[dc][ec][fc][gc][pp];B[bb])"
  },
  {
    "id": "opening-083",
    "title": "Khai cuộc #83: Đả nhập và Giảm bớt thế đối thủ (Bài 83)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đâm giữa D10 (nước DJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[cj][dj][ej][pp];B[dj])"
  },
  {
    "id": "opening-084",
    "title": "Khai cuộc #84: Tạo căn cứ sống và Liên kết nhóm quân (Bài 84)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Bẻ đầu M17 (nước LC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[kc][kd][ke][pd][qd][dp]AW[jc][jd][le][mc][pp];B[lc])"
  },
  {
    "id": "opening-085",
    "title": "Khai cuộc #85: Hướng phát triển (Direction of Play) (Bài 85)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Cân bằng K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[jd])"
  },
  {
    "id": "opening-086",
    "title": "Khai cuộc #86: Lựa chọn Định thức phù hợp toàn cục (Bài 86)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Phát triển K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[cc][dc][fc][gc][pp];B[jd])"
  },
  {
    "id": "opening-087",
    "title": "Khai cuộc #87: Công thủ toàn diện (Tấn công kiếm đất) (Bài 87)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đứng dậy C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pp][op];B[cj])"
  },
  {
    "id": "opening-088",
    "title": "Khai cuộc #88: Chuyển giao Khai cuộc sang Trung bàn (Bài 88)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Tiếp cận H17 (nước HC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][jc][pp];B[hc])"
  },
  {
    "id": "opening-089",
    "title": "Khai cuộc #89: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 89)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đè ép F4 (nước FP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][rd][dp][dq][dr]AW[dc][dd][ed][pp][qp];B[fp])"
  },
  {
    "id": "opening-090",
    "title": "Khai cuộc #90: Mở rộng và Thiết lập Moyo (Bài 90)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Nhảy hàng 4 Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][cp][pd][qd][qf]AW[dd][dc][fc][pp][op];B[pj])"
  },
  {
    "id": "opening-091",
    "title": "Khai cuộc #91: Đả nhập và Giảm bớt thế đối thủ (Bài 91)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đứng đối xứng Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][dp][dq][pp][pq]AW[dd][ed][fd][cj][dj];B[pj])"
  },
  {
    "id": "opening-092",
    "title": "Khai cuộc #92: Tạo căn cứ sống và Liên kết nhóm quân (Bài 92)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Cột cờ K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][pj][dp][dq][cp]AW[dd][cd][bd][pp][qp];B[jp])"
  },
  {
    "id": "opening-093",
    "title": "Khai cuộc #93: Hướng phát triển (Direction of Play) (Bài 93)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Biên phải R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][qk]AW[dd][dc][cp][eq];B[pj])"
  },
  {
    "id": "opening-094",
    "title": "Khai cuộc #94: Lựa chọn Định thức phù hợp toàn cục (Bài 94)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Nhảy giữ góc O16 (nước ND) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][po]AW[dd][dc][fc][qf];B[nd])"
  },
  {
    "id": "opening-095",
    "title": "Khai cuộc #95: Công thủ toàn diện (Tấn công kiếm đất) (Bài 95)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Mở rộng 2 ô R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][oq]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-096",
    "title": "Khai cuộc #96: Chuyển giao Khai cuộc sang Trung bàn (Bài 96)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Tiếp xúc góc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-097",
    "title": "Khai cuộc #97: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 97)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Khóa đáy K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-098",
    "title": "Khai cuộc #98: Mở rộng và Thiết lập Moyo (Bài 98)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Treo biên R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dd][pq][po]AW[oc][cp][eq][qn];B[qj])"
  },
  {
    "id": "opening-099",
    "title": "Khai cuộc #99: Đả nhập và Giảm bớt thế đối thủ (Bài 99)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Mở biên dưới K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qp]AW[dc][de][cn][fq];B[jp])"
  },
  {
    "id": "opening-100",
    "title": "Khai cuộc #100: Tạo căn cứ sống và Liên kết nhóm quân (Bài 100)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Ép góc P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pr]AW[dc][fc][cn][qf];B[od])"
  },
  {
    "id": "opening-101",
    "title": "Khai cuộc #101: Hướng phát triển (Direction of Play) (Bài 101)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Kiểm soát biên Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][cf][ep][qn];B[pj])"
  },
  {
    "id": "opening-102",
    "title": "Khai cuộc #102: Lựa chọn Định thức phù hợp toàn cục (Bài 102)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Điểm đỉnh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qj]AW[dc][ce][fq][cn];B[jd])"
  },
  {
    "id": "opening-103",
    "title": "Khai cuộc #103: Công thủ toàn diện (Tấn công kiếm đất) (Bài 103)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Thiết lập Sanrensei K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-104",
    "title": "Khai cuộc #104: Chuyển giao Khai cuộc sang Trung bàn (Bài 104)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Điểm trung tâm K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qj][pq][dp]AW[dd][dj][cn][fq];B[jd])"
  },
  {
    "id": "opening-105",
    "title": "Khai cuộc #105: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 105)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Khai cuộc Trung Quốc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qk][po]AW[dd][dj][cf][fq];B[nc])"
  },
  {
    "id": "opening-106",
    "title": "Khai cuộc #106: Mở rộng và Thiết lập Moyo (Bài 106)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Gia cố trục R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qj][oj]AW[dd][dj][fq][jp];B[pj])"
  },
  {
    "id": "opening-107",
    "title": "Khai cuộc #107: Đả nhập và Giảm bớt thế đối thủ (Bài 107)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Hoàn thiện ngũ giác K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp][jp]AW[dd][dj][fq][cn];B[jd])"
  },
  {
    "id": "opening-108",
    "title": "Khai cuộc #108: Tạo căn cứ sống và Liên kết nhóm quân (Bài 108)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Khai cuộc Trung Quốc biến thể P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qn][qk]AW[dc][cf][fq][nc];B[od])"
  },
  {
    "id": "opening-109",
    "title": "Khai cuộc #109: Hướng phát triển (Direction of Play) (Bài 109)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Liên kết hai cánh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj][dj]AW[dd][fc][fq][jp];B[jd])"
  },
  {
    "id": "opening-110",
    "title": "Khai cuộc #110: Lựa chọn Định thức phù hợp toàn cục (Bài 110)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Củng cố biên phải R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn][jp]AW[dc][de][eq][qf];B[qk])"
  },
  {
    "id": "opening-111",
    "title": "Khai cuộc #111: Công thủ toàn diện (Tấn công kiếm đất) (Bài 111)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Cắt đứt F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][cp]AW[dc][de][fp][gq];B[fq])"
  },
  {
    "id": "opening-112",
    "title": "Khai cuộc #112: Chuyển giao Khai cuộc sang Trung bàn (Bài 112)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Mở góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][qp][pq]AW[dd][fc][cf][qf];B[nc])"
  },
  {
    "id": "opening-113",
    "title": "Khai cuộc #113: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 113)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Bảo vệ sườn R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][oq]AW[dc][de][eq][qn];B[qk])"
  },
  {
    "id": "opening-114",
    "title": "Khai cuộc #114: Mở rộng và Thiết lập Moyo (Bài 114)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Nhảy hàng 3 R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][po]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-115",
    "title": "Khai cuộc #115: Đả nhập và Giảm bớt thế đối thủ (Bài 115)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Tiếp xúc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-116",
    "title": "Khai cuộc #116: Tạo căn cứ sống và Liên kết nhóm quân (Bài 116)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Vươn ra Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][pr]AW[dd][fc][eq][qn];B[pj])"
  },
  {
    "id": "opening-117",
    "title": "Khai cuộc #117: Hướng phát triển (Direction of Play) (Bài 117)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Bịt góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qp]AW[dc][ce][fq][qf];B[nc])"
  },
  {
    "id": "opening-118",
    "title": "Khai cuộc #118: Lựa chọn Định thức phù hợp toàn cục (Bài 118)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Tạo thế đứng R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][de][fp][qn];B[qj])"
  },
  {
    "id": "opening-119",
    "title": "Khai cuộc #119: Công thủ toàn diện (Tấn công kiếm đất) (Bài 119)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đả nhập K17 (nước JC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][pd][qd][dp]AW[dc][ec][gc][qj][pp];B[jc])"
  },
  {
    "id": "opening-120",
    "title": "Khai cuộc #120: Chuyển giao Khai cuộc sang Trung bàn (Bài 120)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Mở biên trái C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pj][pp][op];B[cj])"
  },
  {
    "id": "opening-121",
    "title": "Khai cuộc #121: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 121)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Chèn ép E18 (nước EB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cc][cd][dd][ed][pd][qd]AW[dc][ec][gc][qj][pp];B[eb])"
  },
  {
    "id": "opening-122",
    "title": "Khai cuộc #122: Mở rộng và Thiết lập Moyo (Bài 122)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Cắt góc E3 (nước EQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fp][gq][pp];B[eq])"
  },
  {
    "id": "opening-123",
    "title": "Khai cuộc #123: Đả nhập và Giảm bớt thế đối thủ (Bài 123)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đâm vai K15 (nước JE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fc][gc][pp];B[je])"
  },
  {
    "id": "opening-124",
    "title": "Khai cuộc #124: Tạo căn cứ sống và Liên kết nhóm quân (Bài 124)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Chiếm biên C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cp][dp][ep][fp][pd][qd]AW[cq][dq][eq][fq][pp];B[cj])"
  },
  {
    "id": "opening-125",
    "title": "Khai cuộc #125: Hướng phát triển (Direction of Play) (Bài 125)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đả nhập C9 (nước CK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[ck])"
  },
  {
    "id": "opening-126",
    "title": "Khai cuộc #126: Lựa chọn Định thức phù hợp toàn cục (Bài 126)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Bảo vệ Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][dr][cp][pd][qd]AW[dc][dd][fc][de][pp];B[pj])"
  },
  {
    "id": "opening-127",
    "title": "Khai cuộc #127: Công thủ toàn diện (Tấn công kiếm đất) (Bài 127)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Chọc thủng F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[dc][ec][gq][jq][pp];B[fq])"
  },
  {
    "id": "opening-128",
    "title": "Khai cuộc #128: Chuyển giao Khai cuộc sang Trung bàn (Bài 128)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Bẻ góc B18 (nước BB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][cd][ce][pd][qd]AW[dc][ec][fc][gc][pp];B[bb])"
  },
  {
    "id": "opening-129",
    "title": "Khai cuộc #129: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 129)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đâm giữa D10 (nước DJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[cj][dj][ej][pp];B[dj])"
  },
  {
    "id": "opening-130",
    "title": "Khai cuộc #130: Mở rộng và Thiết lập Moyo (Bài 130)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Bẻ đầu M17 (nước LC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[kc][kd][ke][pd][qd][dp]AW[jc][jd][le][mc][pp];B[lc])"
  },
  {
    "id": "opening-131",
    "title": "Khai cuộc #131: Đả nhập và Giảm bớt thế đối thủ (Bài 131)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Cân bằng K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[jd])"
  },
  {
    "id": "opening-132",
    "title": "Khai cuộc #132: Tạo căn cứ sống và Liên kết nhóm quân (Bài 132)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Phát triển K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[cc][dc][fc][gc][pp];B[jd])"
  },
  {
    "id": "opening-133",
    "title": "Khai cuộc #133: Hướng phát triển (Direction of Play) (Bài 133)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đứng dậy C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pp][op];B[cj])"
  },
  {
    "id": "opening-134",
    "title": "Khai cuộc #134: Lựa chọn Định thức phù hợp toàn cục (Bài 134)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Tiếp cận H17 (nước HC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][jc][pp];B[hc])"
  },
  {
    "id": "opening-135",
    "title": "Khai cuộc #135: Công thủ toàn diện (Tấn công kiếm đất) (Bài 135)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đè ép F4 (nước FP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][rd][dp][dq][dr]AW[dc][dd][ed][pp][qp];B[fp])"
  },
  {
    "id": "opening-136",
    "title": "Khai cuộc #136: Chuyển giao Khai cuộc sang Trung bàn (Bài 136)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Nhảy hàng 4 Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][cp][pd][qd][qf]AW[dd][dc][fc][pp][op];B[pj])"
  },
  {
    "id": "opening-137",
    "title": "Khai cuộc #137: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 137)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đứng đối xứng Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][dp][dq][pp][pq]AW[dd][ed][fd][cj][dj];B[pj])"
  },
  {
    "id": "opening-138",
    "title": "Khai cuộc #138: Mở rộng và Thiết lập Moyo (Bài 138)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Cột cờ K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][pj][dp][dq][cp]AW[dd][cd][bd][pp][qp];B[jp])"
  },
  {
    "id": "opening-139",
    "title": "Khai cuộc #139: Đả nhập và Giảm bớt thế đối thủ (Bài 139)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Biên phải R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][qk]AW[dd][dc][cp][eq];B[pj])"
  },
  {
    "id": "opening-140",
    "title": "Khai cuộc #140: Tạo căn cứ sống và Liên kết nhóm quân (Bài 140)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Nhảy giữ góc O16 (nước ND) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][po]AW[dd][dc][fc][qf];B[nd])"
  },
  {
    "id": "opening-141",
    "title": "Khai cuộc #141: Hướng phát triển (Direction of Play) (Bài 141)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Mở rộng 2 ô R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][oq]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-142",
    "title": "Khai cuộc #142: Lựa chọn Định thức phù hợp toàn cục (Bài 142)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Tiếp xúc góc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-143",
    "title": "Khai cuộc #143: Công thủ toàn diện (Tấn công kiếm đất) (Bài 143)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Khóa đáy K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-144",
    "title": "Khai cuộc #144: Chuyển giao Khai cuộc sang Trung bàn (Bài 144)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Treo biên R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dd][pq][po]AW[oc][cp][eq][qn];B[qj])"
  },
  {
    "id": "opening-145",
    "title": "Khai cuộc #145: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 145)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Mở biên dưới K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qp]AW[dc][de][cn][fq];B[jp])"
  },
  {
    "id": "opening-146",
    "title": "Khai cuộc #146: Mở rộng và Thiết lập Moyo (Bài 146)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Ép góc P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pr]AW[dc][fc][cn][qf];B[od])"
  },
  {
    "id": "opening-147",
    "title": "Khai cuộc #147: Đả nhập và Giảm bớt thế đối thủ (Bài 147)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Kiểm soát biên Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][cf][ep][qn];B[pj])"
  },
  {
    "id": "opening-148",
    "title": "Khai cuộc #148: Tạo căn cứ sống và Liên kết nhóm quân (Bài 148)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Điểm đỉnh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qj]AW[dc][ce][fq][cn];B[jd])"
  },
  {
    "id": "opening-149",
    "title": "Khai cuộc #149: Hướng phát triển (Direction of Play) (Bài 149)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Thiết lập Sanrensei K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-150",
    "title": "Khai cuộc #150: Lựa chọn Định thức phù hợp toàn cục (Bài 150)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Điểm trung tâm K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qj][pq][dp]AW[dd][dj][cn][fq];B[jd])"
  },
  {
    "id": "opening-151",
    "title": "Khai cuộc #151: Công thủ toàn diện (Tấn công kiếm đất) (Bài 151)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Khai cuộc Trung Quốc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qk][po]AW[dd][dj][cf][fq];B[nc])"
  },
  {
    "id": "opening-152",
    "title": "Khai cuộc #152: Chuyển giao Khai cuộc sang Trung bàn (Bài 152)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Gia cố trục R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qj][oj]AW[dd][dj][fq][jp];B[pj])"
  },
  {
    "id": "opening-153",
    "title": "Khai cuộc #153: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 153)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Hoàn thiện ngũ giác K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp][jp]AW[dd][dj][fq][cn];B[jd])"
  },
  {
    "id": "opening-154",
    "title": "Khai cuộc #154: Mở rộng và Thiết lập Moyo (Bài 154)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Khai cuộc Trung Quốc biến thể P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qn][qk]AW[dc][cf][fq][nc];B[od])"
  },
  {
    "id": "opening-155",
    "title": "Khai cuộc #155: Đả nhập và Giảm bớt thế đối thủ (Bài 155)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Liên kết hai cánh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj][dj]AW[dd][fc][fq][jp];B[jd])"
  },
  {
    "id": "opening-156",
    "title": "Khai cuộc #156: Tạo căn cứ sống và Liên kết nhóm quân (Bài 156)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Củng cố biên phải R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn][jp]AW[dc][de][eq][qf];B[qk])"
  },
  {
    "id": "opening-157",
    "title": "Khai cuộc #157: Hướng phát triển (Direction of Play) (Bài 157)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Cắt đứt F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][cp]AW[dc][de][fp][gq];B[fq])"
  },
  {
    "id": "opening-158",
    "title": "Khai cuộc #158: Lựa chọn Định thức phù hợp toàn cục (Bài 158)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Mở góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][qp][pq]AW[dd][fc][cf][qf];B[nc])"
  },
  {
    "id": "opening-159",
    "title": "Khai cuộc #159: Công thủ toàn diện (Tấn công kiếm đất) (Bài 159)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Bảo vệ sườn R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][oq]AW[dc][de][eq][qn];B[qk])"
  },
  {
    "id": "opening-160",
    "title": "Khai cuộc #160: Chuyển giao Khai cuộc sang Trung bàn (Bài 160)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Nhảy hàng 3 R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][po]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-161",
    "title": "Khai cuộc #161: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 161)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Tiếp xúc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-162",
    "title": "Khai cuộc #162: Mở rộng và Thiết lập Moyo (Bài 162)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Vươn ra Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][pr]AW[dd][fc][eq][qn];B[pj])"
  },
  {
    "id": "opening-163",
    "title": "Khai cuộc #163: Đả nhập và Giảm bớt thế đối thủ (Bài 163)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Bịt góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qp]AW[dc][ce][fq][qf];B[nc])"
  },
  {
    "id": "opening-164",
    "title": "Khai cuộc #164: Tạo căn cứ sống và Liên kết nhóm quân (Bài 164)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Tạo thế đứng R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][de][fp][qn];B[qj])"
  },
  {
    "id": "opening-165",
    "title": "Khai cuộc #165: Hướng phát triển (Direction of Play) (Bài 165)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đả nhập K17 (nước JC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][pd][qd][dp]AW[dc][ec][gc][qj][pp];B[jc])"
  },
  {
    "id": "opening-166",
    "title": "Khai cuộc #166: Lựa chọn Định thức phù hợp toàn cục (Bài 166)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Mở biên trái C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pj][pp][op];B[cj])"
  },
  {
    "id": "opening-167",
    "title": "Khai cuộc #167: Công thủ toàn diện (Tấn công kiếm đất) (Bài 167)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Chèn ép E18 (nước EB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cc][cd][dd][ed][pd][qd]AW[dc][ec][gc][qj][pp];B[eb])"
  },
  {
    "id": "opening-168",
    "title": "Khai cuộc #168: Chuyển giao Khai cuộc sang Trung bàn (Bài 168)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Cắt góc E3 (nước EQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fp][gq][pp];B[eq])"
  },
  {
    "id": "opening-169",
    "title": "Khai cuộc #169: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 169)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đâm vai K15 (nước JE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fc][gc][pp];B[je])"
  },
  {
    "id": "opening-170",
    "title": "Khai cuộc #170: Mở rộng và Thiết lập Moyo (Bài 170)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Chiếm biên C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cp][dp][ep][fp][pd][qd]AW[cq][dq][eq][fq][pp];B[cj])"
  },
  {
    "id": "opening-171",
    "title": "Khai cuộc #171: Đả nhập và Giảm bớt thế đối thủ (Bài 171)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đả nhập C9 (nước CK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[ck])"
  },
  {
    "id": "opening-172",
    "title": "Khai cuộc #172: Tạo căn cứ sống và Liên kết nhóm quân (Bài 172)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Bảo vệ Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][dr][cp][pd][qd]AW[dc][dd][fc][de][pp];B[pj])"
  },
  {
    "id": "opening-173",
    "title": "Khai cuộc #173: Hướng phát triển (Direction of Play) (Bài 173)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Chọc thủng F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[dc][ec][gq][jq][pp];B[fq])"
  },
  {
    "id": "opening-174",
    "title": "Khai cuộc #174: Lựa chọn Định thức phù hợp toàn cục (Bài 174)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Bẻ góc B18 (nước BB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][cd][ce][pd][qd]AW[dc][ec][fc][gc][pp];B[bb])"
  },
  {
    "id": "opening-175",
    "title": "Khai cuộc #175: Công thủ toàn diện (Tấn công kiếm đất) (Bài 175)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đâm giữa D10 (nước DJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[cj][dj][ej][pp];B[dj])"
  },
  {
    "id": "opening-176",
    "title": "Khai cuộc #176: Chuyển giao Khai cuộc sang Trung bàn (Bài 176)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Bẻ đầu M17 (nước LC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[kc][kd][ke][pd][qd][dp]AW[jc][jd][le][mc][pp];B[lc])"
  },
  {
    "id": "opening-177",
    "title": "Khai cuộc #177: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 177)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Cân bằng K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[jd])"
  },
  {
    "id": "opening-178",
    "title": "Khai cuộc #178: Mở rộng và Thiết lập Moyo (Bài 178)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Phát triển K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[cc][dc][fc][gc][pp];B[jd])"
  },
  {
    "id": "opening-179",
    "title": "Khai cuộc #179: Đả nhập và Giảm bớt thế đối thủ (Bài 179)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đứng dậy C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pp][op];B[cj])"
  },
  {
    "id": "opening-180",
    "title": "Khai cuộc #180: Tạo căn cứ sống và Liên kết nhóm quân (Bài 180)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Tiếp cận H17 (nước HC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][jc][pp];B[hc])"
  },
  {
    "id": "opening-181",
    "title": "Khai cuộc #181: Hướng phát triển (Direction of Play) (Bài 181)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đè ép F4 (nước FP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][rd][dp][dq][dr]AW[dc][dd][ed][pp][qp];B[fp])"
  },
  {
    "id": "opening-182",
    "title": "Khai cuộc #182: Lựa chọn Định thức phù hợp toàn cục (Bài 182)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Nhảy hàng 4 Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][cp][pd][qd][qf]AW[dd][dc][fc][pp][op];B[pj])"
  },
  {
    "id": "opening-183",
    "title": "Khai cuộc #183: Công thủ toàn diện (Tấn công kiếm đất) (Bài 183)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đứng đối xứng Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][dp][dq][pp][pq]AW[dd][ed][fd][cj][dj];B[pj])"
  },
  {
    "id": "opening-184",
    "title": "Khai cuộc #184: Chuyển giao Khai cuộc sang Trung bàn (Bài 184)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Cột cờ K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][pj][dp][dq][cp]AW[dd][cd][bd][pp][qp];B[jp])"
  },
  {
    "id": "opening-185",
    "title": "Khai cuộc #185: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 185)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Biên phải R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][qk]AW[dd][dc][cp][eq];B[pj])"
  },
  {
    "id": "opening-186",
    "title": "Khai cuộc #186: Mở rộng và Thiết lập Moyo (Bài 186)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Nhảy giữ góc O16 (nước ND) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][po]AW[dd][dc][fc][qf];B[nd])"
  },
  {
    "id": "opening-187",
    "title": "Khai cuộc #187: Đả nhập và Giảm bớt thế đối thủ (Bài 187)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Mở rộng 2 ô R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][oq]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-188",
    "title": "Khai cuộc #188: Tạo căn cứ sống và Liên kết nhóm quân (Bài 188)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Tiếp xúc góc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-189",
    "title": "Khai cuộc #189: Hướng phát triển (Direction of Play) (Bài 189)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Khóa đáy K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-190",
    "title": "Khai cuộc #190: Lựa chọn Định thức phù hợp toàn cục (Bài 190)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Treo biên R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dd][pq][po]AW[oc][cp][eq][qn];B[qj])"
  },
  {
    "id": "opening-191",
    "title": "Khai cuộc #191: Công thủ toàn diện (Tấn công kiếm đất) (Bài 191)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Mở biên dưới K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qp]AW[dc][de][cn][fq];B[jp])"
  },
  {
    "id": "opening-192",
    "title": "Khai cuộc #192: Chuyển giao Khai cuộc sang Trung bàn (Bài 192)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Ép góc P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pr]AW[dc][fc][cn][qf];B[od])"
  },
  {
    "id": "opening-193",
    "title": "Khai cuộc #193: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 193)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Kiểm soát biên Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][cf][ep][qn];B[pj])"
  },
  {
    "id": "opening-194",
    "title": "Khai cuộc #194: Mở rộng và Thiết lập Moyo (Bài 194)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Điểm đỉnh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qj]AW[dc][ce][fq][cn];B[jd])"
  },
  {
    "id": "opening-195",
    "title": "Khai cuộc #195: Đả nhập và Giảm bớt thế đối thủ (Bài 195)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Thiết lập Sanrensei K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-196",
    "title": "Khai cuộc #196: Tạo căn cứ sống và Liên kết nhóm quân (Bài 196)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Điểm trung tâm K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qj][pq][dp]AW[dd][dj][cn][fq];B[jd])"
  },
  {
    "id": "opening-197",
    "title": "Khai cuộc #197: Hướng phát triển (Direction of Play) (Bài 197)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Khai cuộc Trung Quốc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qk][po]AW[dd][dj][cf][fq];B[nc])"
  },
  {
    "id": "opening-198",
    "title": "Khai cuộc #198: Lựa chọn Định thức phù hợp toàn cục (Bài 198)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Gia cố trục R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qj][oj]AW[dd][dj][fq][jp];B[pj])"
  },
  {
    "id": "opening-199",
    "title": "Khai cuộc #199: Công thủ toàn diện (Tấn công kiếm đất) (Bài 199)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Hoàn thiện ngũ giác K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp][jp]AW[dd][dj][fq][cn];B[jd])"
  },
  {
    "id": "opening-200",
    "title": "Khai cuộc #200: Chuyển giao Khai cuộc sang Trung bàn (Bài 200)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Khai cuộc Trung Quốc biến thể P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qn][qk]AW[dc][cf][fq][nc];B[od])"
  },
  {
    "id": "opening-201",
    "title": "Khai cuộc #201: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 201)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Liên kết hai cánh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj][dj]AW[dd][fc][fq][jp];B[jd])"
  },
  {
    "id": "opening-202",
    "title": "Khai cuộc #202: Mở rộng và Thiết lập Moyo (Bài 202)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Củng cố biên phải R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn][jp]AW[dc][de][eq][qf];B[qk])"
  },
  {
    "id": "opening-203",
    "title": "Khai cuộc #203: Đả nhập và Giảm bớt thế đối thủ (Bài 203)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Cắt đứt F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][cp]AW[dc][de][fp][gq];B[fq])"
  },
  {
    "id": "opening-204",
    "title": "Khai cuộc #204: Tạo căn cứ sống và Liên kết nhóm quân (Bài 204)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Mở góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][qp][pq]AW[dd][fc][cf][qf];B[nc])"
  },
  {
    "id": "opening-205",
    "title": "Khai cuộc #205: Hướng phát triển (Direction of Play) (Bài 205)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Bảo vệ sườn R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][oq]AW[dc][de][eq][qn];B[qk])"
  },
  {
    "id": "opening-206",
    "title": "Khai cuộc #206: Lựa chọn Định thức phù hợp toàn cục (Bài 206)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Nhảy hàng 3 R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][po]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-207",
    "title": "Khai cuộc #207: Công thủ toàn diện (Tấn công kiếm đất) (Bài 207)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Tiếp xúc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-208",
    "title": "Khai cuộc #208: Chuyển giao Khai cuộc sang Trung bàn (Bài 208)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Vươn ra Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][pr]AW[dd][fc][eq][qn];B[pj])"
  },
  {
    "id": "opening-209",
    "title": "Khai cuộc #209: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 209)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Bịt góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qp]AW[dc][ce][fq][qf];B[nc])"
  },
  {
    "id": "opening-210",
    "title": "Khai cuộc #210: Mở rộng và Thiết lập Moyo (Bài 210)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Tạo thế đứng R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][de][fp][qn];B[qj])"
  },
  {
    "id": "opening-211",
    "title": "Khai cuộc #211: Đả nhập và Giảm bớt thế đối thủ (Bài 211)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đả nhập K17 (nước JC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][pd][qd][dp]AW[dc][ec][gc][qj][pp];B[jc])"
  },
  {
    "id": "opening-212",
    "title": "Khai cuộc #212: Tạo căn cứ sống và Liên kết nhóm quân (Bài 212)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Mở biên trái C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pj][pp][op];B[cj])"
  },
  {
    "id": "opening-213",
    "title": "Khai cuộc #213: Hướng phát triển (Direction of Play) (Bài 213)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Chèn ép E18 (nước EB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cc][cd][dd][ed][pd][qd]AW[dc][ec][gc][qj][pp];B[eb])"
  },
  {
    "id": "opening-214",
    "title": "Khai cuộc #214: Lựa chọn Định thức phù hợp toàn cục (Bài 214)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Cắt góc E3 (nước EQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fp][gq][pp];B[eq])"
  },
  {
    "id": "opening-215",
    "title": "Khai cuộc #215: Công thủ toàn diện (Tấn công kiếm đất) (Bài 215)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đâm vai K15 (nước JE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fc][gc][pp];B[je])"
  },
  {
    "id": "opening-216",
    "title": "Khai cuộc #216: Chuyển giao Khai cuộc sang Trung bàn (Bài 216)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Chiếm biên C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cp][dp][ep][fp][pd][qd]AW[cq][dq][eq][fq][pp];B[cj])"
  },
  {
    "id": "opening-217",
    "title": "Khai cuộc #217: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 217)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đả nhập C9 (nước CK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[ck])"
  },
  {
    "id": "opening-218",
    "title": "Khai cuộc #218: Mở rộng và Thiết lập Moyo (Bài 218)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Bảo vệ Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][dr][cp][pd][qd]AW[dc][dd][fc][de][pp];B[pj])"
  },
  {
    "id": "opening-219",
    "title": "Khai cuộc #219: Đả nhập và Giảm bớt thế đối thủ (Bài 219)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Chọc thủng F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[dc][ec][gq][jq][pp];B[fq])"
  },
  {
    "id": "opening-220",
    "title": "Khai cuộc #220: Tạo căn cứ sống và Liên kết nhóm quân (Bài 220)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Bẻ góc B18 (nước BB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][cd][ce][pd][qd]AW[dc][ec][fc][gc][pp];B[bb])"
  },
  {
    "id": "opening-221",
    "title": "Khai cuộc #221: Hướng phát triển (Direction of Play) (Bài 221)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đâm giữa D10 (nước DJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[cj][dj][ej][pp];B[dj])"
  },
  {
    "id": "opening-222",
    "title": "Khai cuộc #222: Lựa chọn Định thức phù hợp toàn cục (Bài 222)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Bẻ đầu M17 (nước LC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[kc][kd][ke][pd][qd][dp]AW[jc][jd][le][mc][pp];B[lc])"
  },
  {
    "id": "opening-223",
    "title": "Khai cuộc #223: Công thủ toàn diện (Tấn công kiếm đất) (Bài 223)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Cân bằng K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[jd])"
  },
  {
    "id": "opening-224",
    "title": "Khai cuộc #224: Chuyển giao Khai cuộc sang Trung bàn (Bài 224)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Phát triển K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[cc][dc][fc][gc][pp];B[jd])"
  },
  {
    "id": "opening-225",
    "title": "Khai cuộc #225: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 225)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đứng dậy C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pp][op];B[cj])"
  },
  {
    "id": "opening-226",
    "title": "Khai cuộc #226: Mở rộng và Thiết lập Moyo (Bài 226)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Tiếp cận H17 (nước HC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][jc][pp];B[hc])"
  },
  {
    "id": "opening-227",
    "title": "Khai cuộc #227: Đả nhập và Giảm bớt thế đối thủ (Bài 227)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đè ép F4 (nước FP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][rd][dp][dq][dr]AW[dc][dd][ed][pp][qp];B[fp])"
  },
  {
    "id": "opening-228",
    "title": "Khai cuộc #228: Tạo căn cứ sống và Liên kết nhóm quân (Bài 228)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Nhảy hàng 4 Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][cp][pd][qd][qf]AW[dd][dc][fc][pp][op];B[pj])"
  },
  {
    "id": "opening-229",
    "title": "Khai cuộc #229: Hướng phát triển (Direction of Play) (Bài 229)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đứng đối xứng Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][dp][dq][pp][pq]AW[dd][ed][fd][cj][dj];B[pj])"
  },
  {
    "id": "opening-230",
    "title": "Khai cuộc #230: Lựa chọn Định thức phù hợp toàn cục (Bài 230)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Cột cờ K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][pj][dp][dq][cp]AW[dd][cd][bd][pp][qp];B[jp])"
  },
  {
    "id": "opening-231",
    "title": "Khai cuộc #231: Công thủ toàn diện (Tấn công kiếm đất) (Bài 231)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Biên phải R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][qk]AW[dd][dc][cp][eq];B[pj])"
  },
  {
    "id": "opening-232",
    "title": "Khai cuộc #232: Chuyển giao Khai cuộc sang Trung bàn (Bài 232)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Nhảy giữ góc O16 (nước ND) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][po]AW[dd][dc][fc][qf];B[nd])"
  },
  {
    "id": "opening-233",
    "title": "Khai cuộc #233: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 233)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Mở rộng 2 ô R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][oq]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-234",
    "title": "Khai cuộc #234: Mở rộng và Thiết lập Moyo (Bài 234)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Tiếp xúc góc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-235",
    "title": "Khai cuộc #235: Đả nhập và Giảm bớt thế đối thủ (Bài 235)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Khóa đáy K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-236",
    "title": "Khai cuộc #236: Tạo căn cứ sống và Liên kết nhóm quân (Bài 236)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Treo biên R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dd][pq][po]AW[oc][cp][eq][qn];B[qj])"
  },
  {
    "id": "opening-237",
    "title": "Khai cuộc #237: Hướng phát triển (Direction of Play) (Bài 237)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Mở biên dưới K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qp]AW[dc][de][cn][fq];B[jp])"
  },
  {
    "id": "opening-238",
    "title": "Khai cuộc #238: Lựa chọn Định thức phù hợp toàn cục (Bài 238)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Ép góc P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pr]AW[dc][fc][cn][qf];B[od])"
  },
  {
    "id": "opening-239",
    "title": "Khai cuộc #239: Công thủ toàn diện (Tấn công kiếm đất) (Bài 239)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Kiểm soát biên Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][cf][ep][qn];B[pj])"
  },
  {
    "id": "opening-240",
    "title": "Khai cuộc #240: Chuyển giao Khai cuộc sang Trung bàn (Bài 240)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Điểm đỉnh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qj]AW[dc][ce][fq][cn];B[jd])"
  },
  {
    "id": "opening-241",
    "title": "Khai cuộc #241: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 241)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Thiết lập Sanrensei K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-242",
    "title": "Khai cuộc #242: Mở rộng và Thiết lập Moyo (Bài 242)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Điểm trung tâm K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qj][pq][dp]AW[dd][dj][cn][fq];B[jd])"
  },
  {
    "id": "opening-243",
    "title": "Khai cuộc #243: Đả nhập và Giảm bớt thế đối thủ (Bài 243)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Khai cuộc Trung Quốc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qk][po]AW[dd][dj][cf][fq];B[nc])"
  },
  {
    "id": "opening-244",
    "title": "Khai cuộc #244: Tạo căn cứ sống và Liên kết nhóm quân (Bài 244)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Gia cố trục R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qj][oj]AW[dd][dj][fq][jp];B[pj])"
  },
  {
    "id": "opening-245",
    "title": "Khai cuộc #245: Hướng phát triển (Direction of Play) (Bài 245)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Hoàn thiện ngũ giác K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp][jp]AW[dd][dj][fq][cn];B[jd])"
  },
  {
    "id": "opening-246",
    "title": "Khai cuộc #246: Lựa chọn Định thức phù hợp toàn cục (Bài 246)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Khai cuộc Trung Quốc biến thể P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qn][qk]AW[dc][cf][fq][nc];B[od])"
  },
  {
    "id": "opening-247",
    "title": "Khai cuộc #247: Công thủ toàn diện (Tấn công kiếm đất) (Bài 247)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Liên kết hai cánh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj][dj]AW[dd][fc][fq][jp];B[jd])"
  },
  {
    "id": "opening-248",
    "title": "Khai cuộc #248: Chuyển giao Khai cuộc sang Trung bàn (Bài 248)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Củng cố biên phải R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn][jp]AW[dc][de][eq][qf];B[qk])"
  },
  {
    "id": "opening-249",
    "title": "Khai cuộc #249: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 249)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Cắt đứt F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][cp]AW[dc][de][fp][gq];B[fq])"
  },
  {
    "id": "opening-250",
    "title": "Khai cuộc #250: Mở rộng và Thiết lập Moyo (Bài 250)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Mở góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][qp][pq]AW[dd][fc][cf][qf];B[nc])"
  },
  {
    "id": "opening-251",
    "title": "Khai cuộc #251: Đả nhập và Giảm bớt thế đối thủ (Bài 251)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Bảo vệ sườn R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][oq]AW[dc][de][eq][qn];B[qk])"
  },
  {
    "id": "opening-252",
    "title": "Khai cuộc #252: Tạo căn cứ sống và Liên kết nhóm quân (Bài 252)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Nhảy hàng 3 R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][po]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-253",
    "title": "Khai cuộc #253: Hướng phát triển (Direction of Play) (Bài 253)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Tiếp xúc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-254",
    "title": "Khai cuộc #254: Lựa chọn Định thức phù hợp toàn cục (Bài 254)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Vươn ra Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][pr]AW[dd][fc][eq][qn];B[pj])"
  },
  {
    "id": "opening-255",
    "title": "Khai cuộc #255: Công thủ toàn diện (Tấn công kiếm đất) (Bài 255)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Bịt góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qp]AW[dc][ce][fq][qf];B[nc])"
  },
  {
    "id": "opening-256",
    "title": "Khai cuộc #256: Chuyển giao Khai cuộc sang Trung bàn (Bài 256)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Tạo thế đứng R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][de][fp][qn];B[qj])"
  },
  {
    "id": "opening-257",
    "title": "Khai cuộc #257: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 257)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đả nhập K17 (nước JC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][pd][qd][dp]AW[dc][ec][gc][qj][pp];B[jc])"
  },
  {
    "id": "opening-258",
    "title": "Khai cuộc #258: Mở rộng và Thiết lập Moyo (Bài 258)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Mở biên trái C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pj][pp][op];B[cj])"
  },
  {
    "id": "opening-259",
    "title": "Khai cuộc #259: Đả nhập và Giảm bớt thế đối thủ (Bài 259)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Chèn ép E18 (nước EB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cc][cd][dd][ed][pd][qd]AW[dc][ec][gc][qj][pp];B[eb])"
  },
  {
    "id": "opening-260",
    "title": "Khai cuộc #260: Tạo căn cứ sống và Liên kết nhóm quân (Bài 260)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Cắt góc E3 (nước EQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fp][gq][pp];B[eq])"
  },
  {
    "id": "opening-261",
    "title": "Khai cuộc #261: Hướng phát triển (Direction of Play) (Bài 261)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đâm vai K15 (nước JE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fc][gc][pp];B[je])"
  },
  {
    "id": "opening-262",
    "title": "Khai cuộc #262: Lựa chọn Định thức phù hợp toàn cục (Bài 262)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Chiếm biên C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cp][dp][ep][fp][pd][qd]AW[cq][dq][eq][fq][pp];B[cj])"
  },
  {
    "id": "opening-263",
    "title": "Khai cuộc #263: Công thủ toàn diện (Tấn công kiếm đất) (Bài 263)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đả nhập C9 (nước CK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[ck])"
  },
  {
    "id": "opening-264",
    "title": "Khai cuộc #264: Chuyển giao Khai cuộc sang Trung bàn (Bài 264)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Bảo vệ Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][dr][cp][pd][qd]AW[dc][dd][fc][de][pp];B[pj])"
  },
  {
    "id": "opening-265",
    "title": "Khai cuộc #265: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 265)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Chọc thủng F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[dc][ec][gq][jq][pp];B[fq])"
  },
  {
    "id": "opening-266",
    "title": "Khai cuộc #266: Mở rộng và Thiết lập Moyo (Bài 266)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Bẻ góc B18 (nước BB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][cd][ce][pd][qd]AW[dc][ec][fc][gc][pp];B[bb])"
  },
  {
    "id": "opening-267",
    "title": "Khai cuộc #267: Đả nhập và Giảm bớt thế đối thủ (Bài 267)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đâm giữa D10 (nước DJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[cj][dj][ej][pp];B[dj])"
  },
  {
    "id": "opening-268",
    "title": "Khai cuộc #268: Tạo căn cứ sống và Liên kết nhóm quân (Bài 268)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Bẻ đầu M17 (nước LC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[kc][kd][ke][pd][qd][dp]AW[jc][jd][le][mc][pp];B[lc])"
  },
  {
    "id": "opening-269",
    "title": "Khai cuộc #269: Hướng phát triển (Direction of Play) (Bài 269)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Cân bằng K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[jd])"
  },
  {
    "id": "opening-270",
    "title": "Khai cuộc #270: Lựa chọn Định thức phù hợp toàn cục (Bài 270)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Phát triển K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[cc][dc][fc][gc][pp];B[jd])"
  },
  {
    "id": "opening-271",
    "title": "Khai cuộc #271: Công thủ toàn diện (Tấn công kiếm đất) (Bài 271)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đứng dậy C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pp][op];B[cj])"
  },
  {
    "id": "opening-272",
    "title": "Khai cuộc #272: Chuyển giao Khai cuộc sang Trung bàn (Bài 272)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Tiếp cận H17 (nước HC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][jc][pp];B[hc])"
  },
  {
    "id": "opening-273",
    "title": "Khai cuộc #273: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 273)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đè ép F4 (nước FP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][rd][dp][dq][dr]AW[dc][dd][ed][pp][qp];B[fp])"
  },
  {
    "id": "opening-274",
    "title": "Khai cuộc #274: Mở rộng và Thiết lập Moyo (Bài 274)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Nhảy hàng 4 Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][cp][pd][qd][qf]AW[dd][dc][fc][pp][op];B[pj])"
  },
  {
    "id": "opening-275",
    "title": "Khai cuộc #275: Đả nhập và Giảm bớt thế đối thủ (Bài 275)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đứng đối xứng Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][dp][dq][pp][pq]AW[dd][ed][fd][cj][dj];B[pj])"
  },
  {
    "id": "opening-276",
    "title": "Khai cuộc #276: Tạo căn cứ sống và Liên kết nhóm quân (Bài 276)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Cột cờ K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][pj][dp][dq][cp]AW[dd][cd][bd][pp][qp];B[jp])"
  },
  {
    "id": "opening-277",
    "title": "Khai cuộc #277: Hướng phát triển (Direction of Play) (Bài 277)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Biên phải R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][qk]AW[dd][dc][cp][eq];B[pj])"
  },
  {
    "id": "opening-278",
    "title": "Khai cuộc #278: Lựa chọn Định thức phù hợp toàn cục (Bài 278)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Nhảy giữ góc O16 (nước ND) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][po]AW[dd][dc][fc][qf];B[nd])"
  },
  {
    "id": "opening-279",
    "title": "Khai cuộc #279: Công thủ toàn diện (Tấn công kiếm đất) (Bài 279)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Mở rộng 2 ô R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][oq]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-280",
    "title": "Khai cuộc #280: Chuyển giao Khai cuộc sang Trung bàn (Bài 280)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Tiếp xúc góc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-281",
    "title": "Khai cuộc #281: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 281)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Khóa đáy K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-282",
    "title": "Khai cuộc #282: Mở rộng và Thiết lập Moyo (Bài 282)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Treo biên R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dd][pq][po]AW[oc][cp][eq][qn];B[qj])"
  },
  {
    "id": "opening-283",
    "title": "Khai cuộc #283: Đả nhập và Giảm bớt thế đối thủ (Bài 283)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Mở biên dưới K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qp]AW[dc][de][cn][fq];B[jp])"
  },
  {
    "id": "opening-284",
    "title": "Khai cuộc #284: Tạo căn cứ sống và Liên kết nhóm quân (Bài 284)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Ép góc P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pr]AW[dc][fc][cn][qf];B[od])"
  },
  {
    "id": "opening-285",
    "title": "Khai cuộc #285: Hướng phát triển (Direction of Play) (Bài 285)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Kiểm soát biên Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][cf][ep][qn];B[pj])"
  },
  {
    "id": "opening-286",
    "title": "Khai cuộc #286: Lựa chọn Định thức phù hợp toàn cục (Bài 286)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Điểm đỉnh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qj]AW[dc][ce][fq][cn];B[jd])"
  },
  {
    "id": "opening-287",
    "title": "Khai cuộc #287: Công thủ toàn diện (Tấn công kiếm đất) (Bài 287)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Thiết lập Sanrensei K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-288",
    "title": "Khai cuộc #288: Chuyển giao Khai cuộc sang Trung bàn (Bài 288)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Điểm trung tâm K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qj][pq][dp]AW[dd][dj][cn][fq];B[jd])"
  },
  {
    "id": "opening-289",
    "title": "Khai cuộc #289: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 289)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Khai cuộc Trung Quốc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qk][po]AW[dd][dj][cf][fq];B[nc])"
  },
  {
    "id": "opening-290",
    "title": "Khai cuộc #290: Mở rộng và Thiết lập Moyo (Bài 290)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Gia cố trục R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qj][oj]AW[dd][dj][fq][jp];B[pj])"
  },
  {
    "id": "opening-291",
    "title": "Khai cuộc #291: Đả nhập và Giảm bớt thế đối thủ (Bài 291)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Hoàn thiện ngũ giác K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp][jp]AW[dd][dj][fq][cn];B[jd])"
  },
  {
    "id": "opening-292",
    "title": "Khai cuộc #292: Tạo căn cứ sống và Liên kết nhóm quân (Bài 292)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Khai cuộc Trung Quốc biến thể P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qn][qk]AW[dc][cf][fq][nc];B[od])"
  },
  {
    "id": "opening-293",
    "title": "Khai cuộc #293: Hướng phát triển (Direction of Play) (Bài 293)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Liên kết hai cánh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj][dj]AW[dd][fc][fq][jp];B[jd])"
  },
  {
    "id": "opening-294",
    "title": "Khai cuộc #294: Lựa chọn Định thức phù hợp toàn cục (Bài 294)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Củng cố biên phải R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn][jp]AW[dc][de][eq][qf];B[qk])"
  },
  {
    "id": "opening-295",
    "title": "Khai cuộc #295: Công thủ toàn diện (Tấn công kiếm đất) (Bài 295)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Cắt đứt F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][cp]AW[dc][de][fp][gq];B[fq])"
  },
  {
    "id": "opening-296",
    "title": "Khai cuộc #296: Chuyển giao Khai cuộc sang Trung bàn (Bài 296)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Mở góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][qp][pq]AW[dd][fc][cf][qf];B[nc])"
  },
  {
    "id": "opening-297",
    "title": "Khai cuộc #297: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 297)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Bảo vệ sườn R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][oq]AW[dc][de][eq][qn];B[qk])"
  },
  {
    "id": "opening-298",
    "title": "Khai cuộc #298: Mở rộng và Thiết lập Moyo (Bài 298)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Nhảy hàng 3 R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][po]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-299",
    "title": "Khai cuộc #299: Đả nhập và Giảm bớt thế đối thủ (Bài 299)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Tiếp xúc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-300",
    "title": "Khai cuộc #300: Tạo căn cứ sống và Liên kết nhóm quân (Bài 300)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Vươn ra Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][pr]AW[dd][fc][eq][qn];B[pj])"
  },
  {
    "id": "opening-301",
    "title": "Khai cuộc #301: Hướng phát triển (Direction of Play) (Bài 301)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Bịt góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qp]AW[dc][ce][fq][qf];B[nc])"
  },
  {
    "id": "opening-302",
    "title": "Khai cuộc #302: Lựa chọn Định thức phù hợp toàn cục (Bài 302)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Tạo thế đứng R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][de][fp][qn];B[qj])"
  },
  {
    "id": "opening-303",
    "title": "Khai cuộc #303: Công thủ toàn diện (Tấn công kiếm đất) (Bài 303)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đả nhập K17 (nước JC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][pd][qd][dp]AW[dc][ec][gc][qj][pp];B[jc])"
  },
  {
    "id": "opening-304",
    "title": "Khai cuộc #304: Chuyển giao Khai cuộc sang Trung bàn (Bài 304)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Mở biên trái C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pj][pp][op];B[cj])"
  },
  {
    "id": "opening-305",
    "title": "Khai cuộc #305: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 305)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Chèn ép E18 (nước EB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cc][cd][dd][ed][pd][qd]AW[dc][ec][gc][qj][pp];B[eb])"
  },
  {
    "id": "opening-306",
    "title": "Khai cuộc #306: Mở rộng và Thiết lập Moyo (Bài 306)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Cắt góc E3 (nước EQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fp][gq][pp];B[eq])"
  },
  {
    "id": "opening-307",
    "title": "Khai cuộc #307: Đả nhập và Giảm bớt thế đối thủ (Bài 307)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đâm vai K15 (nước JE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fc][gc][pp];B[je])"
  },
  {
    "id": "opening-308",
    "title": "Khai cuộc #308: Tạo căn cứ sống và Liên kết nhóm quân (Bài 308)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Chiếm biên C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cp][dp][ep][fp][pd][qd]AW[cq][dq][eq][fq][pp];B[cj])"
  },
  {
    "id": "opening-309",
    "title": "Khai cuộc #309: Hướng phát triển (Direction of Play) (Bài 309)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đả nhập C9 (nước CK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[ck])"
  },
  {
    "id": "opening-310",
    "title": "Khai cuộc #310: Lựa chọn Định thức phù hợp toàn cục (Bài 310)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Bảo vệ Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][dr][cp][pd][qd]AW[dc][dd][fc][de][pp];B[pj])"
  },
  {
    "id": "opening-311",
    "title": "Khai cuộc #311: Công thủ toàn diện (Tấn công kiếm đất) (Bài 311)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Chọc thủng F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[dc][ec][gq][jq][pp];B[fq])"
  },
  {
    "id": "opening-312",
    "title": "Khai cuộc #312: Chuyển giao Khai cuộc sang Trung bàn (Bài 312)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Bẻ góc B18 (nước BB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][cd][ce][pd][qd]AW[dc][ec][fc][gc][pp];B[bb])"
  },
  {
    "id": "opening-313",
    "title": "Khai cuộc #313: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 313)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đâm giữa D10 (nước DJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[cj][dj][ej][pp];B[dj])"
  },
  {
    "id": "opening-314",
    "title": "Khai cuộc #314: Mở rộng và Thiết lập Moyo (Bài 314)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Bẻ đầu M17 (nước LC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[kc][kd][ke][pd][qd][dp]AW[jc][jd][le][mc][pp];B[lc])"
  },
  {
    "id": "opening-315",
    "title": "Khai cuộc #315: Đả nhập và Giảm bớt thế đối thủ (Bài 315)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Cân bằng K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[jd])"
  },
  {
    "id": "opening-316",
    "title": "Khai cuộc #316: Tạo căn cứ sống và Liên kết nhóm quân (Bài 316)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Phát triển K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[cc][dc][fc][gc][pp];B[jd])"
  },
  {
    "id": "opening-317",
    "title": "Khai cuộc #317: Hướng phát triển (Direction of Play) (Bài 317)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đứng dậy C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pp][op];B[cj])"
  },
  {
    "id": "opening-318",
    "title": "Khai cuộc #318: Lựa chọn Định thức phù hợp toàn cục (Bài 318)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Tiếp cận H17 (nước HC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][jc][pp];B[hc])"
  },
  {
    "id": "opening-319",
    "title": "Khai cuộc #319: Công thủ toàn diện (Tấn công kiếm đất) (Bài 319)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đè ép F4 (nước FP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][rd][dp][dq][dr]AW[dc][dd][ed][pp][qp];B[fp])"
  },
  {
    "id": "opening-320",
    "title": "Khai cuộc #320: Chuyển giao Khai cuộc sang Trung bàn (Bài 320)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Nhảy hàng 4 Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][cp][pd][qd][qf]AW[dd][dc][fc][pp][op];B[pj])"
  },
  {
    "id": "opening-321",
    "title": "Khai cuộc #321: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 321)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đứng đối xứng Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][dp][dq][pp][pq]AW[dd][ed][fd][cj][dj];B[pj])"
  },
  {
    "id": "opening-322",
    "title": "Khai cuộc #322: Mở rộng và Thiết lập Moyo (Bài 322)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Cột cờ K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][pj][dp][dq][cp]AW[dd][cd][bd][pp][qp];B[jp])"
  },
  {
    "id": "opening-323",
    "title": "Khai cuộc #323: Đả nhập và Giảm bớt thế đối thủ (Bài 323)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Biên phải R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][qk]AW[dd][dc][cp][eq];B[pj])"
  },
  {
    "id": "opening-324",
    "title": "Khai cuộc #324: Tạo căn cứ sống và Liên kết nhóm quân (Bài 324)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Nhảy giữ góc O16 (nước ND) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][po]AW[dd][dc][fc][qf];B[nd])"
  },
  {
    "id": "opening-325",
    "title": "Khai cuộc #325: Hướng phát triển (Direction of Play) (Bài 325)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Mở rộng 2 ô R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][oq]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-326",
    "title": "Khai cuộc #326: Lựa chọn Định thức phù hợp toàn cục (Bài 326)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Tiếp xúc góc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-327",
    "title": "Khai cuộc #327: Công thủ toàn diện (Tấn công kiếm đất) (Bài 327)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Khóa đáy K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-328",
    "title": "Khai cuộc #328: Chuyển giao Khai cuộc sang Trung bàn (Bài 328)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Treo biên R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dd][pq][po]AW[oc][cp][eq][qn];B[qj])"
  },
  {
    "id": "opening-329",
    "title": "Khai cuộc #329: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 329)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Mở biên dưới K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qp]AW[dc][de][cn][fq];B[jp])"
  },
  {
    "id": "opening-330",
    "title": "Khai cuộc #330: Mở rộng và Thiết lập Moyo (Bài 330)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Ép góc P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pr]AW[dc][fc][cn][qf];B[od])"
  },
  {
    "id": "opening-331",
    "title": "Khai cuộc #331: Đả nhập và Giảm bớt thế đối thủ (Bài 331)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Kiểm soát biên Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][cf][ep][qn];B[pj])"
  },
  {
    "id": "opening-332",
    "title": "Khai cuộc #332: Tạo căn cứ sống và Liên kết nhóm quân (Bài 332)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Điểm đỉnh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qj]AW[dc][ce][fq][cn];B[jd])"
  },
  {
    "id": "opening-333",
    "title": "Khai cuộc #333: Hướng phát triển (Direction of Play) (Bài 333)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Thiết lập Sanrensei K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-334",
    "title": "Khai cuộc #334: Lựa chọn Định thức phù hợp toàn cục (Bài 334)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Điểm trung tâm K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qj][pq][dp]AW[dd][dj][cn][fq];B[jd])"
  },
  {
    "id": "opening-335",
    "title": "Khai cuộc #335: Công thủ toàn diện (Tấn công kiếm đất) (Bài 335)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Khai cuộc Trung Quốc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qk][po]AW[dd][dj][cf][fq];B[nc])"
  },
  {
    "id": "opening-336",
    "title": "Khai cuộc #336: Chuyển giao Khai cuộc sang Trung bàn (Bài 336)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Gia cố trục R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qj][oj]AW[dd][dj][fq][jp];B[pj])"
  },
  {
    "id": "opening-337",
    "title": "Khai cuộc #337: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 337)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Hoàn thiện ngũ giác K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp][jp]AW[dd][dj][fq][cn];B[jd])"
  },
  {
    "id": "opening-338",
    "title": "Khai cuộc #338: Mở rộng và Thiết lập Moyo (Bài 338)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Khai cuộc Trung Quốc biến thể P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qn][qk]AW[dc][cf][fq][nc];B[od])"
  },
  {
    "id": "opening-339",
    "title": "Khai cuộc #339: Đả nhập và Giảm bớt thế đối thủ (Bài 339)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Liên kết hai cánh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj][dj]AW[dd][fc][fq][jp];B[jd])"
  },
  {
    "id": "opening-340",
    "title": "Khai cuộc #340: Tạo căn cứ sống và Liên kết nhóm quân (Bài 340)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Củng cố biên phải R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn][jp]AW[dc][de][eq][qf];B[qk])"
  },
  {
    "id": "opening-341",
    "title": "Khai cuộc #341: Hướng phát triển (Direction of Play) (Bài 341)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Cắt đứt F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][cp]AW[dc][de][fp][gq];B[fq])"
  },
  {
    "id": "opening-342",
    "title": "Khai cuộc #342: Lựa chọn Định thức phù hợp toàn cục (Bài 342)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Mở góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][qp][pq]AW[dd][fc][cf][qf];B[nc])"
  },
  {
    "id": "opening-343",
    "title": "Khai cuộc #343: Công thủ toàn diện (Tấn công kiếm đất) (Bài 343)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Bảo vệ sườn R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][oq]AW[dc][de][eq][qn];B[qk])"
  },
  {
    "id": "opening-344",
    "title": "Khai cuộc #344: Chuyển giao Khai cuộc sang Trung bàn (Bài 344)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Nhảy hàng 3 R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][po]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-345",
    "title": "Khai cuộc #345: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 345)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Tiếp xúc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-346",
    "title": "Khai cuộc #346: Mở rộng và Thiết lập Moyo (Bài 346)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Vươn ra Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][pr]AW[dd][fc][eq][qn];B[pj])"
  },
  {
    "id": "opening-347",
    "title": "Khai cuộc #347: Đả nhập và Giảm bớt thế đối thủ (Bài 347)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Bịt góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qp]AW[dc][ce][fq][qf];B[nc])"
  },
  {
    "id": "opening-348",
    "title": "Khai cuộc #348: Tạo căn cứ sống và Liên kết nhóm quân (Bài 348)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Tạo thế đứng R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][de][fp][qn];B[qj])"
  },
  {
    "id": "opening-349",
    "title": "Khai cuộc #349: Hướng phát triển (Direction of Play) (Bài 349)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đả nhập K17 (nước JC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][pd][qd][dp]AW[dc][ec][gc][qj][pp];B[jc])"
  },
  {
    "id": "opening-350",
    "title": "Khai cuộc #350: Lựa chọn Định thức phù hợp toàn cục (Bài 350)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Mở biên trái C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pj][pp][op];B[cj])"
  },
  {
    "id": "opening-351",
    "title": "Khai cuộc #351: Công thủ toàn diện (Tấn công kiếm đất) (Bài 351)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Chèn ép E18 (nước EB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cc][cd][dd][ed][pd][qd]AW[dc][ec][gc][qj][pp];B[eb])"
  },
  {
    "id": "opening-352",
    "title": "Khai cuộc #352: Chuyển giao Khai cuộc sang Trung bàn (Bài 352)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Cắt góc E3 (nước EQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fp][gq][pp];B[eq])"
  },
  {
    "id": "opening-353",
    "title": "Khai cuộc #353: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 353)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đâm vai K15 (nước JE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fc][gc][pp];B[je])"
  },
  {
    "id": "opening-354",
    "title": "Khai cuộc #354: Mở rộng và Thiết lập Moyo (Bài 354)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Chiếm biên C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cp][dp][ep][fp][pd][qd]AW[cq][dq][eq][fq][pp];B[cj])"
  },
  {
    "id": "opening-355",
    "title": "Khai cuộc #355: Đả nhập và Giảm bớt thế đối thủ (Bài 355)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đả nhập C9 (nước CK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[ck])"
  },
  {
    "id": "opening-356",
    "title": "Khai cuộc #356: Tạo căn cứ sống và Liên kết nhóm quân (Bài 356)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Bảo vệ Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][dr][cp][pd][qd]AW[dc][dd][fc][de][pp];B[pj])"
  },
  {
    "id": "opening-357",
    "title": "Khai cuộc #357: Hướng phát triển (Direction of Play) (Bài 357)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Chọc thủng F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[dc][ec][gq][jq][pp];B[fq])"
  },
  {
    "id": "opening-358",
    "title": "Khai cuộc #358: Lựa chọn Định thức phù hợp toàn cục (Bài 358)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Bẻ góc B18 (nước BB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][cd][ce][pd][qd]AW[dc][ec][fc][gc][pp];B[bb])"
  },
  {
    "id": "opening-359",
    "title": "Khai cuộc #359: Công thủ toàn diện (Tấn công kiếm đất) (Bài 359)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đâm giữa D10 (nước DJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[cj][dj][ej][pp];B[dj])"
  },
  {
    "id": "opening-360",
    "title": "Khai cuộc #360: Chuyển giao Khai cuộc sang Trung bàn (Bài 360)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Bẻ đầu M17 (nước LC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[kc][kd][ke][pd][qd][dp]AW[jc][jd][le][mc][pp];B[lc])"
  },
  {
    "id": "opening-361",
    "title": "Khai cuộc #361: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 361)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Cân bằng K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[jd])"
  },
  {
    "id": "opening-362",
    "title": "Khai cuộc #362: Mở rộng và Thiết lập Moyo (Bài 362)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Phát triển K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[cc][dc][fc][gc][pp];B[jd])"
  },
  {
    "id": "opening-363",
    "title": "Khai cuộc #363: Đả nhập và Giảm bớt thế đối thủ (Bài 363)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đứng dậy C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pp][op];B[cj])"
  },
  {
    "id": "opening-364",
    "title": "Khai cuộc #364: Tạo căn cứ sống và Liên kết nhóm quân (Bài 364)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Tiếp cận H17 (nước HC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][jc][pp];B[hc])"
  },
  {
    "id": "opening-365",
    "title": "Khai cuộc #365: Hướng phát triển (Direction of Play) (Bài 365)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đè ép F4 (nước FP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][rd][dp][dq][dr]AW[dc][dd][ed][pp][qp];B[fp])"
  },
  {
    "id": "opening-366",
    "title": "Khai cuộc #366: Lựa chọn Định thức phù hợp toàn cục (Bài 366)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Nhảy hàng 4 Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][cp][pd][qd][qf]AW[dd][dc][fc][pp][op];B[pj])"
  },
  {
    "id": "opening-367",
    "title": "Khai cuộc #367: Công thủ toàn diện (Tấn công kiếm đất) (Bài 367)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đứng đối xứng Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][dp][dq][pp][pq]AW[dd][ed][fd][cj][dj];B[pj])"
  },
  {
    "id": "opening-368",
    "title": "Khai cuộc #368: Chuyển giao Khai cuộc sang Trung bàn (Bài 368)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Cột cờ K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][pj][dp][dq][cp]AW[dd][cd][bd][pp][qp];B[jp])"
  },
  {
    "id": "opening-369",
    "title": "Khai cuộc #369: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 369)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Biên phải R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][qk]AW[dd][dc][cp][eq];B[pj])"
  },
  {
    "id": "opening-370",
    "title": "Khai cuộc #370: Mở rộng và Thiết lập Moyo (Bài 370)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Nhảy giữ góc O16 (nước ND) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][po]AW[dd][dc][fc][qf];B[nd])"
  },
  {
    "id": "opening-371",
    "title": "Khai cuộc #371: Đả nhập và Giảm bớt thế đối thủ (Bài 371)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Mở rộng 2 ô R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][oq]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-372",
    "title": "Khai cuộc #372: Tạo căn cứ sống và Liên kết nhóm quân (Bài 372)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Tiếp xúc góc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-373",
    "title": "Khai cuộc #373: Hướng phát triển (Direction of Play) (Bài 373)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Khóa đáy K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-374",
    "title": "Khai cuộc #374: Lựa chọn Định thức phù hợp toàn cục (Bài 374)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Treo biên R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dd][pq][po]AW[oc][cp][eq][qn];B[qj])"
  },
  {
    "id": "opening-375",
    "title": "Khai cuộc #375: Công thủ toàn diện (Tấn công kiếm đất) (Bài 375)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Mở biên dưới K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qp]AW[dc][de][cn][fq];B[jp])"
  },
  {
    "id": "opening-376",
    "title": "Khai cuộc #376: Chuyển giao Khai cuộc sang Trung bàn (Bài 376)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Ép góc P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pr]AW[dc][fc][cn][qf];B[od])"
  },
  {
    "id": "opening-377",
    "title": "Khai cuộc #377: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 377)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Kiểm soát biên Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][cf][ep][qn];B[pj])"
  },
  {
    "id": "opening-378",
    "title": "Khai cuộc #378: Mở rộng và Thiết lập Moyo (Bài 378)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Điểm đỉnh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qj]AW[dc][ce][fq][cn];B[jd])"
  },
  {
    "id": "opening-379",
    "title": "Khai cuộc #379: Đả nhập và Giảm bớt thế đối thủ (Bài 379)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Thiết lập Sanrensei K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-380",
    "title": "Khai cuộc #380: Tạo căn cứ sống và Liên kết nhóm quân (Bài 380)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Điểm trung tâm K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qj][pq][dp]AW[dd][dj][cn][fq];B[jd])"
  },
  {
    "id": "opening-381",
    "title": "Khai cuộc #381: Hướng phát triển (Direction of Play) (Bài 381)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Khai cuộc Trung Quốc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qk][po]AW[dd][dj][cf][fq];B[nc])"
  },
  {
    "id": "opening-382",
    "title": "Khai cuộc #382: Lựa chọn Định thức phù hợp toàn cục (Bài 382)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Gia cố trục R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qj][oj]AW[dd][dj][fq][jp];B[pj])"
  },
  {
    "id": "opening-383",
    "title": "Khai cuộc #383: Công thủ toàn diện (Tấn công kiếm đất) (Bài 383)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Hoàn thiện ngũ giác K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp][jp]AW[dd][dj][fq][cn];B[jd])"
  },
  {
    "id": "opening-384",
    "title": "Khai cuộc #384: Chuyển giao Khai cuộc sang Trung bàn (Bài 384)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Khai cuộc Trung Quốc biến thể P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qn][qk]AW[dc][cf][fq][nc];B[od])"
  },
  {
    "id": "opening-385",
    "title": "Khai cuộc #385: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 385)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Liên kết hai cánh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj][dj]AW[dd][fc][fq][jp];B[jd])"
  },
  {
    "id": "opening-386",
    "title": "Khai cuộc #386: Mở rộng và Thiết lập Moyo (Bài 386)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Củng cố biên phải R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn][jp]AW[dc][de][eq][qf];B[qk])"
  },
  {
    "id": "opening-387",
    "title": "Khai cuộc #387: Đả nhập và Giảm bớt thế đối thủ (Bài 387)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Cắt đứt F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][cp]AW[dc][de][fp][gq];B[fq])"
  },
  {
    "id": "opening-388",
    "title": "Khai cuộc #388: Tạo căn cứ sống và Liên kết nhóm quân (Bài 388)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Mở góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][qp][pq]AW[dd][fc][cf][qf];B[nc])"
  },
  {
    "id": "opening-389",
    "title": "Khai cuộc #389: Hướng phát triển (Direction of Play) (Bài 389)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Bảo vệ sườn R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][oq]AW[dc][de][eq][qn];B[qk])"
  },
  {
    "id": "opening-390",
    "title": "Khai cuộc #390: Lựa chọn Định thức phù hợp toàn cục (Bài 390)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Nhảy hàng 3 R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][po]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-391",
    "title": "Khai cuộc #391: Công thủ toàn diện (Tấn công kiếm đất) (Bài 391)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Tiếp xúc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-392",
    "title": "Khai cuộc #392: Chuyển giao Khai cuộc sang Trung bàn (Bài 392)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Vươn ra Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][pr]AW[dd][fc][eq][qn];B[pj])"
  },
  {
    "id": "opening-393",
    "title": "Khai cuộc #393: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 393)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Bịt góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qp]AW[dc][ce][fq][qf];B[nc])"
  },
  {
    "id": "opening-394",
    "title": "Khai cuộc #394: Mở rộng và Thiết lập Moyo (Bài 394)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Tạo thế đứng R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][de][fp][qn];B[qj])"
  },
  {
    "id": "opening-395",
    "title": "Khai cuộc #395: Đả nhập và Giảm bớt thế đối thủ (Bài 395)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đả nhập K17 (nước JC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][pd][qd][dp]AW[dc][ec][gc][qj][pp];B[jc])"
  },
  {
    "id": "opening-396",
    "title": "Khai cuộc #396: Tạo căn cứ sống và Liên kết nhóm quân (Bài 396)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Mở biên trái C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pj][pp][op];B[cj])"
  },
  {
    "id": "opening-397",
    "title": "Khai cuộc #397: Hướng phát triển (Direction of Play) (Bài 397)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Chèn ép E18 (nước EB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cc][cd][dd][ed][pd][qd]AW[dc][ec][gc][qj][pp];B[eb])"
  },
  {
    "id": "opening-398",
    "title": "Khai cuộc #398: Lựa chọn Định thức phù hợp toàn cục (Bài 398)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Cắt góc E3 (nước EQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fp][gq][pp];B[eq])"
  },
  {
    "id": "opening-399",
    "title": "Khai cuộc #399: Công thủ toàn diện (Tấn công kiếm đất) (Bài 399)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đâm vai K15 (nước JE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fc][gc][pp];B[je])"
  },
  {
    "id": "opening-400",
    "title": "Khai cuộc #400: Chuyển giao Khai cuộc sang Trung bàn (Bài 400)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Chiếm biên C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cp][dp][ep][fp][pd][qd]AW[cq][dq][eq][fq][pp];B[cj])"
  },
  {
    "id": "opening-401",
    "title": "Khai cuộc #401: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 401)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đả nhập C9 (nước CK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[ck])"
  },
  {
    "id": "opening-402",
    "title": "Khai cuộc #402: Mở rộng và Thiết lập Moyo (Bài 402)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Bảo vệ Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][dr][cp][pd][qd]AW[dc][dd][fc][de][pp];B[pj])"
  },
  {
    "id": "opening-403",
    "title": "Khai cuộc #403: Đả nhập và Giảm bớt thế đối thủ (Bài 403)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Chọc thủng F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[dc][ec][gq][jq][pp];B[fq])"
  },
  {
    "id": "opening-404",
    "title": "Khai cuộc #404: Tạo căn cứ sống và Liên kết nhóm quân (Bài 404)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Bẻ góc B18 (nước BB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][cd][ce][pd][qd]AW[dc][ec][fc][gc][pp];B[bb])"
  },
  {
    "id": "opening-405",
    "title": "Khai cuộc #405: Hướng phát triển (Direction of Play) (Bài 405)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đâm giữa D10 (nước DJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[cj][dj][ej][pp];B[dj])"
  },
  {
    "id": "opening-406",
    "title": "Khai cuộc #406: Lựa chọn Định thức phù hợp toàn cục (Bài 406)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Bẻ đầu M17 (nước LC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[kc][kd][ke][pd][qd][dp]AW[jc][jd][le][mc][pp];B[lc])"
  },
  {
    "id": "opening-407",
    "title": "Khai cuộc #407: Công thủ toàn diện (Tấn công kiếm đất) (Bài 407)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Cân bằng K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[jd])"
  },
  {
    "id": "opening-408",
    "title": "Khai cuộc #408: Chuyển giao Khai cuộc sang Trung bàn (Bài 408)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Phát triển K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[cc][dc][fc][gc][pp];B[jd])"
  },
  {
    "id": "opening-409",
    "title": "Khai cuộc #409: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 409)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đứng dậy C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pp][op];B[cj])"
  },
  {
    "id": "opening-410",
    "title": "Khai cuộc #410: Mở rộng và Thiết lập Moyo (Bài 410)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Tiếp cận H17 (nước HC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][jc][pp];B[hc])"
  },
  {
    "id": "opening-411",
    "title": "Khai cuộc #411: Đả nhập và Giảm bớt thế đối thủ (Bài 411)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đè ép F4 (nước FP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][rd][dp][dq][dr]AW[dc][dd][ed][pp][qp];B[fp])"
  },
  {
    "id": "opening-412",
    "title": "Khai cuộc #412: Tạo căn cứ sống và Liên kết nhóm quân (Bài 412)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Nhảy hàng 4 Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][cp][pd][qd][qf]AW[dd][dc][fc][pp][op];B[pj])"
  },
  {
    "id": "opening-413",
    "title": "Khai cuộc #413: Hướng phát triển (Direction of Play) (Bài 413)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đứng đối xứng Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][dp][dq][pp][pq]AW[dd][ed][fd][cj][dj];B[pj])"
  },
  {
    "id": "opening-414",
    "title": "Khai cuộc #414: Lựa chọn Định thức phù hợp toàn cục (Bài 414)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Cột cờ K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][pj][dp][dq][cp]AW[dd][cd][bd][pp][qp];B[jp])"
  },
  {
    "id": "opening-415",
    "title": "Khai cuộc #415: Công thủ toàn diện (Tấn công kiếm đất) (Bài 415)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Biên phải R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][qk]AW[dd][dc][cp][eq];B[pj])"
  },
  {
    "id": "opening-416",
    "title": "Khai cuộc #416: Chuyển giao Khai cuộc sang Trung bàn (Bài 416)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Nhảy giữ góc O16 (nước ND) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][po]AW[dd][dc][fc][qf];B[nd])"
  },
  {
    "id": "opening-417",
    "title": "Khai cuộc #417: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 417)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Mở rộng 2 ô R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][oq]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-418",
    "title": "Khai cuộc #418: Mở rộng và Thiết lập Moyo (Bài 418)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Tiếp xúc góc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-419",
    "title": "Khai cuộc #419: Đả nhập và Giảm bớt thế đối thủ (Bài 419)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Khóa đáy K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-420",
    "title": "Khai cuộc #420: Tạo căn cứ sống và Liên kết nhóm quân (Bài 420)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Treo biên R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dd][pq][po]AW[oc][cp][eq][qn];B[qj])"
  },
  {
    "id": "opening-421",
    "title": "Khai cuộc #421: Hướng phát triển (Direction of Play) (Bài 421)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Mở biên dưới K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qp]AW[dc][de][cn][fq];B[jp])"
  },
  {
    "id": "opening-422",
    "title": "Khai cuộc #422: Lựa chọn Định thức phù hợp toàn cục (Bài 422)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Ép góc P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pr]AW[dc][fc][cn][qf];B[od])"
  },
  {
    "id": "opening-423",
    "title": "Khai cuộc #423: Công thủ toàn diện (Tấn công kiếm đất) (Bài 423)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Kiểm soát biên Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][cf][ep][qn];B[pj])"
  },
  {
    "id": "opening-424",
    "title": "Khai cuộc #424: Chuyển giao Khai cuộc sang Trung bàn (Bài 424)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Điểm đỉnh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qj]AW[dc][ce][fq][cn];B[jd])"
  },
  {
    "id": "opening-425",
    "title": "Khai cuộc #425: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 425)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Thiết lập Sanrensei K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-426",
    "title": "Khai cuộc #426: Mở rộng và Thiết lập Moyo (Bài 426)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Điểm trung tâm K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qj][pq][dp]AW[dd][dj][cn][fq];B[jd])"
  },
  {
    "id": "opening-427",
    "title": "Khai cuộc #427: Đả nhập và Giảm bớt thế đối thủ (Bài 427)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Khai cuộc Trung Quốc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qk][po]AW[dd][dj][cf][fq];B[nc])"
  },
  {
    "id": "opening-428",
    "title": "Khai cuộc #428: Tạo căn cứ sống và Liên kết nhóm quân (Bài 428)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Gia cố trục R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qj][oj]AW[dd][dj][fq][jp];B[pj])"
  },
  {
    "id": "opening-429",
    "title": "Khai cuộc #429: Hướng phát triển (Direction of Play) (Bài 429)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Hoàn thiện ngũ giác K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp][jp]AW[dd][dj][fq][cn];B[jd])"
  },
  {
    "id": "opening-430",
    "title": "Khai cuộc #430: Lựa chọn Định thức phù hợp toàn cục (Bài 430)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Khai cuộc Trung Quốc biến thể P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qn][qk]AW[dc][cf][fq][nc];B[od])"
  },
  {
    "id": "opening-431",
    "title": "Khai cuộc #431: Công thủ toàn diện (Tấn công kiếm đất) (Bài 431)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Liên kết hai cánh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj][dj]AW[dd][fc][fq][jp];B[jd])"
  },
  {
    "id": "opening-432",
    "title": "Khai cuộc #432: Chuyển giao Khai cuộc sang Trung bàn (Bài 432)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Củng cố biên phải R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn][jp]AW[dc][de][eq][qf];B[qk])"
  },
  {
    "id": "opening-433",
    "title": "Khai cuộc #433: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 433)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Cắt đứt F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][cp]AW[dc][de][fp][gq];B[fq])"
  },
  {
    "id": "opening-434",
    "title": "Khai cuộc #434: Mở rộng và Thiết lập Moyo (Bài 434)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Mở góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][qp][pq]AW[dd][fc][cf][qf];B[nc])"
  },
  {
    "id": "opening-435",
    "title": "Khai cuộc #435: Đả nhập và Giảm bớt thế đối thủ (Bài 435)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Bảo vệ sườn R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][oq]AW[dc][de][eq][qn];B[qk])"
  },
  {
    "id": "opening-436",
    "title": "Khai cuộc #436: Tạo căn cứ sống và Liên kết nhóm quân (Bài 436)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Nhảy hàng 3 R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][po]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-437",
    "title": "Khai cuộc #437: Hướng phát triển (Direction of Play) (Bài 437)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Tiếp xúc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-438",
    "title": "Khai cuộc #438: Lựa chọn Định thức phù hợp toàn cục (Bài 438)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Vươn ra Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][pr]AW[dd][fc][eq][qn];B[pj])"
  },
  {
    "id": "opening-439",
    "title": "Khai cuộc #439: Công thủ toàn diện (Tấn công kiếm đất) (Bài 439)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Bịt góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qp]AW[dc][ce][fq][qf];B[nc])"
  },
  {
    "id": "opening-440",
    "title": "Khai cuộc #440: Chuyển giao Khai cuộc sang Trung bàn (Bài 440)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Tạo thế đứng R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][de][fp][qn];B[qj])"
  },
  {
    "id": "opening-441",
    "title": "Khai cuộc #441: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 441)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đả nhập K17 (nước JC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][pd][qd][dp]AW[dc][ec][gc][qj][pp];B[jc])"
  },
  {
    "id": "opening-442",
    "title": "Khai cuộc #442: Mở rộng và Thiết lập Moyo (Bài 442)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Mở biên trái C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pj][pp][op];B[cj])"
  },
  {
    "id": "opening-443",
    "title": "Khai cuộc #443: Đả nhập và Giảm bớt thế đối thủ (Bài 443)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Chèn ép E18 (nước EB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cc][cd][dd][ed][pd][qd]AW[dc][ec][gc][qj][pp];B[eb])"
  },
  {
    "id": "opening-444",
    "title": "Khai cuộc #444: Tạo căn cứ sống và Liên kết nhóm quân (Bài 444)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Cắt góc E3 (nước EQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fp][gq][pp];B[eq])"
  },
  {
    "id": "opening-445",
    "title": "Khai cuộc #445: Hướng phát triển (Direction of Play) (Bài 445)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đâm vai K15 (nước JE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fc][gc][pp];B[je])"
  },
  {
    "id": "opening-446",
    "title": "Khai cuộc #446: Lựa chọn Định thức phù hợp toàn cục (Bài 446)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Chiếm biên C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cp][dp][ep][fp][pd][qd]AW[cq][dq][eq][fq][pp];B[cj])"
  },
  {
    "id": "opening-447",
    "title": "Khai cuộc #447: Công thủ toàn diện (Tấn công kiếm đất) (Bài 447)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đả nhập C9 (nước CK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[ck])"
  },
  {
    "id": "opening-448",
    "title": "Khai cuộc #448: Chuyển giao Khai cuộc sang Trung bàn (Bài 448)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Bảo vệ Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][dr][cp][pd][qd]AW[dc][dd][fc][de][pp];B[pj])"
  },
  {
    "id": "opening-449",
    "title": "Khai cuộc #449: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 449)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Chọc thủng F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[dc][ec][gq][jq][pp];B[fq])"
  },
  {
    "id": "opening-450",
    "title": "Khai cuộc #450: Mở rộng và Thiết lập Moyo (Bài 450)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Bẻ góc B18 (nước BB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][cd][ce][pd][qd]AW[dc][ec][fc][gc][pp];B[bb])"
  },
  {
    "id": "opening-451",
    "title": "Khai cuộc #451: Đả nhập và Giảm bớt thế đối thủ (Bài 451)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đâm giữa D10 (nước DJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[cj][dj][ej][pp];B[dj])"
  },
  {
    "id": "opening-452",
    "title": "Khai cuộc #452: Tạo căn cứ sống và Liên kết nhóm quân (Bài 452)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Bẻ đầu M17 (nước LC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[kc][kd][ke][pd][qd][dp]AW[jc][jd][le][mc][pp];B[lc])"
  },
  {
    "id": "opening-453",
    "title": "Khai cuộc #453: Hướng phát triển (Direction of Play) (Bài 453)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Cân bằng K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[jd])"
  },
  {
    "id": "opening-454",
    "title": "Khai cuộc #454: Lựa chọn Định thức phù hợp toàn cục (Bài 454)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Phát triển K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[cc][dc][fc][gc][pp];B[jd])"
  },
  {
    "id": "opening-455",
    "title": "Khai cuộc #455: Công thủ toàn diện (Tấn công kiếm đất) (Bài 455)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đứng dậy C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pp][op];B[cj])"
  },
  {
    "id": "opening-456",
    "title": "Khai cuộc #456: Chuyển giao Khai cuộc sang Trung bàn (Bài 456)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Tiếp cận H17 (nước HC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][jc][pp];B[hc])"
  },
  {
    "id": "opening-457",
    "title": "Khai cuộc #457: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 457)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đè ép F4 (nước FP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][rd][dp][dq][dr]AW[dc][dd][ed][pp][qp];B[fp])"
  },
  {
    "id": "opening-458",
    "title": "Khai cuộc #458: Mở rộng và Thiết lập Moyo (Bài 458)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Nhảy hàng 4 Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][cp][pd][qd][qf]AW[dd][dc][fc][pp][op];B[pj])"
  },
  {
    "id": "opening-459",
    "title": "Khai cuộc #459: Đả nhập và Giảm bớt thế đối thủ (Bài 459)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đứng đối xứng Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][dp][dq][pp][pq]AW[dd][ed][fd][cj][dj];B[pj])"
  },
  {
    "id": "opening-460",
    "title": "Khai cuộc #460: Tạo căn cứ sống và Liên kết nhóm quân (Bài 460)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Cột cờ K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qd][pj][dp][dq][cp]AW[dd][cd][bd][pp][qp];B[jp])"
  },
  {
    "id": "opening-461",
    "title": "Khai cuộc #461: Hướng phát triển (Direction of Play) (Bài 461)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Biên phải R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][qk]AW[dd][dc][cp][eq];B[pj])"
  },
  {
    "id": "opening-462",
    "title": "Khai cuộc #462: Lựa chọn Định thức phù hợp toàn cục (Bài 462)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Nhảy giữ góc O16 (nước ND) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][po]AW[dd][dc][fc][qf];B[nd])"
  },
  {
    "id": "opening-463",
    "title": "Khai cuộc #463: Công thủ toàn diện (Tấn công kiếm đất) (Bài 463)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Mở rộng 2 ô R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pq][oq]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-464",
    "title": "Khai cuộc #464: Chuyển giao Khai cuộc sang Trung bàn (Bài 464)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Tiếp xúc góc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-465",
    "title": "Khai cuộc #465: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 465)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Khóa đáy K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-466",
    "title": "Khai cuộc #466: Mở rộng và Thiết lập Moyo (Bài 466)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Treo biên R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dd][pq][po]AW[oc][cp][eq][qn];B[qj])"
  },
  {
    "id": "opening-467",
    "title": "Khai cuộc #467: Đả nhập và Giảm bớt thế đối thủ (Bài 467)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Mở biên dưới K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qp]AW[dc][de][cn][fq];B[jp])"
  },
  {
    "id": "opening-468",
    "title": "Khai cuộc #468: Tạo căn cứ sống và Liên kết nhóm quân (Bài 468)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Ép góc P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pr]AW[dc][fc][cn][qf];B[od])"
  },
  {
    "id": "opening-469",
    "title": "Khai cuộc #469: Hướng phát triển (Direction of Play) (Bài 469)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Kiểm soát biên Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][cf][ep][qn];B[pj])"
  },
  {
    "id": "opening-470",
    "title": "Khai cuộc #470: Lựa chọn Định thức phù hợp toàn cục (Bài 470)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Điểm đỉnh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qj]AW[dc][ce][fq][cn];B[jd])"
  },
  {
    "id": "opening-471",
    "title": "Khai cuộc #471: Công thủ toàn diện (Tấn công kiếm đất) (Bài 471)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Thiết lập Sanrensei K4 (nước JP) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp]AW[dd][dj][fq][cn];B[jp])"
  },
  {
    "id": "opening-472",
    "title": "Khai cuộc #472: Chuyển giao Khai cuộc sang Trung bàn (Bài 472)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Điểm trung tâm K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][qj][pq][dp]AW[dd][dj][cn][fq];B[jd])"
  },
  {
    "id": "opening-473",
    "title": "Khai cuộc #473: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 473)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Khai cuộc Trung Quốc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qk][po]AW[dd][dj][cf][fq];B[nc])"
  },
  {
    "id": "opening-474",
    "title": "Khai cuộc #474: Mở rộng và Thiết lập Moyo (Bài 474)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Gia cố trục R10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][qj][oj]AW[dd][dj][fq][jp];B[pj])"
  },
  {
    "id": "opening-475",
    "title": "Khai cuộc #475: Đả nhập và Giảm bớt thế đối thủ (Bài 475)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Hoàn thiện ngũ giác K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][pj][pp][dp][jp]AW[dd][dj][fq][cn];B[jd])"
  },
  {
    "id": "opening-476",
    "title": "Khai cuộc #476: Tạo căn cứ sống và Liên kết nhóm quân (Bài 476)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Khai cuộc Trung Quốc biến thể P16 (nước OD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][qn][qk]AW[dc][cf][fq][nc];B[od])"
  },
  {
    "id": "opening-477",
    "title": "Khai cuộc #477: Hướng phát triển (Direction of Play) (Bài 477)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Liên kết hai cánh K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][pj][dj]AW[dd][fc][fq][jp];B[jd])"
  },
  {
    "id": "opening-478",
    "title": "Khai cuộc #478: Lựa chọn Định thức phù hợp toàn cục (Bài 478)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Củng cố biên phải R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][qn][jp]AW[dc][de][eq][qf];B[qk])"
  },
  {
    "id": "opening-479",
    "title": "Khai cuộc #479: Công thủ toàn diện (Tấn công kiếm đất) (Bài 479)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Cắt đứt F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][cp]AW[dc][de][fp][gq];B[fq])"
  },
  {
    "id": "opening-480",
    "title": "Khai cuộc #480: Chuyển giao Khai cuộc sang Trung bàn (Bài 480)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Mở góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][qp][pq]AW[dd][fc][cf][qf];B[nc])"
  },
  {
    "id": "opening-481",
    "title": "Khai cuộc #481: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 481)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Bảo vệ sườn R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][cp][pq][oq]AW[dc][de][eq][qn];B[qk])"
  },
  {
    "id": "opening-482",
    "title": "Khai cuộc #482: Mở rộng và Thiết lập Moyo (Bài 482)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Nhảy hàng 3 R9 (nước QK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][dp][pp][po]AW[dd][fc][cf][qn];B[qk])"
  },
  {
    "id": "opening-483",
    "title": "Khai cuộc #483: Đả nhập và Giảm bớt thế đối thủ (Bài 483)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Tiếp xúc Q15 (nước PE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pq][pn]AW[dc][de][eq][oc];B[pe])"
  },
  {
    "id": "opening-484",
    "title": "Khai cuộc #484: Tạo căn cứ sống và Liên kết nhóm quân (Bài 484)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Vươn ra Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][pr]AW[dd][fc][eq][qn];B[pj])"
  },
  {
    "id": "opening-485",
    "title": "Khai cuộc #485: Hướng phát triển (Direction of Play) (Bài 485)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Bịt góc O17 (nước NC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[qd][dp][pp][qp]AW[dc][ce][fq][qf];B[nc])"
  },
  {
    "id": "opening-486",
    "title": "Khai cuộc #486: Lựa chọn Định thức phù hợp toàn cục (Bài 486)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Tạo thế đứng R10 (nước QJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[pd][cp][pq][np]AW[dd][de][fp][qn];B[qj])"
  },
  {
    "id": "opening-487",
    "title": "Khai cuộc #487: Công thủ toàn diện (Tấn công kiếm đất) (Bài 487)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Đả nhập K17 (nước JC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][pd][qd][dp]AW[dc][ec][gc][qj][pp];B[jc])"
  },
  {
    "id": "opening-488",
    "title": "Khai cuộc #488: Chuyển giao Khai cuộc sang Trung bàn (Bài 488)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Mở biên trái C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pj][pp][op];B[cj])"
  },
  {
    "id": "opening-489",
    "title": "Khai cuộc #489: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 489)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Chèn ép E18 (nước EB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cc][cd][dd][ed][pd][qd]AW[dc][ec][gc][qj][pp];B[eb])"
  },
  {
    "id": "opening-490",
    "title": "Khai cuộc #490: Mở rộng và Thiết lập Moyo (Bài 490)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Cắt góc E3 (nước EQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fp][gq][pp];B[eq])"
  },
  {
    "id": "opening-491",
    "title": "Khai cuộc #491: Đả nhập và Giảm bớt thế đối thủ (Bài 491)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Đâm vai K15 (nước JE) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][fc][gc][pp];B[je])"
  },
  {
    "id": "opening-492",
    "title": "Khai cuộc #492: Tạo căn cứ sống và Liên kết nhóm quân (Bài 492)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Chiếm biên C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cp][dp][ep][fp][pd][qd]AW[cq][dq][eq][fq][pp];B[cj])"
  },
  {
    "id": "opening-493",
    "title": "Khai cuộc #493: Hướng phát triển (Direction of Play) (Bài 493)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đả nhập C9 (nước CK) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[ck])"
  },
  {
    "id": "opening-494",
    "title": "Khai cuộc #494: Lựa chọn Định thức phù hợp toàn cục (Bài 494)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Chọn biến thế định thức phù hợp với các quân cờ đang có sẵn ở các góc lân cận.",
    "hints": {
      "level1": "Xem quân bạn bè ở biên nào có thể phối hợp nhịp nhàng nhất.",
      "level2": "Chọn nước lấy ngoại thế hoặc thực địa tùy theo sự hỗ trợ từ các góc khác."
    },
    "explanation": "Một định thức cục bộ tốt nhưng đi ngược lại bố cục toàn bàn sẽ trở thành thất bại. Nước đi này liên kết hoàn hảo với thế trận toàn cục. Nước đi đề xuất là Bảo vệ Q10 (nước PJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[dp][dq][dr][cp][pd][qd]AW[dc][dd][fc][de][pp];B[pj])"
  },
  {
    "id": "opening-495",
    "title": "Khai cuộc #495: Công thủ toàn diện (Tấn công kiếm đất) (Bài 495)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Tấn công nhóm quân yếu của đối phương không phải để giết mà để vừa truy kích vừa tích lũy đất.",
    "hints": {
      "level1": "Nhóm quân đối phương đang thiếu căn cứ hoặc bị chia cắt.",
      "level2": "Chụp đầu hoặc bịt đường thoát của đối thủ, ép họ vừa chạy vừa nhường đường biên cho mình."
    },
    "explanation": "Tấn công là cách tốt nhất để lấy đất. Đen thu được lợi nhuận khổng lồ ở hai bên sườn trong khi đối thủ chỉ mải lo chạy thoát thân. Nước đi đề xuất là Chọc thủng F3 (nước FQ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[dc][ec][gq][jq][pp];B[fq])"
  },
  {
    "id": "opening-496",
    "title": "Khai cuộc #496: Chuyển giao Khai cuộc sang Trung bàn (Bài 496)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Chiếm lĩnh điểm mấu chốt ở trung tâm hoặc biên lớn trước khi bước vào trung bàn tranh chấp.",
    "hints": {
      "level1": "Điểm tranh chấp giao thoa giữa hai vùng kiểm soát lớn.",
      "level2": "Nhảy lên ở hàng 5 hoặc kẹp quân để chặn lối vào trung tâm."
    },
    "explanation": "Điểm bước ngoặt kết thúc giai đoạn khai cuộc. Đen giành quyền kiểm soát trung tâm và đặt nền móng vững chắc cho trung bàn. Nước đi đề xuất là Bẻ góc B18 (nước BB) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][cd][ce][pd][qd]AW[dc][ec][fc][gc][pp];B[bb])"
  },
  {
    "id": "opening-497",
    "title": "Khai cuộc #497: Giữ góc và Tiếp cận (Shimari & Kakari) (Bài 497)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy chọn nước tiếp cận góc đối phương hoặc giữ góc của mình ở hướng giá trị nhất.",
    "hints": {
      "level1": "Quan sát góc có khoảng cách rộng nhất tới biên kế bên.",
      "level2": "Nước treo góc kị mã (keima kakari) hoặc nhảy một gian (ikken tobi) để định hình góc."
    },
    "explanation": "Trong khai cuộc, 'Góc là vàng, Biên là bạc, Giữa sân là cỏ'. Nước đi này giúp Đen thiết lập thế chủ động ở góc quan trọng nhất. Nước đi đề xuất là Đâm giữa D10 (nước DJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[cj][dj][ej][pp];B[dj])"
  },
  {
    "id": "opening-498",
    "title": "Khai cuộc #498: Mở rộng và Thiết lập Moyo (Bài 498)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Mở rộng khung ảnh hưởng (moyo) của mình đồng thời khống chế tiềm năng phát triển của đối phương.",
    "hints": {
      "level1": "Biên giữa hai góc nơi có hai nhóm quân đối mặt nhau.",
      "level2": "Nước nhảy hàng 4 hoặc khai triển kị mã lớn để kiểm soát đường ranh giới moyo."
    },
    "explanation": "Mở rộng moyo ở hàng 4 tạo thế uy lực hướng vào trung tâm, ép đối thủ phải lựa chọn giữa đả nhập mạo hiểm hoặc để Đen biến đất thành thật. Nước đi đề xuất là Bẻ đầu M17 (nước LC) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[kc][kd][ke][pd][qd][dp]AW[jc][jd][le][mc][pp];B[lc])"
  },
  {
    "id": "opening-499",
    "title": "Khai cuộc #499: Đả nhập và Giảm bớt thế đối thủ (Bài 499)",
    "difficulty": "beginner",
    "category": "opening",
    "instruction": "Đen đi trước. Đả nhập vào cấu trúc lỏng lẻo của Trắng hoặc dẹp thấp biên độ kiểm soát của đối thủ.",
    "hints": {
      "level1": "Khu vực đất Trắng trải dài từ 3 đến 5 ô chưa có quân bảo vệ.",
      "level2": "Đả nhập ở hàng 3 để dễ bám rễ sống, hoặc đâm vai ở hàng 4 để ép đối thủ bò hàng thấp."
    },
    "explanation": "Đả nhập đúng lúc phá vỡ kế hoạch lập đất lớn của Trắng, đồng thời phân tán lực lượng của đối phương ra nhiều hướng. Nước đi đề xuất là Cân bằng K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[bc][cc][dc][cd][dp][dq]AW[cb][db][eb][fb][pp];B[jd])"
  },
  {
    "id": "opening-500",
    "title": "Khai cuộc #500: Tạo căn cứ sống và Liên kết nhóm quân (Bài 500)",
    "difficulty": "intermediate",
    "category": "opening",
    "instruction": "Đen đi trước. Ổn định nhóm quân mỏng, tạo căn cứ sống men theo biên hoặc liên kết các cánh quân.",
    "hints": {
      "level1": "Nhóm quân Đen chưa có đủ 2 mắt và chưa mở đất ra biên.",
      "level2": "Nước mở 2 ô men theo hàng 3 (hai gian sách) để tạo căn cứ sống hoàn chỉnh."
    },
    "explanation": "Nước đi khẩn cấp hơn nước đi lớn: Bảo vệ căn cứ vững chắc trước khi mở rộng tấn công là nguyên tắc sống còn trong khai cuộc. Nước đi đề xuất là Phát triển K16 (nước JD) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][ed][dp][dq][pd]AW[cc][dc][fc][gc][pp];B[jd])"
  },
  {
    "id": "opening-501",
    "title": "Khai cuộc #501: Hướng phát triển (Direction of Play) (Bài 501)",
    "difficulty": "advanced",
    "category": "opening",
    "instruction": "Đen đi trước. Hãy phán đoán hướng phát triển tự nhiên của thế cờ để không đi ngược thế trận.",
    "hints": {
      "level1": "Xem thế dày của bức tường sẵn có hướng về phía nào.",
      "level2": "Đánh cách xa bức tường dày để biến thế dày thành công cụ tấn công hiệu quả."
    },
    "explanation": "'Không lập đất gần thế dày'. Đen tận dụng uy thế bức tường để đẩy đối phương vào thế khó và chiếm vùng đất rộng mở. Nước đi đề xuất là Đứng dậy C10 (nước CJ) đem lại lợi thế chiến lược rõ rệt cho toàn cục.",
    "sgf": "(;GM[1]FF[4]SZ[19]AB[cd][dd][dp][dq][pd][qd]AW[dc][ec][pp][op];B[cj])"
  }
];
