"use client";

import { hasRealSchoolPhoto } from "@/lib/schools/schoolPhotoSources";
import { SchoolCardImage } from "./SchoolCardImage";

type SchoolPhotoVariant = "card" | "hero";

interface SchoolPhotoProps {
  schoolCode?: string | null;
  schoolName: string;
  schoolId?: string | number;
  logoUrl?: string | null;
  variant?: SchoolPhotoVariant;
  priority?: boolean;
}

const SCHOOL_CODE_PATTERN = /^\d{6}$/;

export function getSafeSchoolPhotoUrl(schoolCode?: string | null) {
  if (!schoolCode || !SCHOOL_CODE_PATTERN.test(schoolCode)) return null;
  if (!hasRealSchoolPhoto(schoolCode)) return null;
  return `/images/schools/${schoolCode}.webp`;
}

export function SchoolPhoto({
  schoolCode,
  schoolName,
  schoolId,
  logoUrl,
  variant = "card",
  priority = false,
}: SchoolPhotoProps) {
  const src = getSafeSchoolPhotoUrl(schoolCode);

  return (
    <div className={variant === "hero" ? "mb-6" : "mb-4"}>
      <SchoolCardImage
        imageUrl={src}
        logoUrl={logoUrl}
        schoolName={schoolName}
        schoolId={schoolId ?? schoolCode ?? schoolName}
        alt={`${schoolName} 學校圖片`}
        priority={priority}
      />
    </div>
  );
}
