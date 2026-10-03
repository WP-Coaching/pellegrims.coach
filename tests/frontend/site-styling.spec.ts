import { expect, test } from "@playwright/test";

for (const locale of ["en", "nl"]) {
  test(`${locale}: preserves theme and responsive navigation`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/`);

    const contact = page.locator("#contact");
    await expect(contact.getByRole("heading", { level: 2 })).toHaveCSS(
      "font-family",
      /Poppins/i
    );
    await expect(contact.locator('button[type="submit"]')).toHaveCSS(
      "background-image",
      /linear-gradient.*rgb\(3, 105, 161\).*rgb\(14, 165, 233\)/
    );

    const header = page.getByRole("banner");
    const menuToggle = header.getByRole("button", {
      name: "Toggle navigation menu",
    });
    const navigation = header.getByRole("navigation");

    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(navigation).toBeVisible();
    await expect(menuToggle).toBeHidden();

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(navigation).toBeHidden();
    await expect(menuToggle).toBeVisible();
    await menuToggle.click();
    await expect(menuToggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#mobile-menu")).toBeVisible();
  });
}
