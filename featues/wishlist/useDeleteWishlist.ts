import { removeFromWishlist } from "@/app/actions/userActions/wishlist";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { userId: string; productId: string }) =>
      removeFromWishlist(data.userId, data.productId),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });

    },
    onError: (error) => {
      console.error("Error removing from wishlist:", error);
    },
  });
};
