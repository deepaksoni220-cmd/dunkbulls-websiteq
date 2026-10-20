import type { CollectionsContent } from "@/views/home/collections";
import type { DetailsContent } from "@/views/home/details";
import type { FaqContent } from "@/views/home/faq";
import type { FooterContent } from "@/views/home/footer";
import type { TechnologyContent } from "@/views/home/technology";
import type { HeroContent } from "@/views/home/hero";

/**
 * Placeholder hero content until a CMS exists.
 *
 * Copy is transcribed verbatim from Figma node 902:304. Two things are
 * deliberately left as-is and flagged for design review rather than corrected
 * here: "WORLOWIDE SHIPPING" (typo for WORLDWIDE) and the `#` hrefs, which have
 * no routes behind them yet.
 */
export const homeHero: HeroContent = {
  logo: {
    src: "/assets/ui/dunkbull-logo.png",
    alt: "DUNKBULL",
    width: 300,
    height: 200,
  },
  nav: [
    { label: "SHOP", href: "/collections" },
    {
      label: "COLLECTIONS",
      href: "/collections",
      submenu: [
        { label: "DUNKBULL ORIGINALS BLACK T-SHIRT", href: "/products/shadow-puffer-jacket" },
        { label: "DUNKBULL ORIGINALS OFF-WHITE T-SHIRT", href: "/products/tactical-hooded-jacket" },
        { label: "DUNKBULL ORIGINALS QEST WITE T-SHIRT", href: "/products/thermal-bomber-jacket" },
      ],
    },
    { label: "QUALITY", href: "/#technology" },
    { label: "ABOUT US", href: "/#faq" },
  ],
  cart: { label: "CART [ 0 ]", href: "/cart" },
  markerStart: {
    lines: ["ENGINEERED", "FOR MOTION.", "BUILT TO ENDURE."],
  },
  markerEnd: {
    lines: ["DESIGNED", "FOR THE UNKNOWN.", "READY FOR ANYTHING."],
  },
  title: [
    "HEAVYWEIGHT 260 GSM COTTON.",
    "OVERSIZED FIT. LIMITED QUANTITY.",
  ],
  cta: { label: "SHOP NOW", href: "/collections" },
  badgeStart: {
    icon: {
      src: "/assets/hero/hero-icon-india.svg",
      alt: "Made in India",
      width: 32,
      height: 32,
    },
    caption: "EST.2022",
    lines: [
      "MADE IN INDIA.",
      "DRIVEN BY INNOVATION.",
      "FOCUSED ON YOU.",
    ],
  },
  badgeEnd: {
    icon: {
      src: "/assets/hero/hero-icon-target.svg",
      alt: "",
      width: 23,
      height: 23,
    },
    lines: ["WORLOWIDE SHIPPING", "FAST & SECURE DELIVERY"],
  },
  subject: {
    src: "/assets/models/dunkbulls-Low_T-shirt_black.glb",
    label: "DUNKBULL Heavyweight Tee 3D model",
  },
  backdrop: {
    src: "/assets/hero/hero-wordmark.png",
    alt: "",
    // Intrinsic size of the supplied plate — 4× the 1257×671 the frame draws it
    // at, so `next/image` has real pixels to serve on a dense display.
    width: 5028,
    height: 2684,
  },
};

/**
 * Placeholder details content until a CMS exists.
 *
 * Copy is transcribed verbatim from Figma node 1748:1102. The `#` href has no
 * route behind it yet — flagged, not invented.
 *
 * The standfirst is stored in sentence case exactly as the frame stores it; the
 * frame uppercases it in CSS, and so do we (`details-intro.tsx`).
 */
