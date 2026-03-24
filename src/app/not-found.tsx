import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-5 md:px-8 py-16 text-center">
      <div className="glass-card rounded-card p-8">
        <div className="text-[64px] font-bold text-slate-200 mb-4">404</div>
        <h2 className="text-h2 text-slate-950 mb-2">找不到页面</h2>
        <p className="text-body text-slate-500 mb-6">
          您访问的页面不存在，可能已被移除或地址有误。
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button variant="primary">返回首页</Button>
          </Link>
          <Link href="/kg">
            <Button variant="secondary">浏览学校</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
