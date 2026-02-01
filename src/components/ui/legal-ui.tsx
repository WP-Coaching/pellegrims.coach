"use client";

import { ReactNode } from "react";
import { Container } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";

export function LegalPageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white pb-20 pt-12 md:pb-24">
      <Container maxWidth="4xl">{children}</Container>
    </div>
  );
}

export function LegalContentContainer({ children }: { children: ReactNode }) {
  return <div className="space-y-16">{children}</div>;
}

export function LegalContactSection({
  title,
  description,
  emailLabel,
  emailValue,
  addressLabel,
  addressValue,
  vatLabel,
  vatValue,
  complaintNote,
}: {
  title: string;
  description: string;
  emailLabel: string;
  emailValue: string;
  addressLabel: string;
  addressValue: string;
  vatLabel: string;
  vatValue: string;
  complaintNote: string;
}) {
  return (
    <div className="mt-20 space-y-6 border-t border-gray-200 pt-12">
      <Heading
        level="h2"
        className="font-display text-3xl font-bold text-text md:text-4xl"
      >
        {title}
      </Heading>
      <Text variant="large" className="text-gray-600">
        {description}
      </Text>
      <dl className="space-y-4 text-lg text-gray-600">
        <div>
          <dt className="mb-1 font-semibold text-text">{emailLabel}</dt>
          <dd>
            <Link href={`mailto:${emailValue}`}>{emailValue}</Link>
          </dd>
        </div>
        <div>
          <dt className="mb-1 font-semibold text-text">{addressLabel}</dt>
          <dd>{addressValue}</dd>
        </div>
        <div>
          <dt className="mb-1 font-semibold text-text">{vatLabel}</dt>
          <dd>{vatValue}</dd>
        </div>
      </dl>
      <Text variant="small" className="mt-6 text-gray-500">
        {complaintNote}
      </Text>
    </div>
  );
}
