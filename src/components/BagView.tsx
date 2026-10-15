"use client";

import { useState, type InputHTMLAttributes } from "react";
import { bagMessage, resolveBag, shop, useShop, type CustomerNote } from "@/lib/store";
import { site, whatsappLink } from "@/lib/site";
import { BagLines } from "@/components/BagLines";
import { Button, ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";

/**
 * The full bag. The optional details are only added to the WhatsApp message
 * the visitor sends themselves — nothing is stored or sent anywhere else.
 */
export function BagView() {
  const { bag } = useShop();
  const { lines, count } = resolveBag(bag);
  const [customer, setCustomer] = useState<CustomerNote>({});
  const [showPreview, setShowPreview] = useState(false);
  const message = bagMessage(lines, customer);

  const field = (key: keyof CustomerNote, label: string, props: InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block">
      <span className="mb-1.5 block text-sm text-ink/70">{label}</span>
      <input
        value={customer[key] ?? ""}
        onChange={(e) => setCustomer({ ...customer, [key]: e.target.value })}
        className="field"
        {...props}
      />
    </label>
  );

  if (lines.length === 0) {
    return (
      <div className="bg-blush-soft px-6 py-24 text-center">
        <p className="display text-[clamp(2.5rem,6vw,4rem)]">
          Your bag is <span className="accent-word">empty</span>
        </p>
        <p className="mx-auto mt-4 max-w-sm text-ink/65">Save pieces as you browse and they&apos;ll be waiting here.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/shop" arrow>Shop dresses</ButtonLink>
          <ButtonLink href="/wishlist" variant="outline">View wishlist</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <p className="text-sm text-ink/60">{count} {count === 1 ? "item" : "items"}</p>
          <button type="button" onClick={shop.clearBag} className="text-sm text-ink/55 underline-offset-4 hover:text-burgundy hover:underline">
            Empty bag
          </button>
        </div>
        <BagLines lines={lines} large />
      </div>

      <aside aria-labelledby="summary-title" className="lg:col-span-5">
        <div className="bg-blush-soft p-6 md:p-8 lg:sticky lg:top-24">
          <h2 id="summary-title" className="display text-[2.25rem]">
            Order <span className="accent-word">summary</span>
          </h2>
          <dl className="mt-6 space-y-2 border-b border-ink/10 pb-5 text-[0.9375rem]">
            <div className="flex justify-between"><dt className="text-ink/70">Pieces</dt><dd>{count}</dd></div>
            <div className="flex justify-between"><dt className="text-ink/70">Price & delivery</dt><dd className="text-ink/60">Confirmed on WhatsApp</dd></div>
          </dl>

          <fieldset className="mt-8 space-y-4">
            <legend className="label mb-4 text-ink/60">Add your details (optional)</legend>
            {field("name", "Your name", { autoComplete: "given-name" })}
            {field("area", "Delivery area / city", { autoComplete: "address-level2" })}
            {field("date", "Needed by", { type: "date" })}
            <label className="block">
              <span className="mb-1.5 block text-sm text-ink/70">Note for us</span>
              <textarea
                rows={3}
                value={customer.note ?? ""}
                onChange={(e) => setCustomer({ ...customer, note: e.target.value })}
                placeholder="e.g. it's for a wedding on Saturday"
                className="field resize-none"
              />
            </label>
          </fieldset>

          <ButtonLink href={whatsappLink(message)} external className="mt-8 w-full min-h-14">
            <span className="flex items-center gap-2"><WhatsAppIcon width={18} height={18} /> Send order on WhatsApp</span>
          </ButtonLink>
          <Button variant="text" onClick={() => setShowPreview(!showPreview)} aria-expanded={showPreview} className="mt-4">
            {showPreview ? "Hide message preview" : "Preview the message"}
          </Button>
          {showPreview && (
            <pre className="mt-3 whitespace-pre-wrap border border-ink/10 bg-canvas p-4 font-sans text-sm leading-relaxed text-ink/80">{message}</pre>
          )}
          <p className="mt-6 text-sm leading-relaxed text-ink/55">
            This opens WhatsApp with your order typed out. {site.name} will confirm the price, availability, delivery and payment with you.
          </p>
        </div>
      </aside>
    </div>
  );
}
