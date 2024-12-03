import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { wishlistCountState, wishlistItemsAtom } from "@/stores/atoms/wishlistAtoms";
import { getWishlist } from "@/app/actions/userActions/wishlist";

export const useWishlist = (userId: string) => {
    const [wishlist, setWishlistCount] = useRecoilState(wishlistCountState);
    const [wishlistItems, setWishlistItems] = useRecoilState(wishlistItemsAtom);

    return useQuery({
        queryKey: ["wishlist", userId],
        queryFn: async () => {
            const wishlistResponse = await getWishlist(userId);
            if (wishlistResponse.success && wishlistResponse.data) {

                setWishlistItems(wishlistResponse.data);

                setWishlistCount(wishlistResponse.data.length);
             
                return wishlistResponse.data;
            } else {
                setWishlistItems([]);
                setWishlistCount(0);
                return [];
            }
        },
        enabled: !!userId,
    });
};
