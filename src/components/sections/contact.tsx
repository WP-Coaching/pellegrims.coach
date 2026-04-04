"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserIcon,
  EnvelopeIcon,
  TagIcon,
  CommentIcon,
  ExclamationTriangleIcon,
} from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { Grid, Stack } from "@/components/ui/layout";
import { Card, StatCard } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/typography";
import { SpotlightBackground } from "@/components/ui/visuals";
import {
  IconInput,
  IconTextarea,
  SubmitButton,
  FormSuccessView,
} from "@/components/ui/forms";
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { Heading, Text } from "@/components/ui/typography";
import type { Locale } from "@/lib/i18n";
import { MOTION_DELAY, MOTION_DURATION } from "@/lib/motion";
import type { TranslationKey } from "@/lib/translations";
import { submitContactForm } from "@/app/actions";
import { useSectionVisibility } from "@/hooks/use-section-visibility";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

export default function Contact(props: Props) {
  const { t } = props;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const isVisible = useSectionVisibility("contact", 0.1, "120px 0px");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isRecaptchaEnabled = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    // Add reCAPTCHA callback to global scope
    if (typeof window !== "undefined") {
      (
        window as unknown as { recaptchaCallback: (token: string) => void }
      ).recaptchaCallback = (token: string) => {
        setRecaptchaToken(token);
      };

      (window as unknown as { recaptchaExpired: () => void }).recaptchaExpired =
        () => {
          setRecaptchaToken(null);
        };
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isRecaptchaEnabled && !recaptchaToken) {
      console.warn("Please complete the reCAPTCHA verification");
      setStatus("error");
      setErrorMessage(t.contact.error || "Please complete verification");
      return;
    }

    setStatus("sending");
    setErrorMessage(null);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("subject", formData.subject);
      data.append("message", formData.message);
      data.append("locale", props.locale);
      if (recaptchaToken) {
        data.append("g-recaptcha-response", recaptchaToken);
      }

      const result = await submitContactForm(null, data);

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setRecaptchaToken(null);

        if (
          typeof window !== "undefined" &&
          (window as unknown as { grecaptcha?: { reset: () => void } })
            .grecaptcha
        ) {
          (
            window as unknown as { grecaptcha: { reset: () => void } }
          ).grecaptcha.reset();
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage(t.contact.error);
    }
  };

  if (status === "success") {
    return (
      <Section
        id="contact"
        variant="gradient"
        background={
          <SpotlightBackground
            spotlights={[
              {
                className:
                  "absolute top-1/4 -left-32 w-64 h-64 bg-primary-200 rounded-full opacity-20 blur-3xl",
              },
              {
                className:
                  "absolute bottom-1/4 -right-32 w-64 h-64 bg-primary-100 rounded-full opacity-30 blur-3xl",
              },
            ]}
          />
        }
      >
        <FormSuccessView
          title={t.contact.title}
          successTitle={t.contact.success}
          successMsg={t.contact.successMsg}
          onReset={() => setStatus("idle")}
          resetText={t.contact.sendAnother}
        />
      </Section>
    );
  }

  return (
    <Section
      id="contact"
      variant="gradient"
      background={
        <SpotlightBackground
          spotlights={[
            {
              className:
                "absolute top-1/4 -left-32 w-64 h-64 bg-primary-200 rounded-full opacity-20 blur-3xl",
            },
            {
              className:
                "absolute bottom-1/4 -right-32 w-64 h-64 bg-primary-100 rounded-full opacity-30 blur-3xl",
            },
          ]}
        />
      }
    >
      <Stack gap={12} className="relative mx-auto max-w-4xl px-6">
        <SectionHeader
          title={t.contact.title}
          description={t.contact.intro}
          className="mb-16"
          titleClassName="text-4xl md:text-5xl mb-6"
          descriptionClassName="text-xl max-w-3xl mx-auto"
          accentWidth="120px"
        />

        <Grid cols={1} lg={2} gap={12} align="start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: MOTION_DURATION.normal,
              delay: MOTION_DELAY.none,
            }}
          >
            <Stack gap={8}>
              <Card variant="glass" padding="lg">
                <Stack gap={6}>
                  <Heading level="h3" variant="card" className="font-bold">
                    {t.contact.letsConnect}
                  </Heading>
                  <Stack gap={6}>
                    <div>
                      <Stack direction="row" gap={4} align="center">
                        <IconWrapper size="md" variant="solid">
                          <EnvelopeIcon />
                        </IconWrapper>
                        <Stack gap={1}>
                          <Text weight="semibold">{t.contact.email}</Text>
                          <Text color="muted">{t.contact.emailMessage}</Text>
                        </Stack>
                      </Stack>
                    </div>

                    <div>
                      <Stack direction="row" gap={4} align="center">
                        <IconWrapper size="md" variant="solid">
                          <UserIcon />
                        </IconWrapper>
                        <Stack gap={1}>
                          <Text weight="semibold">
                            {t.contact.professionalCoach}
                          </Text>
                          <Text color="muted">{t.contact.expertTitle}</Text>
                        </Stack>
                      </Stack>
                    </div>
                  </Stack>
                </Stack>
              </Card>

              <Grid cols={2} gap={4}>
                <StatCard
                  value="24h"
                  label={t.contact.responseTime}
                  className="text-2xl"
                />
                <StatCard
                  value="100%"
                  label={t.contact.personalized}
                  className="text-2xl"
                />
              </Grid>
            </Stack>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: MOTION_DURATION.normal,
              delay: MOTION_DELAY.xs,
            }}
          >
            <Card variant="glass" padding="lg">
              <form onSubmit={handleSubmit}>
                <Stack gap={6}>
                  <Grid cols={1} md={2} gap={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: MOTION_DURATION.fast,
                        delay: MOTION_DELAY.sm,
                      }}
                    >
                      <IconInput
                        id="contact-name"
                        label={t.contact.form.name}
                        icon={UserIcon}
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder={t.contact.form.name}
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        required
                        isActive={
                          focusedField === "name" || Boolean(formData.name)
                        }
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: MOTION_DURATION.fast,
                        delay: MOTION_DELAY.md,
                      }}
                    >
                      <IconInput
                        id="contact-email"
                        label={t.contact.form.email}
                        icon={EnvelopeIcon}
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder={t.contact.form.email}
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        isActive={
                          focusedField === "email" || Boolean(formData.email)
                        }
                      />
                    </motion.div>
                  </Grid>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: MOTION_DURATION.fast,
                      delay: MOTION_DELAY.lg,
                    }}
                  >
                    <IconInput
                      id="contact-subject"
                      label={t.contact.form.subject}
                      icon={TagIcon}
                      type="text"
                      name="subject"
                      placeholder={t.contact.form.subject}
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      required
                      isActive={
                        focusedField === "subject" || Boolean(formData.subject)
                      }
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: MOTION_DURATION.fast,
                      delay: MOTION_DELAY.xl,
                    }}
                  >
                    <IconTextarea
                      id="contact-message"
                      label={t.contact.form.message}
                      icon={CommentIcon}
                      name="message"
                      placeholder={t.contact.form.message}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      isActive={
                        focusedField === "message" || Boolean(formData.message)
                      }
                    />
                  </motion.div>

                  {isRecaptchaEnabled && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: MOTION_DURATION.fast,
                        delay: MOTION_DELAY.xxl,
                      }}
                      className="flex justify-center"
                    >
                      <div
                        className="g-recaptcha"
                        data-sitekey={
                          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                        }
                        data-callback="recaptchaCallback"
                        data-expired-callback="recaptchaExpired"
                      ></div>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Stack
                        direction="row"
                        gap={3}
                        align="center"
                        className="rounded-xl border border-red-200 bg-red-50 p-4"
                      >
                        <ExclamationTriangleIcon className="flex-shrink-0 text-red-500" />
                        <Text className="text-red-700">
                          {errorMessage || t.contact.error}
                        </Text>
                      </Stack>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: MOTION_DURATION.fast,
                      delay: MOTION_DELAY.xxxl,
                    }}
                  >
                    <SubmitButton
                      isSending={status === "sending"}
                      sendingText={t.contact.form.sending}
                      sendText={t.contact.form.send}
                    />
                  </motion.div>
                </Stack>
              </form>
            </Card>
          </motion.div>
        </Grid>
      </Stack>
    </Section>
  );
}
