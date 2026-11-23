import type { Metadata, ResolvingMetadata } from "next";
import { redirect, notFound } from "next/navigation";
import { getTranslations } from "@/lib/translations";
import { defaultLocale, isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/page-metadata";
import {
  getLocalizedPageBySlug,
  getLocalizedPagePath,
  localizedPageSlugs,
} from "@/lib/site-routes";
import ExecutiveCoachingPage, {
  getExecutiveCoachingMetadata,
} from "@/components/views/executive-coaching-page";
import { GeneralTerms } from "@/components/views/general-terms-page";
import { PrivacyPolicy } from "@/components/views/privacy-policy-page";

type RouteParams = { locale: string; slug: string };

type Props = {
  params: Promise<RouteParams>;
};

export function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (!isValidLocale(locale)) return [];

  return Object.values(localizedPageSlugs).map((slugs) => ({
    slug: slugs[locale],
  }));
}

function resolvePage({ locale: localeParam, slug }: RouteParams) {
  const locale = isValidLocale(localeParam) ? localeParam : undefined;
  const pageType = getLocalizedPageBySlug(slug);
  if (!pageType) return;

  if (
    pageType === "executive-coaching" &&
    (!locale || slug !== localizedPageSlugs[pageType][locale])
  ) {
    return;
  }

  return { locale: locale ?? defaultLocale, pageType };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = resolvePage(await params);
  if (!page) return {};

  const { locale, pageType } = page;
  if (pageType === "executive-coaching") {
    return getExecutiveCoachingMetadata(locale);
  }

  const t = getTranslations(locale);
  const txt = pageType === "general-terms" ? t.generalTerms : t.privacyPolicy;

  return buildPageMetadata({
    locale,
    title: txt.meta.title,
    description: txt.meta.description,
    currentPath: getLocalizedPagePath(pageType, locale),
    languagePaths: {
      en: getLocalizedPagePath(pageType, "en"),
      nl: getLocalizedPagePath(pageType, "nl"),
    },
    parent,
  });
}

export default async function LocalizedPage({ params }: Props) {
  const routeParams = await params;
  const page = resolvePage(routeParams);
  if (!page) notFound();

  const { locale, pageType } = page;
  if (pageType === "executive-coaching") {
    return <ExecutiveCoachingPage locale={locale} />;
  }

  // Redirect if slug doesn't match the expected slug for this locale
  if (routeParams.slug !== localizedPageSlugs[pageType][locale]) {
    redirect(getLocalizedPagePath(pageType, locale));
  }

  const t = getTranslations(locale);

  if (pageType === "general-terms") {
    return <GeneralTerms translations={{ generalTerms: t.generalTerms }} />;
  }

  return <PrivacyPolicy translations={{ privacyPolicy: t.privacyPolicy }} />;
}
