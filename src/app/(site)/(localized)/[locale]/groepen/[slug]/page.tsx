import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import StructuredData from "@/components/layout/structured-data";
import { TrainingPageTemplate } from "@/components/templates";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getTranslations } from "@/lib/translations";
import {
  buildTrainingConfig,
  getPublishedGroupTraining,
} from "@/lib/group-trainings/group-training-detail";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : "en";
  const groupTraining = await getPublishedGroupTraining(locale, slug);

  if (!groupTraining) {
    return {};
  }

  const title = groupTraining.title;
  const description = groupTraining.subtitle;
  return buildPageMetadata({
    locale,
    title,
    description,
    currentPath: `/${locale}/groepen/${slug}/`,
    languagePaths: {
      en: `/en/groepen/${slug}/`,
      nl: `/nl/groepen/${slug}/`,
    },
    parent,
  });
}

export default async function GroupTrainingPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isValidLocale(localeParam) ? localeParam : "en";
  const groupTraining = await getPublishedGroupTraining(locale, slug);

  if (!groupTraining) {
    notFound();
  }

  const config = buildTrainingConfig(
    locale,
    groupTraining,
    getTranslations(locale).groupTrainingDetail
  );

  return (
    <>
      <StructuredData
        locale={locale}
        pageName={groupTraining.title}
        path={`/${locale}/groepen/${slug}/`}
      />
      <TrainingPageTemplate config={config} />
    </>
  );
}
