import { test, expect } from "@playwright/test";
import { gotoAdminPage, loginAsAdmin } from "./auth";

test.describe("Admin Contact Submission", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test("should manually create a contact submission via admin UI", async ({
    page,
  }) => {
    await gotoAdminPage(page, "/admin/collections/contact-submissions/create");

    await page.getByRole("textbox", { name: /name/i }).fill("Admin Test User");
    await page
      .getByRole("textbox", { name: /email/i })
      .fill("admin-test@example.com");
    await page
      .getByRole("textbox", { name: /subject/i })
      .fill("Admin Test Subject");
    await page
      .getByRole("textbox", { name: /message/i })
      .fill("This is a manually created message.");

    await page.getByRole("button", { name: /save/i }).first().click();

    await expect(page.getByText(/successfully/i).first()).toBeVisible({
      timeout: 10000,
    });
    await expect(page).toHaveURL(
      /\/admin\/collections\/contact-submissions\/[^/]+\/?(?:\?.*)?$/
    );
  });
});
