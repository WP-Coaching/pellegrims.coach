import { revalidateGroupTrainingContent } from "@/lib/revalidate-site-content";

export async function revalidateGroupTrainingPages(
  options?: { skipRevalidate?: boolean },
  slugs?: string[]
): Promise<void> {
  return revalidateGroupTrainingContent(options, slugs);
}
