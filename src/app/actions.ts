"use server";

import { getPayload } from "payload";
import config from "@/payload.config";

export async function submitContactForm(
  prevState: unknown,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const locale = (formData.get("locale") as "en" | "nl") || "en";
  const recaptchaToken = formData.get("g-recaptcha-response") as string;

  // Verify reCAPTCHA
  if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    if (!recaptchaToken) {
      return { success: false, error: "Recaptcha token missing" };
    }

    // Server-side verification of reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // User needs to provide this!
    if (secretKey) {
      const verifyRes = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${secretKey}&response=${recaptchaToken}`,
        }
      );
      const verifyJson = await verifyRes.json();
      if (!verifyJson.success) {
        return { success: false, error: "Recaptcha validation failed" };
      }
    } else {
      console.warn("RECAPTCHA_SECRET_KEY not set, skipping verification");
    }
  }

  try {
    const payload = await getPayload({ config });

    await payload.create({
      collection: "contact-submissions",
      data: {
        name,
        email,
        subject,
        message,
        locale,
        read: false,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to create contact submission:", error);
    return { success: false, error: "Failed to submit form" };
  }
}
