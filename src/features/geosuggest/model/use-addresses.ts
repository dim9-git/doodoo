import { useQuery } from "@tanstack/react-query"

import { getAddresses } from "../api/get-addresses"

export const ADDRESSES_KEY = ["addresses"] as const

interface Props {
  q: string
  limit?: number
}

export function useAddresses({ q, limit }: Props) {
  const {
    data: addresses,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [...ADDRESSES_KEY, q],
    queryFn: async () => await getAddresses(q, limit),
    enabled: !!q && q.length > 2,
  })

  return {
    addresses,
    isLoading,
    isError,
    isSuccess,
  }
}
