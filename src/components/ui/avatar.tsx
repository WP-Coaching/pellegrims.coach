import { cn } from "@/lib/utils";
import Image from "next/image";
import { type HTMLAttributes } from "react";

type AvatarSize = "sm" | "md" | "lg" | "xl" | "2xl";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  size?: AvatarSize;
  priority?: boolean;
  className?: string; // Escape hatch
}

const sizes: Record<AvatarSize, string> = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-20 w-20",
  "2xl": "h-32 w-32",
};

export function Avatar({
  src,
  alt,
  size = "md",
  priority = false,
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full border-2 border-white bg-gray-100 shadow-lg",
        sizes[size],
        className
      )}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        priority={priority}
      />
    </div>
  );
}
