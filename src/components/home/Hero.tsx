import Image from "next/image";
import Link from "next/link";

const TRUST_POINTS = ["資料齊全更新", "免費使用", "專為香港家長設計"];

export function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 pt-8 pb-4 md:pt-10 md:pb-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.74fr)] gap-5 md:gap-6 lg:gap-8 items-center">
        <div className="max-w-[640px] relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-[52px] font-semibold text-ink-900 leading-[1.2] tracking-tight">
            找到適合孩子的幼稚園，
            <br />
            從這裡開始
          </h1>
          <p className="mt-5 text-base md:text-lg text-ink-700 leading-relaxed max-w-md">
            整合全港幼稚園資訊、開放日及學位空缺，
            <br className="hidden md:block" />
            助你輕鬆比較，安心選擇。
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3 md:gap-4">
            <Link
              href="/kg"
              className="inline-flex min-w-[190px] items-center justify-center gap-1.5 px-6 h-12 rounded-pill bg-brand-700 text-white text-base font-semibold hover:bg-brand-500 transition shadow-[0_12px_28px_rgba(30,82,56,0.18)]"
            >
              立即搜尋幼稚園
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/account"
              className="inline-flex min-w-[162px] items-center justify-center gap-2 px-5 h-12 rounded-pill border border-brand-700 text-brand-700 text-base font-semibold hover:bg-brand-50 transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              建立申請清單
            </Link>
          </div>
          <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-700">
            {TRUST_POINTS.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#247A4D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative h-[260px] sm:h-[300px] md:h-[330px] lg:h-[390px] flex items-end justify-center lg:justify-end overflow-visible lg:-mr-2">
          <Image
            src="/brand/hero/family@2x.png"
            alt="開心嘅家庭一齊閱讀"
            width={720}
            height={720}
            sizes="(max-width: 640px) 86vw, (max-width: 1024px) 62vw, 40vw"
            className="w-[82%] max-w-[400px] sm:w-[74%] sm:max-w-[440px] md:w-[68%] md:max-w-[470px] lg:w-[92%] lg:max-w-[540px] h-auto object-contain translate-y-2 lg:translate-x-5 lg:translate-y-4"
            priority
          />
        </div>
      </div>
    </section>
  );
}
