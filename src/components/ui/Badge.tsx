interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "active" | "success" | "warning" | "danger";
  size?: "default" | "sm";
  className?: string;
  onClick?: () => void;
}

const variants: Record<string, string> = {
  default: "bg-slate-100 text-slate-500 border-transparent",
  active: "bg-slate-950 text-white border-slate-950",
  success: "bg-emerald-50 text-emerald-700 border-transparent",
  warning: "bg-amber-50 text-amber-700 border-transparent",
  danger: "bg-red-50 text-red-700 border-transparent",
};

const sizes: Record<string, string> = {
  default: "px-3 py-1 text-xs",
  sm: "px-2 py-0.5 text-[11px]",
};

export function Badge({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-1 rounded-full font-medium border transition-colors whitespace-nowrap";

  const interactive = onClick
    ? "cursor-pointer hover:scale-[1.02] transition-transform"
    : "";

  const Tag = onClick ? "button" : "span";

  return (
    <Tag
      className={`${base} ${variants[variant]} ${sizes[size]} ${interactive} ${className}`}
      onClick={onClick}
      type={onClick ? "button" : undefined}
    >
      {children}
    </Tag>
  );
}
