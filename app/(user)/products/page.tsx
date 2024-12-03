"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Heart, HeartIcon, ShoppingCart } from "lucide-react"
import { useParams, useSearchParams } from "next/navigation";
import ProductSidebar from "@/components/ProductSidebar"
import { useFilteredProducts } from "@/featues/allproductsUser/useProductsUser"
import { Skeleton } from "@/components/ui/skeleton";
import CardSkeliton from "@/components/skelitons/Productcardskeliton";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAddToWishlist } from "@/featues/wishlist/useAddWishlist";
import { useRemoveFromWishlist } from "@/featues/wishlist/useDeleteWishlist";
import { useDebounce } from "@/lib/debounce";
import { useRecoilState } from "recoil";
import { WishlistItem, wishlistItemsAtom } from "@/stores/atoms/wishlistAtoms";
import { useWishlist } from "@/featues/wishlist/useGetWishlist";


export default function ProductSection() {

  const searchParams = useSearchParams()
  const { data: session } = useSession();
  const userId = session?.user?.id || '';

  const params = Object.fromEntries(searchParams.entries());

  const {
    search,
    colors,
    categories,
    sizes,
    minPrice,
    maxPrice,
  } = params;

  const { data, isError, isFetched, isFetching, isLoading } = useFilteredProducts({
    searchQuery: search,
    colors: colors?.split(',') || [],
    categories: categories?.split(',') || [],
    sizes: sizes?.split(',') || [],
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
  })
  const { mutate: addToWishlist } = useAddToWishlist();
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();

  const allwishList = useWishlist(userId)
  //console.log(allwishList)

  const [wishlist, setWishlist] = useRecoilState(wishlistItemsAtom);

  const addProductToWishlist = useDebounce((productId: string) => {
    const product = wishlist.find(item => item.id === productId);

    try {
      if (product) {
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
        removeFromWishlist({ userId, productId });
        console.log("removed")

      } else {
        addToWishlist({ userId, productId });
      }
    } catch (error) {

    }

  }, 300);

  const areProductsInWishlist = (productId: string): boolean => {

    return wishlist.some((item) => item.id === productId);
  };



  if (isLoading || isFetching) return <div className="pt-28 flex flex-col md:flex-row gap-8">
    <ProductSidebar />
    <span>
      <CardSkeliton />
    </span>


  </div>;

  if (isError) return <div>Error fetching products.</div>;

  if (data?.length === 0) return <div className="pt-28 flex flex-col md:flex-row gap-8">
    <ProductSidebar />
    <span>
      no such data present
    </span>


  </div>;

  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <div className="flex flex-col md:flex-row gap-8">

        <ProductSidebar />

        {/* Product Grid */}

        <main className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Products</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {data?.map((product, key) => (
              <Link
                href={`/products/${product.id}`}
                key={key}
                className="block border h-[400px] rounded-lg overflow-hidden shadow-sm relative"
              >
                <div className="relative group">
                  <div className="relative overflow-hidden h-[300px] pt-[100%]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="absolute h-[100%] w-full object-cover inset-0 transition-opacity duration-300 rounded-md"
                    />
                    <span className="absolute font-bold uppercase text-center tracking-widest w-full text-white bottom-0 font-TwentiethCenturyforKenmoreLight left-0 text-[12px] bg-gray-900/70 text-primary-foreground p-2">
                      {product.categories[0].category.name}
                    </span>
                  </div>

                  {/* Heart Icon */}
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addProductToWishlist(product?.id);
                    }}

                    className={`absolute top-3 right-3 bg-gray-50/10 text-primary-foreground rounded-full flex items-center justify-center p-1 cursor-pointer group-hover:text-red-500 transition-colors duration-300 ${areProductsInWishlist(product.id) ? "text-red-500 " : "text-white"
                      }`}
                  >
                    <HeartIcon className={`h-4 w-4 group-hover:text-red-500 transition-colors duration-300 ${areProductsInWishlist(product.id) ? "text-red-500 " : "text-white"} `} />
                  </span>
                </div>

                <div className="p-2">
                  <div className="flex w-full">
                    <h3 className="font-extrabold font-thunder-lc tracking-wide text-gray-800 text-lg">
                      {product.name}
                    </h3>
                  </div>

                  <span className="text-sm font-TwentiethCenturyforKenmoreLight font-thin text-gray-500 tracking-wide line-clamp-1">
                    {product?.description}
                  </span>
                  <div className="flex font-ShackletonTest items-center">
                    <span className="text-sm font-bold">
                      Rs.{Number(product?.discountPrice).toFixed(2)}
                    </span>
                    <span className="text-xs ml-2 text-gray-400 line-through">
                      Rs.{Number(product?.basePrice).toFixed(2)}
                    </span>
                    <span className="text-green-600 text-[10px] ml-2">
                      {Number(product?.discountPrice)
                        ? Math.round(
                          ((Number(product?.basePrice) - Number(product?.discountPrice)) /
                            Number(product?.basePrice)) *
                          100
                        )
                        : 0}{" "}
                      %OFF
                    </span>
                  </div>
                </div>
              </Link>

            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
