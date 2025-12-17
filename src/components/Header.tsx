"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EnvelopeIcon,
  BarsIcon,
  TimesIcon,
  GlobeIcon,
} from "@/components/icons";
import { GlassHeader } from "@/components/ui/glass-header";
import { socialLinks } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";

export const SocialLink = ({
  href,
  icon: Icon,
  platform,
  size = 18,
  className = "",
  ...motionProps
}: {
  href: string;
  icon: React.ComponentType<{ size: number }>;
  platform: string;
  size?: number;
  className?: string;
} & React.ComponentProps<typeof motion.a>) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`rounded-full text-ocean-700 transition-all duration-300 hover:bg-ocean-50 hover:text-ocean-800 ${className}`}
    aria-label={`Visit ${platform} profile`}
    {...motionProps}
  >
    <Icon size={size} />
  </motion.a>
);

// Contact button component
const ContactButton = ({
  onClick,
  size = 18,
  className = "",
  ...motionProps
}: {
  onClick: () => void;
  size?: number;
  className?: string;
} & React.ComponentProps<typeof motion.button>) => (
  <motion.button
    onClick={onClick}
    className={`rounded-full text-ocean-700 transition-all duration-300 hover:bg-ocean-50 hover:text-ocean-800 ${className}`}
    title="Contact me"
    aria-label="Contact me"
    {...motionProps}
  >
    <EnvelopeIcon size={size} />
  </motion.button>
);

type Props = {
  locale: Locale;
  t: TranslationKey;
};

export default function Header({ locale, t }: Props) {
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
    // Fallback: navigate to the homepage anchor if section is not on this page
    const homeAnchor = `/${locale}/#${sectionId}`;
    window.location.assign(homeAnchor);
  };

  const otherLocale = locale === "en" ? "nl" : "en";

  // Handle special paths with locale-specific slugs
  const getOtherLocalePath = () => {
    // Map of locale-specific slugs
    const slugMappings: Record<string, Record<Locale, string>> = {
      "general-terms": { en: "general-terms", nl: "algemene-voorwaarden" },
      "algemene-voorwaarden": {
        en: "general-terms",
        nl: "algemene-voorwaarden",
      },
    };

    // Check if current path contains any special slug
    for (const [key, mapping] of Object.entries(slugMappings)) {
      if (pathname.includes(`/${key}`)) {
        return pathname
          .replace(`/${locale}`, `/${otherLocale}`)
          .replace(`/${mapping[locale]}`, `/${mapping[otherLocale]}`);
      }
    }

    // Default: simple locale replacement
    return pathname.replace(`/${locale}`, `/${otherLocale}`);
  };

  const otherLocalePath = getOtherLocalePath();
  const homePath = `/${locale}/`;

  const handleLanguageSwitch = () => {
    // Mark that user has manually chosen a language
    sessionStorage.setItem("manualLanguageChoice", "true");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Modern Athletic Header */}
      <GlassHeader isScrolled={isScrolled}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={homePath}
                aria-label="Ward Pellegrims Coaching homepage"
              >
                <div className="h-12 w-auto">
                  <Image
                    src="/images/WPC_Logo_Horizontal_FullColour.png"
                    alt="Ward Pellegrims Coaching"
                    width={240}
                    height={96}
                    className="h-full w-auto object-contain"
                    priority
                  />
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-8 lg:flex">
              {[
                { key: "about", section: "story" },
                { key: "coaching", section: "coaching" },
                { key: "groupTraining", section: "groups" },
                { key: "projects", section: "projects" },
                { key: "contact", section: "contact" },
              ].map((item, index) => {
                const isLink = "href" in item;
                const content = (
                  <>
                    {t.nav[item.key as keyof typeof t.nav]}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-ocean transition-all duration-300 group-hover:w-full"></span>
                  </>
                );

                const commonProps = {
                  className:
                    "group relative font-medium text-athletic-dark transition-colors duration-300 hover:text-ocean-600",
                };

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
                    {isLink ? (
                      <Link href={item.href!} {...commonProps}>
                        {content}
                      </Link>
                    ) : (
                      <button
                        onClick={() => scrollToSection(item.section!)}
                        {...commonProps}
                      >
                        {content}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <Link
                href={otherLocalePath}
                onClick={handleLanguageSwitch}
                className="flex items-center space-x-2 rounded-lg p-2 text-ocean-700 transition-colors duration-300 hover:bg-ocean-50 hover:text-ocean-800"
              >
                <GlobeIcon size={16} />
                <span className="text-sm font-medium">
                  {otherLocale.toUpperCase()}
                </span>
              </Link>

              {/* Social Links - Desktop */}
              <div className="hidden items-center space-x-3 md:flex">
                {socialLinks.map((social, index) => (
                  <SocialLink
                    key={index}
                    href={social.href}
                    icon={social.icon}
                    platform={social.platform}
                    className="p-2"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}

                {/* Contact Button */}
                <ContactButton
                  onClick={() => scrollToSection("contact")}
                  className="p-2"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                />
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-lg p-2 text-athletic-dark transition-colors duration-300 hover:bg-ocean-50 lg:hidden"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-haspopup="true"
              >
                {isMenuOpen ? <TimesIcon size={24} /> : <BarsIcon size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </GlassHeader>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 lg:hidden"
            id="mobile-menu"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-athletic-dark/80 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl"
            >
              <div className="px-8 pb-4 pt-6">
                {/* Mobile Profile */}
                <div className="mb-4 text-center">
                  <div className="mx-auto mb-4 h-16 w-auto">
                    <Image
                      src="/images/WPC_Logo_Horizontal_FullColour.png"
                      alt="Ward Pellegrims Coaching"
                      width={320}
                      height={128}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="mb-8">
                  <ul className="space-y-2">
                    {[
                      { key: "about", section: "story" },
                      { key: "coaching", section: "coaching" },
                      { key: "groupTraining", section: "groups" },
                      { key: "projects", section: "projects" },
                      { key: "contact", section: "contact" },
                    ].map((item, index) => (
                      <motion.li
                        key={item.key}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {"href" in item ? (
                          <Link
                            href={item.href!}
                            onClick={() => setIsMenuOpen(false)}
                            className="block w-full rounded-lg px-4 py-3 text-left font-medium text-athletic-dark transition-all duration-300 hover:bg-ocean-50 hover:text-ocean-700"
                          >
                            {t.nav[item.key as keyof typeof t.nav]}
                          </Link>
                        ) : (
                          <button
                            onClick={() => scrollToSection(item.section!)}
                            className="w-full rounded-lg px-4 py-3 text-left font-medium text-athletic-dark transition-all duration-300 hover:bg-ocean-50 hover:text-ocean-700"
                          >
                            {t.nav[item.key as keyof typeof t.nav]}
                          </button>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Language Switcher */}
                <div className="mb-8 text-center">
                  <Link
                    href={otherLocalePath}
                    onClick={handleLanguageSwitch}
                    className="inline-flex items-center space-x-2 rounded-lg p-3 text-ocean-700 transition-colors duration-300 hover:bg-ocean-50 hover:text-ocean-800"
                  >
                    <GlobeIcon size={20} />
                    <span className="font-medium">
                      {otherLocale.toUpperCase()}
                    </span>
                  </Link>
                </div>

                {/* Mobile Social Links */}
                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <SocialLink
                      key={index}
                      href={social.href}
                      icon={social.icon}
                      platform={social.platform}
                      size={20}
                      className="p-3"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    />
                  ))}

                  {/* Contact Button */}
                  <ContactButton
                    onClick={() => scrollToSection("contact")}
                    size={20}
                    className="p-3"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + 4 * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
