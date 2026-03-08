"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { forwardRef, type ReactNode, type ElementType } from "react";
import type { Media } from "@/payload-types";
import { cn } from "@/lib/utils";
import { Stack } from "./layout";
import { Badge } from "./badge";
import { Heading, Text } from "./typography";
import { IconWrapper } from "./icon-wrapper";
import { PayloadImage } from "./payload-image";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/ui/icons";

// --- Base Card Primitives ---

type CardVariant =
  | "default"
  | "stat"
  | "service"
  | "project"
  | "glass"
  | "soft";
type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
  fullHeight?: boolean;
}

const baseClasses = "rounded-xl overflow-hidden animate-slide-up";

const variantClasses: Record<CardVariant, string> = {
  default: "bg-surface shadow-lg border border-primary-100",
  stat: "bg-surface shadow-lg border border-primary-100 text-center",
  service: "bg-surface shadow-md border border-primary-100 h-full relative",
  project: "bg-surface shadow-lg border border-primary-100 h-full",
  glass:
    "backdrop-blur-2xl bg-white/80 border border-primary-200/30 shadow-glass",
  soft: "border border-primary-200 bg-primary-50/40",
};

const paddingClasses: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const interactiveClasses =
  "hover:shadow-lg hover:border-primary-200 transform hover:-translate-y-2 transition-all duration-300 ease-out hover:scale-105";
const interactiveGlassClasses =
  "hover:shadow-primary transform hover:-translate-y-2 transition-all duration-300 ease-out";

/**
 * A versatile Card component supporting multiple visual variants.
 */
export function Card({
  children,
  className = "",
  variant = "default",
  padding = "md",
  interactive = false,
  fullHeight = false,
}: CardProps) {
  const isGlass = variant === "glass";
  const hoverClasses = interactive
    ? isGlass
      ? interactiveGlassClasses
      : interactiveClasses
    : "";

  const effectivePadding =
    variant === "stat" ? "md" : variant === "service" ? "lg" : padding;

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[effectivePadding],
        hoverClasses,
        fullHeight && "h-full",
        className
      )}
    >
      {children}
    </div>
  );
}

// --- Specialized Card Patterns (Molecules) ---

/**
 * Stat Card - Used for displaying key metrics.
 */
export function StatCard({
  value,
  label,
  className = "",
}: {
  value: string | number;
  label: string;
  className?: string;
}) {
  return (
    <Card variant="stat" className={className}>
      <div className="mb-2 text-3xl font-bold text-primary-600">{value}</div>
      <div className="text-sm font-medium text-gray-600">{label}</div>
    </Card>
  );
}

/**
 * Service Card - Used in the coaching/services section.
 */
export interface ServiceStyle {
  from: string;
  to: string;
  full: string;
}

interface ServiceCardProps {
  title: string;
  description: string;
  highlight: string;
  icon: ElementType;
  style: ServiceStyle;
  href?: string;
  className?: string;
  delay?: number;
  isVisible?: boolean;
}

