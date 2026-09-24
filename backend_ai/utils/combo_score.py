# backend_ai/utils/combo_score.py
"""
Module tinh "Diem Combo lien tiep" (Consecutive Capture Combo Score).
Ban port tu core/combo.py cua go-ai-training-software, chuyen color tu
string ("black"/"white") sang so nguyen (BLACK=1/WHITE=-1) de dong bo quy
uoc voi utils/game_logic.py.

Day la 1 heuristic gamification RIENG cho phan mem luyen tap (khong thuoc
luat co Go truyen thong): thuong cho nguoi choi/hoc vien khi HO AN QUAN
DUOC O NHIEU LUOT DI LIEN TIEP CUA CHINH HO (giua 2 lan an quan khong co
luot nao "trang tay").

LUU Y QUAN TRONG - KHONG NHAM LAN VOI ComboToast BEN FRONTEND:
    frontend_ui/src/App.tsx dang co san 1 hieu ung UI ten "ComboToast" -
    do la hieu ung THI GIAC THUAN TUY, dem so lan bat quan lien tiep NGAY
    TAI CLIENT de hien banner "Combo x N", KHONG lien quan gi den diem so.
    Module nay (combo_score.py) la logic BACKEND, tinh DIEM THUONG
    (bonusPoints) chinh thuc cho ca van dau, dua tren toan bo move_history -
    hai thu hoan toan doc lap, chi trung ten "combo" ve mat khai niem.

Dinh nghia "combo":
    - Xet rieng tung ben (Den/Trang). Chi tinh nhung nuoc di THAT SU dat quan
      (khong tinh nuoc Pass).
    - Combo tang 1 moi khi ben do co 1 nuoc di an duoc >= 1 quan doi phuong,
      va nuoc di GAN NHAT TRUOC DO cua CHINH BEN DO (bo qua luot doi phuong
      xen giua) cung an duoc quan (combo dang > 0).
    - Combo bi reset ve 0 ngay khi ben do di 1 nuoc KHONG an duoc quan nao.
    - Diem thuong (bonus) cho 1 chuoi combo dai N nuoc lien tiep co an quan
      duoc tinh theo cong thuc tam giac (khuyen khich chuoi cang dai cang
      loi, giong co che "combo multiplier" trong game):

          bonus(N) = BASE_BONUS * N * (N + 1) / 2

      vi du BASE_BONUS = 2:
          combo dai 2 nuoc lien tiep -> bonus = 2 * 2*3/2 = 6
          combo dai 3 nuoc lien tiep -> bonus = 2 * 3*4/2 = 12
          ...

    Cong thuc nay chi la 1 lua chon heuristic hop ly, co the doi he so
    BASE_BONUS hoac cong thuc khac tuy nhom dieu chinh do can bang gameplay.
"""

from __future__ import annotations

from typing import Dict, List, Optional, TypedDict

from utils.game_logic import BLACK, WHITE

BASE_BONUS = 2

_COLOR_KEY = {BLACK: "black", WHITE: "white"}  # chi dung de dat ten field ket qua


class ComboEvent(TypedDict):
    color: int
    startMoveIndex: int
    endMoveIndex: int
    length: int          # so nuoc di lien tiep co an quan trong combo nay
    stonesCaptured: int  # tong so quan bi an trong ca chuoi combo
    bonusPoints: int


def _triangular_bonus(streak_length: int) -> int:
    if streak_length <= 0:
        return 0
    return int(BASE_BONUS * streak_length * (streak_length + 1) / 2)


def compute_combo_score(move_history: List[Dict]) -> Dict:
    """
    Input: move_history - danh sach cac nuoc di, moi phan tu co dang:
        {
          "index": int,
          "color": 1 | -1,                        # BLACK | WHITE
          "position": {"x":.., "y":..} | None,     # None = Pass
          "capturedCount": int (optional, mac dinh 0),
        }

    Output:
        {
          "black": {"totalComboBonus": int, "bestStreak": int, "events": [ComboEvent]},
          "white": {"totalComboBonus": int, "bestStreak": int, "events": [ComboEvent]},
          "events": [ComboEvent]  # gop ca 2 ben, sap theo thoi gian
        }
    (key "black"/"white" o cap ngoai cung GIU NGUYEN string de khop truc
    tiep voi RefereeAnalysisResult ben frontend_ui - chi field "color" BEN
    TRONG moi ComboEvent la so nguyen.)
    """
    result = {
        BLACK: {"totalComboBonus": 0, "bestStreak": 0, "events": []},
        WHITE: {"totalComboBonus": 0, "bestStreak": 0, "events": []},
    }

    # trang thai streak dang mo cho tung ben
    open_streak = {
        BLACK: {"length": 0, "stones": 0, "startIndex": None},
        WHITE: {"length": 0, "stones": 0, "startIndex": None},
    }

    def close_streak(color: int, end_index: int):
        streak = open_streak[color]
        if streak["length"] >= 2:  # chi tinh la "combo" tu 2 nuoc lien tiep tro len
            bonus = _triangular_bonus(streak["length"])
            event: ComboEvent = {
                "color": color,
                "startMoveIndex": streak["startIndex"],
                "endMoveIndex": end_index,
                "length": streak["length"],
                "stonesCaptured": streak["stones"],
                "bonusPoints": bonus,
            }
            result[color]["events"].append(event)
            result[color]["totalComboBonus"] += bonus
            result[color]["bestStreak"] = max(result[color]["bestStreak"], streak["length"])
        open_streak[color] = {"length": 0, "stones": 0, "startIndex": None}

    for move in move_history:
        color = move.get("color")
        if color not in (BLACK, WHITE):
            continue
        if move.get("position") is None:  # Pass -> khong pha combo nhung cung khong tiep tuc combo
            continue

        captured = move.get("capturedCount") or 0
        idx = move.get("index")

        if captured > 0:
            streak = open_streak[color]
            if streak["length"] == 0:
                streak["startIndex"] = idx
            streak["length"] += 1
            streak["stones"] += captured
        else:
            close_streak(color, idx)

    # dong not cac streak con mo o cuoi van
    last_index = move_history[-1]["index"] if move_history else 0
    close_streak(BLACK, last_index)
    close_streak(WHITE, last_index)

    all_events = sorted(
        result[BLACK]["events"] + result[WHITE]["events"],
        key=lambda e: e["startMoveIndex"],
    )

    return {
        "black": result[BLACK],
        "white": result[WHITE],
        "events": all_events,
    }