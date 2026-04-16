import "../../../../globals.css";
import { inter, poppins } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getTranslations, generateStaticParams } from "@/lib/translations";
import { isValidLocale, type Locale } from "@/lib/i18n";

export { generateStaticParams };

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : "en";
  const t = getTranslations(locale);

  const siteUrl = "https://www.pellegrims.coach";

  // Construct canonical URL based on locale - this ensures the canonical URL
  // points to the equivalent page content for the current locale
  const canonicalUrl = locale === "en" ? `${siteUrl}/en/` : `${siteUrl}/nl/`;

  const pageUrl = locale === "en" ? `${siteUrl}/en/` : `${siteUrl}/nl/`;
  const ogImageUrl = `${siteUrl}/images/banner_1920.jpg`;

  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: t.meta.keywords,
    authors: [{ name: "Ward Pellegrims" }],
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: pageUrl,
      siteName: "Ward Pellegrims Coaching",
      locale: locale === "en" ? "en_US" : "nl_BE",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1920,
          height: 1080,
          alt:
            locale === "en"
              ? "Ward Pellegrims Swimming & Triathlon Coach"
              : "Ward Pellegrims Zwem- en Triathloncoach",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": `${siteUrl}/en/`,
        "nl-BE": `${siteUrl}/nl/`,
      },
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? (localeParam as Locale)
    : "en";
  const t = getTranslations(locale);

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <div className="flex min-h-screen flex-col bg-white">
          <Header locale={locale} t={t} />
          <main className="flex flex-grow flex-col">{children}</main>
          <Footer locale={locale} t={t} />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
