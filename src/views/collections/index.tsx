import Link from "next/link";
import type { Metadata } from "next";

import { products } from "@/data/products";
import { homeHero } from "@/data/mocks/home";
import { generateMetadata as gen } from "@/utils/seo/generate-page-metadata";

import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { PointerField } from "@/components/common/pointer-field";
import { HeroHeader } from "@/views/home/hero";
import { Footer } from "@/views/home/footer";
import { homeFooter } from "@/data/mocks/home";

import { CollectionsFilter } from "./collections-filter";

export const collectionsMetadata: Metadata = gen({
  title: "Collections — DUNKBULL",
  description: "Explore the full DUNKBULL collection of oversized 260 GSM heavyweight cotton t-shirts.",
  url: "/collections",
});

/**
 * Collections catalog view — Server Component shell.
 *
 * Renders the brand header, catalog hero, and delegates interactive
 * filtering and quick-add to the `CollectionsFilter` client leaf.
 */
export const CollectionsView = () => (
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
          tag="section"
          aria-label="DUNKBULL Collections Catalog"
          mode="once"
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          className="mx-auto w-full max-w-360 px-5 pt-28 pb-24 lg:px-10 lg:pt-36"
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-hero-caption text-hero-content/50">
            <Link href="/" className="hover:text-hero-content">
              HOME
            </Link>
            <span>/</span>
            <span className="text-hero-content">COLLECTIONS</span>
          </nav>

          {/* Heading */}
          <div className="mb-12 flex flex-col gap-4 border-b border-hero-rule pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Inview
                tag="h1"
                mode="once"
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                className="text-hero-display-compact leading-hero-headline tracking-hero-display [text-box:trim-both_cap_alphabetic] sm:text-hero-display-tablet lg:text-hero-display"
              >
                COLLECTIONS.
              </Inview>
              <p className="mt-3 max-w-xl text-hero-body text-hero-content-muted">
                Heavyweight 260 GSM combed cotton t-shirts engineered with architectural drop-shoulder drape and signature branding.
              </p>
            </div>
            <div className="text-hero-caption text-hero-content/40">
              [ 2026 HEAVYWEIGHT TEE DROP ]
            </div>
          </div>

          {/* Filter & Product Grid */}
          <CollectionsFilter products={products} />
        </Spring>
      </main>

      {/* Footer */}
      <Footer content={homeFooter} />
    </div>
  </div>
);
