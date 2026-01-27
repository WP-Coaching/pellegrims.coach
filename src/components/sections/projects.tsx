"use client";

import { motion } from "framer-motion";
import { useSectionVisibility } from "@/hooks/use-section-visibility";
import { Section } from "@/components/ui/section";
import { Grid } from "@/components/ui/layout";
import { SectionHeader } from "@/components/ui/typography";
import { ProjectCard, type Project } from "@/components/ui/card";
import { ProjectsBackground } from "@/components/ui/visuals";
import { Link } from "@/components/ui/link";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

export default function Projects({ t }: Props) {
  const isVisible = useSectionVisibility("projects");

  const projects: Project[] = [
    {
      image: "/images/testdag-wetsuits-28-feb.png",
      title: t.projects.items.wetsuitTestDayFeb28.title,
      description: t.projects.items.wetsuitTestDayFeb28.description,
      link: "https://docs.google.com/forms/d/e/1FAIpQLScoTuDmXAyQ4jfdV_WTqJ_ylwGxmeFozx0fty84Wthe-fFCSA/viewform?usp=header",
      category: t.projects.categories.triathlon,
      featured: true,
    },
    {
      image: "/images/testdag-wetsuits.png",
      title: t.projects.items.wetsuitTestDay.title,
      description: t.projects.items.wetsuitTestDay.description,
      link: "https://docs.google.com/forms/d/1RHxrbavY7qfqOn8DiZHwTnrHtX_vaVelio7R8c26gdQ/edit",
      category: t.projects.categories.triathlon,
      featured: true,
    },
    {
      image: "/images/lanzarote.avif",
      title: t.projects.items.laSanta.title,
      description: t.projects.items.laSanta.description,
      link: null,
      category: t.projects.categories.triathlon,
      featured: true,
    },
    {
      image: "/images/trainingpeaks-logo.png",
      title: t.projects.items.trainingPlans.title,
      description: t.projects.linkTexts.plansAvailableOn,
      link: "https://www.trainingpeaks.com/coach/pellegrims#trainingplans",
      category: t.projects.categories.triathlon,
      featured: true,
      embeddedLink: {
        url: "https://www.trainingpeaks.com/coach/pellegrims#trainingplans",
        text: "TrainingPeaks.com",
      },
    },
    {
      image: "/images/pic01.jpg",
      title: t.projects.items.eliteSwimmers.title,
      description: t.projects.items.eliteSwimmers.description,
      link: null,
      category: t.projects.categories.swimming,
      featured: true,
    },
    {
      image: "/images/rvo-kenia.jpg",
      title: t.projects.items.rvoKenia.title,
      description: t.projects.items.rvoKenia.description,
      link: "https://www.riftvalleyodyssey.com",
      category: t.projects.categories.cycling,
      featured: true,
    },
    {
      image: "/images/rwanda1.jpg",
      title: t.projects.items.rwanda.title,
      description: t.projects.items.rwanda.description,
      link: "https://www.rwandanepic.com/",
      category: t.projects.categories.cycling,
      featured: true,
    },
    {
      image: "/images/rdmlogo.png",
      title: t.projects.items.rocDuMaroc.title,
      description: t.projects.items.rocDuMaroc.description,
      link: "https://www.rocdumaroc.com/",
      category: t.projects.categories.cycling,
      featured: true,
    },
  ];

  const featuredProjects = projects.filter((p) => p.featured);

  const renderProjectDescription = (project: Project) => {
    if (project.embeddedLink) {
      return (
        <>
          {project.description}{" "}
          <Link href={project.embeddedLink.url} external>
            {project.embeddedLink.text}
          </Link>
          {project.additionalText && <> {project.additionalText}</>}
        </>
      );
    }
    return project.description;
  };

  return (
    <Section
      id="projects"
      variant="default"
      background={<ProjectsBackground />}
    >
      <SectionHeader
        title={t.projects.featuredWork}
        className="mb-16"
        titleClassName="text-4xl md:text-5xl mb-6"
        accentWidth="120px"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <Grid cols={1} md={2} lg={3} gap={6}>
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              className="group relative"
            >
              <ProjectCard
                project={project}
                viewProjectText={t.projects.viewProject}
                viewText={t.projects.view}
                renderDescription={renderProjectDescription}
              />
            </motion.div>
          ))}
        </Grid>
      </motion.div>
    </Section>
  );
}
