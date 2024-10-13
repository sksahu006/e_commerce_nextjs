import { atom, selector } from 'recoil'

export interface Size {
  id: string
  name: string
}

export const sizesState = atom<Size[]>({
  key: 'sizesState',
  default: [],
})

export const sizesByIdSelector = selector({
  key: 'sizesByIdSelector',
  get: ({ get }) => {
    const sizes = get(sizesState)
    return sizes.reduce((acc, size) => {
      acc[size.id] = size
      return acc
    }, {} as Record<string, Size>)
  },
})

export const sizeNamesSelector = selector({
  key: 'sizeNamesSelector',
  get: ({ get }) => {
    const sizes = get(sizesState)
    return sizes.map(size => size.name)
  },
})