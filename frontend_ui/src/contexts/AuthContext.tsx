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
import { ensureUserProfile, listenUserProfile } from "../services/firestoreService";
import type { UserProfile } from "../types/user";

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null; // MỚI — hồ sơ Firestore (username, elo, friendsList...)
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
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
      if (firebaseUser) {
        await ensureUserProfile(firebaseUser); // tạo profile nếu lần đầu đăng nhập
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  // Lắng nghe realtime profile Firestore theo user hiện tại (đổi username sẽ tự cập nhật khắp nơi)
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

  const signOutUser = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth() phải được gọi bên trong <AuthProvider>.");
  return ctx;
}