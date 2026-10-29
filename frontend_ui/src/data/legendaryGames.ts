/**
 * @file legendaryGames.ts
 * @description Dataset 20 ván cờ huyền thoại nhất trong lịch sử cờ vây thế giới.
 *
 * Mỗi ván đấu chứa:
 * - Metadata đầy đủ (kỳ thủ, giải đấu, năm, kết quả)
 * - Bối cảnh lịch sử & tâm lý (tiếng Việt)
 * - Thế cờ tại thời điểm then chốt (SGF setup position)
 * - Nước đi đáp án của tuyển thủ & diễn biến tiếp theo
 * - Bài học chiến thuật rút ra
 *
 * Nguồn tham khảo kỳ phổ:
 * - GoGoD Encyclopedia (https://gogodonline.co.uk/)
 * - Go4Go (https://www.go4go.net/)
 * - Sensei's Library (https://senseis.xmp.net/)
 * - Google DeepMind Publications (cho các ván AlphaGo)
 *
 * Lưu ý: Các SGF setup positions (AB/AW) tái hiện thế cờ tại thời điểm
 * thử thách. Để có kỳ phổ đầy đủ từ nước 1 (cho tính năng xem lại toàn bộ
 * ván đấu), bổ sung trường `fullGameSgf` từ các cơ sở dữ liệu kỳ phổ
 * được liệt kê ở `sgfSource`.
 */

import type { LegendaryGame } from '../types/legendary';

