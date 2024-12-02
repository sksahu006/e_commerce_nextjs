"use server";

import { prisma } from "@/lib/prisma";

export async function createShippingAddress(data: {
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
}) {
    try {
        const { default: isDefault, ...addressData } = data;

        const newAddress = await prisma.shippingAddress.create({
            data: {
                ...addressData,
                default: isDefault ?? false,
            },
        });

        return { status: "success", message: "Address created successfully", address: newAddress };
    } catch (error) {
        console.error("Error creating address:", error);
        return { status: "error", message: "Failed to create address", error };
    }
}

export async function updateShippingAddress(data: {
    id: string;
    userId: string;
    fullName?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    phoneNumber?: string;
    default?: boolean;
}) {
    try {
        const { id, ...updateData } = data;

        const updatedAddress = await prisma.shippingAddress.update({
            where: { id },
            data: updateData,
        });
        

        return { status: "success", message: "Address updated successfully", address: updatedAddress };
    } catch (error) {
        console.error("Error updating address:", error);
        return { status: "error", message: "Failed to update address", error };
    }
}

export const getAllAddresses = async (userId: string) => {
    try {
        console.log(userId)

        const addresses = await prisma.shippingAddress.findMany({
            where: {
                userId: userId,
                
            },
            select: {
                id: true,
                fullName: true,
                addressLine1: true,
                addressLine2: true,
                city: true,
                state: true,
                postalCode: true,
                country: true,
                phoneNumber: true,
                default: true,
            },
        });
       
        if (!addresses || addresses.length === 0) {
            return { message: "No addresses found for this user." };
        }
        return { success: true, message: "Addresses fetched successfully.", data: addresses };
    } catch (error) {
        console.error("Error fetching addresses:", error);
        throw new Error("Failed to fetch addresses");
    }
};