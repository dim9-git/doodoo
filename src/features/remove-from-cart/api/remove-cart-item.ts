import { CartDTO } from "@/entities/cart/api/dto/cart.dto"
import { http } from "@/shared/lib/http"

export const removeCartItem = async (id: number) => {
  return (
    await http.delete<{
      data: CartDTO
    }>(`/api/cart/${id}`)
  ).data
}
