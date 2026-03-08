import { MetadataRoute } from "next";
import { getPayload } from "payload";
import { legalSlugs } from "@/lib/legal";
import config from "@/payload.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const payload = await getPayload({ config });
  const groupTrainings = await payload.find({
    collection: "group-trainings",
    limit: 100,
    locale: "en",
    fallbackLocale: false,
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  const groupPages = groupTrainings.docs.flatMap((groupTraining) => {
    if (!groupTraining.slug) {
      return [];
    }

    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}/groepen/${groupTraining.slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  });

  return [...homePages, ...legalPages, ...groupPages];
}
