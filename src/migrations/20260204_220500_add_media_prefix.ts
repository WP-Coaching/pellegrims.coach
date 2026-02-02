import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`media\` ADD \`prefix\` text DEFAULT 'media' NOT NULL;`
  );
  await db.run(
    sql`CREATE INDEX \`media_prefix_idx\` ON \`media\` (\`prefix\`);`
  );
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`media_prefix_idx\`;`);
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`prefix\`;`);
}
