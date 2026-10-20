import type { Metadata } from "next";
import { generateMetadata as gen } from "@/utils/seo/generate-page-metadata";

export { FaqView } from "./faq-view";

export const faqMetadata: Metadata = gen({
  title: "FAQ — DUNKBULL",
  description: "Frequently asked questions about DUNKBULL technical garments, sizing, heavyweight organic cotton, drops, and express delivery.",
  url: "/faq",
});
