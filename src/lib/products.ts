import { products } from "@/data/products";
import { colours } from "@/data/colours";
import { isPlaceholder } from "@/lib/site";
import type { ColourId, Occasion, OccasionFilter, Product, SortId } from "@/types/product";

/**
 * Data access layer.
 *
 * Today these read local data. When the backend arrives, replace the bodies
 * with API calls — the signatures stay the same so pages and components
 * don't change.
 */

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const score = (p: Product) =>
    (p.occasion === product.occasion ? 3 : 0) + p.colours.filter((c) => product.colours.includes(c)).length;
  return products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}

/* Pure helpers — safe to use in client components on already-loaded data. */

export const occasionLabel: Record<Occasion, string> = {
  sheath: "Sheath dresses",
  flare: "Flare dresses",
  trouser: "Trouser sets",
  skirt: "Skirt sets",
};

export const occasionFilters: { id: OccasionFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sheath", label: "Sheath" },
  { id: "flare", label: "Flare" },
  { id: "trouser", label: "Trouser sets" },
  { id: "skirt", label: "Skirt sets" },
];

export const sortOptions: { id: SortId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "New in" },
  { id: "name", label: "Name: A to Z" },
];

export const allSizes = ["S", "M", "L", "XL", "XXL", "3XL"];

export const isOccasion = (v: string | null): v is OccasionFilter => occasionFilters.some((f) => f.id === v);
export const isSort = (v: string | null): v is SortId => sortOptions.some((s) => s.id === v);
export const isColour = (v: string): v is ColourId => v in colours;

export type ShopFilters = {
  occasion: OccasionFilter;
  colours: ColourId[];
  sizes: string[];
  inStock: boolean;
  sort: SortId;
  q: string;
};

export const defaultFilters: ShopFilters = {
  occasion: "all",
  colours: [],
  sizes: [],
  inStock: false,
  sort: "featured",
  q: "",
};

/** Lower-cased text a product can be found by. */
function haystack(p: Product): string {
  return [p.name, occasionLabel[p.occasion], ...p.colours.map((c) => colours[c].label), p.description]
    .join(" ")
    .toLowerCase();
}

export function searchProducts(list: Product[], query: string): Product[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return list;
  return list.filter((p) => {
    const text = haystack(p);
    return words.every((w) => text.includes(w));
  });
}

export function applyFilters(list: Product[], f: ShopFilters): Product[] {
  const result = searchProducts(list, f.q).filter(
    (p) =>
      (f.occasion === "all" || p.occasion === f.occasion) &&
      (f.colours.length === 0 || p.colours.some((c) => f.colours.includes(c))) &&
      (f.sizes.length === 0 || p.sizes.some((s) => f.sizes.includes(s))) &&
      (!f.inStock || p.available !== false),
  );

  const order = list.map((p) => p.id);
  const sorters: Record<SortId, (a: Product, b: Product) => number> = {
    featured: (a, b) => Number(!!b.bestseller) - Number(!!a.bestseller) || order.indexOf(a.id) - order.indexOf(b.id),
    new: (a, b) => Number(!!b.isNew) - Number(!!a.isNew) || order.indexOf(a.id) - order.indexOf(b.id),
    name: (a, b) => a.name.localeCompare(b.name),
  };
  return [...result].sort(sorters[f.sort]);
}

/** Every colour that appears in the catalogue, in palette order. */
export function availableColours(list: Product[]): ColourId[] {
  const used = new Set(list.flatMap((p) => p.colours));
  return (Object.keys(colours) as ColourId[]).filter((c) => used.has(c));
}

/** Product photographs, primary first. */
export function productImages(product: Product): string[] {
  return [product.image, ...(product.gallery ?? [])];
}

export function productAlt(product: Product): string {
  return isPlaceholder(product.name) ? `${product.name} photograph` : `${product.name}, ${occasionLabel[product.occasion].toLowerCase()}`;
}
