"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { PatternBackground } from "./visuals";

type SectionVariant =
  "default" | "highlight" | "gradient" | "glass" | "primary" | "surface";

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
  variant?: SectionVariant;
  fullWidth?: boolean;
  background?: ReactNode;
  padding?: "default" | "compact" | "spacious";
};

const paddingClasses = {
  default: "py-16 md:py-24",
  compact: "py-16 md:py-20",
  spacious: "py-24",
};

const variants: Record<SectionVariant, string> = {
  default: "bg-background text-text",
  highlight: "bg-gradient-primary text-white",
  primary: "bg-primary-600 text-white",
  surface: "bg-surface text-text",
  gradient:
    "bg-gradient-to-br from-background via-primary-50 to-surface text-text",
  glass: "bg-white/80 backdrop-blur-md text-text border-y border-primary-100",
};

export function Section({
  children,
  id,
  className,
  variant = "default",
  fullWidth = false,
  background,
  padding = "default",
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        paddingClasses[padding],
        variants[variant],
        className
      )}
    >
      {/* Standard Pattern Overlays */}
      {variant === "highlight" && (
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-petal" />
        </div>
      )}

      {variant === "gradient" && <PatternBackground opacity="opacity-5" />}

      {/* Custom Background Component */}
      {background}

      <div
        className={cn(
          "relative z-10 mx-auto px-6",
          fullWidth ? "w-full" : "max-w-7xl"
        )}
      >
        {children}
      </div>
    </section>
  );
}
