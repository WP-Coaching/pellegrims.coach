import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  defaultSort: "sortOrder",
  labels: {
    singular: {
      en: "Project",
      nl: "Project",
    },
    plural: {
      en: "Projects",
      nl: "Projecten",
    },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "active", "sortOrder"],
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "image",
      label: "Image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "category",
      label: "Sport Category",
      type: "relationship",
      relationTo: "sport-categories",
      required: true,
    },
    {
      name: "link",
      label: "Link URL",
      type: "text",
    },
    {
      name: "active",
      label: "Visible on website",
      type: "checkbox",
      defaultValue: true,
      index: true,
      admin: {
        description: "Show this project on the website. Uncheck to hide it.",
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
