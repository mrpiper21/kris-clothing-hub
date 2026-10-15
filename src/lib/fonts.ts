import { Cormorant_Garamond, Inter_Tight } from "next/font/google";

/** Display serif for headlines; italic is used for the accent word. */
export const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

/** Body and interface text. */
export const bodyFont = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
