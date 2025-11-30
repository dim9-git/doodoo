import { Product } from "db/generated/client"

import { Api } from "@/shared"

export const searchProducts = async (query: string): Promise<Product[]> => {
  const res = await Api.get<Product[]>(`/api/products/search?query=${query}`)

  return res.data
}
