'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createCategory } from '@/app/actions/adminActions/category'
import { categorySchema, catrgoryFormData } from '@/lib/types/validationTypes'


export default function CategoryForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<catrgoryFormData>({
    resolver: zodResolver(categorySchema),
  })

  const onSubmit = async (data: catrgoryFormData) => {
    try {
      await createCategory(data)
      reset() 
    } catch (error) {
      console.error('Failed to create category:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register('name')} placeholder="Category Name" />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <Textarea {...register('description')} placeholder="Description (optional)" />

      <Button type="submit">Create Category</Button>
    </form>
  )
}