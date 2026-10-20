import Link from "next/link";

import { homeHero, homeFooter } from "@/data/mocks/home";
import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { PointerField } from "@/components/common/pointer-field";
import { HeroHeader } from "@/views/home/hero";
import { Footer } from "@/views/home/footer";

const TERMS_SECTIONS = [
  {
    index: "01",
    title: "ACCEPTANCE OF TERMS",
    content:
      "By accessing, browsing, or placing an order on dunkbull.com, you agree to be legally bound by these Terms & Conditions, our Privacy Policy, and any additional guidelines published across our services. If you do not agree with any provision, please discontinue use immediately.",
  },
  {
    index: "02",
    title: "INTELLECTUAL PROPERTY",
    content:
      "All visual elements, 3D product models, garment silhouettes, trademarks, emblems, typography, brand wordmarks, and digital assets appearing on this platform are the exclusive intellectual property of DUNKBULL. Reproduction, retransmission, or commercial misuse without explicit written license is strictly prohibited.",
  },
  {
    index: "03",
    title: "LIMITED DROPS & AVAILABILITY",
    content:
      "All DUNKBULL garments (including our signature Oversized 260 GSM Heavyweight Tees) are engineered in strictly limited production runs. Placing an item in your digital cart does not reserve or guarantee inventory until checkout completion and payment authorization are finalized.",
  },
  {
    index: "04",
    title: "PRICING & CURRENCY",
    content:
      "Prices are displayed in your detected regional currency or USD and are subject to adjustment without prior notice. While we strive for complete pricing accuracy, in the event of an inadvertent technical listing error, we reserve the right to cancel affected orders and issue a full prompt refund.",
  },
  {
    index: "05",
    title: "BOT PREVENTION & ORDER VERIFICATION",
    content:
      "To ensure fair and equitable access to all releases, DUNKBULL employs real-time algorithmic fraud detection. We reserve the right to decline, flag, or void any orders placed via automated checkout scripts, proxy networks, duplicate card attempts, or commercial resellers.",
  },
  {
    index: "06",
    title: "PRODUCT REPRESENTATION",
    content:
      "We take rigorous measures to display accurate colorways, fabric textures, and garment drape through calibrated 4K diffuse imagery and interactive 3D viewers. However, individual screen calibration, ambient lighting, and device color gamuts may cause minor visual variations.",
  },
  {
    index: "07",
    title: "LIMITATION OF LIABILITY",
    content:
      "DUNKBULL shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our products or digital store, to the fullest extent permitted by applicable commercial law.",
  },
  {
    index: "08",
    title: "GOVERNING LAW & JURISDICTION",
    content:
      "These terms and any purchase contracts entered into through DUNKBULL shall be governed by and construed in accordance with standard commercial regulations, without regard to conflict of law principles.",
  },
];

export const TermsView = () => (
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
          aria-label="DUNKBULL Terms & Conditions"
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
            <span className="text-hero-content">TERMS & CONDITIONS</span>
          </nav>

          {/* Heading */}
          <header className="mb-12 border-b border-hero-rule pb-8">
            <span className="mb-2 block text-hero-caption text-hero-content/50 uppercase">
              LEGAL TERMS // STANDARD OPERATING CONDITIONS
            </span>
            <Inview
              tag="h1"
              mode="once"
              from={{ opacity: 0, y: 12 }}
              to={{ opacity: 1, y: 0 }}
              className="text-hero-title leading-hero-title font-bold text-hero-content uppercase"
            >
              TERMS & CONDITIONS.
            </Inview>
            <p className="mt-4 max-w-2xl text-hero-body leading-hero-prose text-hero-content-muted uppercase">
              The operational rules, drop protocols, and contractual agreements
              governing your purchases and engagement with DUNKBULL.
            </p>
          </header>

          {/* Policy Sections */}
          <div className="flex flex-col gap-6">
            {TERMS_SECTIONS.map((sec, i) => (
              <Inview
                tag="article"
                key={sec.index}
                mode="once"
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                delayIn={i * 40}
                className="hero-lattice-panel flex flex-col gap-4 border border-hero-rule p-6 lg:flex-row lg:items-start lg:gap-12 lg:p-8"
              >
                <div className="flex shrink-0 items-center gap-4 lg:w-64 lg:flex-col lg:items-start lg:gap-2">
                  <span className="text-hero-caption font-bold text-hero-content/40">
                    {"// CLAUSE "}{sec.index}
                  </span>
                  <h2 className="text-hero-body leading-hero-display font-bold text-hero-content uppercase">
                    {sec.title}
                  </h2>
                </div>

                <div className="min-w-px flex-1 border-t border-hero-rule pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                  <p className="text-hero-body leading-hero-prose text-hero-content-muted uppercase">
                    {sec.content}
                  </p>
                </div>
              </Inview>
            ))}
          </div>

          {/* Legal Advisory Note */}
          <Inview
            tag="section"
            mode="once"
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            className="hero-lattice-panel mt-12 flex flex-col items-start justify-between gap-6 border border-hero-rule p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <div>
              <span className="text-hero-caption font-bold text-hero-content/50 uppercase">
                NEED LEGAL CLARIFICATION?
              </span>
              <p className="mt-1 text-hero-body text-hero-content uppercase">
                Reach out to legal operations regarding orders or disputes.
              </p>
            </div>
            <a
              href="mailto:support@dunkbull.com"
              className="inline-flex items-center justify-center border border-hero-content bg-hero-content px-6 py-3 text-hero-body font-bold text-hero-surface uppercase transition hover:bg-transparent hover:text-hero-content"
            >
              CONTACT LEGAL DESK
            </a>
          </Inview>
        </Spring>
      </main>

      <Footer content={homeFooter} />
    </div>
  </div>
);
