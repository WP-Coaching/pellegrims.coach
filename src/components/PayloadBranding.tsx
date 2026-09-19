"use client";

import Image from "next/image";
import React from "react";

export const PayloadLogo: React.FC = () => (
  <div>
    <Image
      src="/images/WPC_Logo_Horizontal_FullColour.png"
      alt="Pellegrims Coach Logo"
      width={240}
      height={96}
      className="h-auto max-w-xs"
    />
  </div>
);

export const PayloadIcon: React.FC = () => (
  <Image
    src="/apple-touch-icon.png"
    alt="Pellegrims Coach Icon"
    width={32}
    height={32}
    className="h-auto max-w-8 object-contain"
  />
);
