import { GlassCard } from "@/components/ui/GlassCard";
import type { School } from "@/types/database";

interface FeesSectionProps {
  school: School;
}

function formatCurrency(value: number) {
  return `HK$${value.toLocaleString()}`;
}

const CLASS_HEADERS = ["幼兒 3-4 歲", "低班 4-5 歲", "高班 5-6 歲"] as const;
const ROW_LABELS = ["上午班", "下午班", "全日班"] as const;

type FeeRow = {
  label: string;
  values: string[];
};

type ParsedFeeBlock = {
  lead: string[];
  table: { headers: string[]; rows: FeeRow[] } | null;
};

function normalizeText(text: string) {
  return text.replace(/\r\n?/g, "\n").replace(/\u00a0/g, " ").trim();
}

function splitSegments(text: string) {
  return text
    .split(/\n+/)
    .flatMap((line) => line.split(/\s\/\s/))
    .map((part) => part.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function parseDelimitedTable(text: string): ParsedFeeBlock | null {
  if (!text.includes("|")) return null;
  const leadIndex = text.indexOf(CLASS_HEADERS[0]);
  if (leadIndex === -1) return null;

  const lead = splitSegments(text.slice(0, leadIndex));
  const tableText = text.slice(leadIndex).trim();
  const tokens = tableText.split(/\s*\|{1,2}\s*/).map((part) => part.trim()).filter(Boolean);

  if (tokens.length < 7) return null;
  if (CLASS_HEADERS.some((header, index) => tokens[index] !== header)) return null;

  const rows: FeeRow[] = [];
  for (let i = CLASS_HEADERS.length; i < tokens.length; i += 4) {
    const label = tokens[i];
    const values = tokens.slice(i + 1, i + 4);
    if (!label || values.length === 0) continue;
    rows.push({
      label,
      values: values.map((value) => value || "—"),
    });
  }

  if (!rows.length) return null;

  return {
    lead,
    table: {
      headers: [...CLASS_HEADERS],
      rows,
    },
  };
}

function extractValues(segment: string) {
  const values = segment.match(/(?:HK\$|\$)\s?\d[\d,]*(?:\(\d+\))?|免費|[—–-]{1,3}/g);
  return values?.length ? values.map((value) => value.trim()) : [];
}

function parseCompactTable(text: string): ParsedFeeBlock | null {
  const leadIndex = text.indexOf(CLASS_HEADERS[0]);
  if (leadIndex === -1) return null;

  const lead = splitSegments(text.slice(0, leadIndex));
  const tableText = text.slice(leadIndex);
  const rows: FeeRow[] = [];
  let rowStart = -1;

  for (let i = 0; i < ROW_LABELS.length; i++) {
    const label = ROW_LABELS[i];
    const start = tableText.indexOf(label);
    if (start === -1) continue;

    if (rowStart !== -1 && start <= rowStart) continue;

    const nextLabel = ROW_LABELS.slice(i + 1)
      .map((next) => tableText.indexOf(next, start + label.length))
      .filter((idx) => idx !== -1)
      .sort((a, b) => a - b)[0];
    const segment = tableText.slice(start + label.length, nextLabel ?? tableText.length);
    const values = extractValues(segment);

    if (values.length === 0) continue;

    rows.push({
      label,
      values: values.slice(0, CLASS_HEADERS.length),
    });
    rowStart = start;
  }

  if (!rows.length) return null;

  return {
    lead,
    table: {
      headers: [...CLASS_HEADERS],
      rows,
    },
  };
}

function parseFeeBlock(text: string): ParsedFeeBlock {
  const normalized = normalizeText(text);
  return parseDelimitedTable(normalized) ?? parseCompactTable(normalized) ?? {
    lead: splitSegments(normalized),
    table: null,
  };
}

function FeeNarrative({ title, text }: { title: string; text: string }) {
  const parsed = parseFeeBlock(text);

  return (
    <div>
      <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">{title}</div>
      <div className="space-y-3">
        {parsed.lead.length > 0 && (
          <div className="space-y-2">
            {parsed.lead.map((segment) => (
              <p key={segment} className="text-sm text-slate-900 leading-relaxed break-words">
                {segment}
              </p>
            ))}
          </div>
        )}

        {parsed.table && (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-slate-500">班別</th>
                  {parsed.table.headers.map((header) => (
                    <th key={header} className="px-3 py-2 text-left font-medium text-slate-500 whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsed.table.rows.map((row) => (
                  <tr key={row.label} className="border-t border-slate-100">
                    <th className="px-3 py-2 text-left font-medium text-slate-900 whitespace-nowrap bg-white">
                      {row.label}
                    </th>
                    {parsed.table?.headers.map((header, index) => (
                      <td key={header} className="px-3 py-2 text-slate-900 whitespace-nowrap bg-white">
                        {row.values[index] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export function FeesSection({ school }: FeesSectionProps) {
  const hasMonthlyFee = school.fee_monthly_hkd !== null;
  const hasAnnualFee = school.fee_annual_hkd !== null;
  const hasApplicationFee = school.application_fee_hkd !== null;
  const hasRegistrationFee = school.registration_fee_hkd !== null;
  const hasOtherFeesNote = Boolean(school.other_fees_note || school.fee_notes);
  const showKepStatus = school.school_type !== "international";

  if (!showKepStatus && !hasMonthlyFee && !hasAnnualFee && !hasApplicationFee && !hasRegistrationFee && !hasOtherFeesNote) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-950 mb-4">學費及各項收費</h2>
        <GlassCard>
          <p className="text-base text-slate-900">
            暫無學費資料，請瀏覽學校官網查詢。
          </p>
        </GlassCard>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-slate-950 mb-4">學費及各項收費</h2>
      <GlassCard>
        <table className="w-full text-sm">
          <tbody>
            {showKepStatus && (
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-0 py-3 text-slate-900">資助計劃</td>
                <td className="px-4 py-3 text-right text-slate-900 font-medium">
                  {school.kep_participant ? "已參加幼稚園教育計劃" : "未參加幼稚園教育計劃"}
                </td>
              </tr>
            )}
            {(hasMonthlyFee || hasAnnualFee) && (
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-0 py-3 text-slate-900">學費</td>
                <td className="px-4 py-3 text-right text-slate-900 font-medium">
                  {[
                    hasMonthlyFee ? `每月 ${formatCurrency(school.fee_monthly_hkd!)}` : null,
                    hasAnnualFee ? `全年 ${formatCurrency(school.fee_annual_hkd!)}` : null,
                  ].filter(Boolean).join(" / ")}
                </td>
              </tr>
            )}
            {hasApplicationFee && (
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-0 py-3 text-slate-900">報名費</td>
                <td className="px-4 py-3 text-right text-slate-900 font-medium">
                  {formatCurrency(school.application_fee_hkd!)}
                </td>
              </tr>
            )}
            {hasRegistrationFee && (
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-0 py-3 text-slate-900">留位費</td>
                <td className="px-4 py-3 text-right text-slate-900 font-medium">
                  {formatCurrency(school.registration_fee_hkd!)}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {hasOtherFeesNote && (
          <div className="mt-4 space-y-3 border-t border-slate-200 pt-4">
            {school.fee_notes && (
              <FeeNarrative title="官網費用摘要" text={school.fee_notes} />
            )}
            {school.other_fees_note && (
              <FeeNarrative title="其他收費" text={school.other_fees_note} />
            )}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500 leading-relaxed">
            註：學費、報名費、留位費及其他收費以學校最新官方公布為準。
          </p>
        </div>
      </GlassCard>
    </section>
  );
}
