import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { EngineeredFor } from "@/components/product/EngineeredFor";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { getProductBySlug, getRelatedProducts } from "@/lib/queries";

interface Params {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Not found" };

  const ogImage = product.variants[0]?.image_urls?.[0];
  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: `${product.name} — VOLT`,
      description: product.tagline,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 900, alt: product.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — VOLT`,
      description: product.tagline,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.category, product.id, 3);

  return (
    <>
      <ProductDetailClient product={product} />
      <EngineeredFor productName={product.name} features={product.features} />
      <RelatedProducts products={related} />
    </>
  );
}
