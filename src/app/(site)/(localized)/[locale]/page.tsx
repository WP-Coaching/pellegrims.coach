import About from "@/components/sections/about";
import Coaching from "@/components/sections/coaching";
import CtaSection from "@/components/sections/cta-section";
import Groups from "@/components/sections/groups";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import StructuredData from "@/components/layout/structured-data";
import { getTranslations } from "@/lib/translations";
import { isValidLocale, type Locale } from "@/lib/i18n";

import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : "en";
  const t = getTranslations(locale);

  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: t.meta.keywords,
  };
}

export default async function Home({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam) ? localeParam : "en";
  const t = getTranslations(locale);

  return (
    <>
      <StructuredData locale={locale} />
      <About locale={locale} t={t} />
      <CtaSection locale={locale} t={t} />
      <Coaching locale={locale} t={t} />
      <Groups locale={locale} t={t} />
      <Projects locale={locale} t={t} />
      <Contact locale={locale} t={t} />
    </>
  );
}
