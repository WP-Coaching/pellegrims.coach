import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    // Mock the Server Action response to avoid real emails/DB in e2e
    // However, Next.js Server Actions are hard to mock at network level easily without end-to-end flow.
    // We will rely on our "Test Environment" database isolation.
    // So we will actually submit to the test DB.

    await page.goto("/");
    // Wait for hydration
    await page.waitForLoadState("networkidle");
  });

  test("should successfully submit the contact form", async ({ page }) => {
    // Scroll to contact section
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    // Fill out the form
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="subject"]', "Test Subject");
    await page.fill(
      'textarea[name="message"]',
      "This is a test message from Playwright."
    );

    // Submit
    // We need to wait for the response/UI update
    await page.click('button[type="submit"]');

    // Check for success message
    // Translation key: contact.success -> "Thank you for your message!"
    await expect(
      page.locator("text=Thank you for your message!")
    ).toBeVisible();
    await expect(
      page.locator("text=I'll get back to you as soon as possible.")
    ).toBeVisible();
  });

  // We can't easily test rejection/error without mocking internal server error or network failure,
  // which is complex for now. The happy path proves the integration works.
});
