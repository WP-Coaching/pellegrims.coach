import React from "react";
import { TranslationKey } from "@/lib/translations";
import { LegalPageHeader } from "@/components/sections/legal-page-header";
import { LegalSection } from "@/components/sections/legal-section";

type PrivacyPolicyProps = {
  translations: TranslationKey;
};

export const PrivacyPolicy = ({ translations }: PrivacyPolicyProps) => {
  const privacy = translations.privacyPolicy;

  return (
    <div className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <LegalPageHeader
          title={privacy.title}
          lastUpdated={privacy.lastUpdated}
          intro={privacy.intro}
        />

        <div className="mt-16 space-y-16">
          <LegalSection title={privacy.controller.title}>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              {privacy.controller.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </LegalSection>

          <LegalSection title={privacy.dataWeCollect.title}>
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
          </LegalSection>

          <LegalSection title={privacy.howWeUseData.title}>
            <ul className="list-disc space-y-3 pl-6 text-lg leading-relaxed text-gray-600">
              {privacy.howWeUseData.paragraphs.map((paragraph, index) => (
                <li key={index}>{paragraph}</li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection title={privacy.legalBases.title}>
            <ul className="list-disc space-y-3 pl-6 text-lg leading-relaxed text-gray-600">
              {privacy.legalBases.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection title={privacy.thirdParties.title}>
            <p className="text-lg leading-relaxed text-gray-600">
              {privacy.thirdParties.intro}
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-relaxed text-gray-600">
              {privacy.thirdParties.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection title={privacy.retention.title}>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              {privacy.retention.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </LegalSection>

          <LegalSection title={privacy.security.title}>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              {privacy.security.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </LegalSection>

          <LegalSection title={privacy.rights.title}>
            <p className="text-lg leading-relaxed text-gray-600">
              {privacy.rights.intro}
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-relaxed text-gray-600">
              {privacy.rights.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection title={privacy.internationalTransfers.title}>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              {privacy.internationalTransfers.paragraphs.map(
                (paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                )
              )}
            </div>
          </LegalSection>

          <LegalSection title={privacy.complaints.title}>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              {privacy.complaints.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </LegalSection>

          <LegalSection title={privacy.updates.title}>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              {privacy.updates.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </LegalSection>
        </div>
      </div>
    </div>
  );
};
