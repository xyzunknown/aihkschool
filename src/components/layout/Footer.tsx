"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/components/ui/Toast";

const ABOUT_LINKS = [
  { href: "/contact", label: "關於 HKSchoolPlace" },
  { href: "/terms", label: "服務條款及私隱政策" },
  { href: "/disclaimer", label: "免責聲明" },
  { href: "/contact", label: "聯絡我們" },
] as const;

const SUPPORT_LINKS = [
  { href: "/contact", label: "常見問題" },
  { href: "/contact", label: "意見回饋" },
] as const;

export function Footer() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      showToast({ message: "請先輸入有效電郵" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!response.ok) {
        const json = await response.json().catch(() => null);
        showToast({
          message: json?.error?.message ?? "訂閱未成功，請稍後再試",
        });
        return;
      }

      setEmail("");
      showToast({ message: "已送出訂閱，謝謝你" });
    } catch {
      showToast({ message: "訂閱未成功，請稍後再試" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <footer className="relative mt-12 bg-[linear-gradient(180deg,#FCFDFC_0%,#F7FBF8_100%)] border-t border-surface-border">
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 py-9 md:grid-cols-12 md:gap-10 md:px-8 md:py-10">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2.5 mb-3">
            <Image
              src="/brand/Web Logo/Logo.png"
              alt="HKSchoolPlace"
              width={40}
              height={40}
              className="h-10 w-10 rounded-button object-contain"
            />
            <div className="leading-tight">
              <p className="text-body font-bold text-forest-700">HKSchoolPlace</p>
              <p className="text-label text-ink-700">全港幼稚園搜尋平台</p>
            </div>
          </div>
          <p className="text-small leading-relaxed text-ink-700">
            我們致力提供準確、最新嘅幼稚園資訊，
            <br />
            助你輕鬆比較及選擇，為孩子發掘最合適嘅成長起點。
          </p>
        </div>

        <div className="md:col-span-3 md:pl-2">
          <h4 className="mb-3 text-small font-semibold text-ink-900">關於我們</h4>
          <nav className="space-y-2">
            {ABOUT_LINKS.map((l, i) => (
              <Link
                key={i}
                href={l.href}
                className="block text-small text-ink-800 transition-colors hover:text-forest-600"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:col-span-5">
          <h4 className="mb-3 text-small font-semibold text-ink-900">訂閱幼稚園資訊</h4>
          <p className="mb-3 text-small text-ink-700">接收最新資訊及入學消息</p>
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="輸入您的電郵地址"
              className="h-11 flex-1 rounded-pill border border-surface-border bg-white px-4 text-small outline-none focus:border-forest-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 rounded-pill bg-forest-600 px-5 text-small font-medium text-white transition hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "送出中..." : "訂閱"}
            </button>
          </form>
          <div className="mt-5 border-t border-surface-border pt-4">
            <h4 className="text-small font-semibold text-ink-900">需要協助？</h4>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
              {SUPPORT_LINKS.map((l, i) => (
                <Link
                  key={i}
                  href={l.href}
                  className="text-label font-medium text-forest-700 transition-colors hover:text-forest-600"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-5 md:px-8 pb-5 pt-3 border-t border-surface-border text-center">
        <p className="text-label text-ink-500">© 2026 HKSchoolPlace. All rights reserved.</p>
      </div>
    </footer>
  );
}
