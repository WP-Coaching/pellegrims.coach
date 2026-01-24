import { cn } from "@/lib/utils";
import { type ReactNode, type HTMLAttributes } from "react";

type IconWrapperSize = "sm" | "md" | "lg" | "xl";
type IconWrapperVariant = "solid" | "glass" | "outline" | "soft";

interface IconWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: IconWrapperSize;
  variant?: IconWrapperVariant;
  className?: string; // Escape hatch
}

const sizes: Record<IconWrapperSize, string> = {
  sm: "h-8 w-8 text-sm",
  md: "h-12 w-12 text-lg",
  lg: "h-16 w-16 text-2xl",
  xl: "h-20 w-20 text-3xl",
};

const variants: Record<IconWrapperVariant, string> = {
  solid: "bg-gradient-primary shadow-primary text-white",
  glass:
    "bg-white/20 backdrop-blur-sm shadow-lg text-white border border-white/30",
  outline: "border-2 border-primary-500 text-primary-600 bg-transparent",
  soft: "bg-primary-50 text-primary-600",
};

export function IconWrapper({
  children,
  size = "md",
  variant = "solid",
  className,
  ...props
}: IconWrapperProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full transition-transform hover:scale-105",
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
