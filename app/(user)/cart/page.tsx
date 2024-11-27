'use client';

import { Minus, Plus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartItemsAtom } from '@/stores/atoms/cartAtoms';
import { useCart } from '@/featues/carts/useCart';

export default function CheckoutCart({ userId }: { userId: string }) {
  // const { cartItems } = useCart(userId);
  const setCartItems = useSetRecoilState(cartItemsAtom);
  const cartItemsState = useRecoilValue(cartItemsAtom);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(cartItemsState.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItemsState.filter(item => item.id !== id));
  };

  const subtotal = cartItemsState.reduce((sum, item) => sum + Number(item.variant.product.discountPrice || 0) * item.quantity, 0);
  const discount = cartItemsState.reduce((sum, item) => sum + (Number(item.variant.product.basePrice || 0) - Number(item.variant.product.discountPrice || 0) ) * item.quantity, 0);
  const total = subtotal;
  const itemCount = cartItemsState.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {cartItemsState?.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 border-b border-gray-200 py-4">
              <div className="w-full sm:w-1/3">
                <img src={item?.variant?.product?.images?.[0]} alt={item.variant.product.name} className="w-full h-40 object-cover rounded-md" />
              </div>
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-semibold">{item.variant.product.name}</h2>
                <p className="text-gray-600">Size: {item.variant.size.name}</p>
                <p className="text-gray-600">Color: {item.variant.color.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">₹{Number(item.variant.product.discountPrice).toFixed(2)}</span>
                  {Number(item.variant.product.basePrice) !== Number(item.variant.product.discountPrice) && (
                    <span className="text-sm text-gray-500 line-through">₹{Number(item.variant.product.basePrice).toFixed(2)}</span>
                  )}
                </div>
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
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
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
              <Button variant="ghost" size="icon" className="self-start" onClick={() => removeItem(item.id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
            <h2 className="text-2xl font-semibold mb-4 uppercase">Order Summary</h2>
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
