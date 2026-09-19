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
      padding="spacious"
      variant="gradient"
      background={<PatternBackground />}
    >
      <Container>
        <SectionHeader
          title={t.groups.title}
          description={t.groups.description}
          className="mb-12"
          titleVariant="feature"
          titleClassName="mb-6"
          descriptionVariant="lead"
          descriptionClassName="mx-auto max-w-3xl"
          accentWidth="120px"
        />

        <Grid cols={1} md={mdCols} gap={8}>
          {groupTrainings.map((card, index) => {
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
