import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { SectionHead } from "@/components/home/SectionHead";
import { CatalogueIndex } from "@/components/home/CatalogueIndex";
import { FeatureDrop } from "@/components/home/FeatureDrop";
import { Engineering } from "@/components/home/Engineering";
import { Manifesto } from "@/components/home/Manifesto";
import { Promises } from "@/components/home/Promises";
import { Press } from "@/components/home/Press";
import { getAllProducts, getProductBySlug } from "@/lib/queries";

export const metadata: Metadata = {
  title: "VOLT — Sound, engineered.",
  description:
    "Reference-grade wireless audio, designed and assembled in Porto, Portugal. Headphones, earbuds, and speakers built for people who actually listen.",
  openGraph: {
    title: "VOLT — Sound, engineered.",
    description:
      "Reference-grade wireless audio, designed and assembled in Porto. Seven instruments. No gimmicks, no compromise.",
    url: "/",
  },
};

export const revalidate = 60;

export default async function HomePage() {
  const [products, featured] = await Promise.all([
    getAllProducts(),
    getProductBySlug("volt-field-pro"),
  ]);

  return (
    <>
      <Hero />

      <section>
        <SectionHead
          num="01 / IX"
          title={
            <>
              Catalogue, <span className="text-quiet">2026.</span>
            </>
          }
          right="Seven instruments. Available in Carbon and selected limited finishes. Shipped from Porto, Mon–Fri."
        />
        <CatalogueIndex products={products} />
      </section>

      {featured && (
        <section>
          <SectionHead
            num="02 / IX"
            title={
              <>
                Latest <span className="text-quiet">edition.</span>
              </>
            }
            right="Five years of revision. The Field Pro replaces nothing — it sets the upper bound."
          />
          <FeatureDrop product={featured} />
        </section>
      )}

      <section>
        <SectionHead
          num="03 / IX"
          title={
            <>
              Engineering, <span className="text-quiet">not feature lists.</span>
            </>
          }
          right="Every measurement comes from third-party labs. We publish them in full on each product page."
          noBorder
        />
        <Engineering />
      </section>

      <Manifesto />
      <Press />
      <Promises />
    </>
  );
}
