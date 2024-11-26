// Adjust the import path accordingly
import { fetchAllProducts } from "@/app/actions/userActions/allproducts";
import { useQuery } from "@tanstack/react-query";

interface ProductFilter {
  colors?: string[];
  categories?: string[];
  sizes?:string[];
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string; 
}

export function useFilteredProducts(filters: ProductFilter = {}) {
  return useQuery({
    queryKey: ["filteredProducts", filters], 
    queryFn: () => fetchAllProducts(filters),
    staleTime: 1000 * 60 * 5, 
    placeholderData: [],
  });
}
