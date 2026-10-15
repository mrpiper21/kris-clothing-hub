import type { Product } from "@/types/product";

/**
 * DISPLAY CATALOGUE — the boutique's own photography from public/images.
 *
 * Tailored, figure-sculpting womenswear. Names, sizes, fabrics and
 * availability are illustrative — confirm them against real stock. There are
 * deliberately no prices: pricing is confirmed with each customer on WhatsApp.
 */

const DRESS = ["S", "M", "L", "XL", "XXL", "3XL"];
const CORE = ["S", "M", "L", "XL", "XXL"];

/** Primary photo first, then any other photos of the same piece. */
const photos = (...files: string[]) => ({
  image: `/images/${files[0]}.jpg`,
  gallery: files.slice(1).map((f) => `/images/${f}.jpg`),
});

/** Bag photos live in public/images/bags. */
const bagPhotos = (...files: string[]) => photos(...files.map((f) => `bags/${f}`));

export const products: Product[] = [
  /* ——— Sheath dresses ——— */
  {
    id: "scarlet-button-sheath",
    name: "Scarlet Button Sheath",
    occasion: "sheath",
    colours: ["red", "white"],
    sizes: DRESS,
    ...photos("scarlet-button-sheath"),
    description:
      "A sculpted scarlet sheath with an asymmetric white collar, a sweep of pearl buttons down the hip and crisp white cuffs. Boardroom-ready, impossible to miss.",
    details: ["Structured stretch crepe, lined", "Asymmetric contrast collar", "Long sleeves with white cuffs", "Knee length, back vent"],
    available: true,
    isNew: true,
    bestseller: true,
    tailoring: true,
  },
  {
    id: "colour-block-sheath-dress",
    name: "Navy & Sky Colour-Block Sheath",
    occasion: "sheath",
    colours: ["blue", "sky"],
    sizes: DRESS,
    ...photos("colour-block-sheath-dress"),
    description:
      "Navy and sky blue cut in a curved, diagonal colour block that cinches the waist and lengthens the line. Short sleeves, clean neckline, all shape.",
    details: ["Scuba crepe", "Diagonal two-tone panelling", "Short sleeves, round neck", "Knee length"],
    available: true,
    bestseller: true,
    tailoring: true,
  },
  {
    id: "forest-piped-peplum-dress",
    name: "Forest Piped Peplum Dress",
    occasion: "sheath",
    colours: ["green", "gold"],
    sizes: DRESS,
    ...photos("forest-piped-peplum-dress"),
    description:
      "Deep forest green traced with gold piping that curves over the bust and into a sharp peplum. A long pencil skirt with a front split keeps it walkable.",
    details: ["Stretch ponte", "Gold contrast piping", "Peplum waist, long sleeves", "Midi length, front split"],
    available: true,
    isNew: true,
    tailoring: true,
  },
  {
    id: "plum-bow-sleeve-dress",
    name: "Plum Bow & Lilac Sleeve Dress",
    occasion: "sheath",
    colours: ["plum", "lilac"],
    sizes: DRESS,
    ...photos("plum-bow-sleeve-dress"),
    description:
      "A plum pencil dress with a pussy-bow neck and soft lilac balloon sleeves. Feminine, polished and made for presentations.",
    details: ["Crepe body, chiffon sleeves", "Tie-bow neckline", "Long balloon sleeves", "Knee length"],
    available: true,
    bestseller: true,
  },
  {
    id: "noir-asymmetric-peplum-dress",
    name: "Noir Asymmetric Peplum Dress",
    occasion: "sheath",
    colours: ["black"],
    sizes: DRESS,
    ...photos("noir-asymmetric-peplum-dress"),
    description:
      "All-black with an architectural asymmetric collar and a folded peplum at the waist. The little black dress, tailored for the office.",
    details: ["Heavy stretch crepe", "Asymmetric lapel collar", "Three-quarter sleeves", "Below-knee pencil skirt"],
    available: true,
    tailoring: true,
  },
  {
    id: "plum-taupe-button-dress",
    name: "Plum & Taupe Button Dress",
    occasion: "sheath",
    colours: ["plum", "taupe"],
    sizes: DRESS,
    ...photos("plum-taupe-button-dress"),
    description:
      "A plum sheath with taupe sleeves and yoke, ruched at the waist and finished with a column of covered buttons on the hip.",
    details: ["Stretch ponte", "Contrast sleeves and sweetheart yoke", "Ruched waist, button detail", "Knee length"],
    available: true,
    isNew: true,
  },
  {
    id: "noir-fuchsia-trim-sheath",
    name: "Noir Fuchsia-Trim Sheath",
    occasion: "sheath",
    colours: ["black", "fuchsia"],
    sizes: DRESS,
    ...photos("noir-fuchsia-trim-sheath"),
    description:
      "A black sheath lifted with a fuchsia yoke trim and matching fuchsia buttons. Quiet in shape, bold in detail.",
    details: ["Stretch crepe", "Fuchsia trim and buttons", "Short sleeves", "Knee length"],
    available: true,
  },
  {
    id: "navy-taupe-colour-block-dress",
    name: "Navy & Taupe Waist-Block Dress",
    occasion: "sheath",
    colours: ["blue", "taupe"],
    sizes: DRESS,
    ...photos("navy-taupe-colour-block-dress"),
    description:
      "Deep navy with a taupe band through the waist that draws the eye in and the hips out. An easy everyday hourglass.",
    details: ["Scuba crepe", "Contrast waist panel", "Short sleeves, round neck", "Knee length"],
    available: false,
  },

  /* ——— Flare dresses ——— */
  {
    id: "ivory-pleated-button-dress",
    name: "Ivory Pleated Button Dress",
    occasion: "flare",
    colours: ["white"],
    sizes: DRESS,
    ...photos("ivory-pleated-button-dress"),
    description:
      "Crisp ivory with a wrap-effect bodice, a curve of side buttons and a knife-pleated skirt that swings as you move.",
    details: ["Stretch crepe bodice, pleated skirt", "Asymmetric button placket", "Short sleeves", "Knee length"],
    available: true,
    isNew: true,
    bestseller: true,
    tailoring: true,
  },
  {
    id: "emerald-floral-flare-dress",
    name: "Emerald Floral Flare Dress",
    occasion: "flare",
    colours: ["green", "black"],
    sizes: DRESS,
    ...photos("emerald-floral-flare-dress"),
    description:
      "Emerald leaves on black, cut close through the waist and released into a soft, layered flare. Office to dinner without a change.",
    details: ["Printed stretch jersey", "Fitted bodice, flared hem", "Short sleeves", "Midi length"],
    available: true,
  },
  {
    id: "cocoa-pleated-midi",
    name: "Cocoa Pleated Midi",
    occasion: "flare",
    colours: ["brown"],
    sizes: DRESS,
    ...photos("cocoa-pleated-midi"),
    description:
      "Rich cocoa with a fitted bodice and a dropped, asymmetric seam into a full pleated skirt. Warm, grown-up and easy to wear.",
    details: ["Crepe", "Asymmetric drop waist", "Short sleeves", "Midi length, pleated"],
    available: true,
    tailoring: true,
  },

  /* ——— Trouser sets ——— */
  {
    id: "bell-sleeve-trouser-set",
    name: "Bell-Sleeve Blouse & Trouser Set",
    occasion: "trouser",
    colours: ["black", "mint", "orange"],
    sizes: CORE,
    ...photos("bell-sleeve-trouser-set-mint", "bell-sleeve-trouser-set-coral"),
    colourPhoto: { mint: 0, orange: 1 },
    description:
      "A sculpted black blouse with pearl buttons and split bell sleeves lined in colour, over matching high-waisted trousers. Shown in mint and coral.",
    details: ["Stretch crepe blouse and trousers", "Pearl button front, split bell sleeves", "Contrast sleeve lining", "Straight-leg, high waist"],
    available: true,
    isNew: true,
    bestseller: true,
    tailoring: true,
  },
  {
    id: "fuchsia-bow-trouser-set",
    name: "Fuchsia Bow Trouser Set",
    occasion: "trouser",
    colours: ["fuchsia", "black"],
    sizes: CORE,
    ...photos("fuchsia-bow-trouser-set"),
    description:
      "A black, pink-trimmed blouse with a statement fuchsia bow and peplum tails, over wide fuchsia palazzo trousers.",
    details: ["Crepe blouse, suiting trousers", "Tie bow and contrast piping", "Short sleeves, peplum hem", "Wide leg, high waist"],
    available: true,
    isNew: true,
  },
  {
    id: "lilac-button-trouser-set",
    name: "Lilac & Violet Trouser Set",
    occasion: "trouser",
    colours: ["lilac", "purple"],
    sizes: CORE,
    ...photos("lilac-button-trouser-set"),
    description:
      "A soft lilac button blouse with a curved peplum hem over deep violet wide-leg trousers. Tonal, calm and very put together.",
    details: ["Crepe blouse and trousers", "Button front, V-neck", "Short sleeves, curved peplum", "Wide leg"],
    available: true,
  },
  {
    id: "navy-collar-flare-suit",
    name: "Navy Collar Flare Suit",
    occasion: "trouser",
    colours: ["blue", "white"],
    sizes: CORE,
    ...photos("navy-collar-flare-suit"),
    description:
      "A fitted navy jacket with a crisp white collar and cuffs, over flared trousers that kick out at the hem. Old-school tailoring, new-school curves.",
    details: ["Suiting crepe", "Contrast white collar and cuffs", "Long sleeves, cinched waist", "Flared leg"],
    available: true,
    bestseller: true,
    tailoring: true,
  },
  {
    id: "teal-button-trouser-set",
    name: "Teal Button Trouser Set",
    occasion: "trouser",
    colours: ["black", "teal"],
    sizes: CORE,
    ...photos("teal-button-trouser-set"),
    description:
      "A black long-sleeve blouse with teal buttons and a split peplum, over flowing teal wide-leg trousers.",
    details: ["Crepe blouse and trousers", "Teal button front and cuffs", "Split peplum hem", "Wide leg, high waist"],
    available: true,
  },

  /* ——— Skirt sets ——— */
  {
    id: "noir-plaid-jacket-set",
    name: "Noir Wrap Jacket & Plaid Skirt",
    occasion: "skirt",
    colours: ["black", "white"],
    sizes: CORE,
    ...photos("noir-plaid-jacket-set"),
    description:
      "A cropped black wrap jacket with a deep shawl collar and plaid trim, over a matching plaid pencil skirt.",
    details: ["Suiting crepe and woven plaid", "Shawl collar, button wrap", "Long sleeves", "Knee-length pencil skirt"],
    available: true,
    isNew: true,
    tailoring: true,
  },
  {
    id: "plaid-wrap-tie-skirt-set",
    name: "Plaid Wrap-Tie Skirt Set",
    occasion: "skirt",
    colours: ["black", "white"],
    sizes: CORE,
    ...photos("plaid-wrap-tie-skirt-set"),
    description:
      "Half plaid, half solid black: a lapelled wrap top that ties at the waist, over a sleek black pencil skirt.",
    details: ["Woven plaid and crepe", "Notched lapel, tie waist", "Long sleeves", "Knee-length pencil skirt"],
    available: true,
    bestseller: true,
  },
  {
    id: "cocoa-peplum-skirt-set",
    name: "Noir & Cocoa Peplum Skirt Set",
    occasion: "skirt",
    colours: ["black", "brown"],
    sizes: CORE,
    ...photos("cocoa-peplum-skirt-set"),
    description:
      "A black peplum top with cocoa pocket flaps and a button-front waist, over a matching cocoa pencil skirt.",
    details: ["Stretch crepe", "Peplum with contrast flaps", "Long sleeves", "Knee-length pencil skirt"],
    available: true,
    tailoring: true,
  },
  {
    id: "dove-grey-wrap-skirt-set",
    name: "Dove Grey Wrap Skirt Set",
    occasion: "skirt",
    colours: ["grey", "black"],
    sizes: CORE,
    ...photos("dove-grey-wrap-skirt-set"),
    description:
      "A dove grey top with a black bandeau panel and a white-edged wrap peplum, over a black pencil skirt.",
    details: ["Stretch crepe", "Contrast bust panel, piped wrap hem", "Long sleeves", "Knee-length pencil skirt"],
    available: true,
  },
  {
    id: "honeycomb-pinafore-set",
    name: "Honeycomb Pinafore & Shirt Set",
    occasion: "skirt",
    colours: ["black", "nude"],
    sizes: CORE,
    ...photos("honeycomb-pinafore-set"),
    description:
      "A honeycomb-textured pinafore with a button front, layered over a soft nude collared shirt. Smart, structured and endlessly re-wearable.",
    details: ["Textured jacquard pinafore", "Collared shirt included", "Long shirt sleeves", "Knee length"],
    available: true,
    isNew: true,
  },

  /* ——— Bags ——— (no sizes, so no size picker) */
  {
    id: "pouch-charm-top-handle-bag",
    name: "Pouch-Charm Top-Handle Bag",
    occasion: "bags",
    colours: ["black", "fuchsia", "blue", "pink"],
    sizes: [],
    ...bagPhotos("pouch-charm-top-handle-black", "pouch-charm-top-handle-pink", "pouch-charm-top-handle-denim", "pouch-charm-top-handle-blush"),
    colourPhoto: { black: 0, fuchsia: 1, blue: 2, pink: 3 },
    description:
      "A structured top-handle bag with a gold turn-lock strap and its own mini pouch charm clipped to the handle. Shown in black, hot pink, denim blue and blush with red trim.",
    details: ["Structured body, rolled top handle", "Gold-tone turn-lock and chain", "Detachable mini pouch charm", "Fits phone, wallet and keys"],
    available: true,
    isNew: true,
    bestseller: true,
  },
  {
    id: "sculpted-tote-and-pouch-set",
    name: "Sculpted Tote & Pouch Set",
    occasion: "bags",
    colours: ["burgundy", "black", "leopard"],
    sizes: [],
    ...bagPhotos("sculpted-tote-set-burgundy", "sculpted-tote-set-black", "sculpted-tote-set-leopard", "sculpted-tote-set-leopard-styled"),
    colourPhoto: { burgundy: 0, black: 1, leopard: 2 },
    description:
      "A wide, fan-shaped shoulder tote with gold clasps, paired with a matching slouchy pouch. Shown in wine, black, and leopard with black trim.",
    details: ["Two pieces: tote and pouch", "Long shoulder straps", "Gold-tone clasp hardware", "Roomy enough for a laptop sleeve or files"],
    available: true,
    isNew: true,
  },
  {
    id: "woven-leaf-charm-tote",
    name: "Woven Leaf-Charm Tote",
    occasion: "bags",
    colours: ["black"],
    sizes: [],
    ...bagPhotos("woven-leaf-charm-tote"),
    description:
      "Black woven leather-look tote with rolled handles and a gold leaf charm. Smart enough for the office, easy enough for the weekend.",
    details: ["Woven faux-leather", "Rolled top handles, optional shoulder strap", "Gold-tone leaf charm", "Zip-top opening"],
    available: true,
    bestseller: true,
  },
  {
    id: "striped-barrel-bag-set",
    name: "Striped Barrel Bag & Purse Set",
    occasion: "bags",
    colours: ["taupe", "black", "green", "burgundy", "ivory", "pink", "brown"],
    sizes: [],
    ...bagPhotos("striped-barrel-bag-set"),
    description:
      "A ribbed barrel bag with a striped body and leather-look ends, sold with a matching purse. Many colourways — tell us your favourite on WhatsApp.",
    details: ["Barrel bag with matching purse", "Top handles plus detachable strap", "Ribbed, striped body", "Gold-tone plaque"],
    available: true,
  },
  {
    id: "ring-handle-mini-bag",
    name: "Ring-Handle Mini Bag",
    occasion: "bags",
    colours: ["black", "white", "sky", "green", "red", "burgundy", "gold", "brown"],
    sizes: [],
    ...bagPhotos("ring-handle-mini-bag"),
    description:
      "A rounded mini bag with a sculpted gold ring handle and a chain strap. Small, glossy and it still fits a large phone.",
    details: ["About 21.5 × 11.5 × 8 cm", "Gold-tone ring handle", "Detachable shoulder chain", "Fits a large phone"],
    available: true,
    isNew: true,
  },
  {
    id: "cloud-charm-tote",
    name: "Cloud Charm Tote",
    occasion: "bags",
    colours: ["sky", "black", "white", "pink"],
    sizes: [],
    ...bagPhotos("cloud-charm-tote"),
    description:
      "A soft, painterly-print tote with a fluffy cloud charm. Big enough for everything, playful enough to make you smile.",
    details: ["Printed faux-leather", "Shoulder handles", "Plush cloud charm", "Roomy everyday size"],
    available: true,
  },
];
