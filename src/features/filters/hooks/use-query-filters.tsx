import { useRef } from "react"
import { useRouter } from "next/navigation"
import qs from "qs"
import { useDebounce } from "react-use"

import { Filters } from "./use-filters"

export default function useQueryFilters(filters: Filters) {
  const router = useRouter()
  const isMounted = useRef(false)

  useDebounce(
    () => {
      if (isMounted.current) {
        const q = qs.stringify(
          {
            sizes: Array.from(filters.sizes),
            types: Array.from(filters.types),
            ingridients: Array.from(filters.ingridients),
            fromPrice: filters.fromPrice,
            toPrice: filters.toPrice,
          },
          {
            arrayFormat: "comma",
          }
        )

        router.push(`?${q}`, {
          scroll: false,
        })
      }
      isMounted.current = true
    },
    250,
    [filters]
  )
}
