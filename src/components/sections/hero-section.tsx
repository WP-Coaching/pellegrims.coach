import { TrainingHeroBackground } from "@/components/ui/visuals";
import {
  PageHeroContainer,
  PageHeroContent,
  type HeroBadge,
} from "@/components/ui/hero";
import type { ReactNode } from "react";

type HeroSectionProps = {
  badges?: HeroBadge[];
  title: string;
  intro: string;
  meta?: ReactNode;
};

export function HeroSection({ badges, title, intro, meta }: HeroSectionProps) {
  return (
    <PageHeroContainer id="hero">
      <TrainingHeroBackground />

      <PageHeroContent
        badges={badges}
        title={
          <span className="mx-auto block max-w-4xl leading-tight">{title}</span>
        }
        intro={intro}
        location={meta}
      />
    </PageHeroContainer>
  );
}
