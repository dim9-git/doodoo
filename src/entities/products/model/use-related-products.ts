"use client"

import { useQuery } from "@tanstack/react-query"

import { http } from "@/shared"

import { RelatedProductsResponseDTO } from "../api/dto/response"

export const RELATED_PRODUCTS_KEY = ["related-products"] as const

export const useRelatedProducts = (id: number) => {
  const { isLoading, isError, isSuccess, data } =
    useQuery<RelatedProductsResponseDTO>({
      queryKey: [...RELATED_PRODUCTS_KEY, id],
      queryFn: () => http.get(`/api/products/${id}/related`),
    })

  return {
    relatedProducts: data?.data,
    isLoading,
    isError,
    isSuccess,
  }
}
