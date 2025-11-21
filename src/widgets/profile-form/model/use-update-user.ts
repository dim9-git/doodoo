import { useMutation } from "@tanstack/react-query"

import { FormProfileValues } from "./schemas"
import { actionUpdateUser } from "../api/actions/update-user"

type UpdateUserPayload = FormProfileValues

export const useUpdateUser = () => {
  const {
    mutate: qUpdateUser,
    mutateAsync: qUpdateUserAsync,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: UpdateUserPayload) => {
      return await actionUpdateUser(data)
    },
  })

  return { qUpdateUser, qUpdateUserAsync, isPending, isError, isSuccess }
}
