"use client";

import { AthleticLinkButton } from "@/components/ui/athletic-link-button";
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
      <AthleticLinkButton
        href={fullUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </AthleticLinkButton>
    );
  }

  return (
    <button
      disabled
      className={`inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg bg-gray-300 px-6 py-3 text-base font-semibold text-gray-500 ${className}`}
    >
      {locale === "en" ? "Registration Closed" : "Inschrijving Afgesloten"}
    </button>
  );
}
