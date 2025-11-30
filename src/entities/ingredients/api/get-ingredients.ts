import { Ingredient } from "db/generated/browser"

import { Api } from "@/shared"

export async function getIngredients(): Promise<Ingredient[]> {
  const res = await Api.get<Ingredient[]>("/api/ingredients")

  return res.data
}
