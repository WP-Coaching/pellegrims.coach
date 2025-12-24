import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-sqlite";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`contact_submissions\` ADD \`locale\` text DEFAULT 'en' NOT NULL;`
  );
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`contact_submissions\` DROP COLUMN \`locale\`;`
  );
}
