import type { CartContent } from "@/views/cart/cart.types";

/**
 * Placeholder cart content.
 *
 * The items mirror the four products in `homeCollections`. In production these
 * come from a cart store / session; for now they give the UI something real to
 * render so every state (filled, empty) can be verified visually.
 *
 * Set `items: []` to test the empty state.
 */
export const mockCart: CartContent = {
  items: [
    {
      id: "shadow-puffer-jacket",
      name: "DUNKBULL ORIGINALS BLACK T-SHIRT OVERSIZED FITS",
      price: 700,
      quantity: 1,
      size: "L",
      image: {
        src: "/assets/collections/dunkbull-black-tee.png",
        alt: "DUNKBULL Originals Black T-Shirt — pitch black",
        width: 1080,
        height: 1080,
      },
    },
    {
      id: "tactical-hooded-jacket",
      name: "DUNKBULL ORIGINALS OFF-WHITE T-SHIRT OVERSIZED FITS",
      price: 700,
      quantity: 1,
      size: "M",
      image: {
        src: "/assets/collections/dunkbull-offwhite-tee.png",
        alt: "DUNKBULL Originals Off-White T-Shirt — off-white",
        width: 1080,
        height: 1080,
      },
    },
  ],
};