export const homeDetails: DetailsContent = {
  heading: "DETAILS MATTER.",
  lede: "Heavyweight 260 GSM combed cotton engineered for structural weight, boxy streetwear drape, and enduring shape.",
  cta: { label: "EXPLORE THE TEES", href: "/collections" },
  features: [
    {
      index: "01",
      icon: {
        src: "/assets/details/details-icon-shell.svg",
        alt: "",
        width: 32,
        height: 32,
      },
      title: "260 GSM COMBED COTTON",
      body: "HEAVYWEIGHT RING-SPUN ORGANIC COTTON DELIVERS SUBSTANTIAL STRUCTURAL WEIGHT.",
    },
    {
      index: "02",
      icon: {
        src: "/assets/details/details-icon-thermal.svg",
        alt: "",
        width: 32,
        height: 32,
      },
      title: "REINFORCED RIBBED COLLAR",
      body: "HIGH-RECOVERY TWIN-NEEDLE RIBBED CREWNECK HOLDS ITS FORM WEAR AFTER WEAR.",
    },
    {
      index: "03",
      icon: {
        src: "/assets/details/details-icon-construction.svg",
        alt: "",
        width: 32,
        height: 32,
      },
      title: "REINFORCED CONSTRUCTION",
      body: "PRECISION FLATLOCK SEAMS AND SHOULDER TAPING FOR COMPLETE STRUCTURAL DURABILITY.",
    },
    {
      index: "04",
      icon: {
        src: "/assets/details/details-icon-storage.svg",
        alt: "",
        width: 32,
        height: 32,
      },
      title: "HIGH-DENSITY PRINTING",
      body: "MULTI-LAYER PLASTISOL SCREENPRINT WITH CRISP ARTWORK THAT RESISTS CRACKING.",
    },
    {
      index: "05",
      icon: {
        src: "/assets/details/details-icon-fit.svg",
        alt: "",
        width: 32,
        height: 32,
      },
      title: "OVERSIZED BOXY FIT",
      body: "ARCHITECTURAL DROP-SHOULDER CUT FOR AN EFFORTLESS, RELAXED STREETWEAR DRAPE.",
    },
  ],
};

/**
 * Placeholder collections content until a CMS exists.
 *
 * Copy is transcribed verbatim from Figma node 1748:1152. **The prices are
 * not** — the frame has none, and these figures were invented to carry the
 * hover state the client asked for. They need replacing with real ones.
 *
 * Each product has **one** photograph so far. The frame's four swatches switch
 * between four views of the garment, so `views` is a list and the remaining
 * three angles per product are still to be supplied; until they are, the other
 * swatches fall back to the only view there is.
 *
 * **The photographs are four colourways of one garment**, supplied 2026-08-27,
 * and they were dealt to the four products in a drawn order — lime, rose,
 * Each card carries its swatches count: the view switcher on the card's right
 * margin has that many buttons, and the card's photographs match (currently 1
 * per product — the other swatches fall back to the first view until the full
 * shoot is loaded).
 *
 * The `tags` are the two chips on the card's bottom edge. The third chip in
 * Figma (the line-art icon) is static per card and supplied by `CollectionsCard`
 * itself; only the copy belongs in content.
 *
 * The line break before "JACKET" is set by the layout width on the title, not
 * by `\n` in the copy — the data has the clean product names so they can be
 * reused across views (cart, navigation, checkout) without carrying layout with
 * them.
 *
 * Card dimensions (331×446) are the exported frame's. If the layout breaks,
 * compare the card's computed size against `331px × 446px` — the CSS reproduces
 * the frame's pixel numbers via `rem` against the 1440 base, so there should be
 * nothing left to line up by hand.
 */
export const homeCollections: CollectionsContent = {
  heading: "COLLECTIONS.",
  lede: "Heavyweight 260 GSM combed cotton essentials with signature architectural drape.",
  products: [
    {
      index: "01",
      name: "DUNKBULL ORIGINALS BLACK T-SHIRT OVERSIZED FITS",
      price: "₹700",
      views: [
        {
          src: "/assets/collections/dunkbull-black-tee.png",
          alt: "DUNKBULL Originals Black T-Shirt — Front View",
          width: 1080,
          height: 1080,
        },
      ],
      swatches: 1,
      defaultView: 0,
      tags: ["OVERSIZED FIT", "PITCH BLACK"],
      href: "/products/shadow-puffer-jacket",
    },
    {
      index: "02",
      name: "DUNKBULL ORIGINALS OFF-WHITE T-SHIRT OVERSIZED FITS",
      price: "₹700",
      views: [
        {
          src: "/assets/collections/dunkbull-offwhite-tee.png",
          alt: "DUNKBULL Originals Off-White T-Shirt — Front View",
          width: 1080,
          height: 1080,
        },
      ],
      swatches: 1,
      defaultView: 0,
      tags: ["OVERSIZED FIT", "OFF-WHITE"],
      href: "/products/tactical-hooded-jacket",
    },
    {
      index: "03",
      name: "DUNKBULL ORIGINALS QEST WITE T-SHIRT OVERSIZED FITS",
      price: "₹700",
      views: [
        {
          src: "/assets/collections/dunkbull-crest-white-tee.png",
          alt: "DUNKBULL Originals Qest Wite T-Shirt — Front View",
          width: 1080,
          height: 1080,
        },
      ],
      swatches: 1,
      defaultView: 0,
      tags: ["CORE DROP", "QEST WITE"],
      href: "/products/thermal-bomber-jacket",
    },
  ],
  cta: { label: "VIEW ALL PRODUCTS", href: "/collections" },
};

