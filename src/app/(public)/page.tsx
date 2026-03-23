import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8">
      {/* Hero */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
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
          <div className="bg-white/50 backdrop-blur-2xl border border-slate-200/50 rounded-card px-7 py-5 flex items-center gap-3.5 transition-transform duration-200 hover:scale-[1.01]">
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

      {/* Value props */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-16">
        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-card p-7">
          <div className="text-label text-slate-400 uppercase mb-3">即时空缺</div>
          <p className="text-body text-slate-700">
            K1-K3 学位空缺状态一目了然，数据来自教育局官方公告。
          </p>
        </div>
        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-card p-7">
          <div className="text-label text-slate-400 uppercase mb-3">截止提醒</div>
          <p className="text-body text-slate-700">
            收藏学校后开启邮件提醒，申请截止前 7 天、3 天、1 天自动通知。
          </p>
        </div>
        <div className="bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-card p-7">
          <div className="text-label text-slate-400 uppercase mb-3">面试情报</div>
          <p className="text-body text-slate-700">
            真实家长的面试经验分享：面试形式、语言、排队时间、结果。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-16">
        <Link href="/kg">
          <Button variant="primary">浏览幼稚园</Button>
        </Link>
        <p className="text-small text-slate-400 mt-3">
          无需登录即可浏览，收藏和投稿时才需要 Google 登录。
        </p>
      </section>
    </div>
  );
}
