import { expect, test } from "@playwright/test";
import { gotoAdminPage, loginAsAdmin } from "./auth";

test.describe("Admin Projects Collection", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test("shows seeded projects in the list view", async ({ page }) => {
    await gotoAdminPage(page, "/admin/collections/projects");

    await expect(page).toHaveURL(/\/admin\/collections\/projects\/?(?:\?.*)?$/);
    await expect(
      page.getByRole("heading", { name: /projects/i })
    ).toBeVisible();

    await expect(
      page.getByText("Roc Du Maroc", { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText("Triathlon Training Camp La Santa Lanzarote", {
        exact: false,
      })
    ).toBeVisible();
  });

  test("renders required fields on create page", async ({ page }) => {
    await gotoAdminPage(page, "/admin/collections/projects/create");

    await expect(page).toHaveURL(
      /\/admin\/collections\/projects\/create\/?(?:\?.*)?$/
    );

    await expect(page.locator('[id^="field-title"]')).toBeVisible();
    await expect(page.locator('[id^="field-description"]')).toBeVisible();
    await expect(page.locator("#field-image")).toBeVisible();
    await expect(page.locator("#field-category")).toBeVisible();
    await expect(page.locator("#field-link")).toBeVisible();
    await expect(page.locator("#field-active")).toBeVisible();
    await expect(page.locator("#field-sortOrder")).toBeVisible();
  });
});
