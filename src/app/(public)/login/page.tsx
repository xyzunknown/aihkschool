"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/layout/AuthProvider";

type AuthMode = "login" | "register";

const selectedSchools = [
  { name: "香港國際幼稚園", area: "港島 · 半山", accent: "bg-[#DFF2EC]" },
  { name: "啟思小學", area: "九龍 · 油尖旺", accent: "bg-[#EAF4FF]" },
  { name: "聖保羅中學", area: "港島 · 中環", accent: "bg-[#FFF1E8]" },
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
    if (requestedNext?.startsWith("/")) {
      setNext(requestedNext);
    }
  }, []);

  useEffect(() => {
    if (!loading && user) {
      router.replace(next);
    }
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
      if (mode === "login") {
        router.replace(next);
      }
    }

    setSubmitting(false);
  };

  const handleProvider = async (signInWithProvider: () => Promise<{ error?: string; message?: string } | void>) => {
    setStatus(null);
    const result = await signInWithProvider();
    if (result?.error) {
      setStatus({ kind: "error", text: result.error });
    }
  };

  const handleGoogle = async () => {
    await handleProvider(signInWithGoogle);
  };

  const handleFacebook = async () => {
    await handleProvider(signInWithFacebook);
  };

  const handleApple = async () => {
    await handleProvider(signInWithApple);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[linear-gradient(135deg,#F8FCFA_0%,#FFFFFF_44%,#EAF7F4_100%)]">
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1180px] grid-cols-1 items-center gap-8 px-5 py-8 md:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-10">
        <section className="relative hidden min-h-[640px] overflow-hidden rounded-[28px] border border-white/70 bg-[#EAF8F6] shadow-soft lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.95),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.3),rgba(164,221,215,0.45))]" />
          <div className="relative z-10 flex h-full flex-col justify-between p-12">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/brand/Web Logo/Logo.png"
                  alt="HKSchoolPlace"
                  width={54}
                  height={54}
                  className="rounded-card"
                  priority
                />
                <div>
                  <p className="text-xl font-bold text-[#10213B]">HKSchoolPlace</p>
                  <p className="mt-1 text-sm font-medium text-[#3F5B56]">香港學校選擇助手</p>
                </div>
              </div>

              <h1 className="mt-8 max-w-[520px] text-[42px] font-bold leading-[1.18] text-[#10213B]">
                找到合適的學校，為孩子開啟更好的未來
              </h1>
              <p className="mt-5 text-lg font-medium text-[#395A52]">
                收藏心儀學校、追蹤報名時間，重要日程不再錯過。
              </p>
            </div>

            <div className="relative h-[350px]">
              <div className="absolute inset-x-0 bottom-0 h-[260px] rounded-[36px] bg-[linear-gradient(180deg,#FFFFFF_0%,#D7F1EF_100%)] shadow-soft" />
              <div className="absolute bottom-12 left-8 right-8 h-[190px] rounded-[32px] border border-white/80 bg-[linear-gradient(135deg,#F9FFFF,#DFF2EE)] shadow-soft">
                <div className="absolute left-12 top-14 h-2 w-[72%] -rotate-6 rounded-full bg-white/80" />
                <div className="absolute left-20 top-24 h-2 w-[65%] rotate-3 rounded-full bg-white/80" />
                <div className="absolute left-16 top-36 h-2 w-[58%] -rotate-3 rounded-full bg-white/80" />
                <MapPin className="absolute left-[22%] top-[34%] text-[#168A7A]" icon="cap" />
                <MapPin className="absolute left-[58%] top-[18%] text-[#F15B52]" icon="school" />
                <MapPin className="absolute left-[69%] top-[52%] text-[#168A7A]" icon="cap" />
              </div>

              <div className="absolute bottom-20 left-0 w-[315px] rounded-card border border-white/80 bg-white/95 p-5 shadow-soft">
                <p className="text-lg font-bold text-[#10213B]">我的選校清單</p>
                <div className="mt-4 space-y-3">
                  {selectedSchools.map((school) => (
                    <div key={school.name} className="flex items-center gap-3 border-b border-[#E8EFED] pb-3 last:border-0 last:pb-0">
                      <div className={`grid h-11 w-11 place-items-center rounded-button ${school.accent} text-sm font-bold text-[#1B6B52]`}>
                        校
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-[#10213B]">{school.name}</p>
                        <p className="mt-0.5 text-xs font-medium text-[#5F716C]">{school.area}</p>
                      </div>
                      <span className="text-lg text-[#F15B52]">♥</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 right-2 flex w-[330px] items-center gap-4 rounded-card border border-white/80 bg-white/95 p-5 shadow-soft">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#FFF0EB] text-[#F15B52]">
                  <BellIcon />
                </div>
                <div>
                  <p className="text-base font-bold text-[#10213B]">申請與重要日程提醒</p>
                  <p className="mt-1 text-sm leading-6 text-[#52665F]">報名時間、開放日、面試安排，集中保存。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[460px] rounded-[28px] border border-[#E4ECE8] bg-white/95 p-6 shadow-soft md:p-9 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <Image src="/brand/Web Logo/Logo.png" alt="HKSchoolPlace" width={48} height={48} className="rounded-card" priority />
            <div>
              <p className="text-lg font-bold text-[#10213B]">HKSchoolPlace</p>
              <p className="text-sm text-[#52665F]">香港學校選擇助手</p>
            </div>
          </div>

          <div>
            <h2 className="text-[34px] font-bold leading-tight text-[#10213B]">
              {mode === "login" ? "歡迎回來" : "建立帳戶"}
            </h2>
            <p className="mt-3 text-base leading-7 text-[#52665F]">
              {mode === "login" ? "登入以保存心儀學校和接收重要提醒。" : "用電郵建立帳戶，開始整理你的選校清單。"}
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleEmailSubmit}>
            <label className="block">
              <span className="text-sm font-bold text-[#10213B]">郵箱</span>
              <span className="mt-2 flex h-12 items-center gap-3 rounded-chip border border-[#D7E0DC] bg-white px-4 transition focus-within:border-[#168A7A] focus-within:ring-4 focus-within:ring-[#168A7A]/10">
                <MailIcon />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full bg-transparent text-[15px] font-medium text-[#10213B] outline-none placeholder:text-[#98A6A1]"
                />
              </span>
            </label>

            <label className="block">
              <span className="text-sm font-bold text-[#10213B]">密碼</span>
              <span className="mt-2 flex h-12 items-center gap-3 rounded-chip border border-[#D7E0DC] bg-white px-4 transition focus-within:border-[#168A7A] focus-within:ring-4 focus-within:ring-[#168A7A]/10">
                <LockIcon />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={mode === "login" ? "請輸入密碼" : "至少 6 個字元"}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  className="w-full bg-transparent text-[15px] font-medium text-[#10213B] outline-none placeholder:text-[#98A6A1]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="text-xs font-bold text-[#168A7A]"
                >
                  {showPassword ? "隱藏" : "顯示"}
                </button>
              </span>
            </label>

            {status ? (
              <div
                className={`rounded-chip px-4 py-3 text-sm font-medium ${
                  status.kind === "ok"
                    ? "border border-[#B8DDD1] bg-[#F0FAF6] text-[#17623F]"
                    : "border border-[#FFD0C7] bg-[#FFF3EF] text-[#A84620]"
                }`}
              >
                {status.text}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="h-[52px] w-full rounded-chip bg-[#F15B52] text-base font-bold text-white shadow-soft transition hover:bg-[#E34E45] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "處理中…" : mode === "login" ? "用郵箱繼續" : "用郵箱註冊"}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4 text-sm font-medium text-[#7A8984]">
            <span className="h-px flex-1 bg-[#DDE6E2]" />
            <span>或 繼續</span>
            <span className="h-px flex-1 bg-[#DDE6E2]" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogle}
              className="flex h-[52px] w-full items-center justify-center gap-3 rounded-chip border border-[#D7E0DC] bg-white text-base font-bold text-[#10213B] transition hover:bg-[#F8FCFA]"
            >
              <span className="text-lg font-bold text-[#4285F4]">G</span>
              Google
            </button>
            <button
              type="button"
              onClick={handleFacebook}
              className="flex h-[52px] w-full items-center justify-center gap-3 rounded-chip border border-[#D7E0DC] bg-white text-base font-bold text-[#10213B] transition hover:bg-[#F8FCFA]"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#1877F2] text-sm font-bold text-white">f</span>
              Facebook
            </button>
            <button
              type="button"
              onClick={handleApple}
              className="flex h-[52px] w-full items-center justify-center gap-3 rounded-chip border border-[#D7E0DC] bg-white text-base font-bold text-[#10213B] transition hover:bg-[#F8FCFA]"
            >
              <AppleIcon />
              Apple
            </button>
          </div>

          <div className="mt-7 text-center text-sm font-medium text-[#65746F]">
            {mode === "login" ? "還沒有帳號？" : "已有帳號？"}
            <button
              type="button"
              onClick={() => {
                setMode((value) => (value === "login" ? "register" : "login"));
                setStatus(null);
              }}
              className="ml-2 font-bold text-[#168A7A]"
            >
              {mode === "login" ? "註冊" : "登入"}
            </button>
          </div>

          <div className="mt-8 flex items-start gap-3 text-sm leading-6 text-[#65746F]">
            <ShieldIcon />
            <p>我們會安全地保存你的偏好，並在重要日程前及時提醒你。</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function MapPin({ className, icon }: { className?: string; icon: "cap" | "school" }) {
  return (
    <div className={className}>
      <div className="grid h-14 w-14 place-items-center rounded-full bg-current shadow-soft">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-white">
          {icon === "cap" ? <CapIcon /> : <SchoolIcon />}
        </div>
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-[#6E7F79]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16v12H4z" />
      <path d="m4 8 8 6 8-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 text-[#6E7F79]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 10V8a5 5 0 0 1 10 0v2" />
      <path d="M5 10h14v10H5z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="mt-0.5 h-6 w-6 shrink-0 text-[#168A7A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z" />
      <path d="m9 12 2 2 4-5" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="h-6 w-6 shrink-0 text-[#10213B]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.9 12.9c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8s-1.8-.8-2.9-.8c-1.5 0-2.9.9-3.7 2.2-1.6 2.8-.4 6.8 1.1 9.1.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2.1-1.1 2.8-2.2c.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.9-1.1-2.9-3.7ZM14.7 6.5c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1 1.8-.9 2.8 1 .1 2-.5 2.6-1.3Z" />
    </svg>
  );
}

function CapIcon() {
  return (
    <svg className="h-6 w-6 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m3 9 9-4 9 4-9 4z" />
      <path d="M7 11v4c3 2 7 2 10 0v-4" />
    </svg>
  );
}

function SchoolIcon() {
  return (
    <svg className="h-6 w-6 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20V8l8-4 8 4v12" />
      <path d="M9 20v-6h6v6" />
      <path d="M8 10h.01M16 10h.01" />
    </svg>
  );
}
