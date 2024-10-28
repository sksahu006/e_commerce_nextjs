'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ColorTableItem } from '@/lib/types/schemaTypes'
import { deleteColor } from '@/app/actions/adminActions/color'
import AddEditDialog from './AddEditDialog'
import { Pagination } from '@/components/Pagination'
import { Pencil, Trash2 } from 'lucide-react'
import { useDebounce } from '@/lib/hooks/useDebounce'

export default function ColorTable({ initialColors }: { initialColors: ColorTableItem[] }) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [editingColor, setEditingColor] = useState<ColorTableItem | null>(null)
  const debouncedSearch = useDebounce(search, 500)
  const queryClient = useQueryClient()

  const { data } = useQuery<{ colors: ColorTableItem[], total: number }>({
    queryKey: ['colors', page, debouncedSearch],
    queryFn: () => fetch(`/api/colors?page=${page}&search=${debouncedSearch}`).then(res => res.json()),
    initialData: { colors: initialColors, total: initialColors.length },
  })

  const deleteColorMutation = useMutation({
    mutationFn: deleteColor,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['colors'] }),
  })

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this color?')) {
      await deleteColorMutation.mutateAsync(id)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search colors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <AddEditDialog type="color" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Hex Code</TableHead>
            <TableHead>Preview</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.colors.map((color) => (
            <TableRow key={color.id}>
              <TableCell>{color.name}</TableCell>
              <TableCell>{color.hexCode}</TableCell>
              <TableCell>
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: color.hexCode }}
                />
              </TableCell>
              <TableCell className="space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setEditingColor(color)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDelete(color.id)}
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
      {editingColor && (
        <AddEditDialog 
          type="color" 
          item={editingColor} 
          onClose={() => setEditingColor(null)} 
          defaultOpen={true}
        />
      )}
    </>
  )
}