import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-50 border-b border-cream-200">
      {/* Single composed watercolor banner: left 40% empty cream for headline,
          right 60% has the family + window + skyline + corner leaves baked in */}
      <Image
        src="/brand/hero/hero-banner@2x.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover object-right select-none pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-28 lg:py-32">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 leading-[1.15] tracking-tight">
            找到適合孩子的幼稚園，
            <br />
            從這裡開始
          </h1>
          <p className="mt-6 text-base md:text-lg text-ink-700 leading-relaxed max-w-md">
            掌握幼稚園資訊、開放日及報名時間表，助你作出安心選擇。
          </p>
        </div>
      </div>
    </section>
  );
}
