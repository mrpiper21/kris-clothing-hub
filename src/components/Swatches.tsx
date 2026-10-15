import { colours, lightColours } from "@/data/colours";
import type { ColourId } from "@/types/product";
import { cn } from "@/lib/cn";

/** Small square colour chips, e.g. under a product card. */
export function Swatches({ ids, className }: { ids: ColourId[]; className?: string }) {
  return (
    <ul className={cn("flex items-center gap-1.5", className)} aria-label={`Colours: ${ids.map((c) => colours[c].label).join(", ")}`}>
      {ids.map((c) => (
        <li
          key={c}
          aria-hidden
          title={colours[c].label}
          className={cn("h-3 w-3", lightColours.includes(c) && "outline outline-1 -outline-offset-1 outline-ink/25")}
          style={{ background: colours[c].hex }}
        />
      ))}
    </ul>
  );
}
