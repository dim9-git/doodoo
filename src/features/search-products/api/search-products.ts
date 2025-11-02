import { Product } from "@prisma/client"

export const searchProducts = async (query: string): Promise<Product[]> => {
  const res = await fetch("products/search?query=" + query)

  if (!res.ok) {
    throw new Error("Ошибка при поиске продуктов")
  }

  return await res.json()
}
