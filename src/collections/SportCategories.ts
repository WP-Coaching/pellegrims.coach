import type { CollectionConfig } from "payload";

export const SportCategories: CollectionConfig = {
  slug: "sport-categories",
  defaultSort: "sortOrder",
  labels: {
    singular: {
      en: "Sport Category",
      nl: "Sportcategorie",
    },
    plural: {
      en: "Sport Categories",
      nl: "Sportcategorieen",
    },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: "key",
    defaultColumns: ["key", "label", "active", "sortOrder"],
  },
  fields: [
    {
      name: "key",
      label: "Category Key",
      type: "select",
      required: true,
      unique: true,
      options: [
        { label: "Swimming", value: "swimming" },
        { label: "Cycling", value: "cycling" },
        { label: "Running", value: "running" },
        { label: "Triathlon", value: "triathlon" },
        { label: "Executive", value: "executive" },
      ],
    },
    {
      name: "label",
      label: "Display Label",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "active",
      label: "Visible in website UI",
      type: "checkbox",
      defaultValue: true,
      index: true,
      admin: {
        description: "Show this category in the website UI.",
      },
    },
    {
      name: "sortOrder",
      label: "Sort Order",
      type: "number",
      defaultValue: 0,
      index: true,
      admin: {
        step: 1,
        description: "Lower numbers appear first.",
      },
    },
  ],
};
