import Image from "next/image";
import { Check } from "lucide-react";
import type { HomeBanner } from "@/types/homepage";
import { HeroSearchBar } from "@/components/home/HeroSearchBar";

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
      <div className="mx-auto max-w-[1200px] px-5 pb-2 pt-8 md:px-8 md:pb-3 md:pt-10">
        <div className="relative min-h-[360px] overflow-hidden rounded-card border border-cream-200 bg-cream-50 shadow-soft md:min-h-[420px] lg:min-h-[460px]">
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

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,239,0.3)_0%,rgba(255,250,239,0.18)_100%)] md:hidden" />

          <div className="relative z-10 flex h-full items-start px-5 pb-7 pt-8 md:items-center md:px-8 md:py-10 lg:py-12">
            <div className="w-full min-w-0 max-w-[640px] flex-none rounded-card border border-white/70 bg-white/88 px-5 py-5 shadow-soft md:w-[460px] md:max-w-none md:px-7 md:py-7 lg:w-[500px] lg:px-8 lg:py-8 xl:w-[530px] 2xl:w-[560px]">
              <h1 className="max-w-[13ch] text-display font-semibold text-ink-900 md:max-w-[380px] lg:max-w-[410px] xl:max-w-[440px]">
                {title.split("\n").map((line, index) => (
                  <span key={line || index} className={index > 0 ? "block" : undefined}>{line}</span>
                ))}
              </h1>
              <p className="mt-4 max-w-[560px] text-body text-ink-800 md:mt-5 md:max-w-[330px] lg:max-w-[360px] xl:max-w-[390px]">
                {subtitle}
              </p>
              <HeroSearchBar variant="hero" />
              <ul className="mt-5 flex max-w-[560px] flex-wrap items-center gap-x-5 gap-y-2 text-small text-ink-700 md:max-w-[320px] lg:max-w-[350px] xl:max-w-[380px]">
                {TRUST_POINTS.map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <Check aria-hidden="true" size={16} strokeWidth={1.7} className="text-forest-600" />
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
