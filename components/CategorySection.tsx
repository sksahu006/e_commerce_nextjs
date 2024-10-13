import Image from "next/image"
import Link from "next/link"

const categories = [
  { name: "Electronics", image: "/ph1.jpg" },
  { name: "Clothing", image: "/ph4.jpg" },
  { name: "Accessories", image: "/ph1.jpg" },
  { name: "Home & Living", image: "/ph2.jpg" },
  { name: "Sports", image: "/ph1.jpg" },
  { name: "Beauty", image: "/ph3.jpg" },
  { name: "Books", image: "/ph1.jpg" },
  { name: "Toys", image: "/ph4.jpg" },
]

export default function CategorySection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-[50px] font-bold text-center mb-8 text-gray-800 uppercase font-thunder-lc underline">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/category/${category.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <Image
                src={category.image}
                alt={`${category.name} category`}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-primary-100 transition-colors duration-300">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}