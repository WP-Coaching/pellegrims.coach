import type { Metadata } from "next";
import { CallToActionLink } from "@/components/ui/button";
import {
  MarketingHero,
  MarketingSection,
} from "@/components/sections/marketing-section";
import { FramedImage } from "@/components/ui/framed-image";
import { TitledList } from "@/components/ui/titled-list";
import { Prose } from "@/components/ui/typography";
import { EXECUTIVE_COACHING_CONTACT_TOPIC } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getLocalizedPagePath } from "@/lib/site-routes";
import { getTranslations } from "@/lib/translations";

const portrait = "/images/avatar.jpg";

export async function getExecutiveCoachingMetadata(
  locale: Locale
): Promise<Metadata> {
  const { title, description } = getTranslations(locale).executiveCoaching.meta;
  const image = {
    url: `https://www.pellegrims.coach${portrait}`,
    alt: "Ward Pellegrims",
  };
  const metadata = await buildPageMetadata({
    locale,
    title,
    description,
    currentPath: getLocalizedPagePath("executive-coaching", locale),
    languagePaths: {
      en: getLocalizedPagePath("executive-coaching", "en"),
      nl: getLocalizedPagePath("executive-coaching", "nl"),
    },
  });

  return {
    ...metadata,
    keywords: null,
    openGraph: { ...metadata.openGraph, images: [image] },
    twitter: { card: "summary", title, description, images: [image] },
  };
}

function EmphasizedText({ text }: { text: string }) {
  return text
    .split("**")
    .map((part, index) =>
      index % 2 === 0 ? part : <strong key={index}>{part}</strong>
    );
}

function CopyParagraphs({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <Prose>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>
          <EmphasizedText text={paragraph} />
        </p>
      ))}
    </Prose>
  );
}

export default function ExecutiveCoachingPage({ locale }: { locale: Locale }) {
  const {
    introCta,
    hero,
    recognition,
    bridge,
    pillars,
    process,
    profile,
    closing,
  } = getTranslations(locale).executiveCoaching;
  const introHref = `/${locale}/?contact=${EXECUTIVE_COACHING_CONTACT_TOPIC}#contact`;
  const introAction = (
    <CallToActionLink href={introHref}>{introCta}</CallToActionLink>
  );

  return (
    <article>
      <MarketingHero
        title={hero.title}
        label={hero.label}
        description={hero.description}
        action={introAction}
        media={
          <FramedImage
            src={portrait}
            alt="Ward Pellegrims"
            width={170}
            height={170}
            sizes="(min-width: 1024px) 264px, (min-width: 640px) 232px, 184px"
          />
        }
      />

      <MarketingSection
        title={recognition.title}
        description={recognition.description}
        layout="split"
      >
        <TitledList
          variant="highlight"
          label={recognition.prompt}
          items={recognition.items}
        />
      </MarketingSection>

      <MarketingSection title={bridge.title} layout="split" tone="accent">
        <CopyParagraphs paragraphs={bridge.paragraphs} />
      </MarketingSection>

      <MarketingSection title={pillars.title}>
        <TitledList variant="grid" items={pillars.items} />
      </MarketingSection>

      <MarketingSection title={process.title} tone="muted" action={introAction}>
        <TitledList variant="numbered" items={process.items} />
      </MarketingSection>

      <MarketingSection title={profile.title} layout="split">
        <CopyParagraphs paragraphs={profile.paragraphs} />
      </MarketingSection>

      <MarketingSection
        title={closing.title}
        description={closing.description}
        tone="dark"
        action={introAction}
      />
    </article>
  );
}
