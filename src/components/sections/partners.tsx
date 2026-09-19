import Image from "next/image";
import { Container, Grid } from "@/components/ui/layout";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/typography";
import type { TranslationKey } from "@/lib/translations";

type Props = {
  t: TranslationKey;
};

const partners: Array<{
  name: string;
  href: string;
  logo: string;
  logoClassName?: string;
  displayName?: string;
  displaySubtitle?: string;
  logoLayout?: "horizontal";
}> = [
  {
    name: "Orca",
    href: "https://www.orca.com/en-be",
    logo: "/images/partners/orca.svg",
  },
  {
    name: "Precision Fuel & Hydration",
    href: "https://www.precisionhydration.com/eu/en/",
    logo: "/images/partners/precision-fuel-hydration.svg",
  },
  {
    name: "Q36.5",
    href: "https://www.q36-5.com/en-be/",
    logo: "/images/partners/q36-5.svg",
  },
  {
    name: "cotersus",
    href: "https://www.cotersus.be/en",
    logo: "/images/partners/cotersus.svg",
    logoClassName: "h-10 w-10",
    displayName: "Cotersus",
    displaySubtitle: "IT CONSULTING",
    logoLayout: "horizontal",
  },
];

export default function Partners({ t }: Props) {
  return (
    <Section id="partners" variant="glass" padding="compact">
      <Container>
        <SectionHeader
          title={t.partners.title}
          description={t.partners.description}
          className="mb-10"
          descriptionVariant="default"
          accentWidth="96px"
        />

        <Grid cols={1} sm={2} lg={4} gap={4}>
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="group flex min-h-28 items-center justify-center rounded-2xl border border-primary-100 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary-200 hover:shadow-athletic"
              aria-label={`${t.partners.visitLabel} ${partner.name}`}
            >
              {partner.logoLayout === "horizontal" ? (
                <div className="flex items-center gap-3">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary-100 p-1.5">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={200}
                      height={200}
                      className="h-12 w-12 object-contain opacity-90 transition duration-300 group-hover:opacity-100"
                    />
                  </span>
                  <span className="flex flex-col text-left leading-none">
                    <span className="font-fjalla text-3xl tracking-tight text-text">
                      {partner.displayName}
                    </span>
                    {partner.displaySubtitle && (
                      <span className="mt-1 font-brand text-caption font-medium tracking-widest text-text">
                        {partner.displaySubtitle}
                      </span>
                    )}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={360}
                    height={80}
                    className={`${partner.logoClassName ?? "h-16 w-full"} object-contain opacity-90 transition duration-300 group-hover:opacity-100`}
                  />
                </div>
              )}
            </a>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
