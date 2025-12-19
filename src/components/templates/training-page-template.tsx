"use client";

import { useEffect, useState } from "react";
import {
  HeroSection,
  TrainingGroupsSection,
  PracticalInfoSection,
  TrainingDatesSection,
  EnrollmentSection,
} from "@/components/sections";
import type {
  TrainingGroup,
  PracticalInfoItem,
  TrainingMonth,
} from "@/components/sections";
import type { ReactNode } from "react";

export type TrainingPageConfig = {
  hero: {
    title: string;
    intro: string;
    locationText: string;
    locationSuffix: string;
  };
  groups: {
    title: string;
    items: TrainingGroup[];
    columns?: 1 | 2;
  };
  practical: {
    title: string;
    items: PracticalInfoItem[];
  };
  dates: {
    title: string;
    months: TrainingMonth[];
    footerText: string;
  };
  enrollment: {
    title: string;
    subtitle: string;
    form: ReactNode;
    questionsText: string;
    contactLinkText: string;
    contactHref: string;
  };
};

type TrainingPageTemplateProps = {
  config: TrainingPageConfig;
};

export function TrainingPageTemplate({ config }: TrainingPageTemplateProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [groupsVisible, setGroupsVisible] = useState(false);
  const [practicalVisible, setPracticalVisible] = useState(false);
  const [datesVisible, setDatesVisible] = useState(false);

  useEffect(() => {
    const heroRevealFrame = requestAnimationFrame(() => setIsVisible(true));

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    const groupsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setGroupsVisible(true);
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const practicalObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPracticalVisible(true);
      },
      { threshold: 0.1 }
    );

    const datesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setDatesVisible(true);
      },
      { threshold: 0.1 }
    );

    const heroSection = document.getElementById("hero");
    const groupsSection = document.getElementById("training-groups");
    const practicalSection = document.getElementById("practical");
    const datesSection = document.getElementById("dates");

    if (heroSection) heroObserver.observe(heroSection);
    if (groupsSection) groupsObserver.observe(groupsSection);
    if (practicalSection) practicalObserver.observe(practicalSection);
    if (datesSection) datesObserver.observe(datesSection);

    return () => {
      cancelAnimationFrame(heroRevealFrame);
      heroObserver.disconnect();
      groupsObserver.disconnect();
      practicalObserver.disconnect();
      datesObserver.disconnect();
    };
  }, []);

  return (
    <>
      <HeroSection
        title={config.hero.title}
        intro={config.hero.intro}
        locationText={config.hero.locationText}
        locationSuffix={config.hero.locationSuffix}
        isVisible={isVisible}
      />
      <TrainingGroupsSection
        title={config.groups.title}
        groups={config.groups.items}
        isVisible={groupsVisible}
        columns={config.groups.columns}
      />
      <PracticalInfoSection
        title={config.practical.title}
        items={config.practical.items}
        isVisible={practicalVisible}
      />
      <TrainingDatesSection
        title={config.dates.title}
        months={config.dates.months}
        footerText={config.dates.footerText}
        isVisible={datesVisible}
      />
      <EnrollmentSection
        title={config.enrollment.title}
        subtitle={config.enrollment.subtitle}
        form={config.enrollment.form}
        questionsText={config.enrollment.questionsText}
        contactLinkText={config.enrollment.contactLinkText}
        contactHref={config.enrollment.contactHref}
      />
    </>
  );
}
