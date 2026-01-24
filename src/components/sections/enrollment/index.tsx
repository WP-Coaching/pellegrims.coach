"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Section } from "@/components/ui/section";
import { Container, Stack } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";

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
    <Section id="inschrijven" variant="highlight">
      <Container maxWidth="4xl" className="text-center">
        <Stack gap={8} align="center">
          <Stack gap={4} align="center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Heading level="h2" color="white" align="center">
                {title}
              </Heading>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Text
                variant="large"
                color="white"
                className="mx-auto max-w-2xl opacity-90"
                align="center"
              >
                {subtitle}
              </Text>
            </motion.div>
          </Stack>

          <motion.div
            className="mx-auto w-full max-w-2xl rounded-xl bg-white/95 p-6 text-text backdrop-blur-sm md:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {form}
          </motion.div>

          <motion.div
            className="text-center text-sm text-white/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            {questionsText}
            <Link
              href={contactHref}
              className="ml-1 font-medium text-white hover:underline"
              variant="unstyled"
            >
              {contactLinkText}
            </Link>
            .
          </motion.div>
        </Stack>
      </Container>
    </Section>
  );
}
