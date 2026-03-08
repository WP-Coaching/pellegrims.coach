import { expect, test } from "@playwright/test";
import { gotoAdminPage, loginAsAdmin } from "./auth";

test.describe("Admin Group Trainings Collection", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test("shows seeded group trainings in list view", async ({ page }) => {
    await gotoAdminPage(page, "/admin/collections/group-trainings");

    await expect(page).toHaveURL(
      /\/admin\/collections\/group-trainings\/?(?:\?.*)?$/
    );
    await expect(
      page.getByRole("heading", { name: /group trainings/i })
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: "Friday Winter Training" }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Friday Winter Training" })
    ).toHaveCount(2);
    await expect(
      page.getByText("Tuesday Winter Training", { exact: false })
    ).toBeVisible();
  });

  test("renders required fields on create page", async ({ page }) => {
    await gotoAdminPage(page, "/admin/collections/group-trainings/create");

    await expect(page).toHaveURL(
      /\/admin\/collections\/group-trainings\/create\/?(?:\?.*)?$/
    );

    await expect(
      page.getByRole("textbox", { name: /title/i }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: /subtitle/i }).first()
    ).toBeVisible();
    await expect(page.getByRole("textbox", { name: /slug/i })).toBeVisible();
    await expect(page.getByText(/^weekday/i).first()).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: /start time/i })
    ).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: /end time/i })
    ).toBeVisible();
    await expect(
      page.getByRole("spinbutton", { name: /sort order/i })
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: /save draft/i }).first()
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /publish changes/i }).first()
    ).toBeVisible();
  });
});
