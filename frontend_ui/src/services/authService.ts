// src/services/authService.ts
// Toàn bộ logic Đăng ký / Đăng nhập Email-Password + đồng bộ hồ sơ Firestore.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  deleteUser,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  type User,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import type { UserProfile } from "../types/user";

export const USERNAME_REGEX = /^[a-zA-Z0-9_.]{3,20}$/;

/** Lỗi nghiệp vụ đã có sẵn thông báo tiếng Việt — hiển thị thẳng lên UI. */
export class AuthServiceError extends Error {}

// Cờ báo "đang đăng ký": AuthContext dùng để KHÔNG tự tạo hồ sơ mặc định khi
// onAuthStateChanged bắn ra (nếu không sẽ đè mất username người dùng nhập).
let registrationInProgress = false;
export const isRegistrationInProgress = (): boolean => registrationInProgress;

// ============================================================================
// Dịch lỗi Firebase -> tiếng Việt
// ============================================================================
export function translateAuthError(err: unknown): string {
  if (err instanceof AuthServiceError) return err.message;

  const code = (err as { code?: string } | null)?.code;
  switch (code) {
    case "auth/email-already-in-use":
      return "Email này đã được đăng ký. Hãy đăng nhập hoặc dùng email khác.";
    case "auth/invalid-email":
      return "Email không hợp lệ.";
    case "auth/weak-password":
      return "Mật khẩu quá yếu, cần tối thiểu 6 ký tự.";
    case "auth/user-not-found":
      return "Tài khoản không tồn tại.";
    case "auth/wrong-password":
      return "Sai mật khẩu.";
    case "auth/invalid-credential":
    case "auth/invalid-login-credentials":
      // Firebase mới gộp "sai mật khẩu" và "không có tài khoản" vào 1 mã để chống dò email
      return "Email hoặc mật khẩu không chính xác, hoặc tài khoản chưa tồn tại.";
    case "auth/user-disabled":
      return "Tài khoản này đã bị vô hiệu hóa.";
    case "auth/too-many-requests":
      return "Bạn thử quá nhiều lần. Vui lòng đợi một lúc rồi thử lại.";
    case "auth/network-request-failed":
      return "Lỗi kết nối mạng. Vui lòng kiểm tra Internet.";
    case "auth/operation-not-allowed":
      return "Đăng nhập bằng Email/Mật khẩu chưa được bật trong Firebase Console.";
    case "auth/popup-closed-by-user":
      return "Bạn đã đóng cửa sổ đăng nhập Google.";
    case "auth/popup-blocked":
      return "Trình duyệt đã chặn cửa sổ đăng nhập. Hãy cho phép popup rồi thử lại.";
    case "permission-denied":
      return "Không có quyền ghi dữ liệu. Hãy kiểm tra Firestore Security Rules.";
    default:
      return "Đã có lỗi xảy ra. Vui lòng thử lại.";
  }
}

// ============================================================================
// Helper Firestore
// ============================================================================
async function isUsernameTaken(usernameLower: string, excludeUid: string): Promise<boolean> {
  const snap = await getDocs(
    query(collection(db, "users"), where("usernameLower", "==", usernameLower), limit(2))
  );
  return snap.docs.some((d) => d.id !== excludeUid);
}

/** Sinh username mặc định không trùng (thêm hậu tố số nếu cần). */
async function generateUniqueUsername(base: string, uid: string): Promise<string> {
  const clean = base.replace(/[^a-zA-Z0-9_.]/g, "").slice(0, 16) || "player";
  let candidate = clean.length >= 3 ? clean : `${clean}${uid.slice(0, 3)}`;

  for (let i = 0; i < 5; i++) {
    if (!(await isUsernameTaken(candidate.toLowerCase(), uid))) return candidate;
    candidate = `${clean}${Math.floor(1000 + Math.random() * 9000)}`;
  }
  return `${clean.slice(0, 12)}_${uid.slice(0, 6)}`;
}

type BasicUser = Pick<User, "uid" | "email" | "photoURL">;

