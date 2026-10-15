import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts, getRelatedProducts, occasionLabel, productAlt } from "@/lib/products";
import { isPlaceholder, site } from "@/lib/site";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductCard } from "@/components/ProductCard";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/ui/Reveal";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return {};

  const title = `${product.name} — ${occasionLabel[product.occasion]}`;
  const image = isPlaceholder(product.image) ? undefined : product.image;

  return {
    title,
    description: product.description,
    alternates: { canonical: `/shop/${product.id}` },
    openGraph: {
      title,
      description: product.description,
      url: `/shop/${product.id}`,
      ...(image && { images: [{ url: image, alt: productAlt(product) }] }),
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/shop/[id]">) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const url = `${site.url}/shop/${product.id}`;

  return (
    <div className="md:pt-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          category: occasionLabel[product.occasion],
          sku: product.id,
          url,
          ...(!isPlaceholder(product.image) && { image: new URL(product.image, site.url).toString() }),
        }}
      />

      <ProductDetail product={product} />

      <section aria-labelledby="related-title" className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-28">
        <h2 id="related-title" className="display mb-10 text-[clamp(2.5rem,5vw,4.5rem)] md:mb-14">
          Complete the <span className="accent-word">look</span>
        </h2>
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0">
          {related.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.06} className="w-[62vw] shrink-0 snap-start sm:w-[40vw] md:w-auto">
              <ProductCard product={p} sizes="(min-width: 768px) 25vw, 62vw" />
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
