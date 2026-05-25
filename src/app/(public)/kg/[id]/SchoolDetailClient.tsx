"use client";

import { useEffect, useState } from "react";
import { ArrowSquareOut, CaretLeft } from "@phosphor-icons/react";
import { SourceTag } from "@/components/schools/SourceTag";
import { SchoolAvatar } from "@/components/schools/SchoolAvatar";
import { VacancySection } from "@/components/schools/VacancySection";
import { BasicInfoSection } from "@/components/schools/BasicInfoSection";
import { FeesSection } from "@/components/schools/FeesSection";
import { AdmissionsDetails, AdmissionsSection } from "@/components/schools/AdmissionsSection";
import { OfficialProfileSection } from "@/components/schools/OfficialProfileSection";
import { ReminderSheet } from "@/components/schools/ReminderSheet";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { DISTRICT_LABELS, formatEnglishSchoolName, isVacancyStale } from "@/lib/utils";
import type { School, Vacancy, DataSource } from "@/types/database";
import type { SchoolEnrichment } from "@/lib/db/schools";
import type { KgpOfficialProfile } from "@/lib/schools/kgpProfile";
import { useCompare } from "@/lib/hooks/useCompare";
import Link from "next/link";

async function getErrorMessage(response: Response, fallback: string) {
  try {
    const json = await response.json();
    return json?.error?.message || fallback;
  } catch {
    return fallback;
  }
}

interface Props {
  school: School;
  vacancy: Vacancy | null;
  enrichment: SchoolEnrichment | null;
  officialProfile: KgpOfficialProfile | null;
}

