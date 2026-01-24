import React from "react";
import { TranslationKey } from "@/lib/translations";
import { LegalPageHeader } from "@/components/sections/legal-page-header";
import { LegalSection } from "@/components/sections/legal-section";
import {
  LegalPageContainer,
  LegalContentContainer,
} from "@/components/ui/legal-ui";
import { Heading, Text } from "@/components/ui/typography";
import { Stack } from "@/components/ui/layout";

type PrivacyPolicyProps = {
  translations: TranslationKey;
};

export const PrivacyPolicy = ({ translations }: PrivacyPolicyProps) => {
  const privacy = translations.privacyPolicy;

  return (
    <LegalPageContainer>
      <LegalPageHeader
        title={privacy.title}
        lastUpdated={privacy.lastUpdated}
        intro={privacy.intro}
      />

      <LegalContentContainer>
        <LegalSection title={privacy.controller.title}>
          <Stack gap={4}>
            {privacy.controller.paragraphs.map((paragraph, index) => (
              <Text key={index} variant="large" className="text-gray-600">
                {paragraph}
              </Text>
            ))}
          </Stack>
        </LegalSection>

        <LegalSection title={privacy.dataWeCollect.title}>
          <Text variant="large" className="text-gray-600">
            {privacy.dataWeCollect.intro}
          </Text>
          <ul className="mt-8 flex flex-col gap-8">
            {privacy.dataWeCollect.items.map((item, index) => (
              <li key={index}>
                <Heading
                  level="h3"
                  variant="card"
                  className="mb-3 font-semibold text-text"
                >
                  {item.title}
                </Heading>
                <Text variant="large" className="text-gray-600">
                  {item.description}
                </Text>
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection title={privacy.howWeUseData.title}>
          <ul className="list-disc space-y-3 pl-6">
            {privacy.howWeUseData.paragraphs.map((paragraph, index) => (
              <li key={index}>
                <Text variant="large" className="text-gray-600">
                  {paragraph}
                </Text>
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection title={privacy.legalBases.title}>
          <ul className="list-disc space-y-3 pl-6">
            {privacy.legalBases.items.map((item, index) => (
              <li key={index}>
                <Text variant="large" className="text-gray-600">
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection title={privacy.thirdParties.title}>
          <Text variant="large" className="text-gray-600">
            {privacy.thirdParties.intro}
          </Text>
          <ul className="mt-4 list-disc space-y-3 pl-6">
            {privacy.thirdParties.items.map((item, index) => (
              <li key={index}>
                <Text variant="large" className="text-gray-600">
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection title={privacy.retention.title}>
          <Stack gap={4}>
            {privacy.retention.paragraphs.map((paragraph, index) => (
              <Text key={index} variant="large" className="text-gray-600">
                {paragraph}
              </Text>
            ))}
          </Stack>
        </LegalSection>

        <LegalSection title={privacy.security.title}>
          <Stack gap={4}>
            {privacy.security.paragraphs.map((paragraph, index) => (
              <Text key={index} variant="large" className="text-gray-600">
                {paragraph}
              </Text>
            ))}
          </Stack>
        </LegalSection>

        <LegalSection title={privacy.rights.title}>
          <Text variant="large" className="text-gray-600">
            {privacy.rights.intro}
          </Text>
          <ul className="mt-4 list-disc space-y-3 pl-6">
            {privacy.rights.list.map((item, index) => (
              <li key={index}>
                <Text variant="large" className="text-gray-600">
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection title={privacy.internationalTransfers.title}>
          <Stack gap={4}>
            {privacy.internationalTransfers.paragraphs.map(
              (paragraph, index) => (
                <Text key={index} variant="large" className="text-gray-600">
                  {paragraph}
                </Text>
              )
            )}
          </Stack>
        </LegalSection>

        <LegalSection title={privacy.complaints.title}>
          <Stack gap={4}>
            {privacy.complaints.paragraphs.map((paragraph, index) => (
              <Text key={index} variant="large" className="text-gray-600">
                {paragraph}
              </Text>
            ))}
          </Stack>
        </LegalSection>

        <LegalSection title={privacy.updates.title}>
          <Stack gap={4}>
            {privacy.updates.paragraphs.map((paragraph, index) => (
              <Text key={index} variant="large" className="text-gray-600">
                {paragraph}
              </Text>
            ))}
          </Stack>
        </LegalSection>
      </LegalContentContainer>
    </LegalPageContainer>
  );
};
