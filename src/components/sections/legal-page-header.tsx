import React from "react";
import { Heading, Text } from "@/components/ui/typography";
import { Stack } from "@/components/ui/layout";

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
    <header className="flex flex-col gap-6">
      <Stack gap={4}>
        <Heading level="h1" variant="display">
          {title}
        </Heading>
        <Text variant="muted">{lastUpdated}</Text>
      </Stack>
      <Text variant="large" color="muted">
        {intro}
      </Text>
    </header>
  );
};
