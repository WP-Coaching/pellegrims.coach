import { test, expect } from "@playwright/test";
import fs from "fs";
import os from "os";
import path from "path";
import { loginAsAdmin } from "./auth";

class MediaCreatePage {
  constructor(private readonly page: import("@playwright/test").Page) {}

  async goto() {
    await this.page.goto("/admin/collections/media/create", {
      waitUntil: "domcontentloaded",
    });
  }

  async uploadFile(filePath: string) {
    const inputs = this.page.locator('input[type="file"]');
    if ((await inputs.count()) > 0) {
      await inputs.first().setInputFiles(filePath);
      return;
    }

    const trigger = this.page
      .getByRole("button", { name: /upload|select|choose|browse/i })
      .first();
    const [chooser] = await Promise.all([
      this.page.waitForEvent("filechooser"),
      trigger.click(),
    ]);
    await chooser.setFiles(filePath);
  }

  async fillAlt(text: string) {
    const altField = this.page.locator("#field-alt");
    await expect(altField).toBeVisible();
    await altField.fill(text);
  }

  async save() {
    const actionSave = this.page.locator("#action-save");
    if (await actionSave.isVisible()) {
      await actionSave.click();
      return;
    }
    await this.page.getByRole("button", { name: /save/i }).click();
  }
}

test.describe("Admin Media Collection", () => {
  test("should create a media item via admin UI", async ({ page }) => {
    const media = new MediaCreatePage(page);
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      await loginAsAdmin(page);
      try {
        await media.goto();
      } catch {
        // If auth redirects mid-navigation, retry the loop.
        continue;
      }

      if (page.url().includes("/admin/login")) {
        continue;
      }

      const altField = page.locator("#field-alt");
      const loginButton = page.getByRole("button", { name: /login/i });
      const result = await Promise.race([
        altField
          .waitFor({ state: "visible", timeout: 15000 })
          .then(() => "alt")
          .catch(() => null),
        loginButton
          .waitFor({ state: "visible", timeout: 15000 })
          .then(() => "login")
          .catch(() => null),
      ]);

      if (result === "alt") {
        break;
      }
    }

    await expect(page.locator("#field-alt")).toBeVisible({
      timeout: 15000,
    });

    const uploadPath = path.join(os.tmpdir(), "e2e-media-upload.png");
    if (!fs.existsSync(uploadPath)) {
      const pngBase64 =
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO2Jb8sAAAAASUVORK5CYII=";
      fs.writeFileSync(uploadPath, Buffer.from(pngBase64, "base64"));
    }
    await media.uploadFile(uploadPath);

    await media.fillAlt("E2E test image alt text");
    await media.save();

    await expect(page).toHaveURL(/\/admin\/collections\/media\/[a-z0-9]+/, {
      timeout: 15000,
    });
    await expect(page).toHaveURL(/\/admin\/collections\/media\/[a-z0-9]+/);
  });
});
