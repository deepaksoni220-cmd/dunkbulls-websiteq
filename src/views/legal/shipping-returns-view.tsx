import Link from "next/link";

import { homeHero, homeFooter } from "@/data/mocks/home";
import { Inview } from "@/components/animation/springs/in-view";
import { Spring } from "@/components/animation/springs/spring";
import { PointerField } from "@/components/common/pointer-field";
import { HeroHeader } from "@/views/home/hero";
import { Footer } from "@/views/home/footer";

const LOGISTICS_STATS = [
  { value: "24-48H", label: "DISPATCH TIME", caption: "Orders prepared & checked" },
  { value: "2-4 DAYS", label: "DOMESTIC", caption: "DHL Express priority" },
  { value: "4-7 DAYS", label: "INTERNATIONAL", caption: "Worldwide tracked express" },
  { value: "14 DAYS", label: "RETURN WINDOW", caption: "Hassle-free unworn returns" },
];

const SHIPPING_SECTIONS = [
  {
    index: "01",
    title: "WORLDWIDE FULFILLMENT & CARRIERS",
    content:
      "All DUNKBULL garments are dispatched from our central distribution hub in temperature-controlled, sealed anti-static protective garment packaging. We partner exclusively with premium logistics couriers including DHL Express, FedEx Priority, and UPS Air to guarantee secure end-to-end handoff.",
  },
  {
    index: "02",
    title: "DISPATCH & TRACKING TIMELINES",
    content:
      "Orders placed before 2:00 PM EST are typically processed and handed to our shipping carrier within 24 to 48 business hours. As soon as your parcel is scanned into transit, you will automatically receive a confirmation dispatch email containing your dedicated real-time tracking number.",
  },
  {
    index: "03",
    title: "CUSTOMS, DUTIES & TAXES",
    content:
      "International deliveries may be subject to local import taxes, VAT, or customs clearance fees determined by your national border authorities. For select eligible regions, duties are calculated and prepaid at checkout (DDP) to ensure immediate door-to-door delivery without holding delays.",
  },
  {
    index: "04",
    title: "14-DAY RETURN POLICY",
    content:
      "We offer a 14-day return window starting from the recorded delivery date. To be eligible for a full refund or store exchange, garments must remain in pristine, brand-new condition: unworn, unwashed, unaltered, and with all original silicone badges, woven neck tags, and packaging intact.",
  },
  {
    index: "05",
    title: "EXCHANGES & SIZE ADJUSTMENTS",
    content:
      "Need a different fit? If your desired size is in stock, we offer expedited size swaps without restocking penalties. Because our releases are strictly limited, we recommend initiating your exchange request as early as possible before sizes sell out.",
  },
  {
    index: "06",
    title: "HOW TO INITIATE A RETURN",
    content:
      "To start a return, email returns@dunkbull.com with your original Order Number (e.g. #DB-1042) and reason for return. Our support desk will generate a pre-paid printable return shipping slip and instructions for dropping off your package at the nearest carrier depot.",
  },
  {
    index: "07",
    title: "REFUND PROCESSING SPEED",
    content:
      "Once your returned garment arrives at our warehouse and passes fabric inspection (usually within 48 hours of receipt), your refund will be immediately credited to your original payment method. Depending on your financial institution, funds appear on your statement in 3 to 5 business days.",
  },
  {
    index: "08",
    title: "DAMAGED OR LOST SHIPMENTS",
    content:
      "Every shipment is insured against transit damage or carrier loss. In the unlikely event that your parcel arrives damaged or fails to deliver within carrier SLA windows, notify us within 7 days at support@dunkbull.com so we can file an immediate replacement or full reimbursement claim.",
  },
];

export const ShippingReturnsView = () => (
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
          aria-label="DUNKBULL Shipping & Returns"
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
            <span className="text-hero-content">SHIPPING & RETURNS</span>
          </nav>

          {/* Heading */}
          <header className="mb-12 border-b border-hero-rule pb-8">
            <span className="mb-2 block text-hero-caption text-hero-content/50 uppercase">
              GLOBAL LOGISTICS // EXPRESS FULFILLMENT PROTOCOL
            </span>
            <Inview
              tag="h1"
              mode="once"
              from={{ opacity: 0, y: 12 }}
              to={{ opacity: 1, y: 0 }}
              className="text-hero-title leading-hero-title font-bold text-hero-content uppercase"
            >
              SHIPPING & RETURNS.
            </Inview>
            <p className="mt-4 max-w-2xl text-hero-body leading-hero-prose text-hero-content-muted uppercase">
              Global express shipping, transparent transit timelines, and a
              frictionless 14-day return and exchange policy.
            </p>
          </header>

          {/* Logistics Highlights Grid */}
          <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {LOGISTICS_STATS.map((stat, i) => (
              <Inview
                tag="article"
                key={stat.label}
                mode="once"
                from={{ opacity: 0, y: 16 }}
                to={{ opacity: 1, y: 0 }}
                delayIn={i * 50}
                className="hero-lattice-panel flex flex-col justify-between border border-hero-rule p-5"
              >
                <span className="text-hero-title leading-none font-bold text-hero-content uppercase">
                  {stat.value}
                </span>
                <div className="mt-4 border-t border-hero-rule pt-3">
                  <span className="block text-hero-caption font-bold text-hero-content uppercase">
                    {stat.label}
                  </span>
                  <span className="text-hero-caption text-hero-content/50 uppercase">
                    {stat.caption}
                  </span>
                </div>
              </Inview>
            ))}
          </div>

          {/* Policy Sections */}
          <div className="flex flex-col gap-6">
            {SHIPPING_SECTIONS.map((sec, i) => (
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

          {/* Contact Returns Desk */}
          <Inview
            tag="section"
            mode="once"
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            className="hero-lattice-panel mt-12 flex flex-col items-start justify-between gap-6 border border-hero-rule p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <div>
              <span className="text-hero-caption font-bold text-hero-content/50 uppercase">
                NEED TO RETURN OR EXCHANGE AN ITEM?
              </span>
              <p className="mt-1 text-hero-body text-hero-content uppercase">
                Email our fulfillment desk with your order number to get started.
              </p>
            </div>
            <a
              href="mailto:returns@dunkbull.com"
              className="inline-flex items-center justify-center border border-hero-content bg-hero-content px-6 py-3 text-hero-body font-bold text-hero-surface uppercase transition hover:bg-transparent hover:text-hero-content"
            >
              START A RETURN
            </a>
          </Inview>
        </Spring>
      </main>

      <Footer content={homeFooter} />
    </div>
  </div>
);
