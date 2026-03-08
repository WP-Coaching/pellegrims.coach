import "server-only";

import { getPayload } from "payload";
import { unstable_noStore as noStore } from "next/cache";
import type { Project as CardProject } from "@/components/ui/card";
import config from "@/payload.config";
import type { Media, Project, SportCategory } from "@/payload-types";
import type { Locale } from "@/lib/i18n";
import { hasPayloadImage } from "@/lib/payload-image";

export async function getProjectCards(locale: Locale): Promise<CardProject[]> {
  noStore();

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "projects",
      depth: 1,
      limit: 50,
      locale,
      fallbackLocale: "en",
      sort: "sortOrder",
      where: {
        active: {
          equals: true,
        },
      },
    });

    return result.docs.flatMap((project: Project): CardProject[] => {
      const image =
        project.image && typeof project.image !== "number"
          ? (project.image as Media)
          : null;
      const category =
        project.category && typeof project.category !== "number"
          ? (project.category as SportCategory)
          : null;

      if (!project.title || !project.description || !category?.label) {
        return [];
      }

      if (!hasPayloadImage(image)) {
        return [];
      }

      const link =
        typeof project.link === "string" && project.link.trim()
          ? project.link.trim()
          : null;

      return [
        {
          image,
          title: project.title,
          description: project.description,
          link,
          category: category.label,
        },
      ];
    });
  } catch (error) {
    console.warn("Failed to load projects from Payload:", error);
    return [];
  }
}
