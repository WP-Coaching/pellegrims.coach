import type { Metadata, ResolvingMetadata } from "next";
import { redirect, notFound } from "next/navigation";
import { getTranslations } from "@/lib/translations";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/page-metadata";
import {
  type LegalPageType,
  getLegalSlug,
  getLegalPageTypeBySlug,
  legalSlugs,
  supportedLegalSlugs,
} from "@/lib/legal";
import { GeneralTerms } from "@/components/views/general-terms-page";
import { PrivacyPolicy } from "@/components/views/privacy-policy-page";

type Params = Promise<{ locale: string; termsSlug: string }>;

type Props = {
  params: Params;
};

export async function generateStaticParams() {
  const params: { locale: string; termsSlug: string }[] = [];
  Object.values(legalSlugs).forEach((localeMap) => {
    Object.entries(localeMap).forEach(([locale, termsSlug]) => {
      params.push({ locale, termsSlug });
    });
  });
  return params;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale: localeParam, termsSlug } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : "en";

  if (!supportedLegalSlugs.has(termsSlug)) {
    return {};
  }

  const pageType = getLegalPageTypeBySlug(termsSlug) as LegalPageType;

  const t = getTranslations(locale);
  const txt = pageType === "general-terms" ? t.generalTerms : t.privacyPolicy;

  const pageSlug = getLegalSlug(pageType, locale);

  return buildPageMetadata({
    locale,
    title: txt.meta.title,
    description: txt.meta.description,
    currentPath: `/${locale}/${pageSlug}/`,
    languagePaths: {
      en: `/en/${getLegalSlug(pageType, "en")}/`,
      nl: `/nl/${getLegalSlug(pageType, "nl")}/`,
    },
    parent,
  });
}

export default async function LegalPage({ params }: Props) {
  const { locale: localeParam, termsSlug } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? (localeParam as Locale)
    : "en";

  if (!supportedLegalSlugs.has(termsSlug)) {
    notFound();
  }

  const pageType = getLegalPageTypeBySlug(termsSlug) as LegalPageType;
  const expectedSlug = getLegalSlug(pageType, locale);

  // Redirect if slug doesn't match the expected slug for this locale
  if (termsSlug !== expectedSlug) {
    redirect(`/${locale}/${expectedSlug}`);
  }

  const t = getTranslations(locale);

  if (pageType === "general-terms") {
    return <GeneralTerms translations={t} />;
  }

  return <PrivacyPolicy translations={t} />;
}
