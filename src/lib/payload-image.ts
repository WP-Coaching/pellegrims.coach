import type { Media } from "@/payload-types";

export function getPayloadImageVariants(
  image: Media
): Array<{ maxWidth: number; url: string }> {
  const resizedVariants = Object.values(image.sizes ?? {})
    .flatMap((size) => {
      if (!size || typeof size.url !== "string" || size.url.length === 0) {
        return [];
      }

      const maxWidth =
        typeof size.width === "number" && size.width > 0
          ? size.width
          : Number.MAX_SAFE_INTEGER - 1;

      return [{ maxWidth, url: size.url }];
    })
    .sort((a, b) => a.maxWidth - b.maxWidth);

  if (typeof image.url === "string" && image.url.length > 0) {
    return [
      ...resizedVariants,
      { maxWidth: Number.MAX_SAFE_INTEGER, url: image.url },
    ];
  }

  return resizedVariants;
}

export function getPayloadImageFallbackUrl(image: Media): string {
  const variants = getPayloadImageVariants(image);
  return variants[variants.length - 1]?.url ?? "";
}

export function hasPayloadImage(image: Media | null): image is Media {
  if (!image) {
    return false;
  }

  return getPayloadImageVariants(image).length > 0;
}

export function getPayloadImageAlt(image: Media, fallbackAlt: string): string {
  return typeof image.alt === "string" && image.alt.trim().length > 0
    ? image.alt
    : fallbackAlt;
}

export function shouldContainPayloadImage(
  image: Media,
  aspectRatioThreshold = 2
): boolean {
  if (
    typeof image.width !== "number" ||
    typeof image.height !== "number" ||
    image.height <= 0
  ) {
    return false;
  }

  return image.width / image.height >= aspectRatioThreshold;
}

function clampPercentage(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function getPayloadImageObjectPosition(
  image: Media
): string | undefined {
  if (
    typeof image.focalX !== "number" ||
    typeof image.focalY !== "number" ||
    Number.isNaN(image.focalX) ||
    Number.isNaN(image.focalY)
  ) {
    return undefined;
  }

  return `${clampPercentage(image.focalX)}% ${clampPercentage(image.focalY)}%`;
}
