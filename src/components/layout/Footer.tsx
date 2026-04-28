import Link from "next/link";
import Image from "next/image";

const QUICK_LINKS = [
  { href: "/kg", label: "找幼稚園" },
  { href: "/timeline", label: "開放日" },
  { href: "/activities", label: "課外活動" },
  { href: "/programmes", label: "開報前追蹤" },
  { href: "/account", label: "我的收藏" },
] as const;

const ABOUT_LINKS = [
  { href: "/contact", label: "關於 HKSchoolPlace" },
  { href: "/terms", label: "服務條款及私隱政策" },
  { href: "/disclaimer", label: "免責聲明" },
  { href: "/contact", label: "聯絡我們" },
] as const;

const SUPPORT_LINKS = [
  { href: "/contact", label: "常見問題" },
  { href: "/contact", label: "聯絡我們" },
  { href: "/contact", label: "意見回饋" },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-12 bg-[linear-gradient(180deg,#FCFDFC_0%,#F7FBF8_100%)] border-t border-surface-border">
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-8 py-9 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-7 md:gap-8">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2.5 mb-3">
            <Image
              src="/brand/Web Logo/Logo.png"
              alt="HKSchoolPlace"
              width={40}
              height={40}
              className="w-[40px] h-auto rounded-xl"
            />
            <div className="leading-tight">
              <p className="text-[17px] font-bold text-forest-700">HKSchoolPlace</p>
              <p className="text-[11px] text-ink-700">全港幼稚園搜尋平台</p>
            </div>
          </div>
          <p className="text-sm text-ink-700 leading-relaxed">
            我們致力提供準確、最新嘅幼稚園資訊，
            <br />
            助你輕鬆比較及選擇，為孩子發掘最合適嘅成長起點。
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[
              { name: "facebook", path: "M22 12a10 10 0 1 0-11.6 9.9V14.9H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4V22A10 10 0 0 0 22 12z" },
              { name: "instagram", path: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.3.5.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.5.4 1.1.5 2.3 0 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.5 2.3-.2.6-.5 1-1 1.5s-.9.8-1.5 1c-.5.2-1.1.4-2.3.5-1.2 0-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.3-.5a4.4 4.4 0 0 1-1.5-1 4.4 4.4 0 0 1-1-1.5c-.2-.5-.4-1.1-.5-2.3 0-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-1.8.5-2.3.2-.6.5-1 1-1.5s.9-.8 1.5-1c.5-.2 1.1-.4 2.3-.5 1.2 0 1.6-.1 4.8-.1zm0 2c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.5-1.3.9s-.7.8-.9 1.3c-.2.4-.3 1-.4 2.1 0 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.5.9.9 1.3s.8.7 1.3.9c.4.2 1 .3 2.1.4 1.2 0 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.5 1.3-.9s.7-.8.9-1.3c.2-.4.3-1 .4-2.1 0-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.5-.9-.9-1.3s-.8-.7-1.3-.9c-.4-.2-1-.3-2.1-.4-1.2 0-1.6-.1-4.7-.1zm0 3.4a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8zm0 7.2a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6zm5.6-7.4a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" },
              { name: "youtube", path: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.3-1.6.4-3.2.4-4.8a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3-5.2 3z" },
            ].map((s) => (
              <button
                key={s.name}
                type="button"
                className="w-9 h-9 rounded-full border border-surface-border bg-white flex items-center justify-center text-brand-700 hover:border-brand-200 hover:bg-brand-50 hover:-translate-y-0.5 transition"
                aria-label={s.name}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold text-ink-900 mb-3">快速連結</h4>
          <nav className="space-y-2">
            {QUICK_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="block text-sm text-ink-800 hover:text-forest-600 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold text-ink-900 mb-3">關於我們</h4>
          <nav className="space-y-2">
            {ABOUT_LINKS.map((l, i) => (
              <Link
                key={i}
                href={l.href}
                className="block text-sm text-ink-800 hover:text-forest-600 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-sm font-semibold text-ink-900 mb-3">訂閱幼稚園資訊</h4>
          <p className="text-sm text-ink-700 mb-3">接收最新資訊及入學消息</p>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="輸入您的電郵地址"
              className="flex-1 px-4 h-11 rounded-pill bg-white border border-surface-border text-sm outline-none focus:border-brand-500 shadow-[0_8px_20px_rgba(30,82,56,0.05)]"
            />
            <button
              type="submit"
              className="px-5 h-11 rounded-pill bg-forest-600 text-white text-sm font-medium hover:bg-forest-700 transition shadow-[0_10px_24px_rgba(30,82,56,0.12)]"
            >
              訂閱
            </button>
          </form>
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-semibold text-ink-900">支援服務</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {SUPPORT_LINKS.map((l, i) => (
                <Link key={i} href={l.href} className="text-xs text-ink-800 hover:text-forest-600 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-5 md:px-8 pb-5 pt-3 border-t border-surface-border text-center">
        <p className="text-xs text-ink-500">© 2026 HKSchoolPlace. All rights reserved.</p>
      </div>
    </footer>
  );
}
