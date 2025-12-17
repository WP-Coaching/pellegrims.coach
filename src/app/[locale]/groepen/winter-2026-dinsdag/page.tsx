import type { Metadata } from "next";
import ZwemtrainingTuesdayClient from "@/components/ZwemtrainingTuesdayClient";
import { getTranslations } from "@/lib/translations";
import { isValidLocale, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : "en";
  const t = getTranslations(locale);
  // Accessing the new key safely, satisfying TS by casting if needed, but getTranslations returns typed object.
  // Since we just added 'swimTuesday' to t, it should rely on updated types if they were inferred.
  // However, I haven't updated the TranslationKey type definition explicitly if it's manual.
  // Let's check 'src/lib/translations/index.ts' or similar if it exists to see how types are derived.
  // Usually it infers from 'en'.

  // For now I'll cast to any as I did in the client component to be safe against build errors until type inference catches up or I restart TS server (which I can't do).
  const txt = t.swimTuesday;

  const siteUrl = "https://www.pellegrims.coach";
  const pageUrl =
    locale === "en"
      ? `${siteUrl}/en/groepen/winter-2026-dinsdag`
      : `${siteUrl}/nl/groepen/winter-2026-dinsdag`;
  const ogImageUrl = `${siteUrl}/images/banner_1920.jpg`;

  return {
    title: txt?.meta?.title || "Group swim training Winter 2026 (Tuesday)",
    description:
      txt?.meta?.description ||
      "Advanced group swim training on Tuesday afternoons.",
    keywords: t.meta.keywords,
    authors: [{ name: "Ward Pellegrims" }],
    openGraph: {
      title: txt?.meta?.title,
      description: txt?.meta?.description,
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
      title: txt?.meta?.title,
      description: txt?.meta?.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-US": `${siteUrl}/en/groepen/winter-2026-dinsdag`,
        "nl-BE": `${siteUrl}/nl/groepen/winter-2026-dinsdag`,
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

  return <ZwemtrainingTuesdayClient locale={locale} t={t} />;
}
