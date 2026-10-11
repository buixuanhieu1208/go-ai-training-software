// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "../firebase";
import { listenUserProfile } from "../services/firestoreService";
import * as authService from "../services/authService";
import type { UserProfile } from "../types/user";

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null; // hồ sơ Firestore (username, elo, role, friendsList...)
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  registerWithEmail: (email: string, password: string, username: string) => Promise<void>;
  loginWithEmail: (email: string, password: string, remember?: boolean) => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      // Đang đăng ký Email/Password: hồ sơ do registerWithEmail tự tạo (với username
      // người dùng nhập) — bỏ qua để không tạo trước hồ sơ mặc định đè lên.
      if (!authService.isRegistrationInProgress()) {
        try {
          const ensured = await authService.ensureUserDocument(firebaseUser);
          if (ensured.status === "LOCKED") {
            await signOut(auth); // tài khoản bị khóa: chặn cả khi khôi phục phiên / đăng nhập Google
          }
        } catch (err) {
          console.error("Không đồng bộ được hồ sơ người dùng:", err);
        }
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  // Lắng nghe realtime hồ sơ Firestore của user hiện tại (đổi username sẽ tự cập nhật khắp nơi)
  useEffect(() => {
    if (!user) return;
    const unsub = listenUserProfile(user.uid, (p) => setProfile(p as UserProfile | null));
    return unsub;
  }, [user]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Lỗi đăng nhập Google:", err);
      throw err;
    }
  };

  const registerWithEmail = async (email: string, password: string, username: string) => {
    const created = await authService.registerWithEmail(email, password, username);
    setProfile(created); // cập nhật State ngay; listener realtime sẽ ghi đè bằng dữ liệu thật
  };

  const loginWithEmail = async (email: string, password: string, remember = true) => {
    const synced = await authService.loginWithEmail(email, password, remember);
    setProfile(synced); // hồ sơ vừa truy vấn từ Firestore -> lưu vào State toàn app
  };

  const signOutUser = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, signInWithGoogle, registerWithEmail, loginWithEmail, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth() phải được gọi bên trong <AuthProvider>.");
  return ctx;
}