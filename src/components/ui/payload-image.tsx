import Image, { type ImageLoaderProps, type ImageProps } from "next/image";
import type { Media } from "@/payload-types";
import {
  getPayloadImageAlt,
  getPayloadImageFallbackUrl,
  getPayloadImageObjectPosition,
  getPayloadImageVariants,
  shouldContainPayloadImage,
} from "@/lib/payload-image";
import { cn } from "@/lib/utils";

type PayloadImageProps = Omit<ImageProps, "src" | "alt" | "loader"> & {
  media: Media;
  fallbackAlt: string;
  containWideImages?: boolean;
  containAspectRatioThreshold?: number;
};

export function PayloadImage({
  media,
  fallbackAlt,
  containWideImages = false,
  containAspectRatioThreshold = 2,
  className,
  style,
  ...props
}: PayloadImageProps) {
  const variants = getPayloadImageVariants(media);
  const fallbackSrc = getPayloadImageFallbackUrl(media);
  const shouldContain =
    containWideImages &&
    shouldContainPayloadImage(media, containAspectRatioThreshold);
  const objectPosition = getPayloadImageObjectPosition(media);

  const loader = ({ width }: ImageLoaderProps): string => {
    const closestMatch = variants.find((variant) => width <= variant.maxWidth);

    return closestMatch
      ? closestMatch.url
      : (variants[variants.length - 1]?.url ?? fallbackSrc);
  };

  return (
    <Image
      src={fallbackSrc}
      loader={loader}
      alt={getPayloadImageAlt(media, fallbackAlt)}
      className={cn(
        shouldContain ? "bg-white object-contain p-4" : "object-cover",
        className
      )}
      style={
        objectPosition
          ? {
              ...style,
              objectPosition,
            }
          : style
      }
      {...props}
    />
  );
}
