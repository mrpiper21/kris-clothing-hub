"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useAnimationControls } from "motion/react";
import { colours, lightColours } from "@/data/colours";
import type { ColourId, Product } from "@/types/product";
import { occasionLabel, productAlt, productImages } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import { productMessage, shop } from "@/lib/store";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AccordionItem } from "@/components/product/Accordion";
import { MeasureTips, SizeTable } from "@/components/product/SizeTable";
import { WishlistButton } from "@/components/WishlistButton";
import { Drawer } from "@/components/ui/Drawer";
import { Button, ButtonLink } from "@/components/ui/Button";
import { RulerIcon, ScissorsIcon, TruckIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

export function ProductDetail({ product }: { product: Product }) {
  const [colour, setColour] = useState<ColourId>(product.colours[0]);
  const [size, setSize] = useState<string | null>(null);
  const [tailored, setTailored] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [needSize, setNeedSize] = useState(false);
  const shake = useAnimationControls();

  const images = productImages(product);
  const soldOut = product.available === false;
  const sizeRequired = product.sizes.length > 0 && !tailored;

  const pageUrl = `${site.url}/shop/${product.id}`;
  const orderHref = whatsappLink(productMessage(product, { size: size ?? undefined, colour, tailored }, pageUrl));
  const askHref = whatsappLink(`Hello ${site.name}! I have a question about the ${product.name}.\n${pageUrl}`);

  function addToBag() {
    if (sizeRequired && !size) {
      setNeedSize(true);
      shake.start({ x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.4 } });
      document.getElementById("size-picker")?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    shop.addToBag({ id: product.id, size: tailored ? undefined : size ?? undefined, colour, tailored });
  }

  return (
    <div className="mx-auto max-w-[1600px] md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8 lg:gap-12">
        <div className="md:col-span-7">
          <ProductGallery images={images} alt={productAlt(product)} />
        </div>

        <div className="px-5 pb-32 pt-8 md:col-span-5 md:px-0 md:pb-0 md:pt-0 lg:col-span-4 lg:col-start-9">
          <div className="md:sticky md:top-24">
            <nav aria-label="Breadcrumb" className="text-sm text-ink/55">
              <Link href="/shop" className="link-line">Shop</Link>
              <span aria-hidden> / </span>
              <Link href={`/shop?occasion=${product.occasion}`} className="link-line">{occasionLabel[product.occasion]}</Link>
            </nav>

            <div className="mt-8 flex flex-wrap gap-2">
              {product.isNew && <span className="bg-blush px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.1em] text-burgundy">New in</span>}
              {product.bestseller && <span className="bg-blush px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.1em] text-burgundy">Bestseller</span>}
            </div>

            <h1 className="display mt-4 text-[clamp(2.5rem,4.5vw,3.75rem)]">{product.name}</h1>
            <p className="mt-4 text-sm text-ink/60">
              {soldOut ? "Sold out — ask us about a restock." : "Price and availability confirmed on WhatsApp."}
            </p>

            <p className="mt-6 max-w-prose leading-relaxed text-ink/80">{product.description}</p>

            {/* Colour */}
            <fieldset className="mt-8">
              <legend className="mb-3 text-sm">
                Colour: <span className="text-ink/60">{colours[colour].label}</span>
              </legend>
              <div className="flex flex-wrap gap-3">
                {product.colours.map((c) => (
                  <label key={c} className="cursor-pointer">
                    <input type="radio" name="colour" value={c} checked={colour === c} onChange={() => setColour(c)} className="peer sr-only" />
                    <span
                      title={colours[c].label}
                      className={cn(
                        "block h-9 w-9 transition-[outline-color] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-burgundy",
                        colour === c ? "outline outline-2 outline-offset-[3px] outline-burgundy" : lightColours.includes(c) && "outline outline-1 -outline-offset-1 outline-ink/20",
                      )}
                      style={{ background: colours[c].hex }}
                    />
                    <span className="sr-only">{colours[c].label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Size */}
            <motion.fieldset id="size-picker" animate={shake} className={cn("mt-8 transition-opacity", tailored && "pointer-events-none opacity-40")} disabled={tailored}>
              <legend className="mb-3 flex w-full items-center justify-between text-sm">
                <span>
                  Size: <span className={needSize && !size ? "text-burgundy" : "text-ink/60"}>{size ?? (needSize ? "please choose a size" : "choose")}</span>
                </span>
                <button type="button" onClick={() => setGuideOpen(true)} className="pointer-events-auto flex items-center gap-1.5 text-ink/70 underline-offset-4 hover:text-burgundy hover:underline">
                  <RulerIcon width={18} height={18} /> Size guide
                </button>
              </legend>
              <div className="grid grid-cols-6 gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={size === s}
                    onClick={() => {
                      setSize(size === s ? null : s);
                      setNeedSize(false);
                    }}
                    className={cn(
                      "min-h-12 border text-sm transition-colors",
                      size === s ? "border-burgundy bg-burgundy text-canvas" : needSize ? "border-burgundy/50 hover:border-burgundy" : "border-ink/15 hover:border-burgundy",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.fieldset>

            {product.tailoring && (
              <label className="mt-4 flex cursor-pointer items-start gap-3 bg-blush-soft p-4 text-sm">
                <input type="checkbox" checked={tailored} onChange={(e) => setTailored(e.target.checked)} className="peer sr-only" />
                <span aria-hidden className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border border-burgundy peer-checked:bg-burgundy peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-burgundy">
                  <svg viewBox="0 0 12 12" className={cn("h-3 w-3 text-canvas", !tailored && "invisible")} fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 6.5 5 9l5-6" /></svg>
                </span>
                <span>
                  <span className="flex items-center gap-2 font-medium text-burgundy"><ScissorsIcon width={16} height={16} /> Make it to my measurements</span>
                  <span className="mt-1 block text-ink/65">We&apos;ll ask for your bust, waist, hips and height on WhatsApp.</span>
                </span>
              </label>
            )}

            <div className="mt-8 hidden gap-2 md:grid">
              <div className="flex gap-2">
                <Button onClick={addToBag} disabled={soldOut} className="min-h-14 flex-1">
                  {soldOut ? "Sold out" : "Add to bag"}
                </Button>
                <WishlistButton id={product.id} name={product.name} variant="outline" className="h-14 w-14" />
              </div>
              <ButtonLink href={soldOut ? askHref : orderHref} external variant="outline">
                <span className="flex items-center gap-2">
                  <WhatsAppIcon width={18} height={18} /> {soldOut ? "Ask about restock" : "Order now on WhatsApp"}
                </span>
              </ButtonLink>
            </div>

            <div className="mt-8 border-t border-ink/10">
              <AccordionItem title="Details & fabric" defaultOpen>
                <ul className="list-inside list-[square] space-y-1 marker:text-petal">
                  {product.details.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </AccordionItem>
              <AccordionItem title="Delivery & payment">
                <p className="flex gap-3"><TruckIcon className="mt-0.5 shrink-0 text-burgundy" width={18} height={18} /> {site.delivery}</p>
                <p className="mt-3">Payment and delivery details are confirmed with you on WhatsApp before anything is sent.</p>
              </AccordionItem>
              <AccordionItem title="Questions?">
                <p>Not sure about fit or colour? Send us a message and we&apos;ll help you choose.</p>
                <a href={askHref} target="_blank" rel="noopener noreferrer" className="link-line mt-3 inline-block text-burgundy">Ask on WhatsApp →</a>
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: the buy buttons stay within thumb reach */}
      <div data-order-bar className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-2 border-t border-ink/10 bg-canvas px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <div className="min-w-0 flex-1 text-sm">
          <p className="truncate">{product.name}</p>
          <p className="text-ink/60">
            {tailored ? "Made to measure" : size ? `Size ${size}` : "Choose a size"}
          </p>
        </div>
        <WishlistButton id={product.id} name={product.name} variant="outline" className="h-12 w-12" />
        <Button onClick={addToBag} disabled={soldOut} className="min-h-12 shrink-0 px-5">
          {soldOut ? "Sold out" : "Add to bag"}
        </Button>
      </div>

      <Drawer open={guideOpen} onClose={() => setGuideOpen(false)} title="Size guide" side="center">
        <div className="space-y-8 p-5 md:p-7">
          <p className="text-sm text-ink/70">Body measurements in centimetres. Between sizes? Choose the larger, or tick “make it to my measurements”.</p>
          <SizeTable highlight={size} />
          <MeasureTips />
        </div>
      </Drawer>
    </div>
  );
}
