"use client"

import { useState } from "react"
import { ChevronDown, Info, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import AddressModal from "@/components/AddressModal"
import AddAddressButtont from "@/components/AddAddressButtont"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useSession } from "next-auth/react"
import { useUserAddresses } from "@/featues/address/useGetAllAddress"
import { useRecoilValue } from "recoil"
import { cartItemsAtom } from "@/stores/atoms/cartAtoms"
import { useCreateOrderMutation } from "@/featues/order/useCreateOrder"
import { Router } from "next/router"
import { useRouter } from "next/navigation"



export default function Component() {
    const { data: session } = useSession();
    const userId = session?.user?.id || '';
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    const cartItemsState = useRecoilValue(cartItemsAtom);

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
    const total = subtotal;


    const { data, isLoading } = useUserAddresses(userId);

    const handleSelectionChange = (id: string) => {
        setSelectedAddress(id);
    };


    const createOrderMutation = useCreateOrderMutation();

    const handleInitiateOrder = async () => {

        if (!selectedAddress || !userId || cartItemsState.length === 0) return;

        const formattedCartItems = cartItemsState?.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
            pricePerUnit: Number(item.variant.product.discountPrice) ?? Number(item.variant.product.basePrice),
        }));

        const params = {
            userId: userId,
            orderItems: formattedCartItems,
            shippingAddressId: selectedAddress,
            paymentMethodId: "payment-1",
        };

        try {
            const order = await createOrderMutation.mutateAsync(params);
            if (order.success) {
                router.push("/products");
            }
        } catch (error) {

        }

        console.log("Order initiated with address ID:", selectedAddress);


    };


    return (
        <div className="container mx-auto px-4 gap-4 bg-white/15  py-8 w-full flex flex-col">
            <h1 className="text-3xl font-bold pt-16 mb-2"></h1>
            {/* { <div><AddressModal   onClose={() => setIsEditing(false)} /></div> } */}

            <AddAddressButtont />

            <div className=" gap-8 flex w-[100%]">
                <div className="md:col-span-2 border-2 w-[55%] border-gray-200 p-6 bg-white shadow-sm rounded-sm">


                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Saved Addresses</h2>

                        </div>
                        {<RadioGroup
                            value={selectedAddress}
                            onValueChange={handleSelectionChange}
                            className="space-y-4"
                        >
                            {data?.data?.map((address) => (
                                <Card key={address.id} className="mb-4 rounded-sm border-[#676162]">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <RadioGroupItem value={address.id} id={address.id} />
                                                <label

                                                    className="ml-2 text-[#117a7a] font-semibold font-ShackletonTest cursor-pointer"
                                                >
                                                    Deliver to {address.fullName},{address.postalCode}
                                                </label>
                                                <p className="text-sm  pl-6 text-muted-foreground">
                                                    {address.addressLine1},{address.city},{address.country},({address.phoneNumber})
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
                        </RadioGroup>}
                    </div>

                    <div className="mt-8 flex bg-[#ffb951] h-max w-max p-2 text-sm font-ShackletonTest font-semibold  justify-between items-center">
                        <Link href="#" className="text-primary hover:underline">
                            Return to Cart
                        </Link>
                    </div>
                </div>

                <div className="w-[40%]">
                    <Card>
                        <CardContent className="p-6">

                            <h2 className="text-xl font-semibold text-center bg-[#117a7a] h-max w-full uppercase text-white font-Oswald p-3 mb-4">Order Summary</h2>
                            {cartItemsState?.map((item) => (
                                <div key={item.id} className="flex items-center border-b-[1px] p-2 space-x-4 mb-4">
                                    <Image
                                        src={item.variant.product.images[0] || "/placeholder.jpg"}
                                        alt={item.variant.product.name || "Product Image"}
                                        width={80}
                                        height={80}
                                        className="rounded-md"
                                    />
                                    <div className="">
                                        <h3 className="font-semibold font-ShackletonTest">{item.variant.product.name}</h3>
                                        <p className="text-sm text-muted-foreground">Size: {item.variant.size.name}</p>
                                        <p className="text-sm font-medium">
                                            ₹
                                            {item.variant.product.discountPrice
                                                ? Number(item.variant.product.discountPrice) * Number(item.quantity)
                                                : Number(item.variant.product.basePrice) * Number(item.quantity)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="space-y-2 font-TwentiethCenturyforKenmoreLight ">
                                <div className="flex font-TwentiethCenturyforKenmoreLight justify-between font-semibold">
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
                                    <span>₹{total - discount}</span>
                                </div>
                            </div>
                            <Button
                                className={`w-full p-7 uppercase text-xl mt-3 ${!selectedAddress ? "opacity-20 hover:cursor-wait" : ""
                                    }`}
                                disabled={!selectedAddress}
                                onClick={handleInitiateOrder}
                            >
                                Pay Now
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    )
}