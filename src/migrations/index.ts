import * as migration_20251221_161204_initial_setup from "./20251221_161204_initial_setup";
import * as migration_20251224_121207 from "./20251224_121207";
import * as migration_20260203_193018 from "./20260203_193018";
import * as migration_20260204_220500_add_media_prefix from "./20260204_220500_add_media_prefix";
import * as migration_20260222_185221_add_projects_and_sport_categories_collections from "./20260222_185221_add_projects_and_sport_categories_collections";

export const migrations = [
  {
    up: migration_20251221_161204_initial_setup.up,
    down: migration_20251221_161204_initial_setup.down,
    name: "20251221_161204_initial_setup",
  },
  {
    up: migration_20251224_121207.up,
    down: migration_20251224_121207.down,
    name: "20251224_121207",
  },
  {
    up: migration_20260203_193018.up,
    down: migration_20260203_193018.down,
    name: "20260203_193018",
  },
  {
    up: migration_20260204_220500_add_media_prefix.up,
    down: migration_20260204_220500_add_media_prefix.down,
    name: "20260204_220500_add_media_prefix",
  },
  {
    up: migration_20260222_185221_add_projects_and_sport_categories_collections.up,
    down: migration_20260222_185221_add_projects_and_sport_categories_collections.down,
    name: "20260222_185221_add_projects_and_sport_categories_collections",
  },
];
