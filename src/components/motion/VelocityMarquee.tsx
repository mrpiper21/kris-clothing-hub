"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { cn } from "@/lib/cn";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

type VelocityMarqueeProps = {
  words: string[];
  /** Base drift in percent per second; negative runs right-to-left. */
  baseVelocity?: number;
  className?: string;
};

/**
 * A band of oversized type that drifts on its own and speeds up — or turns
 * around — with the visitor's scroll. Purely decorative.
 */
export function VelocityMarquee({ words, baseVelocity = -2, className }: VelocityMarqueeProps) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    base.set(base.get() + move);
  });

  const row = words.flatMap((w, i) => [
    <span key={`w${i}`}>{w}</span>,
    <span key={`d${i}`} aria-hidden className="mx-[0.35em] inline-block h-[0.12em] w-[0.12em] translate-y-[-0.25em] bg-current align-middle" />,
  ]);

  return (
    <div aria-hidden className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div className="flex w-max flex-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} className="flex shrink-0 items-center pr-[0.35em]">
            {row}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
