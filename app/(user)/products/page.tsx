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
import { Heart, ShoppingCart } from "lucide-react"

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
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]) // Use string array
    const [selectedColors, setSelectedColors] = useState<string[]>([]) // Use string array
    const [sortBy, setSortBy] = useState<string>("popularity") // Use string

    const handleSizeChange = (size: string) => {
        setSelectedSizes((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        )
    }

    const handleColorChange = (color: string) => {
        setSelectedColors((prev) =>
            prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-14">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Filter Sidebar */}
                <aside className="w-full md:w-1/4 space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Size</h3>
                        <div className="space-y-2">
                            {["S", "M", "L", "XL"].map((size) => (
                                <div key={size} className="flex items-center">
                                    <Checkbox
                                        id={`size-${size}`}
                                        checked={selectedSizes.includes(size)}
                                        onCheckedChange={() => handleSizeChange(size)}
                                    />
                                    <label
                                        htmlFor={`size-${size}`}
                                        className="ml-2 text-sm font-medium leading-none"
                                    >
                                        {size}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Color</h3>
                        <div className="flex flex-wrap gap-2">
                            {["red", "blue", "green", "yellow", "black", "white"].map(
                                (color) => (
                                    <button
                                        key={color}
                                        className={`w-6 h-6 rounded-full border ${selectedColors.includes(color)
                                            ? "ring-2 ring-offset-2 ring-gray-400"
                                            : ""
                                            }`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleColorChange(color)}
                                        aria-label={`Select ${color} color`}
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                        <Slider
                            min={0}
                            max={200}
                            step={1}
                            value={priceRange as [number, number]} // Ensure value is correctly typed
                            onValueChange={(newValue: [number, number]) => setPriceRange(newValue)} // Ensure handler accepts the correct type
                            className="w-full"
                        />

                        <div className="flex justify-between mt-2">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                        </div>
                    </div>
                </aside>

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
                            <div key={product.id} className="border  rounded-lg overflow-hidden shadow-sm">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-80 object-cover"
                                />

                                <div className="p-2 font-TwentiethCenturyforKenmoreLight">
                                    <div className="flex w-full justify-between">
                                        <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
                                        <Heart className="" />
                                    </div>

                                    <span className="text-xs font-Raleway text-gray-600">product description</span>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                                     
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
