import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/lib/products";
import { ShopView } from "@/components/shop/ShopView";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "Shop dresses",
  description: "Shop sculpted sheath dresses, pleated flares, trouser sets and skirt sets. Filter by colour and size.",
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", title: "Shop the collection" },
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-20 pt-10 md:px-10 md:pb-32 md:pt-16">
      {/* The static fallback renders the whole collection for crawlers and first paint. */}
      <Suspense
        fallback={
          <>
            <h1 className="display mb-10 text-[clamp(3.25rem,10vw,8rem)] md:mb-14">
              The <span className="accent-word">collection</span>
            </h1>
            <div className="h-28 border-b border-ink/10" />
            <div className="pt-10">
              <ProductGrid products={products} animate={false} />
            </div>
          </>
        }
      >
        <ShopView products={products} />
      </Suspense>
    </div>
  );
}
