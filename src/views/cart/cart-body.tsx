"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useCartStore } from "@/lib/cart/cart-store";

import { CartEmpty } from "./cart-empty";
import { CartItemRow } from "./cart-item";
import { CartSummary } from "./cart-summary";

/**
 * Client leaf that owns the reactive cart body.
 *
 * Separated from the Server Component view (`index.tsx`) so the store
 * subscription stays at the leaf and the page shell stays server-rendered.
 */
export const CartBody = () => {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="py-24 text-center font-mono text-hero-caption text-hero-content/50 uppercase">
        LOADING CART...
      </div>
    );
  }

  const isEmpty = items.length === 0;

  if (isEmpty) return <CartEmpty />;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-16">
      {/* Item list */}
      <div>
        <ul aria-label="Cart items">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </ul>

        <div className="mt-8">
          <Link
            href="/collections"
            className="text-hero-caption leading-hero-body text-hero-content/60 underline underline-offset-4 transition duration-[var(--duration-fast)] ease-entrance hover:text-hero-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-content"
          >
            ← CONTINUE SHOPPING
          </Link>
        </div>
      </div>

      {/* Order summary */}
      <CartSummary />
    </div>
  );
};
