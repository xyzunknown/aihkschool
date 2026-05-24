"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState, type ElementType } from "react";
import { useRouter } from "next/navigation";
import {
  AppleLogo,
  Bell,
  Buildings,
  EnvelopeSimple,
  FacebookLogo,
  GoogleLogo,
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
                <Image src="/brand/Web Logo/Logo.png" alt="HKSchoolPlace" width={54} height={54} className="rounded-card" priority />
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
            <Image src="/brand/Web Logo/Logo.png" alt="HKSchoolPlace" width={48} height={48} className="rounded-card" priority />
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
            <ProviderButton onClick={() => handleProvider(signInWithGoogle)} icon={GoogleLogo} label="Google" />
            <ProviderButton onClick={() => handleProvider(signInWithFacebook)} icon={FacebookLogo} label="Facebook" />
            <ProviderButton onClick={() => handleProvider(signInWithApple)} icon={AppleLogo} label="Apple" />
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
  icon: ElementType;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[52px] w-full items-center justify-center gap-3 rounded-pill border border-surface-border bg-white text-body font-bold text-ink-900 transition hover:bg-forest-50"
    >
      <Icon aria-hidden="true" size={21} weight="regular" />
      {label}
    </button>
  );
}
