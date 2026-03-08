import "server-only";

import { getPayload } from "payload";
import config from "@/payload.config";
import type { Locale } from "@/lib/i18n";
import { getSeasonBadge } from "@/lib/group-trainings/season";
import { getTranslations } from "@/lib/translations";

export type GroupTrainingCard = {
  title: string;
  subtitle: string;
  description: string;
  levelLabel: string;
  levelKey: "beginner" | "advanced";
  level: string;
  link: string;
};

export async function getGroupTrainingCards(
  locale: Locale
): Promise<GroupTrainingCard[]> {
  try {
    const detailTranslations = getTranslations(locale).groupTrainingDetail;
    const seasonLabels = detailTranslations.seasons;
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "group-trainings",
      limit: 50,
      locale,
      fallbackLocale: "en",
      sort: "sortOrder",
      where: {
        _status: {
          equals: "published",
        },
      },
    });

    return result.docs.flatMap((item): GroupTrainingCard[] => {
      const title = item.title?.trim();
      const badge =
        getSeasonBadge(seasonLabels, item.sessionDates) ||
        item.subtitle?.trim();
      const description = item.subtitle?.trim();
      const level = detailTranslations.levels[item.level]?.trim();
      const slug = item.slug?.trim();

      if (!title || !badge || !description || !level || !slug) {
        return [];
      }

      const link = `/${locale}/groepen/${slug}`;

      return [
        {
          title,
          subtitle: badge,
          description,
          levelLabel: detailTranslations.levelLabel,
          levelKey: item.level,
          level,
          link,
        },
      ];
    });
  } catch (error) {
    console.warn("Failed to load group trainings from Payload:", error);
    return [];
  }
}
