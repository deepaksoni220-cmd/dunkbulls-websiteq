import Image from "next/image";
import { Inview } from "@/components/animation/springs/in-view";

/**
 * Pure visual campaign lookbook banner for the collections page.
 */
export const CollectionsBanner = () => (
  <Inview
    tag="div"
    mode="once"
    from={{ opacity: 0, y: 20 }}
    to={{ opacity: 1, y: 0 }}
    className="hero-lattice-panel relative mb-12 overflow-hidden border border-hero-rule font-mono text-hero-content"
  >
    {/* Top Header Tag bar */}
    <div className="flex flex-wrap items-center justify-between border-b border-hero-rule px-5 py-2.5 text-hero-caption max-sm:gap-2">
      <div className="flex items-center gap-2.5">
        <span className="size-2 animate-pulse bg-hero-content" />
        <span className="font-bold tracking-hero-display">DUNKBULL CAMPAIGN // LOOKBOOK</span>
      </div>
      <div className="flex items-center gap-4 text-hero-content/60">
        <span>SAME SPIRIT</span>
        <span className="hidden sm:inline">•</span>
        <span>BIGGER MOVES</span>
        <span className="hidden sm:inline">•</span>
        <span>BUILT DIFFERENT</span>
      </div>
    </div>

    {/* Campaign Banner Artwork */}
    <div className="relative h-60 w-full overflow-hidden bg-black sm:h-76 md:h-92 lg:h-104">
      <Image
        src="/assets/collections/dunkbull-tee-banner.jpg"
        alt="DUNKBULL Built Different Lookbook Campaign"
        fill
        priority
        sizes="(min-width: 1024px) 1200px, 100vw"
        className="object-cover object-top"
      />

      {/* Technical corner brackets */}
      <span className="absolute top-3 left-3 size-2.5 border-t border-l border-white/60" />
      <span className="absolute top-3 right-3 size-2.5 border-t border-r border-white/60" />
      <span className="absolute bottom-3 left-3 size-2.5 border-b border-l border-white/60" />
      <span className="absolute bottom-3 right-3 size-2.5 border-b border-r border-white/60" />
    </div>
  </Inview>
);
