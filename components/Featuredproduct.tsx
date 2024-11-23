"use client";
import { Button } from "@/components/ui/button";
import { useHomePageData } from "@/featues/homePageProducts/useHomePage";
import { useState } from "react";
import CardSkeliton from "./skelitons/Productcardskeliton";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Decimal } from "@prisma/client/runtime/library";
import Link from "next/link";

// Define the Product type
type Product = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  description?: string | null;
  basePrice: Decimal; // Change from number to Decimal
  discountPrice?: Decimal | null; // Change from number to Decimal
  featured: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  brand: {
    id: string;
    name: string;
  };
  categories: Array<{
    category: {
      id: string;
      name: string;
      description: string | null;
    };
  }>;
  variants: Array<{
    size: {
      id: string;
      name: string;
    };
    color: {
      id: string;
      name: string;
      hexCode: string;
    };
  }>;
};

export default function FeaturedProducts() {
  const { data, isLoading, isFetching, isPending, isError } = useHomePageData();

  if (isLoading || isFetching || isPending) {
    return (
      <div>
        <CardSkeliton />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center py-12">Error fetching products.</div>;
  }

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-[50px] font-bold text-center mb-8 underline uppercase font-thunder-lc">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data?.featuredProducts.map((product: Product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className="bg-white rounded-sm overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative pt-[100%]">
          <Image
            src={product?.images[0]}
            alt={product?.name}
            layout="fill"
            objectFit="cover"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ${isHovered ? "scale-105" : "scale-100"
              }`}
          />
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            {product?.categories[0]?.category.name}
          </Badge>
          <span className="absolute uppercase tracking-widest text-white bottom-1 font-Raleway left-1 text-[8px] bg-gray-50/10 text-primary-foreground p-2">
            premium knit fabric
          </span>
        </div>
        <div className="p-2 flex flex-col">
          <h1 className="font-semibold text-base text-gray-600 border-b-[1px] border-gray-300">Kraken®</h1>
          <h4 className="text-md  font-TwentiethCenturyforKenmoreLight text-gray-700">
            {product.name}
          </h4>
          <div className="flex items-center justify-between">
            <div className="font-thunder-lc">
              {product.discountPrice ? (
                <>
                  <span className="font-bold text-sm text-gray-600 mr-2">
                    ₹ {Number(product.discountPrice).toFixed(2)}
                  </span>
                  <span className="line-through text-gray-300 font-bold text-sm  mr-2">
                    ₹ {Number(product.basePrice).toFixed(2)}
                  </span>
                  <span className="ml-2 text-xs text-green-600">
                    {(
                      ((Number(product.basePrice) -
                        Number(product.discountPrice)) /
                        Number(product.basePrice)) *
                      100
                    ).toFixed(2)}
                    % OFF
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold font-TwentiethCenturyforKenmoreLight">
                  ₹{Number(product.basePrice).toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {product?.variants.map((variant) => (
                <span
                  key={variant.size.id}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1"
                >
                  {variant.size.name}
                </span>
              ))}
            </div>
          </div>
          {/* <Button className="mt-4">Add to Cart</Button> */}
        </div>
      </div>
    </Link>
  );
}
