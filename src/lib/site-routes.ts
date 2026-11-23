import type { Locale } from "./i18n";

type LocalizedPage = "executive-coaching" | "general-terms" | "privacy-policy";

export const localizedPageSlugs: Record<
  LocalizedPage,
  Record<Locale, string>
> = {
  "executive-coaching": {
    en: "executive-coaching",
    nl: "ondernemers",
  },
  "general-terms": {
    en: "general-terms",
    nl: "algemene-voorwaarden",
  },
  "privacy-policy": {
    en: "privacy-policy",
    nl: "privacybeleid",
  },
};

export const localizedPages = Object.keys(
  localizedPageSlugs
) as LocalizedPage[];

export function getLocalizedPageBySlug(
  slug: string
): LocalizedPage | undefined {
  return localizedPages.find((page) =>
    Object.values(localizedPageSlugs[page]).includes(slug)
  );
}

export function getLocalizedPagePath(
  page: LocalizedPage,
  locale: Locale
): string {
  return `/${locale}/${localizedPageSlugs[page][locale]}/`;
}
