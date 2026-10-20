"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { animated } from "@react-spring/web";

import { Inview } from "@/components/animation/springs/in-view";
import { ScrambleText } from "@/components/ui/scramble-text";
import { usePointerTilt } from "@/hooks/use-pointer-tilt";
import { useCartStore } from "@/lib/cart/cart-store";
import { SIZES } from "@/lib/cart/sizes";

import { COLLECTIONS_REVEAL } from "./collections.motion";
import type { CollectionsProduct } from "./collections.types";

export interface CollectionsCardProps extends CollectionsProduct {
  /** Position in the row, used to stagger the reveal. */
  order: number;
}

/** Frame units → rem against the 1440 base, where the root font-size is 16. */
const units = (value: number) => `${value / 16}rem`;

const TRANSITION = "transition duration-[var(--duration-normal)] ease-entrance";

/**
 * One product card (Figma 1923:2053 and siblings).
 *
 * The card is a fixed 446 units tall with its contents pushed apart, so the tag
 * chips sit on the bottom padding edge whether the title runs to one line or
 * two. The photographs are placed absolutely *behind* that column rather than
 * being flow items between the two: they overlap neither, and taking them out
 * of flow is what lets the title and the chips keep their own anchors.
 *
 * The title is held to 217 units — not a decoration, it is what forces the
 * frame's line break before "JACKET" on all four names. Left to the card's full
 * 297-unit column, "SHADOW PUFFER JACKET" fits on one line and the break is
 * lost. 217 is the widest of the four the frame sets; the other three do not
 * reach it, so one value reproduces every break.
 *
 * **Unfilled, back to the exported frame.** These carried the same opaque
 * lattice the details, technology and FAQ panels do — added because a
 * transparent card let the page's own grid run through the garment and the four
 * read as cut-outs. The client has reversed that: the cards are their border
 * and their contents now, and the page runs behind them. The garments are
 * lit-on-black renders, so what the grid actually shows through is their ground,
 * not the jackets.
 *
 * It also means the card no longer carries its own copy of the pointer
 * highlight — it gets the page's, through the hole where its fill used to be,
 * which is the same light from one source rather than two in phase.
 *
 * **The swatch column is a view switcher**, not decoration: it turns the
 * garment. Every view is rendered and cross-faded rather than swapped, so the
 * card never flashes an empty box while a photograph decodes and the switch
 * costs only an opacity change. One photograph per product exists so far, so
 * the other swatches currently land on it — the control is real, the pictures
 * are missing.
 *
 * **The hover state is an addition to the frame**, on the client's call: the tag
 * chips give way to a SHOP NOW link and the price lifts from 40% to full. It
 * keys off `focus-within` as well as hover, so the link is reachable by
 * keyboard instead of being a mouse-only control, and the chips and the link
 * are both absolutely positioned in one band, so the swap cannot change the
 * card's height.
 *
 * **So is the tilt**, on the same call: the card turns towards the corner the
 * cursor is in, and the garment stands off its face rather than being printed
 * on it. Three elements make that work and each has one job — the `li` owns
 * the lens (`perspective`), the panel inside it owns the rotation and
 * `preserve-3d`, and the photographs sit in a layer of their own with a
 * `translateZ`. The layer's parallax is then the perspective's own doing, not
 * a second animation kept in step with the first. See `use-pointer-tilt`.
 *
 * **The panel moved off the `li` to make room for that.** The reveal writes a
 * transform, and an element can only have one — the tilt and the entrance
 * would have overwritten each other on the same node. The `li` keeps the
 * reveal and the row's own sizing; everything the reader sees as the card is
 * one level in.
 */
