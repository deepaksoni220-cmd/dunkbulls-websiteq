import type { Product } from "@/data/products";

export interface ProductSpecsProps {
  product: Product;
}

export const ProductSpecs = ({ product }: ProductSpecsProps) => (
  <div className="flex flex-col gap-10">
    {/* Description Paragraphs */}
    <div className="flex flex-col gap-4">
      <h3 className="text-hero-caption font-bold tracking-hero-display text-hero-content">
        OVERVIEW & DESIGN INTENT
      </h3>
      <div className="flex flex-col gap-3 text-hero-body leading-hero-prose text-hero-content-muted">
        {product.description.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>

    {/* Technical Specifications Grid */}
    <div className="flex flex-col gap-4">
      <h3 className="text-hero-caption font-bold tracking-hero-display text-hero-content">
        TECHNICAL SPECIFICATIONS
      </h3>
      <dl className="grid grid-cols-1 border-t border-hero-rule divide-y divide-hero-rule">
        {product.specs.map((spec) => (
          <div key={spec.label} className="grid grid-cols-1 py-3 sm:grid-cols-2">
            <dt className="text-hero-caption text-hero-content/50">{spec.label}</dt>
            <dd className="text-hero-caption text-hero-content font-mono sm:text-right">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>

    {/* Key Features List */}
    <div className="flex flex-col gap-4">
      <h3 className="text-hero-caption font-bold tracking-hero-display text-hero-content">
        FUNCTIONAL HIGHLIGHTS
      </h3>
      <ul className="flex flex-col gap-2 border-t border-hero-rule pt-4">
        {product.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-hero-caption text-hero-content/80">
            <span className="text-hero-content-faint">[{String(i + 1).padStart(2, "0")}]</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
