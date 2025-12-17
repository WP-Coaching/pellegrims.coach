"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TrainingPageBackground } from "@/components/TrainingPageBackground";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

type Card = {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  color: string;
  delay: number;
  badge?: string;
  external?: boolean;
};

export default function GroepstrainingClient({ locale, t }: Props) {
  const isEN = locale === "en";

  const cards: Card[] = [
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
      badge: isEN ? "NEW" : "NIEUW",
      description: isEN
        ? "Advanced group training on Tuesday afternoons starting January 2026."
        : "Groepstraining voor gevorderden op dinsdagmiddag vanaf januari 2026.",
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
    <section className="relative flex-grow overflow-hidden bg-gradient-to-br from-ocean-50 via-white to-athletic-light pb-16 pt-36">
      <TrainingPageBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.h1
            className="mb-6 whitespace-pre-line font-display text-4xl font-extrabold text-athletic-dark sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {isEN ? "Group Training" : "Groepstraining"}
          </motion.h1>
          <motion.p
            className="mx-auto max-w-2xl text-lg leading-relaxed text-athletic-dark/80 md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isEN
              ? "Choose your preferred training session below."
              : "Kies hieronder je gewenste trainingssessie."}
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
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

                <div className="relative p-8">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Badge
                      variant="custom"
                      className={`bg-gradient-to-r ${card.color}`}
                    >
                      {card.subtitle}
                    </Badge>
                    {card.badge && (
                      <Badge variant="destructive" animate>
                        {card.badge}
                      </Badge>
                    )}
                  </div>

                  <h3 className="mb-4 font-display text-2xl font-bold text-athletic-dark transition-colors duration-300 group-hover:text-ocean-600">
                    {card.title}
                  </h3>

                  <p className="mb-8 text-athletic-dark/70">
                    {card.description}
                  </p>

                  <div className="flex items-center font-medium text-ocean-600 transition-colors duration-300 group-hover:text-ocean-700">
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
