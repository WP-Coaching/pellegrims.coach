export const LANDING_PROJECTS_TAG = "landing:projects";
export const LANDING_GROUP_TRAININGS_TAG = "landing:group-trainings";

export function getGroupTrainingDetailTag(slug: string): string {
  return `group-training:detail:${slug}`;
}
