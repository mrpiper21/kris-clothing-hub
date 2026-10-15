"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";

type ProductGridProps = {
  products: Product[];
  /** Disable entrance animation (e.g. for the static fallback). */
  animate?: boolean;
  /** Columns on large screens. */
  columns?: 3 | 4;
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * An even catalogue grid: two up on phones, three or four on desktop.
 * When filters change, pieces that stay glide to their new place, new ones
 * rise in and removed ones fold away, so you can follow what changed.
 */
export function ProductGrid({ products, animate = true, columns = 4 }: ProductGridProps) {
  return (
    <motion.ul
      layout
      className={
        columns === 4
          ? "grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 md:gap-x-5 md:gap-y-14 lg:grid-cols-4"
          : "grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 md:gap-x-5 md:gap-y-14"
      }
    >
      <AnimatePresence mode="popLayout" initial={animate}>
        {products.map((product, i) => (
          <motion.li
            key={product.id}
            layout
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
            transition={{ duration: 0.7, delay: Math.min(i, 8) * 0.05, ease, layout: { duration: 0.6, ease } }}
          >
            <ProductCard product={product} headingLevel="h2" preload={i < 4} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
