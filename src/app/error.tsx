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
      <div className="glass-card rounded-card p-8">
        <div className="text-[40px] mb-4">😕</div>
        <h2 className="text-h2 text-slate-950 mb-2">出了点问题</h2>
        <p className="text-body text-slate-500 mb-6">
          页面加载过程中遇到了错误，请尝试刷新页面。
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="primary" onClick={reset}>
            重试
          </Button>
          <Button variant="secondary" onClick={() => window.location.href = "/"}>
            返回首页
          </Button>
        </div>
        {error.digest && (
          <p className="text-small text-slate-300 mt-6">
            错误编号：{error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
