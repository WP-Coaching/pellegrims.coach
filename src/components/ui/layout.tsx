"use client";

import { cn } from "@/lib/utils";
import { type ReactNode, forwardRef, type HTMLAttributes } from "react";

// --- Types ---

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 2 | 4 | 6 | 8 | 12;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  className?: string; // Escape hatch
}

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: "row" | "col";
  gap?: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  className?: string; // Escape hatch
}

// --- Mappings ---

const gridCols: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const smCols: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
  12: "sm:grid-cols-12",
};

const mdCols: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
};

const lgCols: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  12: "lg:grid-cols-12",
};

const gaps: Record<number, string> = {
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  12: "gap-12",
};

// --- Components ---

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "full";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

const containerWidths: Record<string, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

const containerPaddings: Record<string, string> = {
  none: "",
  sm: "px-4",
  md: "px-6",
  lg: "px-6 lg:px-8",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    { children, maxWidth = "7xl", padding = "md", className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full",
          containerWidths[maxWidth],
          containerPaddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = "Container";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  position?: "relative" | "absolute" | "fixed" | "sticky";
  inset?: "0" | "auto";
  zIndex?: "0" | "10" | "20" | "30" | "40" | "50";
  overflow?: "hidden" | "auto" | "visible" | "scroll";
  textAlign?: "left" | "center" | "right" | "justify";
  className?: string;
}

const positions: Record<string, string> = {
  relative: "relative",
  absolute: "absolute",
  fixed: "fixed",
  sticky: "sticky",
};

const insets: Record<string, string> = {
  "0": "inset-0",
  auto: "auto",
};

const zIndices: Record<string, string> = {
  "0": "z-0",
  "10": "z-10",
  "20": "z-20",
  "30": "z-30",
  "40": "z-40",
  "50": "z-50",
};

const overflows: Record<string, string> = {
  hidden: "overflow-hidden",
  auto: "overflow-auto",
  visible: "overflow-visible",
  scroll: "overflow-scroll",
};

const textAligns: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      children,
      position,
      inset,
      zIndex,
      overflow,
      textAlign,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          position && positions[position],
          inset && insets[inset],
          zIndex && zIndices[zIndex],
          overflow && overflows[overflow],
          textAlign && textAligns[textAlign],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Box.displayName = "Box";

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      cols = 1,
      sm,
      md,
      lg,
      gap = 4,
      className,
      align,
      justify,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          gridCols[cols],
          sm && smCols[sm],
          md && mdCols[md],
          lg && lgCols[lg],
          gaps[gap],
          align && `items-${align}`,
          justify && `justify-${justify}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Grid.displayName = "Grid";

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      children,
      direction = "col",
      gap = 2,
      align,
      justify,
      wrap = false,
      fullWidth = false,
      fullHeight = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === "col" ? "flex-col" : "flex-row",
          gaps[gap],
          align && `items-${align}`,
          justify && `justify-${justify}`,
          wrap && "flex-wrap",
          fullWidth && "w-full",
          fullHeight && "h-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Stack.displayName = "Stack";
