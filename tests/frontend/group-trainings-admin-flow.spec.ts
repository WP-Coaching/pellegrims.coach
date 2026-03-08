import { expect, test, type Locator, type Page } from "@playwright/test";
import { gotoAdminPage, loginAsAdmin } from "../admin/auth";

const TRAINING_NAME = "Tuesday Winter Training";
const TRAINING_SLUG = "winter-2026-dinsdag";

const saveGroupTraining = async (page: Page) => {
  const publishButton = page.getByRole("button", { name: /publish changes/i });
  if (
    await publishButton
      .first()
      .isVisible()
      .catch(() => false)
  ) {
    await publishButton.first().click();
  } else {
    const saveChangesButton = page.getByRole("button", {
      name: /save changes|save/i,
    });
    await saveChangesButton.first().click();
  }
  await expect(page.getByText(/successfully|saved/i).first()).toBeVisible({
    timeout: 15000,
  });
};

const getPriceField = (page: Page): Locator =>
  page.getByRole("textbox", { name: /price/i }).first();

test.describe("Admin + Frontend Group Trainings Flow", () => {
  test("updates a group training in admin and shows the change on the frontend", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "Run this cross-flow test once on desktop Chromium."
    );

    await loginAsAdmin(page);
    await gotoAdminPage(page, "/admin/collections/group-trainings");

    await page.getByRole("link", { name: TRAINING_NAME }).first().click();
    await expect(page).toHaveURL(
      /\/admin\/collections\/group-trainings\/[^/]+/
    );

    const priceField = getPriceField(page);
    await expect(priceField).toBeVisible();

    const originalPrice = await priceField.inputValue();
    const updatedPrice = `${originalPrice} [E2E]`;

    try {
      await priceField.fill(updatedPrice);
      await saveGroupTraining(page);

      await expect(async () => {
        await page.goto(`/en/groepen/${TRAINING_SLUG}`);
        await page.waitForLoadState("networkidle");
        await expect(
          page.getByText(updatedPrice, { exact: false }).first()
        ).toBeVisible();
      }).toPass({
        timeout: 30000,
        intervals: [1000, 2000, 5000],
      });
    } finally {
      await gotoAdminPage(page, "/admin/collections/group-trainings");
      await page.getByRole("link", { name: TRAINING_NAME }).first().click();
      await expect(page).toHaveURL(
        /\/admin\/collections\/group-trainings\/[^/]+/
      );
      await getPriceField(page).fill(originalPrice);
      await saveGroupTraining(page);
    }
  });
});
