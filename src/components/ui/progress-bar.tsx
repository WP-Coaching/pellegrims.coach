"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  className?: string;
  color?: string;
}

export function ProgressBar({
  progress,
  className = "",
  color = "bg-gradient-ocean",
}: ProgressBarProps) {
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
    >
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}
