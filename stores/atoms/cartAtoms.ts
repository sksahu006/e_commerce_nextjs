import { CartItem } from "@/lib/types/cart";
import { atom } from "recoil";

export const cartCountState = atom({
  key: "cartCountState",
  default: 0,
});

export const cartItemsAtom = atom<CartItem[]>({
  key: "cartItemsAtom",
  default: [],
});
