import type { ColourId } from "@/types/product";

/** The colour palette used for swatches and the colour filter. */
export const colours: Record<ColourId, { label: string; hex: string }> = {
  black: { label: "Black", hex: "#141113" },
  ivory: { label: "Ivory", hex: "#f2ebdd" },
  white: { label: "White", hex: "#ffffff" },
  nude: { label: "Nude", hex: "#d9b99b" },
  taupe: { label: "Taupe", hex: "#8f8377" },
  red: { label: "Red", hex: "#c1121f" },
  burgundy: { label: "Burgundy", hex: "#6d1a36" },
  pink: { label: "Blush pink", hex: "#efc3cf" },
  fuchsia: { label: "Fuchsia", hex: "#d6247a" },
  orange: { label: "Orange", hex: "#e2702a" },
  rust: { label: "Rust", hex: "#9a3d25" },
  gold: { label: "Gold", hex: "#d4a72c" },
  olive: { label: "Olive", hex: "#5f6237" },
  green: { label: "Green", hex: "#3f7f6a" },
  sky: { label: "Sky blue", hex: "#9cc3ea" },
  blue: { label: "Blue", hex: "#1f3f8f" },
  purple: { label: "Violet", hex: "#5b2a86" },
  lilac: { label: "Lilac", hex: "#c9a9e8" },
  plum: { label: "Plum", hex: "#4a1932" },
  mint: { label: "Mint", hex: "#cfeee2" },
  teal: { label: "Teal", hex: "#1c8a99" },
  grey: { label: "Dove grey", hex: "#b9b3b5" },
  brown: { label: "Cocoa", hex: "#4a2c22" },
  leopard: { label: "Leopard", hex: "#b48a52" },
};

/** Light swatches need a visible outline on white. */
export const lightColours: ColourId[] = ["ivory", "white", "nude", "pink", "sky", "mint", "lilac"];
