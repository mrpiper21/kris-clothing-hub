import { photos } from "@/data/media";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Parallax } from "@/components/motion/Parallax";
import { ButtonLink } from "@/components/ui/Button";
import { ScissorsIcon, TruckIcon, WhatsAppIcon } from "@/components/ui/Icons";

const promises = [
  { icon: WhatsAppIcon, title: "Order in one message", line: "Your bag turns into a tidy WhatsApp order — no accounts, no forms." },
  { icon: ScissorsIcon, title: "Made to your measurements", line: "Selected styles can be tailored to your bust, waist, hips and height." },
  { icon: TruckIcon, title: "Delivered to your door", line: "Carefully packed and sent straight to you, with updates along the way." },
];

/** A two-photo spread with the store's promises. */
export function Editorial() {
  return (
    <section aria-labelledby="editorial-title" className="on-dark bg-burgundy text-canvas">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 py-16 md:grid-cols-12 md:gap-6 md:px-10 md:py-28">
        <div className="relative aspect-[4/5] md:col-span-6 md:aspect-auto md:min-h-[44rem]">
          <ImageReveal from="left">
            <Parallax speed={8}>
              <Media src={photos.editorialLarge.src} alt={photos.editorialLarge.alt} position={photos.editorialLarge.position} sizes="(min-width: 768px) 50vw, 100vw" />
            </Parallax>
          </ImageReveal>
        </div>

        <div className="flex flex-col justify-between gap-12 md:col-span-5 md:col-start-8">
          <Reveal>
            <p className="label text-petal">The Kris promise</p>
            <h2 id="editorial-title" className="display mt-5 text-[clamp(2.75rem,6vw,5rem)]">
              <MaskText lines={["Look the part,", <span key="2"><span className="accent-word">feel</span> the part.</span>]} />
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-blush/80">
              Every piece is cut for fit and finish first — then for how it makes you feel when you walk in.
            </p>
          </Reveal>

          <ul className="space-y-6">
            {promises.map(({ icon: Icon, title, line }, i) => (
              <Reveal as="li" key={title} delay={i * 0.08} className="flex gap-5 border-t border-blush/20 pt-6">
                <Icon className="mt-1 shrink-0 text-petal" width={22} height={22} />
                <div>
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-1 text-blush/70">{line}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="flex items-end gap-6">
            <div className="relative hidden aspect-[3/4] w-40 shrink-0 md:block lg:w-48">
              <ImageReveal from="bottom" delay={0.2}>
                <Media src={photos.editorialSmall.src} alt={photos.editorialSmall.alt} position={photos.editorialSmall.position} sizes="12rem" />
              </ImageReveal>
            </div>
            <ButtonLink href="/shop?occasion=trouser" variant="light" arrow>
              Shop trouser sets
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
