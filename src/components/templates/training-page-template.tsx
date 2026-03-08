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
import type { EnrollmentSignupConfig } from "@/components/sections/enrollment";
import type { Locale } from "@/lib/i18n";
import type { HeroBadge } from "@/components/ui/hero";

export type TrainingPageConfig = {
  locale: Locale;
  hero: {
    badges?: HeroBadge[];
    title: string;
    intro: string;
    locationText: string;
    locationName: string;
    locationHref: string;
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
  datesFooter: {
    locationName: string;
    locationHref: string;
  };
  enrollment: {
    title: string;
    subtitle: string;
    signup: EnrollmentSignupConfig;
    questionsText: string;
    contactLinkText: string;
    contactHref: string;
  };
};

type TrainingPageTemplateProps = {
  config: TrainingPageConfig;
};

export function TrainingPageTemplate({ config }: TrainingPageTemplateProps) {
  const [groupsVisible, setGroupsVisible] = useState(false);
  const [practicalVisible, setPracticalVisible] = useState(false);
  const [datesVisible, setDatesVisible] = useState(false);

  useEffect(() => {
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

    const groupsSection = document.getElementById("training-groups");
    const practicalSection = document.getElementById("practical");
    const datesSection = document.getElementById("dates");

    if (groupsSection) groupsObserver.observe(groupsSection);
    if (practicalSection) practicalObserver.observe(practicalSection);
    if (datesSection) datesObserver.observe(datesSection);

    return () => {
      groupsObserver.disconnect();
      practicalObserver.disconnect();
      datesObserver.disconnect();
    };
  }, []);

  return (
    <>
      <HeroSection
        badges={config.hero.badges}
        title={config.hero.title}
        intro={config.hero.intro}
        meta={
          <>
            {config.hero.locationText}{" "}
            <a
              href={config.hero.locationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary-700 hover:underline"
            >
              {config.hero.locationName}
            </a>
          </>
        }
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
        locationName={config.datesFooter.locationName}
        locationHref={config.datesFooter.locationHref}
        isVisible={datesVisible}
      />
      <EnrollmentSection
        locale={config.locale}
        title={config.enrollment.title}
        subtitle={config.enrollment.subtitle}
        signup={config.enrollment.signup}
        questionsText={config.enrollment.questionsText}
        contactLinkText={config.enrollment.contactLinkText}
        contactHref={config.enrollment.contactHref}
      />
    </>
  );
}
