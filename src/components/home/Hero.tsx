import Image from "next/image";
import { CheckCircle, MapPin, Student, Bell } from "@phosphor-icons/react/dist/ssr";
import type { HomeBanner } from "@/types/homepage";
import { HeroSearchBar } from "@/components/home/HeroSearchBar";

const TRUST_POINTS = [
  { label: "868 間幼稚園", icon: Student },
  { label: "學額每日追蹤", icon: Bell },
  { label: "按地區快速比較", icon: MapPin },
];

export function Hero({ banners = [] }: { banners?: HomeBanner[] }) {
  const banner = banners[0] ?? null;
  const title = banner?.title_tc ?? "找到適合孩子的\n幼稚園";
  const subtitle = banner?.footer_note ?? "全港 868 間 EDB 幼稚園・每日更新學位空缺・追蹤報名截止";
  const imageSrc = banner?.image_src;
  const mobileImageSrc = imageSrc === "/brand/hero/bg.jpg"
    ? "/brand/hero/bg-mobile.jpg"
    : imageSrc;
  const imageAlt = banner?.image_alt ?? "維港水彩風景與小象助手陪伴家長搜尋幼稚園";

  return (
    <section className="bg-surface-page">
      <div className="mx-auto max-w-[1280px] px-5 pb-4 pt-8 md:px-10 md:pb-6 md:pt-10">
        <div className="relative min-h-[560px] overflow-hidden rounded-[28px] border border-surface-border bg-white shadow-card md:min-h-[520px]">
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

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(253,251,244,0.15)_0%,rgba(253,251,244,0.58)_72%,rgba(253,251,244,0.9)_100%)] md:hidden" />
          <div className="absolute inset-y-0 left-0 hidden w-[58%] bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.9)_58%,rgba(255,255,255,0)_100%)] md:block" />

          <div className="relative z-10 flex min-h-[560px] items-end px-5 pb-7 pt-8 md:min-h-[520px] md:items-center md:px-10 md:py-12 lg:px-12">
            <div className="w-full min-w-0 max-w-[610px] flex-none">
              <div className="mb-4 inline-flex items-center gap-2 rounded-pill border border-forest-100 bg-white/92 px-3 py-1.5 text-small font-semibold text-forest-700 shadow-soft">
                <CheckCircle aria-hidden="true" size={16} weight="regular" />
                香港家長的幼稚園搜尋平台
              </div>
              <h1 className="max-w-[12ch] text-[42px] font-bold leading-[1.1] text-ink-900 md:max-w-[520px] md:text-[56px]">
                {title.split("\n").map((line, index) => (
                  <span key={line || index} className={index > 0 ? "block" : undefined}>
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-5 max-w-[500px] text-body text-ink-700 md:text-[17px]">
                {subtitle}
              </p>
              <HeroSearchBar variant="hero" />
              <ul className="mt-5 grid gap-2 text-small text-ink-700 sm:grid-cols-3 md:max-w-[560px]">
                {TRUST_POINTS.map(({ label, icon: Icon }) => (
                  <li key={label} className="inline-flex min-h-10 items-center gap-2 rounded-pill border border-surface-border bg-white/92 px-3 shadow-soft">
                    <Icon aria-hidden="true" size={18} weight="regular" className="text-forest-700" />
                    {label}
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
