"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightBackground } from "@/components/ui/spotlight-background";
import type { ReactNode } from "react";

export type PracticalInfoItem = {
  label: string;
  value: ReactNode;
  icon: string;
};

type PracticalInfoSectionProps = {
  title: string;
  items: PracticalInfoItem[];
  isVisible: boolean;
};

export function PracticalInfoSection({
  title,
  items,
  isVisible,
}: PracticalInfoSectionProps) {
  return (
    <motion.section
      id="practical"
      className="relative bg-gradient-to-br from-white to-ocean-50/30 py-16"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
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
          title={title}
          className="mb-16"
          titleClassName="text-3xl md:text-4xl mb-6"
          accentWidth="120px"
        />

        <motion.div
          className="overflow-hidden rounded-2xl border border-ocean-100/50 bg-white shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{
            y: -4,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="p-6">
            <div className="grid gap-3">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  className="hover:bg-ocean-25/50 group flex items-start gap-3 rounded-lg p-3 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
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
  );
}
