"use client";
import { Button } from "@/components/ui/button";
import { wishlistCountState } from "@/stores/atoms/wishlistAtoms";
import { Badge, Heart } from 'lucide-react';
import Link from "next/link";
import { useRecoilState } from "recoil";

export default function Wishlist() {
  const [wishlist, setWishlistCount] = useRecoilState(wishlistCountState);
  console.log(wishlist)
  return (
    <Link href="/wishlist">
     
    <Button variant="ghost" size="icon" className="relative">
      <Heart className="h-10 w-8" />
      {wishlist > 0 && (
          <span 
            
            className="absolute -top-2 -right-2 h-5 w-5 text-white  bg-red-500 flex items-center justify-center rounded-full"
          >
            {wishlist}
          </span>
        )}
    </Button>
    </Link>
  );
}