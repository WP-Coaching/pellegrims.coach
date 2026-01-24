"use client";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import type { ReactNode } from "react";

interface StripeRegistrationButtonProps {
  url: string | undefined;
  locale: Locale;
  children: ReactNode;
  className?: string;
}

export function StripeRegistrationButton({
  url,
  locale,
  children,
  className = "",
}: StripeRegistrationButtonProps) {
  if (url) {
    const fullUrl = `${url}?locale=${locale}`;
    return (
      <Button
        as="a"
        href={fullUrl}
        target="_blank"
        fullWidth
        className={className}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button disabled fullWidth className={className}>
      {locale === "en" ? "Registration Closed" : "Inschrijving Afgesloten"}
    </Button>
  );
}
