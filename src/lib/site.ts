/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update the placeholder values per project.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "DUNKBULL",
  description:
    "Heavyweight 260 GSM oversized cotton t-shirts engineered for structure, drape and everyday durability. Built to endure — drop-shoulder silhouette, tight-spun jersey and signature branding.",
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Default Open Graph / Twitter share image (path under `public/`). */
  ogImage: "/open-graph.png",
  twitterHandle: undefined as string | undefined,
  author: "DUNKBULL",
  /** Browser theme-color (address bar / PWA). */
  themeColor: "#000000",
} as const;
