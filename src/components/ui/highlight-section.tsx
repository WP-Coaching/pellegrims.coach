"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
};

export function HighlightSection({ children, id, className = "" }: Props) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-gradient-ocean py-16 text-white ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
        {children}
      </div>
    </section>
  );
}
