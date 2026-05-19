"use client";


export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="max-w-lg mx-auto px-5 md:px-8 py-16 text-center">
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="text-4xl mb-4">😕</div>
            <h2 className="text-xl font-semibold text-slate-950 mb-2">
              出咗點問題
            </h2>
            <p className="text-base text-slate-600 mb-6">
              頁面載入過程中遇到咗嚴重錯誤，請試試刷新頁面。
            </p>
            <button
              onClick={reset}
              className="bg-slate-950 text-white rounded-xl px-6 py-3 text-sm font-medium hover:scale-[1.02] transition-transform"
            >
              重試
            </button>
            {error.digest && (
              <p className="text-sm text-slate-500 mt-6">
                錯誤編號：{error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
