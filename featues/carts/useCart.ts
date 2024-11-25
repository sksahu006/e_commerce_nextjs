import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { AddToCartParams } from '@/lib/types/schemaTypes';
import { addToCart, getCartCount } from '@/app/actions/userActions/cartActions';
import { cartCountState } from '@/stores/atoms/cartAtoms';

export const useCart = (userId: string) => {
  const [cartCount, setCartCount] = useRecoilState(cartCountState);
  const queryClient = useQueryClient();

  // Query to fetch cart count using server action
  const { data: initialCartCount } = useQuery({
    queryKey: ['cartCount', userId],
    queryFn: async () => {
      const count = await getCartCount(userId);
      setCartCount(count);
      return count;
    },
    enabled: !!userId, // Only run query if userId exists
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
      queryClient.invalidateQueries({ queryKey: ['cartCount', userId] });
    },
  });

  return {
    cartCount,
    addToCartMutation,
  };
};