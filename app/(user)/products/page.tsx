"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Heart, HeartIcon, ShoppingCart } from "lucide-react"
import { useParams, useSearchParams } from "next/navigation";
import ProductSidebar from "@/components/ProductSidebar"

// Define Product type
type Product = {
    id: number
    name: string
    price: number
    image: string
}

const products: Product[] = [
    { id: 1, name: "Classic T-Shirt", price: 29.99, image: "/ph1.jpg" },
    { id: 2, name: "Slim Fit Jeans", price: 59.99, image: "/ph1.jpg" },
    { id: 3, name: "Leather Jacket", price: 199.99, image: "/ph1.jpg" },
    { id: 4, name: "Running Shoes", price: 89.99, image: "/ph1.jpg" },
    { id: 5, name: "Wool Sweater", price: 79.99, image: "/ph1.jpg" },
    { id: 6, name: "Denim Shorts", price: 39.99, image: "/ph1.jpg" },
    { id: 7, name: "Cotton Socks", price: 9.99, image: "/ph1.jpg" },
    { id: 8, name: "Leather Belt", price: 34.99, image: "/ph1.jpg" },
]

export default function ProductSection() {
   
    const [sortBy, setSortBy] = useState<string>("popularity") // Use string

    const searchParamss = useSearchParams()

    console.log(searchParamss.get('category'))

    console.log(searchParamss.get('search'))

   

    return (
        <div className="container mx-auto px-4 py-8 mt-14">
            <div className="flex flex-col md:flex-row gap-8">
               
               <ProductSidebar/>


                {/* Product Grid */}
                <main className="w-full md:w-3/4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Products</h2>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="popularity">Popularity</SelectItem>
                                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                                <SelectItem value="newest">Newest Arrivals</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="border   h-[400px]  rounded-lg overflow-hidden shadow-sm">
                                <div className="relative group">
                                    <div className="relative overflow-hidden h-[300px] pt-[100%]">
                                        <img
                                            src={product.image}
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

                                    <span className="text-xs font-ShackletonTest font-thin text-gray-500 tracking-wide  line-clamp-1">product description dsjhdjsdf fjshjsdf sfjhsfj sjdfhjsdf sjkdfhsjfh sjhsjf qqqqqqqqqqqqq qqqqqqqqqqqq qqqqqqqq </span>
                                    <div className="flex  font-ShackletonTest items-center">
                                        <span className="text-sm font-bold">Rs.{product.price.toFixed(2)}</span>
                                        <span className="text-xs ml-2 text-gray-400 line-through ">Rs.{product.price.toFixed(2)}</span>
                                        <span className="text-green-600 text-[10px] ml-2">23% OFF</span>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}
