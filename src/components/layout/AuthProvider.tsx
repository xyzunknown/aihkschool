"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type EmailAuthMode = "login" | "register";

interface AuthActionResult {
  error?: string;
  message?: string;
}

interface AuthContextType {
  user: SupabaseUser | null;
  loading: boolean;
  signIn: () => Promise<AuthActionResult | void>;
  signInWithEmail: (email: string, password: string, mode: EmailAuthMode) => Promise<AuthActionResult>;
  signInWithGoogle: () => Promise<AuthActionResult | void>;
  signInWithWechat: () => Promise<AuthActionResult>;
  signOut: () => Promise<void>;
  /** Call to trigger an action after login (optimistic login-then-act) */
  requireAuth: (callback: () => void) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signInWithEmail: async () => ({}),
  signInWithGoogle: async () => {},
  signInWithWechat: async () => ({}),
  signOut: async () => {},
  requireAuth: () => {},
});

function getAuthCallbackUrl(next = "/account") {
  let baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    window.location.origin;

  if (!baseUrl.startsWith("http")) {
    baseUrl = `https://${baseUrl}`;
  }

  if (!baseUrl.endsWith("/")) {
    baseUrl = `${baseUrl}/`;
  }

  const callbackUrl = new URL("auth/callback", baseUrl);
  callbackUrl.searchParams.set("next", next);
  return callbackUrl.toString();
}

export function useAuth() {
  return useContext(AuthContext);
}

function isIgnorableExtensionError(input: unknown): boolean {
  const text =
    typeof input === "string"
      ? input
      : input instanceof Error
        ? `${input.message}\n${input.stack ?? ""}`
        : JSON.stringify(input);

  return (
    text.includes("chrome-extension://") &&
    (
      text.includes("inpage.js") ||
      text.includes("Origin not allowed") ||
      text.includes("Unsafe attempt to load URL")
    )
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      // Execute pending action after login
      if (session?.user && pendingAction) {
        pendingAction();
        setPendingAction(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, pendingAction]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const handleError = (event: ErrorEvent) => {
      if (!isIgnorableExtensionError(event.error ?? event.message)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      if (!isIgnorableExtensionError(event.reason)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getAuthCallbackUrl(),
      },
    });

    if (!error) {
      return;
    }

    return {
      error: error.message.toLowerCase().includes("origin not allowed")
        ? "目前網址未加入登入允許清單，請檢查登入設定。"
        : "Google 登入未完成，請稍後再試。",
    };
  }, [supabase]);

  const signInWithEmail = useCallback(
    async (email: string, password: string, mode: EmailAuthMode): Promise<AuthActionResult> => {
      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail || !password) {
        return { error: "請輸入電郵和密碼。" };
      }

      if (password.length < 6) {
        return { error: "密碼至少需要 6 個字元。" };
      }

      if (mode === "register") {
        const { error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            emailRedirectTo: getAuthCallbackUrl("/account"),
          },
        });

        if (error) {
          return { error: error.message };
        }

        return { message: "帳戶已建立。如需要確認電郵，請查看收件箱。" };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) {
        return { error: "電郵或密碼不正確，請再試一次。" };
      }

      return { message: "登入成功。" };
    },
    [supabase],
  );

  const signInWithWechat = useCallback(async (): Promise<AuthActionResult> => {
    return { error: "微信登入入口已預留，正式接入後即可使用。" };
  }, []);

  const signIn = signInWithGoogle;

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, [supabase]);

  const requireAuth = useCallback((callback: () => void) => {
    if (user) {
      callback();
    } else {
      setPendingAction(() => callback);
      signIn();
    }
  }, [user, signIn]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signInWithEmail,
        signInWithGoogle,
        signInWithWechat,
        signOut,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
