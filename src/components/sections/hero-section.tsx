"use client";

import { motion } from "framer-motion";
import { TrainingPageBackground } from "@/components/sections/training-page-background";

type HeroSectionProps = {
  title: string;
  intro: string;
  locationText: string;
  locationSuffix: string;
  isVisible: boolean;
};

export function HeroSection({
  title,
  intro,
  locationText,
  locationSuffix,
  isVisible,
}: HeroSectionProps) {
  return (
    <motion.section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-ocean-50 via-white to-athletic-light pb-16 pt-36"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <TrainingPageBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
        <motion.h1
          className="mb-6 whitespace-pre-line font-display text-4xl font-extrabold text-athletic-dark sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="mb-6 text-lg leading-relaxed text-athletic-dark/80 md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {intro}
        </motion.p>
        <motion.p
          className="text-athletic-dark/70"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {locationText}{" "}
          <a
            href="https://maps.app.goo.gl/LLJVUopK1vmeFsZWA"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ocean-700 hover:underline"
          >
            Topsportbad Wezenberg
          </a>{" "}
          {locationSuffix}
        </motion.p>
      </div>
    </motion.section>
  );
}
