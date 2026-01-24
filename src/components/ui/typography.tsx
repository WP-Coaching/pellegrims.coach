"use client";

import { cn } from "@/lib/utils";
import {
  type ReactNode,
  createElement,
  type HTMLAttributes,
  type ElementType,
} from "react";
import { motion } from "framer-motion";

// --- Base Typography Primitives ---

type HeadingLevel =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "div"
  | "span"
  | "p";
type HeadingVariant = "display" | "section" | "card" | "subheading";
type TextVariant = "default" | "lead" | "small" | "muted" | "large";
type FontWeight = "normal" | "medium" | "semibold" | "bold" | "extrabold";
type TextColor = "default" | "primary" | "muted" | "white" | "inherit";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  level?: HeadingLevel;
  variant?: HeadingVariant;
  align?: "left" | "center" | "right";
  weight?: FontWeight;
  color?: TextColor;
  className?: string;
  [key: string]: unknown;
}

interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  variant?: TextVariant;
  align?: "left" | "center" | "right";
  weight?: FontWeight;
  color?: TextColor;
  className?: string;
  [key: string]: unknown;
}

const headingVariants: Record<HeadingVariant, string> = {
  display:
    "font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-balance",
  section: "font-display text-3xl md:text-4xl tracking-tight text-balance",
  card: "font-display text-xl",
  subheading: "font-display text-lg tracking-wide uppercase",
};

const textVariants: Record<TextVariant, string> = {
  default: "text-base leading-relaxed text-pretty",
  lead: "text-xl leading-relaxed text-pretty",
  large: "text-lg leading-relaxed text-pretty",
  small: "text-sm leading-normal text-pretty",
  muted: "text-sm text-text-muted text-pretty",
};

const colors: Record<TextColor, string> = {
  default: "text-text",
  primary: "text-primary-600",
  muted: "text-text-muted",
  white: "text-white",
  inherit: "text-inherit",
};

const weights: Record<FontWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const aligns = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function Heading({
  children,
  level = "h2",
  variant = "section",
  align = "left",
  weight = "bold",
  color = "default",
  className,
  ...props
}: HeadingProps) {
  return createElement(
    level,
    {
      className: cn(
        headingVariants[variant],
        weights[weight],
        colors[color],
        aligns[align],
        className
      ),
      ...props,
    },
    children
  );
}

export function Text({
  children,
  as = "p",
  variant = "default",
  align = "left",
  weight = "normal",
  color = "default",
  className,
  ...props
}: TextProps) {
  return createElement(
    as,
    {
      className: cn(
        textVariants[variant],
        color !== "default" ? colors[color] : "",
        weights[weight],
        aligns[align],
        className
      ),
      ...props,
    },
    children
  );
}

// --- Composite Typography Patterns ---

interface SectionHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  accentClassName?: string;
  accentWidth?: number | string;
  headingLevel?: HeadingLevel;
}

export function SectionHeader({
  title,
  description,
  align = "center",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  accentClassName = "",
  accentWidth = "120px",
  headingLevel = "h2",
}: SectionHeaderProps) {
  const alignmentClass = align === "center" ? "text-center" : "text-left";
  const accentAlignment = align === "center" ? "mx-auto" : "";
  const resolvedAccentWidth =
    typeof accentWidth === "number" ? `${accentWidth}px` : accentWidth;

  return (
    <motion.div
      className={cn(alignmentClass, className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className={cn(
          "mb-6 h-1 bg-gradient-primary",
          accentAlignment,
          accentClassName
        )}
        initial={{ width: 0 }}
        whileInView={{ width: resolvedAccentWidth }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <Heading
        level={headingLevel}
        className={cn(titleClassName)}
        align={align}
      >
        {title}
      </Heading>
      {description && (
        <Text
          variant="large"
          color="muted"
          align={align}
          as={motion.p}
          className={cn(
            "mt-4 max-w-3xl leading-relaxed",
            align === "center" && "mx-auto",
            descriptionClassName
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          {description}
        </Text>
      )}
    </motion.div>
  );
}
