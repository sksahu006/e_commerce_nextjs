'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SizeTableItem } from '@/lib/types/schemaTypes'
import { deleteSize } from '@/app/actions/adminActions/size'
import AddEditDialog from './AddEditDialog'
import { Pagination } from '@/components/Pagination'
import { Pencil, Trash2 } from 'lucide-react'
import { useDebounce } from '@/lib/hooks/useDebounce'

export default function SizeTable({ initialSizes }: { initialSizes: SizeTableItem[] }) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [editingSize, setEditingSize] = useState<SizeTableItem | null>(null)
  const debouncedSearch = useDebounce(search, 300)
  const queryClient = useQueryClient()

  const { data } = useQuery<{ sizes: SizeTableItem[], total: number }>({
    queryKey: ['sizes', page, debouncedSearch],
    queryFn: () => fetch(`/api/sizes?page=${page}&search=${debouncedSearch}`).then(res => res.json()),
    initialData: { sizes: initialSizes, total: initialSizes.length },
  })
  console.log("data",data)

  const deleteSizeMutation = useMutation({
    mutationFn: deleteSize,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sizes'] }),
  })

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this size?')) {
      await deleteSizeMutation.mutateAsync(id)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search sizes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <AddEditDialog type="size" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.sizes.map((size) => (
            <TableRow key={size.id}>
              <TableCell>{size.name}</TableCell>
              <TableCell className="space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setEditingSize(size)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDelete(size.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        total={data.total}
        page={page}
        pageSize={10}
        onPageChange={setPage}
      />
      {editingSize && (
        <AddEditDialog 
          type="size" 
          item={editingSize} 
          onClose={() => setEditingSize(null)} 
          defaultOpen={true}
        />
      )}
    </>
  )
}