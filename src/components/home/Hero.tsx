import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-50 border-b border-cream-200">
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "url('/brand/decor/skyline-watercolor.png')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
        }}
      />
      <span className="leaf-decor leaf-decor-tl pointer-events-none" />
      <span className="leaf-decor leaf-decor-tr pointer-events-none" />

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

        <div className="relative h-64 md:h-[420px] flex items-end justify-center">
          {/* Faint city watercolor backdrop */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at center 70%, #DBE8DD 0%, transparent 60%)",
            }}
          />
          <Image
            src="/brand/hero/family.png"
            alt="開心嘅家庭一齊閱讀"
            width={520}
            height={520}
            sizes="(max-width: 768px) 80vw, 480px"
            className="relative z-10 max-h-full w-auto object-contain drop-shadow-sm"
            priority
          />
        </div>
      </div>
    </section>
  );
}
