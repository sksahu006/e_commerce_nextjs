import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

// Mock data for wishlist items
const wishlistItems = [
  {
    id: 1,
    name: "Classic White Sneakers",
    brand: "Urban Stride",
    price: 89.99,
    discount: 10,
    image: "/ph1.jpg",
    sizes: ["7", "8", "9", "10"],
    inStock: true,
  },
  {
    id: 2,
    name: "Leather Crossbody Bag",
    brand: "Luxe Carry",
    price: 129.99,
    discount: 0,
    image: "/ph1.jpg",
    sizes: ["One Size"],
    inStock: true,
  },
  {
    id: 3,
    name: "Wireless Noise-Canceling Headphones",
    brand: "SoundWave",
    price: 199.99,
    discount: 15,
    image: "/ph1.jpg",
    sizes: ["One Size"],
    inStock: false,
  },
  {
    id: 4,
    name: "Slim Fit Denim Jeans",
    brand: "DenimCo",
    price: 69.99,
    discount: 0,
    image: "/ph1.jpg",
    sizes: ["30", "32", "34", "36"],
    inStock: true,
  },
]

// Mock data for similar items
const similarItems = [
  {
    id: 5,
    name: "Casual Canvas Sneakers",
    brand: "ComfyStep",
    price: 59.99,
    image: "/ph1.jpg",
  },
  {
    id: 6,
    name: "Leather Tote Bag",
    brand: "Luxe Carry",
    price: 149.99,
    image: "/ph1.jpg",
  },
]

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <h1 className="text-[50px] font-bold mb-8 text-center uppercase font-thunder-lc underline">Your Wishlist</h1>
      <div className="grid grid-cols-1 font-TwentiethCenturyforKenmoreLight sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <CardHeader className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <h2 className="font-semibold text-lg mb-1">{item.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
              <div className="flex items-center mb-2">
                <span className="font-bold text-lg">
                  ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                </span>
                {item.discount > 0 && (
                  <span className="ml-2 text-sm text-gray-500 line-through">${item.price.toFixed(2)}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {item.sizes.map((size) => (
                  <span
                    key={size}
                    className="px-2 py-1 text-xs border border-gray-300 rounded-full"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex gap-2 w-full">
                <Button
                  className="flex-grow"
                  disabled={!item.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h2 className="text-[50px] underline font-bold mt-12 mb-6 uppercase font-thunder-lc ">Similar Items You Might Like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {similarItems.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <CardHeader className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
              <p className="font-bold">${item.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">
                <Heart className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}