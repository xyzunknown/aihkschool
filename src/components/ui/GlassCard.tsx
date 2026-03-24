import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = "", hoverable = false, onClick }: GlassCardProps) {
  return (
    <div
      className={`
        glass-card rounded-card p-7
        ${hoverable ? "cursor-pointer transition-all duration-200 ease-out hover:scale-[1.02]" : "transition-shadow duration-200"}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
