"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";
import { SectionHeader } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import { Grid, Container } from "@/components/ui/layout";
import { GroupCard } from "@/components/ui/card";
import { PatternBackground } from "@/components/ui/visuals";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

export default function Groups({ locale, t }: Props) {
  const isEN = locale === "en";

  const cards = [
    {
      title: t.groups.winterFriday.title,
      subtitle: t.groups.winterFriday.subtitle,
      description: t.groups.winterFriday.description,
      link: `/${locale}/groepen/winter-2025-2026`,
      color: "from-primary-400 to-primary-600",
      delay: 0.1,
    },
    {
      title: t.groups.winterTuesday.title,
      subtitle: t.groups.winterTuesday.subtitle,
      description: t.groups.winterTuesday.description,
      link: `/${locale}/groepen/winter-2026-dinsdag`,
      color: "from-primary-500 to-primary-700",
      delay: 0.2,
    },
    {
      title: t.projects.items.zwemCoach.title,
      subtitle: "Start to Crawl",
      description: t.projects.items.zwemCoach.description,
      link: "https://www.zwem.coach",
      external: true,
      color: "from-primary-600 to-text",
      delay: 0.3,
    },
  ];

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
          className="mb-16"
          titleClassName="text-4xl md:text-5xl mb-6"
          descriptionClassName="text-xl max-w-3xl mx-auto"
          accentWidth="120px"
        />

        <Grid cols={1} md={3} gap={8}>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: card.delay }}
              className="h-full"
            >
              <GroupCard
                {...card}
                viewDetailsText={t.groups.viewDetails}
                ariaLabel={`${isEN ? "View details for" : "Bekijk details voor"} ${card.title}`}
              />
            </motion.div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
