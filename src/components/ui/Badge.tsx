interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "active" | "success" | "warning" | "danger";
  size?: "default" | "sm";
  className?: string;
  onClick?: () => void;
}

const variants: Record<string, string> = {
  default: "bg-white/70 text-slate-600 border-slate-200/50",
  active: "bg-slate-950 text-white border-slate-950",
  success: "bg-green-100/80 text-green-800 border-green-300/40",
  warning: "bg-orange-100/80 text-orange-800 border-orange-300/40",
  danger: "bg-red-100/80 text-red-800 border-red-300/40",
};

const sizes: Record<string, string> = {
  default: "px-3 py-1.5 text-xs",
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
    "inline-flex items-center gap-1 rounded-pill font-medium border transition-colors whitespace-nowrap";

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