export const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  (
    {
      title,
      description,
      highlight,
      icon: Icon,
      style,
      href = "#contact",
      className,
      delay = 0,
      isVisible = true,
    },
    ref
  ) => {
    const CardContent = (
      <Card
        variant="service"
        className={cn(
          href && "group",
          "relative h-full overflow-hidden",
          className
        )}
        padding="none"
        interactive={!!href}
      >
        <div
          className={cn(
            "absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 transform rounded-full bg-gradient-to-br opacity-10 transition-transform duration-500 group-hover:scale-150",
            style.full
          )}
        />
        <Stack gap={6} className="h-full p-8">
          <div className="flex items-start justify-between">
            <IconWrapper
              size="lg"
              className={cn(
                "rounded-2xl text-white shadow-primary group-hover:shadow-primary",
                style.full
              )}
            >
              <Icon />
            </IconWrapper>
            <Badge variant="solid" className={style.full}>
              {highlight}
            </Badge>
          </div>
          <Stack gap={3}>
            <Heading
              level="h3"
              variant="card"
              className="transition-colors duration-300 group-hover:text-primary-700"
            >
              {title}
            </Heading>
            <Text color="muted">{description}</Text>
          </Stack>
        </Stack>
        <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-primary-200" />
      </Card>
    );

    const WrapperProps = {
      ref,
      initial: { opacity: 0, y: 50 },
      animate: isVisible ? { opacity: 1, y: 0 } : {},
      transition: { duration: 0.6, delay },
      className: "group relative h-full",
    };

    if (href) {
      return (
        <motion.div {...WrapperProps}>
          <a
            href={href}
            className="block h-full focus:outline-none"
            onClick={(e) => {
              if (href.startsWith("#")) {
                e.preventDefault();
                document
                  .getElementById(href.replace("#", ""))
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {CardContent}
          </a>
        </motion.div>
      );
    }

    return <motion.div {...WrapperProps}>{CardContent}</motion.div>;
  }
);
ServiceCard.displayName = "ServiceCard";

/**
 * Project Card - Used in the projects/portfolio section.
 */
export interface Project {
  image: Media;
  title: string;
  description: string;
  link: string | null;
  category: string;
}

export function ProjectCard({
  project,
  viewProjectText,
  viewText,
  renderDescription,
}: {
  project: Project;
  viewProjectText: string;
  viewText: string;
  renderDescription: (project: Project) => ReactNode;
}) {
  return (
    <Card variant="project" padding="none">
      <div className="relative h-48 overflow-hidden">
        <div className="h-full w-full">
          <PayloadImage
            media={project.image}
            fallbackAlt={`${project.title} - ${project.category}`}
            fill
            containWideImages
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute left-4 top-4">
          <Badge variant="solid" color="primary">
            {project.category}
          </Badge>
        </div>
        {project.link && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-900/80"
          >
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 font-semibold text-white transition-colors hover:text-primary-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{viewProjectText}</span>
              <ExternalLinkIcon />
            </motion.a>
          </motion.div>
        )}
      </div>
      <Stack gap={3} className="p-6">
        <Heading
          level="h3"
          variant="card"
          className={cn(
            project.link &&
              "transition-colors duration-300 hover:text-primary-600"
          )}
        >
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary-600"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </Heading>
        <Text variant="small" className="leading-relaxed text-gray-600">
          {renderDescription(project)}
        </Text>
        {project.link && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span>{viewText}</span>
            <ArrowRightIcon className="ml-1 text-xs transition-transform group-hover/link:translate-x-1" />
          </motion.a>
        )}
      </Stack>
    </Card>
  );
}

/**
 * Group Card - Used for displaying different coaching groups.
 */
export function GroupCard({
  title,
  subtitle,
  description,
  levelLabel,
  level,
  levelBadgeClassName,
  levelLabelClassName,
  cardClassName,
  link,
  color,
  external,
  viewDetailsText,
  ariaLabel,
}: {
  title: string;
  subtitle: string;
  description: string;
  levelLabel: string;
  level: string;
  levelBadgeClassName?: string;
  levelLabelClassName?: string;
  cardClassName?: string;
  link: string;
  color: string;
  external?: boolean;
  viewDetailsText: string;
  ariaLabel: string;
}) {
  return (
    <Link
      href={link}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative block h-full focus:outline-none"
      aria-label={ariaLabel}
    >
      <Card
        variant="default"
        className={cn(
          "h-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-athletic",
          cardClassName
        )}
        padding="none"
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-5",
            color
          )}
        />
        <Stack gap={3} className="relative h-full p-6">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <div
                className={cn(
                  "inline-block rounded-full bg-gradient-to-r px-4 py-1 text-xs font-bold text-white shadow-md",
                  color
                )}
              >
                {subtitle}
              </div>
              <div
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold shadow-sm",
                  levelBadgeClassName
                )}
              >
                <span className={cn("mr-1", levelLabelClassName)}>
                  {levelLabel}
                </span>
                <span>{level}</span>
              </div>
            </div>
            <Heading
              level="h3"
              variant="card"
              className="mb-4 transition-colors duration-300 group-hover:text-primary-600"
            >
              {title}
            </Heading>
            <Text className="text-text/70 mb-4">{description}</Text>
          </div>
          <div className="mt-1 flex items-center font-medium text-primary-600 transition-colors duration-300 group-hover:text-primary-700">
            {viewDetailsText}
            <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Stack>
      </Card>
    </Link>
  );
}
