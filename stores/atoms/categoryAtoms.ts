import { atom, selector } from 'recoil'

export interface Category {
  id: string
  name: string
  description?: string
}

export const categoriesState = atom<Category[]>({
  key: 'categoriesState',
  default: [],
})

export const categoriesByIdSelector = selector({
  key: 'categoriesByIdSelector',
  get: ({ get }) => {
    const categories = get(categoriesState)
    return categories.reduce((acc, category) => {
      acc[category.id] = category
      return acc
    }, {} as Record<string, Category>)
  },
})

export const categoryNamesSelector = selector({
  key: 'categoryNamesSelector',
  get: ({ get }) => {
    const categories = get(categoriesState)
    return categories.map(category => category.name)
  },
})