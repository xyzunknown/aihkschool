"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/layout/AuthProvider";

export function Header() {
  const pathname = usePathname();
  const { user, signIn } = useAuth();

  return (
    <header className="sticky top-0 z-40 glass-header">
      <div className="max-w-3xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-base font-semibold text-slate-950 tracking-tight">
          HKSchoolPlace
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-4">
          <Link
            href="/kg"
            className={`text-sm ${
              pathname.startsWith("/kg") ? "text-slate-950 font-medium" : "text-slate-500"
            }`}
          >
            学校
          </Link>
          <Link
            href="/submit"
            className={`text-sm ${
              pathname === "/submit" ? "text-slate-950 font-medium" : "text-slate-500"
            }`}
          >
            投稿
          </Link>
          {user ? (
            <Link
              href="/account"
              className={`text-sm ${
                pathname === "/account" ? "text-slate-950 font-medium" : "text-slate-500"
              }`}
            >
              我的
            </Link>
          ) : (
            <button
              onClick={signIn}
              className="text-sm text-slate-500 hover:text-slate-900"
            >
              登录
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
