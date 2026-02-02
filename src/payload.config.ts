// Trigger rebuild to regenerate importMap
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { s3Storage } from "@payloadcms/storage-s3";
import { Users } from "./collections/Users";
import { ContactSubmissions } from "./collections/ContactSubmissions";
import { Media } from "./collections/Media";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { seed } from "./scripts/seed";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const isImportMapGeneration = process.argv.some((arg) =>
  arg.includes("generate:importmap")
);

const toOrigin = (value?: string) => {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  try {
    return new URL(trimmed).origin;
  } catch {
    // Allows values like "https://example.com/admin" even if URL parsing fails.
    return trimmed.replace(/\/admin\/?$/, "").replace(/\/$/, "");
  }
};

const serverOrigin = toOrigin(process.env.NEXT_PUBLIC_SERVER_URL);
const vercelOrigins = [
  process.env.VERCEL_URL,
  process.env.VERCEL_BRANCH_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
].map((value) =>
  value
    ? toOrigin(value.startsWith("http") ? value : `https://${value}`)
    : undefined
);
const devOrigins =
  process.env.NODE_ENV === "production"
    ? []
    : ["http://localhost:3000", "http://127.0.0.1:3000"];

const allowedOrigins = Array.from(
  new Set(
    [serverOrigin, ...vercelOrigins, ...devOrigins].filter(
      (value): value is string => Boolean(value)
    )
  )
);

export default buildConfig({
  serverURL: serverOrigin,
  cors: allowedOrigins,
  csrf: allowedOrigins,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: {
          path: "@/components/PayloadBranding",
          exportName: "PayloadLogo",
        },
        Icon: {
          path: "@/components/PayloadBranding",
          exportName: "PayloadIcon",
        },
      },
    },
    meta: {
      titleSuffix: "- Pellegrims Coach",
    },
  },
  collections: [Users, ContactSubmissions, Media],
  editor: lexicalEditor({}),
  plugins: process.env.S3_BUCKET
    ? [
        s3Storage({
          collections: {
            media: {
              prefix: "media",
            },
          },
          bucket: process.env.S3_BUCKET,
          config: {
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
            },
            region: process.env.S3_REGION || "us-east-1",
            endpoint: process.env.S3_ENDPOINT,
          },
        }),
      ]
    : [],
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
    process.env.NODE_ENV === "development" ||
    isImportMapGeneration
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
