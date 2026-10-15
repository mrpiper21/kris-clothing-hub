"use client";

import { products } from "@/data/products";
import { useShop } from "@/lib/store";
import { ProductGrid } from "@/components/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";

/** Saved pieces, newest saves first. */
export function WishlistView() {
  const { wishlist } = useShop();
  const saved = [...wishlist].reverse().flatMap((id) => products.filter((p) => p.id === id));

  if (saved.length === 0) {
    return (
      <div className="bg-blush-soft px-6 py-24 text-center">
        <p className="display text-[clamp(2.5rem,6vw,4rem)]">
          Nothing <span className="accent-word">saved</span> yet
        </p>
        <p className="mx-auto mt-4 max-w-sm text-ink/65">Tap the heart on any piece to keep it here for later.</p>
        <ButtonLink href="/shop" arrow className="mt-8">Start browsing</ButtonLink>
      </div>
    );
  }

  return (
    <>
      <p aria-live="polite" className="mb-8 text-sm text-ink/60">
        {saved.length} saved {saved.length === 1 ? "piece" : "pieces"}
      </p>
      <ProductGrid products={saved} />
    </>
  );
}
