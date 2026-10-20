import Link from "next/link";

import { homeHero, homeFooter } from "@/data/mocks/home";
import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { PointerField } from "@/components/common/pointer-field";
import { HeroHeader } from "@/views/home/hero";
import { Footer } from "@/views/home/footer";

import { FaqInteractive } from "./faq-interactive";

export const FaqView = () => (
  <div className="hero-lattice-shell relative min-h-lvh overflow-x-clip font-mono text-hero-content">
    <div aria-hidden className="hero-lattice-beam" />
    <div aria-hidden className="hero-lattice-bars" />

    <PointerField />

    <div className="relative w-full">
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
          aria-label="DUNKBULL Frequently Asked Questions"
          mode="once"
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          className="mx-auto w-full max-w-360 px-5 pt-28 pb-24 lg:px-10 lg:pt-36"
        >
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-hero-caption text-hero-content/50"
          >
            <Link href="/" className="hover:text-hero-content">
              HOME
            </Link>
            <span>/</span>
            <span className="text-hero-content">FAQ</span>
          </nav>

          {/* Heading */}
          <header className="mb-12 border-b border-hero-rule pb-8">
            <span className="mb-2 block text-hero-caption text-hero-content/50 uppercase">
              HELP CENTER // FREQUENTLY ASKED QUESTIONS
            </span>
            <Inview
              tag="h1"
              mode="once"
              from={{ opacity: 0, y: 12 }}
              to={{ opacity: 1, y: 0 }}
              className="text-hero-title leading-hero-title font-bold text-hero-content uppercase"
            >
              NEED TO KNOW.
            </Inview>
            <p className="mt-4 max-w-2xl text-hero-body leading-hero-prose text-hero-content-muted uppercase">
              Essential answers regarding garment sizing, premium material
              construction, drop schedules, and global shipping.
            </p>
          </header>

          {/* Interactive FAQ category & accordion */}
          <FaqInteractive />

          {/* Direct Support Card */}
          <Inview
            tag="section"
            mode="once"
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            className="hero-lattice-panel mt-12 flex flex-col items-start justify-between gap-6 border border-hero-rule p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <div>
              <span className="text-hero-caption font-bold text-hero-content/50 uppercase">
                STILL HAVE AN UNANSWERED QUESTION?
              </span>
              <p className="mt-1 text-hero-body text-hero-content uppercase">
                Our support team responds within 24 hours on all customer inquiries.
              </p>
            </div>
            <a
              href="mailto:support@dunkbull.com"
              className="inline-flex items-center justify-center border border-hero-content bg-hero-content px-6 py-3 text-hero-body font-bold text-hero-surface uppercase transition hover:bg-transparent hover:text-hero-content"
            >
              CONTACT SUPPORT
            </a>
          </Inview>
        </Spring>
      </main>

      <Footer content={homeFooter} />
    </div>
  </div>
);
