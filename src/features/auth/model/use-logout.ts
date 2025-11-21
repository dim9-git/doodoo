import { useMutation, useQueryClient } from "@tanstack/react-query"

import { actionLogout } from "../api/actions/logout"
import { SESSION_QUERY_KEY } from "./use-session"

export const useLogout = () => {
  const qc = useQueryClient()
  const {
    mutate: qLogout,
    mutateAsync: qLogoutAsync,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async () => {
      return await actionLogout()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SESSION_QUERY_KEY })
    },
  })

  return { qLogout, qLogoutAsync, isPending, isError, isSuccess }
}
