"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/layout/AuthProvider";

const NAV_ITEMS = [
  { href: "/kg", label: "搵學校" },
  { href: "/news", label: "資訊" },
  { href: "/account", label: "我的收藏" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { user, signIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-base font-bold text-slate-950 tracking-tight">
          HKSchoolPlace
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/kg"
                ? pathname.startsWith("/kg")
                : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm py-4 transition-colors ${
                  isActive
                    ? "text-slate-950 font-medium"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-950" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Search + Login/Avatar */}
        <div className="flex items-center gap-3">
          <Link
            href="/kg"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
            aria-label="搜尋學校"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </Link>

          {user ? (
            <Link
              href="/account"
              className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-medium"
            >
              {(user.user_metadata?.full_name ?? user.email ?? "U").charAt(0).toUpperCase()}
            </Link>
          ) : (
            <button
              onClick={signIn}
              className="bg-slate-950 text-white rounded-full px-4 py-2 text-sm font-medium hover:scale-[1.02] transition-transform"
            >
              登入
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
            aria-label="選單"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
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
        <nav className="md:hidden border-t border-slate-100 bg-white px-5 py-3">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/kg"
                ? pathname.startsWith("/kg")
                : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-2.5 text-sm ${
                  isActive ? "text-slate-950 font-medium" : "text-slate-500"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
