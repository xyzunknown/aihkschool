import Image from "next/image";
import Link from "next/link";
import type { HomeBanner } from "@/types/homepage";

interface BannerSlideProps {
  banner: HomeBanner;
  isActive: boolean;
  isPriority: boolean;
}

function ClassicLayout({ banner }: { banner: HomeBanner }) {
  return (
    <>
      <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm text-white mb-4">
        {banner.is_ad ? "推廣" : banner.source_label}
      </span>
      <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-2">
        {banner.title_tc}
      </h2>
      {banner.subtitle_en && (
        <p className="text-sm md:text-base text-white/70 mb-4">
          {banner.subtitle_en}
        </p>
      )}
      {banner.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {banner.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-white/15 text-white/90"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        <Link
          href={banner.cta_primary.url}
          className="inline-flex items-center px-6 py-3 bg-white text-slate-950 rounded-xl text-sm font-medium hover:scale-[1.02] transition-transform"
        >
          {banner.cta_primary.label}
        </Link>
        {banner.cta_secondary && (
          <Link
            href={banner.cta_secondary.url}
            className="inline-flex items-center px-6 py-3 bg-white/15 text-white border border-white/30 rounded-xl text-sm font-medium hover:scale-[1.02] transition-transform"
          >
            {banner.cta_secondary.label}
          </Link>
        )}
      </div>
      {banner.footer_note && (
        <p className="text-xs text-white/50 mt-4">{banner.footer_note}</p>
      )}
    </>
  );
}

function EventLayout({ banner }: { banner: HomeBanner }) {
  return (
    <>
      <span className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold bg-white/20 backdrop-blur-sm text-white mb-4">
        {banner.tags[0] ?? banner.source_label}
      </span>
      <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-2">
        {banner.title_tc}
      </h2>
      {banner.subtitle_en && (
        <p className="text-base text-white/70 mb-6">{banner.subtitle_en}</p>
      )}
      <Link
        href={banner.cta_primary.url}
        className="inline-flex items-center px-6 py-3 bg-white text-slate-950 rounded-xl text-sm font-medium hover:scale-[1.02] transition-transform"
      >
        {banner.cta_primary.label}
      </Link>
    </>
  );
}

function MinimalLayout({ banner }: { banner: HomeBanner }) {
  return (
    <>
      <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
        {banner.title_tc}
      </h2>
      <Link
        href={banner.cta_primary.url}
        className="inline-flex items-center px-6 py-3 bg-white text-slate-950 rounded-xl text-sm font-medium hover:scale-[1.02] transition-transform"
      >
        {banner.cta_primary.label}
      </Link>
    </>
  );
}

export function BannerSlide({ banner, isActive, isPriority }: BannerSlideProps) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={banner.image_src}
          alt={banner.image_alt}
          fill
          className="object-cover animate-ken-burns"
          sizes="100vw"
          priority={isPriority}
        />
      </div>

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/40 to-transparent" />

      {/* Text content */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-5 md:px-8">
          <div className="max-w-lg">
            {banner.layout === "classic" && <ClassicLayout banner={banner} />}
            {banner.layout === "event" && <EventLayout banner={banner} />}
            {banner.layout === "minimal" && <MinimalLayout banner={banner} />}
          </div>
        </div>
      </div>
    </div>
  );
}
