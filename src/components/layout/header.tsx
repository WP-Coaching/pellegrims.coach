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
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";

type Props = {
  locale: Locale;
  t: TranslationKey;
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

  const getOtherLocalePath = () => {
    const slugMappings: Record<string, Record<Locale, string>> = {
      "general-terms": { en: "general-terms", nl: "algemene-voorwaarden" },
      "algemene-voorwaarden": {
        en: "general-terms",
        nl: "algemene-voorwaarden",
      },
    };

    for (const [key, mapping] of Object.entries(slugMappings)) {
      if (pathname.includes(`/${key}`)) {
        return pathname
          .replace(`/${locale}`, `/${otherLocale}`)
          .replace(`/${mapping[locale]}`, `/${mapping[otherLocale]}`);
      }
    }

    return pathname.replace(`/${locale}`, `/${otherLocale}`);
  };

  const otherLocalePath = getOtherLocalePath();
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
    { key: "projects", section: "projects" },
    { key: "contact", section: "contact" },
  ] as const;

  type NavItem = (typeof navItems)[number] & { href?: string };

  return (
    <>
      <Header isScrolled={isScrolled}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Stack direction="row" align="center" justify="between">
            {/* Logo Section */}
            <Logo href={homePath} alt="Ward Pellegrims Coaching" />

            {/* Desktop Navigation */}
            <nav className="flex hidden flex-row items-center gap-8 lg:flex">
              {navItems.map((item, index) => {
                const navItem = item as NavItem;
                const isLink = "href" in navItem;

                return (
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
                      href={navItem.href}
                      onClick={
                        !isLink
                          ? () => scrollToSection(navItem.section!)
                          : undefined
                      }
                    >
                      {t.nav[item.key as keyof typeof t.nav]}
                    </NavLink>
                  </motion.div>
                );
              })}
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
              {navItems.map((item, index) => {
                const navItem = item as NavItem;
                return (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MobileNavLink
                      href={navItem.href}
                      onClick={() => {
                        setIsMenuOpen(false);
                        if (!("href" in navItem))
                          scrollToSection(navItem.section!);
                      }}
                    >
                      {t.nav[item.key as keyof typeof t.nav]}
                    </MobileNavLink>
                  </motion.li>
                );
              })}
            </ul>
          </nav>
        </MobileMenuSection>

        {/* Mobile Language Switcher */}
        <MobileMenuSection className="flex justify-center">
          <LanguageSwitcher
            href={otherLocalePath}
            locale={otherLocale}
            onClick={handleLanguageSwitch}
            className="inline-flex items-center space-x-2 rounded-lg p-3 text-primary-700 transition-colors duration-300 hover:bg-primary-50 hover:text-primary-800"
          />
        </MobileMenuSection>
      </MobileMenu>
    </>
  );
}
