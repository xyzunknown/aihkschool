import Image from "next/image";
import Link from "next/link";

const TRUST_POINTS = ["資料齊全更新", "免費使用", "專為香港家長設計"];

export function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 pt-8 pb-2 md:pt-10 md:pb-3">
        <div className="relative overflow-hidden rounded-[30px] min-h-[360px] md:min-h-[420px] lg:min-h-[460px] border border-[#F2E7CC] bg-[#FFF8E9] shadow-[0_20px_44px_rgba(143,111,43,0.08)]">
          <Image
            src="/brand/hero/hero-family-mobile.png"
            alt="家長陪伴孩子閱讀的溫馨家庭場景"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />
          <Image
            src="/brand/hero/hero-family.png"
            alt="家長陪伴孩子閱讀的溫馨家庭場景"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="hidden md:block object-cover object-right"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,239,0.3)_0%,rgba(255,250,239,0.18)_100%)] md:hidden" />

          <div className="relative z-10 h-full flex items-start md:items-center px-6 pt-8 pb-7 md:px-10 md:py-10 lg:px-12 lg:py-12">
            <div className="w-full min-w-0 max-w-[640px] md:w-[460px] lg:w-[500px] xl:w-[530px] 2xl:w-[560px] md:max-w-none flex-none rounded-[28px] bg-white/48 backdrop-blur-[2px] border border-white/55 shadow-[0_10px_30px_rgba(143,111,43,0.06)] px-5 py-5 md:pl-7 md:pr-6 md:py-7 lg:pl-8 lg:pr-7 lg:py-8 xl:pr-7">
              <h1 className="max-w-[13ch] md:max-w-[380px] lg:max-w-[410px] xl:max-w-[440px] text-[34px] md:text-[38px] lg:text-[42px] xl:text-[46px] font-semibold text-ink-900 leading-[1.16] md:leading-[1.08] tracking-[-0.03em]">
                找到適合 BB 的
                <span className="block">幼稚園</span>
              </h1>
              <p className="mt-4 md:mt-5 text-[15px] md:text-[14px] lg:text-[15px] xl:text-[15px] text-ink-700 leading-relaxed max-w-[560px] md:max-w-[330px] lg:max-w-[360px] xl:max-w-[390px]">
                全港 868 間 EDB 幼稚園・每日更新學位空缺・追蹤報名截止
              </p>
              <div className="mt-6 md:mt-7 flex flex-wrap items-center gap-3 md:gap-4">
                <Link
                  href="/kg"
                  className="inline-flex min-w-[190px] items-center justify-center gap-1.5 px-6 h-12 rounded-pill bg-brand-700 text-white text-base font-semibold hover:bg-brand-500 transition shadow-[0_12px_28px_rgba(30,82,56,0.18)]"
                >
                  立即搜尋幼稚園
                  <span aria-hidden>→</span>
                </Link>
              </div>
              <ul className="mt-5 max-w-[560px] md:max-w-[320px] lg:max-w-[350px] xl:max-w-[380px] flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-700">
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
          </div>
        </div>
      </div>
    </section>
  );
}
