"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import EnrollmentForm from "@/components/EnrollmentForm";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightBackground } from "@/components/ui/spotlight-background";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

export default function ZwemtrainingWinterClient({ locale, t }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [groupsVisible, setGroupsVisible] = useState(false);
  const [practicalVisible, setPracticalVisible] = useState(false);
  const [datesVisible, setDatesVisible] = useState(false);

  useEffect(() => {
    // Set hero visible after paint to avoid synchronous state update errors
    const heroRevealFrame = requestAnimationFrame(() => setIsVisible(true));

    // Hero section visibility
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    // Groups section visibility - trigger earlier with rootMargin
    const groupsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGroupsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    // Practical section visibility
    const practicalObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPracticalVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    // Dates section visibility
    const datesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDatesVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const heroSection = document.getElementById("hero");
    const groupsSection = document.getElementById("groups");
    const practicalSection = document.getElementById("practical");
    const datesSection = document.getElementById("dates");

    if (heroSection) heroObserver.observe(heroSection);
    if (groupsSection) groupsObserver.observe(groupsSection);
    if (practicalSection) practicalObserver.observe(practicalSection);
    if (datesSection) datesObserver.observe(datesSection);

    return () => {
      cancelAnimationFrame(heroRevealFrame);
      heroObserver.disconnect();
      groupsObserver.disconnect();
      practicalObserver.disconnect();
      datesObserver.disconnect();
    };
  }, []);

  const isEN = locale === "en";
  const txt = t.swimWinter;

  return (
    <>
      {/* Hero / Intro */}
      <motion.section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-br from-ocean-50 via-white to-athletic-light pb-16 pt-36"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <SpotlightBackground
          asFragment
          spotlights={[
            {
              className:
                "absolute -top-16 -left-16 w-72 h-72 bg-ocean-100 rounded-full blur-3xl opacity-30 animate-float",
            },
            {
              className:
                "absolute -bottom-16 -right-16 w-80 h-80 bg-ocean-200 rounded-full blur-3xl opacity-20 animate-pulse-slow",
            },
          ]}
        />

        {/* Animated geometric elements */}
        <div className="absolute left-1/4 top-1/4 h-16 w-16 animate-spin rounded-full border-2 border-ocean-400/30 opacity-50" />
        <div className="absolute bottom-1/4 right-1/3 h-12 w-12 animate-float rounded-lg bg-ocean-500/20 backdrop-blur-sm" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
          <motion.h1
            className="mb-6 whitespace-pre-line font-display text-4xl font-extrabold text-athletic-dark sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {txt.heroTitle}
          </motion.h1>
          <motion.p
            className="mb-6 text-lg leading-relaxed text-athletic-dark/80 md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {txt.heroIntro}
          </motion.p>
          <motion.p
            className="text-athletic-dark/70"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {txt.locationIntro}{" "}
            <a
              href="https://maps.app.goo.gl/LLJVUopK1vmeFsZWA"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ocean-700 hover:underline"
            >
              Topsportbad Wezenberg
            </a>{" "}
            {isEN ? "in Antwerp." : "in Antwerpen."}
          </motion.p>
        </div>
      </motion.section>

      {/* Trainingsgroepen */}
      <motion.section
        id="groups"
        className="relative py-16"
        initial={{ opacity: 0 }}
        animate={groupsVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHeader
            title={txt.groupsTitle}
            className="mb-16"
            titleClassName="text-3xl md:text-4xl mb-6"
            accentWidth="120px"
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Beginners Group */}
            <motion.div
              className="group relative rounded-2xl border border-ocean-200/50 bg-gradient-to-br from-white via-ocean-50/30 to-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={groupsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-2xl rounded-tr-2xl bg-gradient-to-br from-ocean-200 to-ocean-300 opacity-20 transition-opacity duration-300 group-hover:opacity-30" />
              <div className="relative">
                <div className="mb-4 flex items-center">
                  <div className="mr-3 h-3 w-3 rounded-full bg-ocean-500" />
                  <h3 className="font-display text-xl font-bold text-athletic-dark">
                    {txt.begTitle}
                  </h3>
                </div>
                <div className="mb-6 inline-flex items-center rounded-full bg-ocean-100 px-3 py-1 text-sm font-medium text-ocean-700">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {txt.begTime}
                </div>
                <p className="mb-6 leading-relaxed text-athletic-dark/80">
                  {txt.begDesc}
                </p>
                <div className="mb-6 space-y-4">
                  {txt.begBullets.map((bullet, i) => (
                    <div key={i} className="flex items-start">
                      <div className="mr-3 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ocean-500">
                        <svg
                          className="h-3 w-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-sm leading-relaxed text-athletic-dark/80">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-ocean-100 pt-4">
                  <p className="rounded-lg bg-ocean-50 px-4 py-2 text-sm font-medium italic text-ocean-700">
                    {txt.motivationalText}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Advanced Group */}
            <motion.div
              className="group relative rounded-2xl border border-ocean-200/50 bg-gradient-to-br from-white via-ocean-50/30 to-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={groupsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-2xl rounded-tr-2xl bg-gradient-to-br from-ocean-200 to-ocean-300 opacity-20 transition-opacity duration-300 group-hover:opacity-30" />
              <div className="relative">
                <div className="mb-4 flex items-center">
                  <div className="mr-3 h-3 w-3 rounded-full bg-ocean-500" />
                  <h3 className="font-display text-xl font-bold text-athletic-dark">
                    {txt.advTitle}
                  </h3>
                </div>
                <div className="mb-6 inline-flex items-center rounded-full bg-ocean-100 px-3 py-1 text-sm font-medium text-ocean-700">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {txt.advTime}
                </div>
                <p className="mb-6 leading-relaxed text-athletic-dark/80">
                  {txt.advDesc}
                </p>
                <div className="mb-6 space-y-4">
                  {txt.advBullets.map((bullet, i) => (
                    <div key={i} className="flex items-start">
                      <div className="mr-3 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ocean-500">
                        <svg
                          className="h-3 w-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-sm leading-relaxed text-athletic-dark/80">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-ocean-100 pt-4">
                  <p className="rounded-lg bg-ocean-50 px-4 py-2 text-sm font-medium italic text-ocean-700">
                    {txt.advMotivationalText}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Praktische info - Clean & Elegant */}
      <motion.section
        id="practical"
        className="relative bg-gradient-to-br from-white to-ocean-50/30 py-16"
        initial={{ opacity: 0 }}
        animate={practicalVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Subtle floating elements */}
        <SpotlightBackground
          asFragment
          spotlights={[
            {
              className:
                "absolute top-16 left-16 w-20 h-20 bg-ocean-100 rounded-full blur-3xl opacity-20 animate-pulse-slow",
            },
            {
              className:
                "absolute bottom-16 right-16 w-24 h-24 bg-ocean-50 rounded-full blur-3xl opacity-30 animate-float",
            },
          ]}
        />

        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <SectionHeader
            title={txt.practicalTitle}
            className="mb-16"
            titleClassName="text-3xl md:text-4xl mb-6"
            accentWidth="120px"
          />

          <motion.div
            className="overflow-hidden rounded-2xl border border-ocean-100/50 bg-white shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={practicalVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{
              y: -4,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="p-6">
              <div className="grid gap-3">
                {[
                  {
                    label: txt.coach,
                    value: "Ward Pellegrims",
                    icon: "👨‍🏫",
                  },
                  {
                    label: txt.locationIntro,
                    value: (
                      <a
                        href="https://maps.app.goo.gl/LLJVUopK1vmeFsZWA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-ocean-700 transition-colors duration-200 hover:text-ocean-800 hover:underline"
                      >
                        Topsportbad Wezenberg, Desguinlei 17-19, 2018 Antwerpen
                      </a>
                    ),
                    icon: "📍",
                  },
                  {
                    label: txt.day,
                    value: txt.dayValue,
                    icon: "📅",
                  },
                  {
                    label: txt.price,
                    value: txt.priceValue,
                    icon: "💶",
                  },
                  {
                    label: txt.gear,
                    value: txt.gearValue,
                    icon: "🏊‍♀️",
                  },
                  {
                    label: txt.invoice,
                    value: txt.invoiceValue,
                    icon: "📄",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="hover:bg-ocean-25/50 group flex items-start gap-3 rounded-lg p-3 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={practicalVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <motion.div
                      className="text-xl"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                        <span className="min-w-fit text-sm font-semibold text-athletic-dark sm:text-base">
                          {item.label}
                        </span>
                        <div className="hidden h-1.5 w-1.5 rounded-full bg-ocean-300 opacity-40 sm:block" />
                        <div className="text-sm text-athletic-dark/80 sm:text-base">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Trainingsdata - Enhanced vertical timeline */}
      <motion.section
        id="dates"
        className="from-ocean-25 relative overflow-hidden bg-gradient-to-br via-white to-ocean-50/30 py-16"
        initial={{ opacity: 0 }}
        animate={datesVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Enhanced floating elements */}
        <SpotlightBackground
          asFragment
          spotlights={[
            {
              className:
                "absolute -top-10 -left-10 w-64 h-64 bg-ocean-100 rounded-full blur-3xl opacity-30 animate-pulse-slow",
            },
            {
              className:
                "absolute bottom-0 -right-16 w-72 h-72 bg-ocean-50 rounded-full blur-3xl opacity-40 animate-float",
            },
          ]}
        />
        <div className="animate-spin-slow absolute right-1/4 top-1/3 h-20 w-20 rounded-full border-2 border-ocean-200/40 opacity-30" />
        <div className="absolute bottom-1/4 left-1/3 h-16 w-16 animate-float rounded-lg bg-ocean-100/50 backdrop-blur-sm" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeader
            title={txt.datesTitle}
            className="mb-16"
            titleClassName="text-3xl md:text-4xl mb-6"
            accentWidth="120px"
          />

          {/* Enhanced card with glass effect */}
          <motion.div
            className="relative mx-auto max-w-4xl rounded-2xl border border-ocean-100/60 bg-white/80 p-6 shadow-2xl backdrop-blur-sm md:p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={datesVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* Card decorative elements */}
            <div className="absolute left-0 top-0 h-20 w-20 rounded-br-3xl rounded-tl-2xl bg-gradient-to-br from-ocean-100 to-ocean-200 opacity-20" />
            <div className="absolute bottom-0 right-0 h-16 w-16 rounded-br-2xl rounded-tl-3xl bg-gradient-to-tl from-ocean-200 to-ocean-100 opacity-15" />

            <div className="relative">
              {/* Enhanced timeline spine with gradient */}
              <div className="absolute bottom-0 left-3 top-0 w-0.5 rounded-full bg-gradient-to-b from-ocean-200 via-ocean-300 to-ocean-200 sm:left-5" />
              <div className="sm:left-4.5 absolute bottom-0 left-2.5 top-0 w-0.5 rounded-full bg-gradient-to-b from-ocean-100 via-ocean-200 to-ocean-100 opacity-50" />

              <div className="space-y-6">
                {txt.months.map((month, i) => (
                  <motion.div
                    key={month.id}
                    className="relative pl-12 sm:pl-16"
                    initial={{ opacity: 0, x: -30 }}
                    animate={datesVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                  >
                    {/* Enhanced timeline node */}
                    <motion.div
                      className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-ocean-400 to-ocean-600 shadow-lg sm:left-2"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={datesVisible ? { scale: 1, rotate: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.8 + i * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                    >
                      <motion.div
                        className="h-2 w-2 rounded-full bg-white"
                        initial={{ scale: 0 }}
                        animate={datesVisible ? { scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 1.0 + i * 0.1 }}
                      />
                    </motion.div>

                    {/* Month content with enhanced styling */}
                    <motion.div
                      className="from-ocean-25 rounded-xl border border-ocean-100/50 bg-gradient-to-r to-white p-4 shadow-sm transition-all duration-300 hover:shadow-md"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={datesVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="mb-3 flex items-center font-display text-lg font-bold text-athletic-dark sm:text-xl">
                        <span className="mr-3">{month.title}</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-ocean-300 to-transparent" />
                      </h3>
                      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                        {month.days.map((d, dayIndex) => (
                          <motion.span
                            key={`${month.id}-${d}`}
                            className="to-ocean-25 group inline-flex w-full cursor-pointer items-center justify-center gap-1 rounded-xl border border-ocean-200/50 bg-gradient-to-r from-ocean-50 px-3 py-2 text-sm font-medium text-ocean-700 shadow-sm transition-all duration-300 hover:border-ocean-300 hover:from-ocean-100 hover:to-ocean-50 hover:shadow-md"
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={
                              datesVisible ? { opacity: 1, scale: 1, y: 0 } : {}
                            }
                            transition={{
                              duration: 0.4,
                              delay: 1.0 + i * 0.1 + dayIndex * 0.05,
                              type: "spring",
                              stiffness: 150,
                            }}
                            whileHover={{ scale: 1.08, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <motion.span className="transition-transform duration-200 group-hover:scale-110">
                              {d}
                            </motion.span>
                            <motion.div
                              className="h-1 w-1 rounded-full bg-ocean-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                              initial={{ scale: 0 }}
                              whileHover={{ scale: 1 }}
                            />
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Enhanced footer text with icon */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={datesVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="inline-flex items-center justify-center rounded-full border border-ocean-100/50 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm">
              <svg
                className="mr-2 h-5 w-5 text-ocean-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-sm font-medium text-athletic-dark/70">
                {isEN
                  ? "All sessions take place on Friday afternoon at the "
                  : "Alle sessies vinden plaats op vrijdagmiddag in het "}
                <a
                  href="https://maps.app.goo.gl/LLJVUopK1vmeFsZWA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ocean-700 transition-colors duration-200 hover:text-ocean-800 hover:underline"
                >
                  Topsportbad Wezenberg
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Inschrijven - CTA Style */}
      <motion.section
        id="inschrijven"
        className="relative overflow-hidden bg-gradient-ocean py-16 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
          <motion.h2
            className="mb-4 font-display text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {txt.enrollTitle}
          </motion.h2>
          <motion.p
            className="mx-auto mb-8 max-w-2xl text-lg text-ocean-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {txt.locationIntro}{" "}
            <span className="font-semibold">Topsportbad Wezenberg</span> •{" "}
            {txt.dayValue} • {txt.priceValue}
          </motion.p>

          <motion.div
            className="mx-auto max-w-2xl rounded-xl bg-white/95 p-6 text-athletic-dark backdrop-blur-sm md:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ y: -2 }}
          >
            <EnrollmentForm locale={locale} />
          </motion.div>

          <motion.div
            className="mt-6 text-center text-sm text-ocean-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            {txt.questions}
            <a
              className="font-medium text-white hover:underline"
              href={`/${locale}/#contact`}
            >
              {txt.contactForm}
            </a>
            .
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
