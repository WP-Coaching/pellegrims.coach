"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Stack } from "@/components/ui/layout";
import {
  Header,
  Logo,
  NavLink,
  LanguageSwitcher,
  MobileMenuToggle,
  MobileMenu,
  MobileNavLink,
  MobileMenuSection,
  MobileMenuProfile,
} from "@/components/ui/navigation";
import { removeLocaleFromPath, type Locale } from "@/lib/i18n";
import {
  getLocalizedPageBySlug,
  getLocalizedPagePath,
} from "@/lib/site-routes";
import type { TranslationKey } from "@/lib/translations";

type Props = {
  locale: Locale;
  t: Pick<TranslationKey, "nav">;
};

export default function AppHeader({ locale, t }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
      return;
    }
    const homeAnchor = `/${locale}/#${sectionId}`;
    window.location.assign(homeAnchor);
  };

  const otherLocale = locale === "en" ? "nl" : "en";

  const slug = removeLocaleFromPath(pathname).slice(1).replace(/\/$/, "");
  const page = getLocalizedPageBySlug(slug);
  const otherLocalePath = page
    ? getLocalizedPagePath(page, otherLocale)
    : pathname.replace(`/${locale}`, `/${otherLocale}`);
  const homePath = `/${locale}/`;

  const handleLanguageSwitch = () => {
    sessionStorage.setItem("manualLanguageChoice", "true");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "about", section: "story" },
    { key: "coaching", section: "coaching" },
    { key: "groupTraining", section: "groups" },
    {
      key: "executiveCoaching",
      href: getLocalizedPagePath("executive-coaching", locale),
    },
    { key: "projects", section: "projects" },
    { key: "contact", section: "contact" },
  ] as const;

  return (
    <>
      <Header isScrolled={isScrolled}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Stack direction="row" align="center" justify="between">
            {/* Logo Section */}
            <Logo href={homePath} alt="Ward Pellegrims Coaching" />

            {/* Desktop Navigation */}
            <nav className="hidden flex-row items-center gap-5 lg:flex xl:gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -2 }}
                >
                  <NavLink
                    href={"href" in item ? item.href : undefined}
                    onClick={
                      "section" in item
                        ? () => scrollToSection(item.section)
                        : undefined
                    }
                  >
                    {t.nav[item.key]}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <Stack direction="row" align="center" gap={4}>
              {/* Language Switcher */}
              <LanguageSwitcher
                href={otherLocalePath}
                locale={otherLocale}
                onClick={handleLanguageSwitch}
              />

              {/* Mobile Menu Button */}
              <MobileMenuToggle
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </Stack>
          </Stack>
        </div>
      </Header>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        {/* Mobile Profile */}
        <MobileMenuProfile>
          <div className="mx-auto h-16 w-auto">
            <Image
              src="/images/WPC_Logo_Horizontal_FullColour.png"
              alt="Ward Pellegrims Coaching"
              width={320}
              height={128}
              className="h-full w-auto object-contain"
            />
          </div>
        </MobileMenuProfile>

        <MobileMenuSection>
          <nav className="flex flex-col gap-2">
            <ul className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.key}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MobileNavLink
                    href={"href" in item ? item.href : undefined}
                    onClick={() => {
                      setIsMenuOpen(false);
                      if ("section" in item) scrollToSection(item.section);
                    }}
                  >
                    {t.nav[item.key]}
                  </MobileNavLink>
                </motion.li>
              ))}
            </ul>
          </nav>
        </MobileMenuSection>

        {/* Mobile Language Switcher */}
        <MobileMenuSection className="flex justify-center">
          <LanguageSwitcher
            href={otherLocalePath}
            locale={otherLocale}
            onClick={handleLanguageSwitch}
          />
        </MobileMenuSection>
      </MobileMenu>
    </>
  );
}
