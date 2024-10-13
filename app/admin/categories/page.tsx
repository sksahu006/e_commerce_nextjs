import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import CategoryForm from '@/components/adminComponents/category/CategoryForm'
import CategoryList from '@/components/adminComponents/category/CategoryList'

export default function CategoriesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>
      <CategoryForm />
      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <CategoryList />
      </Suspense>
    </div>
  )
}