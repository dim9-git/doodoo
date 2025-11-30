"use client"

import { useQuery } from "@tanstack/react-query"

import { ProductResponseDTO } from "../api/dto/response"
import { getRelatedProducts } from "../api/get-related-products"

export const RELATED_PRODUCTS_KEY = ["related-products"] as const

export const useRelatedProducts = (id: number) => {
  const { isLoading, isError, isSuccess, data } = useQuery<
    ProductResponseDTO[]
  >({
    queryKey: [...RELATED_PRODUCTS_KEY, id],
    queryFn: () => getRelatedProducts(id),
  })

  return {
    relatedProducts: data,
    isLoading,
    isError,
    isSuccess,
  }
}
