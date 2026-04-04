"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Container, Stack } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { MOTION_DELAY, MOTION_DURATION } from "@/lib/motion";
import type { TranslationKey } from "@/lib/translations";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

export default function CTASection({ t }: Props) {
  return (
    <Section variant="highlight">
      <Container maxWidth="4xl" className="text-center">
        <Stack gap={8} align="center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: MOTION_DURATION.normal }}
          >
            <Stack gap={4} align="center">
              <Heading level="h2" color="white" align="center">
                {t.cta.title}
              </Heading>
              <Text
                variant="large"
                color="white"
                align="center"
                className="opacity-90"
              >
                {t.cta.subtitle}
              </Text>
            </Stack>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: MOTION_DURATION.normal,
              delay: MOTION_DELAY.lg,
            }}
          >
            <Button
              as="a"
              href="#contact"
              variant="inverted"
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t.cta.button}
            </Button>
          </motion.div>
        </Stack>
      </Container>
    </Section>
  );
}
