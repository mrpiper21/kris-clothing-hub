"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { steps } from "@/data/media";
import { Reveal } from "@/components/ui/Reveal";
import { MaskText } from "@/components/motion/MaskText";

/** Four numbered steps; a burgundy rule draws across them as you scroll. */
export function HowToOrder() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="how-to-order" aria-labelledby="order-title" className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-28">
      <header className="mb-10 grid gap-4 md:mb-16 md:grid-cols-12 md:items-end">
        <h2 id="order-title" className="display text-[clamp(2.75rem,7vw,5.5rem)] md:col-span-7">
          <MaskText>How to <span className="accent-word">order</span></MaskText>
        </h2>
        <Reveal delay={0.15} className="md:col-span-4 md:col-start-9 md:justify-self-end">
          <p className="max-w-sm text-ink/70">No accounts, no checkout forms. Just a conversation with someone who knows the pieces.</p>
        </Reveal>
      </header>
      <div className="relative">
        <span aria-hidden className="absolute inset-x-0 top-0 hidden h-[3px] bg-petal/50 lg:block" />
        <motion.span aria-hidden className="absolute inset-x-0 top-0 hidden h-[3px] origin-left bg-burgundy lg:block" style={{ scaleX: progress }} />
        <ol ref={ref} className="grid grid-cols-1 gap-px bg-petal sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.1} className="group bg-canvas p-6 transition-colors duration-500 hover:bg-blush-soft md:p-8">
              <motion.span className="block overflow-hidden" initial="hidden" whileInView="shown" viewport={{ once: true }}>
                <motion.span
                  className="display block text-[3.5rem] text-burgundy md:text-[4.5rem]"
                  variants={{ hidden: { y: "100%" }, shown: { y: "0%" } }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  0{i + 1}
                </motion.span>
              </motion.span>
              <h3 className="mt-6 text-lg transition-transform duration-500 ease-editorial group-hover:translate-x-1">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-ink/65">{s.line}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
