import { revalidateTag } from "next/cache";
import {
  getGroupTrainingDetailTag,
  LANDING_GROUP_TRAININGS_TAG,
  LANDING_PROJECTS_TAG,
} from "@/lib/cache-tags";

type RevalidateOptions = {
  skipRevalidate?: boolean;
};

type RevalidateTask = () => void;
const IMMEDIATE_EXPIRY = { expire: 0 } as const;

function isUnsupportedRevalidationContext(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.message.includes("during render which is unsupported") ||
    error.message.includes(
      'inside a function cached with "unstable_cache(...)"'
    )
  );
}

function toUniqueSlugs(slugs?: string[]): string[] {
  return [...new Set((slugs ?? []).filter(Boolean))];
}

function runRevalidation(task: RevalidateTask, warningMessage: string): void {
  try {
    task();
  } catch (error) {
    if (isUnsupportedRevalidationContext(error)) {
      return;
    }

    console.warn(warningMessage, error);
  }
}

export async function revalidateLandingProjectContent(
  options?: RevalidateOptions
): Promise<void> {
  if (options?.skipRevalidate) return;

  runRevalidation(() => {
    revalidateTag(LANDING_PROJECTS_TAG, IMMEDIATE_EXPIRY);
  }, "Failed to revalidate landing project content:");
}

export async function revalidateGroupTrainingContent(
  options?: RevalidateOptions,
  slugs?: string[]
): Promise<void> {
  if (options?.skipRevalidate) return;

  const uniqueSlugs = toUniqueSlugs(slugs);

  runRevalidation(() => {
    revalidateTag(LANDING_GROUP_TRAININGS_TAG, IMMEDIATE_EXPIRY);

    uniqueSlugs.forEach((slug) => {
      revalidateTag(getGroupTrainingDetailTag(slug), IMMEDIATE_EXPIRY);
    });
  }, "Failed to revalidate group training content:");
}
