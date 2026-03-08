"use client";

import { SectionHeader } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import { SpotlightBackground } from "@/components/ui/visuals";
import {
  Timeline,
  TimelineItem,
  DatesFooter,
} from "@/components/ui/data-display";

export type TrainingMonth = {
  id: string;
  title: string;
  days: string[];
};

type TrainingDatesSectionProps = {
  title: string;
  months: TrainingMonth[];
  footerText: string;
  locationName: string;
  locationHref: string;
  isVisible: boolean;
};

export function TrainingDatesSection({
  title,
  months,
  footerText,
  locationName,
  locationHref,
  isVisible,
}: TrainingDatesSectionProps) {
  return (
    <Section
      id="dates"
      variant="gradient"
      background={
        <>
          <SpotlightBackground
            asFragment
            spotlights={[
              {
                className:
                  "absolute -top-10 -left-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-30 animate-pulse-slow",
              },
              {
                className:
                  "absolute bottom-0 -right-16 w-72 h-72 bg-primary-50 rounded-full blur-3xl opacity-40 animate-float",
              },
            ]}
          />
          <div className="border-primary-200/40 absolute right-1/4 top-1/3 h-20 w-20 animate-spin-slow rounded-full border-2 opacity-30" />
          <div className="bg-primary-100/50 absolute bottom-1/4 left-1/3 h-16 w-16 animate-float rounded-lg backdrop-blur-sm" />
        </>
      }
    >
      <SectionHeader
        title={title}
        className="mb-14"
        titleClassName="text-3xl md:text-4xl mb-6"
        accentWidth="128px"
      />

      <Timeline isVisible={isVisible}>
        {months.map((month, i) => (
          <TimelineItem
            key={month.id}
            title={month.title}
            days={month.days}
            index={i}
            isVisible={isVisible}
          />
        ))}
      </Timeline>

      <DatesFooter
        footerText={footerText}
        isVisible={isVisible}
        locationName={locationName}
        locationHref={locationHref}
      />
    </Section>
  );
}
