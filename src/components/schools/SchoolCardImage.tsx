"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { hasLocalSchoolLogoFile } from "@/lib/schools/schoolLogoSources";
import styles from "./SchoolCardImage.module.css";

type SchoolCardImageProps = {
  imageUrl?: string | null;
  logoUrl?: string | null;
  schoolName: string;
  schoolId: string | number;
  alt?: string;
  priority?: boolean;
};

const tints = [styles.tint0, styles.tint1, styles.tint2];

function hashSchoolId(schoolId: string | number) {
  return Array.from(String(schoolId)).reduce((hash, char) => hash + char.charCodeAt(0), 0);
}

function getTintClass(schoolId: string | number) {
  return tints[hashSchoolId(schoolId) % tints.length];
}

function getNameSizeClass(name: string) {
  const len = Array.from(name.trim()).length;

  if (len <= 6) return styles.nameShort;
  if (len <= 10) return styles.nameMedium;
  return styles.nameLong;
}

function getSchoolMonogram(name: string) {
  const chineseChars = Array.from(name).filter((char) => /[\u3400-\u9fff]/.test(char));

  if (chineseChars.length > 0) return chineseChars[0];

  const fallback = Array.from(name.trim()).filter((char) => /[A-Za-z0-9]/.test(char)).slice(0, 2).join("");
  return fallback || "學";
}

function resolveLogoUrl(logoUrl?: string | null) {
  const match = logoUrl?.match(/^\/logos\/(\d{6}\.(?:png|svg|webp))$/);
  return match && hasLocalSchoolLogoFile(match[1]) ? logoUrl : null;
}

function formatSchoolName(name: string) {
  const parts = name.split(/(?=（)/);

  if (parts.length === 1) return name;

  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {index > 0 ? <wbr /> : null}
      {part}
    </span>
  ));
}

export function SchoolCardImage({
  imageUrl,
  logoUrl,
  schoolName,
  schoolId,
  alt,
  priority = false,
}: SchoolCardImageProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const resolvedLogoUrl = useMemo(() => resolveLogoUrl(logoUrl), [logoUrl]);
  const showImage = Boolean(imageUrl && !imageFailed);
  const showLogo = Boolean(resolvedLogoUrl && !logoFailed);

  if (showImage && imageUrl) {
    return (
      <div className={styles.imageFrame} data-testid="school-card-image">
        <Image
          src={imageUrl}
          alt={alt ?? schoolName}
          fill
          unoptimized
          priority={priority}
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
          className={styles.realImage}
          onError={() => setImageFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`${styles.imageFrame} ${styles.placeholder} ${getTintClass(schoolId)}`}
      data-testid="school-card-image"
    >
      <div className={styles.arcTexture} />

      <div className={styles.content}>
        <div className={styles.logoBase}>
          {showLogo && resolvedLogoUrl ? (
            <Image
              src={resolvedLogoUrl}
              alt={`${schoolName} 校徽`}
              width={120}
              height={120}
              unoptimized
              priority={priority}
              className={styles.logo}
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <div className={styles.monogram}>
              {getSchoolMonogram(schoolName)}
            </div>
          )}
        </div>

        <div className={`${styles.schoolName} ${getNameSizeClass(schoolName)}`}>
          {formatSchoolName(schoolName)}
        </div>
      </div>

      <div className={styles.watermark} aria-hidden="true">
        <span className={styles.watermarkIcon} />
        <span>HKSchoolPlace</span>
      </div>
    </div>
  );
}

export { getNameSizeClass, getSchoolMonogram };
