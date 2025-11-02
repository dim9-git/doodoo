import { Ingredient } from "@prisma/client"

export const INGREDIENTS_QUERY_KEY = ["ingredients"] as const

export async function getIngredients(): Promise<Ingredient[]> {
  const res = await fetch("/api/ingredients")

  if (!res.ok) {
    throw new Error("Ошибка при получении ингредиентов")
  }

  return res.json()
}
