import { createOrder } from "@/app/actions/userActions/allOrders";
import { cartItemsAtom } from "@/stores/atoms/cartAtoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

interface CreateOrderParams {
  userId: string;
  orderItems: { variantId: string; quantity: number; pricePerUnit: number }[];
  shippingAddressId: string;
}

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const router = useRouter();
  const setCartItems = useSetRecoilState(cartItemsAtom);

  return useMutation({
    mutationFn: async (params: CreateOrderParams) => {
      const { userId, shippingAddressId, orderItems } = params;

      // Step 1: Create the order in the database
      const result = await createOrder(userId, shippingAddressId, orderItems);

      if (!result.success) {
        throw new Error(result.message);
      }

      const { order } = result;

      // Step 2: Initialize Razorpay order
      const razorpayResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, amount: order.totalAmount }),
      });

      const razorpayData = await razorpayResponse.json();

      if (!razorpayData.success) {
        throw new Error("Failed to initialize Razorpay order");
      }

      const razorpayOrderId = razorpayData.order.id;

      // Step 3: Open Razorpay payment modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // Replace with your Razorpay key
        amount: Number(order.totalAmount) * 100, // Amount in paise
        currency: "INR",
        name: "Kraken",
        description: "Order Payment",
        order_id: razorpayOrderId,
        handler: async (response: any) => {
          // Verify payment on the server
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyResponse.json();

          if (!verifyData.success) {
            throw new Error("Payment verification failed");
          }
          await queryClient.invalidateQueries({
            queryKey: ["cartItems", userId],
            exact: true,
          });

          queryClient.invalidateQueries({
            queryKey: ["cartCount", userId],
          });

          // Update local state immediately
          setCartItems([]);
        },
        prefill: {
          name: session?.user?.name, // Replace with actual user data
          email: session?.user?.email, // Replace with actual user data
          // contact: session?.user?.phoneNumber, // Replace with actual user data
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

      return result;
    },
    onSuccess: (data) => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["cartCount", data.order.userId],
    //   });
      queryClient.invalidateQueries({
        queryKey: ["orders", data.order.userId],
      }); // Refresh the user's orders
      queryClient.invalidateQueries({
        queryKey: ["cartItems", data.order.userId],
      }); // Clear or update the cart
      router.push("/cart");
    },
    onError: (error) => {
      console.error("Failed to create order:", error);
    },
  });
};
