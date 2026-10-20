"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCartStore } from "@/lib/cart/cart-store";
import { Spring } from "@/components/animation/springs/spring";
import { ScrambleText } from "@/components/ui/scramble-text";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import { HeroMenu } from "./hero-menu";
import { HeroNavEntry } from "./hero-nav-item";

import { HERO_REVEAL } from "./hero.motion";
import type { HeroImage, HeroLink, HeroNavItem } from "./hero.types";

export interface HeroHeaderProps {
  logo: HeroImage;
  nav: HeroNavItem[];
  cart: HeroLink;
}

/** The logo's box — medium on mobile (h-11 w-28), extra large on desktop (lg:h-24 lg:w-64). */
const LOGO_BOX = "block h-11 w-28 sm:h-12 sm:w-32 lg:h-24 lg:w-64";

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-content";

const HeroCartLink = ({
  href,
  initialLabel,
  variant = "link",
  className = "",
}: {
  href: string;
  initialLabel: string;
  variant?: "link" | "badge" | "icon";
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const totalCount = useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.quantity, 0),
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && totalCount > 0) {
      setJustAdded(true);
      const timer = setTimeout(() => setJustAdded(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [totalCount, mounted]);

  const displayCount = mounted ? totalCount : 0;
  const label = mounted ? `CART [ ${displayCount} ]` : initialLabel;

  if (variant === "icon") {
    return (
      <Link
        href={href}
        aria-label={`Shopping Cart with ${displayCount} items`}
        className={`relative flex size-8 items-center justify-center border border-hero-rule text-hero-content/80 transition duration-[var(--duration-fast)] ease-entrance hover:border-hero-content hover:text-hero-content ${FOCUS_RING} ${
          justAdded
            ? "border-emerald-400 text-emerald-400"
            : displayCount > 0
            ? "border-hero-content text-hero-content"
            : ""
        } ${className}`}
      >
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        {displayCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-hero-content font-mono text-hero-fine font-bold leading-none text-hero-surface">
            {displayCount}
          </span>
        )}
      </Link>
    );
  }

  if (variant === "badge") {
    return (
      <Link
        href={href}
        aria-label={`Shopping Cart with ${displayCount} items`}
        className={`group flex items-center gap-1.5 border border-hero-rule px-2.5 py-1 font-mono text-hero-caption leading-none text-hero-content/80 transition duration-[var(--duration-fast)] ease-entrance hover:border-hero-content hover:text-hero-content ${FOCUS_RING} ${
          justAdded
            ? "border-emerald-400 font-bold text-emerald-400"
            : displayCount > 0
            ? "border-hero-content font-bold text-hero-content"
            : ""
        } ${className}`}
      >
        <span className="text-hero-content-faint">CART:</span>
        <span
          className={
            justAdded
              ? "text-emerald-400 font-bold"
              : displayCount > 0
              ? "text-hero-content font-bold"
              : "text-hero-content/80"
          }
        >
          [{displayCount}]
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`text-hero-caption leading-hero-display whitespace-nowrap sm:text-hero-body transition duration-[var(--duration-fast)] ease-entrance ${FOCUS_RING} ${
        justAdded
          ? "font-bold text-emerald-400"
          : displayCount > 0
          ? "font-bold text-hero-content"
          : "text-hero-content/80 hover:text-hero-content"
      } ${className}`}
    >
      <ScrambleText revealDelay={HERO_REVEAL.cart}>{label}</ScrambleText>
    </Link>
  );
};

/**
 * Frame header (Figma 902:309 / 902:341 / 1923:2152).
 *
 * The three groups are pinned independently rather than distributed: the frame
 * centres the nav on the canvas while the logo and cart sit against the 40px
 * margins, which a `justify-between` row cannot reproduce.
 */
export const HeroHeader = ({ logo, nav, cart }: HeroHeaderProps) => (
  <Spring
    tag="header"
    mode="once"
    from={{ opacity: 0, y: -8 }}
    to={{ opacity: 1, y: 0 }}
    // Below the frame breakpoint this is ordinary flow and wraps: the nav is
    // full-width so it drops to its own line under the logo and cart, while DOM
    // order stays logo → nav → cart for reading. At `lg` it becomes the frame's
    // own canvas again and the three groups position against it.
    className="relative z-20 flex items-center justify-between px-4 py-3 font-mono text-hero-content lg:absolute lg:inset-x-0 lg:top-0 lg:block lg:h-13.5 lg:px-0 lg:pt-0 lg:pb-0"
  >
    <Link
      href="/"
      className={`${LOGO_BOX} order-1 max-lg:tap-area lg:absolute lg:top-1 lg:left-10 ${FOCUS_RING}`}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        priority
        className="h-full w-full object-contain object-left"
      />
    </Link>

    <nav
      aria-label="Primary"
      className="order-3 hidden w-full lg:absolute lg:block lg:top-6 lg:left-1/2 lg:w-auto lg:-translate-x-1/2"
    >
      <ul className="flex items-start justify-between gap-3 lg:justify-start lg:gap-16">
        {nav.map((item, index) => (
          // A submenu item reserves the width of its caret box (113px offset +
          // the 6px glyph). The caret is positioned out of flow to match the
          // frame exactly, so without this the row would centre 12px narrow.
          <li
            key={item.label}
            className={`relative ${item.submenu ? "lg:w-29.75" : ""}`}
          >
            <HeroNavEntry
              {...item}
              revealDelay={index * HERO_REVEAL.navStep}
              labelClassName={`block text-hero-caption leading-hero-display whitespace-nowrap max-lg:tap-area sm:text-hero-body ${FOCUS_RING}`}
              caretClassName="top-1 -right-2 h-1.25 w-1.5 -scale-y-100 lg:right-auto lg:left-28.25"
            />
          </li>
        ))}
      </ul>
    </nav>

    <div className="order-2 ml-auto hidden items-center gap-6 lg:absolute lg:top-5.5 lg:right-10 lg:flex">
      <ThemeToggle />

      <HeroCartLink href={cart.href} initialLabel={cart.label} />
    </div>

    <div className="order-2 ml-auto flex items-center gap-2 sm:gap-3 lg:hidden">
      <ThemeToggle variant="icon" />
      <HeroCartLink href={cart.href} initialLabel={cart.label} variant="icon" />
      <HeroMenu logo={logo} nav={nav} cart={cart} logoClassName={LOGO_BOX} />
    </div>
  </Spring>
);
