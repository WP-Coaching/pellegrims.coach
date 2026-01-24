import React, { PropsWithChildren } from "react";
import { Heading } from "@/components/ui/typography";

type LegalSectionProps = PropsWithChildren<{
  title: string;
  id?: string;
}>;

export const LegalSection = ({ title, id, children }: LegalSectionProps) => {
  return (
    <section id={id} className="flex flex-col gap-6">
      <Heading level="h2" variant="section">
        {title}
      </Heading>
      {children}
    </section>
  );
};
