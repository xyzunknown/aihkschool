import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { formatDateCN } from "@/lib/utils";
import type { School } from "@/types/database";

interface OfficialLinksSectionProps {
  school: School;
}

interface OfficialLinkItem {
  label: string;
  href: string | null;
  updatedAt?: string | null;
}

function OfficialLinkRow({ item }: { item: OfficialLinkItem }) {
  if (!item.href) return null;

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-4 border-b border-surface-border py-3 text-sm last:border-0 hover:text-ink-900"
    >
      <span className="font-medium text-ink-800">{item.label}</span>
      <span className="flex shrink-0 items-center gap-2 text-right text-ink-500">
        {item.updatedAt ? formatDateCN(item.updatedAt) : "查看"}
        <ArrowSquareOut size={14} weight="regular" aria-hidden="true" />
      </span>
    </a>
  );
}

export function OfficialLinksSection({ school }: OfficialLinksSectionProps) {
  const items: OfficialLinkItem[] = [
    {
      label: "學校官方簡介",
      href: school.official_profile_url,
    },
    {
      label: "最新官方通知",
      href: school.official_notice_url,
      updatedAt: school.official_notice_updated_at,
    },
    {
      label: "評核 / 視學報告",
      href: school.inspection_report_url,
      updatedAt: school.inspection_report_updated_at,
    },
    {
      label: "收費證明書",
      href: school.fee_certificate_url,
      updatedAt: school.fee_certificate_updated_at,
    },
  ];

  const visibleItems = items.filter((item) => item.href);

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-ink-900">官方資料</h2>
      <GlassCard>
        <div>
          {visibleItems.map((item) => (
            <OfficialLinkRow key={item.label} item={item} />
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
