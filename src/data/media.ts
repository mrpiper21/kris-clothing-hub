import type { Occasion, Photo } from "@/types/product";

/** The boutique's own photography, from public/images. */
const img = (name: string) => `/images/${name}.jpg`;

/**
 * Brand photography. `position` is the CSS object-position used when an
 * image is cropped.
 */
type BrandPhoto = "hero" | "heroSecond" | "heroThird" | "editorialLarge" | "editorialSmall" | "cta";

export const photos: Record<BrandPhoto, Photo> = {
  hero: {
    src: img("bell-sleeve-trouser-set-coral"),
    alt: "Woman in a black bell-sleeve blouse with pearl buttons and coral trousers",
    position: "center 35%",
  },
  heroSecond: {
    src: img("scarlet-button-sheath"),
    alt: "Scarlet sheath dress with a white asymmetric collar and pearl buttons",
    position: "center 40%",
  },
  heroThird: {
    src: img("navy-collar-flare-suit"),
    alt: "Navy jacket with white collar and cuffs over flared trousers",
    position: "center 40%",
  },
  editorialLarge: {
    src: img("bell-sleeve-trouser-set-mint"),
    alt: "Woman in a black bell-sleeve blouse with mint trousers, in a lounge",
    position: "center 35%",
  },
  editorialSmall: {
    src: img("plum-bow-sleeve-dress"),
    alt: "Plum pencil dress with a bow neck and lilac sleeves",
    position: "center 40%",
  },
  cta: {
    src: img("forest-piped-peplum-dress"),
    alt: "Forest green peplum dress with gold piping",
    position: "center 35%",
  },
};

export const occasions: {
  id: Occasion;
  title: string;
  accentWord: string;
  line: string;
  photo: Photo;
}[] = [
  {
    id: "sheath",
    title: "Sheath",
    accentWord: "dresses",
    line: "Sculpted, figure-skimming dresses with buttons, piping and peplums.",
    photo: { src: img("scarlet-button-sheath"), alt: "Scarlet button sheath dress", position: "center 40%" },
  },
  {
    id: "trouser",
    title: "Trouser",
    accentWord: "sets",
    line: "Statement blouses over wide and flared trousers, matched head to toe.",
    photo: { src: img("fuchsia-bow-trouser-set"), alt: "Fuchsia bow blouse and palazzo trouser set", position: "center 40%" },
  },
  {
    id: "flare",
    title: "Flare",
    accentWord: "dresses",
    line: "Fitted bodices into pleated, swinging skirts.",
    photo: { src: img("emerald-floral-flare-dress"), alt: "Emerald floral flare dress", position: "center 40%" },
  },
  {
    id: "skirt",
    title: "Skirt",
    accentWord: "sets",
    line: "Wraps, plaids and peplums over sharp pencil skirts.",
    photo: { src: img("noir-plaid-jacket-set"), alt: "Black wrap jacket with a plaid pencil skirt", position: "center 40%" },
  },
];

export const gallery: Photo[] = [
  { src: img("colour-block-sheath-dress"), alt: "Navy and sky colour-block sheath", position: "center 40%" },
  { src: img("ivory-pleated-button-dress"), alt: "Ivory pleated button dress", position: "center 40%" },
  { src: img("plaid-wrap-tie-skirt-set"), alt: "Plaid wrap-tie top with a black pencil skirt", position: "center 40%" },
  { src: img("cocoa-pleated-midi"), alt: "Cocoa pleated midi dress", position: "center 40%" },
  { src: img("honeycomb-pinafore-set"), alt: "Honeycomb pinafore over a nude shirt", position: "center 40%" },
  { src: img("lilac-button-trouser-set"), alt: "Lilac blouse with violet wide-leg trousers", position: "center 40%" },
];

/**
 * SAMPLE REVIEWS — layout stand-ins only. Replace them with real customer
 * reviews (with permission) before launch; never publish invented ones.
 */
export const testimonials = [
  { quote: "[CUSTOMER REVIEW 1]", name: "[CUSTOMER NAME]", detail: "[PRODUCT BOUGHT]" },
  { quote: "[CUSTOMER REVIEW 2]", name: "[CUSTOMER NAME]", detail: "[PRODUCT BOUGHT]" },
  { quote: "[CUSTOMER REVIEW 3]", name: "[CUSTOMER NAME]", detail: "[PRODUCT BOUGHT]" },
];

export const steps = [
  { title: "Pick your piece", line: "Save favourites, choose your size and colour, and add them to your bag." },
  { title: "Send on WhatsApp", line: "Your bag becomes one tidy message — every piece, size and colour included." },
  { title: "Confirm & pay", line: "We confirm price, availability and delivery with you directly, one-to-one." },
  { title: "Delivered to you", line: "Your order is packed with care and sent straight to your door." },
];
