"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CloseIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Which edge the panel slides in from. "center" is a modal dialog. */
  side?: "right" | "left" | "center" | "top";
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const offscreen = {
  right: { x: "100%" },
  left: { x: "-100%" },
  top: { y: "-100%" },
  center: { opacity: 0, y: 24 },
};

/**
 * Modal side panel: scroll lock, Escape to close, focus moves in on open
 * and returns to the opener on close, and Tab stays inside.
 */
export function Drawer({ open, onClose, title, side = "right", children, footer, className }: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel?.querySelector<HTMLElement>("button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className={cn("fixed inset-0 z-50", side === "center" && "flex items-end justify-center sm:items-center sm:p-6")}>
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-ink/45"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(
              "flex flex-col bg-canvas",
              side === "right" && "absolute inset-y-0 right-0 w-full max-w-[28rem]",
              side === "left" && "absolute inset-y-0 left-0 w-full max-w-[24rem]",
              side === "top" && "absolute inset-x-0 top-0 max-h-[100dvh]",
              side === "center" && "relative max-h-[92dvh] w-full sm:max-w-[44rem]",
              className,
            )}
            initial={offscreen[side]}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={offscreen[side]}
            transition={{ duration: 0.45, ease }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-ink/10 px-5 md:px-7">
              <h2 className="label">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-2 flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-burgundy"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
            {footer && <div className="shrink-0 border-t border-ink/10 bg-canvas">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
