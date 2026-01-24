import { cn } from "@/lib/utils";
import { type ReactNode, type HTMLAttributes } from "react";

type BadgeVariant = "solid" | "outline" | "soft";
type BadgeColor = "primary" | "success" | "warning" | "neutral";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  className?: string; // Escape hatch
}

const variants: Record<BadgeVariant, Record<BadgeColor, string>> = {
  solid: {
    primary: "bg-gradient-primary text-white shadow-lg",
    success: "bg-success text-white shadow-lg",
    warning: "bg-warning text-white shadow-lg",
    neutral: "bg-gray-900 text-white shadow-lg",
  },
  outline: {
    primary: "border-2 border-primary-500 text-primary-600",
    success: "border-2 border-success text-success",
    warning: "border-2 border-warning text-warning",
    neutral: "border-2 border-gray-500 text-gray-700",
  },
  soft: {
    primary: "bg-primary-50 text-primary-700 border border-primary-100",
    success: "bg-success/10 text-success border border-success/20",
    warning: "bg-warning/10 text-warning border border-warning/20",
    neutral: "bg-gray-100 text-gray-700 border border-gray-200",
  },
};

export function Badge({
  children,
  variant = "solid",
  color = "primary",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold transition-colors",
        variants[variant][color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
