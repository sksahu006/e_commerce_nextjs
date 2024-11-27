import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { AddToCartParams } from "@/lib/types/schemaTypes";
import {
  addToCart,
  deleteFromCart,
  getCartCount,
  getCartItems,
} from "@/app/actions/userActions/cartActions";
import { cartCountState, cartItemsAtom } from "@/stores/atoms/cartAtoms";

export const useCart = (userId: string) => {
  const [cartCount, setCartCount] = useRecoilState(cartCountState);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const queryClient = useQueryClient();

  // Fetch cart count
  useQuery({
    queryKey: ["cartCount", userId],
    queryFn: async () => {
      const count = await getCartCount(userId);
      setCartCount(count);
      return count;
    },
    enabled: !!userId,
  });

  useQuery({
    queryKey: ["cartItems", userId],
    queryFn: async () => {
      const cartResponse = await getCartItems(userId);
      if (cartResponse.success && cartResponse.cart) {
        setCartItems(cartResponse.cart.cartItems);
        return cartResponse.cart.cartItems;
      } else {
        setCartItems([]);
        return [];
      }
    },
    enabled: !!userId,
  });

  // Mutation to add to cart
  const addToCartMutation = useMutation({
    mutationFn: async (params: AddToCartParams) => {
      const result = await addToCart(params);
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: (data) => {
      if (data.count !== undefined) {
        setCartCount(data.count);
      }
      queryClient.invalidateQueries({ queryKey: ["cartItems", userId] });
      queryClient.invalidateQueries({ queryKey: ["cartCount", userId] });
    },
  });

  const deleteFromCartMutation = useMutation({
    mutationFn: async ({
      userId,
      variantId,
    }: {
      userId: string;
      variantId: string;
    }) => {
      const result = await deleteFromCart({ userId, variantId });
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: (data) => {
      if (data.count !== undefined) {
        setCartCount(data.count);
      }
      queryClient.invalidateQueries({ queryKey: ["cartItems", userId] });
      queryClient.invalidateQueries({ queryKey: ["cartCount", userId] });
    },
  });

  return {
    cartCount,
    cartItems,
    addToCartMutation,
    deleteFromCartMutation
  };
};
