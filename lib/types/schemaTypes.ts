import { User } from "@prisma/client";
export type SafeUser = Omit<User, "passwordHash">;

export type SignUpData = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
};

export type ProductItemData = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  description?: string | null;
  basePrice: number;
  discountPrice?: number | null;
  featured: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  brand: Brand;
  brandId: string;
  categories: Array<{
    category: Category;
    productId: string;
    categoryId: string;
  }>;
};

export type Product = ProductItemData & {
  variants: ProductVariant[];
  reviews: Review[];
  wishlistItems: WishlistItem[];
};

export type Brand = {
  id: string;
  name: string;
  logo?: string | null;
  description?: string | null;
  products: Product[];
};

export type Category = {
  id: string;
  name: string;
  description?: string | null;
  products: ProductCategory[];
};

export type ProductCategory = {
  product: Product;
  productId: string;
  category: Category;
  categoryId: string;
};

export type Size = {
  id: string;
  name: string;
  variants: ProductVariant[];
};

export type SizeTableItem = {
  id: string;
  name: string;
};

export type ColorTableItem = {
  id: string;
  name: string;
  hexCode: string;
};

export type Color = {
  id: string;
  name: string;
  hexCode: string;
  variants: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  product: Product;
  productId: string;
  size: Size;
  sizeId: string;
  color: Color;
  colorId: string;
  stockQuantity: number;
  additionalPrice: number; // Decimal type
  orderItems: OrderItem[];
  cartItems: CartItem[];

  // Unique constraint
};

export type Order = {
  id: string;
  user: User;
  userId: string;
  status: string;
  totalAmount: number; // Decimal type
  quantity: number;
  trackingNumber?: string | null;
  shippingAddress: ShippingAddress;
  shippingAddressId: string;
  paymentMethod: PaymentMethod;
  paymentMethodId: string;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
};

export type OrderItem = {
  id: string;
  order: Order;
  orderId: string;
  variant: ProductVariant;
  variantId: string;
  quantity: number;
  pricePerUnit: number; // Decimal type
};

export type ShippingAddress = {
  id: string;
  user: User;
  userId: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string | null;
  default: boolean; // Default value is false
  orders: Order[];
};

export type Review = {
  id: string;
  product: Product;
  productId: string;
  user: User;
  userId: string;
  title?: string | null;
  rating: number;
  comment?: string | null;
  createdAt: Date;
};

export type Coupon = {
  id: string;
  code: string;
  discountType: string; // 'percentage' or 'fixed'
  discountValue: number; // Decimal type
  validFrom: Date;
  validTo: Date;
  isActive: boolean; // Default value is true
  usageLimit?: number | null; // Null means unlimited
  usageCount: number; // Default value is zero
};

export type Cart = {
  id: string;
  user: User;
  userId: string; // Unique constraint
  createdAt: Date;
  updatedAt: Date;
  cartItems: CartItem[];
};

export type CartItem = {
  id: string;
  cart: Cart;
  cartId: string;
  variant: ProductVariant;
  variantId: string;
  quantity: number;
};

export type PaymentMethod = {
  id: string;
  type: string; // e.g., 'credit_card', 'paypal', 'bank_transfer'
  provider?: string | null; // e.g., 'visa', 'mastercard', 'paypal'
  accountNumber?: string | null; // Last four digits for credit cards
  expiryDate?: Date | null; // For credit cards
  isDefault: boolean; // Default value is false
  orders: Order[];
};

export type Wishlist = {
  id: string;
  user: User;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  wishlistItems: WishlistItem[];
};

export type WishlistItem = {
  id: string;
  wishlist: Wishlist;
  wishlistId: string;
  product: Product;
  productId: string;
  addedAt: Date;
};

export interface AddToCartParams {
  userId: string;
  variantId: string;
  quantity: number;
}

export interface AddToCartResponse {
  success: boolean;
  message: string;
  count?: number;
}
