import { expect } from "@playwright/test";

const ADMIN_EMAIL = process.env.PAYLOAD_ADMIN_EMAIL ?? "test@example.com";
const ADMIN_PASSWORD = process.env.PAYLOAD_ADMIN_PASSWORD ?? "test";

export async function loginAsAdmin(
  page: import("@playwright/test").Page
): Promise<void> {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    let response: Awaited<ReturnType<typeof page.request.post>> | null = null;
    try {
      response = await page.request.post("/api/users/login", {
        data: {
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
        },
        failOnStatusCode: false,
      });
    } catch {
      await page.waitForTimeout(300 * attempt);
      continue;
    }

    if (response?.ok()) {
      await page.goto("/admin");
      await page.waitForLoadState("networkidle");

      if (!page.url().includes("/admin/login")) {
        await expect(page).toHaveURL(/\/admin\/?$/);
        return;
      }
    }

    await page.waitForTimeout(300 * attempt);
  }

  throw new Error("Unable to authenticate admin user for E2E test run.");
}

export async function gotoAdminPage(
  page: import("@playwright/test").Page,
  path: string
): Promise<void> {
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    if (!page.url().includes("/admin/login")) {
      return;
    }

    await loginAsAdmin(page);
  }

  throw new Error(`Unable to reach authenticated admin route: ${path}`);
}

export async function expectAdminSuccessToast(
  page: import("@playwright/test").Page,
  messagePattern: RegExp = /created|success/i
): Promise<void> {
  const successToast = page
    .locator(".toast-success, [role='status']")
    .filter({ hasText: messagePattern })
    .first();

  await expect(successToast).toBeVisible({ timeout: 10000 });
}
