"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { occasionLabel, searchProducts } from "@/lib/products";
import { Drawer } from "@/components/ui/Drawer";
import { Media } from "@/components/ui/Media";
import { SearchIcon } from "@/components/ui/Icons";

const suggestions = ["Peplum", "Pleated", "Trousers", "Plaid", "Navy", "Plum", "Bow", "Fuchsia"];

/** Instant search across the catalogue. Enter opens the full results in the shop. */
export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const results = useMemo(() => (query.trim() ? searchProducts(products, query) : []), [query]);

  function submit(e?: { preventDefault(): void }) {
    e?.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <Drawer open={open} onClose={onClose} title="Search" side="top">
      <div className="mx-auto max-w-[1200px] px-5 pb-10 pt-6 md:px-10">
        <form role="search" onSubmit={submit} className="flex items-center gap-3 border-b-2 border-burgundy pb-2">
          <SearchIcon className="shrink-0 text-burgundy" width={24} height={24} />
          <label htmlFor="site-search" className="sr-only">Search dresses</label>
          <input
            id="site-search"
            data-autofocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dresses, sets, colours…"
            autoComplete="off"
            className="display min-w-0 flex-1 bg-transparent py-2 text-[clamp(1.75rem,5vw,3rem)] placeholder:text-ink/30 focus:outline-none"
          />
        </form>

        {!query.trim() ? (
          <div className="mt-8">
            <p className="label text-ink/55">Popular searches</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => setQuery(s)}
                    className="min-h-10 border border-ink/15 px-4 text-sm transition-colors hover:border-burgundy hover:text-burgundy"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-8">
            <p aria-live="polite" className="text-sm text-ink/60">
              {results.length === 0 ? `No pieces match “${query}”. Try a colour or a style.` : `${results.length} ${results.length === 1 ? "piece" : "pieces"} found`}
            </p>
            {results.length > 0 && (
              <>
                <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                  {results.slice(0, 6).map((p) => (
                    <li key={p.id}>
                      <Link href={`/shop/${p.id}`} onClick={onClose} className="group block">
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <Media src={p.image} alt={p.name} sizes="(min-width: 1024px) 16vw, 45vw" className="transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <p className="mt-2 text-[0.6875rem] uppercase tracking-[0.1em] text-ink/50">{occasionLabel[p.occasion]}</p>
                        <p className="text-sm leading-snug group-hover:text-burgundy">{p.name}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
                {results.length > 6 && (
                  <button type="button" onClick={() => submit()} className="label mt-8 text-burgundy">
                    <span className="link-line">See all {results.length} results</span> →
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </Drawer>
  );
}
