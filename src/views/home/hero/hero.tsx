import { HeroBadge } from "./hero-badge";
import { HeroCta } from "./hero-cta";
import { HeroMarker } from "./hero-marker";
import { HeroStage } from "./hero-stage";
import { HeroTitle } from "./hero-title";
import type { HeroContent } from "./hero.types";

export interface HeroProps {
  content: HeroContent;
}

const TITLE_ID = "hero-title";

/**
 * Hero section — Figma file WINXFW2nTM7zYwd5dGgm1T, node 902:304 (1440×800).
 *
 * A Server Component: every animated piece is a client leaf.
 *
 * Horizontal offsets are the frame's own canvas coordinates on the spacing scale
 * (`n px` → `n/4`), and the root font-size tracks the viewport off the 1440 base,
 * so the composition stays proportional at any width.
 *
 * Vertically the section fills the viewport (`h-lvh`, floored at the frame's own
 * 800-unit height — a floor that can no longer bind, now that the root scale is
 * capped by the window's height as well as its width, but which costs nothing
 * and still states the intent) and each piece is anchored to the edge the frame anchors it
 * to: header to the top, lede/CTA/badges to the bottom, markers and the plate to
 * the centre. The product itself is not in this section — it travels into the
 * details screen, so it belongs to `ProductStage` one level up. At 1440×800 every anchor resolves to its exact frame
 * coordinate; on a taller window the gaps breathe instead of the composition
 * being stretched or cropped — it has content in all four corners, so neither
 * would survive. The lattice behind it belongs to the page (see `views/home`).
 */
export const Hero = ({ content }: HeroProps) => (
  <section
    aria-labelledby={TITLE_ID}
    className="relative flex min-h-[calc(100svh-5rem)] w-full flex-col justify-between font-mono text-hero-content lg:block lg:h-lvh lg:min-h-200 lg:gap-0 lg:px-0 lg:pt-0 lg:pb-0"
  >
    <div className="max-lg:contents lg:absolute lg:inset-0">
      {/* First viewport screen on mobile: 3D model in center, title & CTA at bottom */}
      <div className="flex h-[calc(100dvh-3.625rem)] max-lg:h-[calc(100dvh-3.625rem)] w-full flex-col justify-between px-5 pt-4 pb-6 sm:pb-8 shrink-0 lg:contents">
        {/* Edge markers: hidden on mobile per user request, visible on desktop frame */}
        <div className="max-lg:hidden lg:contents">
          <HeroMarker align="start" lines={content.markerStart.lines} />
          <HeroMarker align="end" lines={content.markerEnd.lines} />
        </div>

        <div className="my-auto flex w-full items-center justify-center lg:contents">
          <HeroStage backdrop={content.backdrop} />
        </div>

        <div className="flex flex-col items-center gap-4 shrink-0 sm:gap-6 lg:contents">
          <HeroTitle id={TITLE_ID} lines={content.title} />
          <HeroCta label={content.cta.label} href={content.cta.href} />
        </div>
      </div>

      {/* Badges: placed comfortably below the 100vh fold on mobile, and at the absolute bottom on desktop */}
      <div className="grid auto-rows-fr grid-cols-1 gap-2 px-5 pt-6 pb-12 sm:gap-3 md:grid-cols-2 md:gap-4 lg:contents">
        <HeroBadge
          align="start"
          icon={content.badgeStart.icon}
          caption={content.badgeStart.caption}
          lines={content.badgeStart.lines}
        />
        <HeroBadge
          align="end"
          icon={content.badgeEnd.icon}
          caption={content.badgeEnd.caption}
          lines={content.badgeEnd.lines}
        />
      </div>
    </div>
  </section>
);
