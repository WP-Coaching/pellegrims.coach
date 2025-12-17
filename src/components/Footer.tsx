"use client";

import Link from "next/link";
import { socialLinks } from "@/lib/constants";
import { SocialLink } from "@/components/Header";
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
      // Navigate to home page with hash
      window.location.assign(`/${locale}/#${sectionId}`);
    }
  };
  const legalHref = `/${locale}/${t.footer.legalSlug}`;
  const privacyHref = `/${locale}/${t.footer.privacySlug}`;
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-athletic-dark">
              {t.footer.companyName}
            </h3>
            <p className="text-sm text-gray-600">{t.footer.legalForm}</p>
            <p className="text-sm text-gray-600">{t.footer.address}</p>
            <p className="text-sm text-gray-600">{t.footer.vatNumber}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-athletic-dark">
              {t.footer.navigationTitle}
            </h3>
            <ul className="space-y-2">
              {[
                { key: "about", section: "about" },
                { key: "coaching", section: "coaching" },
                { key: "projects", section: "projects" },
                { key: "groupTraining", href: `/${locale}/groepstraining` },
                { key: "contact", section: "contact" },
              ].map((item) => {
                const isLink = "href" in item;
                return (
                  <li key={item.key}>
                    {isLink ? (
                      <Link
                        href={item.href!}
                        className="text-sm text-gray-600 transition-colors hover:text-athletic-dark"
                      >
                        {t.nav[item.key as keyof typeof t.nav]}
                      </Link>
                    ) : (
                      <button
                        onClick={() => scrollToSection(item.section!)}
                        className="text-sm text-gray-600 transition-colors hover:text-athletic-dark"
                      >
                        {t.nav[item.key as keyof typeof t.nav]}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-athletic-dark">
              {t.footer.followUs}
            </h3>
            <div className="flex justify-center space-x-4 md:justify-start">
              {socialLinks.map((social, index) => (
                <SocialLink
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
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 md:flex md:items-center md:justify-between md:gap-6 md:text-left">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <span className="block md:inline">{t.footer.copyright}</span>
            <span className="hidden text-gray-400 md:inline">•</span>
            <span>
              Website door{" "}
              <a
                href="https://www.cotersus.be/"
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="text-gray-600 transition-colors hover:text-athletic-dark"
              >
                Cotersus
              </a>
            </span>
          </div>
          <div className="mt-2 flex flex-col items-center gap-2 md:mt-0 md:flex-row md:gap-4">
            <Link
              href={legalHref}
              className="text-gray-600 transition-colors hover:text-athletic-dark"
            >
              {t.footer.legal}
            </Link>
            <span className="hidden text-gray-400 md:inline">•</span>
            <Link
              href={privacyHref}
              className="text-gray-600 transition-colors hover:text-athletic-dark"
            >
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
