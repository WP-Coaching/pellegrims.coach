import React from "react";

type LegalPageHeaderProps = {
  title: string;
  lastUpdated: string;
  intro: string;
};

export const LegalPageHeader = ({
  title,
  lastUpdated,
  intro,
}: LegalPageHeaderProps) => {
  return (
    <header>
      <h1 className="font-display text-4xl font-bold text-athletic-dark md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-sm text-gray-500">{lastUpdated}</p>
      <p className="mt-6 text-lg leading-relaxed text-gray-600">{intro}</p>
    </header>
  );
};
