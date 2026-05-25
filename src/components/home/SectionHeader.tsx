import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

interface SectionHeaderProps {
  title: string;
  description?: string;
  href: string;
}

export function SectionHeader({ title, description, href }: SectionHeaderProps) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h2 className="flex items-center gap-2 text-h2 font-semibold leading-tight text-ink-900">
          <span className="inline-block h-6 w-1 rounded-pill bg-forest-700" />
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-body text-ink-500">{description}</p>
        ) : null}
      </div>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center gap-1 text-small font-semibold text-forest-700 transition-colors hover:text-forest-800 hover:underline"
      >
        查看更多
        <CaretRight aria-hidden="true" size={14} weight="bold" />
      </Link>
    </div>
  );
}
