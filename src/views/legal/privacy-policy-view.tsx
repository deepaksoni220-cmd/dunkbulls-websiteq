import Link from "next/link";

import { homeHero, homeFooter } from "@/data/mocks/home";
import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { PointerField } from "@/components/common/pointer-field";
import { HeroHeader } from "@/views/home/hero";
import { Footer } from "@/views/home/footer";

const PRIVACY_SECTIONS = [
  {
    index: "01",
    title: "INTRODUCTION & OVERVIEW",
    content:
      "DUNKBULL ('we', 'us', or 'our') is dedicated to safeguarding your personal data and upholding transparency regarding how your information is collected, processed, and secured. This Privacy Policy governs your use of dunkbull.com and all associated services, drops, and digital experiences.",
  },
  {
    index: "02",
    title: "INFORMATION WE COLLECT",
    content:
      "When you purchase from our limited releases or browse our catalog, we collect essential fulfillment information including your full name, shipping and billing address, email address, phone number, and encrypted payment transaction tokens. We also log standard technical device parameters, IP address, and browser characteristics necessary to maintain secure browsing sessions and combat automated bot ordering.",
  },
  {
    index: "03",
    title: "HOW YOUR INFORMATION IS USED",
    content:
      "Your personal information is used exclusively to: process and dispatch your orders, communicate real-time shipment tracking, authenticate account credentials, prevent fraudulent transactions during high-demand drops, and provide direct customer support. If you opt in to our drop dispatch list, we will send release notices directly to your email.",
  },
  {
    index: "04",
    title: "PAYMENT PROCESSING & ENCRYPTION",
    content:
      "DUNKBULL does not store raw credit card numbers or payment credentials on our servers. All financial transactions are processed through certified Level 1 PCI-DSS compliant payment gateways with 256-bit SSL/TLS end-to-end encryption. Your financial data is securely tokenized at point of sale.",
  },
  {
    index: "05",
    title: "THIRD-PARTY LOGISTICS & SERVICES",
    content:
      "We share order delivery information solely with vetted fulfillment and shipping logistics partners (e.g. DHL Express, FedEx Priority) strictly to deliver your parcels. We never sell, lease, or monetize your personal details to advertising networks or third-party data brokers under any circumstances.",
  },
  {
    index: "06",
    title: "COOKIES & LOCAL STORAGE",
    content:
      "Our website utilizes essential session cookies and local storage tokens to remember your shopping cart items, selected colorway preferences, and cookie consent choices. You can modify your cookie settings at any time using our Cookie Preferences panel in the footer.",
  },
  {
    index: "07",
    title: "YOUR DATA RIGHTS (GDPR / CCPA)",
    content:
      "Depending on your jurisdiction, you maintain the full right to: request a copy of the personal information we hold about you, request rectification of any errors, request deletion of your stored records, or withdraw consent for marketing dispatches at any time without penalty.",
  },
  {
    index: "08",
    title: "CONTACT OUR DATA TEAM",
    content:
      "If you have inquiries, concerns, or requests regarding this Privacy Policy or your personal data, please contact our privacy compliance desk directly at privacy@dunkbull.com or support@dunkbull.com.",
  },
];

export const PrivacyPolicyView = () => (
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
          aria-label="DUNKBULL Privacy Policy"
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
            <span className="text-hero-content">PRIVACY POLICY</span>
          </nav>

          {/* Heading */}
          <header className="mb-12 border-b border-hero-rule pb-8">
            <span className="mb-2 block text-hero-caption text-hero-content/50 uppercase">
              LEGAL DOCUMENTATION // REV. 2026.1
            </span>
            <Inview
              tag="h1"
              mode="once"
              from={{ opacity: 0, y: 12 }}
              to={{ opacity: 1, y: 0 }}
              className="text-hero-title leading-hero-title font-bold text-hero-content uppercase"
            >
              PRIVACY POLICY.
            </Inview>
            <p className="mt-4 max-w-2xl text-hero-body leading-hero-prose text-hero-content-muted uppercase">
              How DUNKBULL collects, protects, and governs your information
              across our global technical drops and digital platforms.
            </p>
          </header>

          {/* Policy Sections */}
          <div className="flex flex-col gap-6">
            {PRIVACY_SECTIONS.map((sec, i) => (
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
                    {"// SECTION "}{sec.index}
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
                HAVE QUESTIONS ABOUT YOUR DATA?
              </span>
              <p className="mt-1 text-hero-body text-hero-content uppercase">
                Contact our compliance team for rapid assistance.
              </p>
            </div>
            <a
              href="mailto:support@dunkbull.com"
              className="inline-flex items-center justify-center border border-hero-content bg-hero-content px-6 py-3 text-hero-body font-bold text-hero-surface uppercase transition hover:bg-transparent hover:text-hero-content"
            >
              CONTACT COMPLIANCE
            </a>
          </Inview>
        </Spring>
      </main>

      <Footer content={homeFooter} />
    </div>
  </div>
);
