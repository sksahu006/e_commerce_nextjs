import { Decimal } from "@prisma/client/runtime/library";

export type CartItem = {
  id: string;
  quantity: number;
  variantId:string;
  variant: {
    product: {
      name: string;
      basePrice: Decimal;
      discountPrice: Decimal | null; 
      images: string[];
    };
    size: {
      name: string;
    };
    color: {
      name: string;
      hexCode: string;
    };
  };
};

export type Cart = {
  id: string;
  cartItems: CartItem[];
};

export type CartResponse = {
  success: boolean;
  message: string;
  cart?: Cart | null;
};
