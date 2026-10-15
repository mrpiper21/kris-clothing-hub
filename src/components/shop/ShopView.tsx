"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { colours } from "@/data/colours";
import type { Product } from "@/types/product";
import {
  applyFilters,
  availableColours,
  defaultFilters,
  isColour,
  isOccasion,
  isSort,
  occasionFilters,
  sortOptions,
  type ShopFilters,
} from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";
import { FilterPanel } from "@/components/shop/FilterPanel";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { CloseIcon, FilterIcon, SearchIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

const intro: Record<ShopFilters["occasion"], { title: string; accent: string; line: string }> = {
  all: { title: "The", accent: "collection", line: "Every tailored piece and bag — filter by style, colour and size." },
  sheath: { title: "Sheath", accent: "dresses", line: "Sculpted, figure-skimming dresses with buttons, piping and peplums." },
  flare: { title: "Flare", accent: "dresses", line: "Fitted bodices into pleated, swinging skirts — polished with movement." },
  trouser: { title: "Trouser", accent: "sets", line: "Statement blouses over wide and flared trousers, matched head to toe." },
  skirt: { title: "Skirt", accent: "sets", line: "Wraps, plaids and peplums over sharp pencil skirts." },
  bags: { title: "The", accent: "bags", line: "Totes, top-handles and minis to finish the look." },
};

/** Reads the filters from the URL: /shop?occasion=trouser&colour=pink,red&size=M&sort=new&q=satin */
function readFilters(params: URLSearchParams): ShopFilters {
  const o = params.get("occasion");
  const s = params.get("sort");
  return {
    occasion: isOccasion(o) ? o : "all",
    colours: (params.get("colour") ?? "").split(",").filter(isColour),
    sizes: (params.get("size") ?? "").split(",").filter(Boolean),
    inStock: params.get("stock") === "1",
    sort: isSort(s) ? s : "featured",
    q: params.get("q") ?? "",
  };
}

function writeFilters(f: ShopFilters) {
  const q = new URLSearchParams();
  if (f.occasion !== "all") q.set("occasion", f.occasion);
  if (f.colours.length) q.set("colour", f.colours.join(","));
  if (f.sizes.length) q.set("size", f.sizes.join(","));
  if (f.inStock) q.set("stock", "1");
  if (f.sort !== "featured") q.set("sort", f.sort);
  if (f.q) q.set("q", f.q);
  const qs = q.toString();
  // Updates the URL (and useSearchParams) without a navigation or scroll jump.
  window.history.replaceState(null, "", qs ? `/shop?${qs}` : "/shop");
}

/**
 * The shop. Every filter lives in the URL so a filtered view can be shared,
 * but changing a filter never reloads the page.
 */
export function ShopView({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const filters = useMemo(() => readFilters(new URLSearchParams(params.toString())), [params]);
  const [drawer, setDrawer] = useState(false);
  const chipsRef = useRef<HTMLDivElement>(null);
  const colourIds = useMemo(() => availableColours(products), [products]);
  const visible = useMemo(() => applyFilters(products, filters), [products, filters]);

  const update = (next: Partial<ShopFilters>) => writeFilters({ ...filters, ...next });

  // Keep the selected occasion chip in view on narrow screens.
  useEffect(() => {
    const row = chipsRef.current;
    const active = row?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (row && active) row.scrollTo({ left: active.offsetLeft - 20, behavior: "smooth" });
  }, [filters.occasion]);

  // Count per occasion, given every other filter, so the chips show what you'd get.
  const occasionCounts = useMemo(
    () => Object.fromEntries(occasionFilters.map((o) => [o.id, applyFilters(products, { ...filters, occasion: o.id }).length])),
    [products, filters],
  );

  const chips: { label: string; clear: Partial<ShopFilters> }[] = [
    ...filters.colours.map((c) => ({ label: colours[c].label, clear: { colours: filters.colours.filter((x) => x !== c) } })),
    ...filters.sizes.map((s) => ({ label: `Size ${s}`, clear: { sizes: filters.sizes.filter((x) => x !== s) } })),
    ...(filters.inStock ? [{ label: "In stock", clear: { inStock: false } }] : []),
    ...(filters.q ? [{ label: `“${filters.q}”`, clear: { q: "" } }] : []),
  ];
  const activeCount = filters.colours.length + filters.sizes.length + (filters.inStock ? 1 : 0);
  const clearAll = () => writeFilters({ ...defaultFilters, occasion: filters.occasion, sort: filters.sort });
  const copy = intro[filters.occasion];

  return (
    <div>
      <header className="mb-10 grid grid-cols-1 gap-5 md:mb-14 md:grid-cols-12 md:items-end">
        <AnimatePresence mode="wait" initial={false}>
          <motion.h1
            key={filters.occasion}
            className="display text-[clamp(3.25rem,10vw,8rem)] md:col-span-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {copy.title} <span className="accent-word">{copy.accent}</span>
          </motion.h1>
        </AnimatePresence>
        <p className="max-w-xs text-lg leading-relaxed text-ink/70 md:col-span-4 md:justify-self-end">{copy.line}</p>
      </header>

      {/* Occasion chips + toolbar */}
      <div className="sticky top-16 z-20 -mx-5 bg-canvas px-5 md:-mx-10 md:px-10">
        <div ref={chipsRef} role="group" aria-label="Occasion" className="no-scrollbar relative -mx-5 flex gap-2 overflow-x-auto px-5 py-3 md:mx-0 md:px-0">
          {occasionFilters.map((o) => {
            const on = o.id === filters.occasion;
            return (
              <button
                key={o.id}
                type="button"
                aria-pressed={on}
                onClick={() => update({ occasion: o.id })}
                className={cn(
                  "flex min-h-10 shrink-0 items-center gap-2 border px-4 text-[0.8125rem] uppercase tracking-[0.08em] transition-colors",
                  on ? "border-burgundy bg-burgundy text-canvas" : "border-ink/15 text-ink/80 hover:border-burgundy hover:text-burgundy",
                )}
              >
                {o.label}
                <span className={cn("text-[0.6875rem]", on ? "text-blush" : "text-ink/40")}>{occasionCounts[o.id]}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-3 border-y border-ink/10 py-2">
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="flex min-h-10 items-center gap-2 text-[0.8125rem] uppercase tracking-[0.1em] lg:hidden"
          >
            <FilterIcon /> Filters {activeCount > 0 && <span className="bg-burgundy px-1.5 text-[0.6875rem] text-canvas">{activeCount}</span>}
          </button>

          <label className="relative hidden min-w-0 max-w-xs flex-1 items-center lg:flex">
            <span className="sr-only">Search within the shop</span>
            <SearchIcon className="pointer-events-none absolute left-0 text-ink/45" width={18} height={18} />
            <input
              type="search"
              value={filters.q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Search within results"
              className="min-h-10 w-full bg-transparent pl-7 text-sm placeholder:text-ink/40 focus:outline-none"
            />
          </label>

          <div className="flex items-center gap-4">
            <p aria-live="polite" className="hidden text-sm text-ink/55 sm:block">
              {visible.length} {visible.length === 1 ? "piece" : "pieces"}
            </p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-ink/55">Sort</span>
              <select
                value={filters.sort}
                onChange={(e) => update({ sort: e.target.value as ShopFilters["sort"] })}
                className="min-h-10 cursor-pointer border border-ink/15 bg-canvas px-3 text-sm hover:border-burgundy focus:border-burgundy focus:outline-none"
              >
                {sortOptions.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 pt-8 lg:grid-cols-[15rem_1fr] lg:gap-12 lg:pt-10">
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="no-scrollbar sticky top-[12.5rem] max-h-[calc(100dvh-13.5rem)] overflow-y-auto pb-6">
            <FilterPanel filters={filters} colourIds={colourIds} onChange={update} />
            {activeCount > 0 && (
              <button type="button" onClick={clearAll} className="label mt-2 text-burgundy">
                <span className="link-line">Clear filters</span>
              </button>
            )}
          </div>
        </aside>

        <div>
          {chips.length > 0 && (
            <ul aria-label="Active filters" className="mb-8 flex flex-wrap items-center gap-2">
              {chips.map((c) => (
                <li key={c.label}>
                  <button
                    type="button"
                    onClick={() => update(c.clear)}
                    className="flex min-h-9 items-center gap-2 bg-blush px-3 text-sm text-burgundy transition-colors hover:bg-petal"
                    aria-label={`Remove filter ${c.label}`}
                  >
                    {c.label} <CloseIcon width={14} height={14} />
                  </button>
                </li>
              ))}
              <li>
                <button type="button" onClick={() => writeFilters({ ...defaultFilters, occasion: filters.occasion, sort: filters.sort })} className="ml-2 text-sm text-ink/60 underline underline-offset-4 hover:text-burgundy">
                  Clear all
                </button>
              </li>
            </ul>
          )}

          {visible.length === 0 ? (
            <div className="bg-blush-soft px-6 py-20 text-center">
              <p className="display text-[2.5rem]">
                Nothing <span className="accent-word">matches</span> — yet
              </p>
              <p className="mx-auto mt-3 max-w-sm text-ink/65">Try removing a filter, or ask us on WhatsApp — new pieces arrive every week.</p>
              <Button variant="outline" className="mt-8" onClick={() => writeFilters(defaultFilters)}>
                Reset all filters
              </Button>
            </div>
          ) : (
            <ProductGrid products={visible} columns={3} />
          )}
        </div>
      </div>

      <Drawer
        open={drawer}
        onClose={() => setDrawer(false)}
        title="Filters"
        side="left"
        footer={
          <div className="grid grid-cols-2 gap-2 p-4">
            <Button variant="outline" onClick={clearAll} className="px-4">Clear</Button>
            <Button onClick={() => setDrawer(false)} className="px-4">
              Show {visible.length}
            </Button>
          </div>
        }
      >
        <div className="px-5 py-6">
          <label className="mb-6 block">
            <span className="label mb-3 block text-ink/60">Search</span>
            <input type="search" value={filters.q} onChange={(e) => update({ q: e.target.value })} placeholder="e.g. peplum, plaid, navy" className="field" />
          </label>
          <FilterPanel filters={filters} colourIds={colourIds} onChange={update} />
        </div>
      </Drawer>
    </div>
  );
}