export function SchoolDetailClient({ school, vacancy, enrichment, officialProfile }: Props) {
  const { user, requireAuth } = useAuth();
  const { showToast } = useToast();
  const { addToCompare, removeFromCompare, isInCompare, canAdd } = useCompare();
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReminderSheet, setShowReminderSheet] = useState(false);
  const [showUnfavoriteConfirm, setShowUnfavoriteConfirm] = useState(false);

  const stale = vacancy ? isVacancyStale(vacancy.edb_published_date) : true;
  const displayNameEn = formatEnglishSchoolName(school.name_en?.trim() || school.name_tc);
  const hasChineseName = /[\u3400-\u9fff]/.test(school.name_tc);
  // 中文名存在 → 中文为主标题、英文为副标题
  // 无中文名 → 英文为主标题、若 name_tc 和 displayNameEn 不同则作为副标题
  const primaryName = hasChineseName ? school.name_tc : displayNameEn;
  const secondaryName = hasChineseName
    ? (displayNameEn !== school.name_tc ? displayNameEn : null)
    : (school.name_tc !== displayNameEn ? school.name_tc : null);

  // Check initial favorite status
  useEffect(() => {
    if (!user) return;
    const checkFavorite = async () => {
      try {
        const res = await fetch(`/api/favorites`);
        const json = await res.json();
        if (json.data) {
          const found = json.data.some(
            (f: { school_id: string }) => f.school_id === school.id
          );
          setIsFavorited(found);
        }
      } catch {
        // Silently fail — non-critical
      }
    };
    checkFavorite();
  }, [user, school.id]);

  const handleToggleFavorite = () => {
    if (isFavorited) {
      setShowUnfavoriteConfirm(true);
      return;
    }

    requireAuth(async () => {
      setIsFavorited(true);
      try {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ school_id: school.id }),
        });
        if (!res.ok) {
          const message = await getErrorMessage(res, "收藏失敗，請稍後再試");
          setIsFavorited(false);
          showToast({ message });
        } else {
          showToast({
            message: "已收藏，要開啟截止提醒嗎？",
            action: { label: "開啟", onClick: () => setShowReminderSheet(true) },
            secondaryAction: { label: "暫不", onClick: () => {} },
          });
        }
      } catch {
        setIsFavorited(false);
        showToast({ message: "收藏失敗，請稍後再試" });
      }
    });
  };

  const handleUnfavorite = async () => {
    setIsFavorited(false);
    try {
      const res = await fetch(`/api/favorites/${school.id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error(await getErrorMessage(res, "已取消收藏失敗"));
      }
      showToast({ message: "已取消收藏" });
    } catch (error: unknown) {
      setIsFavorited(true);
      showToast({ message: error instanceof Error ? error.message : "已取消收藏失敗" });
    }
  };

  const handleReminderConfirm = async (selectedDays: number[]) => {
    try {
      const res = await fetch(`/api/favorites/${school.id}/reminder`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reminder_enabled: true,
          reminder_days_before: selectedDays,
        }),
      });
      if (!res.ok) {
        throw new Error(await getErrorMessage(res, "設定提醒失敗"));
      }
      showToast({ message: "提醒已開啟" });
    } catch (error: unknown) {
      showToast({ message: error instanceof Error ? error.message : "設定提醒失敗" });
    }
  };

  const toggleCompare = () => {
    if (isInCompare(school.id)) {
      removeFromCompare(school.id);
    } else if (canAdd) {
      requireAuth(() => {
        addToCompare({ id: school.id, nameTc: school.name_tc, logoUrl: school.logo_url });
      });
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
      <Link
        href="/kg"
        className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700 transition-colors mb-6"
      >
        <CaretLeft size={16} weight="bold" aria-hidden="true" />
        返回搵學校
      </Link>

      <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-card border border-surface-border bg-white p-5 shadow-soft md:p-6">
          <div className="flex items-start gap-4">
            <SchoolAvatar
              schoolId={school.id}
              schoolName={primaryName}
              logoUrl={school.logo_url}
              schoolCode={school.school_code}
              size="lg"
              shape="rounded"
            />

            <div className="min-w-0 flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex h-7 items-center rounded-pill bg-forest-50 px-3 text-xs font-semibold text-forest-700">
                  {DISTRICT_LABELS[school.district as keyof typeof DISTRICT_LABELS]}
                </span>
                <span className="inline-flex h-7 items-center rounded-pill bg-cream-100 px-3 text-xs font-semibold text-ink-700">
                  {school.school_type === "international"
                    ? "國際"
                    : school.school_type === "private_independent"
                      ? "私立獨立"
                      : "非牟利"}
                </span>
                <SourceTag source={school.data_source as DataSource} />
              </div>
              <h1 className="text-2xl font-bold tracking-normal text-ink-900 md:text-3xl">{primaryName}</h1>
              {secondaryName && <p className="mt-2 text-base leading-relaxed text-ink-500">{secondaryName}</p>}
              {school.school_code && (
                <p className="mt-2 text-sm text-ink-500">學校編號：{school.school_code}</p>
              )}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleToggleFavorite}
              className={`inline-flex h-12 items-center justify-center rounded-pill px-5 text-sm font-semibold transition ${
                isFavorited
                  ? "bg-forest-700 text-white"
                  : "border border-forest-700 bg-white text-forest-700 hover:bg-forest-50"
              }`}
            >
              {isFavorited ? "已收藏" : "收藏"}
            </button>
            <button
              type="button"
              onClick={toggleCompare}
              className={`inline-flex h-12 items-center justify-center rounded-pill px-5 text-sm font-semibold transition ${
                isInCompare(school.id)
                  ? "bg-forest-700 text-white"
                  : "border border-forest-700 bg-white text-forest-700 hover:bg-forest-50"
              }`}
            >
              {isInCompare(school.id) ? "已加入對比" : "加入對比"}
            </button>
            {school.website && (
              <a
                href={school.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-1.5 rounded-pill bg-forest-700 px-5 text-sm font-semibold text-white hover:bg-forest-800"
              >
                學校官網
                <ArrowSquareOut size={16} weight="regular" aria-hidden="true" />
              </a>
            )}
          </div>
        </section>

        <VacancySection vacancy={vacancy} isStale={stale} />
      </div>

      <BasicInfoSection school={school} />
      <FeesSection school={school} />
      {officialProfile ? (
        <OfficialProfileSection
          profile={officialProfile}
          admissions={<AdmissionsDetails school={school} enrichment={enrichment} />}
        />
      ) : (
        <AdmissionsSection school={school} enrichment={enrichment} />
      )}

      <ReminderSheet
        isOpen={showReminderSheet}
        onClose={() => setShowReminderSheet(false)}
        onConfirm={handleReminderConfirm}
        schoolName={school.name_tc}
      />

      <ConfirmDialog
        isOpen={showUnfavoriteConfirm}
        onClose={() => setShowUnfavoriteConfirm(false)}
        onConfirm={handleUnfavorite}
        title="取消收藏"
        message="確定取消收藏？相關提醒將一併刪除。"
        confirmLabel="取消收藏"
        cancelLabel="保留"
        variant="danger"
      />
    </div>
  );
}
