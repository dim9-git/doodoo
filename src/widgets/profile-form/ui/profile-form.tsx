"use client"

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button, FormInput } from "@/shared"

import { User } from "@/entities/users"

import { useLogout } from "@/features/auth"

import { formProfileSchema, FormProfileValues } from "../model/schemas"
import { useUpdateUser } from "../model/use-update-user"

interface Props {
  data: User
}

export default function ProfileForm({ data }: Props) {
  const form = useForm({
    resolver: zodResolver(formProfileSchema),
    defaultValues: {
      firstName: data.firstName ?? "",
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  })

  const { qUpdateUserAsync, isPending: isUpdating } = useUpdateUser()
  const { qLogoutAsync, isPending: isLoggingOut } = useLogout()

  const onSubmit = async (data: FormProfileValues) => {
    await qUpdateUserAsync(data, {
      onSuccess: () => {
        toast.success("Информация обновлена")
      },
      onError: () => {
        toast.error("Ошибка при обновлении информации")
      },
    })
  }

  const onClickSignOut = async () => {
    await qLogoutAsync(undefined, {
      onError: () => {
        toast.error("Ошибка при выходе из аккаунта")
      },
    })
  }

  const isDisabled = isUpdating || isLoggingOut || form.formState.isSubmitting

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5 w-96 mt-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="firstName" label="Полное имя" required />

        <FormInput
          type="password"
          name="password"
          label="Новый пароль"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          label="Повторите пароль"
          required
        />

        <Button
          disabled={isDisabled}
          isLoading={isUpdating || form.formState.isSubmitting}
          className="text-base mt-10"
          type="submit"
        >
          Сохранить
        </Button>

        <Button
          onClick={onClickSignOut}
          variant="secondary"
          disabled={isDisabled}
          isLoading={isLoggingOut}
          className="text-base"
          type="button"
        >
          Выйти
        </Button>
      </form>
    </FormProvider>
  )
}