/**
 * Placeholder technology content until a CMS exists.
 *
 * Copy is transcribed verbatim from Figma nodes 1748:1155, 1924:2259, 1924:2285,
 * 1924:2311 and 1924:2337 — one frame per layer.
 *
 * The card coordinates are the frames' own. Each card is hand-placed against
 * the layer it describes and the leader line is drawn to a point on that layer,
 * so this is art direction rather than layout that could be derived:
 * `cardSideY` is where the line meets the card's left edge (its own centre
 * line, which is why it is not `cardTop` plus a constant — the cards are two or
 * three lines tall).
 *
 * **`anchorFx`/`anchorFy` are not the frame's**, and could not be: the still
 * those numbers were read off has been replaced by a clip that composes the
 * stack differently. They are fractions of the artwork, measured against the
 * clip's own settled arrangement — the one on screen for cards two to five —
 * with each point checked to land on the layer its card describes: the wet
 * outer sheet, the ripstop mesh, the quilted insulation, the pale membrane and
 * the lining at the bottom. Re-measure them if the clip is ever re-rendered.
 */
export const homeTechnology: TechnologyContent = {
  heading: ["QUALITY", "ENGINEERED TO ENDURE"],
  lede: [
    "Every detail has a purpose.",
    "From the tight-spun 260 GSM combed cotton weave to the reinforced collar ribbing, every t-shirt is designed to hold its architectural shape.",
  ],
  stack: {
    // The poster still. The scrubbed frames are addressed by index, not named
    // here — see `TechnologyReel` and ADR-0046.
    src: "/assets/technology/technology-stack.webp",
    alt: "The t-shirt's premium 260 GSM material construction and finish layers",
    width: 1024,
    height: 954,
  },
  layers: [
    {
      index: "01",
      title: "260 GSM COMBED COTTON",
      body: "Ultra-dense combed cotton jersey knit providing structural weight and premium handfeel.",
      icon: { src: "/assets/technology/technology-icon-01.svg", alt: "", width: 32, height: 32 },
      cardTop: 136,
      cardSideY: 197,
      anchorFx: 0.52,
      anchorFy: 0.36,
    },
    {
      index: "02",
      title: "TIGHT-SPUN WEAVE",
      body: "High-gauge interlocking knit structure prevents warping and maintains a clean boxy drape.",
      icon: { src: "/assets/technology/technology-icon-02.svg", alt: "", width: 32, height: 32 },
      cardTop: 236,
      cardSideY: 287,
      anchorFx: 0.65,
      anchorFy: 0.3,
    },
    {
      index: "03",
      title: "REINFORCED RIBBED COLLAR",
      body: "High-recovery 1x1 twin-needle ribbed crewneck with interior tape that never sags.",
      icon: { src: "/assets/technology/technology-icon-03.svg", alt: "", width: 32, height: 32 },
      cardTop: 370,
      cardSideY: 431,
      anchorFx: 0.49,
      anchorFy: 0.2,
    },
    {
      index: "04",
      title: "BREATHABLE NATURAL FIBER",
      body: "100% organic cotton fibers promote natural airflow for year-round everyday wear.",
      icon: { src: "/assets/technology/technology-icon-04.svg", alt: "", width: 32, height: 32 },
      cardTop: 492,
      cardSideY: 553,
      anchorFx: 0.6,
      anchorFy: 0.55,
    },
    {
      index: "05",
      title: "CARBON SOFT WASH",
      body: "Pre-shrunk carbon wash treatment gives a broken-in luxury softness from the first wear.",
      icon: { src: "/assets/technology/technology-icon-05.svg", alt: "", width: 32, height: 32 },
      cardTop: 658,
      cardSideY: 709,
      anchorFx: 0.46,
      anchorFy: 0.74,
    },
  ],
};

/**
 * Placeholder FAQ content until a CMS exists.
 *
 * Copy is transcribed verbatim from Figma node 1748:1158.
 *
 * The product is the hero's own model on this screen too, on the client's call,
 * pinned where the frame's photograph sat. That photograph — the same export the
 * details frame used before the 3D model replaced it there — has been deleted.
 */
