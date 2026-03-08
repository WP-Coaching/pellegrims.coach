import type { Payload } from "payload";
import type { SportCategory } from "@/payload-types";
import seedProjectsFixture from "@/scripts/fixtures/seed-projects.fixture.json";
import path from "path";

type SeedProjectFixture = {
  imagePath: string;
  category: SportCategory["key"];
  link?: string;
  title: { en: string; nl: string };
  description: { en: string; nl: string };
  sortOrder: number;
};

const seedProjects = seedProjectsFixture as SeedProjectFixture[];

export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info("Seeding data...");

  const [users, sportCategories, projects] = await Promise.all([
    payload.find({
      collection: "users",
      limit: 1,
    }),
    payload.find({
      collection: "sport-categories",
      limit: 10,
      locale: "en",
      fallbackLocale: false,
    }),
    payload.find({
      collection: "projects",
      limit: 1,
    }),
  ]);

  const adminEmail = process.env.PAYLOAD_ADMIN_EMAIL;
  const adminPassword = process.env.PAYLOAD_ADMIN_PASSWORD;

  if (users.totalDocs === 0 && (!adminEmail || !adminPassword)) {
    payload.logger.warn(
      "PAYLOAD_ADMIN_EMAIL or PAYLOAD_ADMIN_PASSWORD not set. Skipping admin user creation."
    );
  }

  if (users.totalDocs === 0 && adminEmail && adminPassword) {
    await payload.create({
      collection: "users",
      data: {
        email: adminEmail,
        password: adminPassword,
      },
    });
  }

  let categoryIdByKey = new Map<string, number>();

  if ((sportCategories?.totalDocs ?? 0) === 0) {
    payload.logger.info("Seeding sport categories...");

    const categorySeeds: Array<{
      key: SportCategory["key"];
      label: { en: string; nl: string };
      sortOrder: number;
    }> = [
      {
        key: "swimming" as const,
        label: { en: "Swimming", nl: "Zwemmen" },
        sortOrder: 10,
      },
      {
        key: "cycling" as const,
        label: { en: "Cycling", nl: "Wielrennen" },
        sortOrder: 20,
      },
      {
        key: "running" as const,
        label: { en: "Running", nl: "Lopen" },
        sortOrder: 25,
      },
      {
        key: "triathlon" as const,
        label: { en: "Triathlon", nl: "Triatlon" },
        sortOrder: 30,
      },
      {
        key: "executive" as const,
        label: { en: "Executive", nl: "Executive" },
        sortOrder: 40,
      },
    ];

    for (const category of categorySeeds) {
      const created = await payload.create({
        collection: "sport-categories",
        locale: "en",
        fallbackLocale: false,
        data: {
          key: category.key,
          label: category.label.en,
          active: true,
          sortOrder: category.sortOrder,
        },
      });

      await payload.update({
        collection: "sport-categories",
        id: created.id,
        locale: "nl",
        fallbackLocale: false,
        data: {
          label: category.label.nl,
        },
      });

      await payload.update({
        collection: "sport-categories",
        id: created.id,
        locale: "en",
        fallbackLocale: false,
        data: {
          label: category.label.en,
        },
      });

      categoryIdByKey.set(category.key, created.id);
    }
  } else {
    categoryIdByKey = new Map(
      sportCategories.docs.flatMap((category) =>
        category?.key ? [[category.key, category.id] as const] : []
      )
    );
  }

  if ((projects?.totalDocs ?? 0) === 0) {
    payload.logger.info("Seeding default projects content...");

    for (const project of seedProjects) {
      const mediaFilePath = path.join(
        process.cwd(),
        "src/scripts/fixtures/project-images",
        path.basename(project.imagePath)
      );

      const media = await payload.create({
        collection: "media",
        data: {
          alt: project.title.en,
        },
        filePath: mediaFilePath,
      });

      const categoryId = categoryIdByKey.get(project.category);
      if (!categoryId) {
        payload.logger.warn(
          `Skipping project seed "${project.title.en}" because category "${project.category}" was not found.`
        );
        continue;
      }

      const created = await payload.create({
        collection: "projects",
        locale: "en",
        fallbackLocale: false,
        data: {
          title: project.title.en,
          description: project.description.en,
          image: media.id,
          category: categoryId,
          link: project.link,
          active: true,
          sortOrder: project.sortOrder,
        },
      });

      await payload.update({
        collection: "projects",
        id: created.id,
        locale: "nl",
        data: {
          title: project.title.nl,
          description: project.description.nl,
          image: media.id,
          category: categoryId,
          link: project.link,
          active: true,
          sortOrder: project.sortOrder,
        },
      });

      // Payload local API can overwrite default locale values when updating
      // another locale in some setups. Re-apply EN values explicitly.
      await payload.update({
        collection: "projects",
        id: created.id,
        locale: "en",
        data: {
          title: project.title.en,
          description: project.description.en,
          image: media.id,
          category: categoryId,
          link: project.link,
          active: true,
          sortOrder: project.sortOrder,
        },
      });
    }
  }

  payload.logger.info("Seeding complete!");
};
