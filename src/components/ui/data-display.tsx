"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

// --- Info List / Items (from practical-info-ui) ---

export function InfoList({
  children,
  isVisible,
}: {
  children: ReactNode;
  isVisible: boolean;
}) {
  return (
    <motion.div
      className="border-primary-100/50 relative mx-auto max-w-4xl overflow-hidden rounded-2xl border bg-white shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      whileHover={{
        y: -4,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="p-6">
        <div className="grid gap-3">{children}</div>
      </div>
    </motion.div>
  );
}

export function InfoItem({
  icon,
  label,
  value,
  index,
  isVisible,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  index: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      className="hover:bg-primary-25/50 group flex items-start gap-3 rounded-lg p-3 transition-all duration-300"
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
      whileHover={{ x: 8 }}
    >
      <motion.div
        className="text-xl"
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <div className="flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <span className="min-w-fit text-sm font-semibold text-text sm:text-base">
            {label}
          </span>
          <div className="hidden h-1.5 w-1.5 rounded-full bg-primary-300 opacity-40 sm:block" />
          <div className="text-text/80 text-sm sm:text-base">{value}</div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Timeline System (from training-dates-ui) ---

export function Timeline({
  children,
  isVisible,
}: {
  children: ReactNode;
  isVisible: boolean;
}) {
  return (
    <motion.div
      className="border-primary-100/60 relative mx-auto max-w-4xl rounded-2xl border bg-white/80 p-6 shadow-2xl backdrop-blur-sm md:p-8"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      whileHover={{
        y: -5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="absolute left-0 top-0 h-20 w-20 rounded-br-3xl rounded-tl-2xl bg-gradient-to-br from-primary-100 to-primary-200 opacity-20" />
      <div className="absolute bottom-0 right-0 h-16 w-16 rounded-br-2xl rounded-tl-3xl bg-gradient-to-tl from-primary-200 to-primary-100 opacity-15" />

      <div className="relative">
        {/* Timeline Vertical Lines */}
        <div className="absolute bottom-0 left-3 top-0 w-0.5 rounded-full bg-gradient-to-b from-primary-200 via-primary-300 to-primary-200 sm:left-5" />
        <div className="sm:left-4.5 absolute bottom-0 left-2.5 top-0 w-0.5 rounded-full bg-gradient-to-b from-primary-100 via-primary-200 to-primary-100 opacity-50" />

        <div className="space-y-6">{children}</div>
      </div>
    </motion.div>
  );
}

export function TimelineItem({
  title,
  days,
  index,
  isVisible,
}: {
  title: string;
  days: string[];
  index: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      className="relative pl-12 sm:pl-16"
      initial={{ opacity: 0, x: -30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
    >
      {/* Dot on timeline */}
      <motion.div
        className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg sm:left-2"
        initial={{ scale: 0, rotate: -180 }}
        animate={isVisible ? { scale: 1, rotate: 0 } : {}}
        transition={{
          duration: 0.5,
          delay: 0.8 + index * 0.1,
          type: "spring",
          stiffness: 200,
        }}
        whileHover={{ scale: 1.2, rotate: 360 }}
      >
        <div className="h-2 w-2 rounded-full bg-white" />
      </motion.div>

      <motion.div
        className="from-primary-25 border-primary-100/50 rounded-xl border bg-gradient-to-r to-white p-4 shadow-sm transition-all duration-300 hover:shadow-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="mb-3 flex items-center font-display text-lg font-bold text-text sm:text-xl">
          <span className="mr-3">{title}</span>
          <div className="h-px flex-1 bg-gradient-to-r from-primary-300 to-transparent" />
        </h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {days.map((d) => (
            <motion.span
              key={`${title}-${d}`}
              className="to-primary-25 border-primary-200/50 group inline-flex w-full cursor-pointer items-center justify-center gap-1 rounded-xl border bg-gradient-to-r from-primary-50 px-3 py-2 text-sm font-medium text-primary-700 shadow-sm transition-all duration-300 hover:border-primary-300 hover:from-primary-100 hover:to-primary-50 hover:shadow-md"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="transition-transform duration-200 group-hover:scale-110">
                {d}
              </span>
              <div className="h-1 w-1 rounded-full bg-primary-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Specialized Footer for Dates ---

export function DatesFooter({
  footerText,
  locationName,
  locationHref,
  isVisible,
}: {
  footerText: string;
  locationName: string;
  locationHref: string;
  isVisible: boolean;
}) {
  return (
    <motion.div
      className="mt-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 1.2 }}
    >
      <div className="border-primary-100/50 inline-flex items-center justify-center rounded-full border bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm">
        <svg
          className="mr-2 h-5 w-5 text-primary-500"
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
        <p className="text-text/70 text-sm font-medium">
          {footerText}{" "}
          <a
            href={locationHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-700 transition-colors duration-200 hover:text-primary-800 hover:underline"
          >
            {locationName}
          </a>
        </p>
      </div>
    </motion.div>
  );
}
