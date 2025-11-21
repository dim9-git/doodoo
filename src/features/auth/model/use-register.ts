import { useMutation } from "@tanstack/react-query"

import { actionRegister, type RegisterUserDTO } from "../api/actions/register"

export const useRegister = () => {
  const {
    mutate: register,
    mutateAsync: registerAsync,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (payload: RegisterUserDTO) => {
      return await actionRegister(payload)
    },
  })

  return {
    register,
    registerAsync,
    isPending,
    isError,
    isSuccess,
  }
}
