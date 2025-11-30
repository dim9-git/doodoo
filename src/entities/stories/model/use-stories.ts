import { useQuery } from "@tanstack/react-query"

import { getStories } from "../api/get-stories"

export const STORIES_KEY = ["stories"] as const

export const useStories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: STORIES_KEY,
    queryFn: getStories,
  })

  return { data, isLoading, error }
}
