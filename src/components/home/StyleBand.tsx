import { VelocityMarquee } from "@/components/motion/VelocityMarquee";

/** Two bands of oversized type that drift in opposite directions and react to scrolling. */
export function StyleBand() {
  return (
    <section aria-hidden className="on-dark overflow-hidden bg-burgundy py-6 text-blush md:py-10">
      <VelocityMarquee
        words={["Sculpted", "Tailored", "Polished", "Made to measure"]}
        baseVelocity={-1.6}
        className="display text-[clamp(3rem,9vw,8rem)] leading-none"
      />
      <VelocityMarquee
        words={["Sheath dresses", "Trouser sets", "Pleated flares", "Skirt sets"]}
        baseVelocity={1.6}
        className="display mt-2 text-[clamp(3rem,9vw,8rem)] italic leading-none text-petal"
      />
    </section>
  );
}
