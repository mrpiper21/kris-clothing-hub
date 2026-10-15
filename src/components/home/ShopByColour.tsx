import type { CSSProperties } from "react";
import Link from "next/link";
import { colours, lightColours } from "@/data/colours";
import type { ColourId, Product } from "@/types/product";
import { availableColours } from "@/lib/products";
import { MaskText } from "@/components/motion/MaskText";
import { cn } from "@/lib/cn";

/** Square colour tiles linking to the shop, filtered by that colour. */
export function ShopByColour({ products }: { products: Product[] }) {
  const ids = availableColours(products);
  const count = (c: ColourId) => products.filter((p) => p.colours.includes(c)).length;

  return (
    <section aria-labelledby="colour-title" className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
      <header className="mb-8 md:mb-12">
        <h2 id="colour-title" className="display text-[clamp(2.5rem,6vw,4.5rem)]">
          <MaskText>Shop by <span className="accent-word">colour</span></MaskText>
        </h2>
      </header>
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:gap-3 lg:grid-cols-8">
        {ids.map((c, i) => {
          const light = lightColours.includes(c);
          return (
            <li key={c} className="colour-tile" style={{ "--i": i } as CSSProperties}>
              <Link
                href={`/shop?colour=${c}`}
                className={cn(
                  "group relative flex aspect-square flex-col justify-end overflow-hidden p-3 transition-transform duration-500 ease-editorial hover:-translate-y-1.5",
                  light ? "text-ink outline outline-1 -outline-offset-1 outline-ink/15" : "text-canvas",
                )}
                style={{ background: colours[c].hex }}
              >
                <span aria-hidden className="absolute right-3 top-3 translate-x-2 opacity-0 transition-all duration-500 ease-editorial group-hover:translate-x-0 group-hover:opacity-100">→</span>
                <span className="text-[0.8125rem] font-medium">{colours[c].label}</span>
                <span className={cn("text-[0.6875rem]", light ? "text-ink/60" : "text-canvas/70")}>
                  {count(c)} {count(c) === 1 ? "style" : "styles"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
