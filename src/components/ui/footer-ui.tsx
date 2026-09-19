"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/layout";

export function FooterContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <footer
      className={cn(
        "border-t border-border bg-background py-12 md:py-16",
        className
      )}
    >
      <Container maxWidth="6xl" padding="md">
        {children}
      </Container>
    </footer>
  );
}

export function FooterLink({
  href,
  onClick,
  children,
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const className =
    "text-sm text-text-muted transition-colors hover:text-text bg-transparent border-none p-0 cursor-pointer";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export function FooterBottomBar({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 border-t border-border pt-8 text-center text-sm text-text-muted md:flex md:items-center md:justify-between md:gap-6 md:text-left">
      {children}
    </div>
  );
}
