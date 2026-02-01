"use client";

import React from "react";
import { PageHeroContainer, PageHeroContent } from "@/components/ui/hero";
import { TrainingHeroBackground } from "@/components/ui/visuals";

type LegalPageHeaderProps = {
  title: string;
  lastUpdated: string;
  intro: string;
};

export const LegalPageHeader = ({
  title,
  lastUpdated,
  intro,
}: LegalPageHeaderProps) => {
  return (
    <PageHeroContainer id="hero">
      <TrainingHeroBackground />
      <PageHeroContent title={title} intro={intro} location={lastUpdated} />
    </PageHeroContainer>
  );
};
