"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/cn";

type TiltProps = {
  children: ReactNode;
  /** Maximum rotation in degrees. */
  max?: number;
  className?: string;
};

/**
 * A card that leans towards the pointer in 3D and settles back when it
 * leaves. Mouse and pen only — touch screens and reduced motion get a still card.
 */
export function Tilt({ children, max = 5, className }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rx = useSpring(0, spring);
  const ry = useSpring(0, spring);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
    rx.set((0.5 - (e.clientY - r.top) / r.height) * max * 2);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <div className={cn("[perspective:1100px]", className)}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative h-full w-full"
        style={{ rotateX: rx, rotateY: ry }}
      >
        {children}
      </motion.div>
    </div>
  );
}
