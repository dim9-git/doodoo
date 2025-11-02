import { http } from "@/shared/lib/http"

import { CartDTO } from "./dto/cart.dto"

export const getCart = async () => {
  return (await http.get<{ data: CartDTO }>("/api/cart")).data
}
