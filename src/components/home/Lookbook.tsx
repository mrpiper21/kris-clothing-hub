"use client";

import { gallery } from "@/data/media";
import { site, tiktokLink } from "@/lib/site";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { MaskText } from "@/components/motion/MaskText";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Parallax } from "@/components/motion/Parallax";
import { cn } from "@/lib/cn";

/** Columns drift at different speeds as you scroll, like a hanging rail. */
const drift = [6, -10, 14, -6, 10, -14];

/** A six-photo lookbook linking out to TikTok. */
export function Lookbook() {
  return (
    <section aria-labelledby="lookbook-title" className="mx-auto max-w-[1600px] overflow-hidden px-5 py-16 md:px-10 md:py-28">
      <header className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
        <div>
          <h2 id="lookbook-title" className="display text-[clamp(2.75rem,7vw,5.5rem)]">
            <MaskText>As <span className="accent-word">worn</span></MaskText>
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-md text-ink/70">Styling ideas, new arrivals and try-ons — follow along on TikTok.</p>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <ButtonLink href={tiktokLink()} external variant="outline" arrow>
            @{site.tiktok}
          </ButtonLink>
        </Reveal>
      </header>
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-3">
        {gallery.map((photo, i) => (
          <li key={photo.src} className={cn("relative aspect-[3/4] overflow-hidden", i % 2 === 1 && "md:mt-12")}>
            <a
              href={tiktokLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Watch"
              className="group absolute inset-0"
              aria-label={`${photo.alt} — view on TikTok`}
            >
              <ImageReveal from={i % 2 ? "top" : "bottom"} delay={(i % 3) * 0.1}>
                <Parallax speed={drift[i]}>
                  <Media src={photo.src} alt="" decorative position={photo.position} sizes="(min-width: 768px) 16vw, 50vw" className="transition-transform duration-[1.4s] ease-editorial group-hover:scale-[1.08]" />
                </Parallax>
              </ImageReveal>
              <span aria-hidden className="absolute inset-0 bg-burgundy/0 transition-colors duration-500 group-hover:bg-burgundy/25" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
