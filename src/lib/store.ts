"use client";

import { useSyncExternalStore } from "react";
import { products } from "@/data/products";
import { colours } from "@/data/colours";
import { occasionLabel } from "@/lib/products";
import { site } from "@/lib/site";
import type { ColourId, Product } from "@/types/product";

/**
 * Bag and wishlist, kept in the visitor's browser (localStorage).
 * Ordering happens on WhatsApp, so the bag is turned into one tidy message.
 */

export type BagLine = {
  /** id + size + colour + tailored, so the same dress in two sizes is two lines. */
  key: string;
  id: string;
  size?: string;
  colour?: ColourId;
  tailored?: boolean;
  qty: number;
};

type State = { bag: BagLine[]; wishlist: string[]; bagOpen: boolean };

const STORAGE_KEY = "kris-shop-v1";
const empty: State = { bag: [], wishlist: [], bagOpen: false };

let state: State = empty;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw) as Partial<State>;
    const known = new Set(products.map((p) => p.id));
    state = {
      ...state,
      bag: (saved.bag ?? []).filter((l) => known.has(l.id) && l.qty > 0),
      wishlist: (saved.wishlist ?? []).filter((id) => known.has(id)),
    };
  } catch {
    // Storage unavailable (private mode, blocked) — start empty.
  }
}

function set(next: Partial<State>) {
  state = { ...state, ...next };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ bag: state.bag, wishlist: state.wishlist }));
  } catch {
    // Ignore — the bag still works for this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    loaded = false;
    load();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return state;
}

const getServerSnapshot = () => empty;

/** Subscribes to the shop state. Renders empty on the server and first paint. */
export function useShop(): State {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const lineKey = (l: Omit<BagLine, "key" | "qty">) => [l.id, l.size ?? "", l.colour ?? "", l.tailored ? "t" : ""].join("|");

export const shop = {
  addToBag(line: Omit<BagLine, "key" | "qty">, qty = 1) {
    load();
    const key = lineKey(line);
    const existing = state.bag.find((l) => l.key === key);
    const bag = existing
      ? state.bag.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + qty, 10) } : l))
      : [...state.bag, { ...line, key, qty }];
    set({ bag, bagOpen: true });
  },
  setQty(key: string, qty: number) {
    set({ bag: qty <= 0 ? state.bag.filter((l) => l.key !== key) : state.bag.map((l) => (l.key === key ? { ...l, qty: Math.min(qty, 10) } : l)) });
  },
  remove(key: string) {
    set({ bag: state.bag.filter((l) => l.key !== key) });
  },
  clearBag() {
    set({ bag: [] });
  },
  toggleWish(id: string) {
    load();
    set({ wishlist: state.wishlist.includes(id) ? state.wishlist.filter((w) => w !== id) : [...state.wishlist, id] });
  },
  openBag() {
    set({ bagOpen: true });
  },
  closeBag() {
    set({ bagOpen: false });
  },
};

export type ResolvedLine = BagLine & { product: Product };

/** Joins bag lines with their products and works out the totals. */
export function resolveBag(bag: BagLine[]) {
  const lines: ResolvedLine[] = bag.flatMap((l) => {
    const product = products.find((p) => p.id === l.id);
    return product ? [{ ...l, product }] : [];
  });
  return { lines, count: lines.reduce((n, l) => n + l.qty, 0) };
}

export type CustomerNote = { name?: string; area?: string; date?: string; note?: string };

/** The WhatsApp order message for a whole bag. Prices are confirmed in the chat. */
export function bagMessage(lines: ResolvedLine[], customer: CustomerNote = {}): string {
  const items = lines.map((l, i) => {
    const bits = [
      l.size && `Size ${l.size}`,
      l.colour && colours[l.colour].label,
      l.tailored && "custom measurements",
    ].filter(Boolean);
    return `${i + 1}. ${l.product.name}${bits.length ? ` (${bits.join(", ")})` : ""} × ${l.qty}`;
  });
  return [
    `Hello ${site.name}! I'd like to order:`,
    "",
    ...items,
    "",
    "Please confirm the price, availability and delivery.",
    customer.name && `Name: ${customer.name}`,
    customer.area && `Delivery to: ${customer.area}`,
    customer.date && `Needed by: ${customer.date}`,
    customer.note && `Note: ${customer.note}`,
  ]
    .filter((x): x is string => typeof x === "string")
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** The WhatsApp message for ordering one product straight away. */
export function productMessage(product: Product, opts: { size?: string; colour?: ColourId; tailored?: boolean }, url: string) {
  return [
    `Hello ${site.name}! I'd like to order:`,
    `${product.name} — ${occasionLabel[product.occasion]}`,
    opts.size && `Size: ${opts.size}`,
    opts.colour && `Colour: ${colours[opts.colour].label}`,
    opts.tailored && "I'd like it made to my measurements.",
    "Please confirm the price and availability.",
    url,
  ]
    .filter(Boolean)
    .join("\n");
}
