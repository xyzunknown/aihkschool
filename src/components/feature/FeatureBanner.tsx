"use client";

import Image from "next/image";
import Link from "next/link";

interface FeatureBannerAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface FeatureBannerStat {
  label: string;
  value: string;
}

interface FeatureBannerProps {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  stats?: FeatureBannerStat[];
  actions: FeatureBannerAction[];
  imagePosition?: string;
}

export function FeatureBanner({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  stats,
  actions,
  imagePosition = "72% center",
}: FeatureBannerProps) {
  const hasStats = Boolean(stats?.length);

  return (
    <section className="relative overflow-hidden border-b border-surface-border bg-cream-50">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(253,251,245,0.99)_0%,rgba(253,251,245,0.90)_34%,rgba(253,251,245,0.20)_62%,rgba(253,251,245,0)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(253,251,245,0.92)_0%,rgba(253,251,245,0.34)_46%,rgba(253,251,245,0.86)_100%)] md:hidden" />
      </div>

      <div className="relative mx-auto flex h-[168px] max-w-7xl items-center px-5 py-4 md:h-auto md:min-h-[360px] md:px-8 md:py-12">
        <div className="w-full max-w-[640px]">
          <p className="mb-2 inline-flex h-6 items-center rounded-pill border border-forest-200 bg-white/86 px-3 text-[11px] font-semibold text-forest-700 shadow-soft md:mb-3 md:h-8 md:px-4 md:text-xs">
            {eyebrow}
          </p>
          <h1 className="max-w-[12ch] text-[24px] font-bold leading-[1.1] text-ink-900 md:max-w-none md:text-[48px]">
            {title}
          </h1>
          <p className="mt-2 max-w-[290px] text-[13px] font-medium leading-5 text-ink-700 md:mt-4 md:max-w-[620px] md:text-lg md:leading-7">
            {description}
          </p>

          {hasStats && (
            <div className="mt-6 hidden flex-wrap gap-2.5 md:flex">
              {(stats ?? []).map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-button border border-white/80 bg-white/84 px-3.5 py-2 shadow-soft"
                >
                  <p className="text-[11px] font-semibold text-ink-500">{stat.label}</p>
                  <p className="mt-0.5 text-sm font-bold text-ink-900">{stat.value}</p>
                </div>
              ))}
            </div>
          )}

          <div className={`mt-3 hidden flex-wrap items-center gap-2.5 md:flex md:gap-3 ${hasStats ? "md:mt-6" : "md:mt-7"}`}>
            {actions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={
                  action.variant === "secondary"
                    ? "inline-flex h-9 items-center justify-center rounded-pill border border-forest-200 bg-white/88 px-4 text-xs font-semibold text-forest-700 shadow-soft transition hover:bg-white md:h-11 md:px-5 md:text-sm"
                    : "inline-flex h-9 items-center justify-center rounded-pill bg-forest-700 px-4 text-xs font-semibold text-white shadow-card transition hover:bg-forest-800 md:h-11 md:px-5 md:text-sm"
                }
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
