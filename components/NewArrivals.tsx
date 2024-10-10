import Image from 'next/image'
import { Badge } from "@/components/ui/badge"

interface Product {
    id: number
    brand: string
    name: string
    price: number
    discountedPrice?: number
    sizes: string[]
    category: string
    imageUrl: string
}

const products: Product[] = [
    {
        id: 1,
        brand: "Nike",
        name: "Air Max 270",
        price: 150,
        discountedPrice: 129.99,
        sizes: ["S", "M", "L", "XL"],
        category: "Shoes",
        imageUrl: "/ph1.jpg"
    },
    {
        id: 2,
        brand: "Kraken®",
        name: "Ultraboost 21",
        price: 180,
        sizes: ["M", "L", "XL"],
        category: "Shoes",
        imageUrl: "/ph2.jpg"
    },
    {
        id: 3,
        brand: "Kraken®",
        name: "501 Original Fit Jeans",
        price: 69.50,
        discountedPrice: 59.99,
        sizes: ["M", "L", "XL"],
        category: "Clothing",
        imageUrl: "/ph3.jpg"
    },
    {
        id: 4,
        brand: "Kraken®",
        name: "Thermoball Eco Jacket",
        price: 199,
        sizes: ["S", "M", "L"],
        category: "Clothing",
        imageUrl: "/ph1.jpg"
    },
]

export default function NewArrivals() {
    return (
        <section className="py-12 px-4 md:px-6 lg:px-8">
            <h2 className=" font-bold mb-8 text-center uppercase font-thunder-lc text-[55px] underline">New Arrivals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-sm  overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                        <div className="relative pt-[100%]">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                layout="fill"
                                objectFit="cover"
                                className="w-full h-full object-fill"
                            />
                            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                                {product.category}
                            </Badge>
                        </div>
                        <div className="p-2 flex flex-col">
                            <h1 className="font-bold text-lg ">{product.brand}</h1>
                            <h4 className="text-md mb-2 font-TwentiethCenturyforKenmoreLight">{product.name}</h4>
                            <div className='flex items-center justify-between'>
                                 <div className="">
                                    {product.discountedPrice ? (
                                        <>
                                            <span className="line-through font-bold text-xs font-TwentiethCenturyforKenmoreLight mr-2">INR {product.price.toFixed(2)}</span>
                                            <span className="font-bold text-xs font-TwentiethCenturyforKenmoreLight">INR {product.discountedPrice.toFixed(2)}</span>
                                            <span className="ml-2 text-xs text-green-600">
                                                {(((product.price - product.discountedPrice) / product.price) * 100).toFixed(0)}% OFF
                                            </span>
                                        </>
                                    ) : (
                                        <span className=" text-lg font-bold  font-TwentiethCenturyforKenmoreLight">INR {product.price.toFixed(2)}</span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    {product.sizes.map((size) => (
                                        <span key={size} className="text-sm border border-gray-300 rounded-md px-2 py-1">
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>


                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}