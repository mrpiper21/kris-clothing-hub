"use client";

import Link from "next/link";
import { colours } from "@/data/colours";
import { shop, type ResolvedLine } from "@/lib/store";
import { Media } from "@/components/ui/Media";
import { MinusIcon, PlusIcon } from "@/components/ui/Icons";

/** The items in the bag, with quantity steppers. Shared by the drawer and the bag page. */
export function BagLines({ lines, onNavigate, large }: { lines: ResolvedLine[]; onNavigate?: () => void; large?: boolean }) {
  return (
    <ul className="divide-y divide-ink/10">
      {lines.map((l) => (
        <li key={l.key} className="flex gap-4 py-5">
          <Link
            href={`/shop/${l.id}`}
            onClick={onNavigate}
            className={large ? "relative aspect-[3/4] w-28 shrink-0 overflow-hidden md:w-36" : "relative aspect-[3/4] w-24 shrink-0 overflow-hidden"}
          >
            <Media src={l.product.image} alt={l.product.name} sizes="150px" />
          </Link>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex justify-between gap-3">
              <Link href={`/shop/${l.id}`} onClick={onNavigate} className="text-[0.9375rem] leading-snug hover:text-burgundy">
                {l.product.name}
              </Link>
            </div>
            <dl className="mt-1.5 space-y-0.5 text-sm text-ink/60">
              {l.size && (
                <div className="flex gap-1.5"><dt>Size:</dt><dd>{l.size}</dd></div>
              )}
              {l.colour && (
                <div className="flex items-center gap-1.5">
                  <dt>Colour:</dt>
                  <dd className="flex items-center gap-1.5">
                    <span aria-hidden className="h-2.5 w-2.5 outline outline-1 -outline-offset-1 outline-ink/20" style={{ background: colours[l.colour].hex }} />
                    {colours[l.colour].label}
                  </dd>
                </div>
              )}
              {l.tailored && <div><dt className="sr-only">Fit:</dt><dd>Made to measure</dd></div>}
            </dl>
            <div className="mt-auto flex items-center justify-between pt-3">
              <div className="flex items-center border border-ink/15" role="group" aria-label={`Quantity of ${l.product.name}`}>
                <button type="button" onClick={() => shop.setQty(l.key, l.qty - 1)} aria-label="Decrease quantity" className="flex h-9 w-9 items-center justify-center hover:bg-blush-soft">
                  <MinusIcon width={14} height={14} />
                </button>
                <span className="w-8 text-center text-sm" aria-live="polite">{l.qty}</span>
                <button
                  type="button"
                  onClick={() => shop.setQty(l.key, l.qty + 1)}
                  disabled={l.qty >= 10}
                  aria-label="Increase quantity"
                  className="flex h-9 w-9 items-center justify-center hover:bg-blush-soft disabled:opacity-30"
                >
                  <PlusIcon width={14} height={14} />
                </button>
              </div>
              <button type="button" onClick={() => shop.remove(l.key)} className="text-sm text-ink/55 underline-offset-4 hover:text-burgundy hover:underline">
                Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
