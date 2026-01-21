import { ReactNode } from "react";

interface AthleticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  className?: string;
  variant?: "primary" | "outline" | "inverted";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

export function AthleticButton({
  children,
  onClick,
  href,
  target,
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  ariaLabel,
}: AthleticButtonProps) {
  const baseClasses =
    "relative overflow-hidden font-semibold rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-ocean-400 focus:ring-offset-2 inline-flex items-center justify-center transform hover:-translate-y-1";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: "text-white bg-gradient-ocean hover:shadow-athletic border-0",
    outline:
      "text-ocean-700 bg-transparent border-2 border-ocean-300 hover:bg-ocean-50 hover:border-ocean-500 hover:shadow-ocean",
    inverted:
      "text-white bg-transparent border-2 border-white hover:bg-white hover:text-athletic-dark",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const Component = href ? "a" : "button";
  const componentProps = href
    ? {
        href,
        target,
        rel: target === "_blank" ? "noopener noreferrer" : undefined,
      }
    : { type: type as "button" | "submit" | "reset", disabled };

  return (
    <Component
      {...componentProps}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className} animate-fade-in active:scale-95`}
      onClick={disabled ? undefined : onClick}
      aria-label={ariaLabel}
    >
      <span
        className={`relative z-10 flex items-center justify-center space-x-2 ${disabled ? "scale-95" : ""}`}
      >
        {children}
      </span>
    </Component>
  );
}
