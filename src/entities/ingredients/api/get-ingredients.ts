import { http } from "@/shared"
import { Ingredient } from "db/generated/client"

export const INGREDIENTS_QUERY_KEY = ["ingredients"] as const

export async function getIngredients(): Promise<Ingredient[]> {
  const res = await http.get<{ data: Ingredient[] }>("/api/ingredients")

  return res.data
}
