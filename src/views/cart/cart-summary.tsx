"use client";

import { useCartStore } from "@/lib/cart/cart-store";

/**
 * Order summary panel — client leaf.
 *
 * Reads totals live from the cart store so removing an item instantly
 * updates the subtotal and total without a page refresh.
 */
export const CartSummary = () => {
  const items = useCartStore((s) => s.items);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const formatted = (value: number) =>
    value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  return (
    <aside
      aria-label="Order summary"
      className="hero-lattice-panel flex flex-col gap-6 border border-hero-rule p-6 font-mono text-hero-content"
    >
      <h2 className="text-hero-body leading-hero-display tracking-hero-display">
        ORDER SUMMARY
      </h2>

      <dl className="flex flex-col gap-3 text-hero-caption leading-hero-body">
        <div className="flex justify-between">
          <dt className="text-hero-content/60">SUBTOTAL</dt>
          <dd>{formatted(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-hero-content/60">SHIPPING</dt>
          <dd className="text-hero-content/60">CALCULATED AT CHECKOUT</dd>
        </div>
        <div className="flex justify-between border-t border-hero-rule pt-3">
          <dt>TOTAL</dt>
          <dd>{formatted(subtotal)}</dd>
        </div>
      </dl>

      {/* Checkout — wire to payment provider when backend is ready */}
      <button
        type="button"
        className="group relative flex h-11 w-full items-center justify-center gap-6 border border-hero-content px-5 text-hero-body leading-hero-display whitespace-nowrap text-hero-content transition duration-[var(--duration-normal)] ease-entrance hover:bg-hero-content hover:text-hero-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-content"
      >
        PROCEED TO CHECKOUT
      </button>

      <p className="text-center text-hero-caption leading-hero-body text-hero-content/40">
        SECURE CHECKOUT. FREE RETURNS.
      </p>
    </aside>
  );
};
