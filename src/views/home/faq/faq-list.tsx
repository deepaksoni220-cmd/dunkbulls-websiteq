"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import { ScrambleText } from "@/components/ui/scramble-text";

import { FaqAnimatedIcon } from "./faq-animated-icon";
import type { FaqEntry } from "./faq.types";

export interface FaqListProps {
  entries: FaqEntry[];
}

const ROW_DELAY = 80;
const ROW_STEP = 90;
const TRANSITION = "transition duration-[var(--duration-fast)] ease-entrance";

export const FaqList = ({ entries }: FaqListProps) => {
  const scrollContainerRef = useRef<HTMLDListElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = Array.from(container.children) as HTMLElement[];
      if (cards.length === 0) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIdx = 0;
      let minDistance = Infinity;

      cards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = i;
        }
      });

      setActiveIdx(closestIdx);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCard = (idx: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    if (idx >= 0 && idx < cards.length) {
      const card = cards[idx];
      if (card) {
        const containerPadding = 20;
        const targetScroll = card.offsetLeft - container.offsetLeft - containerPadding;
        container.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: "smooth",
        });
        setActiveIdx(idx);
      }
    }
  };

  return (
    <div className="flex flex-col lg:contents">
      {/* Description List: Swipeable horizontal snap-row on mobile, vertical stack on desktop */}
      <dl
        ref={scrollContainerRef}
        className="max-lg:-mx-5 max-lg:px-5 max-lg:flex max-lg:flex-row max-lg:gap-3 max-lg:overflow-x-auto max-lg:snap-x max-lg:snap-mandatory max-lg:pb-2 max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden max-lg:[-webkit-overflow-scrolling:touch] max-lg:scroll-pl-5 max-lg:scroll-pr-5 lg:absolute lg:top-34 lg:right-10 lg:z-10 lg:flex lg:w-168.5 lg:flex-col lg:gap-3"
      >
        {entries.map((entry, index) => (
          <Inview
            tag="div"
            key={entry.index}
            mode="once"
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            delayIn={ROW_DELAY + index * ROW_STEP}
            className="hero-lattice-panel flex flex-col justify-between border border-hero-rule p-5 max-lg:w-[84vw] max-lg:max-w-96 max-lg:shrink-0 max-lg:snap-start lg:h-28.5 lg:w-full lg:flex-row lg:items-center lg:gap-0 lg:px-4 lg:py-0 lg:shrink"
          >
            {/* Question column: mobile includes header with index and icon */}
            <dt className="flex shrink-0 flex-col gap-3 lg:flex-col lg:w-48.75 lg:justify-center lg:gap-8">
              {/* Mobile Top Header: Index chip & Animated Icon */}
              <div className="flex items-center justify-between border-b border-hero-rule pb-3 lg:hidden">
                <span className="border border-hero-rule px-2 py-0.5 text-hero-caption text-hero-content/60">
                  {`// 0${index + 1}`}
                </span>
                <FaqAnimatedIcon id={entry.index} />
              </div>

              {/* Question Text */}
              <span
                className="block text-hero-body font-bold leading-hero-display text-hero-content max-sm:prose-even lg:max-w-[var(--faq-question)]"
                style={
                  {
                    "--faq-question": `${(entry.questionWidth ?? 175) / 16}rem`,
                  } as CSSProperties
                }
              >
                <ScrambleText
                  revealInView
                  revealDelay={ROW_DELAY + index * ROW_STEP}
                >
                  {entry.question}
                </ScrambleText>
              </span>

              {/* Desktop Animated Icon */}
              <div className="hidden lg:flex lg:items-center">
                <FaqAnimatedIcon id={entry.index} />
              </div>
            </dt>

            {/* Answer cell: styled with hairline border separation */}
            <dd className="min-w-px text-hero-body leading-hero-prose text-hero-content-muted uppercase max-sm:prose-even max-lg:mt-4 max-lg:border-t max-lg:border-hero-rule max-lg:pt-4 lg:ml-8 lg:flex lg:h-28 lg:flex-1 lg:items-start lg:border-l lg:border-hero-rule lg:pt-[0.92rem] lg:pl-8">
              <ScrambleText
                tieProse
                revealInView
                revealDelay={ROW_DELAY + index * ROW_STEP + 60}
              >
                {entry.answer}
              </ScrambleText>
            </dd>
          </Inview>
        ))}
      </dl>

      {/* Mobile Swipe Pagination & Control Bar */}
      <div className="mt-4 flex items-center justify-between border-t border-hero-rule pt-4 text-hero-caption text-hero-content/60 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="uppercase text-hero-content/50">SWIPE</span>
          <span className="border border-hero-rule px-2 py-0.5 text-hero-content font-bold">
            {`0${activeIdx + 1} / 0${entries.length}`}
          </span>
        </div>

        {/* Pill Dots */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="FAQ slides">
          {entries.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToCard(i)}
              className={`h-1.5 rounded-full ${TRANSITION} ${
                activeIdx === i
                  ? "w-5 bg-hero-content"
                  : "w-1.5 bg-hero-rule hover:bg-hero-content/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={activeIdx === i}
              role="tab"
            />
          ))}
        </div>

        {/* Arrow Navigation */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scrollToCard(activeIdx - 1)}
            disabled={activeIdx === 0}
            className={`border border-hero-rule px-2.5 py-1 text-xs uppercase disabled:opacity-20 hover:border-hero-content hover:text-hero-content ${TRANSITION}`}
            aria-label="Previous question"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollToCard(activeIdx + 1)}
            disabled={activeIdx === entries.length - 1}
            className={`border border-hero-rule px-2.5 py-1 text-xs uppercase disabled:opacity-20 hover:border-hero-content hover:text-hero-content ${TRANSITION}`}
            aria-label="Next question"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};
