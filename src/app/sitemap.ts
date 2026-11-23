import { MetadataRoute } from "next";
import { getPayload } from "payload";
import { locales } from "@/lib/i18n";
import { getLocalizedPagePath, localizedPages } from "@/lib/site-routes";
import config from "@/payload.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.pellegrims.coach";

  // Base pages (home)
  const homePages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  const localizedSitemapPages = localizedPages.flatMap((page) =>
    locales.map((locale) => {
      const isCoachingPage = page === "executive-coaching";
      return {
        url: `${baseUrl}${getLocalizedPagePath(page, locale)}`,
        lastModified: isCoachingPage ? undefined : new Date(),
        changeFrequency: "monthly" as const,
        priority: isCoachingPage ? 0.8 : 0.3,
      };
    })
  );

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

  return [...homePages, ...localizedSitemapPages, ...groupPages];
}
