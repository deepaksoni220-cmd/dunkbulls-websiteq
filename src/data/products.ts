export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  label?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  index: string;
  name: string;
  price: string;
  numericPrice: number;
  category: "CORE" | "TECH" | "LIMITED";
  tags: string[];
  lede: string;
  description: string[];
  images: ProductImage[];
  specs: ProductSpec[];
  features: string[];
}

export const products: Product[] = [
  {
    id: "shadow-puffer-jacket",
    slug: "shadow-puffer-jacket",
    index: "01",
    name: "DUNKBULL ORIGINALS BLACK T-SHIRT OVERSIZED FITS",
    price: "₹700",
    numericPrice: 700,
    category: "CORE",
    tags: ["OVERSIZED FIT", "PITCH BLACK"],
    lede: "Engineered from 100% heavyweight 260 GSM combed cotton with high-density DUNKBULL insignia.",
    description: [
      "The DUNKBULL Originals Black T-Shirt defines our signature oversized streetwear aesthetic. Constructed from ultra-dense 260 GSM ring-spun cotton jersey with a softened carbon-washed finish for immediate comfort and structural weight.",
      "Features a custom high-density silk-screened front crest and architectural drop-shoulder boxy drape.",
    ],
    images: [
      {
        src: "/assets/collections/dunkbull-black-tee.png",
        alt: "DUNKBULL Originals Black T-Shirt — Front View",
        width: 1080,
        height: 1080,
        label: "FRONT VIEW",
      },
    ],
    specs: [
      { label: "MATERIAL", value: "100% Heavyweight Ring-Spun Cotton (260 GSM)" },
      { label: "COLLAR", value: "Twin-Needle Ribbed Crewneck with Reinforced Binding" },
      { label: "PRINT", value: "High-Density Multi-Layer Plastisol Screenprint" },
      { label: "FIT PROFILE", value: "Oversized Boxy Silhouette with Drop Shoulders" },
      { label: "STITCHING", value: "Reinforced Flatlock Side & Shoulder Seams" },
      { label: "CARE", value: "Cold Machine Wash Inside Out, Hang Dry" },
    ],
    features: [
      "Dense 260 GSM combed ring-spun jersey with pre-shrunk structure",
      "High-contrast white DUNKBULL crest and signature artwork",
      "Reinforced ribbed collar that maintains shape after repeated washing",
      "Drop-shoulder pattern cut for unrestricted streetwear drape",
    ],
  },
  {
    id: "tactical-hooded-jacket",
    slug: "tactical-hooded-jacket",
    index: "02",
    name: "DUNKBULL ORIGINALS OFF-WHITE T-SHIRT OVERSIZED FITS",
    price: "₹700",
    numericPrice: 700,
    category: "TECH",
    tags: ["OVERSIZED FIT", "OFF-WHITE"],
    lede: "Clean off-white 260 GSM heavyweight cotton jersey with high-contrast obsidian DUNKBULL artwork.",
    description: [
      "Crafted in natural off-white / chalk ground, the DUNKBULL Originals Off-White T-Shirt delivers stark contrast with deep black multi-layer screenprinting across the chest.",
      "The boxy oversized silhouette creates an effortless modern streetwear drape built for all-day wear and heavy rotation.",
    ],
    images: [
      {
        src: "/assets/collections/dunkbull-offwhite-tee.png",
        alt: "DUNKBULL Originals Off-White T-Shirt — Front View",
        width: 1080,
        height: 1080,
        label: "FRONT VIEW",
      },
    ],
    specs: [
      { label: "MATERIAL", value: "100% Combed Compact Cotton (260 GSM)" },
      { label: "COLORWAY", value: "Chalk / Off-White Natural Ground" },
      { label: "PRINT", value: "Deep Obsidian Contrast High-Density Screenprint" },
      { label: "FIT PROFILE", value: "Relaxed Boxy Drop-Shoulder Fit" },
      { label: "WEIGHT", value: "Heavyweight 260 GSM Pure Cotton" },
      { label: "CARE", value: "Cold Wash with Like Colors, Hang Dry" },
    ],
    features: [
      "Premium 260 GSM organic cotton knit with ultra-soft handfeel",
      "Archival obsidian graphic print with micro-detailed logo lettering",
      "Twin-needle hem and sleeve cuffs for long-lasting structural retention",
      "Pre-washed to eliminate post-purchase shrinkage",
    ],
  },
  {
    id: "thermal-bomber-jacket",
    slug: "thermal-bomber-jacket",
    index: "03",
    name: "DUNKBULL ORIGINALS QEST WITE T-SHIRT OVERSIZED FITS",
    price: "₹700",
    numericPrice: 700,
    category: "CORE",
    tags: ["CORE DROP", "QEST WITE"],
    lede: "Limited signature release featuring high-density typography and engineered 260 GSM structural cotton.",
    description: [
      "The DUNKBULL Originals Qest Wite T-Shirt showcases the complete aesthetic range of the brand with front chest typography and signature bull insignia.",
      "Constructed from 260 GSM combed cotton with reinforced seam tapes and durable collar ribbing.",
    ],
    images: [
      {
        src: "/assets/collections/dunkbull-crest-white-tee.png",
        alt: "DUNKBULL Originals Qest Wite T-Shirt — Front View",
        width: 1080,
        height: 1080,
        label: "FRONT VIEW",
      },
    ],
    specs: [
      { label: "MATERIAL", value: "100% Heavyweight Cotton (260 GSM)" },
      { label: "EDITION", value: "Signature Qest Wite Edition" },
      { label: "FIT PROFILE", value: "Signature Oversized Silhouette" },
      { label: "PRINTING", value: "Custom Water-Based & Plastisol Blend" },
      { label: "FINISH", value: "Carbon Soft-Touch Surface Wash" },
      { label: "STORAGE", value: "Includes Heavyweight Dust Bag" },
    ],
    features: [
      "Single-angle showcase highlighting front crest branding",
      "Subtle ribbed collar with internal neck tape",
      "Breathable natural cotton fiber construction for year-round wear",
      "Custom branded interior woven neck label",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
