import { createOrder } from "@/app/actions/userActions/allOrders";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateOrderParams {
    userId: string;
    orderItems: { variantId: string; quantity: number; pricePerUnit: number }[];
    shippingAddressId: string;
    paymentMethodId: string;
}

export const useCreateOrderMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (params: CreateOrderParams) => {
            const { userId, shippingAddressId, paymentMethodId, orderItems } = params;
            const result = await createOrder(userId, shippingAddressId, paymentMethodId, orderItems);
            if (!result.success) {
                throw new Error(result.message);
            }
            return result;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["orders", data.order.userId] }); // Refresh the user's orders
            queryClient.invalidateQueries({ queryKey: ["cartItems", data.order.userId] }); // Clear or update the cart
        },
        onError: (error) => {
            console.error("Failed to create order:", error);
        },
    });
};
