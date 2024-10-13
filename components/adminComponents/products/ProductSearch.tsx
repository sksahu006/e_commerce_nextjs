'use client'

import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { useState, useEffect } from 'react'

export function ProductSearch() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (debouncedSearchTerm !== '') {
      router.push(`/admin/products?search=${encodeURIComponent(debouncedSearchTerm)}`)
    } else {
      router.push('/admin/products')
    }
  }, [debouncedSearchTerm, router])

  return (
    <Input
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="max-w-sm"
    />
  )
}