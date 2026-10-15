import { getProducts } from "@/lib/products";
import { site } from "@/lib/site";
import { Hero } from "@/components/home/Hero";
import { Occasions } from "@/components/home/Occasions";
import { ProductRail } from "@/components/home/ProductRail";
import { StyleBand } from "@/components/home/StyleBand";
import { Editorial } from "@/components/home/Editorial";
import { ShopByColour } from "@/components/home/ShopByColour";
import { HowToOrder } from "@/components/home/HowToOrder";
import { Testimonials } from "@/components/home/Testimonials";
import { Lookbook } from "@/components/home/Lookbook";
import { CTA } from "@/components/home/CTA";
import { JsonLd } from "@/components/JsonLd";

/*
 * The walk through the boutique:
 * window (hero) → the styles → a moving type band → the edit rail → the promise → colours
 * → how ordering works → reviews → the lookbook → a stylist.
 */
export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ClothingStore",
          name: site.name,
          description: site.description,
          url: site.url,
          address: site.location,
          telephone: site.phone,
        }}
      />
      <Hero />
      <Occasions />
      <StyleBand />
      <ProductRail products={products} />
      <Editorial />
      <ShopByColour products={products} />
      <HowToOrder />
      <Testimonials />
      <Lookbook />
      <CTA />
    </>
  );
}
