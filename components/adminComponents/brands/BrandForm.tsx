import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { brandsState } from '@/stores/atoms/brandAtoms'
import { BrandFormData, brandSchema } from '@/lib/types/validationTypes'
import { Brand } from '@/lib/types/schemaTypes'


const createBrand = async (data: BrandFormData): Promise<Brand> => {
    const response = await fetch('/api/brands', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to create brand')
    return response.json()
  }

export default function BrandForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
  })

  const queryClient = useQueryClient()
  const setBrands = useSetRecoilState(brandsState)

  const mutation = useMutation(createBrand, {
    onSuccess: (newBrand: Brand) => {
      queryClient.invalidateQueries(['brands'])
      setBrands((prevBrands) => [...prevBrands, newBrand])
    },
  })

  const onSubmit = (data: BrandFormData) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('name')}
          placeholder="Brand Name"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Input
          {...register('logo')}
          type="file"
          accept="image/*"
          className={errors.logo ? 'border-red-500' : ''}
        />
        {errors.logo && <p className="text-red-500 text-sm mt-1">{errors.logo.message}</p>}
      </div>
      <div>
        <Textarea
          {...register('description')}
          placeholder="Brand Description"
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>
      <Button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Creating...' : 'Create Brand'}
      </Button>
    </form>
  )
}