"use client";

import { AthleticCard } from "./athletic-card";

interface StatCardProps {
  value: string | number;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className = "" }: StatCardProps) {
  return (
    <AthleticCard variant="stat" className={className}>
      <div className="mb-2 text-3xl font-bold text-ocean-600">{value}</div>
      <div className="text-sm font-medium text-gray-600">{label}</div>
    </AthleticCard>
  );
}
