import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-16 bg-white">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <p className="text-base font-bold text-slate-950">HKSchoolPlace</p>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              領先嘅香港教育資源數位導航者，為家長和機構提供透明、即時的數據。
            </p>
            <p className="text-xs text-slate-400 mt-4">
              © 2026 HKSchoolPlace
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="text-xs font-medium text-slate-950 uppercase tracking-wide mb-3">網站導覽</h4>
            <nav className="space-y-2">
              <Link href="/kg" className="block text-sm text-slate-500 hover:text-slate-700 transition-colors">
                搵學校
              </Link>
              <Link href="/news" className="block text-sm text-slate-500 hover:text-slate-700 transition-colors">
                消息動態
              </Link>
              <Link href="/account" className="block text-sm text-slate-500 hover:text-slate-700 transition-colors">
                我的收藏
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-medium text-slate-950 uppercase tracking-wide mb-3">支援服務</h4>
            <nav className="space-y-2">
              <span className="block text-sm text-slate-500">聯絡我們</span>
              <span className="block text-sm text-slate-500">服務條款</span>
              <span className="block text-sm text-slate-500">私隱政策</span>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-medium text-slate-950 uppercase tracking-wide mb-3">訂閱電子報</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="電郵地址"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400"
              />
              <button className="bg-slate-950 text-white rounded-xl px-4 py-2 text-sm font-medium hover:scale-[1.02] transition-transform">
                訂閱
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
