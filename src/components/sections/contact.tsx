"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  PaperPlaneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  EnvelopeIcon,
  TagIcon,
  CommentIcon,
} from "@/components/icons";
import { AthleticButton } from "@/components/ui/athletic-button";
import { GlassCard } from "@/components/ui/glass-card";
import { StatCard } from "@/components/ui/stat-card";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightBackground } from "@/components/ui/spotlight-background";
import { IconInput, IconTextarea } from "@/components/ui/icon-text-field";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

export default function Contact({ t }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [isEmailJSReady, setIsEmailJSReady] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Check if services are enabled based on environment variables
  const isRecaptchaEnabled = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const isEmailJSEnabled = !!(
    process.env.NEXT_PUBLIC_EMAILJS_USER_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  );

  useEffect(() => {
    // Initialize EmailJS when component mounts (if enabled)
    const initEmailJS = () => {
      if (!isEmailJSEnabled) {
        console.warn("EmailJS is disabled - missing environment variables");
        return;
      }

      try {
        const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;
        emailjs.init(userId);
        setIsEmailJSReady(true);
      } catch (error) {
        console.warn("EmailJS initialization failed:", error);
      }
    };

    initEmailJS();
  }, [isEmailJSEnabled]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("contact");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

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

    if (!isEmailJSEnabled || !isEmailJSReady) {
      console.warn("EmailJS is not available or not ready yet");
      setStatus("error");
      return;
    }

    // Check reCAPTCHA if enabled
    if (isRecaptchaEnabled && !recaptchaToken) {
      console.warn("Please complete the reCAPTCHA verification");
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

      if (!serviceId || !templateId || !userId) {
        throw new Error(
          "EmailJS environment variables are required: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_USER_ID"
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          "g-recaptcha-response": recaptchaToken,
        },
        userId
      );

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setRecaptchaToken(null);

      // Reset reCAPTCHA
      if (
        typeof window !== "undefined" &&
        (window as unknown as { grecaptcha?: { reset: () => void } }).grecaptcha
      ) {
        (
          window as unknown as { grecaptcha: { reset: () => void } }
        ).grecaptcha.reset();
      }
    } catch (error) {
      console.error("Email error:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section
        id="contact"
        className="relative bg-gradient-to-br from-ocean-50 via-white to-athletic-light py-24"
      >
        {/* Background Elements */}
        <SpotlightBackground
          spotlights={[
            {
              className:
                "absolute top-1/4 -left-32 w-64 h-64 bg-ocean-200 rounded-full opacity-20 blur-3xl",
            },
            {
              className:
                "absolute bottom-1/4 -right-32 w-64 h-64 bg-athletic-success/20 rounded-full opacity-30 blur-3xl",
            },
          ]}
        />

        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <h2 className="mb-8 font-display text-4xl font-bold text-athletic-dark md:text-5xl">
              {t.contact.title}
            </h2>

            <GlassCard padding="lg" className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 200,
                }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-athletic-success shadow-lg"
              >
                <CheckCircleIcon className="text-3xl text-white" />
              </motion.div>

              <h4 className="mb-4 font-display text-2xl font-bold text-athletic-success">
                {t.contact.success}
              </h4>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                {t.contact.successMsg}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <AthleticButton onClick={() => setStatus("idle")} size="lg">
                  {t.contact.sendAnother}
                </AthleticButton>
              </motion.div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-ocean-50 via-white to-athletic-light py-24"
    >
      {/* Background Elements */}
      <SpotlightBackground
        spotlights={[
          {
            className:
              "absolute top-1/4 -left-32 w-64 h-64 bg-ocean-200 rounded-full opacity-20 blur-3xl",
          },
          {
            className:
              "absolute bottom-1/4 -right-32 w-64 h-64 bg-ocean-100 rounded-full opacity-30 blur-3xl",
          },
        ]}
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <SectionHeader
          title={t.contact.title}
          description={t.contact.intro}
          className="mb-16"
          titleClassName="text-4xl md:text-5xl mb-6"
          descriptionClassName="text-xl max-w-3xl mx-auto"
          accentWidth="120px"
        />

        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <GlassCard padding="lg">
              <h3 className="mb-6 font-display text-2xl font-bold text-athletic-dark">
                {t.contact.letsConnect}
              </h3>
              <div className="space-y-6">
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-ocean shadow-athletic">
                    <EnvelopeIcon className="text-lg text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-athletic-dark">
                      {t.contact.email}
                    </p>
                    <p className="text-ocean-600">{t.contact.emailMessage}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-ocean shadow-athletic">
                    <UserIcon className="text-lg text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-athletic-dark">
                      {t.contact.professionalCoach}
                    </p>
                    <p className="text-gray-600">{t.contact.expertTitle}</p>
                  </div>
                </motion.div>
              </div>
            </GlassCard>

            {/* Athletic Stats */}
            <div className="grid grid-cols-2 gap-4">
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
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <GlassCard padding="lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <IconInput
                      icon={UserIcon}
                      type="text"
                      name="name"
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

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <IconInput
                      icon={EnvelopeIcon}
                      type="email"
                      name="email"
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
                </div>

                {/* Subject Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <IconInput
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

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <IconTextarea
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

                {/* reCAPTCHA */}
                {isRecaptchaEnabled && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="flex justify-center"
                  >
                    <div
                      className="g-recaptcha"
                      data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      data-callback="recaptchaCallback"
                      data-expired-callback="recaptchaExpired"
                    ></div>
                  </motion.div>
                )}

                {/* Error Message */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-3 rounded-xl border border-red-200 bg-red-50 p-4"
                  >
                    <ExclamationTriangleIcon className="flex-shrink-0 text-red-500" />
                    <p className="text-red-700">{t.contact.error}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  <AthleticButton
                    type="submit"
                    disabled={status === "sending"}
                    fullWidth
                    size="lg"
                    className="relative overflow-hidden"
                  >
                    {status === "sending" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                        />
                        <span>{t.contact.form.sending}</span>
                      </>
                    ) : (
                      <>
                        <PaperPlaneIcon />
                        <span>{t.contact.form.send}</span>
                      </>
                    )}
                  </AthleticButton>
                </motion.div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
