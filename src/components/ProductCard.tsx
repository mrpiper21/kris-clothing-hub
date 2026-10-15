import Link from "next/link";
import type { Product } from "@/types/product";
import { occasionLabel, productAlt } from "@/lib/products";
import { Media } from "@/components/ui/Media";
import { Swatches } from "@/components/Swatches";
import { WishlistButton } from "@/components/WishlistButton";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  product: Product;
  sizes?: string;
  headingLevel?: "h2" | "h3";
  preload?: boolean;
  className?: string;
};

/** A catalogue entry: the photograph first, then just enough text. */
export function ProductCard({
  product,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
  headingLevel: Heading = "h3",
  preload,
  className,
}: ProductCardProps) {
  const second = product.gallery?.[0];
  const soldOut = product.available === false;
  const badge = soldOut ? "Sold out" : product.isNew ? "New" : product.bestseller ? "Bestseller" : null;

  return (
    <article className={cn("group relative", className)}>
      <div className="relative aspect-[3/4] overflow-hidden bg-blush-soft">
        <Link href={`/shop/${product.id}`} tabIndex={-1} aria-hidden data-cursor="View" className="absolute inset-0">
          <Media
            src={product.image}
            alt=""
            decorative
            sizes={sizes}
            preload={preload}
            position="center 40%"
            className={cn("transition-transform duration-[1.4s] ease-editorial group-hover:scale-[1.06]", soldOut && "opacity-70")}
          />
          {second && (
            <Media
              src={second}
              alt=""
              sizes={sizes}
              decorative
              position="center 40%"
              className="opacity-0 transition-opacity duration-700 group-hover:opacity-100 [@media(hover:none)]:hidden"
            />
          )}
          <span
            aria-hidden
            className="label absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-burgundy px-4 py-3 text-canvas transition-transform duration-500 ease-editorial group-hover:translate-y-0 [@media(hover:none)]:hidden"
          >
            View piece <span>→</span>
          </span>
        </Link>

        {badge && (
          <span
            className={cn(
              "pointer-events-none absolute left-0 top-3 z-10 px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.1em]",
              soldOut ? "bg-ink text-canvas" : "bg-blush text-burgundy",
            )}
          >
            {badge}
          </span>
        )}
        <WishlistButton id={product.id} name={product.name} className="absolute right-2 top-2 z-10" />
      </div>

      <div className="mt-3 space-y-1.5 md:mt-4">
        <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-ink/55">{occasionLabel[product.occasion]}</p>
        <Heading className="text-[0.9375rem] leading-snug md:text-base">
          <Link href={`/shop/${product.id}`} className="link-line [--underline:var(--color-burgundy)]" title={productAlt(product)}>
            {product.name}
          </Link>
        </Heading>
        <Swatches ids={product.colours} className="pt-1" />
      </div>
    </article>
  );
}
