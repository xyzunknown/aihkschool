import { GlassCard } from "@/components/ui/GlassCard";
import { SCHOOL_TYPE_LABELS, formatDateCN } from "@/lib/utils";
import type { School } from "@/types/database";

interface BasicInfoSectionProps {
  school: School;
}

export function BasicInfoSection({ school }: BasicInfoSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-label text-slate-400 uppercase mb-4">基本信息</h2>
      <GlassCard>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-label text-slate-400 uppercase mb-1">类型</div>
            <div className="text-body text-slate-900">
              {SCHOOL_TYPE_LABELS[school.school_type] ?? school.school_type}
            </div>
          </div>
          <div>
            <div className="text-label text-slate-400 uppercase mb-1">教学语言</div>
            <div className="text-body text-slate-900">
              {school.language_primary ?? "暂无"}
            </div>
          </div>
          <div>
            <div className="text-label text-slate-400 uppercase mb-1">时段</div>
            <div className="text-body text-slate-900">
              {school.session_type ?? "暂无"}
            </div>
          </div>
          <div>
            <div className="text-label text-slate-400 uppercase mb-1">电话</div>
            <div className="text-body text-slate-900">
              {school.phone ?? "暂无"}
            </div>
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
  );
}
