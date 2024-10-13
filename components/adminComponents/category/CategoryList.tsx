'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { deleteCategory } from '@/app/actions/adminActions/category'

export default function CategoryList() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['categories', page, search],
    queryFn: () =>
      fetch(`/api/category?page=${page}&search=${search}`).then(res =>
        res.json()
      ),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching categories</div>

  return (
    <div>
      <Input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.categories?.map((category: any) => (
            <TableRow key={category?.id}>
              <TableCell>{category?.name}</TableCell>
              <TableCell>{category?.description}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => deleteCategory(category?.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-between">
        <Button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>
          Page {page} of {data?.totalPages}
        </span>
        <Button
          onClick={() => setPage(p => p + 1)}
          disabled={page === data?.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}