"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";

type ParallaxProps = {
  children: ReactNode;
  /** Travel in percent of the element's height across the viewport. Negative moves against the scroll. */
  speed?: number;
  className?: string;
};

/** Drifts its content vertically as the section scrolls past. */
export function Parallax({ children, speed = 10, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed}%`, `${speed}%`]);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div className="absolute inset-[-12%_0]" style={reduce ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
}
