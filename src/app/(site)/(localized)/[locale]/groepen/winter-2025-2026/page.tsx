import type { Metadata, ResolvingMetadata } from "next";
import { WinterFridayTrainingPage } from "@/components/views";
import { getTranslations } from "@/lib/translations";
import { isValidLocale, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : "en";
  const t = getTranslations(locale);
  const txt = t.swimWinter;

  const siteUrl = "https://www.pellegrims.coach";
  const pageUrl =
    locale === "en"
      ? `${siteUrl}/en/groepen/winter-2025-2026/`
      : `${siteUrl}/nl/groepen/winter-2025-2026/`;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: txt.meta.title,
    description: txt.meta.description,
    openGraph: {
      title: txt.meta.title,
      description: txt.meta.description,
      url: pageUrl,
      images: previousImages,
      locale: locale === "en" ? "en_US" : "nl_BE",
      type: "website",
      siteName: "Ward Pellegrims Coaching",
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-US": `${siteUrl}/en/groepen/winter-2025-2026/`,
        "nl-BE": `${siteUrl}/nl/groepen/winter-2025-2026/`,
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

  return <WinterFridayTrainingPage locale={locale} t={t} />;
}
