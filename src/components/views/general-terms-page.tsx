import React from "react";
import { TranslationKey } from "@/lib/translations";
import { LegalPageHeader } from "@/components/sections/legal-page-header";
import { LegalSection } from "@/components/sections/legal-section";
import {
  LegalPageContainer,
  LegalContentContainer,
  LegalContactSection,
} from "@/components/ui/legal-ui";
import { Text } from "@/components/ui/typography";
import { Stack } from "@/components/ui/layout";

type GeneralTermsProps = {
  translations: TranslationKey;
};

export const GeneralTerms = ({ translations }: GeneralTermsProps) => {
  const txt = translations.generalTerms;

  return (
    <LegalPageContainer>
      <LegalPageHeader
        title={txt.title}
        lastUpdated={txt.lastUpdated}
        intro={txt.intro}
      />

      <LegalContentContainer>
        {txt.sections.map((section) => (
          <LegalSection key={section.id} id={section.id} title={section.title}>
            <Stack gap={4}>
              {section.paragraphs.map((paragraph, index) => (
                <Text key={index} variant="large" className="text-gray-600">
                  {paragraph}
                </Text>
              ))}
            </Stack>
          </LegalSection>
        ))}
      </LegalContentContainer>

      <LegalContactSection
        title={txt.contact.title}
        description={txt.contact.description}
        emailLabel={txt.contact.emailLabel}
        emailValue={txt.contact.emailValue}
        addressLabel={txt.contact.addressLabel}
        addressValue={txt.contact.addressValue}
        vatLabel={txt.contact.vatLabel}
        vatValue={txt.contact.vatValue}
        complaintNote={txt.contact.complaintNote}
      />
    </LegalPageContainer>
  );
};
