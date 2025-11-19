"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

interface AthleticLinkButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  fullWidth?: boolean;
}

export function AthleticLinkButton({
  children,
  className = "",
  fullWidth = true,
  ...props
}: AthleticLinkButtonProps) {
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <a
      {...props}
      className={`inline-flex items-center justify-center rounded-lg bg-gradient-ocean px-6 py-3 text-base font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-athletic focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2 active:scale-95 ${widthClass} ${className}`.trim()}
    >
      {children}
    </a>
  );
}
