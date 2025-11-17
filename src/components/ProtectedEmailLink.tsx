"use client";

import { useEffect, useState } from "react";

type Props = {
  user: string;
  domain: string;
  className?: string;
  obfuscated?: string;
  label?: string;
};

export function ProtectedEmailLink({
  user,
  domain,
  className,
  obfuscated,
  label,
}: Props) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const fallback =
    obfuscated ?? `${user} [at] ${domain.replace(/\./g, " [dot] ")}`;

  if (!revealed) {
    return <span className={className}>{fallback}</span>;
  }

  const email = `${user}@${domain}`;

  return (
    <a href={`mailto:${email}`} className={className}>
      {label ?? email}
    </a>
  );
}
