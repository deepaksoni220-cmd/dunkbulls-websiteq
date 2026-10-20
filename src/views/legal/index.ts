import type { Metadata } from "next";
import { generateMetadata as gen } from "@/utils/seo/generate-page-metadata";

export { PrivacyPolicyView } from "./privacy-policy-view";
export { TermsView } from "./terms-view";
export { ShippingReturnsView } from "./shipping-returns-view";

export const privacyMetadata: Metadata = gen({
  title: "Privacy Policy — DUNKBULL",
  description: "Learn how DUNKBULL protects, collects, and manages your personal data across our global technical drops.",
  url: "/privacy-policy",
});

export const termsMetadata: Metadata = gen({
  title: "Terms & Conditions — DUNKBULL",
  description: "Standard operating terms, product drops, bot verification, and operational guidelines for DUNKBULL.",
  url: "/terms-and-conditions",
});

export const shippingMetadata: Metadata = gen({
  title: "Shipping & Returns — DUNKBULL",
  description: "Worldwide express shipping, transparent carrier delivery timelines, and 14-day hassle-free returns.",
  url: "/shipping-returns",
});
