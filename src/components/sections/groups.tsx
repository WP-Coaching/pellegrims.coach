"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";
import { SectionHeader } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import { Grid, Container } from "@/components/ui/layout";
import { GroupCard } from "@/components/ui/card";
import { PatternBackground } from "@/components/ui/visuals";
import type { GroupTrainingCard } from "@/lib/group-trainings/get-group-trainings";
import { MOTION_DELAY, MOTION_DURATION, staggerDelay } from "@/lib/motion";

type Props = {
  locale: Locale;
  t: TranslationKey;
  groupTrainings: GroupTrainingCard[];
};

export default function Groups({ locale, t, groupTrainings }: Props) {
  const isEN = locale === "en";
  const mdCols: 1 | 2 | 3 =
    groupTrainings.length >= 3 ? 3 : groupTrainings.length === 2 ? 2 : 1;
  const cardColor = "from-primary-500 to-primary-700";

  return (
    <Section
      id="groups"
      className="py-24"
      variant="gradient"
      background={<PatternBackground />}
    >
      <Container>
        <SectionHeader
          title={t.groups.title}
          description={t.groups.description}
          className="mb-12"
          titleClassName="text-4xl md:text-5xl mb-6"
          descriptionClassName="text-xl max-w-3xl mx-auto"
          accentWidth="120px"
        />

        <Grid cols={1} md={mdCols} gap={8}>
          {groupTrainings.map((card, index) => {
            const levelStyles =
              card.levelKey === "beginner"
                ? {
                    badge:
                      "border-emerald-400/70 bg-emerald-100 text-emerald-900",
                    label: "text-emerald-700",
                    card: "border-l-4 border-l-emerald-300/80",
                  }
                : {
                    badge: "border-amber-400/70 bg-amber-100 text-amber-900",
                    label: "text-amber-700",
                    card: "border-l-4 border-l-amber-300/80",
                  };

            return (
              <motion.div
                key={`${card.link}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: MOTION_DURATION.fast,
                  delay: staggerDelay(index, MOTION_DELAY.xs),
                }}
                className="h-full"
              >
                <GroupCard
                  {...card}
                  color={cardColor}
                  levelBadgeClassName={levelStyles.badge}
                  levelLabelClassName={levelStyles.label}
                  cardClassName={levelStyles.card}
                  external={card.link.startsWith("http")}
                  viewDetailsText={t.groups.viewDetails}
                  ariaLabel={`${isEN ? "View details for" : "Bekijk details voor"} ${card.title}`}
                />
              </motion.div>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
