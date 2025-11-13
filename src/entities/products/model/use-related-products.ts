"use client"

import { useQuery } from "@tanstack/react-query"

import { http } from "@/shared/lib/http"

import { RelatedProductsResponseDTO } from "../api/dto/product.dto"

export const useRelatedProducts = (id: number) => {
  const { isLoading, isError, isSuccess, data } =
    useQuery<RelatedProductsResponseDTO>({
      queryKey: ["related-products", id],
      queryFn: () => http.get(`/api/products/${id}/related`),
    })

  return {
    relatedProducts: data?.data,
    isLoading,
    isError,
    isSuccess,
  }
}
