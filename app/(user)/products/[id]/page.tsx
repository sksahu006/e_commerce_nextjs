'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Heart, ShoppingCart } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"


// Mock data for the product
const product = {
    name: "Premium Leather Jacket",
    brand: {
        name: "LuxeLeather",
        logo: "/ph1.jpg"
    },
    basePrice: 299.99,
    discountedPrice: 249.99,
    images: [
        "/ph1.jpg",
        "/ph3.jpg",
        "/ph2.jpg",
        "/ph4.jpg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#000000", "#8B4513", "#A52A2A"],
    description: "Experience luxury with our premium leather jacket. Crafted from the finest quality leather, this jacket offers both style and durability.",
    material: "100% Genuine Leather",
    care: "Dry clean only",
    featured: true,
    onSale: true,
    rating: 4.5,
    numberOfRatings: 128,
    reviews: [
        {
            user: "John D.",
            title: "Great quality!",
            rating: 5,
            comment: "This jacket exceeded my expectations. The leather is soft yet durable, and the fit is perfect."
        },
        {
            user: "Sarah M.",
            title: "Good, but sizing is off",
            rating: 4,
            comment: "The jacket is beautiful, but I had to size up. Otherwise, it's a great purchase."
        }
    ]
}

// Mock data for similar products
const similarProducts = [
    { id: 1, name: "Classic Denim Jacket", price: 89.99, image: "/ph1.jpg" },
    { id: 2, name: "Suede Bomber Jacket", price: 199.99, image: "/ph2.jpg" },
    { id: 3, name: "Vintage Leather Vest", price: 149.99, image: "/ph3.jpg" },
    { id: 4, name: "Moto Leather Jacket", price: 279.99, image: "/ph4.jpg" },
]

export default function ProductPage() {
    const [selectedSize, setSelectedSize] = useState(product.sizes[0])
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedImage, setSelectedImage] = useState(0)

    const discountPercentage = product.discountedPrice
        ? Math.round(((product.basePrice - product.discountedPrice) / product.basePrice) * 100)
        : 0

    return (
        <div className="min-h-screen mt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="relative">
                        <div className="relative h-[90vh] mb-4">
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                            {(product.featured || product.onSale) && (
                                <Badge className="absolute top-4 right-4 text-sm font-semibold">
                                    {product.featured ? 'Featured' : 'On Sale'}
                                </Badge>
                            )}
                        </div>
                        <div className="flex space-x-2 overflow-x-auto">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${selectedImage === index ? 'ring-2 ring-primary' : ''
                                        }`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <Image src={image} alt={`${product.name} thumbnail ${index + 1}`} width={80} height={80} objectFit="cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold font-thunder-lc">{product.name}</h1>
                            <div className="flex items-center space-x-2 mt-2">
                                <Image src={product.brand.logo} alt={product.brand.name} width={24} height={24} />
                                <span className="text-gray-600 font-Oswald">{product.brand.name}</span>
                            </div>
                            <div className="mt-2">
                                <div className="flex items-center">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
                                </div>
                                <p className="text-sm text-gray-500">{product.numberOfRatings} ratings</p>
                            </div>
                        </div>



                        <div className="flex items-baseline space-x-2">
                            {product.discountedPrice ? (
                                <>
                                    <span className="text-2xl font-bold">${product.discountedPrice.toFixed(2)}</span>
                                    <span className="text-lg text-gray-500 line-through">${product.basePrice.toFixed(2)}</span>
                                    <span className="text-green-500">Save {discountPercentage}%</span>
                                </>
                            ) : (
                                <span className="text-2xl font-bold">${product.basePrice.toFixed(2)}</span>
                            )}
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-2">Sizes Available</h2>
                            <div className="flex space-x-2">
                                {product.sizes.map((size) => (
                                    <Button
                                        key={size}
                                        variant={selectedSize === size ? "default" : "outline"}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-2">Colors</h2>
                            <div className="flex space-x-2">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        className={`w-8 h-8 rounded-full ${selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : ''
                                            }`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(color)}
                                    />
                                ))}
                            </div>
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
                            <p className="text-gray-600 font-TwentiethCenturyforKenmoreLight">{product.description}</p>
                            <p className="mt-2 font-TwentiethCenturyforKenmoreLight"><strong className='font-thunder-lc text-2xl '>Material:</strong> {product.material}</p>
                            <p className='font-TwentiethCenturyforKenmoreLight'><strong className='font-thunder-lc text-2xl '>Care:</strong> {product.care}</p>
                        </div>

                        {/* Customer Ratings and Reviews */}
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                            <div className="space-y-4">
                                {product.reviews.map((review, index) => (
                                    <Card key={index} className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">{review.title}</h3>
                                                <p className="text-sm text-gray-500">{review.user}</p>
                                            </div>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-2 text-gray-600">{review.comment}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {similarProducts.map((product) => (
                            <Card key={product.id} className="overflow-hidden">
                                <div className="relative h-48">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}