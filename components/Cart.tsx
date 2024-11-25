import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/featues/carts/useCart";

export default function CartIcon({ userId }: { userId: string }) {
  const { cartCount } = useCart(userId);

  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full"
          >
            {cartCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
}