import type { Payload } from "payload";
import type { SportCategory } from "@/payload-types";
import { seedProjectsFixture } from "@/scripts/fixtures/seed-projects.fixture";
import { seedGroupTrainingsFixture } from "@/scripts/fixtures/seed-group-trainings.fixture";
import fs from "fs";
import path from "path";

const seedProjects = seedProjectsFixture;
const seedGroupTrainings = seedGroupTrainingsFixture;

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
      const mediaPathCandidates = [
        path.join(
          process.cwd(),
          "src/scripts/fixtures/project-images",
          path.basename(project.imagePath)
        ),
        path.join(
          process.cwd(),
          "public",
          project.imagePath.replace(/^\//, "")
        ),
      ];
      const mediaFilePath = mediaPathCandidates.find((candidate) =>
        fs.existsSync(candidate)
      );

      if (!mediaFilePath) {
        payload.logger.warn(
          `Skipping project seed "${project.title.en}" because image "${project.imagePath}" was not found in fixtures or public folders.`
        );
        continue;
      }

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
      const projectLink = project.link ?? null;

      const created = await payload.create({
        collection: "projects",
        locale: "en",
        fallbackLocale: false,
        data: {
          title: project.title.en,
          description: project.description.en,
          image: media.id,
          category: categoryId,
          link: projectLink,
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
          link: projectLink,
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
          link: projectLink,
          active: true,
          sortOrder: project.sortOrder,
        },
      });
    }
  }

  const existingGroupTrainings = await payload.find({
    collection: "group-trainings",
    limit: 1,
    locale: "en",
    fallbackLocale: false,
    draft: true,
  });

  if ((existingGroupTrainings.totalDocs ?? 0) > 0) {
    payload.logger.info(
      "Skipping group trainings seed because at least one group training already exists."
    );
    payload.logger.info("Seeding complete!");
    return;
  }

  payload.logger.info(
    "Seeding default group trainings content (no existing group trainings found)..."
  );

  const locationIdByKey = new Map<string, number>();

  for (const groupTraining of seedGroupTrainings) {
    const locationKey = `${groupTraining.locationName.en}__${groupTraining.locationAddress.en}`;

    if (locationIdByKey.has(locationKey)) {
      continue;
    }

    const existingLocation = await payload.find({
      collection: "locations",
      limit: 1,
      locale: "en",
      fallbackLocale: false,
      where: {
        and: [
          { name: { equals: groupTraining.locationName.en } },
          { address: { equals: groupTraining.locationAddress.en } },
        ],
      },
    });

    const id =
      existingLocation.docs[0]?.id ??
      (
        await payload.create({
          collection: "locations",
          locale: "en",
          fallbackLocale: false,
          context: {
            skipRevalidate: true,
          },
          data: {
            name: groupTraining.locationName.en,
            address: groupTraining.locationAddress.en,
            mapsLink: groupTraining.locationMapUrl,
          },
        })
      ).id;

    await payload.update({
      collection: "locations",
      id,
      locale: "nl",
      fallbackLocale: false,
      context: {
        skipRevalidate: true,
      },
      data: {
        name: groupTraining.locationName.nl,
        address: groupTraining.locationAddress.nl,
        mapsLink: groupTraining.locationMapUrl,
      },
    });

    locationIdByKey.set(locationKey, id);
  }

  const mapGroupTrainingData = (
    groupTraining: (typeof seedGroupTrainings)[number],
    locale: "en" | "nl",
    locationId: number
  ) => ({
    title: groupTraining.title[locale],
    subtitle: groupTraining.subtitle[locale],
    status: groupTraining.status,
    slug: groupTraining.slug,
    sortOrder: groupTraining.sortOrder,
    level: groupTraining.level,
    weekday: groupTraining.weekday,
    startTime: groupTraining.startTime,
    endTime: groupTraining.endTime,
    focusContent: groupTraining.focusContent[locale],
    coachName: groupTraining.coachName,
    location: locationId,
    price: groupTraining.price[locale],
    gear: groupTraining.gear[locale],
    sessionDates: groupTraining.sessionDates.map((value) => ({ value })),
    enrollmentStripeUrl: groupTraining.enrollmentStripeUrl,
    _status: "published" as const,
  });

  for (const groupTraining of seedGroupTrainings) {
    const locationKey = `${groupTraining.locationName.en}__${groupTraining.locationAddress.en}`;
    const locationId = locationIdByKey.get(locationKey);

    if (!locationId) {
      payload.logger.warn(
        `Skipping group training "${groupTraining.slug}" because location "${locationKey}" was not found.`
      );
      continue;
    }

    const enData = mapGroupTrainingData(groupTraining, "en", locationId);
    const nlData = mapGroupTrainingData(groupTraining, "nl", locationId);

    const id = (
      await payload.create({
        collection: "group-trainings",
        locale: "en",
        fallbackLocale: false,
        context: {
          skipRevalidate: true,
        },
        data: enData,
      })
    ).id;

    await payload.update({
      collection: "group-trainings",
      id,
      locale: "en",
      fallbackLocale: false,
      context: {
        skipRevalidate: true,
      },
      data: enData,
    });

    await payload.update({
      collection: "group-trainings",
      id,
      locale: "nl",
      fallbackLocale: false,
      context: {
        skipRevalidate: true,
      },
      data: nlData,
    });
  }

  payload.logger.info("Seeding complete!");
};
