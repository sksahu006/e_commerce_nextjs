
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createShippingAddress } from "@/app/actions/userActions/address";

interface AddressData {
    userId: string;
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber?: string;
    default?: boolean;
}

export function useSaveAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (addressData: AddressData) => createShippingAddress(addressData),
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
        },
    });
}
