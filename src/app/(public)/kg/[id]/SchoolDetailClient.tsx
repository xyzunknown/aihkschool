"use client";

import { useEffect, useState } from "react";
import { SourceTag } from "@/components/schools/SourceTag";
import { VacancySection } from "@/components/schools/VacancySection";
import { BasicInfoSection } from "@/components/schools/BasicInfoSection";
import { FeesSection } from "@/components/schools/FeesSection";
import { IntelSection } from "@/components/schools/IntelSection";
import { DetailBottomCTA } from "@/components/schools/DetailBottomCTA";
import { ReminderSheet } from "@/components/schools/ReminderSheet";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { DISTRICT_LABELS, isVacancyStale, deadlineStatus } from "@/lib/utils";
import type { School, Vacancy, AdmissionIntel, DataSource } from "@/types/database";

interface Props {
  school: School;
  vacancy: Vacancy | null;
  initialIntel: AdmissionIntel[];
  intelCount: number;
}

export function SchoolDetailClient({ school, vacancy, initialIntel, intelCount }: Props) {
  const { user, requireAuth } = useAuth();
  const { showToast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReminderSheet, setShowReminderSheet] = useState(false);
  const [showUnfavoriteConfirm, setShowUnfavoriteConfirm] = useState(false);

  const stale = vacancy ? isVacancyStale(vacancy.edb_published_date) : true;
  const dlStatus = vacancy ? deadlineStatus(vacancy.application_deadline) : null;

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
      {/* School header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
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
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">{school.name_tc}</h1>
        {school.name_en && (
          <p className="text-base text-slate-500 mt-1">{school.name_en}</p>
        )}
      </div>

      {/* Placeholder hero image */}
      <div className="aspect-video rounded-2xl bg-slate-100 mb-8 flex items-center justify-center">
        <span className="text-slate-400">教育機構圖片</span>
      </div>

      <VacancySection vacancy={vacancy} isStale={stale} deadlineStatus={dlStatus} />
      <BasicInfoSection school={school} />
      <FeesSection school={school} />
      <IntelSection schoolId={school.id} initialIntel={initialIntel} intelCount={intelCount} />

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
