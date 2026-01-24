"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Stack } from "@/components/ui/layout";
import { GlobeIcon, TimesIcon, BarsIcon } from "@/components/ui/icons";

// --- Header Shell ---

interface HeaderProps {
  children: ReactNode;
  className?: string;
  isScrolled?: boolean;
}

export function Header({
  children,
  className = "",
  isScrolled = false,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "border-primary-200/20 fixed left-0 right-0 top-0 z-50 animate-slide-up border-b bg-white shadow-sm transition-all duration-300",
        isScrolled ? "py-3" : "py-4",
        className
      )}
    >
      {children}
    </header>
  );
}

// --- Logo ---

export function Logo({ href, alt }: { href: string; alt: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        href={href}
        aria-label={alt}
        className="flex items-center space-x-4"
      >
        <div className="h-12 w-auto">
          <Image
            src="/images/WPC_Logo_Horizontal_FullColour.png"
            alt={alt}
            width={240}
            height={96}
            className="h-full w-auto object-contain"
            priority
          />
        </div>
      </Link>
    </motion.div>
  );
}

// --- Nav Links ---

interface NavLinkProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  active?: boolean;
}

export function NavLink({ href, onClick, children }: NavLinkProps) {
  const commonProps = {
    className:
      "group relative font-medium text-text transition-colors duration-300 hover:text-primary-600 cursor-pointer bg-transparent border-none p-0",
  };

  const content = (
    <>
      {children}
      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-primary transition-all duration-300 group-hover:w-full" />
    </>
  );

  if (href) {
    return (
      <Link href={href} {...commonProps}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} {...commonProps}>
      {content}
    </button>
  );
}

export function MobileNavLink({ href, onClick, children }: NavLinkProps) {
  const className =
    "block w-full rounded-lg px-4 py-3 text-left font-medium text-text transition-all duration-300 hover:bg-primary-50 hover:text-primary-700 bg-transparent border-none";

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

// --- Action Buttons & Switchers ---

export function ActionButton({
  href,
  onClick,
  icon: Icon,
  ariaLabel,
  className,
  size = 20,
  ...motionProps
}: {
  href?: string;
  onClick?: () => void;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  ariaLabel: string;
  className?: string;
  size?: number;
  [key: string]: unknown;
}) {
  const commonClasses = cn(
    "flex items-center justify-center rounded-lg text-primary-700 transition-all duration-300 hover:bg-primary-50 hover:text-primary-800 bg-transparent border-none cursor-pointer",
    className
  );

  const content = <Icon size={size} />;

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
        aria-label={ariaLabel}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      type="button"
      className={commonClasses}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}

export function LanguageSwitcher({
  href,
  locale,
  onClick,
  className,
}: {
  href: string;
  locale: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link href={href} onClick={onClick} className={cn("group", className)}>
      <Stack
        direction="row"
        align="center"
        gap={2}
        className="rounded-lg p-2 text-primary-700 transition-colors duration-300 hover:bg-primary-50 hover:text-primary-800"
      >
        <GlobeIcon size={16} />
        <span className="text-sm font-medium">{locale.toUpperCase()}</span>
      </Stack>
    </Link>
  );
}

export function MobileMenuToggle({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="rounded-lg border-none bg-transparent p-2 text-text transition-colors duration-300 hover:bg-primary-50 lg:hidden"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-haspopup="true"
    >
      {isOpen ? <TimesIcon size={24} /> : <BarsIcon size={24} />}
    </motion.button>
  );
}

// --- Mobile Menu Overlay & Content ---

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function MobileMenu({ isOpen, onClose, children }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 lg:hidden"
          id="mobile-menu"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Menu Content Wrapper */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-80 overflow-y-auto bg-white px-8 pb-4 pt-6 shadow-2xl"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function MobileMenuSection({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-8", className)}>
      {title && (
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

export function MobileMenuProfile({ children }: { children: ReactNode }) {
  return <div className="mb-8 text-center">{children}</div>;
}
