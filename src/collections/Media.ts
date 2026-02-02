import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: "filename",
  },
  upload: {
    imageSizes: [
      {
        name: "thumbnail",
        width: 320,
        height: 240,
        crop: "center",
      },
      {
        name: "card",
        width: 640,
        height: 480,
        crop: "center",
      },
      {
        name: "hero",
        width: 1280,
        height: 720,
        crop: "center",
      },
      {
        name: "full",
        width: 2048,
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
