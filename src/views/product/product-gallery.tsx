"use client";

import Image from "next/image";
import { useState } from "react";

import type { ProductImage } from "@/data/products";
import { Product3DScene, type ProductColorway } from "./product-3d-scene";

export interface ProductGalleryProps {
  images: ProductImage[];
  name: string;
}

const TRANSITION = "transition duration-[var(--duration-fast)] ease-entrance";

export const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const activeImage = images[activeIdx] ?? images[0];

  const getColorway = (): ProductColorway => {
    const lower = name.toLowerCase();
    if (lower.includes("black")) return "black";
    if (lower.includes("off-white")) return "off-white";
    return "qest-wite";
  };

  const colorway = getColorway();

  return (
    <div className="flex flex-col gap-4">
      {/* 2D / 3D Mode Toggle Tabs */}
      <div className="flex items-center justify-between border-b border-hero-rule pb-2">
        <div className="flex gap-2 font-mono">
          <button
            type="button"
            onClick={() => setViewMode("2d")}
            className={`border px-3 py-1.5 text-hero-caption font-bold uppercase ${TRANSITION} ${
              viewMode === "2d"
                ? "border-hero-content bg-hero-content text-hero-surface"
                : "border-hero-rule text-hero-content/60 hover:border-hero-content hover:text-hero-content"
            }`}
          >
            2D STUDIO
          </button>
          <button
            type="button"
            onClick={() => setViewMode("3d")}
            className={`flex items-center gap-1.5 border px-3 py-1.5 text-hero-caption font-bold uppercase ${TRANSITION} ${
              viewMode === "3d"
                ? "border-hero-content bg-hero-content text-hero-surface"
                : "border-hero-rule text-hero-content/60 hover:border-hero-content hover:text-hero-content"
            }`}
          >
            <span className={`size-1.5 rounded-full ${viewMode === "3d" ? "bg-emerald-400" : "bg-hero-content/40"}`} />
            3D VIEW
          </button>
        </div>

        <span className="font-mono text-[0.6875rem] text-hero-content/50 uppercase">
          {viewMode === "3d" ? "DRAG TO ROTATE" : "STUDIO SHOT"}
        </span>
      </div>

      {/* Main Showcase Stage */}
      {viewMode === "3d" ? (
        <Product3DScene colorway={colorway} />
      ) : (
        <div className="hero-lattice-panel relative flex aspect-square w-full items-center justify-center overflow-hidden border border-hero-rule p-6 lg:p-10">
          {images.length > 1 && (
            <div className="absolute top-4 left-4 text-hero-caption text-neutral-500 font-bold">
              VIEW // {String(activeIdx + 1).padStart(2, "0")} OF {String(images.length).padStart(2, "0")}
            </div>
          )}

          {activeImage.label && (
            <div className="absolute top-4 right-4 border border-neutral-300 bg-neutral-100 px-2 py-0.5 text-hero-caption font-bold text-neutral-800">
              {activeImage.label}
            </div>
          )}

          <Image
            src={activeImage.src}
            alt={activeImage.alt || name}
            width={activeImage.width}
            height={activeImage.height}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="size-full object-contain"
          />

          {/* Framing corner markers */}
          <span className="absolute top-2 left-2 size-2 border-t border-l border-neutral-400" />
          <span className="absolute top-2 right-2 size-2 border-t border-r border-neutral-400" />
          <span className="absolute bottom-2 left-2 size-2 border-b border-l border-neutral-400" />
          <span className="absolute bottom-2 right-2 size-2 border-b border-r border-neutral-400" />
        </div>
      )}

      {/* Angle Thumbnails (only shown if multiple images exist in 2D mode) */}
      {viewMode === "2d" && images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActiveIdx(idx)}
              aria-label={`View ${img.label || `angle ${idx + 1}`}`}
              className={`relative aspect-square w-20 overflow-hidden rounded border bg-white p-2 ${TRANSITION} ${
                activeIdx === idx
                  ? "border-hero-content ring-2 ring-hero-content"
                  : "border-hero-rule/60 opacity-70 hover:border-hero-content hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt=""
                width={120}
                height={120}
                className="size-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
