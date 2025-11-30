import { Api } from "@/shared"

import { ProductResponseDTO } from "./dto/response"

export const getRelatedProducts = async (id: number) => {
  const res = await Api.get<ProductResponseDTO[]>(`/api/products/${id}/related`)
  return res.data
}
