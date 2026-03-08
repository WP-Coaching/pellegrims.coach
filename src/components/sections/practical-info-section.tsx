"use client";

import { SectionHeader } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";
import { SpotlightBackground } from "@/components/ui/visuals";
import { InfoList, InfoItem } from "@/components/ui/data-display";
import type { ReactNode } from "react";

export type PracticalInfoItem = {
  label: string;
  value: ReactNode;
  href?: string;
  external?: boolean;
  icon: ReactNode;
};

type PracticalInfoSectionProps = {
  title: string;
  items: PracticalInfoItem[];
  isVisible: boolean;
};

export function PracticalInfoSection({
  title,
  items,
  isVisible,
}: PracticalInfoSectionProps) {
  return (
    <Section
      id="practical"
      variant="gradient"
      background={
        <SpotlightBackground
          asFragment
          spotlights={[
            {
              className:
                "absolute top-16 left-16 w-20 h-20 bg-primary-100 rounded-full blur-3xl opacity-20 animate-pulse-slow",
            },
            {
              className:
                "absolute bottom-16 right-16 w-24 h-24 bg-primary-50 rounded-full blur-3xl opacity-30 animate-float",
            },
          ]}
        />
      }
    >
      <SectionHeader
        title={title}
        className="mb-12"
        titleClassName="text-3xl md:text-4xl mb-6"
        accentWidth="96px"
      />

      <InfoList isVisible={isVisible}>
        {items.map((item, i) => (
          <InfoItem
            key={i}
            icon={item.icon}
            label={item.label}
            value={item.value}
            href={item.href}
            external={item.external}
            index={i}
            isVisible={isVisible}
          />
        ))}
      </InfoList>
    </Section>
  );
}
