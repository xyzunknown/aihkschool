import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-5 md:px-8 py-16 text-center">
      <div className="bg-white rounded-card border border-surface-border p-8">
        <div className="text-6xl font-bold text-ink-300 mb-4">404</div>
        <h2 className="text-xl font-semibold text-ink-900 mb-2">搵唔到頁面</h2>
        <p className="text-base text-ink-700 mb-6">
          您訪問嘅頁面唔存在，可能已被移除或地址有誤。
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-button bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-transform "
          >
            返回首頁
          </Link>
          <Link
            href="/kg"
            className="inline-flex items-center justify-center rounded-button border border-surface-border bg-white px-6 py-3 text-sm font-medium text-ink-900 transition-transform "
          >
            瀏覽學校
          </Link>
        </div>
      </div>
    </div>
  );
}
