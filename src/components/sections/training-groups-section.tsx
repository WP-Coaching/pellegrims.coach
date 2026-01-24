"use client";

import { Section } from "@/components/ui/section";
import { Grid } from "@/components/ui/layout";
import { SectionHeader } from "@/components/ui/typography";
import { TrainingGroupCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type TrainingGroup = {
  title: string;
  time: string;
  description: string;
  bullets: string[];
  motivationalText: string;
};

type TrainingGroupsSectionProps = {
  title: string;
  groups: TrainingGroup[];
  isVisible: boolean;
  columns?: 1 | 2;
};

export function TrainingGroupsSection({
  title,
  groups,
  isVisible,
  columns = 2,
}: TrainingGroupsSectionProps) {
  return (
    <Section id="training-groups" className="bg-white">
      <SectionHeader
        title={title}
        className="mb-16"
        titleClassName="text-3xl md:text-4xl mb-6"
        accentWidth="120px"
      />

      <Grid
        cols={1}
        md={columns}
        gap={8}
        className={cn("mx-auto", columns === 1 ? "max-w-4xl" : "max-w-6xl")}
      >
        {groups.map((group, index) => (
          <TrainingGroupCard
            key={index}
            group={group}
            isVisible={isVisible}
            delay={0.1 + index * 0.05}
          />
        ))}
      </Grid>
    </Section>
  );
}
