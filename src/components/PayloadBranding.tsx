"use client";

import React from "react";

export const PayloadLogo: React.FC = () => (
  <div className="custom-logo">
    <img
      src="/images/WPC_Logo_Horizontal_FullColour.png"
      alt="Pellegrims Coach Logo"
      style={{ maxWidth: "200px", height: "auto" }}
    />
  </div>
);

export const PayloadIcon: React.FC = () => (
  <img
    src="/apple-touch-icon.png"
    alt="Pellegrims Coach Icon"
    style={{ maxWidth: "2rem", height: "auto", objectFit: "contain" }}
  />
);
