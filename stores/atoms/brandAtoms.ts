import { Brand } from '@/lib/types/schemaTypes'
import { atom, selector } from 'recoil'

export const brandsState = atom<Brand[]>({
  key: 'brandsState',
  default: [],
})

export const brandsByIdSelector = selector({
  key: 'brandsByIdSelector',
  get: ({ get }) => {
    const brands = get(brandsState)
    return brands.reduce((acc, brand) => {
      acc[brand.id] = brand
      return acc
    }, {} as Record<string, Brand>)
  },
})

export const brandNamesSelector = selector({
  key: 'brandNamesSelector',
  get: ({ get }) => {
    const brands = get(brandsState)
    return brands.map(brand => brand.name)
  },
})