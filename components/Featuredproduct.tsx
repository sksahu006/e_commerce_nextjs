"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  description: string
  image1: string
  image2: string
  category: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Urban Streetwear Hoodie",
    price: 2999,
    originalPrice: 3499,
    description: "Comfortable and stylish hoodie for the urban explorer",
    image1: "/ph1.jpg",
    image2: "/ph2.jpg",
    category: "Best Seller"
  },
  {
    id: 2,
    name: "Eco-Friendly Yoga Pants",
    price: 1799,
    description: "Sustainable and flexible yoga pants for your daily practice",
    image1: "/ph5.jpg",
    image2: "/ph3.jpg",
    category: "New Arrival"
  },
  {
    id: 3,
    name: "Vintage Graphic T-Shirt",
    price: 999,
    originalPrice: 1299,
    description: "Retro-inspired graphic tee for a classic look",
    image1: "/ph2.jpg",
    image2: "/ph3.jpg",
    category: "Limited Edition"
  },
  {
    id: 4,
    name: "All-Weather Jacket",
    price: 4499,
    description: "Versatile jacket suitable for all seasons",
    image1: "/ph4.jpg",
    image2: "/ph5.jpg",
    category: "Top Rated"
  }
]

export default function FeaturedProducts() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-[50px] font-bold text-center mb-8 underline uppercase font-thunder-lc "> Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pb-[75%] overflow-hidden">
        <img
          src={product.image1}
          alt={`${product.name} - Front View`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 ${
            isHovered ? "scale-105 opacity-0" : "scale-100 opacity-100"
          }`}
        />
        <img
          src={product.image2}
          alt={`${product.name} - Alternate View`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 ${
            isHovered ? "scale-105 opacity-100" : "scale-100 opacity-0"
          }`}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">Kraken</h3>
        <h4 className="text-md mt-1">{product.name}</h4>
        <div className="mt-2">
          {product.originalPrice && (
            <span className="text-gray-500 line-through mr-2">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          <span className="text-xl font-semibold text-primary">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2 ">{product.description}</p>
        <Button className="w-full mt-4">Add to Cart</Button>
      </div>
      <div className="absolute bottom-2 left-2">
        {/* <span className="inline-block bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
          {product.category}
        </span> */}
      </div>
    </div>
  )
}