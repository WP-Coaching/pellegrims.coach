import type { Metadata, ResolvingMetadata } from "next";
import { WinterTuesdayTrainingPage } from "@/components/pages";
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
  const txt = t.swimTuesday;

  const siteUrl = "https://www.pellegrims.coach";
  const pageUrl =
    locale === "en"
      ? `${siteUrl}/en/groepen/winter-2026-dinsdag/`
      : `${siteUrl}/nl/groepen/winter-2026-dinsdag/`;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: txt?.meta?.title || "Group swim training Winter 2026 (Tuesday)",
    description:
      txt?.meta?.description ||
      "Advanced group swim training on Tuesday afternoons.",
    openGraph: {
      title: txt?.meta?.title,
      description: txt?.meta?.description,
      url: pageUrl,
      images: previousImages,
      locale: locale === "en" ? "en_US" : "nl_BE",
      type: "website",
      siteName: "Ward Pellegrims Coaching",
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-US": `${siteUrl}/en/groepen/winter-2026-dinsdag/`,
        "nl-BE": `${siteUrl}/nl/groepen/winter-2026-dinsdag/`,
      },
    },
  };
}

export default async function ZwemtrainingTuesdayPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale =
    localeParam === "en" || localeParam === "nl"
      ? (localeParam as Locale)
      : "en";
  const t = getTranslations(locale);

  return <WinterTuesdayTrainingPage locale={locale} t={t} />;
}
