import { fetchHomePageData } from "@/app/actions/userActions/homepageproducts";

import { useQuery } from "@tanstack/react-query";

export function useHomePageData() {
  return useQuery({
    queryKey: ["homepagedata"],
    queryFn: () => fetchHomePageData(),
    staleTime: 1000 * 60 * 5,
    placeholderData: {
      featuredProducts: [],
      newArrivals: [],
    },
  });
}
