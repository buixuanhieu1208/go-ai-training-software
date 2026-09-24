from utils.go_rules_core import calculate_territory as _calculate_territory_map


def calculate_chinese_score(board, komi=7.5):
    size = len(board)
    visited = set()
    black_area = 0
    white_area = 0

    # 1. Đếm số quân Đen/Trắng đã có sẵn trên bàn
    for r in range(size):
        for c in range(size):
            if board[r][c] == 1:
                black_area += 1
            elif board[r][c] == -1:
                white_area += 1

    # 2. Thuật toán Flood-fill để loang các vùng trống
    def flood_fill(start_r, start_c):
        queue = [(start_r, start_c)]
        region_size = 0
        borders = set()
        
        while queue:
            curr_r, curr_c = queue.pop(0)
            if (curr_r, curr_c) in visited:
                continue
            
            visited.add((curr_r, curr_c))
            region_size += 1
            
            # Quét 4 hướng (Trên, Dưới, Trái, Phải)
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = curr_r + dr, curr_c + dc
                if 0 <= nr < size and 0 <= nc < size:
                    if board[nr][nc] == 0:
                        if (nr, nc) not in visited:
                            queue.append((nr, nc))
                    else:
                        borders.add(board[nr][nc]) # Ghi nhận màu quân đang chạm vào vùng này
                        
        return region_size, borders

    # 3. Quét toàn bộ bàn cờ để đếm đất
    for r in range(size):
        for c in range(size):
            if board[r][c] == 0 and (r, c) not in visited:
                region_size, borders = flood_fill(r, c)
                
                # Vùng đất chỉ bị bao vây bởi Đen
                if len(borders) == 1 and 1 in borders:
                    black_area += region_size
                # Vùng đất chỉ bị bao vây bởi Trắng
                elif len(borders) == 1 and -1 in borders:
                    white_area += region_size
                # Nếu chạm cả hai (vùng tranh chấp/Seki) thì không cộng điểm cho ai

    # 4. Cộng điểm Komi cho Trắng
    white_area += komi
    
    winner = "black" if black_area > white_area else "white"
    return black_area, white_area, winner


def calculate_territory_detailed(board, komi=7.5):
    """
    [MOI - dung cho Buoc 2] Tra ve dict day du, khop truc tiep voi type
    ScoreResult ben frontend_ui/src/types/go.ts:
        { blackTerritory, whiteTerritory, blackScore, whiteScore, territoryMap }

    Khac calculate_chinese_score():
        - blackScore/whiteScore o day = territory + so quan tren ban (Chinese
          counting), GIONG chinh sach cua calculate_chinese_score(), nhung
          duoc tach rieng winner/winMargin va co territoryMap de FE overlay
          mau len ban co (calculate_chinese_score KHONG co territoryMap).
        - Danh cho vung tranh chap (seki-like) van la "neutral", KHONG cong
          diem cho ai - dong nhat voi calculate_chinese_score.

    Tra ve:
        {
          "blackTerritory": int, "whiteTerritory": int,
          "blackScore": float,   "whiteScore": float,   # whiteScore DA cong komi
          "territoryMap": [["black"|"white"|"neutral", ...], ...],
          "winner": "black" | "white" | None,   # None neu hoa tuyet doi (hiem)
          "winMargin": float | None,
        }
    """
    result = _calculate_territory_map(board)

    black_score = result["blackScore"]
    white_score = result["whiteScore"] + komi

    winner = None
    win_margin = None
    if black_score != white_score:
        winner = "black" if black_score > white_score else "white"
        win_margin = abs(black_score - white_score)

    return {
        "blackTerritory": result["blackTerritory"],
        "whiteTerritory": result["whiteTerritory"],
        "blackScore": black_score,
        "whiteScore": white_score,
        "territoryMap": result["territoryMap"],
        "winner": winner,
        "winMargin": win_margin,
    }