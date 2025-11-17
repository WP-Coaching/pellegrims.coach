import type { Metadata } from "next";
import ZwemtrainingWinterClient from "@/components/ZwemtrainingWinterClient";
import { getTranslations } from "@/lib/translations";
import { isValidLocale, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : "en";
  const t = getTranslations(locale);
  const txt = t.swimWinter;

  const siteUrl = "https://www.pellegrims.coach";
  const pageUrl =
    locale === "en"
      ? `${siteUrl}/en/zwemtraining/winter-2025-2026`
      : `${siteUrl}/nl/zwemtraining/winter-2025-2026`;
  const ogImageUrl = `${siteUrl}/images/banner_1920.jpg`;

  return {
    title: txt.meta.title,
    description: txt.meta.description,
    keywords: t.meta.keywords,
    authors: [{ name: "Ward Pellegrims" }],
    openGraph: {
      title: txt.meta.title,
      description: txt.meta.description,
      url: pageUrl,
      siteName: "Ward Pellegrims Coaching",
      locale: locale === "en" ? "en_US" : "nl_BE",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1920,
          height: 1080,
          alt:
            locale === "en"
              ? "Ward Pellegrims Swimming & Triathlon Coach"
              : "Ward Pellegrims Zwem- en Triathloncoach",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: txt.meta.title,
      description: txt.meta.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-US": `${siteUrl}/en/zwemtraining/winter-2025-2026`,
        "nl-BE": `${siteUrl}/nl/zwemtraining/winter-2025-2026`,
      },
    },
  };
}

export default async function ZwemtrainingWinterPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale =
    localeParam === "en" || localeParam === "nl"
      ? (localeParam as Locale)
      : "en";
  const t = getTranslations(locale);

  return <ZwemtrainingWinterClient locale={locale} t={t} />;
}
