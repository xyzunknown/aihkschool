"use client";

import Image from "next/image";
import { useState } from "react";
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

function isLowLegibilityLogo(schoolName: string, schoolCode?: string | null): boolean {
  const lowLegibilityNames = [
    "香港中文大學校友會聯會",
    "遵道幼稚園",
  ];
  const lowLegibilityCodes = new Set(["560740", "597384", "600377", "158887"]);

  return (
    lowLegibilityNames.some((name) => schoolName.includes(name)) ||
    Boolean(schoolCode && lowLegibilityCodes.has(schoolCode))
  );
}

function resolveLogoCandidates(
  schoolName: string,
  logoUrl?: string | null,
  schoolCode?: string | null,
): string[] {
  if (isLowLegibilityLogo(schoolName, schoolCode)) return [];

  const match = logoUrl?.match(/^\/logos\/(\d{6}\.(?:png|svg|webp))$/);
  const safeLocalLogo = match && schoolCode && match[1].startsWith(schoolCode) && hasLocalSchoolLogoFile(match[1])
    ? logoUrl
    : null;

  return safeLocalLogo ? [safeLocalLogo] : [];
}

export function SchoolAvatar({
  schoolId,
  schoolName,
  logoUrl,
  schoolCode,
  size = "md",
  shape = "circle",
}: SchoolAvatarProps) {
  const candidates = resolveLogoCandidates(schoolName, logoUrl, schoolCode);
  const [logoIndex, setLogoIndex] = useState(0);
  const resolved = candidates[logoIndex] ?? null;
  const [showLogo, setShowLogo] = useState(candidates.length > 0);
  const firstChar = schoolName.trim().charAt(0);
  const colors = getAvatarColor(schoolId);

  const sizeClass = size === "lg" ? "w-16 h-16" : size === "sm" ? "w-[38px] h-[38px]" : "w-12 h-12";
  const textSize = size === "lg" ? "text-xl" : size === "sm" ? "text-base" : "text-lg";
  const shapeClass = shape === "rounded" ? "rounded-[10px]" : "rounded-full";

  return (
    <div className={`${sizeClass} ${shapeClass} shrink-0 border border-slate-200 bg-white overflow-hidden`}>
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
