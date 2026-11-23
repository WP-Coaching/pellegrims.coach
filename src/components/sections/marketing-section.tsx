import { useId, type ReactNode } from "react";
import {
  Section,
  SectionActions,
  SectionLayout,
  type SectionLayoutVariant,
  type SectionVariant,
} from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/typography";

type MarketingSectionProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  action?: ReactNode;
  tone?: Extract<SectionVariant, "surface" | "accent" | "muted" | "dark">;
  layout?: Exclude<SectionLayoutVariant, "media">;
};

export function MarketingSection({
  title,
  description,
  children,
  action,
  tone = "surface",
  layout = "stack",
}: MarketingSectionProps) {
  const headingId = useId();

  return (
    <Section aria-labelledby={headingId} variant={tone} contentWidth="6xl">
      <SectionLayout variant={layout} secondary={children}>
        <SectionIntro
          headingId={headingId}
          title={title}
          description={description}
          variant={tone === "dark" ? "inverse" : "standard"}
        />
      </SectionLayout>
      {action && <SectionActions>{action}</SectionActions>}
    </Section>
  );
}

type MarketingHeroProps = {
  label: string;
  title: string;
  description: string;
  action: ReactNode;
  actionNote?: string;
  media: ReactNode;
};

export function MarketingHero({
  label,
  title,
  description,
  action,
  actionNote,
  media,
}: MarketingHeroProps) {
  const headingId = useId();

  return (
    <Section
      aria-labelledby={headingId}
      contentWidth="6xl"
      padding="hero"
      variant="darkGradient"
    >
      <SectionLayout variant="media" secondary={media}>
        <SectionIntro
          variant="hero"
          headingId={headingId}
          label={label}
          title={title}
          description={description}
        />
        <SectionActions note={actionNote} inverted>
          {action}
        </SectionActions>
      </SectionLayout>
    </Section>
  );
}
