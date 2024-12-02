import { getAllAddresses } from "@/app/actions/userActions/address";
import { useQuery } from "@tanstack/react-query";


export function useUserAddresses(userId: string) {
    return useQuery({
        queryKey: ["userAddresses",userId],
        queryFn: () => getAllAddresses(userId),
        staleTime: 1000 * 60 * 5,
      
    });
}
