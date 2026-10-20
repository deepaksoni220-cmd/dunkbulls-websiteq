import type { Metadata } from "next";

import { homeHero, homeFooter } from "@/data/mocks/home";
import { generateMetadata as gen } from "@/utils/seo/generate-page-metadata";

import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { PointerField } from "@/components/common/pointer-field";
import { HeroHeader } from "@/views/home/hero";
import { Footer } from "@/views/home/footer";

import { CartBody } from "./cart-body";

export const cartMetadata: Metadata = gen({
  title: "Cart — DUNKBULL",
  description: "Review your selected items and proceed to checkout.",
  url: "/cart",
});

/**
 * Cart view — Server Component shell.
 *
 * The lattice shell, sticky header, and page heading are all server-rendered.
 * `CartBody` is the client leaf that subscribes to the Zustand cart store and
 * renders the item list + order summary reactively.
 */
export const CartView = () => (
  <div className="hero-lattice-shell relative min-h-lvh overflow-x-clip font-mono text-hero-content">
    <div aria-hidden className="hero-lattice-beam" />
    <div aria-hidden className="hero-lattice-bars" />

    <PointerField />

    <div className="relative w-full">
      {/* Shared sticky header */}
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
          aria-label="Shopping cart"
          mode="once"
          from={{ opacity: 0, y: 12 }}
          to={{ opacity: 1, y: 0 }}
          className="mx-auto w-full max-w-360 px-5 pt-28 pb-24 lg:px-10 lg:pt-36"
        >
          <Inview
            tag="h1"
            mode="once"
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            className="mb-10 text-hero-display-compact leading-hero-headline tracking-hero-display [text-box:trim-both_cap_alphabetic] sm:text-hero-display-tablet lg:text-hero-display"
          >
            CART.
          </Inview>

          {/* Client leaf — reactive to the cart store */}
          <CartBody />
        </Spring>
      </main>

      <Footer content={homeFooter} />
    </div>
  </div>
);
