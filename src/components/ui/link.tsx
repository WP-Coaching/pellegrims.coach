"use client";

import NextLink from "next/link";
import { type AnchorHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "default" | "nav" | "footer" | "button" | "unstyled";
  external?: boolean;
}

const variants = {
  default:
    "font-medium text-primary-600 transition-colors hover:text-primary-700 hover:underline",
  nav: "group relative font-medium text-text transition-colors duration-300 hover:text-primary-600",
  footer: "text-sm text-gray-600 transition-colors hover:text-text",
  button: "", // Handled by Button component usually, but here for completeness if wrapped
  unstyled: "",
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = "default", external, href, ...props }, ref) => {
    const isExternal = external || href.startsWith("http");
    const externalProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <NextLink
        ref={ref}
        href={href}
        className={cn(variants[variant], className)}
        {...externalProps}
        {...props}
      />
    );
  }
);

Link.displayName = "Link";
