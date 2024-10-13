import { atom, selector } from 'recoil'

export interface Color {
  id: string
  name: string
  hexCode: string
}

export const colorsState = atom<Color[]>({
  key: 'colorsState',
  default: [],
})

export const colorsByIdSelector = selector({
  key: 'colorsByIdSelector',
  get: ({ get }) => {
    const colors = get(colorsState)
    return colors.reduce((acc, color) => {
      acc[color.id] = color
      return acc
    }, {} as Record<string, Color>)
  },
})

export const colorNamesSelector = selector({
  key: 'colorNamesSelector',
  get: ({ get }) => {
    const colors = get(colorsState)
    return colors.map(color => color.name)
  },
})