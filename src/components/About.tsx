"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AthleticButton } from "@/components/ui/athletic-button";
import { ArrowRightIcon } from "@/components/icons";
import { StatCard } from "@/components/ui/stat-card";
import {
  getYearsOfExperienceString,
  getExperienceText,
} from "@/lib/experience";
import { ATHLETE_COUNTS } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

export default function About({ locale, t }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("about");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative overflow-hidden">
      {/* Dynamic Hero Section */}
      <div className="relative flex h-screen min-h-[500px] w-full items-center justify-center pt-20">
        {/* Background Image with Parallax Effect */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: isVisible ? 1 : 1.1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/images/banner_1920.jpg"
            alt={t.about.bannerAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-athletic opacity-60"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </motion.div>

        {/* Animated Geometric Elements - Optimized CSS animations */}
        <div className="absolute left-1/4 top-1/4 h-32 w-32 animate-spin rounded-full border-2 border-ocean-400/30 opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 h-24 w-24 animate-pulse rounded-lg bg-ocean-500/20 backdrop-blur-sm"></div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Lightweight inline promo above hero text - pill style */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mb-6 flex justify-center"
            >
              <div className="inline-flex items-center gap-3 rounded-full bg-white/20 px-3.5 py-2 text-sm text-white backdrop-blur-sm md:text-base">
                <span className="font-display font-semibold">
                  {locale === "en"
                    ? "Extra group swim training on Tuesday"
                    : "Extra groepstraining zwemmen op dinsdag"}
                </span>
                <a href={`/${locale}/groepen/winter-2026-dinsdag`}>
                  <AthleticButton
                    size="md"
                    className="!rounded-full !px-4 !py-2 font-semibold"
                  >
                    {locale === "en" ? "Learn more" : "Meer info"}
                    <ArrowRightIcon size={16} className="ml-1" />
                  </AthleticButton>
                </a>
              </div>
            </motion.div>
            <motion.p
              className="mb-6 font-display text-5xl font-black leading-tight text-white md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.4,
                type: "spring",
                stiffness: 100,
              }}
            >
              Ward Pellegrims
            </motion.p>

            <motion.p
              className="mx-auto mb-8 max-w-3xl text-xl font-medium text-ocean-100 md:text-2xl lg:text-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t.about.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <AthleticButton
                onClick={() =>
                  document
                    .getElementById("story")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                size="lg"
              >
                {t.about.exploreCoaching}
              </AthleticButton>
              <AthleticButton
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant="inverted"
                size="lg"
              >
                {t.about.getInTouch}
              </AthleticButton>
            </motion.div>

            {/* Inline Hero Promo CTA for Winter 2025–2026 */}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="flex h-10 w-6 justify-center rounded-full border-2 border-white/60"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="mt-2 h-3 w-1 rounded-full bg-white/60"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* About Content Section */}
      <div id="story" className="relative bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: "80px" } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-1 bg-gradient-ocean"
                />
                <h2 className="font-display text-3xl font-bold text-athletic-dark md:text-4xl">
                  {t.about.myStory}
                </h2>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-gray-600">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {getExperienceText(locale)}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {t.about.intro2}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  {t.about.intro3}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="rounded-xl border-l-4 border-ocean-500 bg-ocean-50 p-6 font-semibold text-ocean-700"
                >
                  {t.about.intro4}
                </motion.p>
              </div>
            </motion.div>

            {/* Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative flex flex-col items-center"
            >
              {/* Featured Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative mb-8"
              >
                <div className="relative h-64 w-64 overflow-hidden rounded-full shadow-2xl ring-4 ring-ocean-500/20">
                  <Image
                    src="/images/avatar.jpg"
                    alt="Ward Pellegrims - Professional Swimming & Triathlon Coach"
                    width={256}
                    height={256}
                    className="h-full w-full object-cover"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/10 to-transparent"></div>
                </div>

                {/* Floating ring animation - Optimized CSS */}
                <div className="absolute inset-0 h-64 w-64 animate-spin rounded-full border-2 border-ocean-400/30 opacity-70"></div>
              </motion.div>

              {/* Key Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="grid w-full max-w-lg grid-cols-1 gap-6 sm:grid-cols-2"
              >
                <StatCard
                  value={getYearsOfExperienceString()}
                  label={t.about.yearsExperience}
                />
                <StatCard
                  value={`${ATHLETE_COUNTS.CLIENTS}+`}
                  label={t.about.clientsCoached}
                />
              </motion.div>

              {/* Floating Elements - Optimized CSS animations */}
              <div className="absolute -right-4 -top-4 h-16 w-16 animate-float rounded-full bg-gradient-ocean opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 h-12 w-12 animate-float rounded-lg bg-ocean-300 opacity-30"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
