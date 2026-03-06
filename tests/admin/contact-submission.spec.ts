import { test, expect } from "@playwright/test";
import {
  expectAdminSuccessToast,
  gotoAdminPage,
  loginAsAdmin,
} from "./helpers";

test.describe("Admin Contact Submission", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test("should manually create a contact submission via admin UI", async ({
    page,
  }) => {
    await gotoAdminPage(page, "/admin/collections/contact-submissions/create");
    await page.waitForSelector("#field-name");

    // 4. Fill form
    await page.fill("#field-name", "Admin Test User");
    await page.fill("#field-email", "admin-test@example.com");
    await page.fill("#field-subject", "Admin Test Subject");
    await page.fill("#field-message", "This is a manually created message.");

    // 5. Save
    // The save button usually is #action-save or has text "Save"
    await page.click("#action-save");

    // Verify we are on the edit page (ID in URL) after creation.
    await expect(page).toHaveURL(
      /\/admin\/collections\/contact-submissions\/[a-z0-9]+/,
      { timeout: 20000 }
    );

    await expectAdminSuccessToast(page, /submission successfully created/i);
  });
});
