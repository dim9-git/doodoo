import { Api } from "@/shared"

import { CartResponseDTO } from "@/entities/cart"

export const removeCartItem = async (id: number): Promise<CartResponseDTO> => {
  const res = await Api.delete<{
    data: CartResponseDTO
  }>(`/api/cart/${id}`)

  return res.data.data
}
