import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";

type ButtonVariant = "primary" | "outline" | "inverted";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  ariaLabel?: string;
}

interface ButtonAsButton
  extends
    BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  as?: "button";
  href?: never;
}

interface ButtonAsAnchor
  extends
    BaseButtonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  as: "a";
  href: string;
  disabled?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const baseClasses =
  "relative overflow-hidden font-semibold rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-primary-400 focus:ring-offset-2 inline-flex items-center justify-center transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "text-white bg-gradient-primary hover:shadow-primary border-0",
  outline:
    "text-primary-700 bg-transparent border-2 border-primary-300 hover:bg-primary-50 hover:border-primary-500 hover:shadow-primary",
  inverted:
    "text-white bg-transparent border-2 border-white hover:bg-white hover:text-text",
};

/**
 * Button component supporting both button and anchor elements.
 * Consolidates AthleticButton and AthleticLinkButton into a single component.
 *
 * @example
 * // As a button
 * <Button onClick={handleClick}>Click me</Button>
 *
 * // As a link
 * <Button as="a" href="/path">Go somewhere</Button>
 */
export function Button(props: ButtonProps) {
  const {
    children,
    className = "",
    variant = "primary",
    size = "md",
    fullWidth = false,
    ariaLabel,
    as,
    ...rest
  } = props;

  const widthClass = fullWidth ? "w-full" : "";
  const combinedClasses =
    `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className} animate-fade-in active:scale-95`.trim();

  if (as === "a") {
    const { href, target, disabled: _, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={combinedClasses}
        aria-label={ariaLabel}
        {...anchorRest}
      >
        <span className="relative z-10 flex items-center justify-center space-x-2">
          {children}
        </span>
      </a>
    );
  }

  const { disabled, type = "button", ...buttonRest } = rest as ButtonAsButton;
  return (
    <button
      type={type}
      disabled={disabled}
      className={combinedClasses}
      aria-label={ariaLabel}
      {...buttonRest}
    >
      <span
        className={`relative z-10 flex items-center justify-center space-x-2 ${disabled ? "scale-95" : ""}`}
      >
        {children}
      </span>
    </button>
  );
}

// Re-export with legacy name for backward compatibility
export { Button as AthleticButton };
