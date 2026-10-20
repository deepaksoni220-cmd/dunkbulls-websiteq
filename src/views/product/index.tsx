import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { products, getProductBySlug } from "@/data/products";
import { homeHero, homeFooter } from "@/data/mocks/home";
import { generateMetadata as gen } from "@/utils/seo/generate-page-metadata";

import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { PointerField } from "@/components/common/pointer-field";
import { HeroHeader } from "@/views/home/hero";
import { Footer } from "@/views/home/footer";

import { ProductGallery } from "./product-gallery";
import { ProductPurchase } from "./product-purchase";
import { ProductRelated } from "./product-related";
import { ProductSpecs } from "./product-specs";

export async function getProductStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateProductMetadata(slug: string): Promise<Metadata> {
  const product = getProductBySlug(slug);

  if (!product) {
    return gen({
      title: "Product Not Found — DUNKBULL",
      description: "The requested DUNKBULL product could not be found.",
    });
  }

  return gen({
    title: `${product.name} (${product.price}) — DUNKBULL`,
    description: product.lede,
    url: `/products/${product.slug}`,
    ogImage: product.images[0]?.src,
  });
}

export interface ProductViewProps {
  slug: string;
}

export const ProductView = ({ slug }: ProductViewProps) => {
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="hero-lattice-shell relative min-h-lvh overflow-x-clip font-mono text-hero-content">
      <div aria-hidden className="hero-lattice-beam" />
      <div aria-hidden className="hero-lattice-bars" />

      <PointerField />

      <div className="relative w-full">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 max-lg:hero-lattice-panel max-lg:border-b max-lg:border-hero-rule lg:h-0">
          <HeroHeader
            logo={homeHero.logo}
            nav={homeHero.nav}
            cart={homeHero.cart}
          />
        </div>

        <main id="main">
          <Spring
            tag="article"
            aria-labelledby="product-title"
            mode="once"
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            className="mx-auto w-full max-w-360 px-5 pt-28 pb-24 lg:px-10 lg:pt-36"
          >
            {/* Breadcrumb navigation */}
            <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-hero-caption text-hero-content/50">
              <Link href="/" className="hover:text-hero-content">
                HOME
              </Link>
              <span>/</span>
              <Link href="/collections" className="hover:text-hero-content">
                COLLECTIONS
              </Link>
              <span>/</span>
              <span className="text-hero-content">{product.name}</span>
            </nav>

            {/* Product Main Section: 2 Columns on desktop */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left Column: Interactive Multi-angle Gallery */}
              <ProductGallery images={product.images} name={product.name} />

              {/* Right Column: Title, Pricing, Lede, Size Selector, Cart CTA, Specs */}
              <div className="flex flex-col gap-8">
                {/* Category & Tags Header */}
                <div className="flex items-center gap-3">
                  <span className="border border-hero-rule px-2 py-0.5 text-hero-caption text-hero-content/60">
                    {`${product.index} // ${product.category}`}
                  </span>
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-hero-rule px-2 py-0.5 text-hero-caption text-hero-content/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title & Price */}
                <div className="flex flex-col gap-2">
                  <Inview
                    tag="h1"
                    id="product-title"
                    mode="once"
                    from={{ opacity: 0, y: 12 }}
                    to={{ opacity: 1, y: 0 }}
                    className="text-hero-display-compact leading-hero-headline tracking-hero-display sm:text-hero-display-tablet"
                  >
                    {product.name}
                  </Inview>
                  <p className="text-hero-title text-hero-content">
                    {product.price} <span className="text-hero-caption text-hero-content/50 font-normal">INR</span>
                  </p>
                </div>

                {/* Standfirst / Lede */}
                <p className="text-hero-body leading-hero-prose text-hero-content-muted">
                  {product.lede}
                </p>

                {/* Size picker, Quantity & Add to Cart Client Component */}
                <ProductPurchase product={product} />

                {/* Technical Specs & Details */}
                <ProductSpecs product={product} />
              </div>
            </div>
          </Spring>

          {/* Related Products Section */}
          <ProductRelated currentProductId={product.id} />
        </main>

        {/* Footer */}
        <Footer content={homeFooter} />
      </div>
    </div>
  );
};
