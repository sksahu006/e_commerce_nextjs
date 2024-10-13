'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ProductFormModal } from './AddProduct'

export function AddProductButton() {
  const [isAdding, setIsAdding] = useState(false)

  return (
    <>
      <Button onClick={() => setIsAdding(true)}>Add Product</Button>
      {isAdding && <ProductFormModal onClose={() => setIsAdding(false)} />}
    </>
  )
}