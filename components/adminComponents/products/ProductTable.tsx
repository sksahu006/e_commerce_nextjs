// app/admin/products/ProductsTable.tsx
'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Product } from '@/lib/types/schemaTypes'
import { AddProduct } from './AddProduct'

const fetchProducts = async (page = 1, limit = 10, search = '') => {
  const response = await fetch(`/api/products?page=${page}&limit=${limit}&search=${search}`)
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json()
}

export function ProductsTable({ initialData }) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', page, search],
    queryFn: () => fetchProducts(page, 10, search),
    initialData,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error.message}</div>

  return (
    <>
      <div className="flex justify-between mb-5">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <AddProduct />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products?.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.basePrice}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-5">
        <div>
          Showing {data?.products.length} of {data?.total} products
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === data?.totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  )
}