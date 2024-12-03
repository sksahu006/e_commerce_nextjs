import { atom } from "recoil";

export type WishlistItem = {
  id: string;
  name: string;
  images: string[];
  discountPrice: number;
  basePrice: number;
};


export const wishlistCountState = atom<number>({
  key: "wishlistCountState", 
  default: 0, 
});


export const wishlistItemsAtom = atom<WishlistItem[]>({
  key: "wishlistItemsAtom",
  default: [], 
});
