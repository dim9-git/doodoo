"use client"

import { useQuery } from "@tanstack/react-query"

import { searchProducts } from "../api/search-products"

interface Props {
  query: string
}

export default function useSearchQuery({ query }: Props) {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["search-products", query],
    queryFn: () => searchProducts(query),
    enabled: !!query,
  })

  return { products, error, isLoading }
}
