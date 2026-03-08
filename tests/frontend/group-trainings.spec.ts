import { expect, test } from "@playwright/test";
import { locales } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

const EXPECTED_BY_LOCALE = {
  en: [
    {
      title: "Friday Winter Training",
      subtitle: "Winter 2025-2026",
      description:
        "Perfect your freestyle for triathlon and swim faster and more efficiently.",
      level: "Beginner",
      href: "/en/groepen/winter-2025-2026-vrijdag-13u",
    },
    {
      title: "Friday Winter Training",
      subtitle: "Winter 2025-2026",
      description:
        "Perfect your freestyle for triathlon and swim faster and more efficiently.",
      level: "Advanced",
      href: "/en/groepen/winter-2025-2026-vrijdag-14u",
    },
    {
      title: "Tuesday Winter Training",
      subtitle: "Winter 2025-2026",
      description: "Focus on speed and technique.",
      level: "Advanced",
      href: "/en/groepen/winter-2026-dinsdag",
    },
  ],
  nl: [
    {
      title: "Wintertraining Vrijdag",
      subtitle: "Winter 2025-2026",
      description:
        "Perfectioneer je crawltechniek voor triatlon en zwem sneller en efficiënter.",
      level: "Beginner",
      href: "/nl/groepen/winter-2025-2026-vrijdag-13u",
    },
    {
      title: "Wintertraining Vrijdag",
      subtitle: "Winter 2025-2026",
      description:
        "Perfectioneer je crawltechniek voor triatlon en zwem sneller en efficiënter.",
      level: "Gevorderd",
      href: "/nl/groepen/winter-2025-2026-vrijdag-14u",
    },
    {
      title: "Wintertraining Dinsdag",
      subtitle: "Winter 2025-2026",
      description: "Focus op snelheid en techniek.",
      level: "Gevorderd",
      href: "/nl/groepen/winter-2026-dinsdag",
    },
  ],
} as const;

test.describe("Homepage group trainings section", () => {
  for (const locale of locales) {
    const t = getTranslations(locale);
    const expected = EXPECTED_BY_LOCALE[locale];

    test(`${locale}: renders published group trainings from CMS`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/`);
      await page.waitForLoadState("networkidle");

      const groupsSection = page.locator("#groups");
      await groupsSection.scrollIntoViewIfNeeded();

      await expect(
        groupsSection.getByRole("heading", {
          level: 2,
          name: new RegExp(t.groups.title, "i"),
        })
      ).toBeVisible();

      for (const training of expected) {
        const card = groupsSection
          .getByRole("link")
          .filter({ hasText: training.title })
          .filter({ hasText: training.level });
        await expect(card).toHaveCount(1);
        await expect(
          card.getByRole("heading", {
            level: 3,
            name: training.title,
          })
        ).toBeVisible();
        await expect(
          card.getByText(training.subtitle, { exact: false })
        ).toBeVisible();
        await expect(
          card.getByText(training.description, { exact: false })
        ).toBeVisible();
        await expect(card).toHaveAttribute(
          "href",
          new RegExp(
            `^${training.href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/?$`
          )
        );
      }

      await expect(
        groupsSection.getByRole("heading", { level: 3, name: "Zwem.coach" })
      ).toHaveCount(0);
    });
  }
});
