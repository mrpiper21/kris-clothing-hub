"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Product } from "@/types/product";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Swatches } from "@/components/Swatches";
import { MaskText } from "@/components/motion/MaskText";
import { cn } from "@/lib/cn";

const ease = [0.76, 0, 0.24, 1] as const;
const DWELL = 4500;

/**
 * The bags, as a showroom: one large photograph and a numbered list. Hovering
 * or focusing a name wipes its photo into the frame; left alone, the list
 * steps through by itself with a progress line under the active name.
 */
export function BagEdit({ bags }: { bags: Product[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const bag = bags[active];

  useEffect(() => {
    if (reduce || paused || bags.length < 2) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % bags.length), DWELL);
    return () => window.clearTimeout(t);
  }, [active, paused, reduce, bags.length]);

  if (!bag) return null;

  return (
    <section aria-labelledby="bags-title" className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-28">
      <header className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
        <div>
          <Reveal>
            <p className="label text-burgundy">New — the bag edit</p>
          </Reveal>
          <h2 id="bags-title" className="display mt-4 text-[clamp(2.75rem,7vw,5.5rem)]">
            <MaskText>
              Carry the <span className="accent-word">look</span>
            </MaskText>
          </h2>
        </div>
        <Reveal delay={0.15} className="flex flex-col gap-5 md:items-end">
          <p className="max-w-sm text-ink/70 md:text-right">Totes, top-handles and minis chosen to finish every outfit on this page.</p>
          <ButtonLink href="/shop?occasion=bags" variant="outline" arrow>
            Shop all bags
          </ButtonLink>
        </Reveal>
      </header>

      <div
        className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* The frame: each new photo wipes up over the last */}
        <Link
          href={`/shop/${bag.id}`}
          data-cursor="View"
          aria-label={`View the ${bag.name}`}
          className="group relative block aspect-square overflow-hidden bg-blush-soft md:col-span-7 md:aspect-auto md:min-h-[40rem]"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={bag.id}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
              animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 0.9, ease }}
            >
              <motion.div
                className="absolute inset-0"
                initial={reduce ? false : { scale: 1.18 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Media
                  src={bag.image}
                  alt=""
                  decorative
                  position="center 50%"
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="transition-transform duration-[1.6s] ease-editorial group-hover:scale-[1.04]"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-canvas p-4 md:p-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={bag.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="display text-[1.5rem] md:text-[1.75rem]">{bag.name}</p>
                <Swatches ids={bag.colours} className="mt-2" />
              </motion.div>
            </AnimatePresence>
            <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center border border-burgundy text-burgundy transition-all duration-500 ease-editorial group-hover:-rotate-45 group-hover:bg-burgundy group-hover:text-canvas">
              →
            </span>
          </div>
        </Link>

        {/* The list */}
        <ol className="md:col-span-5 md:self-center">
          {bags.map((b, i) => {
            const on = i === active;
            return (
              <Reveal as="li" key={b.id} delay={i * 0.06} className="relative border-b border-ink/10 first:border-t">
                <Link
                  href={`/shop/${b.id}`}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-current={on ? "true" : undefined}
                  className="group flex items-center gap-5 py-4 md:py-5"
                >
                  <span className={cn("display w-8 text-[1.25rem] transition-colors", on ? "text-burgundy" : "text-ink/30")}>0{i + 1}</span>
                  <span
                    className={cn(
                      "display flex-1 text-[1.5rem] leading-tight transition-all duration-500 ease-editorial md:text-[1.875rem]",
                      on ? "translate-x-2 text-burgundy" : "text-ink/80 group-hover:translate-x-1",
                    )}
                  >
                    {b.name}
                  </span>
                  <span aria-hidden className={cn("text-burgundy transition-all duration-500", on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0")}>
                    →
                  </span>
                </Link>
                {on && (
                  <span aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 overflow-hidden">
                    <motion.span
                      key={`${b.id}-${paused}`}
                      className="block h-full origin-left bg-burgundy"
                      initial={{ scaleX: paused || reduce ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: paused || reduce ? 0 : DWELL / 1000, ease: "linear" }}
                    />
                  </span>
                )}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
