"use client";

import { motion } from "framer-motion";
import { useSectionVisibility } from "@/hooks/use-section-visibility";
import { Section } from "@/components/ui/section";
import { Grid } from "@/components/ui/layout";
import { SectionHeader } from "@/components/ui/typography";
import { ProjectCard, type Project } from "@/components/ui/card";
import { ProjectsBackground } from "@/components/ui/visuals";
import type { TranslationKey } from "@/lib/translations";

type Props = {
  t: TranslationKey;
  cmsProjects?: Project[];
};

export default function Projects({ t, cmsProjects = [] }: Props) {
  const isVisible = useSectionVisibility("projects");

  const projects: Project[] = cmsProjects;
  // Grid is 3 columns on large screens; eager-load the first visible row.
  const eagerProjectImageCount = 3;

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
          {projects.map((project, index) => (
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
                renderDescription={(currentProject) =>
                  currentProject.description
                }
                imageLoading={index < eagerProjectImageCount ? "eager" : "lazy"}
              />
            </motion.div>
          ))}
        </Grid>
      </motion.div>
    </Section>
  );
}
