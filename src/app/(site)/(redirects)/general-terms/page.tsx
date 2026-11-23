import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { detectPreferredLocale } from "@/lib/i18n";
import { getLocalizedPagePath } from "@/lib/site-routes";

export default async function GeneralTermsRedirect() {
  const headersList = await headers();
  const locale = detectPreferredLocale(headersList.get("accept-language"));

  // Redirect visitors to the locale-specific general terms page
  redirect(getLocalizedPagePath("general-terms", locale));
}
