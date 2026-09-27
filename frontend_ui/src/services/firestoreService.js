// src/services/firestoreService.js
import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit,
  documentId,
  runTransaction,
  serverTimestamp,
  increment,
  onSnapshot,
} from "firebase/firestore";

const EMPTY_BOARD = (size) =>
  Array.from({ length: size }, () => Array(size).fill("empty"));

function toPlayerInfo(user) {
  return {
    uid: user.uid,
    displayName: user.displayName ?? "Người chơi ẩn danh",
    photoURL: user.photoURL ?? null, // BẮT BUỘC lưu để GameRoom hiển thị avatar đối thủ
    elo: user.elo ?? 1000,
  };
}

// ============================================================================
// ROOMS
// ============================================================================
export async function createRoom(hostUser, boardSize = 19) {
  const host = toPlayerInfo(hostUser);
  const roomRef = await addDoc(collection(db, "rooms"), {
    hostUid: host.uid,
    hostDisplayName: host.displayName,
    hostPhotoURL: host.photoURL,
    hostElo: host.elo,
    mode: "pvp",
    boardSize,
    status: "waiting",
    guestUid: null,
    matchId: null,
    createdAt: serverTimestamp(),
  });
  return roomRef.id;
}

export function listenOpenRooms(boardSize, onChange) {
  const q = query(
    collection(db, "rooms"),
    where("status", "==", "waiting"),
    where("boardSize", "==", boardSize)
  );
  return onSnapshot(q, (snap) => {
    onChange(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export function listenRoom(roomId, onChange) {
  return onSnapshot(doc(db, "rooms", roomId), (snap) => {
    onChange(snap.exists() ? { id: snap.id, ...snap.data() } : null);
  });
}

/** Chủ phòng huỷ phòng khi chưa có ai vào (khác leaveMatch — phòng chưa có match). */
export async function cancelRoom(roomId) {
  const roomRef = doc(db, "rooms", roomId);
  const snap = await getDoc(roomRef);
  if (snap.exists() && snap.data().status === "waiting") {
    await deleteDoc(roomRef);
  }
}

export async function joinRoom(roomId, guestUser) {
  const guest = toPlayerInfo(guestUser);
  const roomRef = doc(db, "rooms", roomId);

  const matchId = await runTransaction(db, async (tx) => {
    const roomSnap = await tx.get(roomRef);
    if (!roomSnap.exists()) throw new Error("Phòng không tồn tại.");
    const room = roomSnap.data();
    if (room.status !== "waiting") throw new Error("Phòng đã có người hoặc đã huỷ.");
    if (room.hostUid === guest.uid) throw new Error("Bạn không thể tự vào phòng của chính mình.");

    const matchRef = doc(collection(db, "matches"));
    const hostIsBlack = Math.random() < 0.5;
    const host = {
      uid: room.hostUid,
      displayName: room.hostDisplayName,
      photoURL: room.hostPhotoURL ?? null,
      elo: room.hostElo,
    };

    tx.set(matchRef, {
      mode: "pvp",
      status: "ongoing",
      boardSize: room.boardSize,
      komi: 7.5,
      players: {
        black: hostIsBlack ? host : guest,
        white: hostIsBlack ? guest : host,
      },
      board: EMPTY_BOARD(room.boardSize),
      currentPlayer: "black",
      capturedBlack: 0,
      capturedWhite: 0,
      consecutivePasses: 0,
      nextMoveIndex: 1,
      lastMove: null,
      aiThinking: false,
      winner: null,
      winMargin: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    tx.update(roomRef, { status: "matched", guestUid: guest.uid, matchId: matchRef.id });
    return matchRef.id;
  });

  return matchId;
}

// ============================================================================
// PvE
// ============================================================================
export async function createPveMatch(user, boardSize = 19) {
  const player = toPlayerInfo(user);
  const matchRef = await addDoc(collection(db, "matches"), {
    mode: "pve",
    status: "ongoing",
    boardSize,
    komi: 7.5,
    players: {
      black: player,
      white: { uid: "AI_ENGINE", displayName: "AI Engine", photoURL: null, elo: null },
    },
    board: EMPTY_BOARD(boardSize),
    currentPlayer: "black",
    capturedBlack: 0,
    capturedWhite: 0,
    consecutivePasses: 0,
    nextMoveIndex: 1,
    lastMove: null,
    aiThinking: false,
    winner: null,
    winMargin: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return matchRef.id;
}

// ============================================================================
// SUBMIT MOVE — lưu thêm capturedPositions vào move log để phía nghe
// onSnapshot(subcollection) tự dựng hiệu ứng, y như moveHistory ở local.
// ============================================================================
export async function submitMove(matchId, computedResult) {
  const {
    board,
    currentPlayer,
    capturedBlack,
    capturedWhite,
    consecutivePasses,
    moveColor,
    position,
    capturedCount = 0,
    capturedPositions = [],
    isCapture = false,
    mistakeTag = null,
    winner = null,
    winMargin = null,
    status = "ongoing",
  } = computedResult;

  const matchRef = doc(db, "matches", matchId);

  await runTransaction(db, async (tx) => {
    const matchSnap = await tx.get(matchRef);
    if (!matchSnap.exists()) throw new Error("Ván đấu không tồn tại.");
    const match = matchSnap.data();

    const moveIndex = match.nextMoveIndex ?? 1;
    const moveRef = doc(collection(db, "matches", matchId, "moves"), String(moveIndex));

    tx.set(moveRef, {
      index: moveIndex,
      color: moveColor,
      position,
      capturedCount,
      capturedPositions,
      isCapture,
      mistakeTag,
      createdAt: serverTimestamp(),
    });

    tx.update(matchRef, {
      board,
      currentPlayer,
      capturedBlack,
      capturedWhite,
      consecutivePasses,
      lastMove: position ? { x: position.x, y: position.y, color: moveColor } : null,
      nextMoveIndex: increment(1),
      aiThinking: false,
      winner,
      winMargin,
      status,
      updatedAt: serverTimestamp(),
    });
  });
}

export async function setAiThinking(matchId, isThinking) {
  await updateDoc(doc(db, "matches", matchId), { aiThinking: isThinking });
}

/** Xin thua — người xin thua thua ngay lập tức, không cần tính điểm lãnh thổ. */
export async function resignMatch(matchId, resigningColor) {
  const winnerColor = resigningColor === "black" ? "white" : "black";
  await updateDoc(doc(db, "matches", matchId), {
    status: "finished",
    winner: winnerColor,
    winMargin: null,
    updatedAt: serverTimestamp(),
  });
}

export async function getMatch(matchId) {
  const snap = await getDoc(doc(db, "matches", matchId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// ============================================================================
// BƯỚC 1 — USERS: tạo/đọc profile, đổi username
// ============================================================================
function deriveUsernameFromEmail(email) {
  return email.split("@")[0].replace(/[^a-zA-Z0-9_.]/g, "");
}

export async function ensureUserProfile(firebaseUser) {
  const userRef = doc(db, "users", firebaseUser.uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) return snap.data();

  const defaultUsername = firebaseUser.email
    ? deriveUsernameFromEmail(firebaseUser.email)
    : `player_${firebaseUser.uid.slice(0, 6)}`;

  const profile = {
    uid: firebaseUser.uid,
    username: defaultUsername,
    usernameLower: defaultUsername.toLowerCase(),
    email: firebaseUser.email ?? "",
    photoURL: firebaseUser.photoURL ?? null,
    elo: 1000,
    friendsList: [],
    createdAt: serverTimestamp(),
  };
  await setDoc(userRef, profile);
  return profile;
}

export function listenUserProfile(uid, onChange) {
  return onSnapshot(doc(db, "users", uid), (snap) => {
    onChange(snap.exists() ? snap.data() : null);
  });
}

export async function updateUsername(uid, newUsername) {
  const trimmed = newUsername.trim();
  if (trimmed.length < 3) throw new Error("Username phải có ít nhất 3 ký tự.");

  const lower = trimmed.toLowerCase();
  const q = query(collection(db, "users"), where("usernameLower", "==", lower), limit(1));
  const existing = await getDocs(q);
  if (!existing.empty && existing.docs[0].id !== uid) {
    throw new Error("Username này đã có người dùng, hãy chọn tên khác.");
  }

  await updateDoc(doc(db, "users", uid), { username: trimmed, usernameLower: lower });
}

// ============================================================================
// BƯỚC 2 — TÌM BẠN & LỜI MỜI KẾT BẠN
// ============================================================================
export async function searchUsers(rawQuery, excludeUid) {
  const q = rawQuery.trim();
  if (!q) return [];
  const lower = q.toLowerCase();

  const [byUsername, byEmail] = await Promise.all([
    getDocs(query(collection(db, "users"), where("usernameLower", "==", lower), limit(5))),
    getDocs(query(collection(db, "users"), where("email", "==", q), limit(5))),
  ]);

  const results = new Map();
  [...byUsername.docs, ...byEmail.docs].forEach((d) => {
    if (d.id !== excludeUid) results.set(d.id, d.data());
  });
  return Array.from(results.values());
}

export async function sendFriendRequest(fromUser, toUid) {
  if (fromUser.uid === toUid) throw new Error("Không thể tự kết bạn với chính mình.");

  const dupQ = query(
    collection(db, "friendRequests"),
    where("fromUid", "==", fromUser.uid),
    where("toUid", "==", toUid),
    where("status", "==", "pending")
  );
  const dup = await getDocs(dupQ);
  if (!dup.empty) throw new Error("Bạn đã gửi lời mời tới người này rồi.");

  await addDoc(collection(db, "friendRequests"), {
    fromUid: fromUser.uid,
    fromUsername: fromUser.username,
    fromPhotoURL: fromUser.photoURL ?? null,
    toUid,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}

export function listenIncomingFriendRequests(uid, onChange) {
  const q = query(
    collection(db, "friendRequests"),
    where("toUid", "==", uid),
    where("status", "==", "pending")
  );
  return onSnapshot(q, (snap) => {
    onChange(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function acceptFriendRequest(request) {
  const reqRef = doc(db, "friendRequests", request.id);
  await runTransaction(db, async (tx) => {
    const reqSnap = await tx.get(reqRef);
    if (!reqSnap.exists() || reqSnap.data().status !== "pending") {
      throw new Error("Lời mời không còn hiệu lực.");
    }
    const fromRef = doc(db, "users", request.fromUid);
    const toRef = doc(db, "users", request.toUid);
    const [fromSnap, toSnap] = await Promise.all([tx.get(fromRef), tx.get(toRef)]);

    const fromFriends = fromSnap.data()?.friendsList ?? [];
    const toFriends = toSnap.data()?.friendsList ?? [];

    if (!fromFriends.includes(request.toUid)) {
      tx.update(fromRef, { friendsList: [...fromFriends, request.toUid] });
    }
    if (!toFriends.includes(request.fromUid)) {
      tx.update(toRef, { friendsList: [...toFriends, request.fromUid] });
    }
    tx.update(reqRef, { status: "accepted" });
  });
}

export async function declineFriendRequest(requestId) {
  await updateDoc(doc(db, "friendRequests", requestId), { status: "declined" });
}

export function listenFriendsProfiles(friendUids, onChange) {
  if (!friendUids || friendUids.length === 0) {
    onChange([]);
    return () => {};
  }
  const q = query(collection(db, "users"), where(documentId(), "in", friendUids.slice(0, 30)));
  return onSnapshot(q, (snap) => {
    onChange(snap.docs.map((d) => d.data()));
  });
}

// ============================================================================
// BƯỚC 3 — GHÉP NGẪU NHIÊN (Quick Match) — tái dùng collection "rooms" sẵn có
// ============================================================================
export async function startQuickMatch(user, boardSize = 19) {
  const q = query(
    collection(db, "rooms"),
    where("status", "==", "waiting"),
    where("boardSize", "==", boardSize),
    where("isQuickMatch", "==", true),
    limit(5)
  );
  const snap = await getDocs(q);
  const candidate = snap.docs.find((d) => d.data().hostUid !== user.uid);

  if (candidate) {
    const matchId = await joinRoom(candidate.id, user);
    return { matchId, roomId: null };
  }

  const host = toPlayerInfo(user);
  const roomRef = await addDoc(collection(db, "rooms"), {
    hostUid: host.uid,
    hostDisplayName: host.displayName,
    hostPhotoURL: host.photoURL,
    hostElo: host.elo,
    mode: "pvp",
    boardSize,
    status: "waiting",
    guestUid: null,
    matchId: null,
    isQuickMatch: true,
    createdAt: serverTimestamp(),
  });
  return { matchId: null, roomId: roomRef.id };
}

// ============================================================================
// MỜI ĐẤU TRỰC TIẾP (dùng cho nút "Thách đấu" ở FriendsTab / "Chơi với bạn bè")
// ============================================================================
export async function sendMatchInvite(fromUser, toUid, boardSize = 19) {
  await addDoc(collection(db, "matchInvites"), {
    fromUid: fromUser.uid,
    fromUsername: fromUser.username,
    fromPhotoURL: fromUser.photoURL ?? null,
    toUid,
    boardSize,
    status: "pending",
    matchId: null,
    createdAt: serverTimestamp(),
  });
}

export function listenIncomingMatchInvites(uid, onChange) {
  const q = query(
    collection(db, "matchInvites"),
    where("toUid", "==", uid),
    where("status", "==", "pending")
  );
  return onSnapshot(q, (snap) => {
    onChange(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function acceptMatchInvite(invite, acceptingUser) {
  const inviteRef = doc(db, "matchInvites", invite.id);
  const matchId = await runTransaction(db, async (tx) => {
    const inviteSnap = await tx.get(inviteRef);
    if (!inviteSnap.exists() || inviteSnap.data().status !== "pending") {
      throw new Error("Lời mời không còn hiệu lực.");
    }
    const matchRef = doc(collection(db, "matches"));
    const hostIsBlack = Math.random() < 0.5;
    const inviter = {
      uid: invite.fromUid,
      displayName: invite.fromUsername,
      photoURL: invite.fromPhotoURL ?? null,
      elo: 1000,
    };
    const guest = toPlayerInfo(acceptingUser);

    tx.set(matchRef, {
      mode: "pvp",
      status: "ongoing",
      boardSize: invite.boardSize,
      komi: 7.5,
      players: { black: hostIsBlack ? inviter : guest, white: hostIsBlack ? guest : inviter },
      board: EMPTY_BOARD(invite.boardSize),
      currentPlayer: "black",
      capturedBlack: 0,
      capturedWhite: 0,
      consecutivePasses: 0,
      nextMoveIndex: 1,
      lastMove: null,
      aiThinking: false,
      winner: null,
      winMargin: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    tx.update(inviteRef, { status: "accepted", matchId: matchRef.id });
    return matchRef.id;
  });
  return matchId;
}

export async function declineMatchInvite(inviteId) {
  await updateDoc(doc(db, "matchInvites", inviteId), { status: "declined" });
}