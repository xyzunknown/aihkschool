"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-lg mx-auto px-5 md:px-8 py-16 text-center">
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <div className="text-4xl mb-4">😕</div>
        <h2 className="text-xl font-semibold text-slate-950 mb-2">出咗點問題</h2>
        <p className="text-base text-slate-600 mb-6">
          頁面載入過程中遇到咗錯誤，請試試刷新頁面。
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="primary" onClick={reset}>
            重試
          </Button>
          <Button variant="secondary" onClick={() => window.location.href = "/"}>
            返回首頁
          </Button>
        </div>
        {error.digest && (
          <p className="text-sm text-slate-500 mt-6">
            錯誤編號：{error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
