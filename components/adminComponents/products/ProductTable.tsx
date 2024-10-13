import { fetchProducts } from '@/app/actions/adminActions/product'
import { ProductItem } from './ProductItem'
import { Brand, Category } from '@/lib/types/schemaTypes'

// Define a new type that matches the structure returned by fetchProducts
type FetchedProductData = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  description: string | null;
  basePrice: number;
  discountPrice: number | null;
  featured: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  brand: Omit<Brand, 'products'>; // Omit the 'products' field from Brand
  brandId: string;
  categories: Array<{
    category: Omit<Category, 'products'>; // Omit the 'products' field from Category
    productId: string;
    categoryId: string;
  }>;
};

export async function ProductList({ page, search }: { page: number; search: string }) {
  const { products, total, totalPages } = await fetchProducts(page, 10, search)

  if (products.length === 0) {
    return <div>No products found.</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product: FetchedProductData) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}