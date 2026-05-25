"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Buildings,
  EnvelopeSimple,
  Heart,
  LockSimple,
  MapPin,
  ShieldCheck,
} from "@phosphor-icons/react";
import { useAuth } from "@/components/layout/AuthProvider";

type AuthMode = "login" | "register";

const savedItems = [
  { name: "香港國際幼稚園", meta: "港島 · 半山", icon: Buildings },
  { name: "K1 報名提醒", meta: "開放前通知", icon: Bell },
  { name: "我的比較清單", meta: "最多 3 所學校", icon: Heart },
];

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, signInWithEmail, signInWithGoogle, signInWithFacebook, signInWithApple } = useAuth();
  const [next, setNext] = useState("/account");
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedNext = params.get("next");
    if (requestedNext?.startsWith("/")) setNext(requestedNext);
  }, []);

  useEffect(() => {
    if (!loading && user) router.replace(next);
  }, [loading, next, router, user]);

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const result = await signInWithEmail(email, password, mode);
    if (result.error) {
      setStatus({ kind: "error", text: result.error });
    } else {
      setStatus({ kind: "ok", text: result.message ?? "已完成。" });
      if (mode === "login") router.replace(next);
    }

    setSubmitting(false);
  };

  const handleProvider = async (signInWithProvider: () => Promise<{ error?: string; message?: string } | void>) => {
    setStatus(null);
    const result = await signInWithProvider();
    if (result?.error) setStatus({ kind: "error", text: result.error });
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-surface-page">
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1180px] grid-cols-1 items-center gap-8 px-5 py-8 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:py-12">
        <section className="hidden min-h-[600px] overflow-hidden rounded-[28px] border border-surface-border bg-white p-10 shadow-card lg:block">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Image src="/brand/Web Logo/Logo.png" alt="HKSchoolPlace" width={54} height={54} className="h-[54px] w-[54px] rounded-card object-contain" priority />
                <div>
                  <p className="text-xl font-bold text-forest-700">HKSchoolPlace</p>
                  <p className="mt-1 text-sm font-medium text-ink-500">全港幼稚園搜尋平台</p>
                </div>
              </div>

              <h1 className="mt-10 max-w-[480px] text-[44px] font-bold leading-tight text-ink-900">
                保存你的選校清單，重要日程有人提醒
              </h1>
              <p className="mt-5 max-w-[440px] text-body text-ink-700">
                收藏學校、比較資料、追蹤報名時間，都集中在你的 HKSchoolPlace 帳戶。
              </p>
            </div>

            <div className="mt-10 grid gap-4">
              <div className="rounded-card border border-surface-border bg-cream-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-forest-50 text-forest-700">
                    <MapPin size={22} weight="regular" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink-900">九龍城區 · K1</p>
                    <p className="mt-0.5 text-small text-ink-500">目前常用篩選</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {savedItems.map(({ name, meta, icon: Icon }) => (
                  <div key={name} className="flex items-center gap-3 rounded-card border border-surface-border bg-white px-4 py-3 shadow-soft">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-forest-50 text-forest-700">
                      <Icon size={20} weight="regular" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-ink-900">{name}</p>
                      <p className="mt-0.5 text-label text-ink-500">{meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[460px] rounded-[28px] border border-surface-border bg-white p-6 shadow-card md:p-9">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <Image src="/brand/Web Logo/Logo.png" alt="HKSchoolPlace" width={48} height={48} className="h-12 w-12 rounded-card object-contain" priority />
            <div>
              <p className="text-lg font-bold text-forest-700">HKSchoolPlace</p>
              <p className="text-sm text-ink-500">全港幼稚園搜尋平台</p>
            </div>
          </div>

          <div>
            <h2 className="text-[34px] font-bold leading-tight text-ink-900">
              {mode === "login" ? "歡迎回來" : "建立帳戶"}
            </h2>
            <p className="mt-3 text-body text-ink-700">
              {mode === "login" ? "登入以保存心儀學校和接收重要提醒。" : "用電郵建立帳戶，開始整理你的選校清單。"}
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleEmailSubmit}>
            <label className="block">
              <span className="text-small font-bold text-ink-900">郵箱</span>
              <span className="mt-2 flex h-12 items-center gap-3 rounded-button border border-surface-border bg-white px-4 transition focus-within:border-forest-500 focus-within:ring-4 focus-within:ring-forest-500/10">
                <EnvelopeSimple aria-hidden="true" size={20} weight="regular" className="shrink-0 text-forest-700" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full bg-transparent text-body font-medium text-ink-900 outline-none placeholder:text-ink-400"
                />
              </span>
            </label>

            <label className="block">
              <span className="text-small font-bold text-ink-900">密碼</span>
              <span className="mt-2 flex h-12 items-center gap-3 rounded-button border border-surface-border bg-white px-4 transition focus-within:border-forest-500 focus-within:ring-4 focus-within:ring-forest-500/10">
                <LockSimple aria-hidden="true" size={20} weight="regular" className="shrink-0 text-forest-700" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={mode === "login" ? "請輸入密碼" : "至少 6 個字元"}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  className="w-full bg-transparent text-body font-medium text-ink-900 outline-none placeholder:text-ink-400"
                />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-label font-bold text-forest-700">
                  {showPassword ? "隱藏" : "顯示"}
                </button>
              </span>
            </label>

            {status ? (
              <div className={`rounded-button px-4 py-3 text-small font-medium ${status.kind === "ok" ? "border border-forest-200 bg-forest-50 text-forest-700" : "border border-clay-100 bg-clay-50 text-clay-700"}`}>
                {status.text}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="h-[52px] w-full rounded-pill bg-forest-700 text-body font-bold text-white shadow-soft transition hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "處理中…" : mode === "login" ? "用郵箱繼續" : "用郵箱註冊"}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4 text-small font-medium text-ink-500">
            <span className="h-px flex-1 bg-surface-border" />
            <span>或 繼續</span>
            <span className="h-px flex-1 bg-surface-border" />
          </div>

          <div className="space-y-3">
            <ProviderButton onClick={() => handleProvider(signInWithGoogle)} icon={GoogleBrandIcon} label="Google" />
            <ProviderButton onClick={() => handleProvider(signInWithFacebook)} icon={FacebookBrandIcon} label="Facebook" />
            <ProviderButton onClick={() => handleProvider(signInWithApple)} icon={AppleBrandIcon} label="Apple" />
          </div>

          <div className="mt-7 text-center text-small font-medium text-ink-500">
            {mode === "login" ? "還沒有帳號？" : "已有帳號？"}
            <button
              type="button"
              onClick={() => {
                setMode((value) => (value === "login" ? "register" : "login"));
                setStatus(null);
              }}
              className="ml-2 font-bold text-forest-700"
            >
              {mode === "login" ? "註冊" : "登入"}
            </button>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-button border border-forest-100 bg-forest-50 px-4 py-3 text-small leading-6 text-ink-700">
            <ShieldCheck aria-hidden="true" size={22} weight="regular" className="mt-0.5 shrink-0 text-forest-700" />
            <p>我們會安全地保存你的偏好，並在重要日程前及時提醒你。</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function ProviderButton({
  onClick,
  icon: Icon,
  label,
}: {
  onClick: () => void;
  icon: (props: { className?: string }) => JSX.Element;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[52px] w-full items-center justify-center gap-3 rounded-pill border border-surface-border bg-white text-body font-bold text-ink-900 transition hover:bg-forest-50"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center">
        <Icon className="h-5 w-5" />
      </span>
      {label}
    </button>
  );
}

function GoogleBrandIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" className={className} focusable="false">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86a5.37 5.37 0 0 1-5.05-3.71H.94v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.71a5.41 5.41 0 0 1 0-3.42V4.96H.94a9 9 0 0 0 0 8.08l3.01-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58A8.65 8.65 0 0 0 9 0 9 9 0 0 0 .94 4.96l3.01 2.33A5.37 5.37 0 0 1 9 3.58Z"
      />
    </svg>
  );
}

function FacebookBrandIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} focusable="false">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#FFFFFF"
        d="m16.67 15.47.53-3.47h-3.33V9.75c0-.95.47-1.88 1.96-1.88h1.51V4.92s-1.37-.23-2.68-.23c-2.74 0-4.54 1.66-4.54 4.67V12H7.08v3.47h3.04v8.38a12.1 12.1 0 0 0 3.75 0v-8.38h2.8Z"
      />
    </svg>
  );
}

function AppleBrandIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} focusable="false">
      <path
        fill="currentColor"
        d="M12.15 6.9c-.95 0-2.42-1.08-3.96-1.04-2.04.03-3.91 1.18-4.96 3.01-2.12 3.68-.55 9.1 1.52 12.09 1.01 1.45 2.21 3.09 3.79 3.04 1.52-.07 2.09-.99 3.94-.99 1.83 0 2.35.99 3.96.95 1.64-.03 2.68-1.48 3.68-2.95 1.16-1.69 1.64-3.33 1.66-3.42-.04-.01-3.18-1.22-3.22-4.86-.03-3.04 2.48-4.49 2.6-4.56-1.43-2.09-3.62-2.32-4.39-2.38-2-.16-3.68 1.09-4.62 1.09Zm3.38-3.07C16.37 2.82 16.93 1.4 16.78 0c-1.21.05-2.66.8-3.53 1.82-.78.9-1.45 2.34-1.27 3.71 1.34.1 2.71-.69 3.55-1.7Z"
      />
    </svg>
  );
}
