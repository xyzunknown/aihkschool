import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8">
      {/* Hero */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill glass-card text-[11px] font-medium text-slate-500 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          2025/26 学年空缺数据已更新
        </div>

        <h1 className="text-display text-slate-950 text-balance">
          为孩子找到
          <br />
          合适的幼稚园
        </h1>
        <p className="text-body text-slate-500 mt-4 max-w-md">
          一站式查看香港幼稚园空缺、截止日期和家长面试情报，不再错过申请时机。
        </p>

        {/* Search entry */}
        <Link href="/kg" className="block mt-8">
          <div className="glass-card rounded-card px-7 py-5 flex items-center gap-3.5 transition-all duration-200 hover:scale-[1.01] hover:shadow-md">
            <svg
              className="w-[18px] h-[18px] text-slate-400 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
            <span className="text-[16px] text-slate-400 tracking-[-0.01em]">
              寻找你的下一所学校…
            </span>
          </div>
        </Link>
      </section>

      {/* Stats bar */}
      <section className="glass-card rounded-card px-7 py-5 mb-8">
        <div className="grid grid-cols-3 divide-x divide-slate-200/50">
          <div className="text-center pr-4">
            <div className="text-h1 text-slate-950 font-semibold">713</div>
            <div className="text-small text-slate-400 mt-0.5">幼稚园</div>
          </div>
          <div className="text-center px-4">
            <div className="text-h1 text-slate-950 font-semibold">18</div>
            <div className="text-small text-slate-400 mt-0.5">区域覆盖</div>
          </div>
          <div className="text-center pl-4">
            <div className="text-h1 text-slate-950 font-semibold">K1-K3</div>
            <div className="text-small text-slate-400 mt-0.5">年级空缺</div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-16">
        <div className="glass-card rounded-card p-7 group">
          <div className="w-10 h-10 rounded-xl bg-green-100/80 flex items-center justify-center mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(22, 101, 52)" strokeWidth="1.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="text-label text-slate-400 uppercase mb-2">即时空缺</div>
          <p className="text-body text-slate-600">
            K1-K3 学位空缺状态一目了然，数据来自教育局官方公告。
          </p>
        </div>
        <div className="glass-card rounded-card p-7 group">
          <div className="w-10 h-10 rounded-xl bg-blue-100/80 flex items-center justify-center mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(29, 78, 216)" strokeWidth="1.5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <div className="text-label text-slate-400 uppercase mb-2">截止提醒</div>
          <p className="text-body text-slate-600">
            收藏学校后开启邮件提醒，申请截止前 7 天、3 天、1 天自动通知。
          </p>
        </div>
        <div className="glass-card rounded-card p-7 group">
          <div className="w-10 h-10 rounded-xl bg-orange-100/80 flex items-center justify-center mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(194, 65, 12)" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="text-label text-slate-400 uppercase mb-2">面试情报</div>
          <p className="text-body text-slate-600">
            真实家长的面试经验分享：面试形式、语言、排队时间、结果。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-16">
        <Link href="/kg">
          <Button variant="primary" className="px-8 py-3 text-base">浏览幼稚园</Button>
        </Link>
        <p className="text-small text-slate-400 mt-3">
          无需登录即可浏览，收藏和投稿时才需要 Google 登录。
        </p>
      </section>
    </div>
  );
}
