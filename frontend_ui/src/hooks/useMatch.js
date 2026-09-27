// src/hooks/useMatch.js
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { db } from "../firebase";
import { doc, onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { submitMove, setAiThinking, resignMatch } from "../services/firestoreService";
import { computeNextBoard } from "../utils/goRules";

const AI_API_URL = "http://localhost:8000/api/v1/get_move";

function boardToNumeric(board) {
  return board.map((row) =>
    row.map((cell) => (cell === "black" ? 1 : cell === "white" ? -1 : 0))
  );
}

export function useMatch(matchId, myUid) {
  const [match, setMatch] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moveError, setMoveError] = useState(null);
  const [floatingScores, setFloatingScores] = useState([]);
  const aiRequestInFlight = useRef(false);
  const prevMoveCount = useRef(0);
  const effectIdRef = useRef(0);

  // --- Lắng nghe trạng thái sống của ván đấu ---
  useEffect(() => {
    if (!matchId) return;
    const unsub = onSnapshot(doc(db, "matches", matchId), (snap) => {
      setMatch(snap.exists() ? { id: snap.id, ...snap.data() } : null);
      setLoading(false);
    });
    return unsub;
  }, [matchId]);

  // --- Lắng nghe log lịch sử nước đi (subcollection, sắp theo index) ---
  // Chuẩn hoá mistakeTag: Firestore có thể trả `undefined` cho các nước đi
  // cũ chưa từng ghi field này -> ép về `null` để khớp type MoveLogEntry
  // (mistakeTag: MistakeTag | null, KHÔNG chấp nhận undefined).
  useEffect(() => {
    if (!matchId) return;
    const q = query(collection(db, "matches", matchId, "moves"), orderBy("index"));
    const unsub = onSnapshot(q, (snap) => {
      setMoveHistory(
        snap.docs.map((d) => {
          const data = d.data();
          return { ...data, mistakeTag: data.mistakeTag ?? null };
        })
      );
    });
    return unsub;
  }, [matchId]);

  // --- Phát hiện nước đi MỚI (từ chính mình hoặc đối thủ) để dựng hiệu ứng
  // "+N điểm" — giống hệt cơ chế đang chạy ở App.tsx/LocalGameRoom.tsx, chỉ
  // khác nguồn dữ liệu là Firestore thay vì state cục bộ. ---
  useEffect(() => {
    if (moveHistory.length <= prevMoveCount.current) {
      prevMoveCount.current = moveHistory.length;
      return;
    }
    const last = moveHistory[moveHistory.length - 1];
    if (last.isCapture && last.capturedCount > 0) {
      const positions = last.capturedPositions?.length ? last.capturedPositions : [last.position];
      if (positions?.length > 0) {
        const cx = positions.reduce((sum, p) => sum + p.x, 0) / positions.length;
        const cy = positions.reduce((sum, p) => sum + p.y, 0) / positions.length;
        const id = effectIdRef.current++;
        setFloatingScores((prev) => [...prev, { id, x: cx, y: cy, value: last.capturedCount, color: last.color }]);
        setTimeout(() => {
          setFloatingScores((prev) => prev.filter((f) => f.id !== id));
        }, 1100);
      }
    }
    prevMoveCount.current = moveHistory.length;
  }, [moveHistory]);

  const myColor = useMemo(() => {
    if (!match) return null;
    if (match.players.black?.uid === myUid) return "black";
    if (match.players.white?.uid === myUid) return "white";
    return null;
  }, [match, myUid]);

  const opponentColor = myColor === "black" ? "white" : myColor === "white" ? "black" : null;
  const opponent = match && opponentColor ? match.players[opponentColor] : null;

  const isMyTurn = Boolean(match) && myColor === match?.currentPlayer && match?.status === "ongoing";

  // --- PvE: tự động gọi Backend AI khi tới lượt "AI_ENGINE" ---
  useEffect(() => {
    if (!match || match.mode !== "pve") return;
    if (match.status !== "ongoing") return;
    if (match.players.white?.uid !== "AI_ENGINE") return;
    if (match.currentPlayer !== "white") return;
    if (match.aiThinking || aiRequestInFlight.current) return;

    const runAiTurn = async () => {
      aiRequestInFlight.current = true;
      await setAiThinking(matchId, true);
      try {
        const res = await fetch(AI_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            board: boardToNumeric(match.board),
            current_player: -1,
            consecutive_passes: match.consecutivePasses,
          }),
        });
        if (!res.ok) throw new Error(`Lỗi kết nối Backend: ${res.status}`);
        const data = await res.json();

        const position = data.action === "move" ? { x: data.col, y: data.row } : null;
        const { board: nextBoard, capturedCount, capturedPositions, isCapture } = computeNextBoard(
          match.board,
          position,
          "white"
        );

        await submitMove(matchId, {
          board: nextBoard,
          currentPlayer: "black",
          capturedBlack: match.capturedBlack + capturedCount,
          capturedWhite: match.capturedWhite,
          consecutivePasses: position ? 0 : match.consecutivePasses + 1,
          moveColor: "white",
          position,
          capturedCount,
          capturedPositions,
          isCapture,
        });
      } catch (err) {
        console.error("Lỗi khi AI tính nước đi:", err);
        await setAiThinking(matchId, false);
      } finally {
        aiRequestInFlight.current = false;
      }
    };

    runAiTurn();
  }, [match, matchId]);

  const playMove = useCallback(
    async (position) => {
      if (!isMyTurn || !match) return;
      setMoveError(null);

      let result;
      try {
        result = computeNextBoard(match.board, position, myColor);
      } catch (err) {
        setMoveError(err.message);
        return;
      }

      const { board: nextBoard, capturedCount, capturedPositions, isCapture } = result;
      const nextPlayer = myColor === "black" ? "white" : "black";

      try {
        await submitMove(matchId, {
          board: nextBoard,
          currentPlayer: nextPlayer,
          capturedBlack: match.capturedBlack + (myColor === "black" ? capturedCount : 0),
          capturedWhite: match.capturedWhite + (myColor === "white" ? capturedCount : 0),
          consecutivePasses: position ? 0 : match.consecutivePasses + 1,
          moveColor: myColor,
          position,
          capturedCount,
          capturedPositions,
          isCapture,
        });
      } catch (err) {
        setMoveError(err.message);
      }
    },
    [match, matchId, myColor, isMyTurn]
  );

  const resign = useCallback(async () => {
    if (!myColor || !match || match.status === "finished") return;
    await resignMatch(matchId, myColor);
  }, [matchId, myColor, match]);

  return {
    match,
    moveHistory,
    loading,
    myColor,
    opponent,
    isMyTurn,
    playMove,
    resign,
    moveError,
    floatingScores,
  };
}