import Link from "next/link";
import { Button } from "@/components/ui/Button";

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
          <Link href="/">
            <Button variant="primary">返回首頁</Button>
          </Link>
          <Link href="/kg">
            <Button variant="secondary">瀏覽學校</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
