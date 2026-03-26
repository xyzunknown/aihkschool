"use client";

import { useState, useEffect, useCallback } from "react";
import { BannerSlide } from "./BannerSlide";
import type { HomeBanner } from "@/types/homepage";

interface BannerCarouselProps {
  banners: HomeBanner[];
}

export function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = banners.length;

  const goToNext = useCallback(() => {
    if (count <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % count);
  }, [count]);

  // Auto-rotate every 8 seconds
  useEffect(() => {
    if (count <= 1 || isPaused) return;
    const timer = setInterval(goToNext, 8000);
    return () => clearInterval(timer);
  }, [count, isPaused, goToNext]);

  return (
    <div
      className="relative aspect-[4/3] md:aspect-[16/7] rounded-2xl overflow-hidden bg-slate-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {banners.map((banner, index) => (
        <BannerSlide
          key={banner.id}
          banner={banner}
          isActive={index === currentIndex}
          isPriority={index === 0}
        />
      ))}

      {/* Dot navigation — only show if multiple banners */}
      {count > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`跳至第 ${index + 1} 張`}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
