"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Stack, Grid, Box } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/card";
import { FloatingDecorations, StoryDecorations } from "@/components/ui/visuals";
import {
  HeroContainer,
  HeroBackground,
  HeroContent,
  ScrollIndicator,
} from "@/components/ui/hero";
import { ArrowRightIcon } from "@/components/ui/icons";
import {
  getYearsOfExperienceString,
  getExperienceText,
} from "@/lib/experience";
import { ATHLETE_COUNTS } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";
import { useSectionVisibility } from "@/hooks/use-section-visibility";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

type HeroPromoConfig = {
  enabled: boolean;
  text: string;
  button: string;
  ariaLabel: string;
  href: string;
};

export default function About({ locale, t }: Props) {
  const isVisible = useSectionVisibility("about");
  const heroPromo: HeroPromoConfig = {
    enabled: false,
    text: t.about.swimPromo.text,
    button: t.about.swimPromo.button,
    ariaLabel: t.about.swimPromo.ariaLabel,
    href: `/${locale}/groepen/winter-2026-dinsdag`,
  };

  return (
    <Box id="about" position="relative" overflow="hidden">
      {/* Hero Section */}
      <HeroContainer>
        <HeroBackground>
          <motion.div
            className="absolute inset-0 z-0 h-full w-full"
            initial={{ scale: 1.1 }}
            animate={{ scale: isVisible ? 1 : 1.1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Image
              src="/images/banner_1920.jpg"
              alt="Ward Pellegrims - Elite Swimming and Triathlon Coach"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </motion.div>
        </HeroBackground>

        <FloatingDecorations />

        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {heroPromo.enabled ? (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="mb-6 flex justify-center"
              >
                <Stack
                  direction="row"
                  gap={3}
                  align="center"
                  className="rounded-full bg-white/20 px-3.5 py-2 text-sm text-white backdrop-blur-sm md:text-base"
                >
                  <span className="font-display font-semibold">
                    {heroPromo.text}
                  </span>
                  <Button
                    as="a"
                    href={heroPromo.href}
                    size="md"
                    className="!rounded-full !px-4 !py-2 font-semibold"
                    ariaLabel={heroPromo.ariaLabel}
                  >
                    {heroPromo.button}
                    <ArrowRightIcon size={16} className="ml-1" />
                  </Button>
                </Stack>
              </motion.div>
            ) : null}

            <Heading
              level="h1"
              as={motion.h1}
              align="center"
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
            </Heading>

            <Text
              as={motion.p}
              align="center"
              className="mx-auto mb-8 max-w-3xl text-xl font-medium text-primary-100 md:text-2xl lg:text-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t.about.subtitle}
            </Text>

            <Stack direction="row" gap={4} align="center" justify="center" wrap>
              <Button
                onClick={() =>
                  document
                    .getElementById("story")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                size="lg"
              >
                {t.about.exploreCoaching}
              </Button>
              <Button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant="inverted"
                size="lg"
              >
                {t.about.getInTouch}
              </Button>
            </Stack>
          </motion.div>
        </HeroContent>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <ScrollIndicator />
        </motion.div>
      </HeroContainer>

      {/* Story Section */}
      <Section id="story">
        <Grid cols={1} lg={2} gap={12} align="center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Stack gap={6}>
              <Stack gap={4}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-1 bg-gradient-primary"
                />
                <Heading level="h2" variant="section" className="font-bold">
                  {t.about.myStory}
                </Heading>
              </Stack>

              <Stack gap={6}>
                <Text variant="large" color="muted">
                  {getExperienceText(locale)}
                </Text>
                <Text variant="large" color="muted">
                  {t.about.intro2}
                </Text>
                <Text variant="large" color="muted">
                  {t.about.intro3}
                </Text>
                <Text
                  variant="large"
                  className="rounded-xl border-l-4 border-primary-500 bg-primary-50 p-6 font-semibold text-primary-700"
                >
                  {t.about.intro4}
                </Text>
              </Stack>
            </Stack>
          </motion.div>

          {/* Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto w-full max-w-lg lg:ml-auto"
          >
            <Stack gap={4} align="center" className="relative w-full">
              <StoryDecorations />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative z-10"
              >
                <div className="ring-primary-500/20 relative h-64 w-64 overflow-hidden rounded-full shadow-2xl ring-4">
                  <Image
                    src="/images/avatar.jpg"
                    alt="Ward Pellegrims - Professional Swimming & Triathlon Coach"
                    fill
                    className="object-cover"
                    sizes="256px"
                  />
                  <div className="from-primary-900/10 absolute inset-0 bg-gradient-to-t to-transparent" />
                </div>
              </motion.div>

              <Grid cols={1} sm={2} gap={4} className="relative z-10 w-full">
                <StatCard
                  value={getYearsOfExperienceString()}
                  label={t.about.yearsExperience}
                />
                <StatCard
                  value={`${ATHLETE_COUNTS.CLIENTS}+`}
                  label={t.about.clientsCoached}
                />
              </Grid>
            </Stack>
          </motion.div>
        </Grid>
      </Section>
    </Box>
  );
}
