import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-sqlite";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`locations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`maps_link\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE INDEX \`locations_updated_at_idx\` ON \`locations\` (\`updated_at\`);`
  );
  await db.run(
    sql`CREATE INDEX \`locations_created_at_idx\` ON \`locations\` (\`created_at\`);`
  );
  await db.run(sql`CREATE TABLE \`locations_locales\` (
  	\`name\` text NOT NULL,
  	\`address\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`locations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`locations_locales_locale_parent_id_unique\` ON \`locations_locales\` (\`_locale\`,\`_parent_id\`);`
  );
  await db.run(sql`CREATE TABLE \`group_trainings_session_dates\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`group_trainings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`group_trainings_session_dates_order_idx\` ON \`group_trainings_session_dates\` (\`_order\`);`
  );
  await db.run(
    sql`CREATE INDEX \`group_trainings_session_dates_parent_id_idx\` ON \`group_trainings_session_dates\` (\`_parent_id\`);`
  );
  await db.run(sql`CREATE TABLE \`group_trainings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`status\` text DEFAULT 'open',
  	\`sort_order\` numeric DEFAULT 0,
  	\`level\` text,
  	\`weekday\` text,
  	\`start_time\` text,
  	\`end_time\` text,
  	\`coach_name\` text DEFAULT 'Ward Pellegrims',
  	\`location_id\` integer,
  	\`enrollment_stripe_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`location_id\`) REFERENCES \`locations\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`group_trainings_slug_idx\` ON \`group_trainings\` (\`slug\`);`
  );
  await db.run(
    sql`CREATE INDEX \`group_trainings_sort_order_idx\` ON \`group_trainings\` (\`sort_order\`);`
  );
  await db.run(
    sql`CREATE INDEX \`group_trainings_location_idx\` ON \`group_trainings\` (\`location_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`group_trainings_updated_at_idx\` ON \`group_trainings\` (\`updated_at\`);`
  );
  await db.run(
    sql`CREATE INDEX \`group_trainings_created_at_idx\` ON \`group_trainings\` (\`created_at\`);`
  );
  await db.run(
    sql`CREATE INDEX \`group_trainings__status_idx\` ON \`group_trainings\` (\`_status\`);`
  );
  await db.run(sql`CREATE TABLE \`group_trainings_locales\` (
  	\`title\` text,
  	\`subtitle\` text,
  	\`focus_content\` text,
  	\`price\` text,
  	\`gear\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`group_trainings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`group_trainings_locales_locale_parent_id_unique\` ON \`group_trainings_locales\` (\`_locale\`,\`_parent_id\`);`
  );
  await db.run(sql`CREATE TABLE \`_group_trainings_v_version_session_dates\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_group_trainings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_group_trainings_v_version_session_dates_order_idx\` ON \`_group_trainings_v_version_session_dates\` (\`_order\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_group_trainings_v_version_session_dates_parent_id_idx\` ON \`_group_trainings_v_version_session_dates\` (\`_parent_id\`);`
  );
  await db.run(sql`CREATE TABLE \`_group_trainings_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_status\` text DEFAULT 'open',
  	\`version_sort_order\` numeric DEFAULT 0,
  	\`version_level\` text,
  	\`version_weekday\` text,
  	\`version_start_time\` text,
  	\`version_end_time\` text,
  	\`version_coach_name\` text DEFAULT 'Ward Pellegrims',
  	\`version_location_id\` integer,
  	\`version_enrollment_stripe_url\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`group_trainings\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_location_id\`) REFERENCES \`locations\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`_group_trainings_v_parent_idx\` ON \`_group_trainings_v\` (\`parent_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_group_trainings_v_version_version_slug_idx\` ON \`_group_trainings_v\` (\`version_slug\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_group_trainings_v_version_version_sort_order_idx\` ON \`_group_trainings_v\` (\`version_sort_order\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_group_trainings_v_version_version_location_idx\` ON \`_group_trainings_v\` (\`version_location_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_group_trainings_v_version_version_updated_at_idx\` ON \`_group_trainings_v\` (\`version_updated_at\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_group_trainings_v_version_version_created_at_idx\` ON \`_group_trainings_v\` (\`version_created_at\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_group_trainings_v_version_version__status_idx\` ON \`_group_trainings_v\` (\`version__status\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_group_trainings_v_created_at_idx\` ON \`_group_trainings_v\` (\`created_at\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_group_trainings_v_updated_at_idx\` ON \`_group_trainings_v\` (\`updated_at\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_group_trainings_v_snapshot_idx\` ON \`_group_trainings_v\` (\`snapshot\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_group_trainings_v_published_locale_idx\` ON \`_group_trainings_v\` (\`published_locale\`);`
  );
  await db.run(
    sql`CREATE INDEX \`_group_trainings_v_latest_idx\` ON \`_group_trainings_v\` (\`latest\`);`
  );
  await db.run(sql`CREATE TABLE \`_group_trainings_v_locales\` (
  	\`version_title\` text,
  	\`version_subtitle\` text,
  	\`version_focus_content\` text,
  	\`version_price\` text,
  	\`version_gear\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_group_trainings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`_group_trainings_v_locales_locale_parent_id_unique\` ON \`_group_trainings_v_locales\` (\`_locale\`,\`_parent_id\`);`
  );
  await db.run(
    sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`locations_id\` integer REFERENCES locations(id);`
  );
  await db.run(
    sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`group_trainings_id\` integer REFERENCES group_trainings(id);`
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_locations_id_idx\` ON \`payload_locked_documents_rels\` (\`locations_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_group_trainings_id_idx\` ON \`payload_locked_documents_rels\` (\`group_trainings_id\`);`
  );
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`locations\`;`);
  await db.run(sql`DROP TABLE \`locations_locales\`;`);
  await db.run(sql`DROP TABLE \`group_trainings_session_dates\`;`);
  await db.run(sql`DROP TABLE \`group_trainings\`;`);
  await db.run(sql`DROP TABLE \`group_trainings_locales\`;`);
  await db.run(sql`DROP TABLE \`_group_trainings_v_version_session_dates\`;`);
  await db.run(sql`DROP TABLE \`_group_trainings_v\`;`);
  await db.run(sql`DROP TABLE \`_group_trainings_v_locales\`;`);
  await db.run(sql`PRAGMA foreign_keys=OFF;`);
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`contact_submissions_id\` integer,
  	\`media_id\` integer,
  	\`sport_categories_id\` integer,
  	\`projects_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contact_submissions_id\`) REFERENCES \`contact_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`sport_categories_id\`) REFERENCES \`sport_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "contact_submissions_id", "media_id", "sport_categories_id", "projects_id") SELECT "id", "order", "parent_id", "path", "users_id", "contact_submissions_id", "media_id", "sport_categories_id", "projects_id" FROM \`payload_locked_documents_rels\`;`
  );
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`);
  await db.run(
    sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`
  );
  await db.run(sql`PRAGMA foreign_keys=ON;`);
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_contact_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_submissions_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_sport_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`sport_categories_id\`);`
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`
  );
}
