"use client";

import Image from "next/image";
import { useState } from "react";
import { getAvatarColor } from "@/lib/utils";

interface SchoolAvatarProps {
  schoolId: string;
  schoolName: string;
  logoUrl?: string | null;
  schoolCode?: string | null;
  size?: "md" | "lg";
}

/**
 * Resolve the best logo URL:
 * 1. Use DB logo_url if available
 * 2. Try /logos/{school_code}.png as auto-fallback
 */
function resolveLogoCandidates(logoUrl?: string | null, schoolCode?: string | null): string[] {
  const candidates = [
    logoUrl ?? null,
    schoolCode ? `/logos/${schoolCode}.png` : null,
    schoolCode ? `/logos/${schoolCode}.svg` : null,
  ].filter((candidate): candidate is string => Boolean(candidate));

  return Array.from(new Set(candidates));
}

export function SchoolAvatar({
  schoolId,
  schoolName,
  logoUrl,
  schoolCode,
  size = "md",
}: SchoolAvatarProps) {
  const candidates = resolveLogoCandidates(logoUrl, schoolCode);
  const [logoIndex, setLogoIndex] = useState(0);
  const resolved = candidates[logoIndex] ?? null;
  const [showLogo, setShowLogo] = useState(candidates.length > 0);
  const firstChar = schoolName.trim().charAt(0);
  const colors = getAvatarColor(schoolId);

  const sizeClass = size === "lg" ? "w-16 h-16" : "w-12 h-12";
  const textSize = size === "lg" ? "text-xl" : "text-lg";

  return (
    <div className={`${sizeClass} shrink-0 rounded-full border border-slate-200 bg-white overflow-hidden`}>
      {showLogo && resolved ? (
        <div className="relative h-full w-full bg-white">
          <Image
            src={resolved}
            alt={`${schoolName} logo`}
            fill
            className="object-contain p-1.5"
            sizes={size === "lg" ? "64px" : "48px"}
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
          className={`flex h-full w-full items-center justify-center ${colors.bg}`}
        >
          <span className={`${textSize} font-semibold ${colors.text}`}>{firstChar}</span>
        </div>
      )}
    </div>
  );
}
