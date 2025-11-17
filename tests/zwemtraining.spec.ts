import { expect, test } from "@playwright/test";
import { getTranslations } from "@/lib/translations";
import { locales } from "@/lib/i18n";

const MAPS_URL = "https://maps.app.goo.gl/LLJVUopK1vmeFsZWA";

function normalized(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

test.describe("Zwemtraining winter 2025-2026 page", () => {
  for (const locale of locales) {
    const translations = getTranslations(locale);
    const swim = translations.swimWinter;
    const path = `/${locale}/zwemtraining/winter-2025-2026`;

    test.describe(`${locale}`, () => {
      test("renders localized content", async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState("networkidle");

        const heroSection = page.locator("#hero");
        await expect(
          heroSection.getByRole("heading", { level: 1 })
        ).toContainText(normalized(swim.heroTitle));
        await expect(
          heroSection.getByText(swim.heroIntro, { exact: false })
        ).toBeVisible();
        await expect(
          heroSection.getByText(swim.locationIntro, { exact: false })
        ).toBeVisible();
        await expect(
          heroSection.getByRole("link", { name: /Topsportbad Wezenberg/ })
        ).toHaveAttribute("href", MAPS_URL);

        const groupsSection = page.locator("#groups");
        await groupsSection.scrollIntoViewIfNeeded();
        await expect(
          groupsSection.getByRole("heading", { level: 2 })
        ).toContainText(normalized(swim.groupsTitle));
        await expect(
          groupsSection.getByText(swim.begTitle, { exact: false })
        ).toBeVisible();
        await expect(
          groupsSection.getByText(swim.begTime, { exact: false })
        ).toBeVisible();
        for (const bullet of swim.begBullets) {
          await expect(
            groupsSection.getByText(bullet, { exact: false })
          ).toBeVisible();
        }
        await expect(
          groupsSection.getByText(swim.advTitle, { exact: false })
        ).toBeVisible();
        await expect(
          groupsSection.getByText(swim.advTime, { exact: false })
        ).toBeVisible();
        for (const bullet of swim.advBullets) {
          await expect(
            groupsSection.getByText(bullet, { exact: false })
          ).toBeVisible();
        }

        const practicalSection = page.locator("#practical");
        await practicalSection.scrollIntoViewIfNeeded();
        await expect(
          practicalSection.getByRole("heading", { level: 2 })
        ).toContainText(normalized(swim.practicalTitle));
        const practicalPairs: Array<[string, string]> = [
          [swim.coach, "Ward Pellegrims"],
          [swim.day, swim.dayValue],
          [swim.price, swim.priceValue],
          [swim.gear, swim.gearValue],
          [swim.invoice, swim.invoiceValue],
        ];
        for (const [label, value] of practicalPairs) {
          await expect(
            practicalSection.getByText(label, { exact: false })
          ).toBeVisible();
          await expect(
            practicalSection.getByText(value, { exact: false })
          ).toBeVisible();
        }
        await expect(
          practicalSection.getByRole("link", { name: /Topsportbad Wezenberg/ })
        ).toHaveAttribute("href", MAPS_URL);

        const datesSection = page.locator("#dates");
        await datesSection.scrollIntoViewIfNeeded();
        await expect(
          datesSection.getByRole("heading", { level: 2 })
        ).toContainText(normalized(swim.datesTitle));
        for (const month of swim.months) {
          const monthHeading = datesSection.getByRole("heading", {
            level: 3,
            name: new RegExp(month.title, "i"),
          });
          await expect(monthHeading).toBeVisible();
          const monthCard = monthHeading.locator("xpath=..");
          const dayGrid = monthCard.locator("div.grid").first();
          for (const day of month.days) {
            await expect(dayGrid.getByText(day, { exact: true })).toBeVisible();
          }
        }

        const enrollSection = page.locator("#inschrijven");
        await enrollSection.scrollIntoViewIfNeeded();
        await expect(
          enrollSection.getByRole("heading", { level: 2 })
        ).toContainText(normalized(swim.enrollTitle));
        const stripeWarning = enrollSection.getByText(
          "Stripe links are not configured.",
          { exact: true }
        );
        if (await stripeWarning.count()) {
          await expect(stripeWarning).toBeVisible();
        } else {
          const beginnersLabel = enrollSection
            .getByText(swim.payment.beginners, { exact: false })
            .first();
          const beginnersCard = beginnersLabel.locator("xpath=../..");
          await expect(beginnersLabel).toBeVisible();
          await expect(
            beginnersCard.getByText(swim.payment.beginnersTime, {
              exact: false,
            })
          ).toBeVisible();
          await expect(
            beginnersCard.getByRole("link", { name: swim.payment.beginnersCta })
          ).toHaveAttribute("href", new RegExp(`locale=${locale}`));

          const advancedLabel = enrollSection
            .getByText(swim.payment.advanced, { exact: false })
            .first();
          const advancedCard = advancedLabel.locator("xpath=../..");
          await expect(advancedLabel).toBeVisible();
          await expect(
            advancedCard.getByText(swim.payment.advancedTime, { exact: false })
          ).toBeVisible();
          await expect(
            advancedCard.getByRole("link", { name: swim.payment.advancedCta })
          ).toHaveAttribute("href", new RegExp(`locale=${locale}`));
        }
      });

      test("supports direct navigation to the enrollment section", async ({
        page,
      }) => {
        await page.goto(`${path}#inschrijven`);
        await page.waitForLoadState("networkidle");

        const enrollSection = page.locator("#inschrijven");
        await expect(enrollSection).toBeVisible();
        await expect(
          enrollSection.getByRole("heading", { level: 2 })
        ).toContainText(normalized(swim.enrollTitle));
      });
    });
  }
});
