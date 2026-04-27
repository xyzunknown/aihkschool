"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/layout/AuthProvider";

const NAV_ITEMS = [
  { href: "/kg", label: "找幼稚園", match: ["/kg"] },
  { href: "/timeline", label: "開放日", match: ["/timeline"] },
  { href: "/news", label: "評價總覽", match: ["/news"] },
  { href: "/activities", label: "課外活動", match: ["/activities", "/programmes"] },
  { href: "/account", label: "收藏", match: ["/account"] },
] as const;

function isActiveItem(pathname: string, item: (typeof NAV_ITEMS)[number]) {
  return item.match.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function Header() {
  const pathname = usePathname();
  const { user, signIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur border-b border-cream-200">
      {/* Subtle leaf decoration in top-left */}
      <div className="absolute top-0 left-0 w-32 h-16 opacity-60 pointer-events-none hidden md:block">
        <div className="leaf-decor leaf-decor-tl" style={{ width: "120px", height: "80px" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/brand/Web Logo/Logo.png"
            alt="HKSchoolPlace"
            width={36}
            height={36}
            className="rounded-lg"
            priority
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-base font-bold text-forest-700 tracking-tight">HKSchoolPlace</span>
            <span className="text-[10px] text-ink-500 mt-0.5">全港幼稚園搜尋平台</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
          {NAV_ITEMS.map((item) => {
            const active = isActiveItem(pathname, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm py-5 transition-colors ${
                  active ? "text-forest-700 font-semibold" : "text-ink-700 hover:text-forest-600"
                }`}
              >
                {/* Tiny leaf glyph for active item */}
                <span className="inline-flex items-center gap-1.5">
                  {active && (
                    <span className="text-forest-500" aria-hidden>
                      ◆
                    </span>
                  )}
                  {item.label}
                </span>
                {active && (
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-forest-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right cluster: search input + auth buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <form
            action="/kg"
            className="hidden md:flex items-center gap-2 px-3 h-9 rounded-pill bg-white border border-cream-300 focus-within:border-forest-400 focus-within:shadow-glow transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-500">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
            <input
              type="search"
              name="q"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="搜尋學校..."
              className="bg-transparent outline-none text-sm w-40 text-ink-900 placeholder:text-ink-400"
            />
          </form>

          {user ? (
            <Link
              href="/account"
              className="w-9 h-9 rounded-full bg-forest-600 text-white flex items-center justify-center text-sm font-semibold"
            >
              {(user.user_metadata?.full_name ?? user.email ?? "U").charAt(0).toUpperCase()}
            </Link>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={signIn}
                className="px-4 h-9 rounded-pill border border-forest-600 text-forest-700 text-sm font-medium hover:bg-forest-50 transition"
              >
                登入
              </button>
              <button
                onClick={signIn}
                className="px-4 h-9 rounded-pill bg-forest-600 text-white text-sm font-medium hover:bg-forest-700 transition"
              >
                建立帳戶
              </button>
            </div>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream-200 transition"
            aria-label="選單"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-cream-200 bg-cream-50 px-5 py-3">
          {NAV_ITEMS.map((item) => {
            const active = isActiveItem(pathname, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-2.5 text-sm ${
                  active ? "text-forest-700 font-semibold" : "text-ink-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {!user && (
            <div className="flex items-center gap-2 pt-3 mt-3 border-t border-cream-200">
              <button
                onClick={signIn}
                className="flex-1 h-9 rounded-pill border border-forest-600 text-forest-700 text-sm font-medium"
              >
                登入
              </button>
              <button
                onClick={signIn}
                className="flex-1 h-9 rounded-pill bg-forest-600 text-white text-sm font-medium"
              >
                建立帳戶
              </button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
