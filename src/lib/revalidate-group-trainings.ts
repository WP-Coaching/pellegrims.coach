import { revalidatePath } from "next/cache";
import { locales } from "@/lib/i18n";

type RevalidateOptions = {
  skipRevalidate?: boolean;
};

export async function revalidateGroupTrainingPages(
  options?: RevalidateOptions,
  slugs?: string[]
): Promise<void> {
  if (options?.skipRevalidate) return;

  try {
    const uniqueSlugs = Array.from(
      new Set((slugs ?? []).filter((slug): slug is string => Boolean(slug)))
    );

    revalidatePath("/");
    for (const locale of locales) {
      revalidatePath(`/${locale}`);
      revalidatePath(`/${locale}/`);

      for (const slug of uniqueSlugs) {
        revalidatePath(`/${locale}/groepen/${slug}`);
        revalidatePath(`/${locale}/groepen/${slug}/`);
      }
    }
  } catch (error) {
    console.warn("Failed to revalidate group training pages:", error);
  }
}
