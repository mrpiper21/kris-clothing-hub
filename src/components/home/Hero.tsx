"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { photos } from "@/data/media";
import { Media } from "@/components/ui/Media";
import { ButtonLink } from "@/components/ui/Button";
import { MaskText } from "@/components/motion/MaskText";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Magnetic } from "@/components/motion/Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;
const words = ["entrance", "meeting", "moment", "promotion"];

/** The accent word cycles through the moments Kris dresses for. */
function RotatingWord() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => window.clearInterval(t);
  }, [reduce]);

  return (
    <span className="relative inline-grid overflow-hidden pb-[0.1em] align-bottom">
      {words.map((w, n) => (
        <motion.span
          key={w}
          className="accent-word [grid-area:1/1]"
          initial={false}
          animate={{ y: n === i ? "0%" : n === (i - 1 + words.length) % words.length ? "-110%" : "110%", opacity: n === i ? 1 : 0 }}
          transition={{ duration: 0.8, ease }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Desktop: type on blush at the left, a tall photograph to the right that
 * opens like a curtain and drifts on scroll, with two inset photos floating
 * across the seam that lean away from the pointer. Mobile: photograph first.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const px = useSpring(0, { stiffness: 60, damping: 18 });
  const py = useSpring(0, { stiffness: 60, damping: 18 });
  const insetAX = useTransform(px, (v) => v * -28);
  const insetAY = useTransform(py, (v) => v * -20);
  const insetBX = useTransform(px, (v) => v * 18);
  const insetBY = useTransform(py, (v) => v * 26);

  function onMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType === "touch") return;
    px.set(e.clientX / window.innerWidth - 0.5);
    py.set(e.clientY / window.innerHeight - 0.5);
  }

  return (
    <section ref={ref} onPointerMove={onMove} aria-labelledby="hero-title" className="relative overflow-hidden bg-blush">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 md:h-[calc(100svh-6.25rem)] md:min-h-[38rem] md:max-h-[60rem] md:grid-cols-12">
        <div className="relative h-[62svh] min-h-[24rem] overflow-hidden md:col-span-6 md:col-start-7 md:row-start-1 md:h-full">
          <motion.div className="absolute inset-[-10%_0_0_0]" style={reduce ? undefined : { y: photoY }}>
            <ImageReveal onMount from="bottom" delay={0.15}>
              <Media src={photos.hero.src} alt={photos.hero.alt} position={photos.hero.position} sizes="(min-width: 768px) 50vw, 100vw" preload />
            </ImageReveal>
          </motion.div>

          {/* Season marker, rotating slowly in the corner */}
          <motion.div
            aria-hidden
            className="absolute bottom-5 right-5 hidden h-24 w-24 items-center justify-center md:flex"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.4, ease }}
          >
            <motion.svg viewBox="0 0 100 100" className="absolute inset-0 text-canvas" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
              <defs>
                <path id="hero-ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-current text-[10.5px] uppercase tracking-[0.32em]">
                <textPath href="#hero-ring">Tailored · Made to measure · </textPath>
              </text>
            </motion.svg>
            <span className="display text-3xl text-canvas">K</span>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 flex flex-col justify-center px-5 pb-12 pt-8 md:col-span-6 md:row-start-1 md:px-10 md:py-16 lg:pl-16"
          style={reduce ? undefined : { y: textY, opacity: fade }}
        >
          <motion.p className="label flex items-center gap-3 text-burgundy" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.1, ease }}>
            <motion.span aria-hidden className="inline-block h-px w-10 origin-left bg-burgundy" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3, ease }} />
            The new tailoring edit
          </motion.p>
          <h1 id="hero-title" className="display mt-5 text-[clamp(3.25rem,14vw,5.5rem)] md:text-[clamp(4rem,7vw,7.5rem)]">
            <span className="sr-only">Tailored for every entrance</span>
            <span aria-hidden>
              <MaskText onMount delay={0.25} lines={["Tailored for", <span key="2">every <RotatingWord /></span>]} />
            </span>
          </h1>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.75, ease }}>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-ink/80 md:mt-8 md:text-[1.0625rem]">
              Sculpted sheath dresses, pleated flares, trouser sets and skirt sets — cut to flatter, and ordered in a
              single WhatsApp message.
            </p>
            <div className="mt-7 grid grid-cols-1 gap-2 min-[380px]:grid-cols-2 sm:flex sm:gap-3 md:mt-9">
              <Magnetic>
                <ButtonLink href="/shop" arrow className="w-full whitespace-nowrap px-6 sm:px-8">
                  Shop the edit
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink href="#occasions" variant="outline" className="w-full whitespace-nowrap px-6 sm:px-8">
                  Shop by style
                </ButtonLink>
              </Magnetic>
            </div>
          </motion.div>

          {/* Inset photographs across the seam, desktop only */}
          <motion.div
            className="absolute bottom-10 right-0 hidden aspect-[3/4] w-[clamp(9rem,12vw,12rem)] border-[6px] border-blush xl:block"
            initial={{ opacity: 0, y: 40, x: "50%", rotate: -6 }}
            animate={{ opacity: 1, y: 0, x: "50%", rotate: -3 }}
            transition={{ duration: 1.2, delay: 1, ease }}
          >
            <motion.div className="absolute inset-0" style={{ x: insetAX, y: insetAY }}>
              <Media src={photos.heroSecond.src} alt={photos.heroSecond.alt} position={photos.heroSecond.position} sizes="14vw" />
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute right-[2%] top-12 hidden aspect-[3/4] w-[clamp(6rem,8vw,8rem)] border-[5px] border-blush 2xl:block"
            initial={{ opacity: 0, y: -30, rotate: 8 }}
            animate={{ opacity: 1, y: 0, rotate: 4 }}
            transition={{ duration: 1.2, delay: 1.15, ease }}
          >
            <motion.div className="absolute inset-0" style={{ x: insetBX, y: insetBY }}>
              <Media src={photos.heroThird.src} alt={photos.heroThird.alt} position={photos.heroThird.position} sizes="9vw" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#occasions"
        aria-label="Scroll to the collection"
        className="absolute bottom-6 left-10 hidden flex-col items-center gap-2 text-burgundy md:flex lg:left-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="label text-[0.625rem]">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-burgundy/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-burgundy"
            animate={reduce ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
