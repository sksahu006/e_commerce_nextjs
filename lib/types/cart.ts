export interface CartItem {
    id: string;
    variantId: string;
    quantity: number;
    variant: {
      id: string;
      product: {
        id: string;
        name: string;
        images: string[];
        basePrice: number;
        discountPrice: number | null;
      };
      size: {
        name: string;
      };
      color: {
        name: string;
        hexCode: string;
      };
    };
  }
  
  export interface CartState {
    items: CartItem[];
    isOpen: boolean;
    isLoading: boolean;
  }
  