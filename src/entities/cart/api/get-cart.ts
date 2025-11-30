import { Api } from "@/shared"

import { CartResponseDTO } from "./dto/response"

export const getCart = async (): Promise<CartResponseDTO> => {
  const res = await Api.get<{ data: CartResponseDTO }>("/api/cart")
  return res.data.data
}
