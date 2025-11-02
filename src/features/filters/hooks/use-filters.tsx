import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useSet } from "react-use"

interface Prices {
  fromPrice?: number
  toPrice?: number
}

export interface Filters extends Prices {
  sizes: Set<string>
  types: Set<string>
  ingridients: Set<string>
}

export default function useFilters() {
  const searchParams = useSearchParams()
  const [prices, setPrices] = useState<Prices>({
    fromPrice: Number(searchParams.get("fromPrice")) || undefined,
    toPrice: Number(searchParams.get("toPrice")) || undefined,
  })

  const [sizes, { toggle: onToggleSize }] = useSet(
    new Set<string>(searchParams.get("sizes")?.split(","))
  )
  const [types, { toggle: onToggleType }] = useSet(
    new Set<string>(searchParams.get("types")?.split(","))
  )

  const [ingridients, { toggle: onToggleIngridient }] = useSet(
    new Set<string>(searchParams.get("ingridients")?.split(","))
  )

  return useMemo(
    () => ({
      prices,
      sizes,
      types,
      ingridients,
      setPrices,
      onToggleSize,
      onToggleType,
      onToggleIngridient,
    }),
    [
      prices,
      sizes,
      types,
      ingridients,
      setPrices,
      onToggleSize,
      onToggleType,
      onToggleIngridient,
    ]
  )
}
