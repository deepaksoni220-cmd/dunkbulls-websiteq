"use client";

import Image from "next/image";

import { useCartStore } from "@/lib/cart/cart-store";
import { SIZES } from "@/lib/cart/sizes";
import type { CartItem } from "./cart.types";

export interface CartItemRowProps {
  item: CartItem;
}

const TRANSITION = "transition duration-[var(--duration-fast)] ease-entrance";

/**
 * A single row in the cart item list — client leaf.
 *
 * Shows product image, name, price, quantity and an inline size selector.
 * All mutations go through the Zustand cart store.
 */
export const CartItemRow = ({ item }: CartItemRowProps) => {
  const remove = useCartStore((s) => s.remove);
  const updateSize = useCartStore((s) => s.updateSize);

  const lineTotal = (item.price * item.quantity).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  return (
    <li className="flex gap-4 border-b border-hero-rule py-6 sm:gap-6">
      {/* Product thumbnail */}
      <div className="hero-lattice-panel relative h-24 w-20 shrink-0 overflow-hidden border border-hero-rule sm:h-32 sm:w-28">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(max-width: 640px) 80px, 112px"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        {/* Name + price */}
        <div className="flex items-start justify-between gap-4">
          <p className="text-hero-body leading-hero-display tracking-hero-display text-hero-content">
            {item.name}
          </p>
          <p className="shrink-0 text-hero-body leading-hero-display text-hero-content">
            {lineTotal}
          </p>
        </div>

        {/* Size selector */}
        <fieldset>
          <legend className="mb-2 text-hero-caption leading-hero-body text-hero-content/60">
            SIZE
          </legend>
          <div className="flex flex-wrap gap-1.5">
            {SIZES.map((size) => {
              const selected = item.size === size;
              return (
                <button
                  key={size}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => updateSize(item.id, size)}
                  className={`h-8 min-w-10 border px-2.5 text-hero-caption leading-none ${TRANSITION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-content ${
                    selected
                      ? "border-hero-content bg-hero-content text-hero-surface"
                      : "border-hero-rule text-hero-content/60 hover:border-hero-content hover:text-hero-content"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Qty + remove */}
        <div className="flex items-center justify-between">
          <p className="text-hero-caption leading-hero-body text-hero-content/60">
            QTY: {item.quantity}
          </p>
          <button
            type="button"
            onClick={() => remove(item.id)}
            aria-label={`Remove ${item.name} from cart`}
            className={`text-hero-caption leading-hero-body text-hero-content/40 ${TRANSITION} hover:text-hero-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-content`}
          >
            REMOVE
          </button>
        </div>
      </div>
    </li>
  );
};
