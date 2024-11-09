// hooks/useSizeData.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { SizeTableItem } from '@/lib/types/schemaTypes'
import { deleteSize } from '@/app/actions/adminActions/size'

export function useSizes(page: number, search: string, initialSizes: SizeTableItem[]) {
  return useQuery<{ sizes: SizeTableItem[], total: number }>({
    queryKey: ['sizes', page, search],
    queryFn:() => fetch(`/api/sizes?page=${page}&search=${search}`).then(res => res.json()),
    initialData: { sizes: initialSizes, total: initialSizes.length },
  })
}

export function useDeleteSize() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSize,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sizes'] }),
  })
}
