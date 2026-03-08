"use client";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import type { ReactNode } from "react";

interface StripeRegistrationButtonProps {
  url: string | undefined;
  isOpen: boolean;
  locale: Locale;
  contactHref: string;
  closedLabel: string;
  contactFallbackLabel: string;
  children: ReactNode;
  className?: string;
}

export function StripeRegistrationButton({
  url,
  isOpen,
  locale,
  contactHref,
  closedLabel,
  contactFallbackLabel,
  children,
  className = "",
}: StripeRegistrationButtonProps) {
  if (!isOpen) {
    return (
      <Button disabled fullWidth className={className}>
        {closedLabel}
      </Button>
    );
  }

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
    <Button as="a" href={contactHref} fullWidth className={className}>
      {contactFallbackLabel}
    </Button>
  );
}
