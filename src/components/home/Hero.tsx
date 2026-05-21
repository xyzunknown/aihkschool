import Image from "next/image";
import Link from "next/link";
import type { HomeBanner } from "@/types/homepage";

const TRUST_POINTS = ["資料齊全更新", "免費使用", "專為香港家長設計"];

export function Hero({ banners = [] }: { banners?: HomeBanner[] }) {
  const banner = banners[0] ?? null;
  const title = banner?.title_tc ?? "找到適合 BB 的\n幼稚園";
  const subtitle = banner?.footer_note ?? "全港 868 間 EDB 幼稚園・每日更新學位空缺・追蹤報名截止";
  const imageSrc = banner?.image_src;
  const mobileImageSrc = imageSrc === "/brand/hero/bg.jpg"
    ? "/brand/hero/bg-mobile.jpg"
    : imageSrc;
  const imageAlt = banner?.image_alt ?? "維港水彩風景與小象助手陪伴家長搜尋幼稚園";

  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 pt-8 pb-2 md:pt-10 md:pb-3">
        <div className="relative overflow-hidden rounded-[30px] min-h-[360px] md:min-h-[420px] lg:min-h-[460px] border border-[#F2E7CC] bg-[#FFF8E9] shadow-[0_20px_44px_rgba(143,111,43,0.08)]">
          <Image
            src={mobileImageSrc || "/brand/hero/bg-mobile.jpg"}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 768px) calc(100vw - 40px), 1px"
            className="object-cover object-center md:hidden"
          />
          <Image
            src={imageSrc || "/brand/hero/bg.jpg"}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 767px) 1px, (max-width: 1280px) calc(100vw - 64px), 1200px"
            className="hidden md:block object-cover object-right"
          />

          <Image
            src="/brand/mascot/02_elephant_wave_hero.png"
            alt="小象助手"
            width={680}
            height={680}
            priority
            sizes="340px"
            className="pointer-events-none absolute bottom-0 right-5 z-[5] hidden h-[300px] w-auto drop-shadow-[0_14px_24px_rgba(31,42,36,0.16)] md:block lg:right-10 lg:h-[340px]"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,239,0.3)_0%,rgba(255,250,239,0.18)_100%)] md:hidden" />

          <div className="relative z-10 h-full flex items-start md:items-center px-6 pt-8 pb-7 md:px-10 md:py-10 lg:px-12 lg:py-12">
            <div className="w-full min-w-0 max-w-[640px] md:w-[460px] lg:w-[500px] xl:w-[530px] 2xl:w-[560px] md:max-w-none flex-none rounded-[28px] bg-white/80 md:bg-white/50 backdrop-blur-[2px] border border-white/55 shadow-[0_10px_30px_rgba(143,111,43,0.06)] px-5 py-5 md:pl-7 md:pr-6 md:py-7 lg:pl-8 lg:pr-7 lg:py-8 xl:pr-7">
              <h1 className="max-w-[13ch] md:max-w-[380px] lg:max-w-[410px] xl:max-w-[440px] text-[34px] md:text-[38px] lg:text-[42px] xl:text-[46px] font-semibold text-ink-900 leading-[1.16] md:leading-[1.08] tracking-[-0.03em]">
                {title.split("\n").map((line, index) => (
                  <span key={line || index} className={index > 0 ? "block" : undefined}>{line}</span>
                ))}
              </h1>
              <p className="mt-4 md:mt-5 text-[15px] md:text-[14px] lg:text-[15px] xl:text-[15px] text-ink-700 leading-relaxed max-w-[560px] md:max-w-[330px] lg:max-w-[360px] xl:max-w-[390px]">
                {subtitle}
              </p>
              <div className="mt-6 md:mt-7 flex flex-wrap items-center gap-3 md:gap-4">
                <Link
                  href={banner?.cta_primary.url ?? "/kg"}
                  className="inline-flex min-w-[190px] items-center justify-center gap-1.5 px-6 h-12 rounded-pill bg-brand-700 text-white text-base font-semibold hover:bg-brand-500 transition shadow-[0_12px_28px_rgba(30,82,56,0.18)]"
                >
                  {banner?.cta_primary.label ?? "立即搜尋幼稚園"}
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
