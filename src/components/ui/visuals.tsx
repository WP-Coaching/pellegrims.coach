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
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
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
      <div className="border-primary-400/30 absolute left-1/4 top-1/4 h-16 w-16 animate-spin-slow rounded-full border-2 opacity-50" />
      <div className="bg-primary-500/20 absolute bottom-1/4 right-1/3 h-12 w-12 animate-float rounded-lg backdrop-blur-sm" />
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
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${color === "white" ? "ffffff" : "000000"}' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
    );
  }

  if (variant === "gradient-fade") {
    return (
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-background to-transparent",
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
      <div className="border-primary-400/20 absolute left-1/4 top-1/4 h-32 w-32 animate-spin-slow rounded-full border-2 opacity-30" />

      {/* Geanimeerde rechthoek (vorig ontbrekend vierkant, nu extra zichtbaar) */}
      <div className="bg-primary-200/40 absolute bottom-1/4 right-1/3 h-16 w-16 animate-float rounded-2xl backdrop-blur-md" />

      {/* Extra subtle decoration */}
      <div className="absolute bottom-1/3 right-1/4 h-24 w-24 animate-pulse rounded-lg bg-white/5 backdrop-blur-xs" />
    </div>
  );
}

export function StoryDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* Blurred Blobs for atmosphere */}
      <div className="absolute -right-24 top-0 h-64 w-64 animate-pulse rounded-full bg-primary-50 opacity-40 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-64 w-64 animate-float rounded-full bg-primary-100 opacity-20 blur-3xl" />

      {/* Geanimeerde cirkel (top right of avatar) */}
      <div className="absolute -right-12 top-10 h-14 w-14 animate-float rounded-full bg-primary-100 opacity-80" />

      {/* Geanimeerde rechthoek (middle left, near quote) */}
      <div className="absolute -left-12 top-1/2 h-12 w-12 animate-pulse rounded-lg bg-primary-100 opacity-60" />

      {/* Spinning border decorative around avatar */}
      <div className="border-primary-200/30 absolute left-1/2 top-[128px] h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border-2 opacity-20" />
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
