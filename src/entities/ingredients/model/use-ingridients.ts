import { Ingredient } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useSet } from "react-use"

import { getIngredients } from "../api/get-ingredients"

export const INGREDIENTS_KEY = ["ingredients"] as const
interface ReturnProps {
  ingridients: Ingredient[] | undefined
  selectedIngridients: Set<string>
  onToggleIngridient: (id: string) => void
  isLoading: boolean
  error: Error | null
}

export function useIngridients(): ReturnProps {
  const [selectedIngridients, { toggle }] = useSet(new Set<string>([]))

  const {
    data: ingridients,
    isLoading,
    error,
  } = useQuery({
    queryKey: INGREDIENTS_KEY,
    queryFn: getIngredients,
  })

  return {
    ingridients,
    selectedIngridients,
    onToggleIngridient: toggle,
    isLoading,
    error,
  }
}
