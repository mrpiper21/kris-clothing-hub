"use client";

import { AnimatePresence, motion } from "motion/react";
import { shop, useShop } from "@/lib/store";
import { HeartIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type WishlistButtonProps = {
  id: string;
  name: string;
  /** "overlay" sits on a photograph; "outline" sits beside the buy buttons. */
  variant?: "overlay" | "outline";
  className?: string;
};

/** Eight sparks fly out of the heart when a piece is saved. */
const sparks = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return { x: Math.cos(a) * 22, y: Math.sin(a) * 22, r: (a * 180) / Math.PI };
});

export function WishlistButton({ id, name, variant = "overlay", className }: WishlistButtonProps) {
  const { wishlist } = useShop();
  const saved = wishlist.includes(id);

  return (
    <button
      type="button"
      onClick={() => shop.toggleWish(id)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className={cn(
        "relative flex items-center justify-center transition-colors",
        variant === "overlay" && "h-10 w-10 bg-canvas/90 text-burgundy hover:bg-canvas",
        variant === "outline" && "h-[3.25rem] w-[3.25rem] shrink-0 border border-burgundy text-burgundy hover:bg-blush",
        className,
      )}
    >
      <AnimatePresence>
        {saved && (
          <motion.span key="burst" aria-hidden className="pointer-events-none absolute inset-0" exit={{ opacity: 0 }}>
            {sparks.map((s, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-1 w-2 bg-burgundy"
                style={{ rotate: s.r, marginLeft: -4, marginTop: -2 }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: s.x, y: s.y, opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span
        key={String(saved)}
        initial={{ scale: saved ? 0.4 : 1 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.8 }}
        transition={{ type: "spring", stiffness: 500, damping: 14 }}
      >
        <HeartIcon filled={saved} />
      </motion.span>
    </button>
  );
}
