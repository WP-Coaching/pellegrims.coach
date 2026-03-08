import type { CollectionConfig, PayloadRequest } from "payload";
import { revalidateGroupTrainingPages } from "@/lib/revalidate-group-trainings";

const getAllGroupTrainingSlugs = async (
  req: PayloadRequest
): Promise<string[]> => {
  const result = await req.payload.find({
    collection: "group-trainings",
    req,
    locale: "en",
    fallbackLocale: false,
    pagination: false,
    depth: 0,
  });

  return result.docs
    .map((item) => (typeof item.slug === "string" ? item.slug : null))
    .filter((slug): slug is string => Boolean(slug));
};

export const Locations: CollectionConfig = {
  slug: "locations",
  labels: {
    singular: {
      en: "Location",
      nl: "Locatie",
    },
    plural: {
      en: "Locations",
      nl: "Locaties",
    },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "address", "updatedAt"],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;

        const address =
          typeof data.address === "string" ? data.address.trim() : "";
        const mapsLink =
          typeof data.mapsLink === "string" ? data.mapsLink.trim() : "";

        if (!mapsLink && address) {
          return {
            ...data,
            mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
          };
        }

        return data;
      },
    ],
    afterChange: [
      async ({ context, req }) => {
        const slugs = await getAllGroupTrainingSlugs(req);
        return revalidateGroupTrainingPages(context, slugs);
      },
    ],
    afterDelete: [
      async ({ context, req }) => {
        const slugs = await getAllGroupTrainingSlugs(req);
        return revalidateGroupTrainingPages(context, slugs);
      },
    ],
  },
  fields: [
    { name: "name", type: "text", localized: true, required: true },
    { name: "address", type: "text", localized: true, required: true },
    { name: "mapsLink", type: "text" },
  ],
};
