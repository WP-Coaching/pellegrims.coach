import { expect, test } from "@playwright/test";
import { locales } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

const EXPECTED_BY_LOCALE = {
  en: {
    projectTitle: "Roc Du Maroc",
    projectDescription: "October 2022",
    categoryLabel: "Cycling",
    linkedProjectTitle: "RVO Kenya 2025",
    linkedProjectUrl: "https://www.riftvalleyodyssey.com",
  },
  nl: {
    projectTitle: "Roc Du Maroc",
    projectDescription: "Oktober 2022",
    categoryLabel: "Wielrennen",
    linkedProjectTitle: "RVO Kenia 2025",
    linkedProjectUrl: "https://www.riftvalleyodyssey.com",
  },
} as const;

test.describe("Homepage projects section", () => {
  for (const locale of locales) {
    const t = getTranslations(locale);
    const expected = EXPECTED_BY_LOCALE[locale];

    test(`${locale}: renders CMS projects with localized content`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/`);
      await page.waitForLoadState("networkidle");

      const projectsSection = page.locator("#projects");
      await projectsSection.scrollIntoViewIfNeeded();

      await expect(
        projectsSection.getByRole("heading", {
          level: 2,
          name: new RegExp(t.projects.featuredWork, "i"),
        })
      ).toBeVisible();

      await expect(
        projectsSection.getByRole("heading", { level: 3 })
      ).toHaveCount(8);

      await expect(
        projectsSection.getByRole("heading", {
          level: 3,
          name: expected.projectTitle,
        })
      ).toBeVisible();
      const projectHeading = projectsSection.getByRole("heading", {
        level: 3,
        name: expected.projectTitle,
      });
      const projectCard = projectHeading.locator(
        "xpath=ancestor::div[contains(@class,'rounded-xl')][1]"
      );
      await expect(
        projectCard.getByText(expected.projectDescription, { exact: false })
      ).toBeVisible();
      await expect(
        projectCard.getByText(expected.categoryLabel, { exact: false })
      ).toBeVisible();
      await expect(projectCard.locator("img").first()).toHaveAttribute(
        "srcset",
        /\/api\/media\/file\//i
      );

      const linkedProjectHeading = projectsSection.getByRole("heading", {
        level: 3,
        name: expected.linkedProjectTitle,
      });
      await expect(linkedProjectHeading).toBeVisible();
      const linkedProjectCard = linkedProjectHeading.locator(
        "xpath=ancestor::div[contains(@class,'rounded-xl')][1]"
      );
      await expect(
        linkedProjectCard.getByRole("link", { name: t.projects.viewProject })
      ).toHaveAttribute("href", expected.linkedProjectUrl);
    });
  }
});
