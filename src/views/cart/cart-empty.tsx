import Link from "next/link";
import Image from "next/image";

import { FrameButton } from "@/components/ui/frame-button";

/**
 * Empty-cart state.
 *
 * Shown when the cart has no items. Gives the reader a clear heading, a short
 * message, and a primary CTA back to the collections section.
 */
export const CartEmpty = () => (
  <div className="flex flex-col items-center gap-8 px-5 py-24 text-center font-mono text-hero-content lg:py-40">
    <Image
      src="/assets/hero/hero-icon-target.svg"
      alt=""
      width={40}
      height={40}
      aria-hidden
      className="opacity-40"
    />
    <div className="flex flex-col gap-3">
      <p className="text-hero-lede leading-hero-display tracking-hero-display">
        YOUR CART IS EMPTY.
      </p>
      <p className="max-w-xs text-hero-caption leading-hero-body text-hero-content/60">
        Nothing here yet. Browse the collection and add something you like.
      </p>
    </div>
    <FrameButton label="SHOP COLLECTION" href="/collections" />
  </div>
);
