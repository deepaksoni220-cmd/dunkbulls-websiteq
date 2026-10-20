import { Inview } from "@/components/animation/springs/in-view";
import { ScrambleText } from "@/components/ui/scramble-text";

import { FaqList } from "./faq-list";
import { FaqStage } from "./faq-stage";

import type { FaqContent } from "./faq.types";

export interface FaqProps {
  content: FaqContent;
  /** Anchor id so nav links can jump directly to this section. */
  id?: string;
}

const HEADING_ID = "faq-heading";

/**
 * FAQ section — Figma file WINXFW2nTM7zYwd5dGgm1T, node 1748:1158, the fifth
 * block of the concept.
 *
 * A Server Component; every animated piece is a client leaf.
 *
 * On mobile devices, questions and answers render as swipeable horizontal cards
 * with touch-scroll snapping, slide pagination indicators and navigation arrows.
 * On desktop (from `lg`), cards display as the full-height description list
 * aligned to the Figma frame coordinates.
 */
export const Faq = ({ content, id }: FaqProps) => (
  <section
    id={id}
    aria-labelledby={HEADING_ID}
    data-product-region
    className="relative flex w-full flex-col gap-10 overflow-hidden px-5 py-16 font-mono text-hero-content lg:block lg:h-200 lg:gap-0 lg:px-0 lg:py-0"
  >
    <div className="max-lg:contents lg:absolute lg:inset-x-0 lg:top-1/2 lg:-mt-100 lg:h-200">
      <FaqStage subject={content.subject} />

      <Inview
        tag="h2"
        id={HEADING_ID}
        mode="once"
        from={{ opacity: 0, y: 20 }}
        to={{ opacity: 1, y: 0 }}
        className="text-hero-display-compact leading-hero-headline tracking-hero-display text-hero-content [text-box:trim-both_cap_alphabetic] sm:text-hero-display-tablet lg:text-hero-display lg:absolute lg:top-34 lg:left-10 lg:z-10 lg:w-64.5"
      >
        <ScrambleText revealInView tieProse>
          {content.heading}
        </ScrambleText>
      </Inview>

      <FaqList entries={content.entries} />
    </div>
  </section>
);
