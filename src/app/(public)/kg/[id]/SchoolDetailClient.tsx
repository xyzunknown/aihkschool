"use client";

import { useEffect, useState } from "react";
import { SourceTag } from "@/components/schools/SourceTag";
import { SchoolAvatar } from "@/components/schools/SchoolAvatar";
import { VacancySection } from "@/components/schools/VacancySection";
import { BasicInfoSection } from "@/components/schools/BasicInfoSection";
import { FeesSection } from "@/components/schools/FeesSection";
import { AdmissionsSection } from "@/components/schools/AdmissionsSection";
import { DetailBottomCTA } from "@/components/schools/DetailBottomCTA";
import { ReminderSheet } from "@/components/schools/ReminderSheet";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { DISTRICT_LABELS, formatEnglishSchoolName, isVacancyStale, deadlineStatus } from "@/lib/utils";
import type { School, Vacancy, DataSource } from "@/types/database";
import Link from "next/link";

interface Props {
  school: School;
  vacancy: Vacancy | null;
}

export function SchoolDetailClient({ school, vacancy }: Props) {
  const { user, requireAuth } = useAuth();
  const { showToast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReminderSheet, setShowReminderSheet] = useState(false);
  const [showUnfavoriteConfirm, setShowUnfavoriteConfirm] = useState(false);

  const stale = vacancy ? isVacancyStale(vacancy.edb_published_date) : true;
  const dlStatus = vacancy ? deadlineStatus(vacancy.application_deadline) : null;
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
        const json = await res.json();

        if (json.error) {
          setIsFavorited(false);
          showToast({ message: json.error.message });
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
      await fetch(`/api/favorites/${school.id}`, { method: "DELETE" });
      showToast({ message: "已取消收藏" });
    } catch {
      setIsFavorited(true);
      showToast({ message: "已取消收藏失敗" });
    }
  };

  const handleReminderConfirm = async (selectedDays: number[]) => {
    try {
      await fetch(`/api/favorites/${school.id}/reminder`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reminder_enabled: true,
          reminder_days_before: selectedDays,
        }),
      });
      showToast({ message: "提醒已開啟" });
    } catch {
      showToast({ message: "設定提醒失敗" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 pb-24">
      {/* Back link */}
      <Link
        href="/kg"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-6"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        返回搵學校
      </Link>

      {/* School header */}
      <div className="mb-8">
        <div className="flex items-start gap-4">
          <SchoolAvatar
            schoolId={school.id}
            schoolName={primaryName}
            logoUrl={school.logo_url}
            schoolCode={school.school_code}
            size="lg"
          />

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-small text-slate-400">
                {DISTRICT_LABELS[school.district as keyof typeof DISTRICT_LABELS]}
              </span>
              {school.school_code && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                  {school.school_code}
                </span>
              )}
              <SourceTag source={school.data_source as DataSource} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">{primaryName}</h1>
            {secondaryName && <p className="text-base text-slate-500 mt-1">{secondaryName}</p>}
          </div>
        </div>
      </div>

      <VacancySection vacancy={vacancy} isStale={stale} deadlineStatus={dlStatus} />
      <BasicInfoSection school={school} />
      <FeesSection school={school} />
      <AdmissionsSection school={school} />

      <DetailBottomCTA
        school={school}
        isFavorited={isFavorited}
        onToggleFavorite={handleToggleFavorite}
      />

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
