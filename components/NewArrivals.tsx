"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useHomePageData } from "@/featues/homePageProducts/useHomePage";
import CardSkeliton from "./skelitons/Productcardskeliton";

export default function NewArrivals() {
    const { data, isLoading, isPending, isFetching } = useHomePageData();

    if (isLoading || isFetching || isPending) {
        return (
            <div>
                <CardSkeliton />
            </div>
        );
    }

    return (
        <section className="py-14 px-4 md:px-6 lg:px-8">
            <h2 className="font-bold mb-8 text-center uppercase font-thunder-lc text-[55px] underline">
                New Arrivals
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {data?.newArrivals?.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-sm overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        <div className="relative group">
                            {/* Hover effect to show the second image */}
                            <div className="relative pt-[100%] overflow-hidden">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                                />
                                <Image
                                    src={product.images[1]} // Second image
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                />
                            </div>
                            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                                {product.categories[0]?.category.name}
                            </Badge>
                        </div>
                        <div className="p-2 flex flex-col">
                            <h1 className="font-bold text-lg">{product.brand.name}</h1>
                            <h4 className="text-md mb-2 font-TwentiethCenturyforKenmoreLight">
                                {product.name}
                            </h4>
                            <div className="flex items-center justify-between">
                                <div>
                                    {product.discountPrice ? (
                                        <>
                                            <span className="line-through font-bold text-xs font-TwentiethCenturyforKenmoreLight mr-2">
                                                INR {Number(product.basePrice).toFixed(2)}
                                            </span>
                                            <span className="font-bold text-xs font-TwentiethCenturyforKenmoreLight">
                                                INR {Number(product.discountPrice).toFixed(2)}
                                            </span>
                                            <span className="ml-2 text-xs text-green-600">
                                                {(
                                                    ((Number(product.basePrice) - Number(product.discountPrice)) /
                                                        Number(product.basePrice)) *
                                                    100
                                                ).toFixed(2)}
                                                % OFF
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-lg font-bold font-TwentiethCenturyforKenmoreLight">
                                            INR {product.basePrice.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    {product.variants.map((variant) => (
                                        <span
                                            key={variant.id}
                                            className="text-sm border border-gray-300 rounded-md px-2 py-1"
                                        >
                                            {variant.size.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
