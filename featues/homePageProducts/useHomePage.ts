
import { fetchHomePageData } from "@/app/actions/userActions/homepageproducts";

import {  ProductVariant } from "@/lib/types/schemaTypes";
import { useQuery, UseQueryResult } from "@tanstack/react-query";


// type Product = {
//     id: string;
//     name: string;
//     slug: string;
//     images: string[];
//     description: string | null;
//     basePrice: number;
//     discountPrice: number | null; 
//     featured: boolean;
//     status: string;
//     createdAt: string; 
//     updatedAt: string; 
//     brand: Brand;
//     brandId: string;
//     categories: Array<{
//       category: Category;
//       productId: string;
//       categoryId: string;
//     }>;
//     variants: ProductVariant[];
//   };
//   type Brand = {
//     id: string;
//     name: string;
//   };
  
//   type Category = {
//     id: string;
//     name: string;
//     description?: string; // Optional description if it's not always provided
//   };

//   type ProductData = {
//     featuredProducts: Product[];
//     newArrivals: Product[];
//   };
  


  export function useHomePageData() {
    return useQuery({
      queryKey: ["homepagedata"],
      queryFn: ()=>fetchHomePageData(),
      staleTime: 1000 * 60 * 5, 
      placeholderData: {
        featuredProducts: [],
        newArrivals: [],
      }, 
    });
  }