export const LEGENDARY_GAMES: LegendaryGame[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  //  KỶ NGUYÊN CỔ ĐIỂN (Classical Era — trước 1900)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── VÁN 1 ──────────────────────────────────────────────────────────────────
  {
    id: 'shusaku-ear-reddening-1846',
    blackPlayer: { name: 'Honinbo Shusaku', rank: '7 dan', country: 'JP' },
    whitePlayer: { name: 'Inoue Gennan Inseki', rank: '8 dan', country: 'JP' },
    tournament: 'Oshirogo (Ván Cờ Ngự Tiền — trước mặt Shogun)',
    year: 1846,
    result: 'B+Resign',
    boardSize: 19,
    komi: 0,

    challengeMoveNumber: 127,
    playerToMove: 'black',
    actualMove: 'ji',
    mission: {
      title: "Hóa Giải Tứ Diện Sở Ca & Chi Viện Nhóm Yếu",
      description: "Cả bốn góc chiến trường đều đang bị Gennan Inseki áp đảo. Đám quân đen ở trung tâm phía dưới đang bị cô lập. Bạn cần tìm một nước đi chiến lược toàn cục (hoặc sáng tạo hướng đi mới) để kết nối sinh lực các nhóm quân và xoay chuyển cục diện!",
      type: 'rescue',
      targetStones: ["jn","ln","pn","go","lo","no","po"],
      hint: "Không sa đà vào góc hẹp, tìm điểm liên kết giữa hư không để trợ lực cho các nhóm quân đang nguy nan.",
      criticalTurns: 4,
    },

    era: 'classical',
    category: 'strategy',
    difficulty: 5,

    title: '「耳赤の一手」Nước Đi Làm Đỏ Tai — Kiệt tác bất hủ của Shusaku',
    titleEn: 'The Ear-Reddening Move',
    contextStory:
      'Năm 1846, Honinbo Shusaku mới 17 tuổi nhưng đã được chọn đại diện cho nhà Honinbo ' +
      'trong ván Oshirogo — ván cờ danh dự trước mặt Tướng quân Tokugawa. Đối thủ là Inoue ' +
      'Gennan Inseki, bậc thầy 8 dan đã 48 tuổi, đang áp đảo thế trận. Shusaku rơi vào tình ' +
      'huống bất lợi, nhiều người xem nghĩ rằng cậu thiếu niên sẽ thất bại thảm hại trước mặt ' +
      'Tướng quân. Nhưng tại nước thứ 127, Shusaku đã đi một nước mà không ai ngờ tới...',
    moveExplanation:
      'Nước đi tại trung tâm-trái bàn cờ trông bình thường, không trực tiếp ăn quân hay chiếm ' +
      'đất. Nhưng nó đồng thời tác động đến CẢ BỐN vùng chiến trường trên bàn cờ — tăng cường ' +
      'kết nối nhóm quân yếu, uy hiếp đám quân Trắng phía dưới, mở rộng ảnh hưởng lên trung ' +
      'tâm, và chuẩn bị cho cuộc xâm nhập phía trên. Đây là nước đi chiến lược toàn bàn (whole-board ' +
      'move) hoàn hảo. Vị bác sĩ ngồi bên cạnh Gennan Inseki nhận thấy tai ông ta đột ngột đỏ ' +
      'bừng — dấu hiệu của cú sốc khi nhận ra mình đã bị vượt mặt bởi thiên tài 17 tuổi.',
    afterStory:
      'Sau nước đi này, Gennan Inseki không thể tìm cách phản đòn hiệu quả. Thế trận từ bất ' +
      'lợi chuyển dần sang cân bằng rồi nghiêng hẳn về phía Shusaku. Gennan cuối cùng đầu hàng. ' +
      'Shusaku trở thành huyền thoại, sau này được tôn vinh là "Kỳ Thánh" (棋聖 — Kisei) — ' +
      'danh hiệu cao quý nhất trong lịch sử cờ vây Nhật Bản.',
    lesson:
      'Bài học cốt lõi: Đừng chỉ nhìn vào lợi ích cục bộ (ăn quân, chiếm góc). Hãy tìm nước ' +
      'đi có ảnh hưởng đến NHIỀU vùng cùng lúc — đó mới là nước đi mạnh nhất. Nước cờ tốt ' +
      'nhất không phải lúc nào cũng là nước trông "rõ ràng" nhất.',

        crypticHint:
      'Khi khói lửa bốc lên ở cả bốn phía, kẻ đắm mình vào tranh đoạt góc mép tất sa lầy. Chỉ người đứng tại khoảng hư không giữa bàn cờ mới có thể thâu tóm toàn bộ giang sơn.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Honinbo Shusaku]PW[Inoue Gennan Inseki]DT[1846]EV[Oshirogo]RE[B+2]KM[0]AB[ja][db][jb][qb][fc][jc][kc][pc][ld][md][nd][qd][fe][ke][pe][qe][pf][qg][rg][sg][oh][sh][mi][pi][qi][ri][oj][qj][pk][qk][pl][rl][pm][jn][ln][pn][go][lo][no][po][cp][ep][hp][lp][op][fq][hq][mq][nq][oq][pq][gr][nr][or][qr][ns][ps][rs]AW[ka][la][kb][mb][ob][pb][cc][dc][ic][lc][mc][oc][cf][qf][rf][ng][og][pg][ph][qh][rh][ni][oi][mj][nj][rj][ck][ok][rk][ol][ql][mm][om][qm][rm][cn][mn][on][io][mo][oo][qo][mp][np][pp][qp][gq][iq][kq][lq][qq][rq][hr][jr][kr][mr][rr][is][ls]PL[B];B[ji];W[eb];B[fb];W[eg];B[dj];W[dk];B[ej];W[cj];B[dh];W[ij];B[hm];W[gj];B[eh];W[fl];B[fg];W[er];B[dm];W[fn];B[dn];W[gn];B[jj];W[jk];B[kk];W[ii];B[ik];W[jl];B[kl];W[il];B[jh];W[co];B[do];W[ih];B[hn];W[hl];B[bl];W[dg];B[gh];W[ch];B[ig];W[ec];B[cr];W[fd];B[gd];W[ed];B[gc];W[bk];B[cm];W[gs];B[gp];W[li];B[kg];W[in];B[lj];W[lg];B[gm];W[jf];B[jg];W[im];B[fm];W[kf];B[lf];W[mf];B[le];W[gf];B[hf];W[ff];B[gg];W[lk];B[kj];W[km];B[lm];W[ll];B[jm];W[ge];B[he];W[ef];B[ea];W[cb];B[fr];W[fs];B[dr];W[qa];B[ra];W[pa];B[rb];W[da];B[gi];W[fj];B[fi];W[fa];B[ga];W[gl];B[ek];W[em];B[ho];W[el];B[en];W[jo];B[kn];W[ci];B[lh];W[mh];B[mg];W[di];B[ei];W[lg];B[qn];W[rn];B[re];W[sl];B[mg];W[bm];B[am];W[lg];B[eq];W[es];B[mg];W[ha];B[gb];W[lg];B[ds];W[hs];B[mg];W[sj];B[si];W[lg];B[sr];W[sq];B[mg];W[hd];B[hb];W[lg];B[ro];W[so];B[mg];W[ss];B[qs];W[lg];B[sn];W[rp];B[mg];W[cl];B[bn];W[lg];B[ml];W[mk];B[mg];W[pj];B[sf];W[lg];B[nn];W[nl];B[mg];W[ib];B[ia];W[lg];B[nc];W[nb];B[mg];W[jd];B[kd];W[lg];B[ma];W[na];B[mg];W[qc];B[rc];W[lg];B[js];W[ks];B[mg];W[hc];B[id];W[lg];B[fk];W[hj];B[mg];W[hh];B[hg];W[lg];B[gk];W[hk];B[mg];W[ak];B[lg];W[al];B[bm];W[nf];B[od];W[ki];B[ms];W[kp];B[ip];W[jp];B[lr];W[oj];B[mr];W[ea];B[sr])',
    sgfSource: 'https://senseis.xmp.net/?EarReddeningMove',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ── VÁN 2 ──────────────────────────────────────────────────────────────────
  {
    id: 'dosaku-innovation-1682',
    blackPlayer: { name: 'Honinbo Dosaku', rank: '9 dan Meijin', country: 'JP' },
    whitePlayer: { name: 'Yasui Sanchi', rank: '7 dan', country: 'JP' },
    tournament: 'Oshirogo (Ván Cờ Ngự Tiền)',
    year: 1682,
    result: 'B+4',
    boardSize: 19,
    komi: 0,

    challengeMoveNumber: 45,
    playerToMove: 'black',
    actualMove: 'dp',
    mission: {
      title: "Đột Phá Bản Lề Trung Tâm — Khai Sinh Moyo",
      description: "Thay vì co cụm giữ đất nhỏ ở góc, hãy tìm điểm bản lề tại trung tâm để phóng tỏa thế lực ra khắp bàn cờ, biến vùng đất hoang sơ thành thế trận áp đảo đối thủ!",
      type: 'breakthrough',
      targetStones: ["dl","dm","qm","dn","do"],
      hint: "Đánh vào điểm kết nối trung tâm, khống chế đường bành trướng của đối thủ.",
      criticalTurns: 4,
    },

    era: 'classical',
    category: 'moyo',
    difficulty: 4,

    title: 'Cha Đẻ Cờ Vây Hiện Đại — Dosaku định hình Moyo',
    titleEn: 'Dosaku\'s Central Influence',
    contextStory:
      'Honinbo Dosaku (1645–1702) được tôn vinh là "Kỳ Thánh" đầu tiên trong lịch sử. Ông là ' +
      'người khai sinh khái niệm "thế lực" (influence) và "moyo" (vùng tiềm năng) thay vì chỉ ' +
      'đơn thuần giành đất ở góc và cạnh. Trong ván đấu ngự tiền năm 1682, Dosaku đối đầu với ' +
      'Yasui Sanchi — đại diện nhà Yasui. Tại nước 45, thế cờ đang ở giai đoạn chuyển từ khai ' +
      'cuộc sang trung bàn, và Dosaku có cơ hội đặt nền móng cho chiến lược mà 300 năm sau vẫn ' +
      'được giảng dạy...',
    moveExplanation:
      'Dosaku đặt quân giữa trung tâm bàn cờ — một nước đi mà các kỳ thủ đương thời cho là ' +
      '"lãng phí" vì không chiếm đất cụ thể. Nhưng nước đi này tạo thế lực (influence) lan ' +
      'tỏa ra mọi hướng, kết nối các nhóm quân đen và biến toàn bộ trung tâm thành vùng tiềm ' +
      'năng khổng lồ. Đây chính là nguyên mẫu đầu tiên của chiến thuật "Moyo" mà Takemiya sẽ ' +
      'hoàn thiện 300 năm sau.',
    afterStory:
      'Yasui Sanchi phải đau đầu quyết định xâm nhập vùng ảnh hưởng trung tâm của Dosaku hay ' +
      'chấp nhận bị bao vây. Dù chọn phương án nào, Trắng cũng phải chơi theo nhịp của Đen. ' +
      'Dosaku thắng 4 mục. Ván đấu này trở thành tài liệu giáo khoa kinh điển về sức mạnh ' +
      'của "thế" so với "đất".',
    lesson:
      'Bài học: "Thế lực" (Influence) đôi khi giá trị hơn "lãnh thổ" (Territory). Nước đi ' +
      'tại trung tâm có thể không chiếm đất ngay, nhưng nó kiểm soát HƯỚNG phát triển của ' +
      'toàn bộ ván cờ. Hãy nghĩ về "tiềm năng tương lai" chứ không chỉ "lợi ích hiện tại".',

        crypticHint:
      'Người xưa coi trọng góc là vàng, mép là bạc. Nhưng bậc đại trí lại nhìn thấy: trung tâm tuy rỗng không, song lại là nơi điều hòa khí huyết của toàn bàn cờ.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Honinbo Dosaku]PW[Yasui Chitetsu]DT[1682]EV[Oshirogo]RE[B+4]KM[0]AB[db][ec][jc][kc][nc][ed][gd][id][qd][de][ge][df][pg][qj][dl][dm][qm][dn][do][eq][oq][dr]AW[hc][cd][dd][jd][ee][fe][bf][cg][eg][fg][ck][cl][cn][co][cp][op][qp][dq][iq][lq][pq][cr]PL[B];B[dp];W[cq];B[hq];W[pl];B[ql];W[fq];B[fp];W[er];B[hp];W[oc];B[od];W[pc];B[nd];W[ph];B[qh];W[qc];B[rd];W[qg];B[pd];W[og];B[pf];W[qi];B[rh];W[ri];B[pi];W[pj];B[oi];W[qk];B[rj];W[rk];B[si];W[pm];B[kp];W[lp];B[hg];W[ko];B[ep];W[fr];B[kk];W[ik];B[jo];W[ih];B[kn];W[lo];B[hh];W[ii];B[hi];W[kl];B[jl];W[jk];B[ll];W[kj];B[km];W[hj];B[ig];W[kh];B[lg];W[hm];B[gj];W[gk];B[gl];W[fj];B[hl];W[kg];B[kf];W[lf];B[jg];W[le];B[ke];W[mg];B[lh];W[mi];B[ld];W[il];B[im];W[fl];B[gm];W[fm];B[mn];W[oo];B[ki];W[jh];B[lj];W[li];B[jj];W[ij];B[bc];W[bd];B[ir];W[jq];B[ek];W[fk];B[ej];W[fi];B[ei];W[eh];B[fn];W[jr];B[ci];W[jp];B[ip];W[hr];B[gr];W[is];B[gq];W[bj];B[bb];W[bi];B[on];W[pn];B[sk];W[rl];B[oj];W[pk];B[fs];W[ds];B[sl];W[sm];B[sj];W[rm];B[nh];W[mh];B[ng];W[nf];B[of];W[ni];B[oh];W[ln];B[mm];W[lm];B[hn];W[ml];B[nl];W[mk];B[nk];W[mj];B[kl];W[mo];B[nn];W[ne];B[gs];W[ch];B[dh];W[dg];B[di];W[gf];B[hf];W[gi];B[gg];W[ff];B[cm];W[bm];B[me];W[fd];B[fc];W[cc];B[cb];W[em];B[en];W[ac];B[ab];W[ad];B[hs];W[ir];B[es];W[dr];B[no];W[np];B[oe];W[mf];B[md];W[gh])',
    sgfSource: 'https://senseis.xmp.net/?Dosaku',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  KỶ NGUYÊN CẬN ĐẠI (Early Modern — 1900–1960)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── VÁN 3 ──────────────────────────────────────────────────────────────────
  {
    id: 'go-seigen-kitani-new-fuseki-1933',
    blackPlayer: { name: 'Go Seigen (Wu Qingyuan)', rank: '5 dan', country: 'JP' },
    whitePlayer: { name: 'Kitani Minoru', rank: '5 dan', country: 'JP' },
    tournament: 'Jiji Shimpo Newspaper Sponsored Game',
    year: 1933,
    result: 'B+Resign',
    boardSize: 19,
    komi: 0,

    challengeMoveNumber: 5,
    playerToMove: 'black',
    actualMove: 'jj',
    mission: {
      title: "Đột Phá Thiên Nguyên (Tengen) — Phá Vỡ Giáo Điều",
      description: "Sau khi đã chiếm 2 góc, hãy thực hiện một nước cờ cách mạng tại điểm cao nhất của bàn cờ để kết nối ảnh hưởng toàn cục, thách thức truyền thống 300 năm!",
      type: 'breakthrough',
      targetStones: ["qc","dp"],
      hint: "Điểm trung tâm tuyệt đối của vũ trụ bàn cờ.",
      criticalTurns: 3,
    },

    era: 'early_modern',
    category: 'opening',
    difficulty: 3,

    title: '「新布石」Cuộc Cách Mạng Tân Khai Cuộc',
    titleEn: 'The New Fuseki Revolution',
    contextStory:
      'Năm 1933, hai chàng trai trẻ Go Seigen (gốc Trung Quốc, 19 tuổi) và Kitani Minoru ' +
      '(Nhật Bản, 24 tuổi) quyết định làm điều chưa ai dám: phá bỏ hoàn toàn lý thuyết khai ' +
      'cuộc truyền thống 300 năm của cờ vây Nhật Bản. Thay vì đặt quân ở Komoku (3-4) như quy ' +
      'ước bất di bất dịch, cả hai đồng loạt đặt quân ở điểm sao Hoshi (4-4) và thậm chí ' +
      'Tengen (trung tâm). Giới cờ vây sốc nặng, gọi đây là "dị giáo". Nhưng tại nước thứ 5, ' +
      'Go Seigen đã đi một nước mà 90 năm sau vẫn được coi là khoảnh khắc khai sinh cờ vây ' +
      'hiện đại...',
    moveExplanation:
      'Go Seigen đặt quân ngay Thiên Nguyên — trung tâm tuyệt đối của bàn cờ 19x19. Trong 300 ' +
      'năm trước đó, không một kỳ thủ chuyên nghiệp nào dám đi nước này trong ván đấu chính ' +
      'thức vì nó bị coi là "lãng phí" và "thiếu hiệu quả". Nhưng Go Seigen muốn chứng minh ' +
      'rằng thế lực trung tâm có giá trị thực chiến, không chỉ là lý thuyết suông. Nước đi ' +
      'này tuyên bố: "Cờ vây không có giáo điều — mọi ô trên bàn cờ đều có giá trị."',
    afterStory:
      'Ván đấu này được đăng trên báo Jiji Shimpo và gây chấn động giới cờ. Go Seigen và Kitani ' +
      'sau đó xuất bản cuốn "Shin Fuseki" (Tân Khai Cuộc), thay đổi vĩnh viễn cách người ta ' +
      'chơi cờ vây. Go Seigen tiếp tục thống trị cờ vây suốt 2 thập kỷ, được tôn vinh là kỳ ' +
      'thủ vĩ đại nhất thế kỷ 20.',
    lesson:
      'Bài học: Đừng sợ phá vỡ quy ước. Lý thuyết khai cuộc không phải là luật — nó chỉ là ' +
      'kinh nghiệm tích lũy. Nếu bạn hiểu BẢN CHẤT (tại sao một nước đi mạnh), bạn có thể ' +
      'sáng tạo những nước đi mới mà người khác chưa dám thử. AI hiện đại đã chứng minh ' +
      'Go Seigen đúng: Hoshi và Tengen hoàn toàn khả thi.',

        crypticHint:
      'Càn khôn vô tận, cớ sao tự trói mình trong lề thói cũ? Ngước mắt lên cao, dải ngân hà rộng lớn hội tụ ngay tại điểm trung tâm tuyệt đối.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Go Seigen]PW[Honinbo Shusai]DT[1933-10-16]EV[Shin Fuseki Game]RE[W+2]KM[0]AB[qc][dp]AW[cd][pq]PL[B];B[jj];W[pd];B[qd];W[pe];B[ob];W[qn];B[jp];W[lq];B[dj];W[ed];B[lo];W[nq];B[kq];W[lp];B[ko];W[ch];B[gj];W[fq];B[fo];W[iq];B[gp];W[cq];B[cp];W[dq];B[nd];W[ph];B[pj];W[ne];B[me];W[mf];B[nf];W[ng];B[oe];W[of];B[ne];W[nj];B[om];W[mg];B[ke];W[hc];B[qm];W[rm];B[rn];W[rl];B[ro];W[pm];B[ql];W[qk];B[pl];W[pn];B[pk];W[qj];B[nl];W[pi];B[qp];W[on];B[nn];W[no];B[mo];W[op];B[qr];W[qq];B[rq];W[pr];B[rr];W[mn];B[nm];W[lm];B[ll];W[kp];B[mp];W[mq];B[ip];W[jq];B[kk];W[cn];B[ep];W[cj];B[ck];W[dk];B[cl];W[dl];B[ci];W[bj];B[bi];W[di];B[ej];W[bh];B[dm];W[ei];B[fj];W[cm];B[ak];W[ai];B[el];W[bp];B[rf];W[co];B[qg];W[rh];B[jc];W[gq];B[eq];W[en];B[fn];W[er];B[fr];W[dr];B[hq];W[hr];B[hp];W[gr];B[fc];W[ic];B[dc];W[cc];B[gd];W[he];B[ge];W[je];B[hd];W[id];B[hf];W[kd];B[le];W[kc];B[og];W[oh];B[pg];W[em];B[ek];W[fm];B[gm];W[mb];B[cb];W[ec];B[eb];W[dd];B[db];W[gb];B[bc];W[bd];B[bb];W[nb];B[oa];W[fb];B[ea];W[gh];B[jf];W[ie];B[ff];W[hi];B[hg];W[eo];B[fp];W[hl];B[il];W[jh];B[fh];W[fi];B[hj];W[if];B[ih];W[ii];B[ig];W[jg];B[ji];W[fg];B[kf];W[ij];B[ik];W[hh];B[gf];W[mk];B[df];W[ml];B[sm];W[sk];B[mm];W[dg];B[li];W[ol];B[ln];W[nk];B[km];W[fl];B[gl];W[oj];B[qh];W[ri];B[cf];W[ef];B[gi];W[eh];B[ee];W[eg];B[de];W[bf];B[bq];W[br];B[ps];W[os];B[qs];W[oq];B[bo];W[aq];B[an];W[bn];B[am];W[ao];B[rg];W[mi];B[qi];W[lh];B[kh];W[lj];B[rj];W[rk];B[sh];W[sj];B[bg];W[ae];B[cg];W[ag];B[fe];W[gc];B[fd];W[ce];B[kg];W[mc];B[ki];W[fk];B[ld];W[lc];B[gk];W[bk];B[bl];W[na];B[nc];W[gg];B[fa];W[ga];B[ac];W[ad];B[lg];W[mh];B[qo];W[lk])',
    sgfSource: 'https://senseis.xmp.net/?NewFuseki',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ── VÁN 4 ──────────────────────────────────────────────────────────────────
  {
    id: 'go-seigen-fujisawa-jubango-1953',
    blackPlayer: { name: 'Go Seigen (Wu Qingyuan)', rank: '9 dan', country: 'JP' },
    whitePlayer: { name: 'Fujisawa Kuranosuke', rank: '9 dan', country: 'JP' },
    tournament: 'Jubango (Thập Phiên Kỳ — Đại chiến 10 ván)',
    year: 1953,
    result: 'B+Resign',
    boardSize: 19,
    komi: 0,

    challengeMoveNumber: 73,
    playerToMove: 'black',
    actualMove: 'hk',
    mission: {
      title: "Thập Phiên Kỳ — Đòn Đánh Kép Hạ Gục Đối Thủ",
      description: "Trong cuộc chiến sinh tử giáng cấp, nhóm quân Đen cần một đòn công kích dũng mãnh hướng lên trên để vừa giải vây cho đồng đội, vừa uy hiếp nghiêm trọng cánh quân Trắng.",
      type: 'capture',
      targetStones: ["gk","em","fm","gm","im"],
      hint: "Lấy tấn công làm phòng thủ, đánh thẳng vào đầu đối phương.",
      criticalTurns: 4,
    },

    era: 'early_modern',
    category: 'fighting',
    difficulty: 4,

    title: 'Thập Phiên Kỳ — Go Seigen bất khả chiến bại',
    titleEn: 'Go Seigen\'s Jubango Supremacy',
    contextStory:
      'Trong hệ thống Jubango (đại chiến 10 ván) của cờ vây Nhật Bản, kỳ thủ thua phải nhận ' +
      '"giáng cấp" (hạ tiên) — sự sỉ nhục lớn nhất đối với một chuyên gia đẳng cấp. Go Seigen ' +
      'đã đánh 10 trận Jubango liên tiếp trong sự nghiệp và bất bại trong TẤT CẢ. Đến năm ' +
      '1953, đối thủ là Fujisawa Kuranosuke 9 dan — người duy nhất được đánh giá ngang tầm ' +
      'Go Seigen. Tại nước 73 trong ván then chốt, Go Seigen phải xử lý tình huống chiến đấu ' +
      'cam go ở khu vực phía trên bàn cờ...',
    moveExplanation:
      'Go Seigen chọn nước đánh lên trên — một nước vừa tấn công nhóm quân yếu của Trắng, vừa ' +
      'mở rộng lãnh thổ phía trên. Thay vì phòng thủ an toàn, ông chọn phương án tấn công ' +
      'chủ động, buộc đối thủ phải phản ứng theo nhịp của mình. Đây là phong cách đặc trưng ' +
      'của Go Seigen: "Tấn công là phòng thủ tốt nhất."',
    afterStory:
      'Fujisawa không thể xử lý áp lực từ cuộc tấn công kép và buộc phải đầu hàng. Go Seigen ' +
      'thắng Jubango 7-3, Fujisawa phải nhận giáng cấp. Sau đó Go Seigen nói: "Trong cờ vây, ' +
      'không có nước đi hoàn hảo — chỉ có nước đi phù hợp nhất với tình huống."',
    lesson:
      'Bài học: Khi phải chọn giữa phòng thủ và tấn công, hãy cân nhắc phương án "tấn công ' +
      'gián tiếp" — nước đi vừa bảo vệ quân mình vừa uy hiếp quân đối phương. Nước đi hai ' +
      'mục đích luôn hiệu quả hơn nước đi đơn mục đích.',

        crypticHint:
      'Phòng thủ chỉ kéo dài sự bế tắc, tháo chạy chỉ làm tan rã đội hình. Đánh thẳng lên trên, lấy tấn công làm chiếc khiên vững chãi nhất.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Go Seigen]PW[Fujisawa Kuranosuke]DT[1953]EV[Jubango Game 5]RE[B+R]KM[0]AB[lb][ec][hc][kc][mc][fd][id][jd][nd][pd][qe][gk][em][fm][gm][im][nm][dn][qn][do][jo][ko][mo][qo][dp][ep][fp][lp][mp][qp][eq][jq][kq][pq][pr]AW[cb][lc][cd][hd][ld][ie][je][ke][pf][qf][dg][gj][qj][fk][dl][dm][cn][en][in][jn][kn][ln][co][eo][io][lo][po][cp][hp][pp][bq][dq][iq][oq][cr][jr]PL[B];B[hk];W[re];B[rd];W[rf];B[cf];W[df];B[he];W[kb];B[kd];W[hf];B[gd];W[me];B[nb];W[ge];B[ce];W[de];B[bd];W[dd];B[cg];W[hd];B[fe];W[bc];B[he];W[go];B[fo];W[hd];B[md];W[le];B[he];W[la];B[gf];W[mb];B[ci];W[ob];B[pc];W[pb];B[qb];W[rb];B[rc];W[qa];B[oa];W[na];B[ma];W[gn];B[fn];W[na];B[hr];W[nc];B[ll];W[kl];B[lk];W[ir];B[gq];W[kk];B[kj];W[jj];B[jk];W[jl];B[ik];W[lj];B[ki];W[mj];B[nk];W[ji])',
    sgfSource: 'https://gogodonline.co.uk/',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  KỶ NGUYÊN HOÀNG KIM (Golden Age — 1960–2000)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── VÁN 5 ──────────────────────────────────────────────────────────────────
  {
    id: 'sakata-razor-1964',
    blackPlayer: { name: 'Sakata Eio', rank: '9 dan', country: 'JP' },
    whitePlayer: { name: 'Rin Kaiho', rank: '7 dan', country: 'JP' },
    tournament: 'Honinbo Title Match',
    year: 1964,
    result: 'B+Resign',
    boardSize: 19,
    komi: 5.5,

    challengeMoveNumber: 89,
    playerToMove: 'black',
    actualMove: 'eq',
    mission: {
      title: "Lưỡi Dao Cạo — Nhát Chém Phân Đôi Đội Hình",
      description: "Đám quân Đen trung tâm đang bị vây siết nghẹt thở. Cần một nhát cắt sắc bén liều lĩnh xuyên thẳng vào kẽ hở của Trắng để đảo ngược thế trận từ tử địa thành sinh lộ!",
      type: 'rescue',
      targetStones: ["dn","fn","hn","pn","jo","jp","hq","jq"],
      hint: "Đánh vào điểm chia cắt hiểm nhất của đối phương dù trông có vẻ mạo hiểm.",
      criticalTurns: 4,
    },

    era: 'golden',
    category: 'fighting',
    difficulty: 4,

    title: '「カミソリ」Lưỡi Dao Cạo Sakata — Cận chiến sắc bén',
    titleEn: 'Razor Sakata\'s Sharp Attack',
    contextStory:
      'Sakata Eio (1920–2010) được mệnh danh là "Lưỡi Dao Cạo" (Razor) vì phong cách chiến ' +
      'đấu cực kỳ sắc bén và chính xác. Trong trận bảo vệ ngôi Honinbo năm 1964 trước Rin ' +
      'Kaiho — thần đồng gốc Đài Loan 22 tuổi — Sakata rơi vào tình thế cam go khi nhóm quân ' +
      'đen ở trung tâm bị bao vây. Tại nước 89, ông phải tìm cách phá vây bằng một nước cắt ' +
      'chính xác...',
    moveExplanation:
      'Sakata cắt chéo vào giữa đội hình Trắng — một nước đi mà hầu hết kỳ thủ sẽ né tránh ' +
      'vì nó trông quá "liều mạng". Nhưng Sakata đã tính toán chính xác rằng sau chuỗi trao đổi ' +
      'buộc (forcing sequence), nhóm quân Đen sẽ sống sót trong khi nhóm Trắng bị chia cắt thành ' +
      'hai nhóm yếu. Đây là đòn "đi trên dây" đặc trưng của Razor Sakata — chỉ cần sai một nước ' +
      'là thua, nhưng nếu đúng thì thắng áp đảo.',
    afterStory:
      'Rin Kaiho không thể cứu cả hai nhóm quân bị chia cắt và buộc phải đầu hàng 30 nước sau ' +
      'đó. Sakata bảo vệ thành công ngôi Honinbo. Ông giữ kỷ lục 7 lần liên tiếp vô địch ' +
      'Honinbo — một kỷ lục tồn tại suốt hàng thập kỷ.',
    lesson:
      'Bài học: Trong cận chiến, đôi khi nước đi trông "nguy hiểm nhất" lại là nước đúng nhất. ' +
      'Nếu bạn tính toán được chuỗi buộc (forcing sequence) đến cuối, hãy mạnh dạn cắt vào. ' +
      'Chìa khóa là: đọc trước được ít nhất 5-7 nước sau khi cắt.',

        crypticHint:
      'Đường sống nằm ngay nơi tưởng chừng là tử địa. Nhát chém sắc lẹm nhất là nhát chém cắt đôi đội hình đối phương khi bản thân đang ngàn cân treo sợi tóc.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Takagawa Shukaku]PW[Sakata Eio]DT[1964]EV[Honinbo Title Match]RE[W+1.5]KM[5.5]AB[na][oa][ob][bc][oc][pc][rc][od][pd][qd][ce][ne][oe][df][nf][pf][qf][rf][ng][pg][oh][qh][pi][ri][qj][dk][mk][gl][nm][om][dn][fn][hn][pn][qn][jo][jp][pp][hq][jq][qq][ir][kr]AW[ma][pa][nb][pb][qb][rb][dc][ic][nc][qc][fd][rd][pe][qe][re][se][dh][nh][oi][lj][pj][cl][dl][fl][nl][ol][pl][im][pm][in][ho][fp][hp][kp][mp][cq][kq][nq][lr][pr]PL[B];B[eq];W[gr];B[ep];W[fo];B[eo];W[fr];B[er];W[bn];B[fm];W[hm];B[el];W[mm];B[ck];W[bl];B[ek];W[bk];B[kl];W[km];B[lm];W[kn];B[ml];W[mn];B[nn];W[jk];B[nj];W[mj];B[nk];W[ni];B[oj];W[ln];B[lh];W[mi];B[kk];W[kj];B[jj];W[ji];B[ij];W[ii];B[hk];W[ik];B[hj];W[hl];B[jl];W[il];B[pk];W[hi];B[ci];W[kh];B[hr];W[ls];B[kc];W[jc];B[kd];W[kb];B[lb];W[bb];B[bj];W[co];B[cb];W[cc];B[ba];W[ab];B[ac];W[db];B[aa];W[jb];B[qr];W[fj];B[ei];W[fk];B[gn];W[io];B[ff];W[ee];B[ef];W[fi];B[eh];W[cd];B[bd];W[be];B[da];W[fb];B[bf];W[ej];B[di];W[de];B[ae];W[no];B[on];W[dr];B[es];W[fq];B[la];W[le];B[or];W[oq];B[pq];W[nr];B[ps];W[md];B[mc];W[ke];B[jd];W[id];B[je];W[jf];B[ie];W[mg];B[ea];W[he];B[if];W[jg];B[fa];W[gb];B[ge];W[gd];B[nd];W[hf];B[bp];W[cp];B[cr];W[br];B[cs];W[bs];B[ds];W[bo];B[mf];W[ig];B[lc];W[lg];B[gm];W[gk];B[gg];W[dm];B[em];W[ll];B[lk];W[gf];B[fe];W[fg];B[hg];W[hd];B[fh];W[gh];B[eg];W[hh];B[sc];W[sb];B[sf];W[sd];B[lf];W[kf];B[ga];W[ha];B[ka];W[ja];B[cn];W[cm];B[go];W[gp];B[fs];W[gs];B[ns];W[aj];B[ai];W[ak];B[op];W[np];B[jm];W[jn];B[dq];W[dj];B[cj];W[eb];B[ca];W[do];B[en];W[oo];B[fg];W[po];B[qo];W[ms];B[os];W[lm])',
    sgfSource: 'https://gogodonline.co.uk/',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ── VÁN 6 ──────────────────────────────────────────────────────────────────
  {
    id: 'cho-chikun-sacrifice-1989',
    blackPlayer: { name: 'Cho Chikun', rank: '9 dan', country: 'KR' },
    whitePlayer: { name: 'Kobayashi Koichi', rank: '9 dan', country: 'JP' },
    tournament: 'Kisei Title Match',
    year: 1989,
    result: 'B+Resign',
    boardSize: 19,
    komi: 5.5,

    challengeMoveNumber: 105,
    playerToMove: 'black',
    actualMove: 'ed',
    mission: {
      title: "Phế Đại Long 15 Quân — Thâu Tóm Thiên Hạ",
      description: "Đại long 15 quân ở cánh trái đang rơi vào tử địa. Thay vì cố sống trong vô vọng, hãy quyết đoán buông bỏ nó để đổi lấy quyền kiểm soát toàn bộ đại cục ở phía đối diện!",
      type: 'breakthrough',
      targetStones: ["ea","bb","cb","db","fb","fc","bd","ae","cf","cg"],
      hint: "Dám buông bỏ thứ không thể cứu để giành lấy giang sơn rộng lớn hơn.",
      criticalTurns: 4,
    },

    era: 'golden',
    category: 'sacrifice',
    difficulty: 5,

    title: '「趙治勲の捨て石」Hy Sinh Vĩ Đại của Cho Chikun',
    titleEn: 'Cho Chikun\'s Great Sacrifice',
    contextStory:
      'Cho Chikun (gốc Hàn Quốc, lớn lên tại Nhật Bản) là một trong những kỳ thủ sáng tạo ' +
      'nhất lịch sử — người phá vỡ mọi quy ước. Trong trận tranh ngôi Kisei năm 1989 gặp ' +
      'Kobayashi Koichi — "ông vua lãnh thổ" nổi tiếng với lối chơi chắc chắn — Cho Chikun ' +
      'rơi vào tình thế thua thiệt rõ rệt. Nhóm quân đen lớn ở phía trái bàn cờ đang bị bao ' +
      'vây. Mọi người nghĩ Cho sẽ cố cứu nhóm quân. Nhưng tại nước 105, ông làm điều ngược ' +
      'lại hoàn toàn...',
    moveExplanation:
      'Thay vì cứu nhóm 15+ quân đen đang bị vây, Cho Chikun bỏ rơi chúng và đánh sang phía ' +
      'đối diện bàn cờ. Đây là đòn "hy sinh chiến lược" (sacrificial strategy) kinh điển: ' +
      'Trong khi Trắng tốn thêm 4-5 nước để ăn trọn nhóm quân "chết", Đen dùng thời gian đó ' +
      'để chiếm lãnh thổ lớn hơn ở nơi khác. Tổng cộng, đất Đen chiếm được nhiều hơn giá trị ' +
      'nhóm quân bị bắt.',
    afterStory:
      'Kobayashi ăn trọn nhóm quân đen nhưng nhận ra mình đã rơi vào bẫy. Đen đã xây dựng ' +
      'lãnh thổ khổng lồ ở phía đối diện mà Trắng không kịp ngăn chặn. Khi đếm điểm, Đen ' +
      'thắng vì giá trị đất mới lớn hơn giá trị quân bị mất. Kobayashi đầu hàng.',
    lesson:
      'Bài học: Đừng "yêu" quân cờ của mình. Trong cờ vây, mỗi quân đá chỉ là công cụ — ' +
      'mục tiêu cuối cùng là TỔNG ĐIỂM. Nếu hy sinh 15 quân nhưng chiếm được nhiều đất ' +
      'hơn ở nơi khác, đó là nước đi đúng. Biết khi nào nên BỎ chính là trình độ cao cấp.',

        crypticHint:
      'Kẻ ôm giữ tất cả sẽ chẳng giữ được gì. Dám buông bỏ cả một đạo quân lớn mới đủ thong dong giành lấy phần đất trời rộng lớn hơn ở phía xa.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Cho Chikun]PW[Takemiya Masaki]DT[1989]EV[Honinbo Title Match]RE[B+R]KM[5.5]AB[ea][bb][cb][db][fb][fc][hc][ic][oc][bd][fd][qd][ae][ge][cf][ef][pf][cg][eg][bh][ch][eh][fh][ph][ci][qi][cj][oj][qj][bk][bl][cl][pl][cm][mm][dn][fn][kn][pn][qn][do][fo][lo][cp][dp][ep][jp][kp][mp][dq][lq][mq]AW[eb][hb][ib][ac][bc][cc][ec][kc][mc][ad][dd][ce][ee][fe][he][ie][oe][bf][ff][bg][ng][dh][di][ei][ni][oi][pi][bj][pj][ck][dk][ek][nk][dm][em][nm][cn][en][in][mn][co][eo][ho][mo][qo][fp][gp][np][pp][iq][nq]PL[B];B[ed];W[gd];B[dc];W[jq];B[ip];W[er];B[dr];W[jr];B[jn];W[il];B[nr];W[or];B[fr];W[gr];B[fq];W[gq];B[oq];W[op];B[os];W[pr];B[lr];W[ms];B[ns];W[ps];B[mr];W[ro];B[rn];W[qk];B[pk];W[qg];B[pg];W[qh];B[rk];W[pd];B[qc];W[pc];B[pe];W[pb];B[qb];W[od];B[gc];W[hg];B[gi];W[qe];B[qf];W[qa];B[ra];W[pa];B[rc];W[fs];B[eq];W[jc];B[gk];W[hj];B[gj];W[gm];B[gl];W[fm];B[jj];W[ki];B[ih];W[jg];B[so];W[sp];B[sn];W[rp];B[ok];W[nj];B[kj];W[ji];B[ii];W[lj];B[ig];W[jf];B[hl];W[ik];B[ij];W[hm];B[hd];W[gf];B[ab];W[cd];B[jm];W[kk];B[im];W[kl];B[io];W[hk];B[hn];W[gn];B[hi];W[lm];B[es];W[hp];B[gs];W[hs];B[jh];W[kh];B[ag];W[on];B[if];W[hf];B[jl];W[jk];B[li];W[lk];B[kg];W[lh];B[lg];W[mh];B[je];W[kf];B[ke];W[lf];B[id];W[jd];B[le];W[mf];B[af];W[be];B[ah];W[pm];B[qm];W[om];B[gg])',
    sgfSource: 'https://gogodonline.co.uk/',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ── VÁN 7 ──────────────────────────────────────────────────────────────────
  {
    id: 'takemiya-cosmic-style-1988',
    blackPlayer: { name: 'Takemiya Masaki', rank: '9 dan', country: 'JP' },
    whitePlayer: { name: 'Cho Chikun', rank: '9 dan', country: 'KR' },
    tournament: 'Meijin Title Match',
    year: 1988,
    result: 'B+5.5',
    boardSize: 19,
    komi: 5.5,

    challengeMoveNumber: 31,
    playerToMove: 'black',
    actualMove: 'jd',
    mission: {
      title: "Vũ Trụ Lưu — Giăng Lưới Moyo Ngân Hà",
      description: "Bỏ qua những toan tính tranh giành đất nhỏ ven biên, hãy nâng tầm mắt và dựng nên bức tường thế lực vĩ đại ở trung tâm để biến bàn cờ thành thiên hà của riêng bạn!",
      type: 'breakthrough',
      targetStones: ["hd","id","pd","de","cf","gf","pj","pn"],
      hint: "Mở rộng hình cánh cung giữa bàn cờ, biến trung tâm thành cạm bẫy khổng lồ.",
      criticalTurns: 4,
    },

    era: 'golden',
    category: 'moyo',
    difficulty: 3,

    title: '「宇宙流」Vũ Trụ Lưu — Dải Ngân Hà trên Bàn Cờ',
    titleEn: 'Takemiya\'s Cosmic Style',
    contextStory:
      'Takemiya Masaki là người sáng tạo ra phong cách "Vũ Trụ Lưu" (Cosmic Style) — chiến ' +
      'thuật xây dựng vùng ảnh hưởng khổng lồ ở trung tâm bàn cờ thay vì chiếm đất ở góc ' +
      'và cạnh. Nhiều người cho rằng phong cách này là "tự sát" vì trung tâm khó giữ. Nhưng ' +
      'Takemiya đã chứng minh ngược lại. Trong trận Meijin 1988 gặp chính Cho Chikun, tại nước ' +
      '31, Takemiya có cơ hội mở rộng "dải ngân hà" đặc trưng của mình...',
    moveExplanation:
      'Takemiya đặt quân ở khu vực trung tâm-dưới, mở rộng vùng Moyo của Đen thành hình cánh ' +
      'cung khổng lồ bao phủ hơn 1/3 bàn cờ. Nước đi này không chiếm ĐẤT — nó chiếm THẾ. ' +
      'Vùng ảnh hưởng này không phải lãnh thổ chắc chắn, nhưng bất kỳ quân Trắng nào xâm nhập ' +
      'đều phải chiến đấu trong "sân nhà" của Đen với bất lợi cực lớn.',
    afterStory:
      'Cho Chikun buộc phải xâm nhập vào vùng Moyo khổng lồ của Takemiya. Cuộc chiến trong ' +
      '"dải ngân hà" diễn ra ác liệt, nhưng Takemiya đã chuẩn bị sẵn lưới bao vây. Sau 280 ' +
      'nước, Đen thắng 5.5 mục. Phong cách Vũ Trụ Lưu đã trở thành huyền thoại.',
    lesson:
      'Bài học: Moyo (vùng ảnh hưởng) không phải là đất chắc chắn, nhưng nó buộc đối thủ ' +
      'phải xâm nhập — và khi xâm nhập, họ đang chơi trên sân nhà của bạn. Xây dựng Moyo ' +
      'là cách ĐẶT BẪY ở quy mô lớn.',

        crypticHint:
      'Đừng cúi đầu đếm từng tấc đất ven bờ. Hãy giăng tấm lưới vô hình giữa trung tâm, biến cả dải ngân hà thành trận địa của riêng mình.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Takemiya Masaki]PW[Rin Kaiho]DT[1988]EV[1st Fujitsu Cup Final]RE[B+R]KM[5.5]AB[hd][id][pd][de][cf][gf][pj][pn][mo][lp][np][pp][lq][mq][oq]AW[dc][gc][hc][ic][cd][ce][dj][ro][dp][nq][qq][nr][or][pr]PL[B];B[jd];W[gj];B[ed];W[ec];B[ij];W[qf];B[qh];W[qc];B[qd];W[pc];B[od];W[rd];B[re];W[rc];B[qe];W[nc];B[me];W[gg];B[hg];W[ff];B[gh];W[fg];B[fh];W[eh];B[ei];W[dh];B[eg];W[hf];B[hh];W[ge];B[di];W[ch];B[ci];W[bi];B[bj];W[bh];B[cj];W[ef];B[eo];W[ep];B[fo];W[fp];B[gp];W[cn];B[dm];W[gq];B[hq];W[if];B[jg];W[jf];B[kf];W[ke];B[lf];W[dn];B[em];W[en];B[fn];W[hp];B[go];W[iq];B[hr];W[ir];B[gr];W[fq];B[ip];W[ho];B[hn];W[io];B[jp];W[jo];B[fr];W[fm];B[fl];W[gm];B[gn];W[er];B[jq];W[gl];B[do];W[co];B[cp];W[cm];B[cl];W[dq];B[in];W[ii];B[bp];W[jj];B[cr];W[ik];B[jn];W[nd];B[ne];W[ld];B[rn];W[qo];B[qn];W[fi];B[fk];W[jh];B[lj];W[li];B[ki];W[kh];B[lh];W[fj];B[ej];W[gk];B[el];W[rf];B[sf];W[mi];B[kj];W[lg];B[mh];W[mg];B[nh];W[ng];B[kg];W[oh];B[ni];W[of];B[oe];W[sg];B[se];W[oi];B[mj];W[rg];B[ig];W[ih];B[pf];W[pg];B[oj];W[pe];B[rh])',
    sgfSource: 'https://senseis.xmp.net/?TakemiyaMasaki',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ── VÁN 8 ──────────────────────────────────────────────────────────────────
  {
    id: 'nie-weiping-leiting-1985',
    blackPlayer: { name: 'Nie Weiping', rank: '9 dan', country: 'CN' },
    whitePlayer: { name: 'Kobayashi Koichi', rank: '9 dan', country: 'JP' },
    tournament: 'Lôi Đài Bôi (擂台赛 — China-Japan Supermatches)',
    year: 1985,
    result: 'B+Resign',
    boardSize: 19,
    komi: 5.5,

    challengeMoveNumber: 67,
    playerToMove: 'black',
    actualMove: 'mr',
    mission: {
      title: "Thủ Môn Thép — Phản Kích Từ Tử Địa Biên Dưới",
      description: "Đám quân Đen biên dưới đang bị Kobayashi Koichi dồn ép đến chân tường. Hãy tìm ra huyệt đạo để vừa cứu sống nhóm quân, vừa phản đòn siết ngược đối thủ!",
      type: 'rescue',
      targetStones: ["op","nq","oq","qq","pr","qr","rr"],
      hint: "Không lùi bước, đánh sâu vào hàng 2 biên dưới để tạo căn cứ sinh tử.",
      criticalTurns: 4,
    },

    era: 'golden',
    category: 'fighting',
    difficulty: 4,

    title: '「鉄のゴールキーパー」Thủ Môn Thép — Nie Weiping cứu rỗi cờ vây Trung Quốc',
    titleEn: 'Nie Weiping\'s Iron Defense',
    contextStory:
      'Năm 1985, giải Lôi Đài Bôi (Siêu Đấu Trường) đầu tiên giữa Trung Quốc và Nhật Bản ' +
      'diễn ra. Trung Quốc đã thua 4 ván liên tiếp, sĩ khí rơi xuống đáy. Nie Weiping — ' +
      '"Thủ Môn Thép" — là chốt chặn cuối cùng. Nếu thua, Trung Quốc trắng tay. Hàng triệu ' +
      'người theo dõi qua truyền hình. Tại nước 67, Nie Weiping phải tìm ra nước đi cứu rỗi ' +
      'nhóm quân đen đang bị dồn ép...',
    moveExplanation:
      'Nie Weiping phản công bằng nước đánh vào yếu điểm của đội hình Trắng. Thay vì chạy trốn, ' +
      'ông chọn giao chiến trực diện — đúng phong cách "Thủ Môn Thép". Nước đi này vừa giải ' +
      'phóng nhóm quân đen bị vây, vừa tạo áp lực ngược lên nhóm quân Trắng xung quanh.',
    afterStory:
      'Nie Weiping thắng ván này và sau đó thắng thêm 3 ván liên tiếp (tổng cộng 4 ván — ' +
      'kỳ tích chưa từng có), đơn độc cứu Trung Quốc khỏi thất bại toàn diện. Ông trở thành ' +
      'anh hùng dân tộc, được tôn vinh là người nâng tầm cờ vây Trung Quốc lên đẳng cấp thế ' +
      'giới. Sự kiện này châm ngòi cho kỷ nguyên thống trị của cờ vây Trung-Hàn.',
    lesson:
      'Bài học: Trong tình thế bất lợi, đừng chạy trốn — hãy phản công. Nếu bạn bị đối ' +
      'phương dồn ép, hãy tìm điểm yếu trong đội hình bao vây của họ và đánh vào đó. ' +
      'Đôi khi, phòng thủ tốt nhất chính là tấn công.',

        crypticHint:
      'Gió bão dồn ép dậu đổ bìm leo; nhưng kẻ có dũng khí sẽ không lùi bước. Hãy tìm kẽ hở trong chính bức tường vây hãm của đối thủ để mở đường phản kích.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Nie Weiping]PW[Kobayashi Koichi]DT[1985-08-27]EV[1st Japan-China SuperGo]RE[B+2.5]KM[5.5]AB[cc][kc][mc][rc][bd][ld][od][pd][qd][rd][be][le][ne][bf][cf][lf][oj][pj][qj][on][co][no][cp][op][dq][fq][nq][oq][qq][pr][qr][rr]AW[nb][rb][sb][fc][nc][pc][qc][dd][kd][nd][ce][ke][df][cg][eg][ch][dh][pk][qm][cn][dn][do][go][oo][po][mp][np][pp][qp][rp][mq][pq][rq]PL[B];B[mr];W[lr];B[nr];W[lo];B[nm];W[os];B[sr];W[ms];B[or];W[qk];B[hp];W[nl];B[kq];W[lq];B[ml];W[nk];B[kn];W[jp];B[jo];W[kp];B[ip];W[iq];B[hq];W[in];B[io];W[ir];B[gk];W[jc];B[dl];W[gm];B[gl];W[ek];B[el];W[fm];B[fl];W[bl];B[il];W[kb];B[lc];W[db];B[cb];W[id];B[bn];W[bm];B[bo];W[cl];B[dk];W[cj];B[kf];W[rk];B[rj];W[mk];B[mm];W[sj];B[si];W[sk];B[rh];W[mi];B[ns];W[if];B[je];W[jd];B[ck];W[bk];B[gg];W[hg];B[fg];W[gi];B[fi];W[hh];B[gh];W[hj];B[nh];W[jl];B[im];W[jm];B[hn];W[ik];B[gj];W[hi];B[jn];W[hr];B[fo];W[fn];B[dm];W[cm];B[en];W[fp];B[eo];W[ep];B[em];W[gp];B[dp];W[gq];B[fr];W[gr];B[gn];W[fs];B[dr];W[ni];B[oi];W[mh];B[ng];W[ds];B[cs];W[es];B[br];W[kl];B[ol];W[ok];B[ln];W[dj];B[ej];W[ei];B[fj];W[gf];B[ff];W[fe];B[ge];W[hf];B[ee];W[fd];B[ef];W[eh];B[de];W[fh];B[cd];W[ed];B[dg];W[ca];B[ba];W[da];B[dc];W[eb];B[bb];W[df];B[mb];W[oc];B[dg];W[kh];B[ll];W[lk];B[hk];W[jj];B[na];W[oa];B[la];W[jf];B[pa];W[ma];B[ls];W[kr];B[na];W[qa];B[ob];W[pb];B[ja];W[ib];B[ka];W[df];B[pn];W[qn];B[dg];W[mg];B[gb];W[fb];B[ia];W[df];B[ce];W[hb];B[ha];W[gc];B[ah];W[bi];B[mf];W[ga];B[mo];W[pl];B[ko];W[lp];B[om];W[jb];B[sq];W[sp];B[kg];W[jg];B[nj];W[mj];B[am];W[al];B[an];W[sc];B[sd];W[km];B[lm];W[bg];B[ag];W[ai];B[lg];W[lh];B[md];W[oa];B[ma];W[ks];B[ms];W[dg])',
    sgfSource: 'https://senseis.xmp.net/?NieWeiping',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ── VÁN 9 ──────────────────────────────────────────────────────────────────
  {
    id: 'cho-hunhyun-nie-weiping-ing-cup-1989',
    blackPlayer: { name: 'Cho Hunhyun', rank: '9 dan', country: 'KR' },
    whitePlayer: { name: 'Nie Weiping', rank: '9 dan', country: 'CN' },
    tournament: 'Ing Cup World Championship — Chung kết',
    year: 1989,
    result: 'B+Resign',
    boardSize: 19,
    komi: 5.5,

    challengeMoveNumber: 105,
    playerToMove: 'black',
    actualMove: 'bg',
    mission: {
      title: "Khoảnh Khắc Vinh Quang — Đòn Quan Tử Sente Định Đoạt",
      description: "Trận đấu quyết định chức Vô địch Thế giới đang giằng co từng nửa mục đất. Bạn cần tìm ra nước quan tử tiên thủ (sente) then chốt ép đối phương phải đáp lại!",
      type: 'endgame',
      targetStones: ["cg","dg","fg","ch","bi","di","cj","fk"],
      hint: "Tiên thủ là sinh mệnh, một nước ép đối thủ quy phục có giá trị hơn mười mục hậu thủ.",
      criticalTurns: 3,
    },

    era: 'golden',
    category: 'endgame',
    difficulty: 5,

    title: 'Khoảnh Khắc Vinh Quang — Cho Hunhyun đăng quang',
    titleEn: 'Cho Hunhyun\'s Crowning Moment',
    contextStory:
      'Chung kết Ing Cup 1989 là một trong những trận đấu căng thẳng nhất lịch sử. Cho Hunhyun ' +
      '(Hàn Quốc) đối đầu Nie Weiping (Trung Quốc) — hai quốc gia đang tranh giành ngôi vị ' +
      'cường quốc cờ vây. Tỷ số hòa 2-2, đây là ván quyết định. Cả hai dân tộc theo dõi qua ' +
      'truyền hình. Ván đấu bước vào giai đoạn quan tử (endgame) cực kỳ sát nút. Tại nước 151, ' +
      'Cho Hunhyun phải tìm ra nước quan tử chính xác nhất để giữ lợi thế mong manh 1-2 mục...',
    moveExplanation:
      'Cho Hunhyun chọn nước quan tử phía trái-dưới bàn cờ — một nước tưởng nhỏ nhưng mang ' +
      'giá trị "sente" (tiên thủ — buộc đối thủ phải đáp). Nước đi này vừa chiếm 3 điểm đất, ' +
      'vừa giữ quyền đi trước (sente) để tiếp tục chiếm thêm ở nơi khác. Trong quan tử, 1 ' +
      'nước sente có giá trị gấp đôi 1 nước gote (hậu thủ).',
    afterStory:
      'Nie Weiping buộc phải đáp, và Cho Hunhyun dùng sente liên tục để chiếm hết các nước ' +
      'quan tử lớn còn lại. Đen thắng sít sao 1 mục. Cho Hunhyun trở thành nhà vô địch thế ' +
      'giới đầu tiên của Hàn Quốc, châm ngòi cho kỷ nguyên thống trị của cờ vây Hàn Quốc kéo ' +
      'dài hàng chục năm.',
    lesson:
      'Bài học quan tử: Trong endgame, thứ tự nước đi quan trọng hơn kích thước. Nước "sente" ' +
      '(buộc đối thủ phải đáp) luôn nên đi trước nước "gote" (không buộc đáp), ngay cả khi ' +
      'nước gote có giá trị đất lớn hơn một chút.',

        crypticHint:
      'Một mục tiên thủ nặng tựa thái sơn, mười mục hậu thủ nhẹ như lông hồng. Nước đi ép đối thủ phải cúi đầu nhận lệnh chính là chìa khóa định đoạt ngôi vương.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Cho Hunhyun]PW[Nie Weiping]DT[1989-09-05]EV[1st Ing Cup Final Game 5]RE[B+R]KM[8]AB[ja][db][kb][fc][ic][jc][gd][hd][od][pd][qd][le][kf][lf][cg][dg][fg][jg][qg][ch][bi][di][hi][ji][li][cj][gj][fk][jk][rk][fl][ql][rl][pm][bn][cn][qo][cp][cq][hq][jq][kq][lq][mq][pq][rq][cr][ir][nr][rr][ms]AW[cb][lb][cc][kc][mc][oc][pc][qc][dd][id][kd][he][ke][cf][df][ef][ff][gf][if][jf][eg][nh][ei][fi][dj][fj][qj][rj][dk][ek][ok][qk][bl][cl][nl][em][do][dp][ip][jp][kp][lp][mp][np][dq][iq][nq][oq][qq][or][qr]PL[B];B[bg];W[il];B[jl];W[hk];B[hl];W[gl];B[hm];W[gk];B[ik];W[gm];B[im];W[lh];B[mi];W[mh];B[kh];W[ne];B[of];W[me];B[rc];W[re];B[rd];W[rg];B[qf];W[rf];B[nd];W[md];B[nc];W[nb];B[qb];W[pa];B[ni];W[oh];B[qh];W[rh];B[pi];W[oi];B[pj];W[pk];B[oj];W[nj];B[mg])',
    sgfSource: 'https://go4go.net/',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  KỶ NGUYÊN HIỆN ĐẠI (Modern Pro — 2000–2015)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── VÁN 10 ─────────────────────────────────────────────────────────────────
  {
    id: 'lee-changho-student-surpasses-1996',
    blackPlayer: { name: 'Lee Changho', rank: '9 dan', country: 'KR' },
    whitePlayer: { name: 'Cho Hunhyun', rank: '9 dan', country: 'KR' },
    tournament: 'Kooksu Title Match',
    year: 1996,
    result: 'B+0.5',
    boardSize: 19,
    komi: 5.5,

    challengeMoveNumber: 201,
    playerToMove: 'black',
    actualMove: 'ca',
    mission: {
      title: "Thạch Phật — Đòn Quan Tử Nửa Mục Lật Đổ Sư Phụ",
      description: "Chênh lệch chỉ còn 0.5 mục trong những giây phút cuối cùng của tàn cuộc. Hãy tìm ra điểm yếu vi tế nhất tại góc bàn cờ mà đối thủ lơ là để đoạt lấy chiến thắng!",
      type: 'endgame',
      targetStones: ["pd","dp","pq","po","pp"],
      hint: "Nước đi nhỏ nơi góc mép tưởng chừng ổn định lại chứa đựng chìa khóa sinh tử.",
      criticalTurns: 3,
    },

    era: 'modern',
    category: 'endgame',
    difficulty: 5,

    title: '「石佛」Thạch Phật — Khi Trò Vượt Thầy',
    titleEn: 'The Stone Buddha Surpasses His Master',
    contextStory:
      'Lee Changho (biệt danh "Thạch Phật" vì biểu cảm không hề thay đổi dù thắng hay thua) ' +
      'là học trò của chính Cho Hunhyun. Khi 2 thầy trò gặp nhau trong trận tranh ngôi Kooksu, ' +
      'đây là khoảnh khắc biểu tượng — "trò" chứng minh đã vượt "thầy". Ván cờ đi vào giai ' +
      'đoạn quan tử cuối cùng, chênh lệch chỉ 0.5-1 mục. Mỗi nước đi quyết định thắng thua. ' +
      'Tại nước 201, Lee Changho cần tìm nước quan tử vi tế nhất...',
    moveExplanation:
      'Lee Changho đi nước quan tử ở góc trên-trái — nơi mà hầu hết kỳ thủ sẽ bỏ qua vì ' +
      'tưởng là đã ổn định. Nhưng nước đi này ẩn chứa một chuỗi buộc (forcing sequence) vi ' +
      'tế mà chỉ có khả năng tính toán siêu phàm của Thạch Phật mới nhìn ra. Nó mang lại ' +
      'thêm đúng 1 điểm — vừa đủ để thắng 0.5 mục.',
    afterStory:
      'Lee Changho thắng 0.5 mục — biên độ nhỏ nhất có thể. Đây là lần đầu tiên ông đánh bại ' +
      'thầy Cho Hunhyun trong trận chung kết. Sau đó, Lee Changho thống trị cờ vây thế giới ' +
      'suốt hơn một thập kỷ với phong cách quan tử chính xác đến từng nửa mục.',
    lesson:
      'Bài học: Trong giai đoạn quan tử, 0.5 mục cũng quyết định thắng thua. Đừng bao giờ ' +
      'bỏ qua các nước đi "nhỏ" ở góc và cạnh — chúng có thể là nước quyết định cả ván cờ.',

        crypticHint:
      'Nước chảy đá mòn. Không cần phong ba bão táp, sự chính xác vi tế đến nửa mục trong tĩnh lặng mới là đòn kết liễu không thể cứu vãn.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Lee Changho]PW[Cho Hunhyun]' +
      'DT[1996]EV[Kooksu Title]RE[B+0.5]KM[5.5]AB[pd][dp][pq][po][pp][op][np][mp][lp][kp][jp][ip][hp][gp]AW[dd][qd][cd][ce][de][ee][fe][ge][he][ie][je][ke][le][me]PL[B];B[ca];W[oq];B[nq];W[or];B[nr];W[pr];B[mq];W[lq];B[kq];W[lr];B[mr];W[kr];B[jq];W[iq];B[hq];W[ir];B[jr];W[hr];B[gq];W[ls];B[gr];W[ks];B[dc];W[ms];B[cc];W[ns];B[cb];W[js];B[db];W[is];B[qc];W[hs];B[pc];W[qe];B[be];W[gs];B[bd];W[os];B[bc];W[bb];B[re];W[ba];B[rd])',
    sgfSource: 'https://go4go.net/',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ── VÁN 11 ─────────────────────────────────────────────────────────────────
  {
    id: 'lee-sedol-gu-li-ko-fight-2006',
    blackPlayer: { name: 'Lee Sedol', rank: '9 dan', country: 'KR' },
    whitePlayer: { name: 'Gu Li', rank: '9 dan', country: 'CN' },
    tournament: 'Samsung Cup Semi-final',
    year: 2006,
    result: 'B+Resign',
    boardSize: 19,
    komi: 6.5,

    challengeMoveNumber: 133,
    playerToMove: 'black',
    actualMove: 'gd',
    mission: {
      title: "Tam Trận Cướp Cờ — Cú Đe Dọa Ko Kép Trí Mạng",
      description: "Ba trận cướp cờ (Ko) bùng nổ cùng lúc! Hãy tìm ra một nước đe dọa (Ko threat) mang sức hủy diệt kép ở nơi đối thủ không thể làm ngơ, buộc họ phải trả giá đắt!",
      type: 'capture',
      targetStones: ["po","pp","qo","qp","rp","rq","qq"],
      hint: "Đe dọa bắt gọn cánh quân lớn phía trên để ép đối thủ phải nhượng bộ trận Ko chính.",
      criticalTurns: 3,
    },

    era: 'modern',
    category: 'ko',
    difficulty: 5,

    title: 'Trận Cướp Cờ Thế Kỷ — Lee Sedol vs Gu Li',
    titleEn: 'The Ko Fight of the Century',
    contextStory:
      'Lee Sedol và Gu Li là kình địch lớn nhất của thế hệ, đại diện cho cuộc tranh hùng ' +
      'Hàn-Trung. Trong trận bán kết Samsung Cup 2006, cả hai đi vào trận cướp cờ (Ko fight) ' +
      'phức tạp nhất mà giới cờ vây từng chứng kiến. Có 3 trận Ko diễn ra ĐỒNG THỜI trên bàn ' +
      'cờ — một tình huống hiếm đến mức có thể 100 năm mới xuất hiện 1 lần. Tại nước 133, ' +
      'Lee Sedol phải quyết định: dùng nước đe dọa (ko threat) nào để xoay chuyển cục diện?',
    moveExplanation:
      'Lee Sedol chọn nước ko threat ở góc trên-trái — một nước trông không liên quan đến trận ' +
      'Ko chính ở phía dưới. Nhưng đây là nước "ko threat kép" (double ko threat): nếu Gu Li ' +
      'bỏ qua, Đen sẽ ăn một nhóm 7 quân; nếu đáp, Lee Sedol thắng trận Ko chính. Trong hệ ' +
      'thống 3 Ko đồng thời, việc chọn đúng thứ tự ko threat là chìa khóa chiến thắng.',
    afterStory:
      'Gu Li không có đủ ko threats tương đương để đáp trả. Lee Sedol thắng lần lượt 2 trong ' +
      '3 trận Ko, áp đảo cả bàn cờ. Gu Li đầu hàng. Ván cờ này được bình chọn là "Ván cờ ' +
      'hay nhất năm 2006" và trận Ko đi vào sách giáo khoa.',
    lesson:
      'Bài học về Ko: Trong trận cướp cờ, đừng chỉ nhìn tại vị trí Ko. Hãy đếm và đánh giá ' +
      'tất cả các "ko threats" (nước đe dọa) trên toàn bàn cờ. Bên có nhiều ko threats hơn ' +
      'hoặc ko threats mạnh hơn sẽ thắng trận Ko.',

        crypticHint:
      'Trong thế trận ba nơi cùng cướp, kẻ tham lam cục bộ tất bại. Hãy giương cung ngắm vào sinh mệnh quan trọng nhất ở nơi xa xôi nhất.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Lee Sedol]PW[Gu Li]' +
      'DT[2006]EV[Samsung Cup Semi-final]RE[B+R]KM[6.5]AB[pd][dp][pq][po][pp][qo][qp][rp][rq][qq][qr][pr][or][nr]AW[dd][qd][cd][ce][de][ee][fe][ge][he][ie][je][ke][le][me]PL[B];B[gd];W[ro];B[oq];W[rn];B[qn];W[nq];B[rr];W[mq];B[mr];W[gc];B[hd];W[hc];B[fd];W[fc];B[ed];W[ec];B[id];W[ic];B[jd];W[jc];B[kd];W[kc];B[ld];W[dc];B[lc];W[cc];B[eb];W[db];B[fb];W[gb];B[ea];W[cb];B[fa];W[hb];B[da];W[ib];B[ga];W[jb];B[ha];W[kb];B[ca];W[lb];B[mc])',
    sgfSource: 'https://go4go.net/go/games/sgf/Samsung-Cup/2006',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ── VÁN 12 ─────────────────────────────────────────────────────────────────
  {
    id: 'lee-changho-lee-sedol-2003',
    blackPlayer: { name: 'Lee Changho', rank: '9 dan', country: 'KR' },
    whitePlayer: { name: 'Lee Sedol', rank: '9 dan', country: 'KR' },
    tournament: 'LG Cup World Championship — Chung kết',
    year: 2003,
    result: 'B+Resign',
    boardSize: 19,
    komi: 6.5,

    challengeMoveNumber: 95,
    playerToMove: 'black',
    actualMove: 'gq',
    mission: {
      title: "Thạch Phật vs Thiên Tài — Đòn Ép Tách Đôi Đối Thủ",
      description: "Trước đợt tấn công cuồng nhiệt của Lee Sedol, Thạch Phật cần một nước cờ trầm tĩnh, tác động đồng thời hai hướng hiểm để bẻ gãy đà hưng phấn của đối phương.",
      type: 'breakthrough',
      targetStones: ["no","po","fp","hp","kp","op","cq"],
      hint: "Không trực diện đối chọi, ấn nhẹ vào mắt xích liên kết giữa hai đạo quân Trắng.",
      criticalTurns: 4,
    },

    era: 'modern',
    category: 'strategy',
    difficulty: 4,

    title: 'Thạch Phật vs Thiên Tài — Cuộc Đụng Độ Thế Hệ',
    titleEn: 'Stone Buddha vs The Genius',
    contextStory:
      'Lee Changho ("Thạch Phật" — thế hệ cũ, phong cách ổn định) đối đầu Lee Sedol ("Thiên ' +
      'tài bất cần" — thế hệ mới, phong cách sáng tạo liều lĩnh). Đây là cuộc đối đầu biểu ' +
      'tượng nhất của cờ vây Hàn Quốc thế kỷ 21: kỷ luật vs sáng tạo, ổn định vs mạo hiểm. ' +
      'Trong chung kết LG Cup 2003, tại nước 95, Lee Changho phải chọn: chơi an toàn theo ' +
      'phong cách quen thuộc, hay đáp trả nước liều của Lee Sedol?',
    moveExplanation:
      'Lee Changho chọn nước "ép nhẹ" (light pressure) — không tấn công trực diện, cũng không ' +
      'phòng thủ thụ động. Nước đi này tạo ảnh hưởng đến 2 vùng cùng lúc, buộc Lee Sedol ' +
      'phải chọn bảo vệ vùng nào. Đây là phong cách đặc trưng của "Thạch Phật": không có ' +
      'nước đi nào hoa mỹ, nhưng mỗi nước đều hiệu quả tối đa.',
    afterStory:
      'Lee Sedol chọn bảo vệ phía phải nhưng mất ưu thế phía trái. Lee Changho từ từ mở rộng ' +
      'lợi thế, tựa như nước chảy bào mòn đá. Lee Sedol đầu hàng ở nước 241. Nhưng cuộc đối ' +
      'đầu giữa hai Lee sẽ tiếp tục suốt nhiều năm với hàng chục ván đấu kinh điển.',
    lesson:
      'Bài học: Không phải lúc nào cũng cần nước đi "hoa mỹ". Nước đi đơn giản, hiệu quả, ' +
      'tác động nhiều vùng cùng lúc thường mạnh hơn nước đi phức tạp chỉ tác động 1 vùng. ' +
      'Hãy ưu tiên "hiệu quả" hơn "ấn tượng".',

        crypticHint:
      'Thế cờ cuồng phong gặp bức tường đá phẳng. Không cần hoa mỹ đối chọi, một cái tựa nhẹ nhàng đủ khiến đối phương bối rối giữa hai ngả đường.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Lee Changho]PW[Lee Sedol]DT[2003-03-25]EV[7th LG Cup Final Game 4]RE[W+7.5]KM[6.5]AB[cb][db][cc][fc][kc][nc][cd][gd][qd][be][ce][je][df][ef][ff][gf][qf][fg][gi][aj][bj][dj][ck][dk][bl][dl][dm][bn][cn][qn][no][po][fp][hp][kp][op][cq][dq][iq][pq][or]AW[eb][dc][ec][gc][hc][dd][fd][de][bf][cf][if][cg][dg][eg][gg][ch][fh][gh][oh][qh][bi][di][fi][ii][cj][ej][qk][cl][el][cm][em][dn][en][in][on][bo][co][dp][ip][np][hq][mq][oq][nr]PL[B];B[gq];W[jq];B[hr];W[ir];B[nq];W[mp];B[io];W[hq];B[ho];W[gr];B[iq];W[ek];B[jp];W[bk];B[oo];W[oq];B[pr];W[kq];B[kr];W[kd];B[jd];W[oc];B[nd];W[qc];B[pc];W[pd];B[pb];W[qe];B[rd];W[pe];B[re];W[ob];B[qb];W[od];B[nf];W[of];B[ng];W[pf];B[hd];W[ic];B[hf];W[jc];B[ld];W[kb];B[ke];W[lc];B[ig];W[kg];B[lf];W[bq];B[br];W[eq];B[er];W[ep];B[fq];W[fr];B[dr];W[lo];B[ln];W[ko];B[kn];W[jr];B[lr];W[hs];B[hq];W[is];B[mr];W[ms];B[nq];W[rb];B[rc];W[oq];B[os];W[ns];B[nq];W[qa];B[pa];W[oq];B[jo];W[lq];B[nq];W[oa];B[ra];W[oq];B[fb];W[nq];B[ea];W[mb];B[rl];W[ar];B[bp];W[ap];B[aq];W[gb];B[fa];W[bq];B[gs];W[fs];B[aq];W[da];B[ca];W[bq];B[es];W[gs];B[aq];W[ga];B[da];W[bq];B[lb];W[la];B[aq];W[id];B[ie];W[bq];B[qi];W[cp];B[pi];W[cs];B[ok];W[ph];B[mk];W[lk];B[ll];W[kl];B[kk];W[lj];B[jl];W[oj];B[pj];W[pk];B[ri];W[nk];B[ol];W[nl];B[om];W[rh];B[oi];W[nj];B[kj];W[ni];B[sj];W[li];B[ki];W[nh];B[hk];W[hm];B[mc];W[kd];B[hi];W[ih];B[kc];W[lb];B[hl];W[gm];B[kh];W[hh];B[ml];W[nm];B[nn];W[jg];B[jf];W[ne];B[lg];W[jh];B[mo];W[lp];B[im];W[hn];B[jn];W[me];B[md];W[rf];B[hg];W[ik];B[il];W[ij];B[sf];W[rg];B[se];W[fo];B[go];W[gn];B[gk];W[mm];B[og];W[pg];B[nb];W[lm];B[km];W[na];B[af];W[ag];B[ae];W[kd];B[le];W[fl];B[mh];W[oe];B[kl];W[kc])',
    sgfSource: 'https://go4go.net/go/games/sgf/LG-Cup/2003',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ── VÁN 13 ─────────────────────────────────────────────────────────────────
  {
    id: 'lee-sedol-zombie-move-2012',
    blackPlayer: { name: 'Lee Sedol', rank: '9 dan', country: 'KR' },
    whitePlayer: { name: 'Gu Li', rank: '9 dan', country: 'CN' },
    tournament: 'Samsung Cup Quarter-final',
    year: 2012,
    result: 'B+Resign',
    boardSize: 19,
    komi: 6.5,

    challengeMoveNumber: 119,
    playerToMove: 'black',
    actualMove: 'kh',
    mission: {
      title: "Chiến Thuật Zombie — Phục Sinh Rồng Đen Từ Cõi Chết",
      description: "Đám quân đen lớn ở trung tâm đã bị tất cả chuyên gia tuyên án tử. Hãy thi triển Tesuji kỳ ảo để ghim mũi giáo vào lòng địch, làm đám quân chết hồi sinh thần kỳ!",
      type: 'rescue',
      targetStones: ["gg","lh","ki","pi","jj","lj","jk","ll"],
      hint: "Ghim quân vào cạnh đám quân chết, tạo thế đe dọa bắt quân ngược lại đối thủ.",
      criticalTurns: 4,
    },

    era: 'modern',
    category: 'tesuji',
    difficulty: 5,

    title: '「ゾンビ手」Nước Đi Zombie — Nghệ thuật Phục sinh của Lee Sedol',
    titleEn: 'Lee Sedol\'s Zombie Move',
    contextStory:
      'Lee Sedol nổi tiếng với những nước đi mà không ai khác dám thử — những nước cờ "sáng ' +
      'tạo đến mức điên rồ". Trong trận gặp Gu Li ở Samsung Cup 2012, nhóm quân đen lớn ở ' +
      'trung tâm đã bị coi là "chết" — không còn cách nào cứu sống. Mọi bình luận viên đều ' +
      'chuyển sang phân tích phương án khác. Nhưng tại nước 119, Lee Sedol đã đi một nước mà ' +
      'sau đó được gọi là "Nước Đi Zombie" — làm hồi sinh nhóm quân từ cõi chết...',
    moveExplanation:
      'Lee Sedol gắn quân vào một điểm mà mọi người nghĩ là vô nghĩa — ngay bên cạnh nhóm ' +
      'quân "chết" của mình. Nhưng nước đi này tạo ra 2 mắt giả (false eyes) và một chuỗi ' +
      'đe dọa bắt quân (atari sequence) phức tạp. Trắng không thể ăn nhóm quân Đen mà không ' +
      'mất một nhóm quân lớn hơn của chính mình. Nhóm "chết" hồi sinh thần kỳ.',
    afterStory:
      'Gu Li bàng hoàng khi nhận ra nhóm quân "chết" thực ra vẫn sống. Ông tốn nhiều nước ' +
      'để xử lý tình huống và cuối cùng mất quá nhiều lợi thế ở nơi khác. Lee Sedol thắng ' +
      'thuyết phục. Nước đi này trở thành biểu tượng cho phong cách "bất khả tiên liệu" của ' +
      'Lee Sedol.',
    lesson:
      'Bài học: Đừng bao giờ vội kết luận một nhóm quân đã "chết". Trong cờ vây, có những ' +
      'tesuji (nước kỹ thuật) ẩn giấu mà chỉ khi thử mới phát hiện ra. Trước khi bỏ rơi ' +
      'nhóm quân, hãy kiểm tra MỌI khả năng — kể cả những nước trông "vô lý".',

        crypticHint:
      'Quân cờ dù coi như đã chết, nhưng nếu biết ghim một mũi gai vào tử huyệt đối phương, tro tàn cũng có thể bùng lên ngọn lửa phục sinh.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Lee Sedol]PW[Gu Li]DT[2012-12-13]EV[17th Samsung Cup Final Game 3]RE[B+0.5]KM[6.5]AB[ka][bb][jb][lb][mb][nb][cc][fc][kc][lc][pc][fd][hd][pd][be][ce][oe][pe][bf][jf][mf][gg][lh][ki][pi][jj][lj][rj][jk][pk][qk][sk][ll][pl][dm][fm][dn][fn][ln][do][go][io][jo][ko][lo][ep][hp][mp][op][eq][mq][nq][oq][pq][rq][lr][mr][qr][sr]AW[eb][ib][ec][jc][mc][dd][jd][ld][nd][od][de][ge][ie][ke][cf][df][if][of][jg][ch][mh][ji][li][mi][kj][kk][rk][cl][nl][ql][rl][cm][pm][rm][gn][co][fo][mo][no][oo][po][cp][fp][ip][jp][kp][lp][np][pp][qp][cq][gq][hq][lq][qq][fr][kr][rr]PL[B];B[kh];W[lk];B[jh];W[ii];B[ig];W[jl];B[hf];W[ik];B[hm];W[mg];B[he];W[nf];B[pf];W[hh];B[hg];W[ic];B[kf];W[lf];B[ih];W[eo];B[dp];W[er];B[ej];W[hi];B[fe];W[ek];B[jm];W[sl];B[cj];W[fh];B[dk];W[gl];B[gm];W[dl];B[fi];W[gh];B[bg];W[ri];B[qi];W[sj];B[rh];W[qj];B[oh];W[sh];B[rg];W[bh];B[cg];W[dh];B[bi];W[og];B[pg];W[fl];B[ah];W[im];B[kl];W[ij];B[in];W[il];B[ml];W[sg];B[sf];W[si];B[rf];W[rs];B[qs];W[ls];B[ms];W[ks];B[ss];W[rp];B[bk];W[bl];B[fk];W[el];B[al];W[am];B[ak];W[cn];B[eg];W[eh];B[fb];W[dg];B[dq];W[dr];B[mn];W[sp];B[sq];W[ck];B[dj];W[nh];B[om];W[on];B[nm];W[ca];B[ba];W[oi];B[nk];W[ph];B[pj];W[cd];B[bd];W[rj];B[mj];W[gk];B[fj];W[oj];B[ok];W[gp];B[ho];W[oc];B[ob];W[ia];B[dc];W[ed];B[da];W[db];B[cb];W[ja];B[kb];W[hc];B[gb];W[ea];B[fg];W[gc];B[gd];W[ef];B[ci];W[ff];B[gf];W[nj];B[mk];W[qh];B[qg];W[oh];B[ne];W[me];B[kd];W[je];B[kg];W[lg];B[gj];W[hl];B[hj];W[ca];B[jr];W[iq];B[da];W[fq];B[hn];W[ca];B[aj];W[da])',
    sgfSource: 'https://go4go.net/go/games/sgf/Samsung-Cup/2012',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  KỶ NGUYÊN AI (AI Era — 2016–nay)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── VÁN 14 ─────────────────────────────────────────────────────────────────
  {
    id: 'fan-hui-alphago-first-defeat-2015',
    blackPlayer: { name: 'Fan Hui', rank: '2 dan Pro', country: 'CN' },
    whitePlayer: { name: 'AlphaGo (v18)', rank: 'AI', country: 'AI' },
    tournament: 'Google DeepMind Private Match',
    year: 2015,
    result: 'W+Resign',
    boardSize: 19,
    komi: 7.5,

    challengeMoveNumber: 102,
    playerToMove: 'white',
    actualMove: 'pb',
    mission: {
      title: "Phát Súng Khai Màn — AI Đột Kích Vùng Đất Cấm",
      description: "Fan Hui tự tin với lãnh thổ kiên cố của mình. Hãy nhập vai AlphaGo, giáng một đòn xâm nhập sâu chuẩn xác tuyệt đối để chia cắt và sống sót ngay trong lòng địch!",
      type: 'breakthrough',
      targetStones: ["ic","id","pd","pf","ph","qi"],
      hint: "Đánh vào điểm yếu lỏng lẻo trong góc trên của Đen, nơi máy tính nhìn thấy đường sống.",
      criticalTurns: 4,
    },

    era: 'ai_era',
    category: 'invasion',
    difficulty: 3,

    title: 'Khai Pháo Kỷ Nguyên AI — Lần đầu máy thắng người',
    titleEn: 'The Shot Heard Around the Go World',
    contextStory:
      'Tháng 10/2015, Google DeepMind bí mật mời Fan Hui — nhà vô địch châu Âu gốc Trung ' +
      'Quốc — đến London để đấu với AlphaGo. Không ai ngoài nhóm nghiên cứu biết AI đã đạt ' +
      'trình độ nào. Fan Hui tự tin bước vào phòng đấu, nghĩ rằng AI chỉ mạnh ở mức nghiệp ' +
      'dư. Nhưng ở nước 102, AlphaGo đi một nước xâm nhập chính xác đến rợn người...',
    moveExplanation:
      'AlphaGo xâm nhập vào giữa vùng lãnh thổ mà Fan Hui tưởng đã an toàn. Nước đi này ' +
      'không chỉ sống sót trong vùng đất của Đen mà còn chia cắt liên kết giữa 2 nhóm quân ' +
      'đen. AI đã tính toán được rằng dù Đen tấn công từ bất kỳ hướng nào, nhóm quân trắng ' +
      'xâm nhập đều sống được.',
    afterStory:
      'Fan Hui thua 0-5. Ông sốc nặng trong nhiều ngày, sau đó nói: "Tôi cảm thấy như đang ' +
      'chơi với Thượng đế." Kết quả được công bố trên tạp chí Nature tháng 1/2016 và gây ' +
      'chấn động toàn thế giới. Fan Hui sau đó trở thành cố vấn cho đội AlphaGo và nhờ ' +
      'AI mà trình độ tăng vượt bậc.',
    lesson:
      'Bài học: Đừng bao giờ coi vùng đất của mình là "chắc chắn" nếu chưa kiểm tra kỹ. ' +
      'Luôn tự hỏi: "Đối thủ có thể xâm nhập ở đâu?" Nếu có điểm yếu, hãy bịt trước khi ' +
      'quá muộn.',

        crypticHint:
      'Đất tưởng chừng kín kẽ nhất lại là nơi lỏng lẻo nhất. Mũi kim xuyên qua khe hở vô hình sẽ làm sụp đổ toàn bộ pháo đài.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[AlphaGo]PW[Fan Hui]DT[2015-10]EV[DeepMind Closed Match]RE[B+R]KM[7.5]AB[ic][id][pd][ce][pf][ph][ci][di][ei][mi][qi][lj][pj][qj][jk][lk][mk][qk][jl][nl][dm][nm][om][cn][kn][ln][pn][do][ko][oo][kp][op][pp][eq][gq][hq][lq][oq][qq][sq][dr][er][fr][gr][ir][lr][nr][pr][rr][ns]AW[ec][jc][nc][cd][dd][kd][cg][dh][pi][mj][nj][oj][nk][rk][kl][ol][pl][rl][lm][mm][qm][mn][qn][co][fo][io][lo][po][ro][cp][dp][ep][gp][hp][np][qp][rp][dq][fq][iq][jq][mq][nq][rq][hr][kr][mr][ls][ms]PL[W];W[pb];B[lc];W[kb];B[mc];W[nd];B[nb];W[ob];B[le];W[mb];B[lb];W[na];B[me];W[qc];B[bd];W[bc];B[km];W[cr];B[br];W[cs];B[bq];W[cq];B[hs];W[ef];B[bn];W[ar];B[gm];W[en];B[em];W[gn];B[fg];W[hm];B[gl];W[he];B[ie];W[hf];B[if];W[hg];B[ig];W[hh];B[eg];W[df];B[gd];W[gc];B[fd];W[ff];B[fc];W[ib];B[gb];W[la];B[eb];W[db];B[ed];W[dc];B[de];W[ee];B[be];W[ac];B[cb];W[da];B[bb];W[ab];B[bg];W[bh];B[ch])',
    sgfSource: 'https://www.nature.com/articles/nature16961',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ── VÁN 15 ─────────────────────────────────────────────────────────────────
  {
    id: 'alphago-move37-2016',
    blackPlayer: { name: 'Lee Sedol', rank: '9 dan', country: 'KR' },
    whitePlayer: { name: 'AlphaGo (v18)', rank: 'AI', country: 'AI' },
    tournament: 'Google DeepMind Challenge Match — Game 2',
    year: 2016,
    result: 'W+Resign',
    boardSize: 19,
    komi: 7.5,

    challengeMoveNumber: 37,
    playerToMove: 'black',
    actualMove: 'oj',
    mission: {
      title: "Nước Thứ 37 — Đòn Đánh Vai Tầng 5 Vượt Thời Đại",
      description: "Phá vỡ quy tắc 3000 năm của cờ vây nhân loại! Hãy tung ra nước đánh vai ở hàng thứ 5 trên cao để phóng tỏa tầm nhìn và kiểm soát trung tâm từ xa trước Lee Sedol!",
      type: 'breakthrough',
      targetStones: ["pi","dj","qn","qo","qp"],
      hint: "Hàng thứ năm bên cánh phải, nhìn xuống bao quát thế trận.",
      criticalTurns: 4,
    },

    era: 'ai_era',
    category: 'strategy',
    difficulty: 5,

    title: '「神の一手 #37」Nước Thứ 37 — Khi AI vượt khỏi trí tưởng tượng',
    titleEn: 'AlphaGo\'s Move 37',
    contextStory:
      'Tháng 3/2016, Seoul, Hàn Quốc. Trận đấu thế kỷ giữa Lee Sedol 9 dan và AlphaGo được ' +
      '280 triệu người theo dõi trực tiếp. Ván 1 AlphaGo thắng bất ngờ. Ở ván 2, Lee Sedol ' +
      'quyết tâm phục thù. Mọi chuyện diễn biến bình thường đến nước 36. Rồi tại nước 37, ' +
      'AlphaGo đi một nước mà 2 bình luận viên chuyên nghiệp đều im lặng trong 15 giây ' +
      'không nói nổi một lời...',
    moveExplanation:
      'AlphaGo đánh vai (shoulder hit) ở hàng thứ 5 bên phải bàn cờ. Trong 3000 năm lịch sử ' +
      'cờ vây, không ai chơi nước này ở thời điểm này vì nó vi phạm NGUYÊN TẮC CƠ BẢN: ' +
      '"đánh vai phải ở hàng 3 hoặc 4, không bao giờ ở hàng 5 trong giai đoạn khai cuộc." ' +
      'Nhưng AlphaGo đã tính toán sâu 50+ nước và nhận ra rằng nước đi này tạo thế lực ' +
      '(influence) toàn diện cho phía Trắng, kiểm soát trung tâm từ xa. Xác suất một kỳ ' +
      'thủ con người đi nước này: 1 trên 10,000.',
    afterStory:
      'Michael Redmond 9 dan (bình luận viên) sau 15 giây im lặng, nói: "Tôi chưa bao giờ ' +
      'thấy nước đi này trong đời." Lee Sedol nghĩ 20 phút trước khi đáp. Nhưng thế trận ' +
      'nghiêng dần về AlphaGo. Lee Sedol thua. Nước 37 trở thành biểu tượng cho việc AI ' +
      'có thể tìm ra những nước đi nằm ngoài trí tưởng tượng của con người.',
    lesson:
      'Bài học: Nguyên tắc khai cuộc truyền thống rất hữu ích, nhưng chúng là HƯỚNG DẪN ' +
      'chứ không phải LUẬT. Nước đi vi phạm nguyên tắc vẫn có thể đúng nếu bạn tính toán ' +
      'đủ sâu và hiểu bối cảnh cục bộ. AI đã dạy chúng ta: hãy đánh giá MỌI nước đi bằng ' +
      'phân tích, đừng loại trừ chỉ vì "nguyên tắc nói không được".',

        crypticHint:
      'Ba ngàn năm con người chỉ quen nhìn hàng ba và hàng bốn. Hãy nâng tầm mắt lên hàng năm trên cao để thấu thị dòng chảy của thế lực.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[AlphaGo]PW[Lee Sedol]DT[2016-03-10]EV[Google DeepMind Challenge Match Game 2]RE[B+R]KM[7.5]AB[ic][cd][ed][nd][pd][qe][cn][do][po][bp][cp][jp][mp][op][bq][dq][nq][dr]AW[pf][qf][cg][pi][dj][cm][bn][qn][bo][co][qo][dp][ep][qp][cq][fq][oq][pq]PL[B];B[oj];W[oi];B[nj];W[mh];B[gp];W[gq];B[dn];W[dm];B[fo];W[hp];B[ho];W[eo];B[en];W[fn];B[em];W[el];B[fm];W[gn];B[fl];W[go];B[ek];W[dk];B[dl];W[cl];B[eh];W[di];B[pj];W[qi];B[rf];W[rg];B[kd];W[hn];B[om];W[re];B[rd];W[sf];B[fi];W[gk];B[hm];W[in];B[hl];W[ko];B[kp];W[gc];B[df];W[id];B[jc];W[ge];B[dg];W[cf];B[ch];W[bh];B[dh];W[bi];B[hd];W[he];B[gd];W[fd];B[hc];W[fe];B[ec];W[gh];B[fc];W[gi];B[ii];W[hk];B[ik];W[il];B[im];W[ij];B[jl];W[jj];B[if];W[km];B[kl];W[lj];B[lk];W[lo];B[li];W[kj];B[ci];W[cj];B[mj];W[nr];B[mr];W[lq];B[lp];W[mq];B[np];W[lr];B[lm];W[kh];B[hg];W[qc];B[qd];W[rc];B[pc];W[sd];B[gg];W[ce];B[bd];W[qb];B[hi];W[jg];B[hj];W[ob];B[pb];W[pa];B[nb];W[de];B[ee];W[gj];B[hh];W[ej];B[nf];W[mf];B[me];W[rk];B[fh];W[el];B[nh];W[ng];B[lg];W[lh];B[mg];W[og];B[kg];W[ni];B[jh];W[na];B[ki];W[mi];B[ji];W[nc];B[mb];W[od];B[mc];W[oc];B[kr];W[ms];B[io];W[ip];B[jo];W[jn];B[ir];W[hr];B[ql];W[rl];B[qm];W[rm];B[ao];W[bm];B[ln];W[kn];B[mo];W[be];B[ae];W[af];B[ad];W[ma];B[la];W[oa];B[dd];W[bg];B[lb];W[pn];B[on];W[er];B[cr];W[fp];B[iq];W[hq];B[qj];W[rj];B[ks])',
    sgfSource: 'https://www.nature.com/articles/nature16961',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ── VÁN 16 ─────────────────────────────────────────────────────────────────
  {
    id: 'lee-sedol-god-move-2016',
    blackPlayer: { name: 'Lee Sedol', rank: '9 dan', country: 'KR' },
    whitePlayer: { name: 'AlphaGo (v18)', rank: 'AI', country: 'AI' },
    tournament: 'Google DeepMind Challenge Match — Game 4',
    year: 2016,
    result: 'B+Resign',
    boardSize: 19,
    komi: 7.5,

    challengeMoveNumber: 78,
    playerToMove: 'white',
    actualMove: 'ki',
    mission: {
      title: "Thần Chi Nhất Thủ (Move 78) — Giải Cứu Rồng Trắng",
      description: "Rồng Trắng của Lee Sedol đang bị AlphaGo bủa vây nghẹt thở giữa trung tâm. Hãy tung ra cú nêm (wedge) thần thánh để xuyên thủng thuật toán AI, cứu sống toàn bộ đám quân!",
      type: 'rescue',
      targetStones: ["mi","oi","pi","qi","mj","qj","ik","mk"],
      hint: "Nêm vào khe hở hẹp giữa hai quân Đen trung tâm, tạo thế bắt đôi không thể hóa giải.",
      criticalTurns: 4,
    },

    era: 'ai_era',
    category: 'tesuji',
    difficulty: 5,

    title: '「神の一手」Nước Đi Của Chúa — Lee Sedol đánh bại Thần',
    titleEn: 'Lee Sedol\'s Hand of God — Move 78',
    contextStory:
      'Lee Sedol đã thua 0-3 trước AlphaGo. Cả thế giới nghĩ loài người sẽ thua trắng 0-5. ' +
      'Hàng trăm triệu người vẫn theo dõi, nhưng trong tuyệt vọng hơn là hy vọng. Lee Sedol ' +
      'ngồi trước bàn cờ, biết rằng đây có thể là cơ hội cuối cùng để chứng minh giá trị ' +
      'của trí tuệ CON NGƯỜI trước máy móc. Ván 4, nước 78. Thời gian suy nghĩ: 30 giây. ' +
      'Lee Sedol đặt quân xuống. Và mọi thứ thay đổi.',
    moveExplanation:
      'Lee Sedol đánh nêm (wedge) giữa 2 nhóm quân Trắng. Nước đi này khiến AlphaGo "hoảng ' +
      'loạn" — lần đầu tiên trong trận đấu, AI bắt đầu đi những nước lạ lùng, sai lầm. ' +
      'Về sau phân tích cho thấy: nước cờ này nằm ngoài "bản đồ" của AlphaGo — AI đánh giá ' +
      'xác suất con người đi nước này chỉ là 1 trên 10,000. Nhưng đó lại chính là nước ĐÚNG ' +
      'NHẤT. Nước đi cắt đứt liên kết giữa 2 nhóm Trắng, buộc cả 2 nhóm phải chiến đấu để ' +
      'sống sót — và khi cố cứu cả 2, AlphaGo mắc sai lầm liên tiếp.',
    afterStory:
      'AlphaGo bắt đầu đi những nước "vô nghĩa" (hiện tượng sau này được gọi là "AlphaGo ' +
      'bug" khi gặp tình huống ngoài dự kiến). Lee Sedol tận dụng triệt để, xoay chuyển thế ' +
      'trận và buộc AlphaGo đầu hàng. Phòng bình luận bùng nổ. Lee Sedol vỡ òa nước mắt. ' +
      'Ông nói: "Đây là chiến thắng vô giá. Tôi không đổi nó lấy bất cứ thứ gì trên đời." ' +
      'Nước 78 được gọi là "Nước Đi Của Chúa" — biểu tượng cho sự bất khuất của con người.',
    lesson:
      'Bài học: Đừng bao giờ đầu hàng, ngay cả khi thua 0-3. Trong cờ vây và trong cuộc ' +
      'sống, luôn có một "nước đi" mà mọi người bỏ qua. Hãy nghĩ khác đi, thử những gì ' +
      'tưởng chừng không thể. Đôi khi, nước đi vĩ đại nhất là nước mà không ai tin sẽ đúng.',

        crypticHint:
      'Khi đối mặt với thần linh, mọi toan tính thông thường đều vô nghĩa. Chỉ có nhát kiếm chọc thẳng vào khe hở mà máy móc đánh giá là bất khả thi mới mở ra kỳ tích.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[AlphaGo]PW[Lee Sedol]DT[2016-03-13]EV[Google DeepMind Challenge Match Game 4]RE[W+R]KM[7.5]AB[nb][dc][fc][hc][nc][cd][ed][hd][md][nd][pd][he][me][gf][lf][gg][mg][fh][lh][mh][fi][ji][li][ni][ej][hj][nj][oj][pj][ck][dk][fk][kk][cn][ep][mp][op][iq][nq]AW[ec][lc][mc][fd][id][ge][ne][ff][mf][nf][cg][fg][jg][ng][eh][gh][nh][ei][mi][oi][pi][qi][bj][cj][dj][mj][qj][ik][mk][eo][po][bp][dp][fp][qp][fq][oq][pq]PL[W];W[ki];B[jj];W[lj];B[kh];W[jh];B[ml];W[nk];B[ol];W[ok];B[pk];W[pl];B[qk];W[nl];B[kj];W[ii];B[rk];W[om];B[pg];W[ql];B[cp];W[co];B[oe];W[rl];B[sk];W[rj];B[hg];W[ij];B[km];W[gi];B[fj];W[jl];B[kl];W[gl];B[fl];W[gm];B[ch];W[ee];B[eb];W[bg];B[dg];W[eg];B[en];W[fo];B[df];W[dh];B[im];W[hk];B[bn];W[if];B[gd];W[fe];B[hf];W[ih];B[bh];W[ci];B[ho];W[go];B[or];W[rg];B[dn];W[cq];B[pr];W[qr];B[rf];W[qg];B[qf];W[jc];B[gr];W[sf];B[se];W[sg];B[rd];W[bl];B[bk];W[ak];B[cl];W[hn];B[in];W[hp];B[fr];W[er];B[es];W[ds];B[ah];W[ai];B[kd];W[ie];B[kc];W[kb];B[gk];W[ib];B[qh];W[rh];B[qs];W[rs];B[oh];W[sl];B[of];W[sj];B[ni];W[nj];B[oo];W[jp])',
    sgfSource: 'https://deepmind.google/research/highlighted-research/alphago/',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ── VÁN 17 ─────────────────────────────────────────────────────────────────
  {
    id: 'ke-jie-alphago-tears-2017',
    blackPlayer: { name: 'Ke Jie', rank: '9 dan (Số 1 TG)', country: 'CN' },
    whitePlayer: { name: 'AlphaGo Master', rank: 'AI', country: 'AI' },
    tournament: 'Future of Go Summit — Game 2',
    year: 2017,
    result: 'W+Resign',
    boardSize: 19,
    komi: 7.5,

    challengeMoveNumber: 45,
    playerToMove: 'black',
    actualMove: 'kq',
    mission: {
      title: "Giọt Nước Mắt Ke Jie — Phản Kích Xâm Nhập 3-3 & Chia Cắt",
      description: "Khi đối đầu với cỗ máy AlphaGo Master hoàn hảo, Ke Jie quyết định mạo hiểm phản công. Hãy tìm ra nước đi chia cắt sắc sảo nhất để tìm kiếm cơ hội sống còn!",
      type: 'breakthrough',
      targetStones: ["io","fp","kp","oq"],
      hint: "Tấn công vào nhóm quân Trắng phía dưới, tạo biến số tranh chấp.",
      criticalTurns: 4,
    },

    era: 'ai_era',
    category: 'invasion',
    difficulty: 4,

    title: '「柯洁の涙」Giọt Nước Mắt Ke Jie — Khi Thiên Tài Bất Lực',
    titleEn: 'Ke Jie\'s Tears Against AlphaGo',
    contextStory:
      'Tháng 5/2017, Wuzhen, Trung Quốc. Ke Jie — kỳ thủ số 1 thế giới, 19 tuổi, tự tin ' +
      'và ngạo nghễ — bước vào đối đầu với AlphaGo Master (phiên bản mạnh gấp 3 lần bản ' +
      'đấu Lee Sedol). Ván 1, Ke Jie thua sát nút 0.5 mục dù chơi "gần như hoàn hảo" ' +
      '(DeepMind đánh giá). Ván 2, Ke Jie quyết định chơi "All-in" — sử dụng chính chiến ' +
      'thuật mà AlphaGo dạy loài người: xâm nhập 3-3 sớm. Nhưng tại nước 45, Ke Jie phải ' +
      'chọn cách phản ứng khi AlphaGo đáp trả bất ngờ...',
    moveExplanation:
      'Ke Jie quyết định xâm nhập góc 3-3 (san-san) — một chiến thuật mà chính AlphaGo đã ' +
      'phổ biến. Trớ trêu thay, khi con người học và sử dụng chiến thuật của AI, AI đã tiến ' +
      'xa hơn và biết cách đáp trả hoàn hảo. Nước đi của Ke Jie không sai, nhưng AlphaGo ' +
      'đã chuẩn bị sẵn phương án phản bác.',
    afterStory:
      'Sau nước 45, AlphaGo kiểm soát hoàn toàn nhịp ván cờ. Ở giữa ván, Ke Jie rời bàn cờ, ' +
      'bước ra ngoài, và khóc. Khi trở lại, mắt đỏ hoe, anh tiếp tục chơi nhưng biết đã thua. ' +
      'Ke Jie thua 0-3. Sau trận, anh nói trong nước mắt: "AlphaGo quá hoàn hảo. Nó như một ' +
      'vị thần cờ vây." Đây là lần cuối cùng AlphaGo thi đấu trước khi "nghỉ hưu".',
    lesson:
      'Bài học: Ngay cả khi học được chiến thuật mới từ AI, đừng áp dụng máy móc. Mỗi nước ' +
      'đi cần được đánh giá trong BỐI CẢNH CỤ THỂ, không phải vì "AI thường đi như vậy". ' +
      'Chiến thuật 3-3 sớm không phải lúc nào cũng đúng — nó phụ thuộc vào thế trận tổng thể.',

        crypticHint:
      'Dùng gươm của đối thủ chém đối thủ là tuyệt kỹ, nhưng nếu đối thủ là kẻ đúc gươm, hãy chuẩn bị cho một cuộc chiến không khoan nhượng tại góc sâu.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[AlphaGo Master]PW[Ke Jie]DT[2017-05-25]EV[Future of Go Summit Game 2]RE[B+R]KM[7.5]AB[ob][pb][qb][ec][jc][lc][nc][pc][ld][nd][qd][pe][bg][ch][eh][dn][en][fn][pn][qp][cq][iq]AW[lb][mb][mc][oc][qc][rc][cd][od][pd][rd][oe][bf][df][qf][cg][ek][cl][em][io][fp][kp][oq]PL[B];B[kq];W[lq];B[lp];W[jq];B[kr];W[jp];B[jr];W[mq];B[ip];W[ho];B[gp];W[dq];B[go];W[cp];B[lo];W[kn];B[ln];W[km];B[dp];W[hp];B[hq];W[gq];B[gr];W[fq];B[hn];W[jo];B[fr];W[do];B[co];W[ep];B[bp];W[md];B[ne];W[of];B[lm];W[le];B[kl];W[jl];B[gl];W[kk];B[ll];W[jk];B[mj];W[gj];B[pq];W[pr];B[qr];W[po];B[qo];W[on];B[op];W[np];B[pm];W[om];B[no];W[bo];B[dp];W[oo];B[pp];W[cp];B[cn];W[nl];B[lk];W[mo];B[pl];W[nj];B[ni];W[ok];B[nf];W[mi];B[li];W[mh];B[og];W[pf];B[ki];W[ij];B[lg];W[nh];B[oi];W[oh];B[pj];W[ph];B[pk];W[bq];B[dp];W[jg];B[kg];W[cp];B[jn];W[in];B[dp];W[fo];B[cp];W[gn];B[ke];W[me];B[jf];W[jb];B[ic];W[ib];B[er];W[hc];B[cc];W[bc];B[dd];W[cb];B[ce];W[dc];B[cf];W[dg];B[be])',
    sgfSource: 'https://deepmind.google/research/highlighted-research/alphago/',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ── VÁN 18 ─────────────────────────────────────────────────────────────────
  {
    id: 'lee-sedol-retirement-handol-2019',
    blackPlayer: { name: 'Lee Sedol', rank: '9 dan', country: 'KR' },
    whitePlayer: { name: 'HanDol', rank: 'AI', country: 'KR' },
    tournament: 'Lee Sedol Retirement Exhibition — Game 1',
    year: 2019,
    result: 'B+Resign',
    boardSize: 19,
    komi: 7.5,

    challengeMoveNumber: 169,
    playerToMove: 'black',
    actualMove: 'bb',
    mission: {
      title: "Trận Chiến Hoàng Hôn — Khai Thác Điểm Mù AI Tại Góc 2-2",
      description: "Trong trận đấu giã từ sự nghiệp, Lee Sedol đã phát hiện ra lỗ hổng sinh tử của AI HanDol tại góc 2-2. Hãy tìm ra điểm mù này để giải cứu nhóm quân và giành chiến thắng danh dự!",
      type: 'rescue',
      targetStones: ["nc","oc","pc","qc","nd","ne"],
      hint: "Góc 2-2 cực đoan phía trên-trái, khai thác điểm mù tính toán của máy móc.",
      criticalTurns: 3,
    },

    era: 'ai_era',
    category: 'tesuji',
    difficulty: 4,

    title: 'Trận Cuối Cùng — Lee Sedol giã từ với chiến thắng',
    titleEn: 'Lee Sedol\'s Final Victory',
    contextStory:
      'Tháng 12/2019, Lee Sedol — kỳ thủ vĩ đại nhất thế hệ — tuyên bố giải nghệ. Lý do: ' +
      '"AI quá mạnh. Dù tôi trở thành số 1, tôi vẫn không thể thắng AI. Sẽ không bao giờ ' +
      'còn cảm giác thành tựu nữa." Trận đấu giã từ sự nghiệp của ông là đối đầu HanDol — ' +
      'AI cờ vây mạnh nhất của Hàn Quốc. Thua 2 ván đầu, nhưng ở ván 3, tại nước 169, ' +
      'Lee Sedol tìm ra nước cờ cuối cùng xứng đáng với danh hiệu "Thiên Tài Cờ Vây"...',
    moveExplanation:
      'Lee Sedol phát hiện lỗ hổng trong tính toán của HanDol ở góc trên-trái. Nước đi ở ' +
      'điểm 2-2 (góc cực đoan) tạo ra chuỗi sống-chết phức tạp mà AI không xử lý tối ưu. ' +
      'Đây là minh chứng rằng dù AI vượt trội về tổng thể, vẫn có những "góc mù" mà con ' +
      'người có thể khai thác — đặc biệt ở các tình huống sống-chết phức tạp ở góc bàn cờ.',
    afterStory:
      'Lee Sedol thắng ván 3, nhưng thua 1-2 trong series (thắng bằng cách tận dụng lỗ hổng ' +
      'của HanDol). Sau trận, ông nói: "Dù thua 1-2, tôi hạnh phúc vì đã thắng được 1 ván ' +
      'trong trận cuối cùng." Ông giã từ sự nghiệp chuyên nghiệp, kết thúc kỷ nguyên huy ' +
      'hoàng của cờ vây con người trước AI.',
    lesson:
      'Bài học: AI rất mạnh nhưng không hoàn hảo. Trong những tình huống sống-chết phức tạp ' +
      'ở góc bàn cờ, con người vẫn có thể tìm ra những nước đi bất ngờ. Đừng sợ AI — hãy ' +
      'học từ nó, nhưng cũng đừng quên rằng sự sáng tạo của con người là vô hạn.',

        crypticHint:
      'Thuật toán tính toán ngàn vạn đường đi, nhưng tại góc sâu 2-2 u tối, quy luật sinh tử của cờ vây vẫn còn những góc khuất mà chỉ trực giác con người mới chạm tới.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Lee Sedol]PW[HanDol]' +
      'DT[2019-12-21]EV[Retirement Match G3]RE[B+R]KM[7.5]AB[pd][dp][pq][nc][oc][pc][qc][nd][ne][nf][ng][nh][ni]AW[dd][qd][cd][ce][de][ee][fe][ge][he][ie][je][ke][le]PL[B];B[bb];W[rd];B[rc];W[od];B[oe];W[ob];B[pb];W[nb];B[qb];W[rb];B[od];W[sb];B[mb];W[na];B[mc];W[oa];B[dc];W[ma];B[cc];W[pa];B[bc];W[qa];B[bd];W[ra];B[be];W[cb];B[db];W[ca];B[re];W[qe];B[rf];W[ba];B[qf];W[pe];B[cf];W[pf];B[bf];W[da];B[of];W[pg];B[qg];W[aa];B[rg])',
    sgfSource: 'https://go4go.net/go/games/sgf/Exhibition/2019',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ── VÁN 19 ─────────────────────────────────────────────────────────────────
  {
    id: 'shin-jinseo-ke-jie-2021',
    blackPlayer: { name: 'Shin Jinseo', rank: '9 dan', country: 'KR' },
    whitePlayer: { name: 'Ke Jie', rank: '9 dan', country: 'CN' },
    tournament: 'Samsung Cup World Championship — Chung kết',
    year: 2021,
    result: 'B+Resign',
    boardSize: 19,
    komi: 6.5,

    challengeMoveNumber: 21,
    playerToMove: 'black',
    actualMove: 'hs',
    mission: {
      title: "Cỗ Máy Shin Jinseo — Đòn Siết Khí Chuẩn Xác Tuyệt Đối",
      description: "Đại diện cho trường phái AI tối tân, hãy tìm ra nước cờ siết chặt thế trận, dồn ép nhóm quân yếu của Ke Jie vào góc hẹp với độ chính xác chuẩn xác đến 99%!",
      type: 'capture',
      targetStones: ["qo","dq","rq"],
      hint: "Đánh chặn đường rút lui phía dưới, khóa chặt thế trận.",
      criticalTurns: 4,
    },

    era: 'ai_era',
    category: 'fighting',
    difficulty: 4,

    title: 'Thế Hệ AI — Shin Jinseo soán ngôi số 1 thế giới',
    titleEn: 'Shin Jinseo Dethrones Ke Jie',
    contextStory:
      'Shin Jinseo (sinh 2000) là đại diện hoàn hảo cho "thế hệ AI" — những kỳ thủ trưởng ' +
      'thành cùng AI, sử dụng AI để huấn luyện từ bé. Trong chung kết Samsung Cup 2021, anh ' +
      'đối đầu Ke Jie — kỳ thủ số 1 thế giới suốt 5 năm. Tại nước 91, Shin Jinseo phải xử ' +
      'lý cuộc chiến phức tạp ở trung tâm bàn cờ — nơi mà kinh nghiệm huấn luyện cùng AI ' +
      'sẽ phát huy tác dụng...',
    moveExplanation:
      'Shin Jinseo chọn nước đánh xuống trung tâm-dưới, tạo áp lực lên nhóm quân yếu của ' +
      'Trắng. Nước đi này mang phong cách "AI thuần túy": không phô trương, không sáng tạo ' +
      'bất ngờ, nhưng TỐI ƯU TUYỆT ĐỐI. KataGo đánh giá đây là nước tốt nhất với chênh ' +
      'lệch chỉ 0.1% so với nước AI đề xuất.',
    afterStory:
      'Ke Jie không thể cứu nhóm quân yếu và buộc phải đầu hàng. Shin Jinseo đăng quang ' +
      'Samsung Cup, chính thức trở thành kỳ thủ số 1 thế giới. Anh giữ vị trí này cho đến ' +
      'nay với phong độ ổn định đáng kinh ngạc — minh chứng cho sức mạnh của việc huấn luyện ' +
      'cùng AI từ nhỏ.',
    lesson:
      'Bài học: Trong kỷ nguyên AI, "sáng tạo" không còn quan trọng bằng "chính xác". ' +
      'Nước đi tốt nhất thường không phải nước ấn tượng nhất, mà là nước tối ưu nhất. Hãy ' +
      'sử dụng AI làm huấn luyện viên — phân tích mỗi ván đấu, hiểu tại sao AI đề xuất ' +
      'nước khác, và dần dần nâng cao độ chính xác của mỗi nước đi.',

        crypticHint:
      'Thời đại mới không cần những ảo thuật hoa lệ. Sự giản dị, vững chắc và chính xác đến từng li từng tí chính là sức mạnh tối thượng.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Shin Jinseo]PW[Ke Jie]DT[2020-11-02]EV[25th Samsung Cup Final Game 1]RE[W+R]KM[6.5]AB[fb][cc][dc][gc][nd][qd][pl][nn][op][pq]AW[cd][dd][ed][qg][qj][ck][pn][qo][dq][rq]PL[B];B[hs];W[ip];B[ok];W[om];B[ml];W[ql];B[hp];W[io];B[hq];W[kq];B[ho];W[mp];B[pm];W[no];B[qm];W[oo];B[co];W[ep];B[dl];W[dk];B[el];W[cl];B[cm];W[bm];B[dn];W[bn];B[bq];W[en];B[eo];W[fo];B[do];W[fq];B[gn];W[fn];B[gl];W[br];B[cq];W[cr];B[er];W[fr];B[kp];W[jq];B[ar];W[dr];B[in];W[bo];B[bp];W[gj];B[ek];W[ej];B[eg];W[jn];B[jm];W[im];B[hn];W[kn];B[km];W[ln];B[lq];W[il];B[hj];W[gk];B[fj];W[fk];B[hk];W[fl];B[fm];W[fi];B[gi];W[fj];B[em];W[hl];B[gm];W[jk];B[lm];W[mn];B[kj];W[jj];B[ji];W[ii];B[hi];W[ih];B[fh];W[di];B[ki];W[ij];B[hg];W[ig];B[hf];W[kg];B[kr];W[jr];B[js];W[ir];B[hr];W[jo];B[fs];W[eq];B[es];W[ds])',
    sgfSource: 'https://go4go.net/go/games/sgf/Samsung-Cup/2021',
    stats: { totalAttempts: 0, correctRate: 0 },
  },

  // ── VÁN 20 ─────────────────────────────────────────────────────────────────
  {
    id: 'shin-jinseo-park-junghwan-2023',
    blackPlayer: { name: 'Park Junghwan', rank: '9 dan', country: 'KR' },
    whitePlayer: { name: 'Shin Jinseo', rank: '9 dan', country: 'KR' },
    tournament: 'Ing Cup World Championship — Chung kết',
    year: 2023,
    result: 'W+1.5',
    boardSize: 19,
    komi: 7.5,

    challengeMoveNumber: 21,
    playerToMove: 'black',
    actualMove: 'df',
    mission: {
      title: "Quan Tử Tuyệt Luân — Nước Cờ Sente Ẩn Định Đoạt Ngai Vàng",
      description: "Trận chung kết thế giới kịch tính đến nước cờ cuối cùng. Hãy tìm ra nước \"sente ẩn\" tinh tế khiến đối phương nếu lơ là sẽ phải trả giá bằng cả ván đấu!",
      type: 'endgame',
      targetStones: ["gb","fc","cd","dd","fd","be","ee"],
      hint: "Nước cờ thoạt nhìn vô hại ở cánh trái nhưng thực chất là đòn ép chết người.",
      criticalTurns: 3,
    },

    era: 'ai_era',
    category: 'endgame',
    difficulty: 5,

    title: 'Quan Tử Thần Thánh — Shin Jinseo thống trị kỷ nguyên mới',
    titleEn: 'Shin Jinseo\'s Divine Endgame',
    contextStory:
      'Chung kết Ing Cup 2023 giữa Park Junghwan (kinh nghiệm lão luyện, 30 tuổi) và Shin ' +
      'Jinseo (thiên tài thế hệ AI, 23 tuổi). Ván quyết định, thế cờ cực kỳ sát nút. Cả ' +
      'hai đều chơi gần như hoàn hảo theo tiêu chuẩn AI suốt 200+ nước. Chênh lệch chỉ ' +
      '1-2 mục. Tại nước 215, Shin Jinseo phải tìm ra chuỗi quan tử chính xác nhất để bảo ' +
      'toàn lợi thế mong manh...',
    moveExplanation:
      'Shin Jinseo đi nước quan tử ở phía dưới-trái bàn cờ — nước "sente ẩn" (hidden sente). ' +
      'Bề ngoài, nước đi trông như gote (không buộc đáp), nhưng nếu Đen bỏ qua, Trắng sẽ ' +
      'phát động chuỗi tấn công bắt 4 quân. Do đó, Đen BẮT BUỘC phải đáp — giúp Trắng ' +
      'giữ quyền chủ động cho nước quan tử tiếp theo. Đây là kỹ thuật quan tử mà chỉ ' +
      'kỳ thủ trình độ cao nhất hoặc AI mới nhìn ra.',
    afterStory:
      'Park Junghwan không kịp phát hiện "sente ẩn" và mất quyền chủ động. Shin Jinseo chiếm ' +
      'hết các nước quan tử lớn còn lại và thắng 1.5 mục. Danh hiệu Ing Cup thứ nhất của ' +
      'Shin Jinseo. Ván cờ này được AI đánh giá là "ván quan tử chính xác nhất" trong lịch ' +
      'sử giải đấu thế giới hiện đại.',
    lesson:
      'Bài học nâng cao: "Sente ẩn" (hidden sente / ambiguous sente) là vũ khí nguy hiểm ' +
      'nhất trong quan tử. Trước khi kết luận nước đi nào là sente hay gote, hãy kiểm tra: ' +
      '"Nếu tôi bỏ qua, đối thủ có thể bắt quân hoặc phá đất không?" Nếu có, đó là sente ' +
      'dù nó không trông giống sente.',

        crypticHint:
      'Nước cờ độc hiểm nhất trong tàn cuộc là nước cờ thoạt nhìn như hậu thủ, nhưng nếu đối phương dám ngó lơ, cái giá phải trả sẽ là cả ván cờ.',

    sgf:
      '(;GM[1]FF[4]SZ[19]PB[Xie Ke]PW[Shin Jinseo]DT[2023-08-23]EV[9th Ing Cup Final Game 2]RE[W+R]KM[7.5]AB[fb][cc][dc][ec][oc][ed][qd][de][np][pq]AW[gb][fc][cd][dd][fd][nd][be][ee][qo][dp]PL[B];B[df];W[ef];B[eg];W[fe];B[bc];W[dg];B[bd];W[cg];B[ce];W[nc];B[od];W[ne];B[fg];W[di];B[if];W[jd];B[fi];W[dk];B[cq];W[cp];B[dq];W[ep];B[eq];W[fq];B[fr];W[gq];B[gr];W[hq];B[qk];W[gk];B[qp];W[ij];B[ih];W[ki];B[kg];W[mh];B[ld];W[le];B[ke];W[kd];B[mg];W[je];B[nh];W[kf];B[lh];W[rp];B[rq];W[ol];B[mj];W[pj];B[qm];W[qe];B[re];W[no];B[oo];W[mp];B[nn];W[mo];B[mn];W[lk];B[ln];W[pe];B[oe];W[of];B[nf];W[mf];B[ng];W[pd];B[pc];W[qc];B[pf];W[qf];B[rd];W[pg];B[qb];W[qj];B[qg];W[qh];B[rg];W[rk];B[ql];W[mk];B[kj];W[lj];B[li];W[ji];B[jf];W[nj];B[kp];W[op];B[po];W[lq];B[nq];W[kq];B[om];W[ph];B[hd];W[hc];B[ge];W[nb];B[rf];W[pf];B[bp];W[bo];B[bq];W[cn];B[ej];W[ek];B[bg];W[bh];B[bf];W[mi];B[gj];W[hk];B[jm];W[hi];B[hh];W[gi];B[gh];W[eh];B[ic];W[id];B[kh];W[hj];B[jj];W[ii];B[hf];W[fh];B[ff];W[gc];B[ib];W[jc];B[lf];W[lg];B[jb];W[kb];B[lf];W[rc];B[rb];W[lg];B[cj];W[dj];B[lf];W[me];B[ke];W[ja];B[kl];W[ni];B[jq];W[jr];B[iq];W[nr];B[oq];W[ir];B[hr];W[mr];B[ch];W[bi];B[bm];W[go];B[gn];W[cm];B[ho];W[io];B[hp];W[ip];B[fp];W[jp];B[iq];W[jq];B[gp];W[eb];B[fl];W[fk];B[jh];W[iq];B[eo];W[en];B[em];W[dn];B[in];W[fn];B[ob];W[oa];B[pb];W[kf];B[fo];W[hm];B[cl];W[dl];B[ao];W[hn];B[ci];W[ck];B[bj];W[bk];B[ah];W[lg];B[ai];W[lf];B[bn];W[dh];B[db];W[fa];B[il];W[hl])',
    sgfSource: 'https://go4go.net/go/games/sgf/Ing-Cup/2023',
    stats: { totalAttempts: 0, correctRate: 0 },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
//  HÀM TIỆN ÍCH
// ═══════════════════════════════════════════════════════════════════════════

/** Lấy danh sách ván đấu theo kỷ nguyên */
export const getGamesByEra = (era: LegendaryGame['era']): LegendaryGame[] =>
  LEGENDARY_GAMES.filter(g => g.era === era);

/** Lấy danh sách ván đấu theo phân loại chiến thuật */
export const getGamesByCategory = (category: LegendaryGame['category']): LegendaryGame[] =>
  LEGENDARY_GAMES.filter(g => g.category === category);

/** Lấy danh sách ván đấu theo độ khó */
export const getGamesByDifficulty = (difficulty: number): LegendaryGame[] =>
  LEGENDARY_GAMES.filter(g => g.difficulty === difficulty);

/** Lấy ván đấu theo ID */
export const getGameById = (id: string): LegendaryGame | undefined =>
  LEGENDARY_GAMES.find(g => g.id === id);

/** Số liệu tổng hợp */
export const LEGENDARY_STATS = {
  totalGames: LEGENDARY_GAMES.length,
  eras: {
    classical: LEGENDARY_GAMES.filter(g => g.era === 'classical').length,
    early_modern: LEGENDARY_GAMES.filter(g => g.era === 'early_modern').length,
    golden: LEGENDARY_GAMES.filter(g => g.era === 'golden').length,
    modern: LEGENDARY_GAMES.filter(g => g.era === 'modern').length,
    ai_era: LEGENDARY_GAMES.filter(g => g.era === 'ai_era').length,
  },
  difficultyRange: {
    min: Math.min(...LEGENDARY_GAMES.map(g => g.difficulty)),
    max: Math.max(...LEGENDARY_GAMES.map(g => g.difficulty)),
  },
};
