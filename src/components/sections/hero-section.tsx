"use client";

import { motion } from "framer-motion";
import { TrainingHeroBackground } from "@/components/ui/visuals";
import {
  PageHeroContainer,
  PageHeroContent,
  PageHeroTitle,
  PageHeroIntro,
  PageHeroLocation,
} from "@/components/ui/hero";

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
    <PageHeroContainer id="hero">
      <TrainingHeroBackground />

      <PageHeroContent>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <PageHeroTitle>{title}</PageHeroTitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <PageHeroIntro>{intro}</PageHeroIntro>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <PageHeroLocation>
            {locationText}{" "}
            <a
              href="https://maps.app.goo.gl/LLJVUopK1vmeFsZWA"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary-700 hover:underline"
            >
              Topsportbad Wezenberg
            </a>{" "}
            {locationSuffix}
          </PageHeroLocation>
        </motion.div>
      </PageHeroContent>
    </PageHeroContainer>
  );
}
