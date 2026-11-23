import About from "@/components/sections/about";
import Coaching from "@/components/sections/coaching";
import CtaSection from "@/components/sections/cta-section";
import Groups from "@/components/sections/groups";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import Partners from "@/components/sections/partners";
import StructuredData from "@/components/layout/structured-data";
import { getTranslations } from "@/lib/translations";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { getProjectCards } from "@/lib/projects/get-projects";
import { getGroupTrainingCards } from "@/lib/group-trainings/get-group-trainings";

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
  const [cmsProjects, cmsGroupTrainings] = await Promise.all([
    getProjectCards(locale),
    getGroupTrainingCards(locale),
  ]);

  return (
    <>
      <StructuredData locale={locale} />
      <About locale={locale} t={{ about: t.about }} />
      <CtaSection locale={locale} t={{ cta: t.cta }} />
      <Coaching locale={locale} t={{ coaching: t.coaching }} />
      <Groups
        locale={locale}
        t={{ groups: t.groups }}
        groupTrainings={cmsGroupTrainings}
      />
      <Projects
        title={t.projects.featuredWork}
        viewProjectText={t.projects.viewProject}
        viewText={t.projects.view}
        cmsProjects={cmsProjects}
      />
      <Contact locale={locale} t={{ contact: t.contact }} />
      <Partners t={{ partners: t.partners }} />
    </>
  );
}
