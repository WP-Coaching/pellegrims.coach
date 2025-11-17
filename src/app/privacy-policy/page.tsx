import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { detectPreferredLocale } from "@/lib/i18n";
import { getLegalSlug } from "@/lib/legal";

export default async function PrivacyPolicyRedirect() {
  const headersList = await headers();
  const locale = detectPreferredLocale(headersList.get("accept-language"));

  // Redirect visitors to the locale-specific privacy policy
  redirect(`/${locale}/${getLegalSlug("privacy-policy", locale)}`);
}
