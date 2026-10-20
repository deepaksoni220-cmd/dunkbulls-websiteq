"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { CartItem } from "@/views/cart/cart.types";

interface CartStore {
  items: CartItem[];
  /** Total number of individual units across all line items. */
  count: () => number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  remove: (id: string, size?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string) => void;
  updateSize: (id: string, newSize: string, currentSize?: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      count: () => get().items.reduce((n, item) => n + item.quantity, 0),

      addItem: ({ quantity = 1, ...incoming }) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === incoming.id && i.size === incoming.size,
          );
          if (existing) {
            // Already in cart with identical size — bump quantity
            return {
              items: state.items.map((i) =>
                i.id === incoming.id && i.size === incoming.size
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...incoming, quantity }] };
        }),

      remove: (id, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && (size === undefined || item.size === size)),
          ),
        })),

      updateQuantity: (id, quantity, size) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && (size === undefined || item.size === size)
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        })),

      updateSize: (id, newSize, currentSize) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && (currentSize === undefined || item.size === currentSize)
              ? { ...item, size: newSize }
              : item,
          ),
        })),

      clear: () => set({ items: [] }),
    }),
    {
      name: "dunkbull-cart-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            },
      ),
    },
  ),
);
