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
            message: "已收藏，要开启截止提醒吗？",
            action: { label: "开启", onClick: () => setShowReminderSheet(true) },
            secondaryAction: { label: "暂不", onClick: () => {} },
          });
        }
      } catch {
        setIsFavorited(false);
        showToast({ message: "收藏失败，请稍后重试" });
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
      showToast({ message: "操作失败" });
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
      showToast({ message: "提醒已开启" });
    } catch {
      showToast({ message: "设置提醒失败" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-8 pb-24">
      {/* School header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-small text-slate-400">
            {DISTRICT_LABELS[school.district as keyof typeof DISTRICT_LABELS]}
          </span>
          <SourceTag source={school.data_source as DataSource} />
        </div>
        <h1 className="text-h1 text-slate-950">{school.name_tc}</h1>
        {school.name_en && (
          <p className="text-body text-slate-400 mt-1">{school.name_en}</p>
        )}
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
        message="取消收藏后，已设置的截止提醒也将被删除。确定要取消吗？"
        confirmLabel="取消收藏"
        cancelLabel="保留"
        variant="danger"
      />
    </div>
  );
}
