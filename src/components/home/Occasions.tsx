import Link from "next/link";
import { occasions } from "@/data/media";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Tilt } from "@/components/motion/Tilt";
import { cn } from "@/lib/cn";

/*
 * Four style families as an editorial mosaic. Desktop: two tall features and
 * two stacked tiles, each opening like a curtain and leaning towards the
 * pointer. Mobile: a swipeable rail.
 */
const cells = [
  "md:col-span-5 md:row-span-2",
  "md:col-span-4 md:row-span-2",
  "md:col-span-3",
  "md:col-span-3",
];
const from = ["bottom", "top", "right", "right"] as const;

export function Occasions() {
  return (
    <section id="occasions" aria-labelledby="occasions-title" className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-28">
      <header className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
        <h2 id="occasions-title" className="display text-[clamp(2.75rem,7vw,5.5rem)]">
          <MaskText>Shop by <span className="accent-word">style</span></MaskText>
        </h2>
        <Reveal delay={0.2}>
          <p className="max-w-sm text-ink/70 md:text-right">From the first meeting to the last dinner — find the silhouette that fits the day.</p>
        </Reveal>
      </header>

      <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 md:mx-0 md:grid md:h-[46rem] md:grid-cols-12 md:grid-rows-2 md:gap-4 md:overflow-visible md:px-0">
        {occasions.map((o, i) => (
          <li key={o.id} className={cn("w-[72vw] shrink-0 snap-start sm:w-[44vw] md:w-auto", cells[i])}>
            <Tilt className="h-full">
              <Link href={`/shop?occasion=${o.id}`} data-cursor="Shop" className="group relative block aspect-[3/4] h-full overflow-hidden md:aspect-auto">
                <ImageReveal from={from[i]} delay={i * 0.12}>
                  <Media
                    src={o.photo.src}
                    alt={o.photo.alt}
                    position={o.photo.position}
                    sizes={i === 0 ? "(min-width: 768px) 42vw, 72vw" : "(min-width: 768px) 33vw, 72vw"}
                    className="transition-transform duration-[1.6s] ease-editorial group-hover:scale-[1.06]"
                  />
                </ImageReveal>
                <span aria-hidden className="display absolute left-0 top-4 z-10 bg-canvas px-3 pb-1 pt-0.5 text-[1.75rem] leading-none text-burgundy transition-colors duration-500 group-hover:bg-burgundy group-hover:text-canvas md:text-[2rem]">
                  0{i + 1}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex translate-y-0 items-end justify-between gap-4 bg-canvas p-4 transition-colors duration-500 group-hover:bg-blush md:p-5">
                  <div>
                    <h3 className="display text-[1.75rem] md:text-[2rem]">
                      {o.title} <span className="accent-word">{o.accentWord}</span>
                    </h3>
                    <p className="grid grid-rows-[1fr] text-sm text-ink/65 transition-[grid-template-rows] duration-500 ease-editorial md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr]">
                      <span className="overflow-hidden"><span className="block pt-1">{o.line}</span></span>
                    </p>
                  </div>
                  <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center border border-burgundy text-burgundy transition-all duration-500 ease-editorial group-hover:-rotate-45 group-hover:bg-burgundy group-hover:text-canvas">→</span>
                </div>
              </Link>
            </Tilt>
          </li>
        ))}
      </ul>
    </section>
  );
}
