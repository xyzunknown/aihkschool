import Image from "next/image";
import Link from "next/link";

const TRUST_POINTS = ["資料齊全更新", "免費使用", "專為香港家長設計"];

export function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
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
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/kg"
              className="inline-flex items-center gap-1.5 px-5 h-12 rounded-pill bg-brand-700 text-white text-base font-semibold hover:bg-brand-500 transition shadow-soft"
            >
              立即搜尋幼稚園
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/account"
              className="inline-flex items-center gap-2 px-5 h-12 rounded-pill border border-brand-700 text-brand-700 text-base font-semibold hover:bg-brand-50 transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              建立申請清單
            </Link>
          </div>
          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-700">
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

        <div className="relative h-72 md:h-[440px] flex items-center justify-center md:justify-end">
          <Image
            src="/brand/hero/family@2x.png"
            alt="開心嘅家庭一齊閱讀"
            width={520}
            height={520}
            sizes="(max-width: 768px) 80vw, 520px"
            className="max-h-full w-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
