import type { Locale } from "./i18n";

export type LegalPageType = "general-terms" | "privacy-policy";

export const legalSlugs: Record<LegalPageType, Record<Locale, string>> = {
  "general-terms": {
    en: "general-terms",
    nl: "algemene-voorwaarden",
  },
  "privacy-policy": {
    en: "privacy-policy",
    nl: "privacybeleid",
  },
};

const slugEntries = Object.entries(legalSlugs) as [
  LegalPageType,
  Record<Locale, string>,
][];

export const legalSlugToPageType: Record<string, LegalPageType> =
  slugEntries.reduce(
    (acc, [pageType, localeMap]) => {
      Object.values(localeMap).forEach((slug) => {
        acc[slug] = pageType;
      });
      return acc;
    },
    {} as Record<string, LegalPageType>
  );

export const supportedLegalSlugs = new Set(Object.keys(legalSlugToPageType));

export function getLegalSlug(pageType: LegalPageType, locale: Locale): string {
  return legalSlugs[pageType][locale];
}

export function getLegalPageTypeBySlug(
  slug: string
): LegalPageType | undefined {
  return legalSlugToPageType[slug];
}
