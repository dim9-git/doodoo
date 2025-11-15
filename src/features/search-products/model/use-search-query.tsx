"use client"

import { useQuery } from "@tanstack/react-query"

import { searchProducts } from "../api/search-products"

export const SEARCH_PRODUCTS_KEY = ["search-products"] as const
interface Props {
  query: string
}

export function useSearchQuery({ query }: Props) {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: [...SEARCH_PRODUCTS_KEY, query],
    queryFn: () => searchProducts(query),
    enabled: !!query,
  })

  return { products, error, isLoading }
}
