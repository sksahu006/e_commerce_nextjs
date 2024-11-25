"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useHomePageData } from "@/featues/homePageProducts/useHomePage";
import CardSkeliton from "./skelitons/Productcardskeliton";
import { Decimal } from "@prisma/client/runtime/library";
import Link from "next/link";

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
        {data?.newArrivals?.map((product: Product) => (
          <Link href={`/products/${product.id}`}>
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
                    className="absolute inset-0 transition-opacity duration-300 rounded-md group-hover:opacity-0"
                  />
                  <Image
                    src={product.images[1]} // Second image
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="absolute rounded-md inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  />
                </div>
                <Badge className="absolute top-2 right-2 text-xs bg-gray-900/80 text-primary-foreground">
                  {product.categories[0]?.category.name}
                </Badge>
                <span className="absolute uppercase tracking-widest text-white bottom-1 font-Raleway left-1 text-[8px] bg-gray-900/50 text-primary-foreground p-2">
                  premium knit fabric
                </span>
              </div>
              <div className="p-2 flex flex-col">
                <h1 className="font-semibold text-base text-gray-600 border-b-[1px] border-gray-300">
                  Kraken®
                </h1>
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
                        <span className="line-through text-gray-400 font-bold text-sm  mr-2">
                          ₹ {Number(product.basePrice).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold ">
                        ₹ {product.basePrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {product.variants.map((variant) => (
                      <span
                        key={variant.size.id}
                        className="text-sm border border-gray-300 rounded-md px-2 py-1"
                      >
                        {variant.size.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
