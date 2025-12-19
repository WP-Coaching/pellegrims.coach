"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightBackground } from "@/components/ui/spotlight-background";

export type TrainingMonth = {
  id: string;
  title: string;
  days: string[];
};

type TrainingDatesSectionProps = {
  title: string;
  months: TrainingMonth[];
  footerText: string;
  isVisible: boolean;
};

export function TrainingDatesSection({
  title,
  months,
  footerText,
  isVisible,
}: TrainingDatesSectionProps) {
  return (
    <motion.section
      id="dates"
      className="from-ocean-25 relative overflow-hidden bg-gradient-to-br via-white to-ocean-50/30 py-16"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
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
          title={title}
          className="mb-16"
          titleClassName="text-3xl md:text-4xl mb-6"
          accentWidth="120px"
        />

        <motion.div
          className="relative mx-auto max-w-4xl rounded-2xl border border-ocean-100/60 bg-white/80 p-6 shadow-2xl backdrop-blur-sm md:p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{
            y: -5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="absolute left-0 top-0 h-20 w-20 rounded-br-3xl rounded-tl-2xl bg-gradient-to-br from-ocean-100 to-ocean-200 opacity-20" />
          <div className="absolute bottom-0 right-0 h-16 w-16 rounded-br-2xl rounded-tl-3xl bg-gradient-to-tl from-ocean-200 to-ocean-100 opacity-15" />

          <div className="relative">
            <div className="absolute bottom-0 left-3 top-0 w-0.5 rounded-full bg-gradient-to-b from-ocean-200 via-ocean-300 to-ocean-200 sm:left-5" />
            <div className="sm:left-4.5 absolute bottom-0 left-2.5 top-0 w-0.5 rounded-full bg-gradient-to-b from-ocean-100 via-ocean-200 to-ocean-100 opacity-50" />

            <div className="space-y-6">
              {months.map((month, i) => (
                <motion.div
                  key={month.id}
                  className="relative pl-12 sm:pl-16"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                >
                  <motion.div
                    className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-ocean-400 to-ocean-600 shadow-lg sm:left-2"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isVisible ? { scale: 1, rotate: 0 } : {}}
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
                      animate={isVisible ? { scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 1.0 + i * 0.1 }}
                    />
                  </motion.div>

                  <motion.div
                    className="from-ocean-25 rounded-xl border border-ocean-100/50 bg-gradient-to-r to-white p-4 shadow-sm transition-all duration-300 hover:shadow-md"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
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
                            isVisible ? { opacity: 1, scale: 1, y: 0 } : {}
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

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
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
              {footerText}{" "}
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
  );
}
