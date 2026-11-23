"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Grid } from "./layout";
import { Text } from "./typography";
import { PatternBackground } from "./visuals";

export type SectionVariant =
  | "default"
  | "highlight"
  | "gradient"
  | "glass"
  | "primary"
  | "surface"
  | "accent"
  | "muted"
  | "dark"
  | "darkGradient";

type Props = {
  children: ReactNode;
  id?: string;
  "aria-labelledby"?: string;
  className?: string;
  variant?: SectionVariant;
  fullWidth?: boolean;
  contentWidth?: "6xl" | "7xl";
  background?: ReactNode;
  padding?: keyof typeof paddingClasses;
};

const paddingClasses = {
  default: "py-16 md:py-24",
  compact: "py-16 md:py-20",
  spacious: "py-24",
  hero: "pt-32 pb-14 sm:pt-40 sm:pb-20",
};

const variants: Record<SectionVariant, string> = {
  default: "bg-background text-text",
  highlight: "bg-gradient-primary text-white",
  primary: "bg-primary-600 text-white",
  surface: "bg-surface text-text",
  gradient:
    "bg-linear-to-br from-background via-primary-50 to-surface text-text",
  glass: "bg-white/80 backdrop-blur-md text-text border-y border-primary-100",
  accent: "bg-primary-50 text-text",
  muted: "border-t border-border bg-background text-text",
  dark: "bg-primary-950 text-white",
  darkGradient: "bg-linear-to-br from-athletic-dark to-primary-950 text-white",
};

export function Section({
  children,
  id,
  "aria-labelledby": labelledBy,
  className,
  variant = "default",
  fullWidth = false,
  contentWidth = "7xl",
  background,
  padding = "default",
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
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
          fullWidth && "w-full",
          !fullWidth &&
            (contentWidth === "6xl" ? "max-w-6xl lg:px-8" : "max-w-7xl")
        )}
      >
        {children}
      </div>
    </section>
  );
}

const sectionLayouts = {
  stack: { align: "start", gap: 8, className: "md:gap-12" },
  split: { align: "start", gap: 6, md: 2, className: "md:gap-14" },
  wideContent: { align: "start", gap: 6, md: 3, className: "md:gap-14" },
  media: { align: "center", md: 3, className: "gap-10 lg:gap-16" },
} as const;

export type SectionLayoutVariant = keyof typeof sectionLayouts;

export function SectionLayout({
  variant = "stack",
  children,
  secondary,
}: {
  variant?: SectionLayoutVariant;
  children: ReactNode;
  secondary?: ReactNode;
}) {
  return (
    <Grid {...sectionLayouts[variant]}>
      <div className={variant === "media" ? "md:col-span-2" : undefined}>
        {children}
      </div>
      {secondary && (
        <div
          className={cn(
            variant === "wideContent" && "md:col-span-2",
            variant === "media" &&
              "w-full max-w-52 sm:max-w-64 md:justify-self-end lg:max-w-72"
          )}
        >
          {secondary}
        </div>
      )}
    </Grid>
  );
}

export function SectionActions({
  children,
  note,
  inverted = false,
}: {
  children: ReactNode;
  note?: string;
  inverted?: boolean;
}) {
  return (
    <div className="mt-8">
      {children}
      {note && (
        <Text
          variant="small"
          color={inverted ? "primaryLight" : "muted"}
          className="mt-3 max-w-lg"
        >
          {note}
        </Text>
      )}
    </div>
  );
}
