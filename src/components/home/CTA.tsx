import { photos } from "@/data/media";
import { whatsappLink, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Parallax } from "@/components/motion/Parallax";
import { Magnetic } from "@/components/motion/Magnetic";

/** Personal styling invitation. */
export function CTA() {
  return (
    <section aria-labelledby="cta-title" className="bg-blush-soft">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 md:grid-cols-12">
        <div className="relative aspect-[4/3] md:col-span-5 md:aspect-auto md:min-h-[36rem]">
          <ImageReveal from="right">
            <Parallax speed={10}>
              <Media src={photos.cta.src} alt={photos.cta.alt} position={photos.cta.position} sizes="(min-width: 768px) 42vw, 100vw" />
            </Parallax>
          </ImageReveal>
        </div>
        <div className="flex flex-col justify-center px-5 py-14 md:col-span-6 md:col-start-7 md:px-0 md:py-20">
          <Reveal>
            <p className="label text-burgundy">Personal styling</p>
          </Reveal>
          <h2 id="cta-title" className="display mt-5 text-[clamp(2.75rem,7vw,5.5rem)]">
            <MaskText lines={["Not sure what", <span key="2">to <span className="accent-word">wear?</span></span>]} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">
              Tell us the occasion, your size and your style. We&apos;ll send a few pieces we think you&apos;ll love.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <ButtonLink href={whatsappLink(`Hello ${site.name}! I'd love some help choosing an outfit.`)} external arrow className="w-full">
                  Ask a stylist
                </ButtonLink>
              </Magnetic>
              <ButtonLink href="/size-guide" variant="outline">
                Size guide
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
