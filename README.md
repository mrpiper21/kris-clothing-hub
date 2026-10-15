# Kris Clothing Hub

Next.js 16 · TypeScript · Tailwind CSS v4 · Motion. Built on the same foundations as Lux Fit.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # every page is statically prerendered
```

## Pages

| Route | What it does |
| --- | --- |
| `/` | Hero, shop by style (Sheath, Flare, Trouser sets, Skirt sets), a scroll-reactive type band, tabbed "The edit" rail (New in / Bestsellers / Made to measure), the Kris promise, shop by colour, how to order, reviews, lookbook, personal styling |
| `/shop` | Style chips with live counts, colour / size / in-stock filters, sort, search within results. Every filter lives in the URL (`/shop?occasion=trouser&colour=black&size=M`) so a filtered view can be shared |
| `/shop/[id]` | Swipeable gallery with full-screen preview, colour and size pickers, size-guide pop-up, "make it to my measurements", add to bag, wishlist, order now on WhatsApp, details accordions, related pieces |
| `/bag` | Quantities, optional name / delivery area / date / note, a preview of the message, and **Send order on WhatsApp** |
| `/wishlist` | Saved pieces |
| `/size-guide` | Size chart and how to measure |

Search opens from the header or by pressing `/`. The bag and wishlist are saved in the visitor's browser (localStorage), so there are no accounts and nothing to host.

## Replacing placeholders

Placeholders are written as `[LIKE THIS]`.

| What | Where |
| --- | --- |
| WhatsApp number, phone, location, Instagram, delivery info, brand story | `src/lib/site.ts` |
| Products (name, occasion, colours, sizes, photos, details, flags such as `isNew`, `bestseller`, `tailoring`, `available`). Currently a **display catalogue** | `src/data/products.ts` |
| Hero, occasion, editorial, lookbook photography; reviews; how-to-order steps | `src/data/media.ts` |
| Colour palette for swatches and filters | `src/data/colours.ts` |
| Size chart | `src/data/sizes.ts` |
| Production URL (for SEO, sitemap, WhatsApp links) | `NEXT_PUBLIC_SITE_URL` env var |

**WhatsApp:** use the international format without `+` (e.g. `233XXXXXXXXX`). Until it's set, links open WhatsApp's contact picker with the message filled in.

**Reviews:** the three reviews are placeholders. Replace them with real customer reviews (with permission) — don't publish invented ones.

**No prices:** products deliberately have no price field. The site never shows a price; the bag and order messages ask the business to confirm price, availability and delivery on WhatsApp.

**Photos:** all photography is the boutique's own, in `public/images/` (renamed to match each product, e.g. `/images/scarlet-button-sheath.jpg`). In `products.ts`, `image` is the main photo and `gallery` holds the rest; brand photos (hero, style tiles, editorial, lookbook) are set in `src/data/media.ts`. Names, fabrics and details were written from the photos — check them against real stock. `teal-button-trouser-set.jpg` carries a small "Xender" mark in the top corner; swap it for a clean copy if you have one.

**Styles:** the `occasion` field now holds the style family (`sheath`, `flare`, `trouser`, `skirt`). The name and the `?occasion=` URL param were kept so existing links keep working.

## Structure

```
src/
  app/                  routes: /, /shop, /shop/[id], /bag, /wishlist, /size-guide, sitemap, robots, 404
  components/home/      Hero, Occasions, ProductRail, Editorial, ShopByColour, HowToOrder, Testimonials, Lookbook, CTA
  components/shop/      ShopView, FilterPanel
  components/product/   ProductDetail, ProductGallery, SizeTable, Accordion
  components/           Navbar, AnnouncementBar, SearchOverlay, BagDrawer, BagLines, BagView, WishlistView,
                        ProductCard, ProductGrid, Swatches, WishlistButton, Footer
  components/ui/        Button, Media, Reveal, Drawer, Icons
  data/                 local content (swap for an API later)
  lib/products.ts       data access + filtering, sorting, search, price formatting
  lib/store.ts          bag and wishlist (localStorage) + WhatsApp message builders
  lib/site.ts           business config + link helpers
```

To move to an API later, replace the bodies of `getProducts`, `getProduct` and `getRelatedProducts` in `src/lib/products.ts`. Components depend only on the `Product` type.

## Design rules

- Burgundy `#6D1A36` (deep `#4B0F24`) with light pinks: blush `#F6E3E7`, blush-soft `#FBF1F3`, petal `#E7B8C3`, on white. Text is wine-black `#2A1219`. No gradients.
- Every Tailwind radius token, including `rounded-full`, is `0`, so all corners stay sharp. Icons use square line caps to match.
- Type: Cormorant Garamond for headlines, with one italic burgundy accent word per headline (`.accent-word`); Inter Tight for everything else.
- Motion lives in `src/components/motion/`: masked headline reveals (`MaskText`), curtain photo wipes (`ImageReveal`), scroll parallax (`Parallax`), pointer tilt (`Tilt`), magnetic buttons (`Magnetic`), the scroll-reactive type band (`VelocityMarquee`), a reading-progress line, a "View / Shop" cursor tag on mouse devices, and a back-to-top button. Shop filtering re-flows the grid with layout animation; route changes fade the new page in (`app/template.tsx`).
- Motion respects `prefers-reduced-motion`: pointer and scroll effects switch off, and reveals show content straight away. Dialogs trap focus, close on Escape and return focus to the button that opened them.
# kris-clothing-hub
