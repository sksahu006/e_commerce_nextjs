import { getProduct } from "@/app/actions/adminActions/product";
// import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

// Custom hook to fetch a single product
export function useSingleProduct(id: string) {
  return useQuery({
    queryKey: ["singleProduct", id], 
    queryFn: () => getProduct(id),
    staleTime: 1000 * 60 * 5, 
    enabled: !!id, 
  });
}
