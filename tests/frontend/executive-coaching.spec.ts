import { expect, test } from "@playwright/test";

test("opens executive coaching from the menu and switches between translations", async ({
  page,
}) => {
  await page.goto("/nl/");
  const mobileMenu = page.getByRole("button", {
    name: "Toggle navigation menu",
  });
  if (await mobileMenu.isVisible()) {
    await mobileMenu.click();
  }

  await page.getByRole("link", { name: "Voor Ondernemers" }).click();
  await expect(page).toHaveURL(/\/nl\/ondernemers\/$/);
  await expect(page).toHaveTitle(
    "Executive Performance Coaching voor Ondernemers | pellegrims.coach"
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.pellegrims.coach/nl/ondernemers/"
  );

  await expect(
    page.getByRole("heading", { name: "Veelgestelde vragen" })
  ).toHaveCount(0);
  await expect(
    page.getByText("Facturatie via vennootschap mogelijk")
  ).toHaveCount(0);

  await page.getByRole("banner").getByRole("link", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en\/executive-coaching\/$/);
  await expect(
    page.getByRole("heading", { level: 1, name: /Elite sport principles/ })
  ).toBeVisible();

  const introLink = page
    .getByRole("region", { name: /Elite sport principles/ })
    .getByRole("link", { name: "Request a free introductory call" });
  await introLink.click();
  await expect(page.getByLabel("Subject")).toHaveValue(
    "Executive Performance Coaching introductory call"
  );
});

test("opens the Dutch landing page and submits an introductory call request", async ({
  page,
}) => {
  await page.goto("/nl/ondernemers/");
  await expect(page).toHaveURL(/\/nl\/ondernemers\/$/);

  const introHref = "/nl/?contact=executive-coaching#contact";
  const introLabel = "Vraag een vrijblijvend kennismakingsgesprek aan";
  const introLinks = page.getByRole("link", { name: introLabel, exact: true });
  await expect(introLinks).toHaveCount(3);
  for (const introLink of await introLinks.all()) {
    await expect(introLink).toHaveAttribute("href", introHref);
  }

  await page
    .getByRole("region", { name: /Klaar om te investeren/ })
    .getByRole("link", { name: introLabel })
    .click();
  await expect(page).toHaveURL(/\/nl\/\?contact=executive-coaching#contact$/);
  const form = page.locator("#contact form");
  await expect(form.getByLabel("Onderwerp")).toHaveValue(
    "Kennismaking Executive Performance Coaching"
  );
  await form.getByLabel("Naam", { exact: true }).fill("Playwright Test");
  await form.getByLabel("E-mail", { exact: true }).fill("test@example.com");
  await form
    .getByLabel("Bericht", { exact: true })
    .fill("Ik wil graag kennismaken voor Executive Performance Coaching.");
  await form.getByRole("button", { name: /verstuur/i }).click();
  await expect(page.getByText("Bedankt voor uw bericht!")).toBeVisible();
});
