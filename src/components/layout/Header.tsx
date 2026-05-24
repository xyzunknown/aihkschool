"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";
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
  const showCloseButton = pathname?.startsWith("/programmes") ?? false;

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
    <header className="sticky top-0 z-40 border-b border-surface-border bg-white">
      <div className="relative mx-auto flex h-[72px] max-w-[1200px] items-center gap-4 px-5 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/brand/Web Logo/Logo.png"
            alt="HKSchoolPlace"
            width={42}
            height={42}
            className="h-[42px] w-[42px] rounded-button object-contain"
            priority
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-body font-bold text-forest-700">HKSchoolPlace</span>
            <span className="mt-1 text-label text-ink-500">全港幼稚園搜尋平台</span>
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
                className={`relative py-5 text-small transition-colors ${
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
          {showCloseButton ? (
            <Link
              href="/"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-600 text-small font-bold text-white transition hover:bg-forest-700"
              aria-label="返回首頁"
            >
              X
            </Link>
          ) : user ? (
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
                <div className="absolute right-0 top-full mt-2 w-40 rounded-card border border-surface-border bg-white p-2 shadow-card">
                  {ACCOUNT_MENU_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setAccountMenuOpen(false)}
                      className="block rounded-button px-3 py-2 text-small text-ink-700 hover:bg-forest-50 hover:text-ink-900"
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
                    className="mt-1 block w-full rounded-button px-3 py-2 text-left text-small text-ink-700 hover:bg-forest-50 hover:text-ink-900"
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
                className="inline-flex h-9 min-w-[136px] items-center justify-center rounded-pill bg-forest-600 px-5 text-center text-small font-medium text-white transition hover:bg-forest-700"
              >
                登入 / 建立帳戶
              </Link>
            </div>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream-200 transition"
            aria-label="選單"
            aria-controls="site-mobile-menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} strokeWidth={1.7} /> : <Menu size={18} strokeWidth={1.7} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav id="site-mobile-menu" className="lg:hidden border-t border-surface-border bg-cream-50 px-5 py-3">
          {NAV_ITEMS.map((item) => {
            const active = isActiveItem(pathname, activeTab, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-2.5 text-small ${
                  active ? "text-forest-700 font-semibold" : "text-ink-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {!user && (
            <div className="mt-3 flex items-center gap-2 border-t border-surface-border pt-3">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-9 flex-1 items-center justify-center rounded-pill bg-forest-600 text-center text-small font-medium text-white"
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
