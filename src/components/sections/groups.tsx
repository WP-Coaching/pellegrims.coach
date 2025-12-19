"use client";

import { motion } from "framer-motion";
import Link from "next/link";
// We don't need the full page background component as this is now a section
// import { TrainingPageBackground } from "@/components/TrainingPageBackground";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";
import { SectionHeader } from "@/components/ui/section-header";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

export default function Groups({ locale, t }: Props) {
  const isEN = locale === "en";

  const cards = [
    {
      title: isEN ? "Friday Winter Training" : "Wintertraining Vrijdag",
      subtitle: "2025 - 2026",
      description: isEN
        ? "Group training for beginners and advanced swimmers on Friday afternoons."
        : "Groepstraining voor beginners en gevorderden op vrijdagmiddag.",
      link: `/${locale}/groepen/winter-2025-2026`,
      color: "from-ocean-400 to-ocean-600",
      delay: 0.1,
    },
    {
      title: isEN ? "Tuesday Winter Training" : "Wintertraining Dinsdag",
      subtitle: "2026",
      description: isEN
        ? "New! Advanced group training on Tuesday afternoons starting January 2026."
        : "Nieuw! Groepstraining voor gevorderden op dinsdagmiddag vanaf januari 2026.",
      link: `/${locale}/groepen/winter-2026-dinsdag`,
      color: "from-ocean-500 to-ocean-700",
      delay: 0.2,
    },
    {
      title: t.projects.items.zwemCoach.title,
      subtitle: "Start to Crawl",
      description: t.projects.items.zwemCoach.description,
      link: "https://www.zwem.coach",
      external: true,
      color: "from-ocean-600 to-athletic-dark",
      delay: 0.3,
    },
  ];

  return (
    <section
      id="groups"
      className="relative overflow-hidden bg-gradient-to-br from-ocean-50 via-white to-athletic-light py-24"
    >
      {/* Background decoration similar to other sections */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          title={isEN ? "Group Training" : "Groepstraining"}
          description={
            isEN
              ? "Improve your technique and fitness in a motivating group environment."
              : "Verbeter je techniek en conditie in een motiverende groepsomgeving."
          }
          className="mb-16"
          titleClassName="text-4xl md:text-5xl mb-6"
          descriptionClassName="text-xl max-w-3xl mx-auto"
          accentWidth="120px"
        />

        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: card.delay }}
            >
              <Link
                href={card.link}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className="group relative block h-full overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                />

                <div className="relative flex h-full flex-col p-8">
                  <div className="mb-auto">
                    <div
                      className={`mb-4 inline-block rounded-full bg-gradient-to-r ${card.color} px-4 py-1 text-xs font-bold text-white shadow-md`}
                    >
                      {card.subtitle}
                    </div>

                    <h3 className="mb-4 font-display text-2xl font-bold text-athletic-dark transition-colors duration-300 group-hover:text-ocean-600">
                      {card.title}
                    </h3>

                    <p className="mb-8 text-athletic-dark/70">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center font-medium text-ocean-600 transition-colors duration-300 group-hover:text-ocean-700">
                    {isEN ? "View Details" : "Bekijk Details"}
                    <svg
                      className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
