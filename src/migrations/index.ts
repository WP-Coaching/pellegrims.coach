import * as migration_20251221_161204_initial_setup from "./20251221_161204_initial_setup";
import * as migration_20251224_121207 from "./20251224_121207";

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
];