/** Cấu trúc document users/{uid} — schema mới + các field code hiện có đang đọc. */
function buildNewUserDoc(user: BasicUser, username: string) {
  return {
    user_id: user.uid,
    uid: user.uid, // giữ tương thích: friends, matchmaking, sendFriendRequest...
    username,
    usernameLower: username.toLowerCase(),
    email: user.email ?? "",
    photoURL: user.photoURL ?? null,
    elo: 1000,
    wins: 0,
    losses: 0,
    draws: 0,
    role: "PLAYER",
    status: "ACTIVE",
    friendsList: [] as string[],
    created_at: serverTimestamp(),
  };
}

/**
 * Đảm bảo users/{uid} tồn tại (dùng cho Google + tài khoản cũ chưa có hồ sơ).
 * - Chưa có: tạo mới, username mặc định = phần trước "@" của email (không trùng).
 * - Đã có: bổ sung các field schema mới còn thiếu (không đụng username đã đặt).
 */
export async function ensureUserDocument(user: BasicUser): Promise<UserProfile> {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const existing = snap.data();
    const patch: Record<string, unknown> = {};
    if (existing.user_id === undefined) patch.user_id = user.uid;
    if (existing.wins === undefined) patch.wins = 0;
    if (existing.losses === undefined) patch.losses = 0;
    if (existing.draws === undefined) patch.draws = 0;
    if (existing.role === undefined) patch.role = "PLAYER";
    if (existing.status === undefined) patch.status = "ACTIVE";
    if (existing.created_at === undefined) patch.created_at = existing.createdAt ?? serverTimestamp();
    if (existing.usernameLower === undefined && typeof existing.username === "string") {
      patch.usernameLower = existing.username.toLowerCase();
    }

    if (Object.keys(patch).length > 0) {
      try {
        await setDoc(ref, patch, { merge: true });
      } catch (err) {
        // Không chặn đăng nhập nếu không nâng cấp được hồ sơ cũ (ví dụ do Security Rules)
        console.warn("Không thể nâng cấp hồ sơ cũ lên schema mới:", err);
      }
    }
    return { ...existing, ...patch } as UserProfile;
  }

  const base = user.email ? user.email.split("@")[0] : "player";
  const username = await generateUniqueUsername(base, user.uid);
  const data = buildNewUserDoc(user, username);
  await setDoc(ref, data);
  return data as unknown as UserProfile;
}

// ============================================================================
// ĐĂNG KÝ
// ============================================================================
export async function registerWithEmail(
  email: string,
  password: string,
  username: string
): Promise<UserProfile> {
  const cleanUsername = username.trim();
  if (!USERNAME_REGEX.test(cleanUsername)) {
    throw new AuthServiceError(
      "Username gồm 3–20 ký tự: chữ cái không dấu, số, dấu gạch dưới (_) hoặc dấu chấm (.)."
    );
  }

  registrationInProgress = true;
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);

    try {
      // Kiểm tra trùng username SAU khi đã có phiên đăng nhập (Rules yêu cầu isSignedIn để đọc users)
      if (await isUsernameTaken(cleanUsername.toLowerCase(), cred.user.uid)) {
        throw new AuthServiceError("Username này đã có người sử dụng, hãy chọn tên khác.");
      }

      await updateProfile(cred.user, { displayName: cleanUsername });

      const data = buildNewUserDoc(cred.user, cleanUsername);
      await setDoc(doc(db, "users", cred.user.uid), data);
      return data as unknown as UserProfile;
    } catch (err) {
      // Rollback: xóa tài khoản Auth vừa tạo để không còn tài khoản "mồ côi" (có Auth, không có hồ sơ)
      await deleteUser(cred.user).catch(() => undefined);
      throw err;
    }
  } finally {
    registrationInProgress = false;
  }
}

// ============================================================================
// ĐĂNG NHẬP
// ============================================================================
export async function loginWithEmail(
  email: string,
  password: string,
  remember = true
): Promise<UserProfile> {
  await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
  const cred = await signInWithEmailAndPassword(auth, email.trim(), password);

  let profile: UserProfile;
  try {
    // Truy vấn users/{uid} để đồng bộ hồ sơ chi tiết (tạo bù nếu tài khoản cũ chưa có)
    profile = await ensureUserDocument(cred.user);
  } catch (err) {
    await signOut(auth).catch(() => undefined);
    throw err;
  }

  if (profile.status === "LOCKED") {
    await signOut(auth);
    throw new AuthServiceError("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.");
  }

  return profile;
}