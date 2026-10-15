/**
 * The style families the boutique stocks (and its bags). Kept under the name `occasion`
 * (and the `?occasion=` URL param) so links and filters stay stable.
 */
export type Occasion = "sheath" | "flare" | "trouser" | "skirt" | "bags";

/** Keys of the colour palette in src/data/colours.ts. */
export type ColourId =
  | "black"
  | "ivory"
  | "white"
  | "nude"
  | "taupe"
  | "red"
  | "burgundy"
  | "pink"
  | "fuchsia"
  | "orange"
  | "rust"
  | "gold"
  | "olive"
  | "green"
  | "sky"
  | "blue"
  | "purple"
  | "lilac"
  | "plum"
  | "mint"
  | "teal"
  | "grey"
  | "brown"
  | "leopard";

/**
 * A catalogue piece. There is no price: pricing is confirmed with each
 * customer on WhatsApp.
 */
export interface Product {
  id: string;
  name: string;
  occasion: Occasion;
  colours: ColourId[];
  sizes: string[];
  /** Path in /public, a remote URL, or a "[PLACEHOLDER]" label. */
  image: string;
  /** Extra photographs, in order. */
  gallery?: string[];
  /** Which photo (0 = `image`, 1 = first gallery photo…) shows each colour. */
  colourPhoto?: Partial<Record<ColourId, number>>;
  description: string;
  /** Short fact lines: fabric, fit, length, care. */
  details: string[];
  available?: boolean;
  isNew?: boolean;
  bestseller?: boolean;
  /** Offered in custom measurements. */
  tailoring?: boolean;
}

export type OccasionFilter = "all" | Occasion;
export type SortId = "featured" | "new" | "name";

/** A brand photograph (hero, campaigns, gallery). */
export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position for cropping, e.g. "center 30%". */
  position?: string;
};
