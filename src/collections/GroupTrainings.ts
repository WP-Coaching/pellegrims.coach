import type { CollectionConfig } from "payload";
import {
  lexicalEditor,
  ParagraphFeature,
  UnorderedListFeature,
  BlockquoteFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from "@payloadcms/richtext-lexical";
import { revalidateGroupTrainingPages } from "@/lib/revalidate-group-trainings";

export const GroupTrainings: CollectionConfig = {
  slug: "group-trainings",
  defaultSort: "sortOrder",
  labels: {
    singular: {
      en: "Group Training",
      nl: "Groepstraining",
    },
    plural: {
      en: "Group Trainings",
      nl: "Groepstrainingen",
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
    defaultColumns: ["title", "subtitle", "status", "_status", "sortOrder"],
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [
      ({ doc, previousDoc, context }) => {
        const slugs = [
          typeof doc?.slug === "string" ? doc.slug : null,
          typeof previousDoc?.slug === "string" ? previousDoc.slug : null,
        ].filter((slug): slug is string => Boolean(slug));

        return revalidateGroupTrainingPages(context, slugs);
      },
    ],
    afterDelete: [
      ({ doc, context }) =>
        revalidateGroupTrainingPages(
          context,
          typeof doc?.slug === "string" ? [doc.slug] : []
        ),
    ],
  },
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "subtitle", type: "text", localized: true, required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          "Example: winter-2026-dinsdag. Frontend route: /{locale}/groepen/{slug}.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "open",
      options: [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
      ],
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      required: true,
      index: true,
      admin: {
        step: 1,
        description: "Lower numbers appear first.",
      },
    },
    {
      name: "level",
      type: "select",
      required: true,
      options: [
        {
          value: "beginner",
          label: {
            en: "Beginner",
            nl: "Beginner",
          },
        },
        {
          value: "advanced",
          label: {
            en: "Advanced",
            nl: "Gevorderd",
          },
        },
      ],
    },
    {
      name: "weekday",
      type: "select",
      required: true,
      options: [
        { value: "monday", label: { en: "Monday", nl: "Maandag" } },
        { value: "tuesday", label: { en: "Tuesday", nl: "Dinsdag" } },
        { value: "wednesday", label: { en: "Wednesday", nl: "Woensdag" } },
        { value: "thursday", label: { en: "Thursday", nl: "Donderdag" } },
        { value: "friday", label: { en: "Friday", nl: "Vrijdag" } },
        { value: "saturday", label: { en: "Saturday", nl: "Zaterdag" } },
        { value: "sunday", label: { en: "Sunday", nl: "Zondag" } },
      ],
    },
    {
      name: "startTime",
      type: "text",
      required: true,
      admin: {
        description: "Example: 13:45",
      },
    },
    {
      name: "endTime",
      type: "text",
      required: true,
      admin: {
        description: "Example: 14:45",
      },
    },
    {
      name: "focusContent",
      type: "richText",
      localized: true,
      required: true,
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          UnorderedListFeature(),
          BlockquoteFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: "coachName",
      type: "text",
      required: true,
      defaultValue: "Ward Pellegrims",
    },
    {
      name: "location",
      type: "relationship",
      relationTo: "locations",
      required: true,
    },
    { name: "price", type: "text", localized: true, required: true },
    { name: "gear", type: "text", localized: true, required: true },
    {
      name: "sessionDates",
      type: "array",
      minRows: 1,
      required: true,
      fields: [{ name: "value", type: "date", required: true }],
    },
    { name: "enrollmentStripeUrl", type: "text" },
  ],
};
