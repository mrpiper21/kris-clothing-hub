"use client";

import type { ReactNode } from "react";
import { colours, lightColours } from "@/data/colours";
import type { ColourId } from "@/types/product";
import { allSizes, type ShopFilters } from "@/lib/products";
import { cn } from "@/lib/cn";

type FilterPanelProps = {
  filters: ShopFilters;
  colourIds: ColourId[];
  onChange: (next: Partial<ShopFilters>) => void;
};

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-ink/10 py-6 first:border-t-0 first:pt-0">
      <legend className="label mb-4 float-left w-full text-ink/60">{title}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

/** Colour, size and availability filters. Used in the sidebar and the mobile drawer. */
export function FilterPanel({ filters, colourIds, onChange }: FilterPanelProps) {
  return (
    <div>
      <Group title="Colour">
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
          {colourIds.map((c) => {
            const on = filters.colours.includes(c);
            return (
              <li key={c}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => onChange({ colours: toggle(filters.colours, c) })}
                  className="flex min-h-10 w-full items-center gap-2.5 text-left text-sm"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-5 w-5 shrink-0 transition-[outline-color,outline-offset]",
                      on ? "outline outline-2 outline-offset-2 outline-burgundy" : lightColours.includes(c) ? "outline outline-1 -outline-offset-1 outline-ink/20" : "",
                    )}
                    style={{ background: colours[c].hex }}
                  />
                  <span className={on ? "font-medium text-burgundy" : "text-ink/80"}>{colours[c].label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </Group>

      <Group title="Size">
        <div className="grid grid-cols-3 gap-2">
          {allSizes.map((s) => {
            const on = filters.sizes.includes(s);
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => onChange({ sizes: toggle(filters.sizes, s) })}
                className={cn(
                  "min-h-11 border text-sm transition-colors",
                  on ? "border-burgundy bg-burgundy text-canvas" : "border-ink/15 hover:border-burgundy",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Group>


      <Group title="Availability">
        <label className="flex min-h-10 cursor-pointer items-center justify-between gap-3 text-sm">
          <span className="text-ink/80">In stock only</span>
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => onChange({ inStock: e.target.checked })}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className="relative h-6 w-11 bg-ink/15 transition-colors peer-checked:bg-burgundy peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-burgundy after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:bg-canvas after:transition-transform peer-checked:after:translate-x-5"
          />
        </label>
      </Group>
    </div>
  );
}
