"use client";

import Image from "next/image";
import { useState } from "react";
import { getAvatarColor } from "@/lib/utils";

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
  const avatarColor = getAvatarColor(schoolId);
  const firstChar = schoolName.trim().charAt(0);

  const sizeClass = size === "lg" ? "w-16 h-16" : "w-12 h-12";

  return (
    <div className={`relative ${sizeClass}`}>
      <div
        className={`absolute inset-0 rounded-full flex items-center justify-center ${avatarColor.bg}`}
      >
        <span className={`text-lg font-semibold ${avatarColor.text}`}>{firstChar}</span>
      </div>

      {showLogo && logoUrl && (
        <div className="absolute inset-0 rounded-full bg-white p-1.5 overflow-hidden">
          <Image
            src={logoUrl}
            alt={`${schoolName} logo`}
            fill
            className="object-contain p-1.5"
            sizes={size === "lg" ? "64px" : "48px"}
            onError={() => setShowLogo(false)}
          />
        </div>
      )}
    </div>
  );
}
