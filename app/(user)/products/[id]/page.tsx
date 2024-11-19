"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Heart, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useSingleProduct } from "@/featues/singlrProduct/useSingleProduct";
import CardSkeliton from "@/components/skelitons/Productcardskeliton";
import SingleProduct from "@/components/skelitons/SingleProduct";

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const { id } = useParams();

  let { data, isLoading, isError, isFetching, isPending, error } = useSingleProduct(id as string);


  if (isLoading || isFetching || isPending) {
    return (
      <div>
        <SingleProduct />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }


  let product = data;
  


  if (product && !selectedSize) {
    setSelectedSize(product?.variants[0].id);
  }
  // if (product && !selectedColor) {
  //   setSelectedColor(product.colors[0]);
  // }

  const discountPercentage = Number(product?.discountPrice)
    ? Math.round(
      ((Number(product?.basePrice) - Number(product?.discountPrice)) / Number(product?.basePrice)) *
      100
    )
    : 0;

  return (
    <div className="min-h-screen mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Product Images */}
          <div className="relative">
            <div className="relative h-[90vh] mb-4">
              <Image
                src={product?.images[selectedImage] || '/ph1.png'}
                alt={product?.name || 'image'}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              {(product?.featured) && (
                <Badge className="absolute top-4 right-4 text-sm font-semibold">
                  {product?.featured ? "Featured" : "On Sale"}
                </Badge>
              )}
            </div>

            <div className="flex space-x-2 overflow-x-auto">
              {product?.images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${selectedImage === index ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    objectFit="cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold font-thunder-lc">{product?.name}</h1>
              <div className="flex items-center space-x-2 mt-2">
                <Image
                  src={'/kraken-logo.png'}
                  alt='kraken logo'
                  width={24}
                  height={24}
                />
                <span className="text-gray-600 font-Oswald">
                  {product?.brand.name}
                </span>
              </div>

              {/* modification need  */}

              {/* <div className="mt-2">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product?.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
                </div>
                <p className="text-sm text-gray-500">{product.numberOfRatings} ratings</p>
              </div> */}
            </div>

            <div className="flex items-baseline space-x-2">
              {product?.discountPrice ? (
                <>
                  <span className="text-2xl font-bold">${Number(product?.discountPrice).toFixed(2)}</span>
                  <span className="text-lg text-gray-500 line-through">${Number(product?.basePrice).toFixed(2)}</span>
                  <span className="text-green-500">Save {discountPercentage}%</span>
                </>
              ) : (
                <span className="text-2xl font-bold">${Number(product?.basePrice).toFixed(2)}</span>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Sizes Available</h2>
              <div className="flex space-x-2">
                {product?.variants.map((variant) => (
                  <Button
                    key={variant?.id}
                    variant={selectedSize === variant?.id ? "default" : "outline"}
                    onClick={() => setSelectedSize(variant?.id)}
                  >
                    
                    {variant.size.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <div   style={{ backgroundColor: product?.variants[0]?.color?.hexCode || "blue" }} className={`rounded-full  h-5 w-5   `}/>
              {product?.variants[0].color.name}
            </div>


            {/* need to be done later for color we will show the variants */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Colors</h2>
              {/* <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full ${selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div> */}
            </div>

            <div className="flex space-x-4">
              <Button className="w-1/2">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="w-1/2">
                <Heart className="w-4 h-4" />
                <span className="">Add to Wishlist</span>
              </Button>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 font-thunder-lc">Product Details</h2>
              <p className="text-gray-600 font-TwentiethCenturyforKenmoreLight">{product?.description}</p>
              <p className="mt-2 font-TwentiethCenturyforKenmoreLight">
                <strong className="font-thunder-lc text-2xl ">Material:</strong> Cotton
              </p>
              <p className="font-TwentiethCenturyforKenmoreLight">
                <strong className="font-thunder-lc text-2xl ">Care:</strong>Dry clean only
              </p>
            </div>

            {/* Customer Ratings and Reviews */}
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
              {/* <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{review.title}</h3>
                        <p className="text-sm text-gray-500">{review.user}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                  </Card>
                ))}
              </div> */}
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {/* Add similar products or other sections as needed */}
      </div>
    </div>
  );
}
