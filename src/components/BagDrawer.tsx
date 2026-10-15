"use client";

import { bagMessage, resolveBag, shop, useShop } from "@/lib/store";
import { whatsappLink } from "@/lib/site";
import { Drawer } from "@/components/ui/Drawer";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { BagLines } from "@/components/BagLines";

/** Slide-out bag. Opens whenever something is added. */
export function BagDrawer() {
  const { bag, bagOpen } = useShop();
  const { lines, count } = resolveBag(bag);

  return (
    <Drawer
      open={bagOpen}
      onClose={shop.closeBag}
      title={`Your bag${count ? ` (${count})` : ""}`}
      footer={
        lines.length > 0 && (
          <div className="space-y-3 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 md:px-7">
            <p className="text-sm leading-relaxed text-ink/60">Prices, availability and delivery are confirmed with you on WhatsApp.</p>
            <ButtonLink href={whatsappLink(bagMessage(lines))} external className="w-full">
              <span className="flex items-center gap-2"><WhatsAppIcon width={18} height={18} /> Checkout on WhatsApp</span>
            </ButtonLink>
            <ButtonLink href="/bag" variant="outline" className="w-full" onClick={shop.closeBag}>
              View bag & add details
            </ButtonLink>
          </div>
        )
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
          <p className="display text-[2.5rem]">
            Your bag is <span className="accent-word">empty</span>
          </p>
          <p className="mt-3 max-w-xs text-ink/65">Find something for your next occasion.</p>
          <ButtonLink href="/shop" arrow className="mt-8" onClick={shop.closeBag}>
            Shop dresses
          </ButtonLink>
        </div>
      ) : (
        <div className="px-5 md:px-7">
          <BagLines lines={lines} onNavigate={shop.closeBag} />
        </div>
      )}
    </Drawer>
  );
}
