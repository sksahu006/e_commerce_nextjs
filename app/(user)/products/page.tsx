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


interface ProductFilter {
    colors?: string[];
    categories?: string[];
    featured?: boolean;
    minPrice?: number;
    maxPrice?: number;
    searchQuery?: string;
}

export default function ProductSection() {

    const searchParams = useSearchParams()


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

    if (isLoading || isFetching) return <div><CardSkeliton /></div>;

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
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {data?.map((product) => (
                            <Link href={`/products/${product.id}`}>
                                <div key={product?.id} className="border   h-[400px]  rounded-lg overflow-hidden shadow-sm">
                                    <div className="relative group">
                                        <div className="relative overflow-hidden h-[300px] pt-[100%]">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="absolute h-[100%] w-full inset-0 transition-opacity duration-300 rounded-md "
                                            />
                                            <span className="absolute  font-bold uppercase text-center tracking-widest w-full text-white bottom-0 font-TwentiethCenturyforKenmoreLight left-0 text-[12px] bg-gray-900/70 text-primary-foreground p-2">
                                                premium knit fabric
                                            </span>
                                            <span className="absolute  font-bold uppercase text-center tracking-widest  text-white top-3 font-TwentiethCenturyforKenmoreLight right-3 text-[12px] bg-gray-50/10 text-primary-foreground rounded-full flex items-center justify-center p-1">
                                                <HeartIcon className="text-white h-4 w-4 " />
                                            </span>
                                        </div>

                                    </div>


                                    <div className="p-2 ">
                                        <div className="flex w-full ">
                                            <h3 className="font-extrabold font-thunder-lc  text-gray-800 text-lg">{product.name}</h3>

                                        </div>

                                        <span className="text-xs font-ShackletonTest font-thin text-gray-500 tracking-wide  line-clamp-1">{product?.description} </span>
                                        <div className="flex  font-ShackletonTest items-center">
                                            <span className="text-sm font-bold">Rs.{Number(product?.discountPrice).toFixed(2)}</span>
                                            <span className="text-xs ml-2 text-gray-400 line-through ">Rs.{Number(product?.basePrice).toFixed(2)}</span>
                                            <span className="text-green-600 text-[10px] ml-2">{Number(product?.discountPrice)
                                                ? Math.round(
                                                    ((Number(product?.basePrice) - Number(product?.discountPrice)) /
                                                        Number(product?.basePrice)) *
                                                    100
                                                )
                                                : 0} %OFF</span>

                                        </div>
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
