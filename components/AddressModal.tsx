"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from './ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useSession } from 'next-auth/react'
import { useSaveAddress } from '@/featues/address/useAddAddress'
import { Loader } from 'lucide-react'

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    phoneNumber: z.string().regex(/^\d{10}$/, { message: "Invalid phone number. Must be 10 digits." }),
    addressLine1: z.string().min(5, { message: "Address must be at least 5 characters." }),
    addressLine2: z.string().optional(),
    city: z.string().min(2, { message: "City must be at least 2 characters." }),
    state: z.string().min(2, { message: "Please select a state." }),
    postalCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: "Invalid postal code." }),
    country: z.string().min(2, { message: "Please select a country." }),
})


const AddressModal = ({
    onClose,
}: {
    onClose: () => void;
}) => {
    const { data: session } = useSession();
    const userId = session?.user?.id || '';
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
        },
    })
    const saveAddressMutation = useSaveAddress();

    function onSubmit(values: z.infer<typeof formSchema>) {
        let formdatas = { userId: userId, ...values }
        saveAddressMutation.mutate(formdatas);
        onClose()
    }
    
    return (
        <Dialog open={true} onOpenChange={onClose}>

            <DialogContent className='p-8'>
                <DialogHeader>
                    <DialogTitle>Address details</DialogTitle>

                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <div className="flex w-full gap-3 justify-between">
                            <FormField
                                control={form.control}
                                name="fullName"

                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input type="tel" placeholder="1234567890" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                       
                        <div className='flex gap-4 '>
                            <FormField
                                control={form.control}
                                name="addressLine1"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Address Line 1</FormLabel>
                                        <FormControl>
                                            <Input placeholder="123 Main St" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="addressLine2"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Address Line 2 (optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Apt 4B" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="New York" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State/Province</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a state" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="ny">New York</SelectItem>
                                            <SelectItem value="ca">California</SelectItem>
                                            <SelectItem value="tx">Texas</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Postal/Zip Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="12345" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a country" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="us">United States</SelectItem>
                                            <SelectItem value="ca">Canada</SelectItem>
                                            <SelectItem value="uk">United Kingdom</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit"> {saveAddressMutation.isPending ?<> <Loader/>"Saving..." </> : "Save Address"}</Button>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>

    )
}

export default AddressModal