import Image from "next/image";
import Link from "next/link";

import { Inview } from "@/components/animation/springs/in-view";
import { products } from "@/data/products";

export interface ProductRelatedProps {
  currentProductId: string;
}

const TRANSITION = "transition duration-[var(--duration-fast)] ease-entrance";
const TRANSITION_TRANSFORM = "transition-transform duration-[var(--duration-normal)] ease-entrance";

export const ProductRelated = ({ currentProductId }: ProductRelatedProps) => {
  const relatedProducts = products.filter((p) => p.id !== currentProductId);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-products-heading"
      className="mx-auto w-full max-w-360 border-t border-hero-rule px-5 py-20 font-mono text-hero-content lg:px-10 lg:py-28"
    >
      {/* Section Header */}
      <div className="mb-12 flex flex-col gap-3 lg:mb-16">
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          className="text-hero-caption text-hero-content/50 uppercase tracking-wider"
        >
          {"// COMPANION EDITIONS"}
        </Inview>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <Inview
            tag="h2"
            id="related-products-heading"
            mode="once"
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            className="text-hero-display-compact leading-hero-headline tracking-hero-display sm:text-hero-display-tablet"
          >
            COMPLETE THE ROTATION
          </Inview>
          <Inview
            tag="p"
            mode="once"
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            className="max-w-md text-hero-body leading-hero-prose text-hero-content-muted uppercase"
          >
            Heavyweight 260 GSM combed cotton essentials engineered with signature boxy drape.
          </Inview>
        </div>
      </div>

      {/* Related Products Grid */}
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {relatedProducts.map((item, index) => {
          const mainImage = item.images[0];
          const badgeTag = item.tags[1] ?? item.tags[0];

          return (
            <Inview
              key={item.id}
              tag="li"
              mode="once"
              from={{ opacity: 0, y: 24 }}
              to={{ opacity: 1, y: 0 }}
              delayIn={index * 120}
              className="list-none"
            >
              <Link
                href={`/products/${item.slug}`}
                className={`group relative flex h-full flex-col justify-between border border-hero-rule bg-hero-surface/40 p-6 lg:p-8 hover:border-hero-content ${TRANSITION}`}
              >
                {/* Top Meta Bar */}
                <div className="flex items-center justify-between text-hero-caption">
                  <span className="border border-hero-rule px-2 py-0.5 text-hero-content/60">
                    {`${item.index} // ${item.category}`}
                  </span>
                  {badgeTag && (
                    <span className="border border-hero-rule px-2 py-0.5 text-hero-content/40">
                      {badgeTag}
                    </span>
                  )}
                </div>

                {/* Garment Image Showcase */}
                <div className="relative my-8 flex aspect-square w-full items-center justify-center overflow-hidden">
                  {mainImage && (
                    <Image
                      src={mainImage.src}
                      alt={mainImage.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-contain group-hover:scale-105 ${TRANSITION_TRANSFORM}`}
                    />
                  )}
                </div>

                {/* Bottom Details Row */}
                <div className="flex flex-col gap-3 border-t border-hero-rule pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className={`text-hero-title font-bold tracking-tight text-hero-content group-hover:text-hero-content`}>
                      {item.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-hero-title text-hero-content">
                      {item.price}{" "}
                      <span className="text-hero-caption text-hero-content/50 font-normal">
                        INR
                      </span>
                    </span>

                    <span
                      className={`flex items-center gap-1.5 border border-hero-rule px-3 py-1.5 text-hero-caption font-bold tracking-wider text-hero-content/70 uppercase group-hover:border-hero-content group-hover:bg-hero-content group-hover:text-hero-surface ${TRANSITION}`}
                    >
                      EXPLORE DROP
                      <span aria-hidden className="text-xs">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </Inview>
          );
        })}
      </ul>
    </section>
  );
};
