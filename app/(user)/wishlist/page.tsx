"use client"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useWishlist } from "@/featues/wishlist/useGetWishlist"
import { useSession } from "next-auth/react"
import Link from "next/link"
import CardSkeliton from "@/components/skelitons/Productcardskeliton"

export default function WishlistPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id || '';


  const { data: allwishList, isFetching, isLoading, isError } = useWishlist(userId);

  if (isLoading || isFetching) {
    return <div className=" pt-36">
      <CardSkeliton />
    </div>;
  }

  if (isError) {
    return <div>Error loading wishlist</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <h1 className="text-[50px] font-bold mb-8 text-center uppercase font-thunder-lc underline">Your Wishlist</h1>
      <div className="grid grid-cols-1 font-TwentiethCenturyforKenmoreLight sm:grid-cols-2 lg:grid-cols-5 gap-6">

        {allwishList?.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <Link href={`/products/${item.id}`}>
            <CardHeader className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
                {/* {!item.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )} */}
              </div>
            </CardHeader>
            </Link>
            <CardContent className="flex-grow p-4">
              <h2 className="font-semibold text-lg font-Raleway mb-1">{item.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{item.slug}</p>
              <div className="flex items-center mb-2">
                <span className="font-bold text-lg">
                  ${Number(item.discountPrice).toFixed(2)}
                </span>
                {item.discountPrice > 0 && (
                  <span className="ml-2 text-sm text-gray-500 line-through">${Number(item.basePrice).toFixed(2)}</span>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex gap-2 w-full">
                {/* <Button
                  className="flex-grow"
                // disabled={!item.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button> */}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {

                    console.log(`Removing ${item.id} from wishlist`);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h2 className="text-[50px] underline font-bold mt-12 mb-6 uppercase font-thunder-lc">Similar Items You Might Like</h2>
      {/* Add similar items section logic here */}
    </div>
  )
}
