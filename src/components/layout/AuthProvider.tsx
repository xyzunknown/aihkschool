"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface AuthContextType {
  user: SupabaseUser | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  /** Call to trigger an action after login (optimistic login-then-act) */
  requireAuth: (callback: () => void) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  requireAuth: () => {},
});

function getAuthCallbackUrl() {
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

  return new URL("auth/callback", baseUrl).toString();
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

  const signIn = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getAuthCallbackUrl(),
      },
    });

    if (!error) {
      return;
    }

    const params = new URLSearchParams();
    params.set("error", error.message.toLowerCase().includes("origin not allowed") ? "auth_origin" : "auth");
    window.location.assign(`/?${params.toString()}`);
  }, [supabase]);

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
    <AuthContext.Provider value={{ user, loading, signIn, signOut, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