export const CollectionsCard = ({
  index,
  name,
  price,
  views,
  swatches,
  defaultView,
  tags,
  href,
  order,
}: CollectionsCardProps) => {
  const [view, setView] = useState(defaultView);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const delay = COLLECTIONS_REVEAL.card + order * COLLECTIONS_REVEAL.cardStep;
  /** Falls back to the first view for any swatch with no photograph yet. */
  const shown = Math.min(view, views.length - 1);
  const tilt = usePointerTilt();
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  /** Stable id derived from the product name — matches the cart store key. */
  const id = name.toLowerCase().replace(/\s+/g, "-");

  /** Parse "$480" → 480 for the cart store. */
  const numericPrice = parseInt(price.replace(/[^0-9]/g, ""), 10);

  const handleShopNow = () => {
    addItem({
      id,
      name,
      price: numericPrice,
      size: selectedSize ?? "M",
      image: views[shown] ?? views[0],
    });
    router.push("/cart");
  };

  return (
    <Inview
      tag="li"
      mode="once"
      from={{ opacity: 0, y: 20 }}
      to={{ opacity: 1, y: 0 }}
      delayIn={delay}
      style={tilt.stage}
      className="group relative min-h-120 sm:min-h-125 lg:h-125 lg:flex-1"
    >
      <animated.div
        {...tilt.bind}
        style={tilt.surface}
        className="relative flex h-full w-full flex-col justify-between border border-hero-rule p-4"
      >
        {/* Header: Index, Corner Marker, Title & Price */}
        <div className="relative z-10 flex w-full flex-col gap-2.5">
          <div className="flex w-full items-start justify-between">
            <span
              aria-hidden
              className="text-hero-caption leading-hero-display text-hero-content-faint"
            >
              {index}
            </span>
            <Image
              src="/assets/collections/collections-corner.svg"
              alt=""
              width={13}
              height={13}
              aria-hidden
              className="size-3.25 shrink-0"
            />
          </div>

          <div className="flex w-full items-start justify-between gap-3">
            <h3 className="flex-1 text-hero-caption font-bold leading-snug tracking-hero-display text-hero-content sm:text-hero-body sm:leading-tight">
              <Link href={href} className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-content">
                <ScrambleText revealInView revealDelay={delay}>
                  {name}
                </ScrambleText>
              </Link>
            </h3>
            <span
              className={`shrink-0 font-mono text-hero-caption font-bold leading-tight text-hero-content-muted group-focus-within:text-hero-content group-hover:text-hero-content sm:text-hero-body ${TRANSITION}`}
            >
              <ScrambleText revealInView revealDelay={delay + 40}>
                {price}
              </ScrambleText>
            </span>
          </div>
        </div>

        {/* Center: Image Stage (Flex-1 so it never overlaps the header title) */}
        <Link
          href={href}
          aria-label={`View ${name} product details`}
          className="relative flex flex-1 items-center justify-center py-1 sm:py-2 cursor-pointer group/img focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-content"
        >
          <animated.div
            aria-hidden
            style={tilt.layer}
            className="relative aspect-square w-full max-w-72 sm:max-w-80 lg:max-w-84 overflow-hidden flex items-center justify-center"
          >
            {views.map((image, position) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 28vw, (min-width: 768px) 46vw, 90vw"
                className={`absolute inset-0 size-full object-contain ${TRANSITION} group-hover/img:scale-105 ${
                  position === shown ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </animated.div>
        </Link>

        {swatches > 1 && (
          <div
            role="group"
            aria-label={`${name} — view`}
            className="absolute top-1/2 right-4 flex w-3 -translate-y-1/2 flex-col gap-1 max-lg:w-4 max-lg:gap-2"
          >
            {Array.from({ length: swatches }, (_, swatch) => (
              <button
                key={swatch}
                type="button"
                aria-label={`View ${swatch + 1} of ${swatches}`}
                aria-pressed={swatch === view}
                onClick={() => setView(swatch)}
                className={`size-3 cursor-pointer max-lg:size-4 max-lg:tap-area max-lg:[--tap-y:0.3125rem] max-lg:[--tap-x:0.75rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-content ${TRANSITION} ${
                  swatch === view
                    ? "bg-hero-content"
                    : "border border-hero-content-muted hover:border-hero-content"
                }`}
              />
            ))}
          </div>
        )}

        {/* Bottom band */}
        <div className="relative h-9.25">
          {/* 1 — Tag chips: visible at rest on hover screens */}
          <ul
            className={`absolute inset-0 flex items-center gap-2 group-focus-within:opacity-0 group-hover:opacity-0 [@media(hover:none)]:hidden ${TRANSITION}`}
          >
            {tags.map((tag) => (
              <li
                key={tag}
                className="flex h-full items-center border border-hero-content-muted px-3.5 text-hero-body leading-hero-display whitespace-nowrap text-hero-content-muted lg:text-hero-chip"
              >
                <ScrambleText revealInView revealDelay={delay + 80}>
                  {tag}
                </ScrambleText>
              </li>
            ))}
          </ul>

          {/* 2 — Size picker: shown on hover or at rest on mobile */}
          <div
            className={`absolute inset-0 flex items-center gap-1 opacity-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100 [@media(hover:none)]:opacity-100 ${
              selectedSize ? "!opacity-0 !pointer-events-none" : ""
            } ${TRANSITION}`}
          >
            {SIZES.map((size) => (
              <button
                key={size}
                type="button"
                aria-label={`Select size ${size} for ${name}`}
                onClick={() => setSelectedSize(size)}
                className={`h-full flex-1 border px-1 text-center text-hero-caption leading-none ${TRANSITION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-content border-hero-rule text-hero-content/70 hover:border-hero-content hover:text-hero-content`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* 3 — SHOP NOW / ADD TO CART: shown once a size is chosen */}
          <button
            type="button"
            onClick={handleShopNow}
            className={`absolute inset-0 flex items-center justify-between border border-hero-content bg-hero-content px-3 text-hero-caption font-bold leading-hero-display text-hero-surface sm:px-3.5 sm:text-hero-body lg:text-hero-chip whitespace-nowrap opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-content ${
              selectedSize ? "!pointer-events-auto !opacity-100" : "pointer-events-none"
            } ${TRANSITION}`}
          >
            <span>{selectedSize ? `SIZE ${selectedSize} — ADD TO CART` : "SHOP NOW"}</span>
            <Image
              src="/assets/ui/arrow-right.svg"
              alt=""
              width={10}
              height={6}
              aria-hidden
              className="h-1.5 w-2.5 shrink-0 invert"
            />
          </button>
        </div>
      </animated.div>
    </Inview>
  );
};
