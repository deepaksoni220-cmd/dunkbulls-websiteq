"use client";

import { useState } from "react";
import { Inview } from "@/components/animation/springs/in-view";

interface FaqItem {
  index: string;
  category: "sizing" | "materials" | "shipping" | "orders";
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    index: "01",
    category: "sizing",
    question: "HOW DO I CHOOSE THE RIGHT SIZE?",
    answer:
      "Our t-shirts feature a contemporary relaxed, dropped-shoulder oversized silhouette engineered for clean, substantial drape. Check our measurements table on each product page: if you prefer a standard tailored fit, consider sizing down; for the intended boxy aesthetic, choose your regular size.",
  },
  {
    index: "02",
    category: "materials",
    question: "WHAT MATERIALS ARE USED IN THE GARMENTS?",
    answer:
      "We build exclusively with ultra-heavyweight 100% combed organic cotton (260 GSM) featuring a high-gauge tight-spun jersey weave, reinforced ribbed crewneck collars, and high-density screenprinting engineered to hold structural shape.",
  },
  {
    index: "03",
    category: "materials",
    question: "HOW SHOULD I CARE FOR MY GARMENTS?",
    answer:
      "To preserve the 4K diffuse fabric finish and screen graphics, wash inside out on a gentle cold cycle (30°C / 85°F). Avoid harsh detergents and bleach. Hang dry in shade; do not tumble dry. If ironing is necessary, iron inside out on low heat avoiding direct graphic contact.",
  },
  {
    index: "04",
    category: "shipping",
    question: "DO YOU SHIP INTERNATIONALLY?",
    answer:
      "Yes. We offer fully tracked express worldwide shipping to over 180 countries via DHL Express and FedEx Priority. Shipping costs and estimated delivery times are calculated transparently during checkout based on your destination address.",
  },
  {
    index: "05",
    category: "shipping",
    question: "CAN I RETURN OR EXCHANGE MY ORDER?",
    answer:
      "Yes. We accept returns and size exchanges within 14 days of delivery. All garments must be unworn, unwashed, and returned in their original packaging with all security badges and tags intact. Contact returns@dunkbull.com to obtain your pre-paid shipping label.",
  },
  {
    index: "06",
    category: "orders",
    question: "HOW OFTEN DO NEW DROPS RELEASE?",
    answer:
      "DUNKBULL operates on a limited-quantity seasonal capsule model rather than mass-market replenishment. New editions are announced exclusively through our newsletter subscriber dispatch and official Instagram channel. Once a colorway run is exhausted, it is archived.",
  },
  {
    index: "07",
    category: "orders",
    question: "CAN I MODIFY OR CANCEL MY ORDER AFTER PLACING IT?",
    answer:
      "Due to our rapid automated warehouse processing, orders enter dispatch queuing within 1 hour. If you need to correct a shipping address or cancel, contact support@dunkbull.com immediately with your Order Number.",
  },
  {
    index: "08",
    category: "orders",
    question: "WHAT PAYMENT METHODS DO YOU ACCEPT?",
    answer:
      "We accept all major credit and debit cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, PayPal, and regional accelerated checkouts. All transactions are tokenized with 256-bit encryption through certified PCI-DSS Level 1 payment processors.",
  },
];

const CATEGORIES = [
  { id: "all", label: "ALL QUESTIONS" },
  { id: "sizing", label: "SIZING & FIT" },
  { id: "materials", label: "MATERIALS & CARE" },
  { id: "shipping", label: "SHIPPING & RETURNS" },
  { id: "orders", label: "ORDERS & DROPS" },
] as const;

export const FaqInteractive = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedIndex, setExpandedIndex] = useState<string | null>("01");

  const filteredItems =
    activeCategory === "all"
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.category === activeCategory);

  return (
    <div>
      {/* Category Filter Tabs */}
      <nav aria-label="FAQ Categories" className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`border px-4 py-2 text-hero-caption font-bold uppercase transition ${
              activeCategory === cat.id
                ? "border-hero-content bg-hero-content text-hero-surface"
                : "border-hero-rule bg-transparent text-hero-content/70 hover:border-hero-content hover:text-hero-content"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Accordion / FAQ List */}
      <dl className="flex flex-col gap-4">
        {filteredItems.map((item, index) => {
          const isExpanded = expandedIndex === item.index;

          return (
            <Inview
              tag="section"
              key={item.index}
              mode="once"
              from={{ opacity: 0, y: 16 }}
              to={{ opacity: 1, y: 0 }}
              delayIn={index * 40}
              className="hero-lattice-panel overflow-hidden border border-hero-rule transition hover:border-hero-content/40"
            >
              <dt>
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isExpanded ? null : item.index)}
                  className="flex w-full items-center justify-between p-6 text-left transition select-none lg:p-8"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-hero-caption font-bold text-hero-content/40">
                      {"// "}{item.index}
                    </span>
                    <h2 className="text-hero-body leading-hero-display font-bold text-hero-content uppercase">
                      {item.question}
                    </h2>
                  </div>
                  <span className="flex size-7 shrink-0 items-center justify-center border border-hero-rule text-hero-body font-bold text-hero-content">
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>
              </dt>

              {isExpanded && (
                <dd className="border-t border-hero-rule p-6 pt-4 lg:p-8 lg:pt-6">
                  <p className="max-w-3xl text-hero-body leading-hero-prose text-hero-content-muted uppercase">
                    {item.answer}
                  </p>
                </dd>
              )}
            </Inview>
          );
        })}
      </dl>
    </div>
  );
};
