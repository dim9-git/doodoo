import { useMutation, useQueryClient } from "@tanstack/react-query"

import { actionLogin, type LoginUserDTO } from "../api/actions/login"
import { SESSION_QUERY_KEY } from "./use-session"

export const useLogin = () => {
  const qc = useQueryClient()
  const {
    mutate: qLogin,
    mutateAsync: qLoginAsync,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (payload: LoginUserDTO) => {
      return await actionLogin(payload)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SESSION_QUERY_KEY })
    },
  })

  return {
    qLogin,
    qLoginAsync,
    isPending,
    isError,
    isSuccess,
  }
}
