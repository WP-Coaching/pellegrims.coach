"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

// --- Spotlight Background System ---

interface SpotlightConfig {
  className: string;
}

interface SpotlightBackgroundProps {
  spotlights: SpotlightConfig[];
  wrapperClassName?: string;
  asFragment?: boolean;
}

export function SpotlightBackground({
  spotlights,
  wrapperClassName = "absolute inset-0 overflow-hidden",
  asFragment = false,
}: SpotlightBackgroundProps) {
  const content = spotlights.map((spotlight, index) => (
    <div key={index} className={spotlight.className} />
  ));

  if (asFragment) {
    return <>{content}</>;
  }

  return <div className={cn(wrapperClassName)}>{content}</div>;
}

// --- Common Background Patterns ---

export function ProjectsBackground() {
  return (
    <SpotlightBackground
      spotlights={[
        {
          className:
            "absolute top-1/4 -left-32 w-64 h-64 bg-primary-100 rounded-full opacity-30 blur-3xl",
        },
        {
          className:
            "absolute bottom-1/4 -right-32 w-64 h-64 bg-primary-200 rounded-full opacity-20 blur-3xl",
        },
      ]}
    />
  );
}

export function PatternBackground({
  opacity = "opacity-5",
}: {
  opacity?: string;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", opacity)}>
      <div className="absolute inset-0 bg-pattern-dots" />
    </div>
  );
}

export function TrainingHeroBackground() {
  return (
    <>
      <SpotlightBackground
        asFragment
        spotlights={[
          {
            className:
              "absolute -top-16 -left-16 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-30 animate-float",
          },
          {
            className:
              "absolute -bottom-16 -right-16 w-80 h-80 bg-primary-200 rounded-full blur-3xl opacity-20 animate-pulse-slow",
          },
        ]}
      />
      <div className="absolute top-1/4 left-1/4 h-16 w-16 animate-spin-slow rounded-full border-2 border-primary-400/30 opacity-50" />
      <div className="absolute right-1/3 bottom-1/4 h-12 w-12 animate-float rounded-lg bg-primary-500/20 backdrop-blur-xs" />
    </>
  );
}

// --- Decorative Elements ---

interface DecorationProps {
  className?: string;
  variant?: "blob" | "grid" | "gradient-fade" | "circle";
  color?: "primary" | "white";
}

export function Decoration({
  className,
  variant = "blob",
  color = "primary",
}: DecorationProps) {
  if (variant === "grid") {
    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-10",
          className
        )}
      >
        <div
          className={cn(
            "absolute inset-0",
            color === "white"
              ? "bg-pattern-grid-white"
              : "bg-pattern-grid-black"
          )}
        />
      </div>
    );
  }

  if (variant === "gradient-fade") {
    return (
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-t from-background to-transparent",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn("absolute rounded-full opacity-30 blur-3xl", className)}
    />
  );
}

export function FloatingDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* Spinning border decorative (restored) */}
      <div className="absolute top-1/4 left-1/4 h-32 w-32 animate-spin-slow rounded-full border-2 border-primary-400/20 opacity-30" />

      {/* Geanimeerde rechthoek (vorig ontbrekend vierkant, nu extra zichtbaar) */}
      <div className="absolute right-1/3 bottom-1/4 h-16 w-16 animate-float rounded-2xl bg-primary-200/40 backdrop-blur-md" />

      {/* Extra subtle decoration */}
      <div className="absolute right-1/4 bottom-1/3 h-24 w-24 animate-pulse rounded-lg bg-white/5 backdrop-blur-2xs" />
    </div>
  );
}

export function StoryDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* Blurred Blobs for atmosphere */}
      <div className="absolute top-0 -right-24 h-64 w-64 animate-pulse rounded-full bg-primary-50 opacity-40 blur-3xl" />
      <div className="absolute bottom-0 -left-24 h-64 w-64 animate-float rounded-full bg-primary-100 opacity-20 blur-3xl" />

      {/* Geanimeerde cirkel (top right of avatar) */}
      <div className="absolute top-10 -right-12 h-14 w-14 animate-float rounded-full bg-primary-100 opacity-80" />

      {/* Geanimeerde rechthoek (middle left, near quote) */}
      <div className="absolute top-1/2 -left-12 h-12 w-12 animate-pulse rounded-lg bg-primary-100 opacity-60" />

      {/* Spinning border decorative around avatar */}
      <div className="absolute top-32 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border-2 border-primary-200/30 opacity-20" />
    </div>
  );
}

// --- Animation Primitives ---

export function Pulse({
  children,
  className = "",
  scale = [1, 1.05, 1],
  duration = 2,
}: {
  children: ReactNode;
  className?: string;
  scale?: number[];
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{ scale }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
