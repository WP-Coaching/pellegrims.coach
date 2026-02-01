import { TrainingHeroBackground } from "@/components/ui/visuals";
import { PageHeroContainer, PageHeroContent } from "@/components/ui/hero";

type HeroSectionProps = {
  title: string;
  intro: string;
  locationText: string;
  locationSuffix: string;
};

export function HeroSection({
  title,
  intro,
  locationText,
  locationSuffix,
}: HeroSectionProps) {
  return (
    <PageHeroContainer id="hero">
      <TrainingHeroBackground />

      <PageHeroContent
        title={title}
        intro={intro}
        location={
          <>
            {locationText}{" "}
            <a
              href="https://maps.app.goo.gl/LLJVUopK1vmeFsZWA"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary-700 hover:underline"
            >
              Topsportbad Wezenberg
            </a>{" "}
            {locationSuffix}
          </>
        }
      />
    </PageHeroContainer>
  );
}
