import type { HeroImage } from "@/views/home/hero/hero.types";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: HeroImage;
}

export interface CartContent {
  items: CartItem[];
}
