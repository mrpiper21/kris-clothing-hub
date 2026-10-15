import { testimonials } from "@/data/media";
import { Reveal } from "@/components/ui/Reveal";
import { MaskText } from "@/components/motion/MaskText";

/** Customer words. The data file holds placeholders until real reviews are supplied. */
export function Testimonials() {
  return (
    <section aria-labelledby="reviews-title" className="bg-blush py-16 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header className="mb-10 md:mb-14">
          <h2 id="reviews-title" className="display text-[clamp(2.75rem,7vw,5.5rem)]">
            <MaskText>In their <span className="accent-word">words</span></MaskText>
          </h2>
        </header>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 0.08} className="flex flex-col justify-between bg-canvas p-7 transition-transform duration-500 ease-editorial hover:-translate-y-1.5 md:min-h-[20rem] md:p-9">
              <blockquote>
                <span aria-hidden className="display block text-[4rem] leading-[0.5] text-petal">“</span>
                <p className="display mt-4 text-[1.625rem] leading-[1.2]">{t.quote}</p>
              </blockquote>
              <p className="mt-8 border-t border-ink/10 pt-4 text-sm">
                <span className="font-medium">{t.name}</span>
                <span className="text-ink/55"> · {t.detail}</span>
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
