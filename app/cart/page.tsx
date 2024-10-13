"use client"
import { useState } from 'react'
import { Minus, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock data for cart items
const initialCartItems = [
  { id: 1, name: "Premium Cotton T-Shirt", size: "M", color: "Navy Blue", price: 2499, discountedPrice: 1999, quantity: 2, image: "/ph1.jpg" },
  { id: 2, name: "Slim Fit Jeans", size: "32", color: "Indigo", price: 4999, discountedPrice: 4999, quantity: 1, image: "/ph1.jpg" },
  { id: 3, name: "Classic Leather Watch", size: "One Size", color: "Brown", price: 7999, discountedPrice: 6499, quantity: 1, image: "/ph1.jpg" },
]

export default function CheckoutCart() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0)
  const discount = cartItems.reduce((sum, item) => sum + (item.price - item.discountedPrice) * item.quantity, 0)
  const total = subtotal
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 font-TwentiethCenturyforKenmoreLight">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 border-b border-gray-200 py-4">
              <div className="w-full sm:w-1/3">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md" />
              </div>
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">Size: {item.size}</p>
                <p className="text-gray-600">Color: {item.color}</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">₹{item.discountedPrice.toFixed(2)}</span>
                  {item.price !== item.discountedPrice && (
                    <span className="text-sm text-gray-500 line-through">₹{item.price.toFixed(2)}</span>
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
            <h2 className="text-2xl font-semibold mb-4 uppercase font-TwentiethCenturyforKenmoreLight tracking-[0.1em] ">Order Summary</h2>
            <div className="space-y-2 mb-4 font-TwentiethCenturyforKenmoreLight">
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
            <Button className="w-full font-TwentiethCenturyforKenmoreLight uppercase h-14 text-xl font-bold tracking-[0.1em] text-white">
              Proceed to Checkout 
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}