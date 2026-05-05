import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-5 md:px-8 py-16 text-center">
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <div className="text-6xl font-bold text-slate-200 mb-4">404</div>
        <h2 className="text-xl font-semibold text-slate-950 mb-2">搵唔到頁面</h2>
        <p className="text-base text-slate-600 mb-6">
          您訪問嘅頁面唔存在，可能已被移除或地址有誤。
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
          >
            返回首頁
          </Link>
          <Link
            href="/kg"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-transform hover:scale-[1.02]"
          >
            瀏覽學校
          </Link>
        </div>
      </div>
    </div>
  );
}
