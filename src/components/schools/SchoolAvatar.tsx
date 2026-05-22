"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getAvatarColor } from "@/lib/utils";
import { hasLocalSchoolLogoFile } from "@/lib/schools/schoolLogoSources";

interface SchoolAvatarProps {
  schoolId: string;
  schoolName: string;
  logoUrl?: string | null;
  schoolCode?: string | null;
  size?: "sm" | "md" | "lg";
  shape?: "circle" | "rounded";
}

function resolveLogoCandidates(
  logoUrl?: string | null,
  schoolCode?: string | null,
): string[] {
  const match = logoUrl?.match(/^\/logos\/(\d{6}\.(?:png|svg|webp))$/);
  const safeLocalLogo = match && (!schoolCode || match[1].startsWith(schoolCode)) && hasLocalSchoolLogoFile(match[1])
    ? logoUrl
    : null;
  // Raster formats first: a real bitmap logo should win over any same-code
  // SVG, so a stray placeholder SVG can never shadow a real logo again.
  const codeCandidates = schoolCode
    ? [`${schoolCode}.png`, `${schoolCode}.webp`, `${schoolCode}.svg`]
        .filter(hasLocalSchoolLogoFile)
        .map((fileName) => `/logos/${fileName}`)
    : [];

  return Array.from(new Set([safeLocalLogo, ...codeCandidates].filter((value): value is string => Boolean(value))));
}

export function SchoolAvatar({
  schoolId,
  schoolName,
  logoUrl,
  schoolCode,
  size = "md",
  shape = "circle",
}: SchoolAvatarProps) {
  const candidates = useMemo(() => resolveLogoCandidates(logoUrl, schoolCode), [logoUrl, schoolCode]);
  const [logoIndex, setLogoIndex] = useState(0);
  const resolved = candidates[logoIndex] ?? null;
  const [showLogo, setShowLogo] = useState(candidates.length > 0);
  const firstChar = schoolName.trim().charAt(0);
  const colors = getAvatarColor(schoolId);

  const sizeClass = size === "lg" ? "h-16 w-16" : size === "sm" ? "h-10 w-10" : "h-12 w-12";
  const textSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-lg" : "text-xl";
  const shapeClass = shape === "rounded" ? "rounded-[12px]" : "rounded-full";

  useEffect(() => {
    setLogoIndex(0);
    setShowLogo(candidates.length > 0);
  }, [candidates]);

  return (
    <div className={`${sizeClass} ${shapeClass} shrink-0 overflow-hidden border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08)]`}>
      {showLogo && resolved ? (
        <div className="relative h-full w-full bg-white">
          <Image
            src={resolved}
            alt={`${schoolName} logo`}
            fill
            className="object-contain p-[5px]"
            sizes={size === "lg" ? "64px" : size === "sm" ? "40px" : "48px"}
            onError={() => {
              if (logoIndex < candidates.length - 1) {
                setLogoIndex((current) => current + 1);
                return;
              }

              setShowLogo(false);
            }}
          />
        </div>
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-slate-50"
        >
          <span className={`flex h-full w-full items-center justify-center ${textSize} font-semibold ${colors.text}`}>
            {firstChar}
          </span>
        </div>
      )}
    </div>
  );
}
