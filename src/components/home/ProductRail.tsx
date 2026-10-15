"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { MaskText } from "@/components/motion/MaskText";
import { cn } from "@/lib/cn";

type Tab = { id: string; label: string; href: string; filter: (p: Product) => boolean };

const tabs: Tab[] = [
  { id: "new", label: "New in", href: "/shop?sort=new", filter: (p) => !!p.isNew },
  { id: "best", label: "Bestsellers", href: "/shop", filter: (p) => !!p.bestseller },
  { id: "tailored", label: "Made to measure", href: "/shop", filter: (p) => !!p.tailoring },
];

/** A tabbed, horizontally scrolling product rail with arrow controls. */
export function ProductRail({ products }: { products: Product[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const trackRef = useRef<HTMLUListElement>(null);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];
  const list = products.filter(tab.filter);

  function scroll(dir: 1 | -1) {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section aria-labelledby="rail-title" className="bg-blush-soft py-16 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-8 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <div>
            <h2 id="rail-title" className="display text-[clamp(2.75rem,7vw,5.5rem)]">
              <MaskText>The <span className="accent-word">edit</span></MaskText>
            </h2>
            <div role="tablist" aria-label="Product selection" className="mt-6 flex gap-6">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  type="button"
                  aria-selected={t.id === active}
                  onClick={() => {
                    setActive(t.id);
                    trackRef.current?.scrollTo({ left: 0 });
                  }}
                  className={cn(
                    "relative min-h-11 text-[0.8125rem] uppercase tracking-[0.12em] transition-colors",
                    t.id === active ? "text-burgundy" : "text-ink/45 hover:text-ink",
                  )}
                >
                  {t.label}
                  {t.id === active && (
                    <motion.span layoutId="rail-tab" className="absolute inset-x-0 bottom-0 h-0.5 bg-burgundy" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label="Scroll back" className="hidden h-12 w-12 items-center justify-center border border-burgundy text-burgundy transition-colors hover:bg-burgundy hover:text-canvas md:flex">
              ←
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Scroll forward" className="hidden h-12 w-12 items-center justify-center border border-burgundy text-burgundy transition-colors hover:bg-burgundy hover:text-canvas md:flex">
              →
            </button>
            <ButtonLink href={tab.href} variant="text" arrow className="md:ml-6">
              View all
            </ButtonLink>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={active}
            ref={trackRef}
            role="tabpanel"
            aria-label={tab.label}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 md:mx-0 md:scroll-px-0 md:gap-5 md:px-0"
          >
            {list.map((p, i) => (
              <motion.li
                key={p.id}
                className="w-[62vw] shrink-0 snap-start sm:w-[38vw] md:w-[calc((100%-3*1.25rem)/4)]"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: Math.min(i, 5) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={p} sizes="(min-width: 768px) 25vw, 62vw" />
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}
