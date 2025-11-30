import { Api } from "@/shared"

import { CartResponseDTO } from "@/entities/cart"
import { CreateCartItemDTO } from "@/entities/cart-items"

export const addCartItem = async (
  payload: CreateCartItemDTO
): Promise<CartResponseDTO> => {
  const res = await Api.post<{
    data: CartResponseDTO
  }>("/api/cart", payload)

  return res.data.data
}
