import React from 'react'

const SingleProduct = () => {
    return (
        <div className="min-h-screen mt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="flex md:grid-cols-2 gap-8">
                    {/* Skeleton for Product Images */}
                    <div className="relative w-1/2 animate-pulse">
                        <div className="relative h-[90vh] mb-4 bg-gray-200 rounded-lg" />
                        <div className="flex space-x-2 overflow-x-auto">
                            <div className="w-20 h-20 rounded-md bg-gray-200" />
                            <div className="w-20 h-20 rounded-md bg-gray-200" />
                            <div className="w-20 h-20 rounded-md bg-gray-200" />
                        </div>
                    </div>

                    {/* Skeleton for Product Details */}
                    <div className='w-1/2 flex flex-col gap-8'>
                        <div className="space-y-6 animate-pulse">
                            <div className="h-6 bg-gray-200 w-3/4" />
                            <div className="flex items-center space-x-2 mt-2">
                                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                                <div className="h-4 w-32 bg-gray-200" />
                            </div>
                            <div className="mt-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-24 h-5 bg-gray-200" />
                                    <div className="w-16 h-5 bg-gray-200" />
                                </div>
                                <p className="h-4 bg-gray-200 w-1/4 mt-2" />
                            </div>
                        </div>

                        {/* Skeleton for Add to Cart and Wishlist Buttons */}
                        <div className="flex space-x-4 animate-pulse">
                            <div className="w-1/2 h-12 bg-gray-200 rounded-md" />
                            <div className="w-1/2 h-12 bg-gray-200 rounded-md" />
                        </div>

                        {/* Skeleton for Product Details Section */}
                        <div className="mt-6">
                            <div className="h-6 bg-gray-200 w-1/2" />
                            <p className="h-4 bg-gray-200 mt-4 w-4/5" />
                            <p className="h-4 bg-gray-200 mt-2 w-3/4" />
                            <p className="h-4 bg-gray-200 mt-4 w-4/5" />
                            <p className="h-4 bg-gray-200 mt-2 w-3/4" />
                            <p className="h-4 bg-gray-200 mt-4 w-4/5" />
                            <p className="h-4 bg-gray-200 mt-2 w-3/4" />
                            <p className="h-4 bg-gray-200 mt-4 w-4/5" />
                            <p className="h-4 bg-gray-200 mt-2 w-3/4" />
                            <p className="h-4 bg-gray-200 mt-4 w-1/5" />
                            <p className="h-4 bg-gray-200 mt-2 w-1/4" />
                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default SingleProduct