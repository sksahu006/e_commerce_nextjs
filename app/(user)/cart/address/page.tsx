"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import { cartItemsAtom } from "@/stores/atoms/cartAtoms";
import { useUserAddresses } from "@/featues/address/useGetAllAddress";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useCreateOrderMutation } from "@/featues/order/useCreateOrder";
import AddAddressButtont from "@/components/AddAddressButtont";

export default function Component() {
  const { data: session } = useSession();
  const userId = session?.user?.id || "";
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState("");
  const cartItemsState = useRecoilValue(cartItemsAtom);

  // Fetch user addresses
  const { data, isLoading } = useUserAddresses(userId);

  // Get the mutation function
  const createOrderMutation = useCreateOrderMutation();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Calculate subtotal, discount, and total
  const subtotal = cartItemsState.reduce(
    (sum, item) =>
      sum + Number(item.variant.product.basePrice || 0) * item.quantity,
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
  const total = subtotal - discount;

  // Handle address selection
  const handleSelectionChange = (id: string) => {
    setSelectedAddress(id);
  };

  // Function to initiate the order creation
  const handleInitiateOrder = async () => {
    if (!selectedAddress || !userId || cartItemsState.length === 0) return;
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      throw new Error("Payment gateway not properly configured");
    }

    try {
      // Format cart items for the backend
      const formattedCartItems = cartItemsState.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
        pricePerUnit:
          Number(item.variant.product.discountPrice) ||
          Number(item.variant.product.basePrice),
      }));

      // Create order parameters
      const params = {
        userId,
        shippingAddressId: selectedAddress,
        orderItems: formattedCartItems,
      };

      // Call the mutation function
      await createOrderMutation.mutateAsync(params);

      // Redirect to success page
      // Note: The actual redirect might happen in the mutation's onSuccess callback
      // router.push("/orders/success");
    } catch (error) {
      console.error("Error initiating order:", error);
      alert("An error occurred while processing your order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 gap-4 bg-white/15 py-8 w-full flex flex-col mt-20 h-auto">
      {/* Load Razorpay script */}
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <AddAddressButtont />

      {/* Address Selection */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:col-span-2 border-2 w-full md:w-[55%] border-gray-200 p-6 bg-white shadow-sm rounded-sm">
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Saved Addresses</h2>
            </div>
            <RadioGroup
              value={selectedAddress}
              onValueChange={handleSelectionChange}
              className="space-y-4"
            >
              {data?.data?.map((address) => (
                <Card
                  key={address.id}
                  className="mb-4 rounded-sm border-[#676162]"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <RadioGroupItem value={address.id} id={address.id} />
                        <label className="ml-2 text-[#117a7a] font-semibold cursor-pointer">
                          Deliver to {address.fullName}, {address.postalCode}
                        </label>
                        <p className="text-sm pl-6 text-muted-foreground">
                          {address.addressLine1}, {address.city},{" "}
                          {address.country}, ({address.phoneNumber})
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-[40%]">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-center bg-[#117a7a] h-max w-full uppercase text-white p-3 mb-4">
                Order Summary
              </h2>
              {cartItemsState?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b-[1px] p-2 space-x-4 mb-4"
                >
                  <Image
                    src={item.variant.product.images[0] || "/placeholder.jpg"}
                    alt={item.variant.product.name || "Product Image"}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {item.variant.product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.variant.size.name}
                    </p>
                    <p className="text-sm font-medium">
                      ₹
                      {item.variant.product.discountPrice
                        ? Number(item.variant.product.discountPrice) *
                          item.quantity
                        : Number(item.variant.product.basePrice) *
                          item.quantity}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              <div className="space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Shipping</span>
                  <span>₹5.00</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Discount</span>
                  <span className="text-green-500">-₹{discount}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
              <Button
                className={`w-full p-7 uppercase text-xl mt-3 ${
                  !selectedAddress ? "opacity-20 hover:cursor-wait" : ""
                }`}
                disabled={!selectedAddress || createOrderMutation.isPending}
                onClick={handleInitiateOrder}
              >
                {createOrderMutation.isPending ? "Processing..." : "Pay Now"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
