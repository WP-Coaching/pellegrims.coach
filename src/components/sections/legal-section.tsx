import React, { PropsWithChildren } from "react";

type LegalSectionProps = PropsWithChildren<{
  title: string;
  id?: string;
}>;

export const LegalSection = ({ title, id, children }: LegalSectionProps) => {
  return (
    <section id={id}>
      <h2 className="mb-6 font-display text-3xl font-bold text-athletic-dark md:text-4xl">
        {title}
      </h2>
      {children}
    </section>
  );
};
