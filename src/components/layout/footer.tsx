"use client";

import { socialLinks } from "@/lib/constants";
import { ActionButton } from "@/components/ui/navigation";
import { Grid, Stack } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import {
  FooterContainer,
  FooterLink,
  FooterBottomBar,
} from "@/components/ui/footer-ui";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

export default function Footer({ locale, t }: Props) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.assign(`/${locale}/#${sectionId}`);
    }
  };

  const legalHref = `/${locale}/${t.footer.legalSlug}`;
  const privacyHref = `/${locale}/${t.footer.privacySlug}`;

  return (
    <FooterContainer>
      <Grid cols={1} md={3} gap={8} className="text-center md:text-left">
        {/* Company Info */}
        <Stack gap={4}>
          <Heading level="h3" variant="card">
            {t.footer.companyName}
          </Heading>
          <Stack gap={1}>
            <Text variant="small" color="muted">
              {t.footer.legalForm}
            </Text>
            <Text variant="small" color="muted">
              {t.footer.address}
            </Text>
            <Text variant="small" color="muted">
              {t.footer.vatNumber}
            </Text>
          </Stack>
        </Stack>

        {/* Navigation */}
        <Stack gap={4}>
          <Heading level="h3" variant="card">
            {t.footer.navigationTitle}
          </Heading>
          <ul className="flex flex-col gap-2">
            {[
              { key: "about", section: "about" },
              { key: "coaching", section: "coaching" },
              { key: "projects", section: "projects" },
              { key: "groupTraining", href: `/${locale}/groepstraining` },
              { key: "contact", section: "contact" },
            ].map((item) => {
              const content = t.nav[item.key as keyof typeof t.nav];

              return (
                <li key={item.key}>
                  <FooterLink
                    href={"href" in item ? item.href : undefined}
                    onClick={
                      "section" in item && item.section
                        ? () => scrollToSection(item.section as string)
                        : undefined
                    }
                  >
                    {content}
                  </FooterLink>
                </li>
              );
            })}
          </ul>
        </Stack>

        {/* Social Media */}
        <Stack gap={4}>
          <Heading level="h3" variant="card">
            {t.footer.followUs}
          </Heading>
          <Stack
            direction="row"
            gap={4}
            className="justify-center md:justify-start"
          >
            {socialLinks.map((social, index) => (
              <ActionButton
                key={index}
                href={social.href}
                icon={social.icon}
                platform={social.platform}
                size={20}
                className="p-2"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </Stack>
        </Stack>
      </Grid>

      {/* Bottom Bar */}
      <FooterBottomBar>
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <span className="block md:inline">{t.footer.copyright}</span>
          <span className="hidden text-gray-400 md:inline">•</span>
          <span>
            Website door{" "}
            <a
              href="https://www.cotersus.be/"
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="text-gray-600 transition-colors hover:text-text"
            >
              Cotersus
            </a>
          </span>
        </div>
        <div className="mt-2 flex flex-col items-center gap-2 md:mt-0 md:flex-row md:gap-4">
          <FooterLink href={legalHref}>{t.footer.legal}</FooterLink>
          <span className="hidden text-gray-400 md:inline">•</span>
          <FooterLink href={privacyHref}>{t.footer.privacy}</FooterLink>
        </div>
      </FooterBottomBar>
    </FooterContainer>
  );
}
