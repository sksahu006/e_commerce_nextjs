"use client";

import { Loader2, Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartItemsAtom } from "@/stores/atoms/cartAtoms";
import { useCart } from "@/featues/carts/useCart";
import { useSession } from "next-auth/react";

export default function CheckoutCart({
  params,
}: {
  params: { userId: string };
}) {

  // const userId = params.userId;
  const { data: session } = useSession();
  const userId = session?.user?.id || '';
  const { cartItems } = useCart(userId);
  const setCartItems = useSetRecoilState(cartItemsAtom);
  const cartItemsState = useRecoilValue(cartItemsAtom);
  const { deleteFromCartMutation } = useCart(userId as string);
  const loading=deleteFromCartMutation.isPending 



  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(
      cartItemsState.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (variantId: string) => {
    setCartItems(cartItemsState.filter((item) => item.id !== variantId));
    deleteFromCartMutation.mutateAsync({
      userId,
      variantId
    })
    
  };

  const subtotal = cartItemsState.reduce(
    (sum, item) =>
      sum + Number(item.variant.product.discountPrice || 0) * item.quantity,
    0
  );
  const discount = cartItemsState.reduce(
    (sum, item) =>
      sum +
      (Number(item.variant.product.basePrice || 0) -
        Number(item.variant.product.discountPrice || 0)) *
      item.quantity,
    0
  );
  const total = subtotal;
  const itemCount = cartItemsState.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
       {loading && (
        <div className="absolute inset-x-0 top-1/2 flex justify-center items-center z-50">
          <Loader2 className="h-28 w-28 text-blue-500 animate-spin" />
        </div>
      )}
      <h1 className="text-3xl pt-20 text-gray-700 font-bold mb-8">My Bag</h1>
      <div className="flex items-center justify-center"><img src="https://images.bewakoof.com/web/icon-cart-savings.gif" className="h-7 w-7"   /> "You are saving ₹1200 on this order</div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 bg-gray-50 p-2">
          {cartItemsState?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-4 shadow-sm  border-b-2 border-gray-300 py-4"
            >
              <div className="w-full sm:w-1/3">
                <img
                  src={item?.variant?.product?.images?.[0]}
                  alt={item.variant.product.name}
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
              <div className="flex-1 space-y-2">
                <h2 className=" font-Oswald text-[#117a7a] font-semibold">
                  {item.variant.product.name}
                </h2>
                <p className="text-gray-700 font-Raleway">Size: {item.variant.size.name}</p>
                <p className="text-gray-800 font-DM-sans font-semibold">
                  Color: {item.variant.color.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">
                    ₹{Number(item.variant.product.discountPrice).toFixed(2)}
                  </span>
                  {Number(item.variant.product.basePrice) !==
                    Number(item.variant.product.discountPrice) && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{Number(item.variant.product.basePrice).toFixed(2)}
                      </span>
                  
                    )}
                       <span className="text-xs text-green-600 font-bold">
                       You saved ₹1,200
                  </span>
                       
                </div>
                <span className="text-xs font-Raleway text-gray-700">MRP incl. of all taxes</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-r-none"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-12 text-center border-none"
                      min="1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-l-none"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="self-start"
                onClick={() => removeItem(item?.variantId)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
            <h2 className="text-2xl font-semibold mb-4 uppercase">
              Order Summary
            </h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Items ({itemCount}):</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mb-4">
              <Input placeholder="Enter promo code" />
            </div>
            <Button className="w-full uppercase h-14 text-xl font-bold text-white">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
