"use client";

import { motion } from "framer-motion";
import { HighlightSection } from "@/components/ui/highlight-section";
import type { ReactNode } from "react";

type EnrollmentSectionProps = {
  title: string;
  subtitle: string;
  form: ReactNode;
  questionsText: string;
  contactLinkText: string;
  contactHref: string;
};

export function EnrollmentSection({
  title,
  subtitle,
  form,
  questionsText,
  contactLinkText,
  contactHref,
}: EnrollmentSectionProps) {
  return (
    <HighlightSection id="inschrijven" className="text-white">
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
        <motion.h2
          className="mb-4 font-display text-3xl font-bold md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="mx-auto mb-8 max-w-2xl text-lg text-ocean-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="mx-auto max-w-2xl rounded-xl bg-white/95 p-6 text-athletic-dark backdrop-blur-sm md:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ y: -2 }}
        >
          {form}
        </motion.div>

        <motion.div
          className="mt-6 text-center text-sm text-ocean-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {questionsText}
          <a
            className="font-medium text-white hover:underline"
            href={contactHref}
          >
            {contactLinkText}
          </a>
          .
        </motion.div>
      </div>
    </HighlightSection>
  );
}
