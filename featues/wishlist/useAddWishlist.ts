import { addToWishlist } from "@/app/actions/userActions/wishlist";
import { toast } from "@/hooks/use-toast";
import { wishlistCountState, wishlistItemsAtom } from "@/stores/atoms/wishlistAtoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";


export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  const [wishlist, setWishlistCount] = useRecoilState(wishlistCountState);
  const [wishlistItems, setWishlistItems] = useRecoilState(wishlistItemsAtom);

  return useMutation({
    mutationFn: (data: { userId: string; productId: string }) =>
      addToWishlist(data.userId, data.productId),
    
    onSuccess: () => {
      toast({
        title: "Success",
        variant:"default",
        description: "Item added to wishlist",
      });
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });

    },
    onError: (error) => {

      console.error("Error adding to wishlist:", error.message);
    },
  });
};
