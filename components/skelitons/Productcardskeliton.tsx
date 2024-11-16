import { Skeleton } from "@/components/ui/skeleton"

export default function CardSkeliton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-card rounded-lg shadow-md overflow-hidden">
          {/* Image placeholder */}
          <div className="relative pb-[100%]">
            <Skeleton className="absolute inset-0" />
          </div>
          
          <div className="p-4 space-y-4">
            {/* Badge placeholder */}
            <div className="flex justify-end">
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            
            {/* Brand name placeholder */}
            <Skeleton className="h-4 w-1/2" />
            
            {/* Product name placeholder */}
            <Skeleton className="h-6 w-3/4" />
            
            {/* Pricing placeholder */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
            
            {/* Size options placeholder */}
            <div className="flex space-x-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}