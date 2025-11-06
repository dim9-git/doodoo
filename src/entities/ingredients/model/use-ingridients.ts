import { Ingredient } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useSet } from "react-use"

import { getIngredients } from "../api/get-ingredients"

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
    queryKey: ["ingridients"],
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
