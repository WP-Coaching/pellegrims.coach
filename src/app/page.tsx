import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { detectPreferredLocale } from "@/lib/i18n";

export default async function RootPage() {
  // Get the accept-language header to determine user's preferred language
  const headersList = await headers();
  const locale = detectPreferredLocale(headersList.get("accept-language"));

  // Redirect to appropriate locale
  redirect(`/${locale}`);
}
