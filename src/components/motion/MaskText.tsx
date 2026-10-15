"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type MaskTextProps = {
  /** Each entry is one line; it rises out of its own mask. Give elements a key. */
  lines?: ReactNode[];
  /** A single line, as an alternative to `lines`. */
  children?: ReactNode;
  delay?: number;
  /** Animate on mount (hero) instead of when scrolled into view. */
  onMount?: boolean;
  className?: string;
  lineClassName?: string;
};

const line: Variants = {
  hidden: { y: "110%", rotate: 3 },
  shown: (i: number) => ({ y: "0%", rotate: 0, transition: { duration: 1.1, delay: i, ease } }),
};

/**
 * Editorial headline reveal: every line slides up from behind a hard mask,
 * one after another. Text stays real text for search engines and readers.
 * The in-view trigger sits on the mask, not the clipped line, so it fires.
 */
export function MaskText({ lines, children, delay = 0, onMount, className, lineClassName }: MaskTextProps) {
  return (
    <motion.span
      className={className ?? "block"}
      initial="hidden"
      {...(onMount ? { animate: "shown" } : { whileInView: "shown", viewport: { once: true, margin: "0px 0px -8% 0px" } })}
    >
      {(lines ?? [children]).map((content, i) => (
        <span key={i} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <motion.span className={lineClassName ?? "block"} style={{ transformOrigin: "0% 100%" }} variants={line} custom={delay + i * 0.12}>
            {content}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
