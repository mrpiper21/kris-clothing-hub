"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const ease = [0.76, 0, 0.24, 1] as const;

type ImageRevealProps = {
  children: ReactNode;
  /** Which edge the curtain opens from. */
  from?: "bottom" | "left" | "right" | "top";
  delay?: number;
  onMount?: boolean;
  className?: string;
};

const closed = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * A curtain wipe for photographs: the frame opens from one edge while the
 * image inside settles from a slight zoom. Skipped for reduced motion.
 */
export function ImageReveal({ children, from = "bottom", delay = 0, onMount, className }: ImageRevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={cn("absolute inset-0", className)}>{children}</div>;

  const shown = { clipPath: "inset(0% 0% 0% 0%)" };
  const trigger = onMount ? { animate: shown } : { whileInView: shown, viewport: { once: true, margin: "0px 0px -12% 0px" } };
  const zoom = onMount
    ? { animate: { scale: 1 } }
    : { whileInView: { scale: 1 }, viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <motion.div
      className={cn("absolute inset-0 overflow-hidden", className)}
      initial={{ clipPath: closed[from] }}
      {...trigger}
      transition={{ duration: 1.3, delay, ease }}
    >
      <motion.div className="absolute inset-0" initial={{ scale: 1.25 }} {...zoom} transition={{ duration: 1.8, delay, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
