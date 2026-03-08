import { expect, type Page } from "@playwright/test";

const ADMIN_EMAIL = "test@example.com";
const ADMIN_PASSWORD = "test";

const waitForAdminHome = async (page: Page) => {
  await page.waitForURL(/\/admin\/?$/, { timeout: 15000 }).catch(() => null);
  return /\/admin\/?$/.test(page.url());
};

const submitLoginForm = async (page: Page) => {
  await page.locator('input[name="email"]').fill(ADMIN_EMAIL);
  await page.locator('input[name="password"]').fill(ADMIN_PASSWORD);

  const loginResponse = page
    .waitForResponse(
      (response) =>
        response.url().includes("/api/users/login") && response.ok(),
      { timeout: 15000 }
    )
    .catch(() => null);

  await page.getByRole("button", { name: /log in|login/i }).click();
  await loginResponse;
};

const submitCreateFirstUserForm = async (page: Page) => {
  await page.locator('input[name="email"]').fill(ADMIN_EMAIL);
  await page.locator('input[name="password"]').fill(ADMIN_PASSWORD);
  await page.locator('input[name="confirm-password"]').fill(ADMIN_PASSWORD);

  const createUserResponse = page
    .waitForResponse(
      (response) =>
        response.url().includes("/api/users/first-register") && response.ok(),
      { timeout: 15000 }
    )
    .catch(() => null);

  const submitButton = page
    .locator('form button[type="submit"]')
    .first()
    .or(page.getByRole("button", { name: /create|save|register/i }).first());
  await submitButton.click();
  await createUserResponse;
};

export async function loginAsAdmin(page: Page): Promise<void> {
  await page.goto("/admin/login");

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    if (await waitForAdminHome(page)) {
      return;
    }

    if ((await page.locator('input[name="confirm-password"]').count()) > 0) {
      await submitCreateFirstUserForm(page);
    } else {
      await submitLoginForm(page);
    }

    if (await waitForAdminHome(page)) {
      return;
    }

    await page.waitForLoadState("networkidle").catch(() => null);
  }

  await expect(page).toHaveURL(/\/admin\/?$/);
}

export async function gotoAdminPage(page: Page, path: string): Promise<void> {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    await page.goto(path).catch(() => null);
    await page.waitForLoadState("networkidle").catch(() => null);

    if (!page.url().includes("/admin/login")) {
      return;
    }

    await loginAsAdmin(page);
  }

  throw new Error(`Failed to navigate to ${path}`);
}
