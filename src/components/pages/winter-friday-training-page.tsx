"use client";

import { TrainingPageTemplate } from "@/components/templates";
import type { TrainingPageConfig } from "@/components/templates";
import EnrollmentForm from "@/components/forms/enrollment-form";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

export default function WinterFridayTrainingPage({ locale, t }: Props) {
  const isEN = locale === "en";
  const txt = t.swimWinter;

  const config: TrainingPageConfig = {
    hero: {
      title: txt.heroTitle,
      intro: txt.heroIntro,
      locationText: txt.locationIntro,
      locationSuffix: isEN ? "in Antwerp." : "in Antwerpen.",
    },
    groups: {
      title: txt.groupsTitle,
      columns: 2,
      items: [
        {
          title: txt.begTitle,
          time: txt.begTime,
          description: txt.begDesc,
          bullets: [...txt.begBullets],
          motivationalText: txt.motivationalText,
        },
        {
          title: txt.advTitle,
          time: txt.advTime,
          description: txt.advDesc,
          bullets: [...txt.advBullets],
          motivationalText: txt.advMotivationalText,
        },
      ],
    },
    practical: {
      title: txt.practicalTitle,
      items: [
        { label: txt.coach, value: "Ward Pellegrims", icon: "👨‍🏫" },
        {
          label: txt.locationIntro,
          value: (
            <a
              href="https://maps.app.goo.gl/LLJVUopK1vmeFsZWA"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ocean-700 transition-colors duration-200 hover:text-ocean-800 hover:underline"
            >
              Topsportbad Wezenberg, Desguinlei 17-19, 2018 Antwerpen
            </a>
          ),
          icon: "📍",
        },
        { label: txt.day, value: txt.dayValue, icon: "📅" },
        { label: txt.price, value: txt.priceValue, icon: "💶" },
        { label: txt.gear, value: txt.gearValue, icon: "🏊‍♀️" },
        { label: txt.invoice, value: txt.invoiceValue, icon: "📄" },
      ],
    },
    dates: {
      title: txt.datesTitle,
      months: txt.months.map((m) => ({
        id: m.id,
        title: m.title,
        days: [...m.days],
      })),
      footerText: isEN
        ? "All sessions take place on Friday afternoon at the "
        : "Alle sessies vinden plaats op vrijdagmiddag in het ",
    },
    enrollment: {
      title: txt.enrollTitle,
      subtitle: `${txt.locationIntro} Topsportbad Wezenberg • ${txt.dayValue} • ${txt.priceValue}`,
      form: <EnrollmentForm locale={locale} />,
      questionsText: txt.questions,
      contactLinkText: txt.contactForm,
      contactHref: `/${locale}/#contact`,
    },
  };

  return <TrainingPageTemplate config={config} />;
}
