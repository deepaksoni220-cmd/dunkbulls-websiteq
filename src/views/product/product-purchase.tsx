"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCartStore } from "@/lib/cart/cart-store";
import { SIZES, type ProductSize } from "@/lib/cart/sizes";
import { SecuredByRazorpay } from "@/components/common/secured-by-razorpay";
import type { Product } from "@/data/products";

export interface ProductPurchaseProps {
  product: Product;
}

const TRANSITION = "transition duration-[var(--duration-fast)] ease-entrance";

export const ProductPurchase = ({ product }: ProductPurchaseProps) => {
  const [selectedSize, setSelectedSize] = useState<ProductSize>("L");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "added">("idle");
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.numericPrice,
      size: selectedSize,
      quantity,
      image: product.images[0],
    });

    setStatus("added");
    setTimeout(() => {
      setStatus("idle");
      router.push("/cart");
    }, 400);
  };

  return (
    <div className="flex flex-col gap-8 border-y border-hero-rule py-8">
      {/* Size Selection */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-hero-caption">
          <span className="text-hero-content-muted">SELECT SIZE:</span>
          <span className="text-hero-content font-bold">{selectedSize} [ SELECTED ]</span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`h-11 border text-hero-caption font-mono uppercase ${TRANSITION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-content ${
                selectedSize === size
                  ? "border-hero-content bg-hero-content text-hero-surface font-bold"
                  : "border-hero-rule text-hero-content/70 hover:border-hero-content hover:text-hero-content"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Quantity Counter */}
          <div className="flex h-12 w-full items-center justify-between border border-hero-rule px-4 sm:w-36">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="text-hero-body text-hero-content/60 hover:text-hero-content"
            >
              -
            </button>
            <span className="font-mono text-hero-body">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="text-hero-body text-hero-content/60 hover:text-hero-content"
            >
              +
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex h-12 flex-1 items-center justify-center gap-3 border px-4 py-3 text-hero-caption font-bold tracking-hero-display uppercase sm:px-6 sm:text-hero-body ${TRANSITION} ${
              status === "added"
                ? "border-emerald-500 bg-emerald-500 text-black"
                : "border-hero-content bg-hero-content text-hero-surface hover:bg-hero-surface hover:text-hero-content"
            }`}
          >
            {status === "added"
              ? "ADDING TO CART..."
              : `ADD TO CART — ${(product.numericPrice * quantity).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}`}
          </button>
        </div>

        {/* Secured Payments by Razorpay */}
        <SecuredByRazorpay variant="product" />
      </div>

      {/* Guarantee and Shipping info */}
      <div className="flex flex-col gap-2 text-hero-caption text-hero-content/50">
        <div className="flex items-center gap-2">
          <span>✓</span>
          <span>COMPLIMENTARY EXPRESS GLOBAL SHIPPING</span>
        </div>
        <div className="flex items-center gap-2">
          <span>✓</span>
          <span>14-DAY HASSLE-FREE RETURNS & EXCHANGES</span>
        </div>
        <div className="flex items-center gap-2">
          <span>✓</span>
          <span>LIFETIME CRAFTSMANSHIP GUARANTEE</span>
        </div>
      </div>
    </div>
  );
};
