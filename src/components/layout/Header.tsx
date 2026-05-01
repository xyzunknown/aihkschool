"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/layout/AuthProvider";

const NAV_ITEMS = [
  { href: "/kg", label: "找幼稚園", match: ["/kg"] },
  { href: "/timeline", label: "開放日", match: ["/timeline"] },
  { href: "/news", label: "評價優勢", match: ["/news"] },
  { href: "/activities", label: "課外活動", match: ["/activities", "/programmes"] },
  { href: "/news?tab=parent", label: "家長攻略", match: ["/news?tab=parent"] },
  { href: "/account", label: "收藏夾", match: ["/account"] },
] as const;

function isActiveItem(pathname: string, item: (typeof NAV_ITEMS)[number]) {
  return item.match.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function Header() {
  const pathname = usePathname();
  const { user, signIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-surface-border">
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-8 h-[72px] flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/brand/Web Logo/Logo.png"
            alt="HKSchoolPlace"
            width={42}
            height={42}
            className="w-[42px] h-auto rounded-xl"
            priority
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-[17px] font-bold text-forest-700 tracking-tight">HKSchoolPlace</span>
            <span className="text-[11px] text-ink-600 mt-1">全港幼稚園搜尋平台</span>
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

        {/* Right cluster: auth buttons */}
        <div className="flex items-center gap-2 ml-auto">
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
