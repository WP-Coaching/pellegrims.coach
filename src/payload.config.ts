import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { Users } from "./collections/Users";
import { ContactSubmissions } from "./collections/ContactSubmissions";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { seed } from "./scripts/seed";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, ContactSubmissions],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "fallback-secret-development-only",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url:
        process.env.DATABASE_URI ||
        (process.env.PAYLOAD_ENV === "test" || process.env.NODE_ENV === "test"
          ? "file:./e2e-test.db"
          : "file:./payload-local.db"),
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  email:
    process.env.PAYLOAD_ENV === "test" ||
    process.env.NODE_ENV === "test" ||
    process.env.NODE_ENV === "development"
      ? undefined // Uses default mock adapter (logs to console)
      : nodemailerAdapter({
          defaultFromAddress: "ward@pellegrims.coach",
          defaultFromName: "Pellegrims Coach",
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          },
        }),
  sharp,
  onInit: async (payload) => {
    const users = await payload.find({
      collection: "users",
      limit: 1,
    });

    if (users.totalDocs === 0) {
      await seed(payload);
    }
  },
});
