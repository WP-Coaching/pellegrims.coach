import { MetadataRoute } from "next";
import { legalSlugs } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.pellegrims.coach";
  const locales = ["en", "nl"];

  // Base pages (home)
  const homePages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  // Legal pages
  const legalPages = locales.flatMap((locale) => {
    return (Object.keys(legalSlugs) as Array<keyof typeof legalSlugs>).map(
      (pageType) => ({
        url: `${baseUrl}/${locale}/${legalSlugs[pageType][locale as "en" | "nl"]}/`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.3,
      })
    );
  });

  // Group pages (manually added based on current structure)
  const groupPages = [
    {
      url: `${baseUrl}/en/groepen/winter-2025-2026/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nl/groepen/winter-2025-2026/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/groepen/winter-2026-dinsdag/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nl/groepen/winter-2026-dinsdag/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  return [...homePages, ...legalPages, ...groupPages];
}
