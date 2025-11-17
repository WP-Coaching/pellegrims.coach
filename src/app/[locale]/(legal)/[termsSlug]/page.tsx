import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { getTranslations } from "@/lib/translations";
import { isValidLocale, type Locale } from "@/lib/i18n";
import {
  type LegalPageType,
  getLegalSlug,
  getLegalPageTypeBySlug,
  legalSlugs,
  supportedLegalSlugs,
} from "@/lib/legal";

type Params = Promise<{ locale: string; termsSlug: string }>;

type Props = {
  params: Params;
};

export async function generateStaticParams() {
  const params: { locale: string; termsSlug: string }[] = [];
  Object.values(legalSlugs).forEach((localeMap) => {
    Object.entries(localeMap).forEach(([locale, termsSlug]) => {
      params.push({ locale, termsSlug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, termsSlug } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : "en";

  if (!supportedLegalSlugs.has(termsSlug)) {
    return {};
  }

  const pageType = getLegalPageTypeBySlug(termsSlug) as LegalPageType;

  const t = getTranslations(locale);
  const txt = pageType === "general-terms" ? t.generalTerms : t.privacyPolicy;

  const siteUrl = "https://www.pellegrims.coach";
  const pageSlug = getLegalSlug(pageType, locale);
  const pageUrl = `${siteUrl}/${locale}/${pageSlug}`;
  const ogImageUrl = `${siteUrl}/images/banner_1920.jpg`;

  return {
    title: txt.meta.title,
    description: txt.meta.description,
    keywords: pageType === "general-terms" ? t.meta.keywords : undefined,
    authors: [{ name: "Ward Pellegrims" }],
    openGraph: {
      title: txt.meta.title,
      description: txt.meta.description,
      url: pageUrl,
      siteName: "Ward Pellegrims Coaching",
      locale: locale === "en" ? "en_US" : "nl_BE",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1920,
          height: 1080,
          alt: txt.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: txt.meta.title,
      description: txt.meta.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-US": `${siteUrl}/en/${getLegalSlug(pageType, "en")}`,
        "nl-BE": `${siteUrl}/nl/${getLegalSlug(pageType, "nl")}`,
      },
    },
  };
}

export default async function LegalPage({ params }: Props) {
  const { locale: localeParam, termsSlug } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? (localeParam as Locale)
    : "en";

  if (!supportedLegalSlugs.has(termsSlug)) {
    notFound();
  }

  const pageType = getLegalPageTypeBySlug(termsSlug) as LegalPageType;
  const expectedSlug = getLegalSlug(pageType, locale);

  // Redirect if slug doesn't match the expected slug for this locale
  if (termsSlug !== expectedSlug) {
    redirect(`/${locale}/${expectedSlug}`);
  }

  const t = getTranslations(locale);

  if (pageType === "general-terms") {
    const txt = t.generalTerms;
    return (
      <div className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <header>
            <h1 className="font-display text-4xl font-bold text-athletic-dark md:text-5xl">
              {txt.title}
            </h1>
            <p className="mt-4 text-sm text-gray-500">{txt.lastUpdated}</p>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              {txt.intro}
            </p>
          </header>

          <div className="mt-16 space-y-16">
            {txt.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="mb-6 font-display text-3xl font-bold text-athletic-dark md:text-4xl">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-lg leading-relaxed text-gray-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 space-y-6 border-t border-gray-200 pt-12">
            <h2 className="font-display text-3xl font-bold text-athletic-dark md:text-4xl">
              {txt.contact.title}
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              {txt.contact.description}
            </p>
            <dl className="space-y-4 text-lg text-gray-600">
              <div>
                <dt className="mb-1 font-semibold text-athletic-dark">
                  {txt.contact.emailLabel}
                </dt>
                <dd>
                  <a
                    href={`mailto:${txt.contact.emailValue}`}
                    className="text-ocean-600 underline underline-offset-2 transition-colors hover:text-ocean-700"
                  >
                    {txt.contact.emailValue}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mb-1 font-semibold text-athletic-dark">
                  {txt.contact.addressLabel}
                </dt>
                <dd>{txt.contact.addressValue}</dd>
              </div>
              <div>
                <dt className="mb-1 font-semibold text-athletic-dark">
                  {txt.contact.vatLabel}
                </dt>
                <dd>{txt.contact.vatValue}</dd>
              </div>
            </dl>
            <p className="mt-6 text-sm text-gray-500">
              {txt.contact.complaintNote}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Privacy Policy
  const privacy = t.privacyPolicy;
  return (
    <div className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <header>
          <h1 className="font-display text-4xl font-bold text-athletic-dark md:text-5xl">
            {privacy.title}
          </h1>
          <p className="mt-4 text-sm text-gray-500">{privacy.lastUpdated}</p>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            {privacy.intro}
          </p>
        </header>

        <div className="mt-16 space-y-16">
          <section>
            <h2 className="mb-6 font-display text-3xl font-bold text-athletic-dark md:text-4xl">
              {privacy.controller.title}
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              {privacy.controller.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-display text-3xl font-bold text-athletic-dark md:text-4xl">
              {privacy.dataWeCollect.title}
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              {privacy.dataWeCollect.intro}
            </p>
            <ul className="mt-8 space-y-8">
              {privacy.dataWeCollect.items.map((item, index) => (
                <li key={index}>
                  <h3 className="mb-3 font-display text-xl font-semibold text-athletic-dark">
                    {item.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-6 font-display text-3xl font-bold text-athletic-dark md:text-4xl">
              {privacy.howWeUseData.title}
            </h2>
            <ul className="list-disc space-y-3 pl-6 text-lg leading-relaxed text-gray-600">
              {privacy.howWeUseData.paragraphs.map((paragraph, index) => (
                <li key={index}>{paragraph}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-6 font-display text-3xl font-bold text-athletic-dark md:text-4xl">
              {privacy.legalBases.title}
            </h2>
            <ul className="list-disc space-y-3 pl-6 text-lg leading-relaxed text-gray-600">
              {privacy.legalBases.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-6 font-display text-3xl font-bold text-athletic-dark md:text-4xl">
              {privacy.thirdParties.title}
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              {privacy.thirdParties.intro}
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-relaxed text-gray-600">
              {privacy.thirdParties.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-6 font-display text-3xl font-bold text-athletic-dark md:text-4xl">
              {privacy.retention.title}
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              {privacy.retention.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-display text-3xl font-bold text-athletic-dark md:text-4xl">
              {privacy.security.title}
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              {privacy.security.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-display text-3xl font-bold text-athletic-dark md:text-4xl">
              {privacy.rights.title}
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              {privacy.rights.intro}
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-relaxed text-gray-600">
              {privacy.rights.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-6 font-display text-3xl font-bold text-athletic-dark md:text-4xl">
              {privacy.internationalTransfers.title}
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              {privacy.internationalTransfers.paragraphs.map(
                (paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                )
              )}
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-display text-3xl font-bold text-athletic-dark md:text-4xl">
              {privacy.complaints.title}
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              {privacy.complaints.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-display text-3xl font-bold text-athletic-dark md:text-4xl">
              {privacy.updates.title}
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              {privacy.updates.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
