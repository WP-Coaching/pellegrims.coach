import React from "react";
import { TranslationKey } from "@/lib/translations";
import { LegalPageHeader } from "@/components/sections/legal-page-header";
import { LegalSection } from "@/components/sections/legal-section";

type GeneralTermsProps = {
  translations: TranslationKey;
};

export const GeneralTerms = ({ translations }: GeneralTermsProps) => {
  const txt = translations.generalTerms;

  return (
    <div className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <LegalPageHeader
          title={txt.title}
          lastUpdated={txt.lastUpdated}
          intro={txt.intro}
        />

        <div className="mt-16 space-y-16">
          {txt.sections.map((section) => (
            <LegalSection
              key={section.id}
              id={section.id}
              title={section.title}
            >
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
            </LegalSection>
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
};
