import type { Metadata, ResolvingMetadata } from "next";
import type { Locale } from "@/lib/i18n";

const SITE_URL = "https://www.pellegrims.coach";
const SITE_NAME = "Ward Pellegrims Coaching";

type BuildPageMetadataArgs = {
  locale: Locale;
  title: string;
  description: string;
  currentPath: string;
  languagePaths: {
    en: string;
    nl: string;
  };
  parent?: ResolvingMetadata;
};

export async function buildPageMetadata({
  locale,
  title,
  description,
  currentPath,
  languagePaths,
  parent,
}: BuildPageMetadataArgs): Promise<Metadata> {
  const previousImages = parent ? (await parent).openGraph?.images || [] : [];
  const canonical = `${SITE_URL}${currentPath}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      images: previousImages,
      locale: locale === "en" ? "en_US" : "nl_BE",
      type: "website",
      siteName: SITE_NAME,
    },
    alternates: {
      canonical,
      languages: {
        "en-US": `${SITE_URL}${languagePaths.en}`,
        "nl-BE": `${SITE_URL}${languagePaths.nl}`,
      },
    },
  };
}
