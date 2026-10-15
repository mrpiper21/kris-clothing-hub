"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Client-side providers. Motion honours the visitor's reduced-motion setting.
 * The bag and wishlist live in src/lib/store.ts and need no provider.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
