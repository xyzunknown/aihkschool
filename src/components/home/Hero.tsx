import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-50 border-b border-cream-200 min-h-[440px] md:min-h-[560px]">
      {/* Watercolor harbour banner — fills the full section */}
      <Image
        src="/brand/hero/bg@2x.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom select-none pointer-events-none"
      />
      {/* Soft cream wash on the left so headline stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(253,251,245,0.92) 0%, rgba(253,251,245,0.55) 35%, rgba(253,251,245,0) 60%)",
        }}
      />
      <span className="leaf-decor leaf-decor-tl pointer-events-none z-10" />
      <span className="leaf-decor leaf-decor-tr pointer-events-none z-10" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-ink-900 leading-tight tracking-tight">
            找到適合孩子的幼稚園，
            <br />
            從這裡開始
          </h1>
          <p className="mt-5 text-base md:text-lg text-ink-700 leading-relaxed max-w-md">
            掌握幼稚園資訊、開放日及報名時間表，助你作出安心選擇。
          </p>
        </div>

        <div className="relative h-64 md:h-[420px] flex items-end justify-end pr-4 md:pr-12">
          <Image
            src="/brand/hero/family@2x.png"
            alt="開心嘅家庭一齊閱讀"
            width={520}
            height={520}
            sizes="(max-width: 768px) 70vw, 460px"
            className="relative z-10 max-h-full w-auto object-contain drop-shadow-md"
            priority
          />
        </div>
      </div>
    </section>
  );
}
