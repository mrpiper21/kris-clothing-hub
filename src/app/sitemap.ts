import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/shop`, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}/size-guide`, changeFrequency: "monthly", priority: 0.5 },
    ...products.map((p) => ({ url: `${site.url}/shop/${p.id}`, changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
