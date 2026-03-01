"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Container, Grid, Stack } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";
import { Card } from "@/components/ui/card";
import { FormHeader, FormSection } from "@/components/ui/forms";
import { StripeRegistrationButton } from "@/components/sections/enrollment/stripe-registration-button";
import type { Locale } from "@/lib/i18n";

export type EnrollmentSignupOption = {
  id: string;
  title: string;
  time: string;
  cta: string;
  stripeUrl?: string;
};

export type EnrollmentSignupConfig = {
  title: string;
  intro: string;
  options: EnrollmentSignupOption[];
};

type EnrollmentSectionProps = {
  locale: Locale;
  title: string;
  subtitle: string;
  signup: EnrollmentSignupConfig;
  questionsText: string;
  contactLinkText: string;
  contactHref: string;
};

export function EnrollmentSection({
  locale,
  title,
  subtitle,
  signup,
  questionsText,
  contactLinkText,
  contactHref,
}: EnrollmentSectionProps) {
  const isSingleOption = signup.options.length === 1;

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
            <FormSection>
              <FormHeader title={signup.title} intro={signup.intro} />
              <Grid
                cols={1}
                sm={isSingleOption ? 1 : 2}
                gap={4}
                className={isSingleOption ? "mx-auto max-w-md" : undefined}
              >
                {signup.options.map((option) => (
                  <Card
                    key={option.id}
                    variant="soft"
                    padding={isSingleOption ? "md" : "sm"}
                    fullHeight
                    interactive={false}
                  >
                    <Stack gap={3} fullHeight justify="between">
                      <FormHeader
                        title={option.title}
                        intro={option.time}
                        level="div"
                        variant="card"
                        align="left"
                      />
                      <StripeRegistrationButton
                        url={option.stripeUrl}
                        locale={locale}
                      >
                        {option.cta}
                      </StripeRegistrationButton>
                    </Stack>
                  </Card>
                ))}
              </Grid>
            </FormSection>
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
