"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A hairline across the top of the window that fills as you read down the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-burgundy"
      style={{ scaleX }}
    />
  );
}
