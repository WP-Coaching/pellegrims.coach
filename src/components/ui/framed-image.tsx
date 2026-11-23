import Image, { type ImageProps } from "next/image";

export function FramedImage({
  alt,
  ...props
}: Pick<ImageProps, "src" | "alt" | "width" | "height" | "sizes">) {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/5 p-3">
      <Image {...props} alt={alt} className="h-auto w-full rounded-2xl" />
    </div>
  );
}
