'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProductItemData,Brand, Category } from '@/lib/types/schemaTypes'
import { ProductFormModal } from './AddProduct'

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

export function ProductItem({ product }: { product: FetchedProductData }) {
    const [isEditing, setIsEditing] = useState(false)
  
    return (
      <Card>
        <CardContent>
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <p>Price: ${product.basePrice}</p>
          <p>Status: {product.status}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        </CardFooter>
        {isEditing && (
          <ProductFormModal
            product={product}
            onClose={() => setIsEditing(false)}
          />
        )}
      </Card>
    )
  }