"use client";

import { useState } from "react";
import { VacancyBadge } from "@/components/schools/VacancyBadge";
import { IntelCard } from "@/components/schools/IntelCard";
import { SourceTag } from "@/components/schools/SourceTag";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAuth } from "@/components/layout/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import {
  DISTRICT_LABELS,
  SCHOOL_TYPE_LABELS,
  isVacancyStale,
  formatDateCN,
  deadlineStatus,
} from "@/lib/utils";
import type { School, Vacancy, AdmissionIntel, DataSource, InterviewType, ApplicationResult } from "@/types/database";

interface Props {
  school: School;
  vacancy: Vacancy | null;
  initialIntel: AdmissionIntel[];
  intelCount: number;
}

export function SchoolDetailClient({ school, vacancy, initialIntel, intelCount }: Props) {
  const { requireAuth } = useAuth();
  const { showToast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false);
  const [allIntel, setAllIntel] = useState(initialIntel);
  const [showAllIntel, setShowAllIntel] = useState(false);

  const stale = vacancy ? isVacancyStale(vacancy.edb_published_date) : true;
  const dlStatus = vacancy ? deadlineStatus(vacancy.application_deadline) : null;

  const handleFavorite = () => {
    requireAuth(async () => {
      // Optimistic update
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
            action: { label: "开启", onClick: () => handleEnableReminder() },
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
    } catch {
      setIsFavorited(true);
    }
  };

  const handleEnableReminder = async () => {
    try {
      await fetch(`/api/favorites/${school.id}/reminder`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reminder_enabled: true,
          reminder_days_before: [7, 3, 1],
        }),
      });
      showToast({ message: "提醒已开启" });
    } catch {
      showToast({ message: "设置提醒失败" });
    }
  };

  const handleHelpful = async (intelId: string) => {
    requireAuth(async () => {
      try {
        await fetch(`/api/intel/${intelId}/helpful`, { method: "POST" });
        // Refresh intel data
        setAllIntel((prev) =>
          prev.map((item) =>
            item.id === intelId
              ? { ...item, helpful_count: item.helpful_count + 1 }
              : item
          )
        );
      } catch {
        showToast({ message: "操作失败" });
      }
    });
  };

  const loadAllIntel = async () => {
    try {
      const res = await fetch(`/api/intel/school/${school.id}?limit=100`);
      const json = await res.json();
      if (json.data) {
        setAllIntel(json.data);
        setShowAllIntel(true);
      }
    } catch {
      showToast({ message: "加载失败" });
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

      {/* Section 1: Vacancy */}
      <section className="mb-8">
        <h2 className="text-label text-slate-400 uppercase mb-4">学位空缺</h2>
        {vacancy ? (
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-900">
                {vacancy.academic_year} 学年
              </span>
              {vacancy.edb_published_date && (
                <span className="text-small text-slate-400">
                  更新于 {formatDateCN(vacancy.edb_published_date)}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <VacancyBadge grade="N" status={vacancy.n_vacancy} isStale={stale} />
              <VacancyBadge grade="K1" status={vacancy.k1_vacancy} isStale={stale} />
              <VacancyBadge grade="K2" status={vacancy.k2_vacancy} isStale={stale} />
              <VacancyBadge grade="K3" status={vacancy.k3_vacancy} isStale={stale} />
            </div>
            {stale && (
              <p className="mt-3 text-small text-slate-400">
                数据更新超过 30 天，建议直接联系学校确认。
              </p>
            )}
            {vacancy.application_deadline && dlStatus && dlStatus !== "past" && (
              <div className="mt-3 pt-3 border-t border-slate-200/20">
                <span className="text-sm text-slate-600">
                  申请截止：{formatDateCN(vacancy.application_deadline)}
                </span>
              </div>
            )}
          </GlassCard>
        ) : (
          <GlassCard>
            <p className="text-body text-slate-400">暂无空缺数据，建议直接联系学校。</p>
          </GlassCard>
        )}
      </section>

      {/* Section 2: Basic Info */}
      <section className="mb-8">
        <h2 className="text-label text-slate-400 uppercase mb-4">基本信息</h2>
        <GlassCard>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-label text-slate-400 uppercase mb-1">类型</div>
              <div className="text-body text-slate-900">{SCHOOL_TYPE_LABELS[school.school_type] ?? school.school_type}</div>
            </div>
            <div>
              <div className="text-label text-slate-400 uppercase mb-1">教学语言</div>
              <div className="text-body text-slate-900">{school.language_primary ?? "暂无"}</div>
            </div>
            <div>
              <div className="text-label text-slate-400 uppercase mb-1">时段</div>
              <div className="text-body text-slate-900">{school.session_type ?? "暂无"}</div>
            </div>
            <div>
              <div className="text-label text-slate-400 uppercase mb-1">电话</div>
              <div className="text-body text-slate-900">{school.phone ?? "暂无"}</div>
            </div>
            {school.address_tc && (
              <div className="col-span-2">
                <div className="text-label text-slate-400 uppercase mb-1">地址</div>
                <div className="text-body text-slate-900">{school.address_tc}</div>
              </div>
            )}
          </div>
          {school.last_verified_at && (
            <p className="text-small text-slate-400 mt-4 pt-3 border-t border-slate-200/20">
              最后核实于 {formatDateCN(school.last_verified_at)}
            </p>
          )}
        </GlassCard>
      </section>

      {/* Section 3: Fees */}
      <section className="mb-8">
        <h2 className="text-label text-slate-400 uppercase mb-4">学费</h2>
        <GlassCard>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-label text-slate-400 uppercase mb-1">月费</div>
              <div className="text-body text-slate-900">
                {school.fee_monthly_hkd !== null ? `HKD ${school.fee_monthly_hkd.toLocaleString()}` : "暂无"}
              </div>
            </div>
            <div>
              <div className="text-label text-slate-400 uppercase mb-1">年费</div>
              <div className="text-body text-slate-900">
                {school.fee_annual_hkd !== null ? `HKD ${school.fee_annual_hkd.toLocaleString()}` : "暂无"}
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Section 4: Intel */}
      <section className="mb-8">
        <h2 className="text-label text-slate-400 uppercase mb-4">
          申请情报 {intelCount > 0 && `(${intelCount})`}
        </h2>
        {allIntel.length > 0 ? (
          <div className="space-y-4">
            {allIntel.map((intel) => (
              <IntelCard
                key={intel.id}
                academicYear={intel.academic_year}
                gradeApplied={intel.grade_applied}
                interviewType={intel.interview_type as InterviewType}
                interviewLanguage={intel.interview_language}
                queueTime={intel.queue_time}
                hasSecondInterview={intel.has_second_interview}
                offerMonth={intel.offer_month}
                applicationResult={intel.application_result as ApplicationResult}
                notes={intel.notes}
                helpfulCount={intel.helpful_count}
                onHelpful={() => handleHelpful(intel.id)}
              />
            ))}
            {!showAllIntel && intelCount > 3 && (
              <button
                onClick={loadAllIntel}
                className="w-full text-center text-sm text-slate-500 hover:text-slate-700 py-3"
              >
                查看全部 {intelCount} 条情报
              </button>
            )}
          </div>
        ) : (
          <GlassCard>
            <p className="text-body text-slate-400 text-center">
              暂无面试情报，成为第一个分享经验的家长吧！
            </p>
            <div className="text-center mt-4">
              <Button variant="ghost" size="sm" onClick={() => window.location.href = "/submit"}>
                分享经验
              </Button>
            </div>
          </GlassCard>
        )}
      </section>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200/30 px-5 py-4 z-40">
        <div className="max-w-3xl mx-auto flex gap-3">
          {school.website ? (
            <a
              href={school.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="primary" className="w-full">
                前往官网申请
              </Button>
            </a>
          ) : school.phone ? (
            <a href={`tel:${school.phone}`} className="flex-1">
              <Button variant="primary" className="w-full">
                致电学校
              </Button>
            </a>
          ) : (
            <Button variant="primary" className="flex-1" disabled>
              暂无联系方式
            </Button>
          )}

          <Button
            variant={isFavorited ? "primary" : "secondary"}
            onClick={isFavorited ? handleUnfavorite : handleFavorite}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isFavorited ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {isFavorited ? "已收藏" : "收藏"}
          </Button>
        </div>
      </div>
    </div>
  );
}
