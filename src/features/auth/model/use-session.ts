import { useQuery } from "@tanstack/react-query"

import { actionGetSession } from "../api/actions/get-session"

export const SESSION_QUERY_KEY = ["session"]

export function useSession() {
  const {
    data: session,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: actionGetSession,
  })

  return {
    session,
    isLoading: isPending,
    isError,
    isSuccess,
    isAuthenticated: isSuccess && session !== null,
  }
}
