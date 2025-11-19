"use client";

import { forwardRef } from "react";
import type {
  ComponentType,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type IconComponent = ComponentType<{ className?: string }>;

interface SharedProps {
  icon: IconComponent;
  isActive?: boolean;
  containerClassName?: string;
}

type IconInputProps = SharedProps & InputHTMLAttributes<HTMLInputElement>;
type IconTextareaProps = SharedProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export const IconInput = forwardRef<HTMLInputElement, IconInputProps>(
  function IconInput(
    {
      icon: Icon,
      isActive = false,
      containerClassName = "",
      className = "",
      ...props
    },
    ref
  ) {
    return (
      <div className={`relative ${containerClassName}`.trim()}>
        <Icon
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
            isActive ? "text-ocean-600" : "text-gray-400"
          }`}
        />
        <input
          ref={ref}
          className={`w-full rounded-xl border border-ocean-200 bg-white/80 py-4 pl-12 pr-4 outline-none backdrop-blur-sm transition-all duration-300 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500 ${className}`.trim()}
          {...props}
        />
      </div>
    );
  }
);

export const IconTextarea = forwardRef<HTMLTextAreaElement, IconTextareaProps>(
  function IconTextarea(
    {
      icon: Icon,
      isActive = false,
      containerClassName = "",
      className = "",
      rows = 6,
      ...props
    },
    ref
  ) {
    return (
      <div className={`relative ${containerClassName}`.trim()}>
        <Icon
          className={`absolute left-4 top-6 transition-colors duration-300 ${
            isActive ? "text-ocean-600" : "text-gray-400"
          }`}
        />
        <textarea
          ref={ref}
          rows={rows}
          className={`resize-vertical w-full rounded-xl border border-ocean-200 bg-white/80 py-4 pl-12 pr-4 outline-none backdrop-blur-sm transition-all duration-300 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500 ${className}`.trim()}
          {...props}
        />
      </div>
    );
  }
);
