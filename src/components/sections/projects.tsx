"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ExternalLinkIcon, ArrowRightIcon } from "@/components/icons";
import { AthleticCard } from "@/components/ui/athletic-card";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightBackground } from "@/components/ui/spotlight-background";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

type Project = {
  image: string;
  title: string;
  description: string;
  link: string | null;
  category: string;
  featured: boolean;
  embeddedLink?: {
    url: string;
    text: string;
  };
  additionalText?: string;
};

export default function Projects({ t, locale }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("projects");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const projects: Project[] = [
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
          <a
            href={project.embeddedLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ocean-600 transition-colors hover:text-ocean-700"
          >
            {project.embeddedLink.text}
          </a>
          {project.additionalText && <> {project.additionalText}</>}
        </>
      );
    }
    return project.description;
  };

  return (
    <section id="projects" className="relative bg-white py-24">
      {/* Background Elements */}
      <SpotlightBackground
        spotlights={[
          {
            className:
              "absolute top-1/4 -left-32 w-64 h-64 bg-ocean-100 rounded-full opacity-30 blur-3xl",
          },
          {
            className:
              "absolute bottom-1/4 -right-32 w-64 h-64 bg-ocean-200 rounded-full opacity-20 blur-3xl",
          },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <SectionHeader
          title={t.projects.featuredWork}
          className="mb-16"
          titleClassName="text-4xl md:text-5xl mb-6"
          accentWidth="120px"
        />

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <AthleticCard variant="project">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="h-full w-full"
                    >
                      <Image
                        src={project.image}
                        alt={
                          project.image.includes("trainingpeaks-logo")
                            ? "TrainingPeaks Logo"
                            : `${project.title} - ${project.category}`
                        }
                        fill
                        className={
                          project.image.includes("trainingpeaks-logo")
                            ? "bg-white object-contain p-4"
                            : "object-cover"
                        }
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>

                    {/* Category Badge */}
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-gradient-ocean px-3 py-1 text-sm font-semibold text-white shadow-lg">
                        {project.category}
                      </span>
                    </div>

                    {/* Link Overlay */}
                    {project.link && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-athletic-dark/80"
                      >
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 font-semibold text-white transition-colors hover:text-ocean-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>{t.projects.viewProject}</span>
                          <ExternalLinkIcon />
                        </motion.a>
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="mb-2 font-display text-lg font-bold text-athletic-dark transition-colors group-hover:text-ocean-700">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-ocean-600"
                        >
                          {project.title}
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    <p className="mb-3 text-sm leading-relaxed text-gray-600">
                      {renderProjectDescription(project)}
                    </p>

                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center text-sm font-medium text-ocean-600 hover:text-ocean-700"
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        aria-label={`${t.projects.viewProject}: ${project.title}`}
                      >
                        <span>{t.projects.view}</span>
                        <ArrowRightIcon className="ml-1 text-xs transition-transform group-hover/link:translate-x-1" />
                      </motion.a>
                    )}
                  </div>
                </AthleticCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