export const homeFaq: FaqContent = {
  heading: "NEED TO KNOW.",
  subject: {
    src: "/assets/models/dunkbulls-Low_T-shirt_black.glb",
    label: "DUNKBULL Heavyweight Tee 3D model",
  },
  entries: [
    {
      index: "01",
      icon: {
        src: "/assets/faq/faq-icon-size.svg",
        alt: "",
        width: 24,
        height: 24,
      },
      question: "HOW DO I CHOOSE THE RIGHT SIZE?",
      answer:
        "Check our size guide for measurements and fit information. Our t-shirts feature a boxy, oversized silhouette with drop shoulders for comfortable streetwear drape.",
    },
    {
      index: "02",
      icon: {
        src: "/assets/faq/faq-icon-materials.svg",
        alt: "",
        width: 24,
        height: 24,
      },
      question: "WHAT MATERIALS ARE USED IN THE T-SHIRTS?",
      questionWidth: 195,
      answer:
        "We build exclusively with 100% heavyweight 260 GSM combed cotton, high-recovery ribbed collars, and reinforced twin-needle stitching.",
    },
    {
      index: "03",
      icon: {
        src: "/assets/faq/faq-icon-care.svg",
        alt: "",
        width: 24,
        height: 24,
      },
      question: "HOW SHOULD I CARE FOR MY HEAVYWEIGHT TEE?",
      answer:
        "Machine wash cold inside out (30°C / 85°F). Avoid harsh detergents and bleach. Hang dry in shade to preserve the 260 GSM fabric weight and high-density graphics.",
    },
    {
      index: "04",
      icon: {
        src: "/assets/faq/faq-icon-shipping.svg",
        alt: "",
        width: 24,
        height: 24,
      },
      question: "DO YOU SHIP INTERNATIONALLY?",
      answer:
        "Yes. We offer worldwide shipping with secure delivery and tracking on every order.",
    },
    {
      index: "05",
      icon: {
        src: "/assets/faq/faq-icon-returns.svg",
        alt: "",
        width: 24,
        height: 24,
      },
      question: "CAN I RETURN OR EXCHANGE MY T-SHIRT?",
      answer:
        "Yes. Unworn, unwashed t-shirts with original tags intact can be returned or exchanged within the 14-day return period.",
    },
  ],
};

/**
 * Placeholder footer content until a CMS exists.
 *
 * Copy is transcribed verbatim from Figma node 1748:1161. Every `href` is `#` —
 * none of these routes exist yet, and the sign-up form has no endpoint behind
 * it; both are flagged rather than invented.
 */
export const homeFooter: FooterContent = {
  logo: {
    src: "/assets/ui/dunkbull-logo.png",
    alt: "DUNKBULL",
    width: 300,
    height: 200,
  },
  columns: [
    {
      heading: { label: "PRODUCTS", href: "/collections" },
      links: [
        { label: "BLACK", href: "/products/shadow-puffer-jacket" },
        { label: "OFF-WHITE", href: "/products/tactical-hooded-jacket" },
        { label: "QEST WITE", href: "/products/thermal-bomber-jacket" },
      ],
    },
    {
      heading: { label: "QUALITY", href: "/#technology" },
      links: [
        { label: "MATERIALS", href: "/#technology" },
        { label: "CONSTRUCTION", href: "/#technology" },
      ],
    },
    { heading: { label: "ABOUT US", href: "/#faq" } },
    {
      heading: { label: "SUPPORT", href: "/faq" },
      links: [
        { label: "PRIVACY POLICY", href: "/privacy-policy" },
        { label: "TERMS & CONDITIONS", href: "/terms-and-conditions" },
        { label: "SHIPPING & RETURNS", href: "/shipping-returns" },
        { label: "FAQ", href: "/faq" },
      ],
    },
  ],
  newsletter: {
    heading: "STAY AHEAD OF THE DROP.",
    placeholder: "Your e-mail",
    consent: "I AGREE TO RECEIVE UPDATES.",
  },
  copyright: "© 2026 DUNKBULL. ALL RIGHTS RESERVED.",
  social: [
    { label: "INSTAGRAM", href: "#" },
    { label: "YOUTUBE", href: "#" },
    { label: "TIK-TOK", href: "#" },
  ],
};
