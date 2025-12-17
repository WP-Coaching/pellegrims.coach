import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "subtle"
    | "custom";
  animate?: boolean;
}

export function Badge({
  variant = "default",
  animate = false,
  className = "",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-full px-4 py-1 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variants = {
    default: "bg-ocean-600 text-white shadow-md hover:bg-ocean-700",
    secondary:
      "bg-gradient-to-r from-ocean-500 to-ocean-700 text-white shadow-md",
    destructive: "bg-red-500 text-white shadow-md",
    outline: "text-ocean-700 border border-ocean-200",
    subtle: "bg-ocean-100 text-ocean-700 hover:bg-ocean-200",
    custom: "text-white shadow-md", // Base text/shadow, background handled by className
  };

  const animationClass = animate ? "animate-pulse" : "";

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${animationClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
