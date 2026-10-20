/** Available garment sizes, in display order. */
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type ProductSize = (typeof SIZES)[number];
