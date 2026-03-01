"use client";

import { TrainingPageTemplate } from "@/components/templates";
import type { TrainingPageConfig } from "@/components/templates";
import StructuredData from "@/components/layout/structured-data";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";
import { Link } from "@/components/ui/link";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

export default function WinterTuesdayTrainingPage({ locale, t }: Props) {
  const isEN = locale === "en";
  const txt = t.swimTuesday;
  const tuesdayUrl: string | undefined =
    process.env.NEXT_PUBLIC_STRIPE_BOOK_TUESDAY_URL;

  const config: TrainingPageConfig = {
    locale,
    hero: {
      title: txt.heroTitle,
      intro: txt.heroIntro,
      locationText: txt.locationIntro,
      locationSuffix: isEN ? "in Antwerp." : "in Antwerpen.",
    },
    groups: {
      title: txt.groupsTitle,
      columns: 1, // Tuesday only has advanced group
      items: [
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
            <Link href="https://maps.app.goo.gl/LLJVUopK1vmeFsZWA" external>
              Topsportbad Wezenberg, Desguinlei 17-19, 2018 Antwerpen
            </Link>
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
        ? "All sessions take place on Tuesday afternoon at the "
        : "Alle sessies vinden plaats op dinsdagmiddag in het ",
    },
    enrollment: {
      title: txt.enrollTitle,
      subtitle: `${txt.locationIntro} Topsportbad Wezenberg • ${txt.dayValue} • ${txt.priceValue}`,
      signup: {
        title: txt.payment.title,
        intro: txt.payment.intro,
        options: [
          {
            id: "advanced-tuesday",
            title: txt.payment.advanced,
            time: txt.payment.advancedTime,
            cta: txt.payment.advancedCta,
            stripeUrl: tuesdayUrl,
          },
        ],
      },
      questionsText: txt.questions,
      contactLinkText: txt.contactForm,
      contactHref: `/${locale}/#contact`,
    },
  };

  return (
    <>
      <StructuredData
        locale={locale}
        pageName={txt.meta.title}
        path={`/${locale}/groepen/winter-2026-dinsdag/`}
      />
      <TrainingPageTemplate config={config} />
    </>
  );
}
