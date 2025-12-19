import About from "@/components/sections/about";
import Coaching from "@/components/sections/coaching";
import CtaSection from "@/components/sections/cta-section";
import Groups from "@/components/sections/groups";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import StructuredData from "@/components/layout/structured-data";
import { getTranslations } from "@/lib/translations";
import { isValidLocale, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam) ? localeParam : "en";
  const t = getTranslations(locale);

  return (
    <>
      <StructuredData locale={locale} />
      <h1 className="sr-only">{t.meta.title}</h1>
      <About locale={locale} t={t} />
      <CtaSection locale={locale} t={t} />
      <Coaching locale={locale} t={t} />
      <Groups locale={locale} t={t} />
      <Projects locale={locale} t={t} />
      <Contact locale={locale} t={t} />
    </>
  );
}
