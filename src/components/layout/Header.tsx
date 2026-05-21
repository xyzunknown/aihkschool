"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/layout/AuthProvider";

const NAV_ITEMS = [
  { href: "/kg", label: "找幼稚園", match: ["/kg"] },
  { href: "/programmes", label: "康體通", match: ["/programmes"] },
  { href: "/activities", label: "課外活動", match: ["/activities"] },
  { href: "/news", label: "消息資訊", match: ["/news"] },
] as const;

const ACCOUNT_MENU_ITEMS = [
  { href: "/account", label: "我的" },
  { href: "/account#favorites", label: "收藏管理" },
] as const;

function isActiveItem(pathname: string | null, _activeTab: string | null, item: (typeof NAV_ITEMS)[number]) {
  if (!pathname) return false;
  return item.match.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement | null>(null);
  const activeTab = searchParams?.get("tab") ?? null;

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!accountMenuRef.current) return;
      if (event.target instanceof Node && accountMenuRef.current.contains(event.target)) return;
      setAccountMenuOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setAccountMenuOpen(false);
  }, [pathname]);

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
            className="rounded-xl object-contain"
            style={{ width: 42, height: 42 }}
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
            const active = isActiveItem(pathname, activeTab, item);
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
            <div ref={accountMenuRef} className="relative">
              <button
                onClick={() => setAccountMenuOpen((value) => !value)}
                className="w-9 h-9 rounded-full bg-forest-600 text-white flex items-center justify-center text-sm font-semibold"
                aria-label="打開個人選單"
                aria-expanded={accountMenuOpen}
              >
                {(user.user_metadata?.full_name ?? user.email ?? "U").charAt(0).toUpperCase()}
              </button>
              {accountMenuOpen ? (
                <div className="absolute right-0 top-full mt-2 w-40 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                  {ACCOUNT_MENU_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setAccountMenuOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={async () => {
                      setAccountMenuOpen(false);
                      await signOut();
                    }}
                    className="mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                  >
                    登出
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex h-9 min-w-[136px] items-center justify-center rounded-pill bg-forest-600 px-5 text-center text-sm font-medium text-white transition hover:bg-forest-700"
              >
                登入 / 建立帳戶
              </Link>
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
            const active = isActiveItem(pathname, activeTab, item);
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
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-9 flex-1 items-center justify-center rounded-pill bg-forest-600 text-center text-sm font-medium text-white"
              >
                登入 / 建立帳戶
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
