"use client";

import Image from "next/image";
import { useState } from "react";

interface SchoolAvatarProps {
  schoolId: string;
  schoolName: string;
  logoUrl?: string | null;
  size?: "md" | "lg";
}

export function SchoolAvatar({
  schoolId,
  schoolName,
  logoUrl,
  size = "md",
}: SchoolAvatarProps) {
  const [showLogo, setShowLogo] = useState(Boolean(logoUrl));
  void schoolId;
  const firstChar = schoolName.trim().charAt(0);

  const sizeClass = size === "lg" ? "w-16 h-16" : "w-12 h-12";

  return (
    <div className={`${sizeClass} shrink-0 rounded-full border border-slate-200 bg-white p-1.5`}>
      {showLogo && logoUrl ? (
        <div className="relative h-full w-full overflow-hidden rounded-full bg-white">
          <Image
            src={logoUrl}
            alt={`${schoolName} logo`}
            fill
            className="object-contain p-1.5"
            sizes={size === "lg" ? "64px" : "48px"}
            onError={() => setShowLogo(false)}
          />
        </div>
      ) : (
        <div
          className="flex h-full w-full items-center justify-center rounded-full bg-slate-100"
        >
          <span className="text-lg font-semibold text-slate-700">{firstChar}</span>
        </div>
      )}
    </div>
  );
}
