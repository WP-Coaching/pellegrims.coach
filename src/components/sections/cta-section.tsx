"use client";

import { motion } from "framer-motion";
import { AthleticButton } from "@/components/ui/athletic-button";
import { HighlightSection } from "@/components/ui/highlight-section";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

export default function CtaSection({ t }: Props) {
  return (
    <HighlightSection>
      <motion.h2
        className="mb-4 font-display text-3xl font-bold md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t.coaching.cta.title}
      </motion.h2>
      <motion.p
        className="mx-auto mb-8 max-w-2xl text-lg text-ocean-100"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {t.coaching.cta.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <AthleticButton
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          variant="inverted"
          size="lg"
          className="font-semibold"
        >
          {t.coaching.cta.button}
        </AthleticButton>
      </motion.div>
    </HighlightSection>
  );
}
