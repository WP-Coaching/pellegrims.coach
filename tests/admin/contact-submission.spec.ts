import { test, expect } from "@playwright/test";

test.describe("Admin Contact Submission", () => {
  test.beforeEach(async ({ page }) => {
    // 1. Log in as admin
    await page.goto("/admin/login");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "test");
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await expect(page).toHaveURL(/\/admin\/?$/);
  });

  test("should manually create a contact submission via admin UI", async ({
    page,
  }) => {
    await page.goto("/admin/collections/contact-submissions/create");
    await page.waitForSelector("#field-name");

    // 4. Fill form
    await page.fill("#field-name", "Admin Test User");
    await page.fill("#field-email", "admin-test@example.com");
    await page.fill("#field-subject", "Admin Test Subject");
    await page.fill("#field-message", "This is a manually created message.");

    // 5. Save
    // The save button usually is #action-save or has text "Save"
    await page.click("#action-save");

    // 6. Verify success
    // Toast success message checks
    await expect(page.locator(".toast-success")).toBeVisible();
    await expect(page.locator(".toast-success")).toContainText(
      "Submission successfully created."
    );

    // Verify we are still on the edit page (ID in URL)
    await expect(page).toHaveURL(
      /\/admin\/collections\/contact-submissions\/[a-z0-9]+/
    );
  });
});
