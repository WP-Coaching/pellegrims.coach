"use client";

import { motion } from "framer-motion";
import {
  forwardRef,
  type ReactNode,
  type ComponentType,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";
import { Heading, Text } from "./typography";
import { Stack } from "./layout";
import { Button } from "./button";
import { IconWrapper } from "./icon-wrapper";
import { CheckCircleIcon, PaperPlaneIcon } from "@/components/ui/icons";

// --- Form Layout Components ---

export function FormSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Stack gap={4} className={className}>
      {children}
    </Stack>
  );
}

export function FormHeader({
  title,
  intro,
  className,
  level = "h3",
  variant = "card",
  align = "responsive-center",
}: {
  title: ReactNode;
  intro: ReactNode;
  className?: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span" | "p";
  variant?: "display" | "section" | "card" | "subheading";
  align?: "left" | "center" | "responsive-center";
}) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    "responsive-center": "text-center sm:text-left",
  };

  return (
    <Stack gap={1} className={cn(alignClasses[align], className)}>
      <Heading
        level={level}
        variant={variant}
        className="font-semibold text-text"
      >
        {title}
      </Heading>
      <Text variant="small" color="muted">
        {intro}
      </Text>
    </Stack>
  );
}

// --- Form Input Components ---

type IconComponent = ComponentType<{ className?: string }>;

interface SharedInputProps {
  icon: IconComponent;
  isActive?: boolean;
  containerClassName?: string;
}

type IconInputProps = SharedInputProps & InputHTMLAttributes<HTMLInputElement>;
type IconTextareaProps = SharedInputProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export const IconInput = forwardRef<HTMLInputElement, IconInputProps>(
  (
    {
      icon: Icon,
      isActive = false,
      containerClassName = "",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative", containerClassName)}>
        <Icon
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300",
            isActive ? "text-primary-600" : "text-gray-400"
          )}
        />
        <input
          ref={ref}
          className={cn(
            "w-full rounded-xl border border-primary-200 bg-white/80 py-4 pl-12 pr-4 outline-none backdrop-blur-sm transition-all duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
IconInput.displayName = "IconInput";

export const IconTextarea = forwardRef<HTMLTextAreaElement, IconTextareaProps>(
  (
    {
      icon: Icon,
      isActive = false,
      containerClassName = "",
      className = "",
      rows = 6,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative", containerClassName)}>
        <Icon
          className={cn(
            "absolute left-4 top-6 transition-colors duration-300",
            isActive ? "text-primary-600" : "text-gray-400"
          )}
        />
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            "resize-vertical w-full rounded-xl border border-primary-200 bg-white/80 py-4 pl-12 pr-4 outline-none backdrop-blur-sm transition-all duration-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
IconTextarea.displayName = "IconTextarea";

// --- Specialized Form Feedback Patterns ---

/**
 * Success View for contact/enrollment forms
 */
export function FormSuccessView({
  title,
  successTitle,
  successMsg,
  onReset,
  resetText,
}: {
  title: string;
  successTitle: string;
  successMsg: string;
  onReset: () => void;
  resetText: string;
}) {
  return (
    <Stack
      gap={8}
      align="center"
      className="mx-auto max-w-2xl px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Heading level="h2" variant="display" align="center" className="mb-8">
          {title}
        </Heading>
        <div className="border-primary-200/30 rounded-xl border bg-white/80 p-8 shadow-glass backdrop-blur-2xl">
          <Stack gap={6} align="center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <IconWrapper size="xl" variant="solid">
                <CheckCircleIcon className="text-3xl" />
              </IconWrapper>
            </motion.div>
            <Heading
              level="h4"
              variant="card"
              className="font-bold text-primary-600"
            >
              {successTitle}
            </Heading>
            <Text variant="large" color="muted">
              {successMsg}
            </Text>
            <Button onClick={onReset} size="lg">
              {resetText}
            </Button>
          </Stack>
        </div>
      </motion.div>
    </Stack>
  );
}

/**
 * Animated Submit Button
 */
export function SubmitButton({
  isSending,
  sendingText,
  sendText,
}: {
  isSending: boolean;
  sendingText: string;
  sendText: string;
}) {
  return (
    <Button
      type="submit"
      disabled={isSending}
      fullWidth
      size="lg"
      className="relative overflow-hidden"
    >
      {isSending ? (
        <Stack direction="row" align="center" gap={2}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
          />
          <span>{sendingText}</span>
        </Stack>
      ) : (
        <Stack direction="row" align="center" gap={2}>
          <PaperPlaneIcon />
          <span>{sendText}</span>
        </Stack>
      )}
    </Button>
  );
}
