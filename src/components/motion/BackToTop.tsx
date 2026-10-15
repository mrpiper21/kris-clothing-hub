"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

/** A square button that appears once you're well down the page and fills as you scroll. */
export function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 900));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-30 hidden h-12 w-12 items-center justify-center overflow-hidden border border-burgundy bg-canvas text-burgundy md:flex"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
        >
          <motion.span aria-hidden className="absolute inset-x-0 bottom-0 h-full origin-bottom bg-blush" style={{ scaleY: scrollYProgress }} />
          <span aria-hidden className="relative">↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
