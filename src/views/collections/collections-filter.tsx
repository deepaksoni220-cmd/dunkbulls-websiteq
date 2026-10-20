"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCartStore } from "@/lib/cart/cart-store";
import { SIZES } from "@/lib/cart/sizes";
import type { Product } from "@/data/products";

export interface CollectionsFilterProps {
  products: Product[];
}

const CATEGORIES = ["ALL", "CORE", "TECH", "LIMITED"] as const;
type Category = (typeof CATEGORIES)[number];

const TRANSITION = "transition duration-[var(--duration-fast)] ease-entrance";

export const CollectionsFilter = ({ products }: CollectionsFilterProps) => {
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [toastItem, setToastItem] = useState<{ name: string; size: string } | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const filteredProducts =
    activeCategory === "ALL"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const size = selectedSizes[product.id] ?? "M";
    addItem({
      id: product.id,
      name: product.name,
      price: product.numericPrice,
      size,
      image: product.images[0],
    });
    setAddedItem(product.id);
    setToastItem({ name: product.name, size });
    setTimeout(() => {
      setAddedItem(null);
      setToastItem(null);
    }, 2800);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Category Tabs */}
      <div className="flex flex-col gap-3 border-b border-hero-rule pb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] sm:gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`flex shrink-0 items-center justify-center border px-3 py-2 text-hero-caption leading-none tracking-hero-display uppercase sm:px-4 ${TRANSITION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-content ${
                activeCategory === cat
                  ? "border-hero-content bg-hero-content text-hero-surface"
                  : "border-hero-rule text-hero-content/60 hover:border-hero-content hover:text-hero-content"
              }`}
            >
              <span>{cat}</span>
              <span className="ml-1 opacity-50 sm:ml-1.5">
                [
                {cat === "ALL"
                  ? products.length
                  : products.filter((p) => p.category === cat).length}
                ]
              </span>
            </button>
          ))}
        </div>

        <p className="text-hero-caption text-hero-content/50">
          SHOWING {filteredProducts.length} RELEASES
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => {
          const currentSize = selectedSizes[product.id] ?? "M";
          const isAdded = addedItem === product.id;

          return (
            <div
              key={product.id}
              className="hero-lattice-panel group relative flex flex-col justify-between border border-hero-rule p-5"
            >
              {/* Top metadata */}
              <div className="flex items-start justify-between">
                <span className="text-hero-caption text-hero-content-faint">
                  {`${product.index} // ${product.category}`}
                </span>
                <div className="flex gap-1">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-hero-rule px-1.5 py-0.5 text-[0.625rem] text-hero-content/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product Image Link */}
              <Link
                href={`/products/${product.slug}`}
                className="relative my-4 flex aspect-square w-full items-center justify-center overflow-hidden transition duration-[var(--duration-fast)] ease-entrance"
              >
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  width={product.images[0].width}
                  height={product.images[0].height}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className={`size-full object-contain ${TRANSITION} group-hover:scale-105`}
                />
              </Link>

              {/* Product Info & Size Selection */}
              <div className="flex flex-col gap-4">
                <div className="flex items-baseline justify-between gap-2">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-hero-body font-bold leading-tight text-hero-content hover:underline"
                  >
                    {product.name}
                  </Link>
                  <span className="text-hero-body text-hero-content/80">
                    {product.price}
                  </span>
                </div>

                {/* Inline Size Selector */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.6875rem] text-hero-content/50">
                    SELECT SIZE:
                  </span>
                  <div className="flex gap-1">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedSizes((prev) => ({
                            ...prev,
                            [product.id]: size,
                          }));
                        }}
                        className={`flex-1 border py-1 text-center text-[0.6875rem] leading-none ${TRANSITION} ${
                          currentSize === size
                            ? "border-hero-content bg-hero-content text-hero-surface"
                            : "border-hero-rule text-hero-content/60 hover:border-hero-content hover:text-hero-content"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions: View Details & Quick Add */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    href={`/products/${product.slug}`}
                    className={`flex items-center justify-center border border-hero-rule py-2 text-center text-hero-caption text-hero-content/70 ${TRANSITION} hover:border-hero-content hover:text-hero-content`}
                  >
                    SPECS →
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(product, e)}
                    className={`flex items-center justify-center border py-2 text-center text-hero-caption font-bold ${TRANSITION} ${
                      isAdded
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                        : "border-hero-content bg-hero-content text-hero-surface hover:bg-hero-surface hover:text-hero-content"
                    }`}
                  >
                    {isAdded ? "ADDED ✓" : "QUICK ADD"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating cart feedback toast */}
      {toastItem && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-4 border border-hero-content bg-hero-surface px-5 py-3 font-mono text-hero-caption text-hero-content shadow-2xl transition duration-[var(--duration-fast)] ease-entrance"
        >
          <div className="flex items-center gap-2">
            <span className="size-2 animate-ping rounded-full bg-emerald-400" />
            <span className="font-bold uppercase">
              ADDED: {toastItem.name} [{toastItem.size}]
            </span>
          </div>
          <Link
            href="/cart"
            className="border-b border-hero-content pb-0.5 font-bold uppercase transition duration-[var(--duration-fast)] ease-entrance hover:opacity-70"
          >
            VIEW CART →
          </Link>
        </aside>
      )}
    </div>
  );
};
