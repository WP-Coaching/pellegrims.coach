"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { PatternBackground } from "./visuals";

type SectionVariant =
  | "default"
  | "highlight"
  | "gradient"
  | "glass"
  | "primary";

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
  variant?: SectionVariant;
  fullWidth?: boolean;
  background?: ReactNode;
};

const variants: Record<SectionVariant, string> = {
  default: "bg-background text-text",
  highlight: "bg-gradient-primary text-white",
  primary: "bg-primary-600 text-white",
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
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-16 md:py-24",
        variants[variant],
        className
      )}
    >
      {/* Standard Pattern Overlays */}
      {variant === "highlight" && (
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
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
