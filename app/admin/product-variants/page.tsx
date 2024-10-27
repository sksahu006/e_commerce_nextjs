import { ProductVariantList } from "@/components/adminComponents/product-variants/ProductVariantList"
import { Suspense } from "react"

export default function ProductVariantsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Variants</h1>
      <Suspense fallback={<div>Loading product variants...</div>}>
        <ProductVariantList />
      </Suspense>
    </div>
  )
}