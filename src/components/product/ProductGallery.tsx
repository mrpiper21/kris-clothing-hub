"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/cn";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

/**
 * Product photographs: a swipeable main image with thumbnails beneath.
 * Tapping the image opens a full-screen preview (arrows, swipe, keyboard).
 */
export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);
  const altFor = (i: number) => (i === 0 ? alt : `${alt} — view ${i + 1} of ${images.length}`);

  function goTo(i: number, behavior: ScrollBehavior = "smooth") {
    const next = (i + images.length) % images.length;
    setIndex(next);
    const track = trackRef.current;
    if (track) track.scrollTo({ left: next * track.clientWidth, behavior });
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== index) setIndex(i);
  }

  return (
    <div>
      <div className="relative">
        <ul
          ref={trackRef}
          onScroll={onScroll}
          aria-label="Product photographs"
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        >
          {images.map((src, i) => (
            <li key={src} className="relative aspect-[3/4] w-full shrink-0 snap-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="absolute inset-0 cursor-zoom-in"
                aria-label={`Open full-screen preview, image ${i + 1} of ${images.length}`}
                tabIndex={i === index ? 0 : -1}
              >
                <Media
                  src={src}
                  alt={altFor(i)}
                  preload={i === 0}
                  position="center 60%"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </button>
            </li>
          ))}
        </ul>

        {images.length > 1 && (
          <>
            <ArrowButton direction="prev" onClick={() => goTo(index - 1)} className="left-3" />
            <ArrowButton direction="next" onClick={() => goTo(index + 1)} className="right-3" />
          </>
        )}
      </div>

      {images.length > 1 && (
        <ul aria-label="Choose a photograph" className="mt-2 grid grid-cols-5 gap-2 px-5 md:px-0">
          {images.map((src, i) => (
            <li key={src} className="relative aspect-square">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === index}
                className={cn(
                  "absolute inset-0 overflow-hidden transition-opacity duration-300",
                  i === index ? "opacity-100 outline-2 -outline-offset-2 outline-burgundy" : "opacity-55 hover:opacity-100",
                )}
              >
                <Media src={src} alt="" decorative sizes="120px" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {open && (
          <Lightbox
            images={images}
            altFor={altFor}
            index={index}
            onIndex={(i) => goTo(i, "auto")}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ArrowButton({
  direction,
  onClick,
  className,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      className={cn(
        "absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center bg-canvas/90 text-lg text-burgundy transition-colors hover:bg-canvas md:flex",
        className,
      )}
    >
      <span aria-hidden>{direction === "prev" ? "←" : "→"}</span>
    </button>
  );
}

type LightboxProps = {
  images: string[];
  altFor: (i: number) => string;
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
};

function Lightbox({ images, altFor, index, onIndex, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const startX = useRef<number | null>(null);
  const count = images.length;

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      opener?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % count);
      if (e.key === "ArrowLeft") onIndex((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onIndex, onClose]);

  function onPointerDown(e: PointerEvent) {
    startX.current = e.clientX;
  }
  function onPointerUp(e: PointerEvent) {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) onIndex((index + (dx < 0 ? 1 : -1) + count) % count);
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photograph preview"
      className="fixed inset-0 z-50 flex flex-col bg-canvas"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-5 md:px-10">
        <p className="text-sm text-ink/60" aria-live="polite">
          {index + 1} of {count}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="min-h-11 text-[0.8125rem] uppercase tracking-[0.1em]"
        >
          Close
        </button>
      </div>

      <div
        className="relative flex-1 touch-pan-y select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={images[index]}
            className="absolute inset-0 mx-5 md:mx-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Media src={images[index]} alt={altFor(index)} fit="contain" sizes="100vw" />
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => onIndex((index - 1 + count) % count)}
              aria-label="Previous image"
              className="absolute inset-y-0 left-0 hidden w-24 items-center justify-center text-2xl md:flex"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={() => onIndex((index + 1) % count)}
              aria-label="Next image"
              className="absolute inset-y-0 right-0 hidden w-24 items-center justify-center text-2xl md:flex"
            >
              <span aria-hidden>→</span>
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <ul className="flex shrink-0 justify-center gap-2 px-5 py-4">
          {images.map((src, i) => (
            <li key={src} className="relative h-14 w-14 md:h-16 md:w-16">
              <button
                type="button"
                onClick={() => onIndex(i)}
                aria-label={`Show image ${i + 1} of ${count}`}
                aria-current={i === index}
                className={cn(
                  "absolute inset-0 overflow-hidden",
                  i === index ? "outline-2 -outline-offset-2 outline-burgundy" : "opacity-50 hover:opacity-100",
                )}
              >
                <Media src={src} alt="" decorative sizes="64px" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
