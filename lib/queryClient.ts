import { cache } from 'react'
import { QueryClient } from '@tanstack/react-query'

export const getQueryClient = cache(() => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
    }
  }
}))