"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Heading, Text } from "./typography";
import { motion } from "framer-motion";

// --- Full Screen / Dark Hero ---

export function HeroContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div className="relative flex h-screen min-h-[500px] w-full items-center justify-center pt-20">
        {children}
      </div>
    </section>
  );
}

export function HeroBackground({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 z-0", className)}>
      {children}
      {/* The exact original overlays from origin/main */}
      <div className="absolute inset-0 bg-gradient-dark opacity-60" />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

export function HeroContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative z-10 mx-auto max-w-6xl px-6 text-center",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform">
      <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/60">
        <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-white/60" />
      </div>
    </div>
  );
}

// --- Page / Light Hero ---

export function PageHeroContainer({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-background pb-16 pt-36",
        className
      )}
    >
      {children}
    </section>
  );
}

export function PageHeroTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Heading
      level="h1"
      align="center"
      className={cn(
        "mb-6 whitespace-pre-line font-display font-extrabold text-text sm:text-5xl md:text-6xl lg:text-7xl",
        className
      )}
    >
      {children}
    </Heading>
  );
}

export function PageHeroIntro({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Text
      variant="lead"
      align="center"
      className={cn(
        "text-text/80 mb-6 text-lg leading-relaxed md:text-xl",
        className
      )}
    >
      {children}
    </Text>
  );
}

export function PageHeroLocation({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Text align="center" className={cn("text-text/70", className)}>
      {children}
    </Text>
  );
}

export function PageHeroContent({
  title,
  intro,
  location,
}: {
  title: ReactNode;
  intro?: ReactNode;
  location?: ReactNode;
}) {
  return (
    <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <PageHeroTitle>{title}</PageHeroTitle>
      </motion.div>

      {intro && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <PageHeroIntro>{intro}</PageHeroIntro>
        </motion.div>
      )}

      {location && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6"
        >
          <PageHeroLocation>{location}</PageHeroLocation>
        </motion.div>
      )}
    </div>
  );
}
