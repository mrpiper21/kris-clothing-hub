import Image from "next/image";
import { isPlaceholder } from "@/lib/site";
import { cn } from "@/lib/cn";

type MediaProps = {
  /** Path, URL, or a "[PLACEHOLDER]" label. */
  src: string;
  alt: string;
  /** Responsive `sizes` hint for next/image. */
  sizes: string;
  /** CSS object-position, e.g. "center 30%". */
  position?: string;
  /** "cover" crops to fill (default); "contain" shows the whole image. */
  fit?: "cover" | "contain";
  preload?: boolean;
  className?: string;
  /** Hide from assistive tech (e.g. a hover-swap duplicate). */
  decorative?: boolean;
};

/**
 * Fills its positioned parent. Shows the photograph, or — until one is
 * supplied — a quiet blush field captioned with the placeholder name.
 */
export function Media({ src, alt, sizes, position, fit = "cover", preload, className, decorative }: MediaProps) {
  return (
    <div aria-hidden={decorative || undefined} className={cn("absolute inset-0 overflow-hidden bg-blush-soft", className)}>
      {isPlaceholder(src) ? (
        <div role="img" aria-label={alt} className="absolute inset-0 select-none bg-blush text-burgundy/50">
          <span aria-hidden className="absolute left-4 right-4 top-4 truncate text-[0.6875rem] tracking-[0.08em]">
            {src}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={decorative ? "" : alt}
          fill
          sizes={sizes}
          preload={preload}
          className={fit === "contain" ? "object-contain" : "object-cover"}
          style={position ? { objectPosition: position } : undefined}
        />
      )}
    </div>
  );
}
